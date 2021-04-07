<template>
  <el-menu :default-active="path1" router background-color="white" text-color="#222" style="height:100%;width: 100%">
    <el-menu-item :index="pathPC"><i class="el-icon-house"></i>审稿人主页</el-menu-item>
    <el-menu-item :index="pathSubmit"><i class="el-icon-document-add"></i>投稿页面</el-menu-item>
    <el-menu-item :index="pathReview"><i class="el-icon-document-checked"></i>审稿页面</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "SideNav",
    data () {
      return {
        keywords: '',
        path1: '',
        pathPC:'/meeting/PC?id='+this.$route.query.id,
        pathSubmit:'/submit?id='+this.$route.query.id,
        pathReview:'/meeting/review?id='+this.$route.query.id
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
