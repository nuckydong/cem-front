<template>
  <ta-border-layout
    :center-cfg="{showBar:true}"
  >
    <div slot="centerExtraContent">
      <div style="float: left;">
        <h4>{{onlineCode.templateName}}</h4>
      </div>
      <div style="float: right">
        <ta-button @click="fnPreview" type="primary">预览</ta-button>
        <ta-button @click="saveFile" type="primary" >保存</ta-button>
      </div>
    </div>
      <ta-drawer
        title="Create"
        width=720
        placement="right"
        :closable="true"
        :visible="visible"
      >
        <iframe :src="iframeSrc" ></iframe>
      </ta-drawer>


    <codemirror v-model="code" :options="cmOptions"></codemirror>



  </ta-border-layout>
</template>
<script>
  import axios from 'axios'
  import {codemirror} from 'vue-codemirror-lite'

  require('codemirror/mode/javascript/javascript')
  require('codemirror/mode/vue/vue')
  require('codemirror/addon/hint/show-hint.js')
  require('codemirror/addon/hint/show-hint.css')
  require('codemirror/addon/hint/javascript-hint.js');


  export default {
    name: "codeEditor",
    components: {
      codemirror
    },
    props: {
      onlineCode: {
        type: Object,
        default() {
          return {
            templateContent: ``,
            templateName: ``,
            templateId: ``
          }
        }
      },
      saveUrl: {
        type: String,
        default: `templateMg/templateMgRestService/updateTemplate`
      }
    },
    data() {
      return {
        code: this.onlineCode.templateContent,
        visible:false,
        iframeSrc:`#`,
        cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'text/x-vue',
          lineNumbers: true,
          line: true,
          // more codemirror options, 更多 codemirror 的高级配置...
        },
      }
    },
    mounted() {

    },
    methods: {
      fnPreview() {
        this.visible=true;
        const self = this;
        axios.post('http://192.168.17.18:3000', {
          'template': this.code,
          'fileName': this.onlineCode.templateName
        }).then((response) => {
          this.iframeSrc= 'http://192.168.17.18:3000/' + this.onlineCode.templateName;
        }).catch(function (error) {
          console.log(error)
        })
      },
      saveFile() {
        this.Base.submit(null, {
          url: this.saveUrl,
          data: {
            templateId: this.onlineCode.templateId,
            templateStr: this.code
          },

        }, {
          successCallback: () => {
            this.$message.success(`保存成功!`);
            this.$emit(`saveOkCallback`, {...this.onlineCode, templateContent: this.code})
          }
        })
      }

    },
    watch: {
      onlineCode: {
        handler(now, old) {
          console.log(now)
          this.code = now.templateContent
        },
        deep: true
      }
    }
  }

</script>

<style>
  .vue-codemirror-wrap {
    height: 100%;
  }

  .CodeMirror {
    height: auto;
  }
</style>
