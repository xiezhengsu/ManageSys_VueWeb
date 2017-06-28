<template>
  <div class="house">
    <Row>
      <Col span="18" offset="3">
        <Card>
          <p slot="title" align="center">房源添加</p>
          <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="90" width="300">
            <Row>
              <Col span="12">
                <Form-item label="负责人姓名" prop="manageuser">
                  <Input v-model="formItem.manageuser" placeholder=""/>
                </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="单位名称" prop="company">
                <Input v-model="formItem.company" placeholder=""/>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="公司地址" prop="companyaddr">
                <Input v-model="formItem.companyaddr" placeholder=""/>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="房源面积" prop="housearea">
                <Input v-model="formItem.housearea" placeholder="">
                <span slot="append">㎡</span>
                </Input>
              </Form-item>
              </Col>
              <Col span="24">
              <Form-item label="租赁方式">
                <Radio-group v-model="formItem.leasetype">
                  <Radio label="出租"></Radio>
                  <Radio label="出售"></Radio>
                  <Radio label="租售"></Radio>
                </Radio-group>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="手机号" prop="telephone">
                <Input v-model="formItem.telephone" placeholder="">
                </Input>
              </Form-item>
              </Col>
              
              <Col span="12">
              <Form-item label="租金" prop="rent">
                <Input v-model="formItem.rent" placeholder=""/>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="房源区域" prop="housedistrict">
                <Select v-model="formItem.housedistrict" style="width:200px">
                  <Option v-for="item in arealist" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="出租楼层" prop="leasefloor">
                <Input v-model="formItem.leasefloor" placeholder=""/>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="是否需要行车">
                <i-switch size="large" @on-change="isDriving" style="float: left;margin-top: 4px;">
                  <span slot="open" value="true">是</span>
                  <span slot="close" value="false">否</span>
                </i-switch>
                <Input v-model="formItem.drivieton" v-show="isDr" placeholder="请输入车辆吨位" style="width: 200px;float: left;margin-left: 10px;">
                <span slot="append">吨位</span>
                </Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="配电大小">
                <Input v-model="formItem.distribution" placeholder="">
                <span slot="append">kva</span>
                </Input>
              </Form-item>
              </Col>
              <Col span="12">
              <Form-item label="目前状况">
                <Input v-model="formItem.currentstatus" placeholder=""></Input>
              </Form-item>
              </Col>
              <Col span="24">
              <Form-item label="具体情况">
                <Input v-model="formItem.detailcontent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
              </Form-item>
              </Col>
            </Row>
            <Form-item align="center">
              <Button type="primary" @click="handleSubmit('formItem')">提交</Button>
              <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">取消</Button>
            </Form-item>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        formItem: {
          manageuser: '',
          company: '',
          companyaddr: '',
          housearea: '',
          telephone: '',
          leasetype: '出租',
          rent: '',
          housedistrict: '',
          leasefloor: '',
          distribution: '',
          isDriving: false,
          drivieton: '',
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
          telephone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
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
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url: '/house/add',
              params: {
                customer: JSON.stringify(this.formItem)
              }
            }).then((req) => {
//              this.$Message.success('提交成功!')
              var msg = req.data
              if(msg.success === 0){
                this.$Message.success(msg.data)
              }else{
                this.$Message.success(msg.data)
              }
            })
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      },
      isDriving (e) {
        this.isDr = e
//        if (e) {
//          this.formItem.isdriving = 1
//        } else {
//          this.formItem.isdriving = 0
//        }
      }
    }
  }
</script>

<style>

</style>
