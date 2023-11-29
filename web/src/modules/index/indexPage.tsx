import React, {lazy, Suspense, useState} from 'react';
import {FileOutlined, PieChartOutlined, SketchCircleFilled} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {ConfigProvider, Layout, Menu, Spin, theme} from 'antd';
import {Route, routerRedux} from 'dva/router';

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('DashBoard', 'dashBoard', <PieChartOutlined/>),
    getItem('Data_A', 'data_a', <FileOutlined/>, [
        getItem('List', 'list'),
        getItem('Insert', 'insert'),
    ]),
];

const indexDashboard = lazy(() => import('../dashboard/index'))
const dataAList = lazy(() => import('../dashboard/index'))
const dataAInsert = lazy(() => import('../dashboard/index'))


const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {token: {colorBgContainer},} = theme.useToken();

    const handleMenuClick = ({keyPath}: { keyPath: string[] }) => {
        console.log(keyPath.join("/"))
        routerRedux.push(keyPath.reverse().join('/'));
    };

    return (
        <ConfigProvider theme={{
            algorithm: theme.defaultAlgorithm,
        }}>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical">
                        Project R
                        <SketchCircleFilled/>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['dashBoard']}
                          mode="inline" items={items} onClick={handleMenuClick}/>
                </Sider>
                <Layout>
                    <Header style={{padding: 0, background: colorBgContainer}}/>
                    <Content style={{margin: '0 16px'}}>
                        <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                            <Suspense
                                fallback={
                                    <div className="loading">
                                        <Spin size="large" tip="Loading"/>
                                    </div>
                                }
                            >
                                <Route path="/dashBoard" component={indexDashboard}/>
                                <Route path="/data_a/list" component={dataAList}/>
                                <Route path="/data_a/insert" component={dataAInsert}/>
                            </Suspense>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>©2023 Created by R</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default App;