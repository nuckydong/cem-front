<template>
<div class='editable-cell'>
  <div v-if="editable" class='editable-cell-input-wrapper'>
    <ta-date-picker
      :defaultValue="text?moment(text,'YYYY-MM-DD'):null"
      @change="handleChange"
      @pressEnter="check"
    /><ta-icon
      type='check'
      class='editable-cell-icon-check'
      @click="check"
    />
  </div>
  <div v-else class='editable-cell-text-wrapper'>
    {{text || ' '}}
    <ta-icon type='edit' class='editable-cell-icon' @click="edit" />
  </div>
</div>
</template>
<script>

  import moment from 'moment';
export default {
  props: {
    text: String,
    roleObj:Object,
  },
  data () {
    return {
      value: this.text,
      editable: false,
    }
  },
  methods: {
    moment,
    handleChange (date,dateString) {
      this.value = dateString;
    },
    check () {
      this.editable = false
      this.$emit('change', this.value, this.roleObj);
    },
    edit () {
      this.editable = true
    },
  },
}
</script>
