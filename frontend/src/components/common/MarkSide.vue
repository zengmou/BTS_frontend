<template>
  <el-menu :default-active="path1" router background-color="white" text-color="#222" style="height:100%;width: 100%">
    <el-menu-item :index="pathReview"><i class="el-icon-house"></i>审稿主页</el-menu-item>
    <el-menu-item :index="pathMark"><i class="el-icon-upload2"></i>审稿提交页面</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "SideNav",
    data () {
      return {
        keywords: '',
        path1: '',
        pathReview:'/meeting/review?id='+window.localStorage.getItem('meetingId'),
        pathMark:'/meeting/review/mark?paperId='+this.$route.query.paperId+'&id='+window.localStorage.getItem('meetingId'),
      }
    },
    mounted: function () {
      // 获得第一级路由，以设置侧边导航栏高亮
      let x = this.$route.fullPath.indexOf('/', 0);
      if (x !== -1) {
        this.path1 = this.$route.fullPath.substring(x)
      }
      else {
        this.path1 = this.$route.fullPath
      }
    }
  }
</script>
