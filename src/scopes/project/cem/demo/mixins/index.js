//所有页面需要执行的mixins
import $api from '../api/index'
import extendUserSetting from '@common/extendConfig/extendUserSetting'
import isArray from 'lodash/isArray'

const formItemLayouts = {
  default:{
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }
}

const mixins = {
  data(){
    return {
      formItemLayouts,
      extendSettings:[],
      formSettings:[],
    }
  },
  created(){
    $api.queryUserSettingTable(this,(data)=>{
      if(isArray(data.resultData) && data.resultData.length > 0) this.extendSettings = data.resultData;
    })
  },
  computed:{
    formNormalSettings(){
      return this.formSettings.filter(a => !a.isMore && a.exist) || []
    },
    formMoreSettings(){
      return this.formSettings.filter(a => a.isMore && a.exist) || []
    },
  },
  methods: {
    buildForm(initData){
      this.formSettings = this.getFormSettings(initData);
    },
    getFormNecessarySettings(initData){
      return [
        {
          id: 'name',
          formId: 'name',
          formItem: {
            type: 'input',
            collection: null
          },
          label: '姓名',
          decoratorOptions:{
            rules: [{ required: true, message: '请输入人员姓名' }], initialValue: initData.name
          },
          display: true,
          exist: true,
          formItemLayout: formItemLayouts.default
        },
        {
          id: 'gender',
          formId: 'gender',
          formItem: {
            type: 'input',
            collection: null
          },
          label: '性别',
          decoratorOptions:{
            rules: [{ required: true, message: '请输入性别' }], initialValue: initData.gender
          },
          display: true,
          exist: true,
          formItemLayout: formItemLayouts.default
        }
      ]
    },
    getFormSettings(initData = {}){
      let propSettings = this.extendSettings.sort((a,b)=>{
        return a.orderNo - b.orderNo
      }).map(setting => {
        let formId = setting.formId;
        let label = setting.displayText || '';
        let propSetting = {
          id: setting.fieldId,
          formId: formId,
          class: null,
          formItem: {
            type: setting.formType,
            collection: setting.connectAA10
          },
          label: label,
          display: setting.hide === '0',
          exist: setting.effective === '1',
          disabled: setting.unchangeable === '1',
          formItemLayout: formItemLayouts[formId] || formItemLayouts.default,
          decoratorOptions:{},
          isMore: setting.more === '1'
        }
        //todo protectPrivacy
        //rule 解析
        let rules = []
        if(setting.required === '1'){
          rules.push({ required: true, message: label+'是必须的' })
        }
        if(!isNaN(parseInt(setting.contentSize))){
          rules.push({ max: setting.contentSize, message: label+'内容长度不能超过'+setting.contentSize })
        }
        if(setting.validReg){
          let isreg;
          try{
            isreg=eval(setting.validReg) instanceof RegExp
          }catch(e){
            isreg=false
          }
          if(isreg){
            rules.push({ pattern: eval(setting.validReg), message: '请输入正确的'+label+'内容' })
          }
        }
        propSetting.decoratorOptions.rules = rules;

        //初始值
        if(initData.hasOwnProperty(formId)){
          propSetting.decoratorOptions.initialValue = initData[formId]
        }

        return propSetting
      })


      return this.getFormNecessarySettings(initData).concat(propSettings)
    }
  }
}

export default mixins
