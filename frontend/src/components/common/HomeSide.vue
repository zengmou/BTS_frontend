<template>
  <el-menu :default-active="path1" router background-color="white" text-color="#222" style="height:100%;width: 100%">
    <el-menu-item index="/home"><i class="el-icon-house"></i>网站首页</el-menu-item>
    <el-menu-item index="/meeting"><i class="el-icon-collection"></i>会议主页</el-menu-item>
    <el-menu-item index="/message"><i class="el-icon-bell"></i>审稿人邀请</el-menu-item>
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
        // 获得第一级路由，以设置侧边导航栏高亮
        let x = this.$route.path.indexOf('/', 1);
        if (x !== -1) {
          this.path1 = this.$route.path.substring(0,x)
        }
        else {
          this.path1 = this.$route.path
        }
      },
    }
</script>
