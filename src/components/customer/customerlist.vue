<template>
  <div class="customer">
    <Form :model="cusinfo" :label-width="90" style="padding: 15px 0 0px;border: 1px solid #ccc;margin-bottom: 5px;">
      <Row>
        <Col span="5">
        <Form-item label="需求面积">
          <Row>
          <Col span="11"><Input v-model="cusinfo.housearea1" placeholder="请填数字"/></Col>
          <Col span="2" align="center">-</Col>
          <Col span="11"><Input v-model="cusinfo.housearea2" placeholder="请填数字"/></Col>
          </Row>
        </Form-item>
        </Col>
        <Col span="6">
        <Form-item label="所属行业">
          <Cascader :data="searchdataindustry" v-model="cusinfo.industry" placeholder="所属行业"></Cascader>
        </Form-item>
        </Col>
        <Col span="5">
        <Form-item label="配电大小">
          <Row>
          <Col span="11"><Input v-model="cusinfo.distribution1" placeholder="请填数字"/></Col>
          <Col span="2" align="center">-</Col>
          <Col span="11"><Input v-model="cusinfo.distribution2" placeholder="请填数字"/></Col>
          </Row>
        </Form-item>
        </Col>
        <Col span="8">
        <Form-item label="是否需要行车">
          <Row>
          <Col span="6">
            <!--<Select v-model="cusinfo.isdriving" @on-change="getIsDrive">
              <Option value="全部">全部</Option>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>-->
            <select v-model="cusinfo.isdriving" @change="getIsDrive">
              <option value="全部">全部</option>
              <option value="true">是</option>
              <option value="false">否</option>
            </select>
          </Col>
          <Col span="8" v-show="cusinfo.isShow">
          <Input v-model="cusinfo.driviecontent1" placeholder="吨位">
          <!--<span slot="append">吨位</span>--></Input>
          </Col>
            <Col span="2" v-show="cusinfo.isShow" align="center">-</Col>
            <Col span="8" v-show="cusinfo.isShow">
            <Input v-model="cusinfo.driviecontent2" placeholder="吨位"></Input>
            </Col>
            </Row>
        </Form-item>
        </Col>
      </Row>
      <Row>
        <Col span="4">
        <Form-item label="需求区域">
          <Select v-model="cusinfo.demandarea">
            <Option v-for="item in demandlist" :value="item.value" :key="item">{{ item.label }}</Option>
          </Select>
        </Form-item>
        </Col>
        <Col span="4">
        <Form-item label="跟踪状况">
          <Input v-model="cusinfo.trackingstatus" placeholder=""/>
        </Form-item>
        </Col>
        <Col span="4">
        <Form-item label="手机号">
          <Input v-model="cusinfo.telephone" placeholder="请填数字"/>
        </Form-item>
        </Col>
        <Col span="5">
        <Form-item label="单位名称">
          <Input v-model="cusinfo.company" placeholder=""/>
        </Form-item>
        </Col>
        <Col span="5">
        <Form-item label="客户姓名">
          <Input v-model="cusinfo.name" v-show="true" placeholder="客户姓名"></Input>
        </Form-item>
        </Col>
        <Col span="2" align="center">
          <Button type="primary"  icon="ios-search" @click="queryCustomerlist"></Button>
        </Col>
      </Row>
    </Form>

    <Table border :columns="columns1" :data="data1"></Table>
    <div style="padding: 10px 0;">
      <Page :total="totalcount" show-total @on-change="changePage"></Page>
    </div>
    <Modal v-model="modaledit" :mask-closable="false" class-name="vertical-center-modal">
      <p slot="header" style="color:#f60;text-align:center;font-size: 16px;">
        <!--<Icon type="information-circled"></Icon>-->
        <Icon type="ios-compose"></Icon>
        <span>客户信息</span>
      </p>
      <div>
        <Form :model="editInfo" ref="editInfo" :rules="ruleValidate" :label-width="90">
          <Row>
            <Col span="12">
            <Form-item label="客户姓名" prop="name">
              <Input v-model="editInfo.name" placeholder=""/>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="手机号" prop="telephone">
              <Input v-model="editInfo.telephone" placeholder=""/>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="单位名称" prop="company">
              <Input v-model="editInfo.company" placeholder=""/>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="房源面积" prop="housearea">
              <Input v-model="editInfo.housearea" placeholder="">
              <span slot="append">㎡</span>
              </Input>
            </Form-item>
            </Col>
            <Col span="24">
            <Form-item label="租赁方式">
              <Radio-group v-model="editInfo.leasetype">
                <Radio label="求租"></Radio>
                <Radio label="求购"></Radio>
                <Radio label="求租求购"></Radio>
              </Radio-group>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="客户性质">
              <Select v-model="editInfo.quality" style="width:200px">
                <Option v-for="item in quality" :value="item.value" :key="item">{{ item.label }}</Option>
              </Select>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="企业性质">
              <Select v-model="editInfo.nature" style="width:200px">
                <Option v-for="item in naturelist" :value="item.value" :key="item">{{ item.label }}</Option>
              </Select>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="所属行业">
              <Cascader :data="dataindustry" v-model="editInfo.industry"></Cascader>
            </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="需求区域">
                <i-select v-model="editInfo.demandarea" style="width:200px">
                  <i-option v-for="item in demandlist" :value="item.value" :key="item">{{ item.label }}</i-option>
                </i-select>
              </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="是否需要行车">
              <i-switch size="large" v-model="isDr" @on-change="isDriving1" style="float: left;margin-top: 4px;">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
              <Input v-model="editInfo.driviecontent" v-show="isDr" placeholder="吨位" style="width: 100px;float: left;margin-left: 10px;">
              <span slot="append">吨位</span>
              </Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="配电大小">
              <Input v-model="editInfo.distribution" placeholder="">
              <span slot="append">kva</span>
              </Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="跟踪情况">
                <Input v-model="editInfo.trackingstatus" placeholder=""></Input>
            </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer" align="center">
        <Button type="primary" @click="updateInfo">更新</Button>
        <Button type="warning" @click="modaledit = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import customerRow from './customer-row.vue'
  import customeredit from './customeredit.vue'
  export default {
    components: { customerRow, customeredit },
    data () {
      return {
        totalcount: 0,
        page: 1,
        columns1: [
          {title: '姓名', key: 'name'},
          { title: '单位', key: 'company' },
          { title: '房源面积(㎡)', key: 'housearea', align: 'center' },
          { title: '需求区域', key: 'demandarea',align: 'center', width: 120  },
          { title: '操作人', key: 'optusername',align: 'center'},
          { title: '更新时间', key: 'updatetime',align: 'center', width: 180 },
          {
            title: '操作',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.row)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id, params.row.name)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: [],
        cusinfo: {
          isShow: false,
          housearea1:'',
          housearea2: '',
          industry: [],
          name: '',
          company: '',
          telephone: '',
          demandarea: '全部区域',
          isdriving: '全部',
          drivecontent1:'',
          drivecontent2:'',
          distribution1: '',
          distribution2: '',
          trackingstatus: ''
        },
        editInfo: {
          id: '',
          name: '',
          company: '',
          telephone: '',
          housearea: '',
          leasetype: '求租',
          industry: [],
          demandarea: '',
          distribution: '',
          trackingstatus: '',
          quality: '',
          nature: '',
          isDriving: false,
          driviecontent: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '客户名不能为空', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern: /^1\d{10}$/, message: '手机格式不正确', trigger: 'blur' }
          ],
          company: [
            { required: true, message: '单位名称不能为空', trigger: 'blur' }
            // { type: 'password', message: '密码格式不正确', trigger: 'blur' }
          ],
          housearea: [
            { required: true, message: '房源面积不能为空', trigger: 'blur' },
            { pattern: /^[1-9]\d*$/, message: '房源面积输入不正确', trigger: 'blur' }
          ]
        },
        searchdataindustry: [],
        dataindustry: [],
        dataurl: '../../../static/industry.json',
        demandlist: [
          { value: '全部区域', label: '全部区域' },
          { value: '锡山区', label: '锡山区' },
          { value: '惠山区', label: '惠山区' },
          { value: '滨湖区', label: '滨湖区' },
          { value: '梁溪区', label: '梁溪区' },
          { value: '新吴区', label: '新吴区' }
        ],
        quality: [
          {
            value: '固定',
            label: '固定'
          },
          {
            value: '重点',
            label: '重点'
          }
        ],
        naturelist: [
          {
            value: '内资',
            label: '内资'
          },
          {
            value: '外资',
            label: '外资'
          }
        ],
        modaledit: false,
        isDr: false,
        isDrse: false
      }
    },
    methods: {
      queryCustomerlist () {
//        if (this.cusinfo.isdriving) {
//          this.cusinfo.isdriving = 1
//        } else if (!this.cusinfo.isdriving) {
//          this.cusinfo.isdriving = 0
//        }
        this.$http({
          url: '/customer/list',
          params: {
            cusinfo: this.cusinfo,
            page: this.page,
            prepage: 10
          },
          method: 'GET'
        }).then((req) => {
          var list = []
          var msg = req.data
          this.data1 = msg.data.list
          this.totalcount = msg.data.totalcount
        })
      },
      changePage (e) {
        this.page = e
        this.queryCustomerlist()
      },
      show (param) {
        this.$http({
          url: '/customer/info',
          params:{ id: param.id }
        }).then((req) => {
          if (req.data.success === 0) {
            this.modaledit = true
            if (req.data.data.isDriving === 'true') {
              this.isDr = true
            } else {
              this.isDr = false
            }
            this.editInfo = req.data.data
          } else {
            this.$Message.success('房源信息查询失败！')
          }
        })
      },
      remove (id, name) {
        this.$Modal.confirm({
          title: '操作提示',
          content: '<p>确认删除该条客户信息？</p>',
          onOk: () => {
            this.$http({
              url: '/customer/delete',
              params: {
                customerid: id,
                name: name
              }
            }).then((req) => {
              if (req.data.success===0) {
                this.$Message.success('客户信息删除成功！')
                this.queryCustomerlist()
              }else{
                this.$Message.success(req.data.data)
              }
            })
          },
          onCancel: () => {
//            this.$Message.info('点击了取消');
          }
        });
      },
      isDriving1 (e) {
        this.isDr = e
      },
      getIsDrive () {
        var v = this.cusinfo.isdriving
        var bool = false
        if (v === 'true') {
          bool = true
        }
        this.cusinfo.isShow = bool
      },
      updateInfo () {

        if (this.isDr) {
          this.editInfo.isDriving = 'true'
        } else {
          this.editInfo.isDriving = 'false'
        }
        console.log(this.editInfo.isDriving)
        this.$http({
          url: '/customer/update',
          params: {
            cusStr:JSON.stringify(this.editInfo)
          }
        }).then((req) => {
          this.modaledit = false
          this.$Message.success(req.data.data)
          this.queryCustomerlist()
        })
      },
      getData () {
        let self = this;
        self.$http({url: self.dataurl}).then((res) => {
          self.searchdataindustry = res.data.list;
          self.dataindustry = res.data.list;
        })
      },
      isDriving (e) {
        this.isDrse = e
      }
    },
    created () {
      this.getData()
      this.queryCustomerlist()
    }
  }
</script>

<style>
  .ivu-table-cell{
    padding:0 10px;
  }
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ivu-modal{
    width: 660px;
    top:0;
  }
  .ivu-modal-content{
    width: 660px;
  }
</style>
