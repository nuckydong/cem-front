<template>
  <div style="height: 100%">
    <ta-border-layout :layout="{header:'70px'}" :centerCfg="{showBar: true}">
      <ta-row slot="header" type="flex" justify="center" align="middle">
        <ta-input-search v-model="search" placeholder="输入系统名称/编码/拼音简写" @search="querySystem" enterButton="搜索" style="width: 340px; line-height: 46px" />
      </ta-row>
      <div slot="centerExtraContent" style="line-height: 44px; float: right">
        <ta-button :disabled="!hasSelected" @click="deleteVisible = true">批量删除</ta-button>
        <ta-button  type="primary" @click="visible = true">新增</ta-button>
      </div>
      <div class="fit">
        <ta-table
          :columns="columns"
          :dataSource="tableData"
          rowKey="id"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :pagination='false'
        >
          <template slot="effective" slot-scope="text">
            <ta-tag v-if="text == '1'" color="green" class='no-cursor'>有效</ta-tag>
            <ta-tag v-else color="red" class='no-cursor'>无效</ta-tag>
          </template>
          <span slot="modifyTime" slot-scope="time">{{fnDateFormate(time)}}</span>
          <template v-for="col in ['sysName', 'sysCode','backgroundAddress', 'address','portalSystem']" :slot="col" slot-scope="text, record, index">
            <div v-if="col!='portalSystem'">
              <ta-input v-if="record.editable" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record.id, col)"/>
              <template v-else>{{text}}</template>
            </div>
            <div v-if="col=='portalSystem'">
              <ta-select v-if="record.editable" style="margin: -5px 0" defaultValue='是'>
                <ta-select-option value="1">是</ta-select-option>
                <ta-select-option value="0">否</ta-select-option>
              </ta-select>
              <template v-else>{{text}}</template>
            </div>
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class='editable-row-operations'>
                  <span v-if="record.editable">
                   <a @click="save(record.id)">保存</a>
                   <ta-divider type="vertical"/>
                   <ta-popconfirm title='是否放弃编辑?' @confirm="cancel(record.id)" okText="是" cancelText="否">
                       <a>取消</a>
                   </ta-popconfirm>
                  </span>
              <span v-else>
                     <a @click="edit(record.id)">编辑</a>
                     <ta-divider type="vertical"/>
                     <a v-if="record.effective==1" @click="editEffective(record,'0')">禁用</a>
                     <a v-if="record.effective==0" @click="editEffective(record,'1')">启用</a>
                    <ta-divider type="vertical"/>
                     <ta-popconfirm title="确定删除?" @confirm="handleDelete(record.id)" okText="是" cancelText="否">
                         <a>删除</a>
                     </ta-popconfirm>
                 </span>
            </div>
          </template>
        </ta-table>
        <ta-pagination
          style="float: right; margin-top: 10px;"
          showSizeChanger
          showQuickJumper
          :dataSource.sync="tableData"
          :defaultPageSize="10"
          :params="pageParams"
          url="org/sysmg/accessSystemManagementRestService/queryAccessSystemByParam"
          ref="accessGridPager"
        />
      </div>
    </ta-border-layout>
    <!--新增-->
    <add-system :visible="visible" @close="visible = false" @queryTable="querySystem"></add-system>
    <!--删除-->
    <delete-input :visible="deleteVisible" :deleteIds="selectedRowKeys" @close="deleteVisible = false" @queryTable="querySystem"></delete-input>
  </div>
</template>
<script>

  import addSystem from './part/addSystem'
  import deleteInput from './part/deleteInput'
  import $api from './api/index'

  const columns = [
    { title: '系统名称', dataIndex: 'sysName', width: '20%', overflowTooltip: true, scopedSlots: { customRender: 'sysName' } },
    { title: '系统自定义编码', width: '20%', overflowTooltip: true, dataIndex: 'sysCode', scopedSlots: { customRender: 'sysCode' } },
    { title: '后台地址', width: '20%', overflowTooltip: true, dataIndex: 'backgroundAddress', scopedSlots: { customRender: 'backgroundAddress' } },
    { title: '系统地址', dataIndex: 'address', width: '20%', overflowTooltip: true, scopedSlots: { customRender: 'address' }, sorter: (a, b) => a.address.length - b.address.length },
    { title: '有效标识', width: 120, dataIndex: 'effective', key: 'effective', scopedSlots: { customRender: 'effective' }, onFilter: (value, record) => { record.effective.indexOf(value) === 0 } },
    { title: '操作', align: 'center', width: 200, dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
  ];

  const tableData = [];
  export default {
    name: 'app',
    data () {
      // 行编辑数据
      this.cacheData = tableData.map(item => ({ ...item }))
      return {
        portalSystem: '1',
        // 是否有效(暂定1为有效,0为无效,默认为1)
        effective: '1',
        visible: false,
        deleteVisible: false,
        columns: columns,
        tableData,
        selectedRowKeys: [],
        selectedRows: [],
        search: ''
      }
    },
    components:{addSystem,deleteInput},
    computed: {
      hasSelected () {
        return this.selectedRowKeys.length > 0
      }
    },
    mounted () {
      this.querySystem();
    },
    methods: {
      //分页参数
      pageParams(){
        var sysName, code, spell
        var regSpell = new RegExp('^[A-Z]*$');
        var regCode = new RegExp('^[a-z0-9]*$');
        if (regSpell.test(this.search)) {
          spell = this.search
        } else if (regCode.test(this.search)) {
          code = this.search
        } else {
          sysName = this.search
        }
        return {
          sysCode: code,
          sysName: sysName,
          spell: spell
        }
      },
      // 查询表格数据
      querySystem () {
        this.$refs.accessGridPager.loadData();
      },
      // 选中改变事件
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRows = selectedRows
        this.selectedRowKeys = selectedRowKeys
      },
      // 行编辑
      edit (id) {
        const newData = [...this.tableData]
        const target = newData.filter(item => id === item.id)[0]
        if (target) {
          target.editable = true
          this.tableData = newData
        }
      },
      // 行编辑保存
      save (id) {
        const newData = [...this.tableData]
        if(!this.fnCheckAllInput(newData)) return;
        const target = newData.filter(item => id === item.id)[0]

        var param = {
          sysCode: target.sysCode,
          sysName: target.sysName,
          protocol: target.address.split(':')[0],
          spell: this.Tool.pinyin.getCamelChars(target.sysName),
          port: target.address.split(':')[2].split('/')[0],
          portalSystem: target.portalSystem,
          effective: target.effective,
          domain: target.address.split(':')[1].substring(2),
          contextPath: target.address.split(':')[2].split('/')[1],
          id: target.id,
          backgroundAddress: target.backgroundAddress
        }

        if (target) {
          delete target.editable
          this.tableData = newData
          this.cacheData = newData.map(item => ({ ...item }))
        }

        $api.updateTaAccessSystemById(this, param, (data) => {
          if (data.serviceSuccess) {
            if (data.errors === null) {
              this.$message.success('行编辑成功')
              this.querySystem()
            } else {
              this.$message.error(data.errors[0].msg)
            }
          } else {
            this.$message.error('行编辑失败')
          }
        })
      },
      // 行编辑取消
      cancel (id) {
        const newData = [...this.tableData]
        if(!this.fnCheckAllInput(newData))return;
        const target = newData.filter(item => id === item.id)[0]
        if (target) {
          Object.assign(target, this.cacheData.filter(item => id === item.id)[0])
          delete target.editable
          this.tableData = newData
        }
      },
      fnCheckInput(column,value){
        this.$message.destroy()
        if (column == 'address') {
          let reg = new RegExp('^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$|^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:[0-9]+)?(\/?[a-zA-Z0-9]+\.?[a-zA-Z0-9]+)?$')
          if (!value.length) {
            this.$message.error('系统地址不能为空', 5)
            return false;
          }
          if (!reg.test(value)) {
            this.$message.error('系统地址格式不正确', 5)
            return false;
          }
        }
        if (column == 'sysCode') {
          if (!/^[a-z0-9]*$/.test(value)) {
            this.$message.error('格式不正确,接入系统标识只能为小写英文字母和数字组合', 5)
            return false;
          }
          if (!value.length) {
            this.$message.error('系统自定义编码不能为空', 5)
            return false;
          }
        }
        if (column == 'backgroundAddress') {
          if (!value.length) {
            this.$message.error('后台地址不能为空', 5)
            return false;
          }
        }
        if (column == 'sysName') {
          if (!value.length) {
            this.$message.error('系统名称不能为空', 5)
            return false;
          }
        }
        return true;
      },
      fnCheckAllInput(data){
        let BreakException = {}
        try{
          data.forEach(item => {
            Object.keys(item).forEach(column => {
              let result = this.fnCheckInput(column,item[column]);
              if(!result) throw BreakException
            })
          })
        }catch (e) {
          return false;
        }
        return true;
      },
      // 行编辑改变值
      handleChange (value, id, column) {
        this.fnCheckInput(column,value)
        const newData = [...this.tableData]
        const target = newData.filter(item => id === item.id)[0]
        if (target) {
          target[column] = value
          this.tableData = newData
        }
      },
      // 删除接入系统
      handleDelete (id) {
        $api.deleteTaAccessSystemById(this, {id: id}, (data) => {
          if (data.serviceSuccess) {
            if (data.errors === null) {
              this.$message.success('删除成功')
              this.querySystem()
            } else {
              this.$message.error(data.errors[0].msg)
            }
          } else {
            this.$message.error('删除失败')
          }
        })
      },
      // 时间转换
      fnDateFormate (time) {
        var date = new Date(time)
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      },
      // 禁用和启用
      editEffective (record, value) {
        record.effective = value
        $api.updateTaAccessSystemById(this, record, (data) => {
          if (data.serviceSuccess) {
            if (data.errors === null) {
              this.$message.success((value == '1'?'启用':'禁用')+'成功')
              this.querySystem()
            } else {
              this.$message.error(data.errors[0].msg)
            }
          } else {
            this.$message.error((value == '1'?'启用':'禁用')+'失败')
          }
        })
      },
    }
  }
</script>
