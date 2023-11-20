import service from './easyService';


export default {
  namespace:'easyTable',
  state:{
    data :{},
  },
  reducers: {
    setData(state, {model, dataSource, editing, editingRecord, searchValue, urlparam}) {
      const modelData = {
        ...state.data[model]
      };
      if(dataSource !== undefined) {
        modelData.dataSource = dataSource
      }
      if(editing !== undefined) {
        modelData.editing = editing
      }
      if(editingRecord !== undefined) {
        modelData.editingRecord = editingRecord
      }
      if(searchValue !== undefined) {
        modelData.searchValue = searchValue
      }
      if(urlparam !== undefined) {
        modelData.urlparam = urlparam
      }
      const newData = JSON.parse(JSON.stringify(state.data));
      newData[model] = modelData;
      return {
        ...state,
        data: newData,
      };
    },
  },
  effects:{
    *fetchData({model, url}, { call, put, select }) {
      const urlparam = yield select(state => state['easyTable'].data[model]?state['easyTable'].data[model].urlparam:undefined);
      const result = yield call(service.easyFetch, url, model, urlparam);
      yield put({ type: 'setData', model: model, dataSource: result.data });
    },
    *upsert({ model, url, getListUrl, payload }, { call,put }) {
      console.log('going to upsert', payload, model);
      yield call(service.easyUpsert, url, model, payload);
      yield put({ type: 'fetchData', model: model, url: getListUrl});
    },
    *delete({ model, url, id }, {call}) {
      yield call(service.easyDelete, url, model, id);
    },
  }

};
