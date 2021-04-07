<template>
  <el-row>
    <el-col :span="8">
      <img src="../../assets/background/blue.jpg" alt="blue" id="register_img">
    </el-col>
    <el-col :span="16">
      <div>
        <el-form :model="registerForm" :rules="rules" class="register_container" label-position="left"
                 label-width="0px" v-loading="loading" :ref="registerForm">
          <p class="register_title" style="font-size: 2em;padding-bottom: 50px">用户注册</p>
          <el-form-item label-width="90px" label="真实姓名" prop="name">
            <el-input type="text" v-model="registerForm.name"
                      auto-complete="off" placeholder="请输入姓名" ref="name"></el-input>
          </el-form-item>
          <el-form-item label-width="90px" label="用户名" prop="username">
            <el-tooltip class="item" effect="dark" content="用户名长度为5-32位，只能包含字母，数字或两种特殊字符（-_）且只能以字母或-开头" placement="right">
              <el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="请输入用户名" ref="username"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label-width="90px" label="用户密码" prop="password">
            <el-tooltip class="item" effect="dark" content="密码长度为6-32位，且字母，数字或者特殊字符（-_）至少包含两种" placement="right">
              <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="请输入密码" show-password></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label-width="90px" label="邮箱" prop="email" >
            <el-input type="email" v-model="registerForm.email"
                      auto-complete="off" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label-width="90px" label="工作单位" prop="workplace" >
            <el-input type="text" v-model="registerForm.workplace"
                      auto-complete="off" placeholder="请输入工作单位"></el-input>
          </el-form-item>
          <el-form-item label-width="90px" label="所在地区" prop="region">
            <el-input type="region" v-model="registerForm.region"
                      auto-complete="off" placeholder="请输入所在地区"></el-input>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;border: none;margin-top:14px" v-on:click="register(registerForm)">注册</el-button>
          </el-form-item>
          <el-form-item>
            已有账号? 去<el-link type="primary" href="login" :underline="false" style="margin-bottom: 2px">登录</el-link>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Register',
  data () {
    //验证用户名格式
    const dataValidUserName = (rule, value, callback) => {
      if(value === '') {
        return callback(new Error('Can\'t be empty'))
      }
      else{
          var reg = /^[A-Za-z\\-]+[A-Za-z0-9_\\-]{4,31}$/;
          if(!reg.test(value)){
            return callback(new Error('用户名格式不正确'))
          }
        
        return callback();
      }
    };
    //验证密码格式
    const dataValidPassword = (rule, value, callback) => {
      if(value === '') {
        return callback(new Error('Can\'t be empty'))
      }
      else{

          var username = this.$refs.username.value;
          var reg = /^(?![a-z]+$)(?![A-Z]+$)(?!\d+$)(?![-_]+$)[\w-]{6,32}$/;
          if(!reg.test(value)){
            return callback(new Error('密码格式不正确'))
        }
          if(value.indexOf(username)!==-1){
            return callback(new Error('密码中不能包含用户名'))
          }
        
        return callback();
      }
    };
    //验证邮箱格式
    const dataValidEmail = (rule,value,callback) =>{
      if(value===''){
        return callback(new Error('Can\'t be empty'))
      }
      else{
          var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
          if(!reg.test(value)){
            return callback(new Error('邮箱格式不正确'))
          }
        return callback();
      }
    };
    return {
      registerForm: {
        name:'',
        username: '',
        password: '',
        email: '',
        workplace:'',
        region:'',
      },
      rules: {
        // blur 失去鼠标焦点时触发验证
        name: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'}, {validator: dataValidUserName, trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}, {validator: dataValidPassword, trigger: 'blur'}],
        email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}, {validator: dataValidEmail, trigger: 'blur'}],
        workplace: [{required: true, message: '工作单位不能为空', trigger: 'blur'}],
        region: [{required: true, message: '所在地区不能为空', trigger: 'blur'}]
      },
      loading: false
    };
  },
   created(){
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username')
    },
  methods: {
    userTypeChange() {
    },
    register (formName) {
      this.$refs[formName].validate(valid => {
        if(valid){
          this.$axios.post('/register',{
            name:this.registerForm.name,
            username: this.registerForm.username,
            password: this.registerForm.password,
            email: this.registerForm.email,
            workplace:this.registerForm.workplace,
            region:this.registerForm.region
          })
            .then(resp => {
              // 根据后端的返回数据修改
              if(resp.status === 200 && resp.data===true /*&& resp.data.hasOwnProperty("id")*/) {
                // 跳转到login
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                // alert('successful registration');
                this.$router.replace('/login')
              } else{
                this.$message.error('该用户名或邮箱已被注册');
              }
            })
            .catch(error => {
              console.log(error);
              // alert('register request error')
              this.$message.error('注册请求失败');
            })
        } else {
          this.$message.error('格式不正确');
          // alert('wrong submit')
        }
      })
    }
  }
}
</script>

<style scoped>
  body{
    margin:0;
    padding:0;
    height: 100%;
    width: 100%;
  }
  #register_img{
    height: 100%;
    float: left;
    background-size: cover;
    border-radius: 0 25% 25% 0/ 50%;
  }
  .register_container{
    background-clip: padding-box;
    margin: 50px auto;
    width: 500px;
    padding: auto;
  }
  .register_title{
    margin: auto;
    text-align: center;
    color: #72707c;
  }
</style>
