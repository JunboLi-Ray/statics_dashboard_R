import PropTypes from 'prop-types';
import EasyTable from './easyTable';
import React from 'react';
import { Button, Input, Tabs, PageHeader} from 'antd';
import {connect} from "dva";

@connect(({ easyTable: {data}}) => ({data}), null,null,{withRef:true})
export default class EasyPage extends React.Component {
  static propTypes = {
    getListUrl: PropTypes.string | PropTypes.func,
    updateUrl: PropTypes.string | PropTypes.func,
    delUrl: PropTypes.string | PropTypes.func,
    beforeUpdate: PropTypes.func,
    needInsert: PropTypes.bool,
    needUpdate: PropTypes.bool,
    tabList: PropTypes.array,
    models: PropTypes.object,
    onRow: PropTypes.func,
    pageHeaderExtra: PropTypes.object,
  };

  state = {
    tabActiveKey:this.props.tabList!==undefined?this.props.tabList[0].key:undefined,
  };

  componentWillMount() {
    const {tabList} = this.props;
    if (tabList !== undefined) {
      this.handleTabChange(this.props.tabList[0].key)
    }
  }

  getRecords = () => {
    this.easyTable.getWrappedInstance().getRecords();
  };


  setRecords(records) {
    this.easyTable.getWrappedInstance().setRecords(records);
  };

  returnRecords = () => {
    return this.easyTable.getWrappedInstance().returnRecords();
  };

  returnActiveTag = () =>{
    return this.state.tabActiveKey;
  };

  handleTabChange = (key => {
    const {tabList, models, dispatch, getListUrl} = this.props;
    var urlparam = undefined;
      tabList.forEach(tab => {
        if (tab.key === key) {
          urlparam = tab.urlparam
        }
      });
      this.setState(
        {
          tabActiveKey: key,
        }
      );
    dispatch({ type: 'easyTable/setData', model: models.key, urlparam:urlparam, tabActiveKey:key});
    dispatch({ type: 'easyTable/fetchData', model: models.key, url: getListUrl});
  });

  renderTable = () => {
    const {
      getListUrl,
      updateUrl,
      delUrl,
      needUpdate,
      models,
      onRow,
      beforeUpdate,
    } = this.props;
    return  <EasyTable
      getListUrl={getListUrl}
      updateUrl={updateUrl}
      delUrl={delUrl}
      models={models}
      needUpdate={needUpdate}
      beforeUpdate={beforeUpdate}
      ref={(easyTable) => {
        this.easyTable= easyTable;
      }}
      onRow={onRow}
    />
  };

  render() {
    const {
      needInsert,
      models,
      dispatch,
      tabList,
      tabBarExtraContent,
      pageHeaderExtra
    } = this.props;

    const { tabActiveKey} = this.state;

    return (
      <div>
        <PageHeader
          title={models.name}
          extra={
            <div
              style={{
                display: 'flex',
              }}
            >
              {' '}
              {models.searchIndex ? (
                <Input
                  placeholder={'search ' + models.searchIndex}
                  onChange={(e) => {
                    dispatch({ type: 'easyTable/setData', model: models.key, searchValue:e.target.value});
                  }}
                />
              ) : (
                ''
              )}
              {needInsert?<Button
                type="primary"
                onClick={() => {
                  dispatch({ type: 'easyTable/setData', model: models.key, editing: true, editingRecord: undefined})
                }}
              >
                新增
              </Button>:''}
              {pageHeaderExtra}
            </div>
          }
        >
        </PageHeader>
        {tabList!==undefined && tabList.length>0?
          <Tabs
            defaultActiveKey={tabActiveKey}
            onChange={this.handleTabChange}
            tabBarExtraContent={tabBarExtraContent?tabBarExtraContent:''}
          >
          {tabList.map(tab => {
            return <Tabs.TabPane tab={tab.tab} key={tab.key}>
              {this.renderTable()}
            </Tabs.TabPane>
          })}
          </Tabs> :this.renderTable()
        }
      </div>
    );
  }
}
