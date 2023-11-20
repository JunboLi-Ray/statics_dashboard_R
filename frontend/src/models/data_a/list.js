import React from 'react';
import axios from 'axios';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import {Button, Empty, Input, message, Spin, Table} from 'antd';

export default class DataAListPage extends React.Component {
  static propTypes = {};

  state = {
    data: [],
    search: "",
    loading: false,
    curRecord: undefined,
    editing: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      loading: true,
    });
    axios
      .get('/api/data_a/list')
      .then((response) => {
        console.log(response.data.data)
        this.setState({
          data: response.data.data,
          loading: false,
        });
      })
      .catch((error) => {
        message.error(error.message);
        this.setState({
          loading: false,
        });
      });
  }

  getRecords() {
    const {data} = this.state;
    const {search} = this.state;
    if (search) {
      return (data || []).filter(
        (u) => u.FieldA != undefined && u.FieldA.toString().includes(search),
      );
    }
    return data;
  }

  renderList() {
    const {loading = false} = this.state;
    if (loading) {
      return <Spin/>;
    }
    var data = this.getRecords()
    if (data.length === 0) {
      return (
        <div
          style={{
            background: '#FFFF',
            padding: '20px',
          }}
        >
          <Empty/>
        </div>
      );
    }

    return (
      <Table
        scroll={{
          x: 1800,
        }}
        columns={[
          {
            title: '字段1',
            dataIndex: 'FieldA',
            sorter: (a, b) => a.FieldA - b.FieldA,
            defaultSortOrder: 'descend',
          },
          {
            title: '字段2',
            dataIndex: 'FieldB'
          },
          {
            title: '字段3',
            dataIndex: 'FieldC'
          },
          {
            title: '字段4',
            dataIndex: 'FieldD'
          },
          {
            title: '创建时间',
            dataIndex: 'CreatedTime'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            render: (record) => (
              <div>
                <Button
                  onClick={() => {
                    this.setState({
                      editing: true,
                      curRecord: record,
                    })
                  }}
                >
                  更新
                </Button>
              </div>
            ),
          },
        ]}
        dataSource={data}
        rowKey="FieldA"
        pagination={{pageSize: 50}}
      />
    );
  }

  render() {
    return (
      <div>
        <PageHeader
          title="数据A列表"
          action={
            <Button.Group>
              <Input
                placeholder="type to search"
                onChange={(e) => {
                  console.log('value is', e.target.value);
                  this.setState({
                    search: e.target.value,
                  });
                }}
              />
            </Button.Group>
          }/>
        {this.renderList()}
      </div>
    );
  }
}
