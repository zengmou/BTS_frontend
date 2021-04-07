<template>
  <el-menu :default-active="path1" router mode="horizontal" background-color="white" text-color="#222" style="height:100%">
    <el-button type="text"
               style="color: #757575; float:left;padding:18px;margin-left:35px;font-size:1.3em;font-family:'Helvetica Neue',sans-serif;"
               @click="toHome"
               icon="el-icon-s-promotion">
      会议系统
    </el-button>
    <el-submenu index="/personal" style="float: right">
      <template slot="title"><i class="el-icon-user"></i>账号</template>
      <el-menu-item @click="quit"><i class="el-icon-switch-button"></i>退出登录</el-menu-item>
    </el-submenu>
    <el-submenu index="/admin/audit" style="float: right">
      <template slot="title"><i class="el-icon-bell"></i>审批</template>
      <el-menu-item index="/admin/audit"><i class="el-icon-search"></i>待审批会议</el-menu-item>
    </el-submenu>
    <el-submenu index="/admin/home" style="float: right">
      <template slot="title"><i class="el-icon-house"></i>首页</template>
      <el-menu-item index="/admin/home"><i class="el-icon-position"></i>管理员主页</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: "AdminNav",
    data(){
      return{
        path1:''
      }
    },
    mounted: function () {
      // 获得第二级路由，以设置侧边导航栏高亮
      let x = this.$route.path.indexOf('/', 0);
      if (x !== -1) {
        this.path1 = this.$route.path.substring(x)
      }
      else {
        this.path1 = this.$route.path
      }
    },
    methods: {
      quit() {
        this.$confirm('您将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.localStorage.setItem("token",null);
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
        this.$router.replace({ path: "/admin/home" });
      }
    }
  }
</script>
