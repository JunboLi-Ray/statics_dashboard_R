import axios from 'axios';
import {message} from "antd";

export default {
  easyFetch: (url, model, urlparam) => {
    if(url === undefined){
      url = `/api/crud/${model}s/`
    }
    if(urlparam!==undefined) {
      url = url+'?';
      url = url + urlparam.key + '=' + urlparam.value
    }
    return axios.get(url)
  },
  easyUpsert: (url,model,body) => axios.post(url?url:`/api/crud/${model}`, body)
    .then(
      message.info('成功！'),
    (err) => {
      message.error(err.message);
    }),
  easyDelete: (url, model, id) => axios.delete(url?url:`/api/crud/${model}/${id}`)
    .then(
      message.info('成功！'),
      (err) => {
        message.error(err.message);
      })
  ,
};
