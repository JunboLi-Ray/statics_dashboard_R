import dva from 'dva';
import {message} from 'antd';
import {createBrowserHistory} from 'history';
import createLoading from 'dva-loading';
import axios from 'axios';
import querystring from 'query-string';

import 'ant-design-pro/dist/ant-design-pro.css';
import './index.css';

axios.interceptors.request.use((config) => ({
  ...config,
  paramsSerializer: (params) => querystring.stringify(params),
}));

axios.interceptors.response.use(
  (response) => {
    if (response.headers && response.headers.user) {
      window.localStorage.setItem('user', response.headers.user);
    }
    return response;
  },
  (error) => {
    const newError = error;
    if (error.response && error.response.data && error.response.data.error) {
      newError.message = error.response.data.error;
    }
    if (error.response && error.response.headers && error.response.headers.user) {
      window.localStorage.setItem('user', error.response.headers.user);
    }
    return Promise.reject(newError);
  },
);

const history = createBrowserHistory({
  // basename: '/beta',
});
// 1. Initialize
const app = dva({
  history,
  onError: (err, dispatch) => {
    if (err.response) {
      dispatch({
        type: 'globalError/changeError',
        payload: err.response,
      });
    }
    message.error(err.message);
  },
});

app.use(createLoading());

// 2. Model
// app.model(require('./models/example').default);
app.model(require('./crud/easyModel').default);

// 3. Router
app.router(require('./router').default);

// 4. Start
app.start('#root');
