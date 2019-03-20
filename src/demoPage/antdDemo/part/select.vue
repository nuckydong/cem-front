<template>
  <ta-select style="width: 120px">
    <ta-select-option
      v-for="item in CollectionData('SEX')"
      :key="item.value"
      :value="item.value">
      {{item.label}}
    </ta-select-option>
  </ta-select>
</template>
<script>

  export default {
    name:"selectExample",
    data(){
      return {
      }
    }
  }
</script>

