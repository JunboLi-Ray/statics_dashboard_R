import React from 'react';
import {ConfigProvider, theme} from 'antd';
import './App.css';
import IndexPage from './modules/index/indexPage'

function App() {
    return (
        <ConfigProvider theme={{
            algorithm: theme.defaultAlgorithm,
        }}>
            <IndexPage/>
        </ConfigProvider>
    );
}

export default App;
