import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // state主要是设置默认数据
  state: {
    AppUserStatus: false,
    specificTypeData:null,
    specificTypeID:null,
    getCates:null,
    userArr:[],
    clickHeadId:null,
    postUrl:'http://api.vs04o.cn/',
    // postUrl:'api/',
  },
  // mutations主要是修改store存储的值(同步)
  mutations: {
    increment(state,id){
      state.AppUserStatus = state; // 用户中心显示与否
      state.clickHeadId = id;
    },
    // userArrChange(state,data){
    //   Vue.delete(state,'userArr')
    //   state.userArr = data
    // }
  },
  // actions是异步的
  actions: {

  },
  getters: {
    chengedata(state){
      return state.userArr
    },
  }
});
export default store
