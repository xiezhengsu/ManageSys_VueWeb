<template>
<div class="useradd">
  <Row>
    <Col span="18" offset="3">
      <Card>
        <p slot="title" align="center">用户添加</p>
        <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="80">
          <Form-item label="帐号" prop="username">
            <Input v-model="formItem.username" placeholder="请输入登录名" />
          </Form-item>
          <Form-item label="密码" prop="password">
            <Input v-model="formItem.password" placeholder="请输入密码" type="password"/>
          </Form-item>
          <Form-item label="确认密码" prop="passwdCheck">
            <Input v-model="formItem.passwdCheck" placeholder="请再次输入密码" type="password"/>
          </Form-item>
          <Form-item label="真实姓名" prop="realname">
            <Input v-model="formItem.realname" placeholder="请输入真实姓名"/>
          </Form-item>
          <Form-item label="用户等级">
            <Select v-model="formItem.level" style="width:200px">
              <Option v-for="item in levelList" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="手机号">
            <Input v-model="formItem.telephone" placeholder="请输入手机号"/>
          </Form-item>
          <!--<Form-item label="邮箱" prop="mail">
            <Input v-model="formItem.mail" placeholder="请输入邮箱地址"/>
          </Form-item>
          <Form-item label="性别">
            <Radio-group v-model="formItem.gender">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </Radio-group>
          </Form-item>-->
          <Form-item label="备注" prop="desc">
            <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
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

<script type="text/ecmascript-6">
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (value.length < 6 || value.length > 15) {
            callback(new Error('请确认密码位数在6-15个字符之间'))
          } else {
            if (this.formItem.passwdCheck !== '') {
              // 对第二个密码框单独验证
              this.$refs.formItem.validateField('passwdCheck')
            }
            callback()
          }
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formItem.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        formItem: {
          username: '',
          password: '',
          passwdCheck: '',
          realname: '',
          level: '普通用户',
          telephone: '',
          mail: '',
          gender: '男',
          desc: ''
        },
        ruleValidate: {
          username: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          realname: [
            { required: true, message: '真实姓名不能为空', trigger: 'blur' }
          ],
//          mail: [
//            { validator: validateMail, trigger: 'blur' }
//          ]
        },
        levelList: [
          {
            value: '管理员',
            label: '管理员'
          },{
            value: '普通用户',
            label: '普通用户'
          }
        ]
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http({
              url: '/user/add',
              params: {
                userStr: JSON.stringify(this.formItem)
              },
              method: 'GET'
            }).then((req) => {
              if (req.data.success === 0) {
                this.$Message.success(req.data.data)
              } else {
                this.$Message.success(req.data.data)
              }
            })
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      }
    }
  }
</script>

<style>

</style>
