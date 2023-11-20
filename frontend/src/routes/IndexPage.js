import React, {lazy, Suspense} from 'react';
import {PropTypes} from 'prop-types';
import {Layout, Menu, Spin} from 'antd';
import {AlignLeftOutlined, ShoppingOutlined, SoundOutlined,} from '@ant-design/icons';
import {Route, routerRedux} from 'dva/router';
import {connect} from 'dva';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

import styles from './IndexPage.less';

const indexDashboard = lazy(() => import('../models/index/dashboard'));
const dataAList = lazy(() => import('../models/data_a/list'));
const dataAInsert = lazy(() => import('../models/data_a/insert'));

@connect(({globalError}) => ({
  globalError,
}))

export default class IndexPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    collapsed: false,
  };

  componentDidMount() {
  }

  handleMenuClick = ({keyPath}) => {
    this.props.dispatch(routerRedux.push(keyPath.reverse().join('/')));
  };

  renderMainContent() {
    return (
      <Suspense
        fallback={
          <div className="loading">
            <Spin size="large" tip="Loading"/>
          </div>
        }
      >
        <Route path="/index_dashboard" component={indexDashboard}/>
        <Route path="/data_a/list" component={dataAList}/>
        <Route path="/data_a/insert" component={dataAInsert}/>
        <Route path="/data_b/list" component={dataAList}/>
        <Route path="/data_b/insert" component={dataAInsert}/>
      </Suspense>
    );
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({collapsed});
  };

  render() {
    const {collapsed} = this.state;
    return (
      <Layout className={styles.container}>
        <Layout.Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className={styles.icon}>R项目</div>

          <Menu theme="dark" onClick={this.handleMenuClick}>
            <Menu.Item key="/index_dashboard" icon={<SoundOutlined/>}>
              看板
            </Menu.Item>

            <Menu.SubMenu key="/data_a" icon={<ShoppingOutlined/>} title={'数据A'}>
              <Menu.Item key="list" icon={<AlignLeftOutlined/>} title={'data_a_list'}>
                数据A-列表
              </Menu.Item>
              <Menu.Item key="insert" icon={<AlignLeftOutlined/>} title={'data_a_insert'}>
                数据A-新增
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="/data_b" icon={<ShoppingOutlined/>} title={'数据B'}>
              <Menu.Item key="list" icon={<AlignLeftOutlined/>} title={'data_b_list'}>
                数据B-列表
              </Menu.Item>
              <Menu.Item key="insert" icon={<AlignLeftOutlined/>} title={'data_b_insert'}>
                数据B-新增
              </Menu.Item>
            </Menu.SubMenu>

          </Menu>
        </Layout.Sider>
        <Layout>
          <Layout.Header className={styles.header}>
          </Layout.Header>
          <Layout.Content className={styles.content}>{this.renderMainContent()}</Layout.Content>
          <Layout.Footer>
            <GlobalFooter copyright="R"/>
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}
