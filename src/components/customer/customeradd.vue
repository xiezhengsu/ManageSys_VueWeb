<template>
  <div class="customer">
    <Row>
      <Col span="18" offset="3">
      <Card>
        <p slot="title" align="center">客户添加</p>
        <Form :model="formItem" :label-width="90" width="300">
          <Row>
            <Col span="12">
              <Form-item label="*客户姓名">
                <Input v-model="formItem.name" placeholder=""/>
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="*联系方式">
                <Input v-model="formItem.telephone" placeholder=""/>
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="单位名称">
                <Input v-model="formItem.company" placeholder=""/>
              </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="*需求面积">
              <Input v-model="formItem.housearea" placeholder="">
                <Select v-model="formItem.areaunit" slot="append" style="width: 70px">
                  <Option value="㎡">㎡</Option>
                  <Option value="亩">亩</Option>
                </Select>
              </Input>
            </Form-item>
            </Col>
            <Col span="24">
            <Form-item label="需求形式">
              <Radio-group v-model="formItem.leasetype">
                <Radio label="求租"></Radio>
                <Radio label="求购"></Radio>
                <Radio label="求租求购"></Radio>
              </Radio-group>
            </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="所属行业">
                <Cascader :data="dataindustry" v-model="formItem.industry"></Cascader>
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="需求区域">
                <Select v-model="formItem.demandarea" style="width:200px">
                  <Option v-for="item in demandlist" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="是否需要行车">
                <i-switch size="large" @on-change="isDriving" style="float: left;margin-top: 4px;">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
                <Input v-model="formItem.drivingtext" v-show="isDr" placeholder="请输入车辆吨位" style="width: 200px;float: left;margin-left: 10px;">
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
            <Form-item label=" 客户质量">
              <Select v-model="formItem.cusquality" style="width:200px">
                <Option v-for="item in quality" :value="item.value" :key="item">{{ item.label }}</Option>
              </Select>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="企业性质" prop="companynature">
              <Select v-model="formItem.companynature" style="width:200px">
                <Option v-for="item in nature" :value="item.value" :key="item">{{ item.label }}</Option>
              </Select>
            </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="跟踪情况">
                <Input v-model="formItem.trackstatus" placeholder=""/>
              </Form-item>
            </Col>
          </Row>
          <Form-item align="center">
            <Button type="primary" @click="handleSubmit">提交</Button>
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
          name: '',
          telephone: '',
          leasetype: '求租',
          company: '',
          cusquality: '一般',
          companynature: '私营企业',
          industry: [],
          housearea: '',
          areaunit: '㎡',
          demandarea: '全无锡',
          isdriving: 0,
          drivingtext: '',
          distribution: '',
          trackstatus: ''
        },
        resForm: {
          name: '',
          telephone: '',
          leasetype: '求租',
          company: '',
          cusquality: '一般',
          companynature: '私营企业',
          industry: [],
          housearea: '',
          areaunit: '㎡',
          demandarea: '全无锡',
          isdriving: 0,
          drivingtext: '',
          distribution: '',
          trackstatus: ''
        },
        demandlist: [
          { value: '全无锡', label: '全无锡' },
          { value: '锡山区', label: '锡山区' },
          { value: '惠山区', label: '惠山区' },
          { value: '滨湖区', label: '滨湖区' },
          { value: '梁溪区', label: '梁溪区' },
          { value: '新吴区', label: '新吴区' }
        ],
        quality: [
          {
            value: '一般',
            label: '一般'
          },
          {
            value: '重点',
            label: '重点'
          }
        ],
        nature: [
          {
            value: '私营企业',
            label: '私营企业'
          },
          {
            value: '上市企业',
            label: '上市企业'
          },
          {
            value: '国有企业',
            label: '国有企业'
          },
          {
            value: '外贸',
            label: '外贸（独资、合资、合作）'
          }
        ],
        isDr: false,
        url: '../../../static/industry.json',
        dataindustry: []
      }
    },
    methods: {
      handleSubmit () {
        if (this.formItem.name === '') {
          this.$Message.error('客户姓名不可以为空!')
          return false
        }
        if (this.formItem.telephone === '') {
          this.$Message.error('联系方式不可以为空!')
          return false
        }
        if (this.formItem.housearea === '') {
          this.$Message.error('需求面积不可以为空!')
          return false
        } else {
          if (this.formItem.areaunit === '亩') {
            this.formItem.housearea = (Number(this.formItem.housearea) * 666.67).toFixed(2)
          }
        }
        this.$http({
          url: '/customer/add',
          params: {
            customer: JSON.stringify(this.formItem)
          }
        }).then((req) => {
//              this.$Message.success('提交成功!')
          var msg = req.data
          if(msg.success === 0){
            this.$Message.success(msg.data)
            this.formItem = this.resForm
          } else {
            this.$Message.success(msg.data)
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      },
      isDriving (e) {
        this.isDr = e
//        this.formItem.isdriving=e
//        if (e) {
//          this.formItem.isdriving = 1
//        } else {
//          this.formItem.isdriving = 0
//        }
      },
      getData () {
        let self = this;
        self.$http({url: self.url}).then((res) => {
          self.dataindustry = res.data.list;
        })
      }
    },
    created () {
      this.getData()
    }
  }
</script>

<style>

</style>
