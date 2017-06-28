<template>
  <div class="log">
    <Form :model="searchList" :label-width="90" style="padding: 15px 0 0px;border: 1px solid #ccc;margin-bottom: 5px;">
      <Row :gutter="16">
        <Col span="8">
          <Form-item label="操作内容">
            <Input v-model="searchList.optcontent" placeholder="操作内容"/>
          </Form-item>
        </Col>
        <Col span="5">
        <Form-item label="操作类别">
          <Select v-model="searchList.opttype">
            <Option v-for="item in typelist" :value="item.value" :key="item">{{ item.label }}</Option>
          </Select>
        </Form-item>
        </Col>
        <Col span="8">
        <Form-item label="操作人">
          <Input v-model="searchList.optuser" placeholder="操作人"/>
        </Form-item>
        </Col>
        <Col span="3">
        <Button type="primary" icon="ios-search" @click="queryloglist"></Button>
        </Col>
      </Row>
    </Form>
    <!--<div class="log-search">
      <Input v-model="search" icon="ios-search" @on-click="queryloglist"/>
      <Button slot="append" icon="ios-search" @click="queryloglist"></Button>
    </div>-->
    <Table border :columns="columns1" :data="data1"></Table>
    <div style="padding: 10px 0;">
      <Page :total="totalcount" show-total @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        totalcount: 0,
        page: 1,
        columns1: [{title: '操作人', key: 'optuser' },
          { title: '操作内容', key: 'optcontent', width:300 },
          { title: '操作类型', key: 'opttype', align: 'center',width:100 },
          { title: '操作类别', key: 'optcategory', align: 'center' },
          { title: '操作时间', key: 'opttime', align: 'center' }
        ],
        data1: [],
        typelist: [
          { value: '全部', label: '全部' },
          { value: '添加客户', label: '添加客户' },
          { value: '查看客户', label: '查看客户' },
          { value: '更新客户', label: '更新客户' },
          { value: '删除客户', label: '删除客户' },
          { value: '添加房源', label: '添加房源' },
          { value: '查看房源', label: '查看房源' },
          { value: '更新房源', label: '更新房源' },
          { value: '删除房源', label: '删除房源' }
        ],
        searchList: {
          optcontent: '',
          opttype: '全部',
          optuser:''
        }
      }
    },
    methods: {
      queryloglist () {
        this.$http({
          url: '/log/getLogs',
          params: {
            loginfo: JSON.stringify(this.searchList),
            page: this.page,
            perPage: 10
          },
          method: 'GET'
        }).then((req) => {
          var list = []
          var msg = req.data
          this.data1 = msg.data.list
          this.totalcount = msg.data.totalcount
        }).catch((req) => {

        })
      },
      changePage (e) {
        console.log(e)
        this.page = e
        this.queryloglist()
      }
    },
    created () {
      this.queryloglist()
    }
  }
</script>

<style>

</style>
