<template>
  <div id="app" ref="app">
    <h1>{{message+num}}</h1>
    <button @click="destroyApp">destroyApp</button>
    <button @click="changeValue">changeValue</button>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        message: 'Vue的生命周期',
        num:0
      }
    },
    beforeCreate() {
      //此时 data和dom节点都没有被创建
      console.group('------beforeCreate创建前状态------');
      console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
      console.log("%c%s", "color:red", "data   : " + this.$data); //undefined
      console.log("%c%s", "color:red", "message: " + this.message)
    },
    created() {
      //此时data已经被初始化,但是dom还没有被创建
      console.group('------created创建完毕状态------');
      console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
      console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
    },
    beforeMount() {
      //此时 data已经被初始化 虚拟dom节点已经被创建,但是还没有挂载到真实节点上,此时页面中没有显示
      console.group('------beforeMount挂载前状态------');
      console.log("%c%s", "color:red", "el     : " + (this.$el)); //已被初始化
      console.log(this.$el);
      console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
    },
    mounted() {
      //此时data已经被初始化 虚拟dom节点已经被挂载到页面上,页面显示
      console.group('------mounted 挂载结束状态------');
      console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
      console.log(this.$el);
      console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
    },
    beforeUpdate() {
      //页面组件状态更新之前触发
      console.group('beforeUpdate 更新前状态===============》');
      console.log("%c%s", "color:red", "el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red", "data   : " + this.$data);
      console.log("%c%s", "color:red", "message: " + this.message);
    },
    updated() {
      //页面组件状态更新触发
      console.group('updated 更新完成状态===============》');
      console.log("%c%s", "color:red", "el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red", "data   : " + this.$data);
      console.log("%c%s", "color:red", "message: " + this.message);
    },
    beforeDestroy() {
      //页面组件销毁之前触发
      console.group('beforeDestroy 销毁前状态===============》');
      console.log("%c%s", "color:red", "el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red", "data   : " + this.$data);
      console.log("%c%s", "color:red", "message: " + this.message);
    },
    destroyed() {
      //页面组件销毁之后触发
      console.group('destroyed 销毁完成状态===============》');
      console.log("%c%s", "color:red", "#app     : " + this.$refs.app);
      console.log("%c%s", "color:red", "el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red", "data   : " + this.$data);
      console.log("%c%s", "color:red", "message: " + this.message)
    },
    methods:{
      destroyApp(){
        this.$destroy();
      },
      changeValue(){
        this.num++
      }
    }
  }
</script>

