<template>
  <el-menu :default-active="path1" router mode="horizontal" background-color="white" text-color="#222" style="height:100%">
    <el-button type="text"
               style="color: #757575; float:left;padding:18px;margin-left:35px;font-size:1.3em;font-family:'Helvetica Neue',sans-serif;"
               @click="toHome"
               icon="el-icon-s-promotion">
      银行系统
    </el-button>
    <el-submenu style="float: right">
      <template slot="title"><i class="el-icon-user"></i>账号</template>
      <el-menu-item @click="account"><i class="el-icon-s-custom"></i>账户信息</el-menu-item>      
      <el-menu-item @click="quit"><i class="el-icon-switch-button"></i>退出登录</el-menu-item>
    </el-submenu>
    <el-drawer :title="title" :visible.sync="drawer" :direction="direction" :before-close="handleClose" :with-header="false">
        <div>
          <p style="margin-top:50px;margin-bottom:50px;font-size: 1.5em;font-weight:bold;text-align:center">账户信息</p>
        </div>
        <el-row>
          <div>
            <span style="margin-right:10px;margin-left:70px;float:left;margin-bottom:20px;width:100px;text-align:left">
              <i class="el-icon-caret-right"></i>用户姓名</span>
            <el-divider direction="vertical" class="el-divider"></el-divider>
            <span style="padding-left:20px;float:left">{{userName}}</span>
          </div>
        </el-row>
        <el-row>
          <div>
            <span style="margin-right:10px;margin-left:70px;float:left;margin-bottom:20px;width:100px;text-align:left">
              <i class="el-icon-caret-right"></i>用户年龄</span>            
            <el-divider direction="vertical" class="el-divider"></el-divider>
            <span style="padding-left:20px;float:left">{{age}}</span>
          </div>
        </el-row>
        <el-row>
          <div>
            <span style="margin-right:10px;margin-left:70px;margin-bottom:20px;width:100px;float:left;text-align:left">
              <i class="el-icon-caret-right"></i>用户ID</span>
            <el-divider direction="vertical" class="el-divider"></el-divider>
            <span style="padding-left:20px;float:left">{{id}}</span>
        </div>
        </el-row>
        <el-row>
          <div>
            <span style="margin-right:10px;margin-left:70px;float:left;margin-bottom:20px;width:100px;text-align:left">
              <i class="el-icon-caret-right"></i>身份证号</span>
            <el-divider direction="vertical" class="el-divider"></el-divider>
            <span style="padding-left:20px;float:left">{{identity}}</span>
          </div>
        </el-row>
        <el-row>
          <div>
            <span style="margin-right:10px;margin-left:70px;float:left;margin-bottom:20px;width:100px;text-align:left">
              <i class="el-icon-caret-right"></i>账户余额</span>
            <el-divider direction="vertical" class="el-divider"></el-divider>
            <span style="padding-left:20px;float:left">{{balance}}</span>
          </div>
        </el-row>
        <el-row>
          <div>
            <span style="margin-right:10px;margin-left:70px;float:left;margin-bottom:20px;width:100px;text-align:left">
              <i class="el-icon-caret-right"></i>贷款金额</span>
            <el-divider direction="vertical" class="el-divider"></el-divider>
            <span style="padding-left:20px;float:left">{{loanAmount}}</span>
          </div>
        </el-row>
        <el-row>
          <div>
            <span style="margin-right:10px;margin-left:70px;float:left;margin-bottom:20px;width:100px;text-align:left">
              <i class="el-icon-caret-right"></i>信用等级</span>
            <el-divider direction="vertical" class="el-divider"></el-divider>
            <span style="padding-left:20px;float:left">{{creditRate}}</span>
          </div>
        </el-row>
        <el-row>
          <div>
            <span style="margin-right:10px;margin-left:70px;float:left;margin-bottom:20px;width:100px;text-align:left">
              <i class="el-icon-caret-right"></i>当前日期</span>
            <el-divider direction="vertical" class="el-divider"></el-divider>
            <span style="padding-left:20px;float:left;format: 'yyyy-MM-dd'">{{nowDate}}</span>
          </div>
        </el-row>
    </el-drawer>
    <!-- <el-submenu index="/admin/audit" style="float: right">
      <template slot="title"><i class="el-icon-bell"></i>审批</template>
      <el-menu-item index="/admin/audit"><i class="el-icon-search"></i>待审批会议</el-menu-item>
    </el-submenu> -->
    <el-submenu index="/menu" style="float: right">
      <template slot="title"><i class="el-icon-house"></i>首页</template>
      <el-menu-item @click="toHome"><i class="el-icon-position"></i>功能选择页</el-menu-item>
    </el-submenu>
  </el-menu>
</template>


<script>
  export default {
    name: "AdminNav",
    data(){
      return{
        userName:'',
        age:'',
        id:'',
        identity:localStorage.getItem('identity'),
        balance:'',
        loanAmount:'',
        creditRate:'',
        nowDate:'',
        title:'账户信息',
        direction:'rtl',
        drawer:false,
        path1:''
      }
    },
    // mounted: function () {
    //   // 获得第二级路由，以设置侧边导航栏高亮
    //   let x = this.$route.path.indexOf('/', 0);
    //   if (x !== -1) {
    //     this.path1 = this.$route.path.substring(x)
    //   }
    //   else {
    //     this.path1 = this.$route.path
    //   }
    // },
    // created(){
    //   localStorage.setItem('name','era')
    //   localStorage.setItem('age','14')
    //   localStorage.setItem('id','68')
    //   localStorage.setItem('identity','370481200005270924')
    //   localStorage.setItem('balance','50000')
    //   localStorage.setItem('loanAmount','2000')
    //   localStorage.setItem('creditRate','一级')
    //   localStorage.setItem('nowDate','2020-04-07')
    // },
    methods: {
      account(){
        this.drawer = true;
        this.$axios.get('./bank/account/'+localStorage.getItem('identity'),{
          //idn: this.loginForm.identity,
        })
        .then(resp => {
          if (resp.status === 200 && resp.data.status!=' ' /*&& resp.data.hasOwnProperty("token")*/) {
            localStorage.setItem('id',resp.data.id);
            localStorage.setItem('balance',resp.data.balance);
            localStorage.setItem('creditRate',resp.data.creditRate);
            localStorage.setItem('loanAmount',resp.data.loanAmount);
            localStorage.setItem('name',resp.data.name);
            localStorage.setItem('age',resp.data.age);
            localStorage.setItem('nowDate',resp.data.nowDate.subString(0,10));
            this.id = resp.data.id;
            this.balance = resp.data.balance;
            this.creditRate = resp.data.creditRate;
            this.loanAmount = resp.data.loanAmount;
            this.name = resp.data.name;
            this.age = resp.data.age;
            this.nowDate = resp.data.nowDate.subString(0,10);            
          }
          else{
              //this.$message.error(resp.body.status);
            this.$message.error('未获取到账户信息');
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error('获取账户请求失败');
        })
  
      },
      handleClose(done) {
        done();
      },
      quit() {
        this.$confirm('您将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.localStorage.setItem("token",null);
          window.localStorage.removeItem('identity');
          this.$router.replace({path: '/login'});
          this.$message.success("已退出当前账号")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      toHome(){
        //this.$router.replace({ path: "/menu" });
        this.$router.replace('/menu?id='+localStorage.getItem('id'))
      }
    }
  }
</script>

<style  scoped>
  .el-divider{
    height: 25px;
    position:relative ;
    float: left;
  }
</style>