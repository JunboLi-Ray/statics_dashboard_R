import { Button, message, Modal, Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import EasyForm from './easyForm';
import {connect} from "dva";

@connect(({ easyTable: {data}}) => ({data}), null,null,{withRef:true})
export default class EasyTable extends React.Component {
  static propTypes = {
    models: PropTypes.object,
    getListUrl: PropTypes.string| PropTypes.func,
    updateUrl: PropTypes.string | PropTypes.func,
    delUrl: PropTypes.string | PropTypes.func,
    needUpdate: PropTypes.bool,
    beforeUpdate: PropTypes.func,
    onRow: PropTypes.func,
  };

  state = {
    checkTwiceModal: false
  };

  componentWillMount() {
    this.getRecords()
  }

  getRecords() {
    const { dispatch, models, getListUrl, data } = this.props;
    if (getListUrl !== undefined) {
      if (typeof getListUrl == 'function') {
        getListUrl().then(res =>
          dispatch({type: 'easyTable/setData', model: models.key, dataSource: res.data})
        );
      } else {
        dispatch({ type: 'easyTable/fetchData', model: models.key, url: getListUrl, urlparam:data[models.key]?data[models.key].urlparam:undefined});
      }
    } else {
      dispatch({ type: 'easyTable/fetchData', model: models.key, urlparam:data[models.key]?data[models.key].urlparam:undefined});
    }
  }

  setRecords(records) {
    const { dispatch, models} = this.props;
    dispatch({type: 'easyTable/setData', model: models.key, dataSource: records})
  }

  returnRecords() {
    const { data,models } = this.props;
    return data[models.key]?this.filterRecords():[]
  }

  filterRecords() {
    const { data,models } = this.props;
    if(data[models.key].searchValue === undefined) {
      return data[models.key].dataSource
    }
    return (data[models.key].dataSource || []).filter((v) =>
      v[models.searchIndex].toString().includes(data[models.key].searchValue.trim()),
    )
  }


  buildDefaultColumns(dataSource) {
    const { updateUrl, delUrl, dispatch, models, needUpdate } = this.props;
    const columns = models.columns;
    var nullData = false;
    if(dataSource === undefined || dataSource === null || dataSource.length === 0) {
      nullData = true;
    }
    var localColumns = columns.map((column) => {
      if (!nullData && column.easyFilter) {
        column.onFilter = (value, record) => {
          var dataIndex = record;
          column.dataIndex.split('.').forEach(name => {
            if (dataIndex) {
              dataIndex = dataIndex[name]
            }
          });
          return dataIndex === value
        };
        column.filters = this.getDistinctValues(dataSource, column.dataIndex);
      }
      if (column.filters !== undefined && typeof(column.filters) === 'function') {
        column.filters = nullData?()=>[]:column.filters(dataSource, column.dataIndex)
      }
      if (column.easySort && column.sorter === undefined) {
        column.sorter = (a, b) => a[column.dataIndex] - b[column.dataIndex];
      }
      if (column.render !== undefined) {
        return column;
      }
      if (!nullData && Array.isArray(dataSource[0][column.dataIndex])) {
        column.render = (value) => (
          <React.Fragment>
            {(value || []).map((p) => (
              <Tag>{p}</Tag>
            ))}
          </React.Fragment>
        );
      }
      if (!nullData && (column.dataIndex.indexOf('time') > 0 || column.dataIndex.indexOf('Time') > 0)) {
        if (typeof dataSource[0][column.dataIndex] == 'number') {
          column.render = (text) => {
            var textStr = String(text);
            while (textStr.length > 10) {
              text = parseInt(text / 1000);
              textStr = String(text);
            }
            return moment.unix(text).format('YYYY-MM-DD HH:mm');
          };
        } else {
          column.render = (text) => (text ? moment(text).format('YYYY-MM-DD HH:mm') : 'N/A');
        }
      }
      return column;
    });
    //ud
    if ((updateUrl !== undefined && needUpdate) || delUrl !== undefined) {
      localColumns.push({
        title: '操作',
        key: 'operation',
        render: (record) => (
          <Button.Group>
            {needUpdate && (updateUrl !== undefined) ? (
              <Button onClick={() =>
                dispatch({ type: 'easyTable/setData', model: models.key, editing: true, editingRecord: record})}>
                更新
              </Button>
            ) : (
              ''
            )}
            {delUrl !== undefined ? (
              <Button onClick={() => this.handleDelete(record)}>删除</Button>
            ) : (
              ''
            )}
          </Button.Group>
        ),
      });
    }
    return localColumns
  }


  handleUpdate = () => {
    const { updateUrl, getListUrl, dispatch, models, beforeUpdate, data } = this.props;
    this.easyForm.formRef.current.validateFields().then(values => {
      var tidyValue = values;
      if(beforeUpdate !== undefined) {
        tidyValue = beforeUpdate(data[models.key].editingRecord, values)
      }
      if (updateUrl !== undefined) {
        if (typeof updateUrl === 'function') {
          updateUrl(errors, tidyValue)
            .then((res) => {
              message.info('修改成功！');
              this.getRecords();
            },
            (err) => {
              message.error(err.message);
            },);
        } else {
          dispatch({ type: 'easyTable/upsert', model: models.key, url: updateUrl, getListUrl: getListUrl, payload: tidyValue});
        }
      } else {
        dispatch({ type: 'easyTable/upsert', model: models.key, getListUrl: getListUrl, payload: tidyValue});
      }
      dispatch({ type: 'easyTable/setData', model: models.key, editing: false, editingRecord:{}});
      this.setState({checkTwiceModal:false})
    }).catch(info => console.log(info));
  };

  handleDelete = (record) => {
    const { delUrl, dispatch, models } = this.props;
    Modal.confirm({
      title: '确认要删除么？',
      onOk: () => {
        if(delUrl !== undefined) {
          if (typeof delUrl === 'function') {
            delUrl(record).then(
              message.info('成功！'),
              (err) => {
                message.error(err.message);
              },);
          } else {
            let param = delUrl.match('.*{(.*)}');
            const trueUrl = delUrl.replace('{' + param[1] + '}', record[param[1]]);
            dispatch({ type: 'easyTable/delete', model: models.key, url: trueUrl});
          }
        } else {
          dispatch({ type: 'easyTable/delete', model: models.key, id: record[models.rowKey]});
        }
        this.getRecords();
        dispatch({ type: 'easyTable/setData', model: models.key, editing: false, editingRecord:{}});
      },
    });
  };

  getDistinctValues(dataSource, dataIndex) {
    return dataSource.reduce((accumulator, currentValue) => {
      var indexs = dataIndex.split(".");
      var value = currentValue;
      indexs.forEach((index) => {
        if(value) {
          value = value[index]
        }
      });
      if (!value || accumulator.find((element) => element.value === value)) {
        return accumulator;
      }
      return accumulator.concat({
        text: value,
        value: value,
      });
    }, []);
  }

  render() {
    const { models, data, dispatch, onRow } = this.props;
    if (!data[models.key] || !data[models.key].dataSource ||data[models.key].dataSource.length === 0) {
      return null
    }
    return (
      <div>
        <Table
          rowKey={models.rowkey}
          columns={data[models.key]?this.buildDefaultColumns(data[models.key].dataSource):[]}
          dataSource={data[models.key]?this.filterRecords():[]}
          onRow={onRow}
          scroll={{x: 1300}}
        />
        <Modal
          title = {models.name}
          visible={data[models.key]?data[models.key].editing:false}
          destroyOnClose
          onOk={models.checkTwice===true?()=>{this.setState({checkTwiceModal: true})}: this.handleUpdate}
          onCancel={() => {
            console.log(this.easyForm);
            this.easyForm.resetFields();
            dispatch({ type: 'easyTable/setData', model: models.key, editing: false, editingRecord: {}})
          }}
          width="80%"
        >
          <EasyForm
            record={data[models.key]?data[models.key].editingRecord:{}}
            ref={(form) => {
              this.easyForm = form;
            }}
            models={models}
          />
        </Modal>
        <Modal
          visible = {this.state.checkTwiceModal}
          destroyOnClose
          onOk={this.handleUpdate}
          onCancel={() => {this.setState({checkTwiceModal: false})}}
        >
          确定要提交吗？
        </Modal>
      </div>
    );
  }
}
