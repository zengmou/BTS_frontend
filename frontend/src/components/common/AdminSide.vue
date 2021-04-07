<template>
  <el-menu :default-active="path1" router background-color="white" text-color="#222" style="height:100%;width: 100%">
    <el-menu-item index="/admin/home"><i class="el-icon-house"></i>管理员首页</el-menu-item>
    <el-menu-item index="/admin/audit"><i class="el-icon-bell"></i>会议审核页面</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "SideNav",
    data () {
      return {
        keywords: '',
        path1: ''
      }
    },
    mounted: function () {
      // 获得路由，以设置侧边导航栏高亮
      let x = this.$route.path.indexOf('/', 0);
      if (x !== -1) {
        this.path1 = this.$route.path.substring(x)
      }
      else {
        this.path1 = this.$route.path
      }
    },
  }
</script>
