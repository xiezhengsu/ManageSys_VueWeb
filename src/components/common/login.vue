<style scoped>
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 150px;
    padding-bottom: 200px;
    /*background: -webkit-gradient(linear, 0 0, 0 bottom, from(#ff0000), to(rgba(0, 0, 255, 0.5)));*/
    /*background: #fff;*/
    /*url(http://78rbeb.com1.z0.glb.clouddn.com/wp-content/uploads/2014/03/free-blurred-web-backgrounds-04.jpg);*/
}
.wrapper > h1{
  text-align: center;
  vertical-align: middle;
  margin-bottom: 20px;
  color: #000;
}
.wrapper-login{
    background: #fff;
    width: 430px;
    margin: auto;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -215px;
    margin-top: -175px;
    border-radius: 10px;
    text-align: center;
    padding: 50px 30px;
    opacity: 0.95;
}
.wrapper-login h1{
    padding-bottom: 25px;
}
.login {
    margin: 0 auto;
    padding: 200px auto;
    width: 300px;
    height: 100%;
}

</style>
<template>
<div class="wrapper">
    <img src="../../assets/timg.jpg" width="100%" height="100%" style="z-index: 0;position: absolute;top: 0;left: 0;">
    <div class="wrapper-login">
        <h1>
            浩格招商内部管理系统
        </h1>
        <div class="login">
            <i-form ref="formInline" :model="formInline" :rules="ruleInline">
                <Form-item prop="username">
                    <Input v-model="formInline.username">
                    <Icon type="ios-person" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="password">
                    <Input v-model="formInline.password" type="password"  @keyup.enter.native="handleSubmit('formInline')">
                    <Icon type="locked" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item>
                    <i-button type="success" @click.native="handleSubmit('formInline')" long :loading="modal_loading">登录</i-button>
                </Form-item>
            </i-form>
        </div>
    </div>
</div>

</template>

<script>

export default {
    data() {
        return {
            formInline: {
                username: '',
                password: '',
            },
            ruleInline: {
                username: [{
                    required: true,
                    message: '请填写用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请填写密码',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    min: 6,
                    message: '密码长度不能小于6位',
                    trigger: 'blur'
                }]
            },
            modal_loading: false
        }
    },
    methods: {
        handleSubmit(name) {
            const self = this
            self.modal_loading = true
            self.$refs[name].validate((valid) => {
                if (valid) {
                    this.$http({
                        url: '/login/tologin',
                        params: {
                            userinfo: this.formInline
                        }
                    }).then((req) => {
                        if (req.data.success === 0) {
                            var level = req.data.data.level
                            localStorage.setItem('ms_username',self.formInline.username)
                            localStorage.setItem('ms_level',level)
                            self.$router.push('/index')
                        }else{
                            this.$Message.error(req.data.data)
                            self.modal_loading = false
                        }
                    }).catch((req) => {
                        this.$Message.error(req.status)
                    })
                } else {
                    localStorage.setItem('ms_username','')
                    localStorage.setItem('ms_level','')
                    this.$Message.error('用户名和密码请填写完整!')
                    self.modal_loading = false
                }
            })
        },
        handleReset(val) {
            console.log(val)
        }
    }
}

</script>
