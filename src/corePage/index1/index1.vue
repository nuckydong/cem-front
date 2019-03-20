<template>

  <div id="app">

    <index-layout></index-layout>

  </div>

</template>

<script>

  import indexLayout from './component/indexLayout'

  export default {
    name: 'index',
    components: {
      indexLayout
    },

    created() {

    },
    mounted() {

    },


  }
</script>

<style scoped type="text/scss" lang="scss">
  #app {
    height: 100%
  }

</style>
