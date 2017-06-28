<template>
  <div class="customer">
    <Row>
      <Col span="18" offset="3">
      <Card>
        <p slot="title" align="center">客户添加</p>
        <Form :model="formItemEdit" ref="formItem" :rules="ruleValidate" :label-width="90" width="300">
          <Form-item label="客户姓名" prop="name">
            <Input v-model="formItemEdit.name" placeholder=""/>
          </Form-item>
          <Form-item label="手机号" prop="telephone">
            <Input v-model="formItemEdit.telephone" placeholder=""/>
          </Form-item>
          <Form-item label="单位名称" prop="company">
            <Input v-model="formItemEdit.company" placeholder=""/>
          </Form-item>
          <Form-item label="客户性质" prop="cusquality">
            <Select v-model="formItemEdit.cusquality" style="width:200px">
              <Option v-for="item in quality" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="企业性质" prop="companynature">
            <Select v-model="formItemEdit.companynature" style="width:200px">
              <Option v-for="item in nature" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属行业" prop="industry">
            <Select v-model="formItemEdit.industry" style="width:200px">
              <Option v-for="item in classify" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="房源面积" prop="housearea">
            <Input v-model="formItemEdit.housearea" placeholder=""/>
          </Form-item>
          <Form-item label="需求区域" prop="demandarea">
            <Select v-model="formItemEdit.demandarea" style="width:200px">
              <Option v-for="item in demandlist" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="是否需要行车" prop="isdriving">
            <i-switch size="large" @on-change="isDriving" style="float: left;margin-top: 4px;">
              <span slot="open" value="1">是</span>
              <span slot="close" value="0">否</span>
            </i-switch>
            <Input v-model="formItemEdit.drivingtext" v-show="isDr" placeholder="请输入车辆吨位" style="width: 200px;float: left;margin-left: 10px;">
            <span slot="append">吨位</span>
            </Input>
          </Form-item>
          <Form-item label="配电大小" prop="distribution">
            <Input v-model="formItemEdit.distribution" placeholder="">
            <span slot="append">kva</span>
            </Input>
          </Form-item>
          <Form-item label="跟踪情况" prop="trackstatus">
            <Select v-model="formItemEdit.trackstatus" style="width:200px">
              <Option v-for="item in status" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item>
            <Button type="primary" size="small" @click="handleSubmit('formItem')">提交</Button>
            <Button type="ghost" size="small" @click="handleReset('formItem')" style="margin-left: 8px">取消</Button>
          </Form-item>
        </Form>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    props: {
      formItemEdit: Object
    },
    data () {
      return {
        classify: [
          {
            value: 'IT公司',
            label: 'IT公司'
          },
          {
            value: '服务公司',
            label: '服务公司'
          }
        ],
        demandlist: [
          {
            value: '滨湖区',
            label: '滨湖区'
          },
          {
            value: '新吴区',
            label: '新吴区'
          }
        ],
        quality: [
          {
            value: '1',
            label: '固定'
          },
          {
            value: '2',
            label: '重点'
          }
        ],
        nature: [
          {
            value: '1',
            label: '内资'
          },
          {
            value: '2',
            label: '外资'
          }
        ],
        status: [
          {
            value: '内资',
            label: '内资'
          },
          {
            value: '外资',
            label: '外资'
          }
        ],
        isDr: false
      }
    }
  }
</script>
<style>

</style>
