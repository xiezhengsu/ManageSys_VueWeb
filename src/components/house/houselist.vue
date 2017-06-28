<template>
  <div class="house">
    <Form :model="searchList" :label-width="85" style="padding: 15px 0 0px;border: 1px solid #ccc;margin-bottom: 5px;">
      <Row :gutter="8">
        <Col span="5">
        <Form-item label="房源区域">
          <Select v-model="searchList.housedistrict">
            <Option v-for="item in arealist" :value="item.value" :key="item">{{ item.label }}</Option>
          </Select>
        </Form-item>
        </Col>
        <Col span="6">
        <Form-item label="房源面积">
          <Row>
          <Col span="11"><Input v-model="searchList.housearea1" placeholder="请填数字"/></Col>
          <Col span="2" align="center">-</Col>
          <Col span="11"><Input v-model="searchList.housearea2" placeholder="请填数字"/></Col>
          </Row>
        </Form-item>
        </Col>
        <Col span="4">
        <Form-item label="出租楼层">
          <Input v-model="searchList.leasefloor" placeholder="出租楼层"/>
        </Form-item>
        </Col>
        <Col span="8">
        <Form-item label="是否需要行车">
          <Row>
            <Col span="5">
            <!--<Select v-model="searchList.isdriving" @on-change="getIsDrive">
              <Option value="全部">全部</Option>
              <Option value="true">是</Option>
              <Option value="false">否</Option>
            </Select>-->
            <select v-model="searchList.isdriving" @change="getIsDrive" style="width: 50px">
              <option value="全部">全部</option>
              <option value="true">是</option>
              <option value="false">否</option>
            </select>
            </Col>
            <Col span="8" v-show="searchList.isShow">
            <Input v-model="searchList.driviecontent1" placeholder="吨位">
            <!--<span slot="append">吨位</span>--></Input>
            </Col>
            <Col span="2" v-show="searchList.isShow" align="center">-</Col>
            <Col span="8" v-show="searchList.isShow">
            <Input v-model="searchList.driviecontent2" placeholder="吨位"></Input>
            </Col>
          </Row>
        </Form-item>
        </Col>
        </Row>
        <Row :gutter="8">
        <Col span="5">
        <Form-item label="配电大小">
          <Row>
            <Col span="11"><Input v-model="searchList.distribution1" placeholder="请填数字"/></Col>
            <Col span="2" align="center">-</Col>
            <Col span="11"><Input v-model="searchList.distribution2" placeholder="请填数字"/></Col>
          </Row>
        </Form-item>
        </Col>
        <Col span="5">
        <Form-item label="目前状况">
          <Input v-model="searchList.currentstatus" placeholder="目前状况"/>
        </Form-item>
        </Col>
        <Col span="5">
        <Form-item label="单位名称">
          <Input v-model="searchList.company" placeholder="单位名称"/>
        </Form-item>
        </Col>
        <Col span="5">
        <Form-item label="公司地址">
          <Input v-model="searchList.companyaddr" placeholder="公司地址"/>
        </Form-item>
        </Col>
        <Col span="5">
        <Form-item label="手机号">
          <Input v-model="searchList.telephone" placeholder="手机号"/>
        </Form-item>
        </Col>
        <Col span="5">
        <Form-item label="负责人">
          <Input v-model="searchList.manageuser" placeholder="负责人"/>
        </Form-item>
        </Col>
        <Col span="1" align="right">
        <Button type="primary"  icon="ios-search" @click="queryHouselist"></Button>
        </Col>
      </Row>
    </Form>
    <Table border :columns="columns1" :data="data1"></Table>
    <div style="padding: 10px 0;">
      <Page :total="totalcount" show-total @on-change="changePage"></Page>
    </div>
    <Modal v-model="modaledit" :mask-closable="false" class-name="vertical-center-modal" style="width: 620px;">
      <p slot="header" style="color:#f60;text-align:center;font-size: 16px;">
        <Icon type="ios-compose"></Icon>
        <span>房源信息</span>
      </p>
      <div>
        <Form :model="updateinfo" ref="updateinfo" :rules="ruleValidate" :label-width="90" width="620">
          <Row style="width: 620px;">
            <Col span="12">
            <Form-item label="负责人姓名" prop="manageuser">
              <Input v-model="updateinfo.manageuser" placeholder=""/>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="单位名称" prop="company">
              <Input v-model="updateinfo.company" placeholder=""/>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="公司地址" prop="companyaddr">
              <Input v-model="updateinfo.companyaddr" placeholder=""/>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="房源面积" prop="housearea">
              <Input v-model="updateinfo.housearea" placeholder=""/>
              <span slot="append">㎡</span>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="租赁方式">
              <Radio-group v-model="updateinfo.leasetype">
                <Radio label="出租"></Radio>
                <Radio label="出售"></Radio>
                <Radio label="租售"></Radio>
              </Radio-group>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="租金" prop="rent">
              <Input v-model="updateinfo.rent" placeholder=""/>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="房源区域">
              <Select v-model="updateinfo.housedistrict" style="width:200px">
                <Option v-for="item in arealist" :value="item.value" :key="item">{{ item.label }}</Option>
              </Select>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="出租楼层">
              <Input v-model="updateinfo.leasefloor" placeholder=""/>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="是否需要行车">
              <Row>
                <Col span="8">
                <i-switch size="large" v-model="isDr" @on-change="isDriving1" style="float: left;margin-top: 4px;">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
                </Col>
                <Col span="16">
                <Input v-model="updateinfo.drivieton" v-show="isDr" placeholder="请输入车辆吨位" style="float: left;margin-left: 10px;">
                <span slot="append">吨位</span>
                </Input>
                </Col>
              </Row>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="手机号">
              <Input v-model="updateinfo.telephone" placeholder="">
              </Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="配电大小">
              <Input v-model="updateinfo.distribution" placeholder="">
              <span slot="append">kva</span>
              </Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="目前状况">
              <Input v-model="updateinfo.currentstatus" placeholder=""></Input>
            </Form-item>
            </Col>
            <Col span="24">
            <Form-item label="具体情况">
              <Input v-model="updateinfo.detailcontent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
            </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer" align="center">
        <Button type="primary" @click="updateInfo('updateinfo')">更新</Button>
        <Button type="warning" @click="modaledit = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        totalcount: 0,
        page: 1,
        columns1: [
          {title: '负责人', key: 'manageuser'},
          { title: '房源区域', key: 'housedistrict',align:'center' },
          { title: '房源面积(㎡)', key: 'housearea'},
          { title: '租金', key: 'rent'},
          { title: '操作人', key: 'optusername'},
          { title: '添加时间', key: 'createtime',align:'center',width:180},
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
                      this.remove(params.row.id, params.row.manageuser)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data1: [],
        searchList: {
          housedistrict: '',
          housearea1: '',
          housearea2: '',
          leasefloor: '',
          company: '',
          companyaddr: '',
          telephone: '',
          manageuser: '',
          id: '',
          isShow: false,
          isdriving: '全部',
          driviecontent1: '',
          driviecontent2: '',
          distribution1: '',
          distribution2: '',
          currentstatus: ''

        },
        modaledit: false,
        updateinfo: {
          manageuser: '',
          company: '',
          companyaddr: '',
          housearea: '',
          leasetype: '出租',
          rent: '',
          housedistrict: '',
          leasefloor: '',
          distribution: '',
          isDriving: false,
          drivieton: '',
          telephone: '',
          currentstatus: '',
          detailcontent: ''
        },
        ruleValidate: {
          manageuser: [
            { required: true, message: '负责人不能为空', trigger: 'blur' }
          ],
          company: [
            { required: true, message: '单位名称不能为空', trigger: 'blur' }
          ],
          companyaddr: [
            { required: true, message: '公司地址不能为空', trigger: 'blur' }
            // { type: 'password', message: '密码格式不正确', trigger: 'blur' }
          ],
          housearea: [
            { required: true, message: '房源面积不能为空', trigger: 'blur' },
            { pattern: /^[1-9]\d*$/, message: '房源面积输入不正确', trigger: 'blur' }
          ],
          rent: [
            { required: true, message: '租金不能为空', trigger: 'blur' },
//            { pattern: /^[1-9]\d*$/, message: '租金输入不正确', trigger: 'blur' }
          ]
        },
        arealist: [
          { value: '', label: '全部区域' },
          { value: '锡山区', label: '锡山区' },
          { value: '惠山区', label: '惠山区' },
          { value: '滨湖区', label: '滨湖区' },
          { value: '梁溪区', label: '梁溪区' },
          { value: '新吴区', label: '新吴区' }
        ],
        isDr: false
      }
    },
    methods: {
      queryHouselist () {
        this.$http({
          url: '/house/list',
          params: {
            houseinfo: JSON.stringify(this.searchList),
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
        this.queryHouselist()
      },
      show (param) {
        this.$http({
          url: '/house/info',
          params:{ id: param.id }
        }).then((req) => {
          if (req.data.success === 0) {
            this.modaledit = true
            if (req.data.data.isDriving === 'true') {
              this.isDr = true
            } else {
              this.isDr = false
            }
            this.updateinfo = req.data.data
          } else {
          this.$Message.success('房源信息查询失败！')
          }
        })
      },
      remove (id, name) {
        this.$Modal.confirm({
          title: '操作提示',
          content: '<p>确认删除该条房源信息？</p>',
          onOk: () => {
            this.$http({
              url: '/house/delete',
              params: {
                houseid: id,
                manageuser: name
              }
            }).then((req) => {
              if (req.data.success===0) {
                this.$Message.success('客户房源删除成功！')
                this.queryHouselist()
              }else{
                this.$Message.success(req.data.data)
              }
            })
          },
          onCancel: () => {
//            this.$Message.info('点击了取消');
          }
        })
      },
      isDriving1 (e) {
        this.isDr = e
        this.updateinfo.isDriving = e
      },
      getIsDrive (e) {
        var v = this.searchList.isdriving
        var bool = false
        if (v === 'true') {
          bool = true
        }
        this.searchList.isShow = bool
      },
      updateInfo (name) {
        var _this = this
        this.$refs[name].validate((valid) => {
          if (valid) {
            _this.$http({
              url: '/house/update',
              params: {
                houseStr:JSON.stringify(_this.updateinfo)
              }
            }).then((req) => {
              this.modaledit = false
              this.$Message.success(req.data.data)
              this.queryHouselist()
            })
          }
        })
      }
    },
    created () {
      this.queryHouselist()
    }
  }
</script>

<style>
  .ivu-modal{
    width:660px;
  }
  .ivu-modal-content{
    width: 660px;
  }
</style>
