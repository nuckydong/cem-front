import codetableApi from '../api/codetableApi'
import Vue from 'vue'

const loadMaster = {};

const defaultState = {
  codeMap:{}
};

const getters = {
  getCodeList_: (state) => (codeType) => {
    return state.codeMap[codeType];
  }
}

const mutations = {
  addCode$(state, payload){
    Vue.set(state.codeMap, payload.codeType, payload.codeList);
  },
  deleteCode$(state, codeType){
    delete state.codeMap[codeType]
  },
  deleteAllCode$(state){
    state.codeMap = {}
  }
}

const actions = {
  //加载未缓存的字典
  loadCodeIfAbsent$$({commit,dispatch,state,rootState},codeType){
    if(!state.codeMap.hasOwnProperty(codeType)){
      if(loadMaster[codeType]){
        return;
      }
      loadMaster[codeType] = true;
      codetableApi.loadCode(
        codeType,
        (codeList) => {
          commit('addCode$',{codeType:codeType,codeList:codeList||[]});
          delete loadMaster[codeType];
        },
        () => commit('deleteCode$',codeType)
      )
    }
  },
  //加载字典
  loadCode$$({commit,state,rootState},codeType){
    codetableApi.loadCode(
      codeType,
      (codeList) => commit('addCode$',{codeType:codeType,codeList:codeList||[]}),
      () => commit('deleteCode$',codeType)
    )
  },
  //删除字典
  removeCode$$({commit,state,rootState},codeType){
    codetableApi.removeCode(
      codeType,
      () => commit('deleteCode$',codeType),
      () => {},
    )
  },
  //加载全部字典缓存（前端删除缓存；后端重新加载缓存）
  loadAllCode$$({commit,state,rootState},codeType){
    codetableApi.loadAllCode(
      () => commit('deleteAllCode$'),
      () => {}
    )
  },
  //清空全部字典缓存
  clearCodeCache$$({commit,state,rootState},codeType){
    codetableApi.clearCodeCache(
      () => commit('deleteAllCode$'),
      () => {}
    )
  },
  //修改字典
  modifyCode$$({commit,state,rootState},codeObj){
    codetableApi.updateCode(
      codeObj,
      (code) => {
        commit('deleteCode$',code.codeType);
        commit('addCode$',{
          codeType: code.codeType,
          codeList: code.codeList
        });
      },
      () => {}
    )
  },
}

export default {
  namespace:false,
  state:defaultState,
  getters:getters,
  mutations:mutations,
  actions:actions
}
