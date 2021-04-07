<template>
  <el-menu :default-active="path" router mode="horizontal" background-color="white" text-color="#222">
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
    <el-submenu index="/message" style="float: right">
      <template slot="title"><i class="el-icon-bell"></i>通知</template>
      <el-menu-item index="/message"><i class="el-icon-search"></i>审稿人邀请</el-menu-item>
    </el-submenu>
    <el-submenu index="/meeting" style="float: right">
      <template slot="title"><i class="el-icon-collection"></i>会议</template>
      <el-menu-item index="/meeting"><i class="el-icon-discover"></i>会议主页</el-menu-item>
      <el-menu-item index="/apply"><i class="el-icon-plus"></i>申请会议</el-menu-item>
      <el-menu-item index="/meeting/application"><i class="el-icon-document-checked"></i>申请状态</el-menu-item>
      <el-menu-item index="/meeting/joining"><i class="el-icon-document"></i>我的会议</el-menu-item>
      <el-menu-item index="/meeting/submitting"><i class="el-icon-view"></i>所有会议</el-menu-item>
    </el-submenu>
    <el-submenu index="/home" style="float: right">
      <template slot="title"><i class="el-icon-house"></i>首页</template>
      <el-menu-item index="/home"><i class="el-icon-position"></i>网站主页</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: "NavMenu",
    data() {
      return {
        path: ""
      };
    },
    mounted: function() {
      // 获得第一级路由，以设置导航栏高亮
      let x = this.$route.path.indexOf("/", 1);
      if (x !== -1) {
        this.path = this.$route.path.substring(0, x);
      } else {
        this.path = this.$route.path;
      }
    },
    methods: {
      quit() {
        this.$confirm("您将退出登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          window.localStorage.removeItem("token");
          localStorage.removeItem("username");
          this.$router.replace({ path: "/login" });
          this.$message.success("已退出当前账号")
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
      },
      toHome(){
        this.$router.replace({ path: "/home" });
      }
    }
  };
</script>
