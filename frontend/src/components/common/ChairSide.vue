<template>
  <el-menu :default-active="path1" router background-color="white" text-color="#222" style="height:100%;width: 100%">
    <el-menu-item :index="pathChair"><i class="el-icon-house"></i>会议管理页面</el-menu-item>
    <el-menu-item :index="pathSearch"><i class="el-icon-search"></i>用户搜索页面</el-menu-item>
    <el-menu-item :index="pathInvitation"><i class="el-icon-postcard"></i>邀请状态页面</el-menu-item>
    <el-menu-item :index="pathAllPapers"><i class="el-icon-reading"></i>所有稿件页面</el-menu-item>
    <el-menu-item :index="pathReview"><i class="el-icon-document-checked"></i>待审稿件页面</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "SideNav",
    data () {
      return {
        keywords: '',
        path1: '',
        pathChair:'/meeting/chair?id='+this.$route.query.id,
        pathSearch:'/meeting/chair/search?id='+this.$route.query.id,
        pathInvitation:'/meeting/chair/invitation?id='+this.$route.query.id,
        pathAllPapers:'/meeting/chair/papers?id='+this.$route.query.id,
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
