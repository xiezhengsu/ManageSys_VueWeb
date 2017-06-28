<template>
  <div class="user">
    <Row style="padding: 10px 0;">
      <Col span="8" offset="16"><Input v-model="name" placeholder="请输入用户名" icon="ios-search" @on-click="queryUserlist"/></Col>
    </Row>
    <Table border :columns="columns1" :data="data1"></Table>
    <div style="padding: 10px 0;">
      <Page :total="totalcount" show-total @on-change="changePage"></Page>
    </div>
    <Modal v-model="modaledit" :mask-closable="false" class-name="vertical-center-modal">
      <p slot="header" style="color:#f60;text-align:center;font-size: 16px;">
        <Icon type="ios-compose"></Icon>
        <span>用户信息</span>
      </p>
      <div>
        <Form :model="formItem" :label-width="90" width="400">
          <Form-item label="用户名">
            <Input v-model="formItem.username" placeholder="" disabled/>
          </Form-item>
          <Form-item label="密码">
            <Input type="password" v-model="formItem.password" placeholder=""/>
          </Form-item>
          <Form-item label="确认密码">
            <Input type="password" v-model="formItem.passwdCheck" placeholder=""/>
          </Form-item>
          <Form-item label="真实姓名">
            <Input v-model="formItem.realname" placeholder=""/>
          </Form-item>
          <Form-item label="手机号">
            <Input v-model="formItem.telephone" placeholder=""/>
          </Form-item>
          <!--<Form-item label="邮箱">
            <Input v-model="formItem.mail" placeholder=""/>
          </Form-item>
          <Form-item label="性别">
            <Radio-group v-model="formItem.gender">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </Radio-group>
          </Form-item>-->
          <Form-item label="用户等级">
            <Select v-model="formItem.level" placeholder="" :disabled="isDis">
              <Option value="管理员">管理员</Option>
              <Option value="普通用户">普通用户</Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" align="center">
        <Button type="primary" @click="updateInfo('formItem')">更新</Button>
        <Button type="warning" @click="handleReset('formItem')">取消</Button>
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
        columns1: [{title: '姓名', key: 'username' },
          { title: '用户等级', key: 'level' },
          { title: '手机号', key: 'telephone' },
//          { title: '性别', key: 'gender' },
          { title: '创建时间', key: 'createtime' },
          {
            title: '操作',
            key: 'id',
//            fixed: 'right',
            align: 'center',
//            width: 120,
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
                }, '编辑'),
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
              ])
            }
          }
        ],
        data1: [],
        name: '',
        modaledit: false,
        formItem: {
          username: '',
          password: '',
          passwdCheck: '',
          realname: '',
          telephone: '',
          mail: '',
          gender: '',
          level: '普通用户'
        },
        isDis: false
      }
    },
    methods: {
      queryUserlist () {
        this.$http({
          url: '/user/list',
          params: {
            name: this.name,
            page: 1,
            prepage: 10
          },
          method: 'GET'
        }).then((req) => {
          var msg = req.data
          if (msg.success === 0) {
            if(msg.data.list.length>0){
              this.data1 = msg.data.list
              this.totalcount = msg.data.totalcount
            }
          }
        })
      },
      updateInfo (name) {
        if(this.formItem.password !== this.formItem.passwdCheck){
          this.$Message.success('两次密码输入不一致，请确认！')
          return false
        }
        if (this.formItem.password === '' || this.formItem.passwdCheck === '') {
          this.$Message.success('密码输入不可以为空！')
          return false
        }
        this.$http({
          url: '/user/update',
          params: {
            userStr: JSON.stringify(this.formItem)
          }
        }).then((req) => {
          var msg = req.data
          if (msg.success === 0) {
            this.modaledit = false
            this.$Message.success('用户信息更新成功！')
            this.queryUserlist()
          }
        })
      },
      handleReset (name) {
        this.modaledit = false
//        this.$refs[name].resetFields()
        this.queryUserlist()
      },
      changePage (e) {
        this.page = e
        this.queryHouselist()
      },
      show (param) {
        this.modaledit = true
        param.passwdCheck = param.password
//        param.level= param.level === '管理员' ? '1' : '2'
        if (param.id === 1) {
          this.isDis = true
        } else {
          this.isDis = false
        }
        this.formItem = param
      },
      remove (id, name) {
        if(id === 1){
          this.$Message.info('管理员用户不可以删除')
          return false
        }
        this.$Modal.confirm({
          title: '操作提示',
          content: '<p>确认删除该用户信息？</p>',
          onOk: () => {
            this.$http({
              url: '/user/delete',
              params: {
                userid: id
              }
            }).then((req) => {
              if (req.data.success===0) {
                this.queryUserlist()
              }else{
                this.$Message.success(req.data.data)
              }
            })
          },
          onCancel: () => {
  //            this.$Message.info('点击了取消');
          }
        })
      }
    },
    created () {
      this.queryUserlist()
    }
  }
</script>

<style>

</style>
