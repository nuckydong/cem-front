<template>
  <div>
    <ta-button @click="openAll">全部展开</ta-button>
    <ta-button  @click="closeAll">全部缩放</ta-button>
    <ta-table :columns="columns" :dataSource="data" rowKey="id" :pagination="{ pageSize: 5 }" >
      <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
      <span slot="customTitle"><ta-icon type="smile-o" /> 名称</span>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0" >{{record.description}}</p>
    </ta-table>
  </div>

</template>
<script>

  const columns = [{
    dataIndex: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  }, {
    title: '年龄',
    dataIndex: 'age',
  }];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      name: `Name ${i}`,
      age: i,
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    })
  }

  export default {
    name:"tableExample",
    data(){
      return {
        data,
        columns,
        expandRow:[]
      }
    },
    methods:{
      openAll(){
        this.expandRow = data.map(x => x.id);
      },
      closeAll(){
        this.expandRow = []
      },
      onExpandedRowsChange(rows){
        console.log(rows)
        this.expandRow = rows;
      },
      onExpandIcon(expanded, record){
        console.log(expanded, record)
      }
    }
  }
</script>
