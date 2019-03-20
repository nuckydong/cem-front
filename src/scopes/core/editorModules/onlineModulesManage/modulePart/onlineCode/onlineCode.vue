<template>
  <code-editor :online-code="onlineCode"
               save-url="templateMg/templateMgRestService/updateTemplate"
               @saveOkCallback="saveOkCallback"
  ></code-editor>
</template>

<script>
  import {mapGetters} from 'vuex'
  import codeEditor from './components/codeEditor'

  export default {
    name: "onlineCode",
    components: {codeEditor},
    created() {

    },
    mounted() {

    },
    computed: {
      ...mapGetters({
        onlineCode: `getOnlineCode`
      }),
    },
    methods: {
      saveOkCallback(obj) {
        let {
          templateContent
        } = obj;
        this.$store.commit('setOnlineCode', {
          templateContent: templateContent,
        })
      }
    }


  }
</script>

<style scoped type="text/scss">


</style>
