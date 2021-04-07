<template>
  <el-row>
    <el-col :span="8">
      <div>
          <img src="../../assets/background/blue.jpg" alt="blue" id="login_img">
      </div>
    </el-col>
    <el-col :span="16">
      <div>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login_container" label-position="left" label-width="0px" v-loading="loading">
          <p class="login_title" style="padding-bottom: 50px;font-size: 2em">用户登录</p>
          <el-form-item  prop="username" label-width="100px" label="用户名">
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" label-width="100px" label="用户密码">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="用户身份" prop="authority">
            <el-radio v-model="loginForm.authority" label="ordinaryUser">普通用户</el-radio>
            <el-radio v-model="loginForm.authority" label="admin">管理员</el-radio>
          </el-form-item>
          <el-form-item style="width: 100%;margin-top:14px">
            <p> (管理员账号：admin 密码：password)</p>
            <el-button id="login_button" type="primary" style="width: 100%;border: none;" v-on:click="login(loginForm)">登录</el-button>
          </el-form-item>
          <el-form-item>
            还没有账号? 去<el-link type="primary" href="register" :underline="false" style="margin-bottom: 1px">注册</el-link>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: '',
          password: '',
          authority:'ordinaryUser'
        },
        rules: {
          username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
          authority: [{required: true, message: '身份不能为空', trigger: 'blur'}],
        },
        loading: false
      }
    },
    created(){
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username')
    },
    // mounted(){
    //   document.querySelector('body').setAttribute('style','margin: 0;padding: 0;')
    // },
    methods: {
      login (formName) {
        // this.$refs[formName].validate(valid => {
          //if(valid){
          this.$axios.post('/login',{
          username: this.loginForm.username,
          password: this.loginForm.password,
          authority:this.loginForm.authority
        })
          .then(resp => {
            if (resp.status === 200 && resp.data.status===true /*&& resp.data.hasOwnProperty("token")*/) {
              //Vue.$set(this.$store.state.obj,'token',resp.data.token);
              localStorage.setItem('username',this.loginForm.username);
              window.localStorage.setItem('token', resp.data.token);
              if(this.loginForm.authority==='ordinaryUser'){
                this.$router.replace({path: '/home'})
              }
              else{
                this.$router.replace({path:'/admin/home'})
              }
            }
            else{
              //this.$message.error(resp.body.status);
              this.$message.error('登录失败，请检查用户名和密码是否匹配');
            }
          })
          .catch(error => {
            console.log(error);
            this.$message.error('登录请求失败');
          })
      }
    }
  }
</script>

<style scoped>
  body{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  #login_img{
    height:100%;
    float: left;
    background-size: cover;
    border-radius: 0 25% 25% 0/ 50%;
  }
  .login_container{
    background-clip: padding-box;
    margin: 90px auto;
    width: 500px;
    padding: 35px 35px 15px 35px;
  }
  .login_title {
    margin: 0 auto 20px auto;
    text-align: center;
    color: #72707c;
  }
</style>
