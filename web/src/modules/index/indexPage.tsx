import React, {useState} from 'react';
import {FileOutlined, PieChartOutlined,} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu, theme} from 'antd';
import IndexDashBoard from '../dashboard/index';

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

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['dashBoard']} mode="inline" items={items}/>
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}/>
                <Content style={{margin: '0 16px'}}>
                    <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                        <IndexDashBoard/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>©2023 Created by R</Footer>
            </Layout>
        </Layout>
    );
};

export default App;