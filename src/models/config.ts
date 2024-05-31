export default {
  // models命名空间，需全局唯一
  namespace: 'configure',
  // models存储的数据store
  state: {
    ceshi: 'ceshi',
  },
  effects: {
    *onSaveConfigureData({ payload, successCallback }, { put, select }) {
      // const state = yield select((_) => _.configure);
      yield put({
        type: 'onSaveData',
        payload,
      });
      successCallback && successCallback();
    },
  },
  // 更新store，用新数据合并state的旧数据
  reducers: {
    onSaveData(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
