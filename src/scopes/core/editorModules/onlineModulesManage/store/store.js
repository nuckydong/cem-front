const onlineModulesManageStore = {
  state: {
    onlineCode:{
      templateContent:``,
      templateName:``,
      templateId:``
    }
  },
  getters: {
    getOnlineCode:(state)=>{
      return state.onlineCode
    },
  },
  mutations: {
    setOnlineCode(state,value){
      state.onlineCode=Object.assign(state.onlineCode,value||{})
    },
  },
  actions: {}
}


export default onlineModulesManageStore
