<!--<template>-->
  <!--<div>-->
    <!--<keep-alive>-->
      <!--<div>-->

      <!--</div>-->
    <!--</keep-alive>-->
  <!--</div>-->
<!--</template>-->

<script>
  export default {
    name: "from-preview",
    data() {
      return {
        input:`<ta-input><ta-input>`,
        data: {
          html: `<p><ta-input><ta-input><input id="tyText_1" class="item-src" style="width: 180px; height: 32px; font-size: 14px; font-family: \'Hiragino Sans GB\'; color: #606266; background-color: #ffffff; padding-left: 10px; border: 1px solid #cccccc;" title="单行文本框" contenteditable="false" type="text" value="" data-el="item-src" /></p>`,
          h1: `a-input`,
          h2: <ta-input><ta-input>,
          component: {
            "tyText_1": {
              "style": {
                "border": {
                  "borderType": "all",
                  "borderWidth": "1px",
                  "borderStyle": "solid",
                  "borderColor": "#ccc"
                },
                "width": "180px",
                "height": "32px",
                "font-size": "14px",
                "font-family": "Hiragino Sans GB",
                "color": "#606266",
                "background-color": "#ffffff",
                "padding-left": "10px"
              }, "id": "tyText_1", "value": "测试", "title": "单行文本框", "type": "tyText", "format": "text", "isShow": true
            }
          }
        }
      }
    },
    // render: function (createElement) {
    //
    //   return createElement('div',
    //     {}, [
    //       createElement('a-input', {}),
    //       this.data.h1,
    //       this.data.html
    //     ]
    //   );
    //
    // },

    render(){
      return(
        <div>
        {this.getchild()}
        </div>
    )
    },


    methods:{
      getchild(){
        var child=[];
        var con=document.createElement("div");
        con.innerHTML=this.data.html;
        var childnode=con.childNodes;
        console.log(childnode)
        var a=this.data.html
        child.push(this.data.html);
        return child;
      }
    }
  }


</script>

<style scoped>

</style>
