<template>
  <div>
    <ta-select v-model="sex" style="width: 120px">
      <ta-select-option v-for="item in CollectionData('SEX')"
                        :key="item.value"
                        :value="item.value">
        {{item.label}}
      </ta-select-option>
    </ta-select>
    <ta-table :columns="columns" :dataSource="data" rowKey="id" :pagination="{ pageSize: 5 }" >
      <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
      <span slot="customTitle"><ta-icon type="smile-o" /> 名称</span>
      <span slot="sex" slot-scope="text">{{CollectionLabel('SEX',text)}}</span>
      <span slot="isOn" slot-scope="text">{{CollectionLabel('YESORNO',text)}}</span>
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
  }, {
    title: '性别(码值)',
    dataIndex: 'sex',
    scopedSlots: { customRender: 'sex' },
  },{
    title: '是否在职(码值)',
    dataIndex: 'isOn',
    scopedSlots: { customRender: 'isOn' },
  }];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      name: `Name ${i}`,
      age: i,
      sex: i%2 + 1,
      isOn: i%2,
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    })
  }

  export default {
    name:"collectionExample",
    data(){
      return {
        data,
        columns,
        sex:''
      }
    }
  }
</script>
