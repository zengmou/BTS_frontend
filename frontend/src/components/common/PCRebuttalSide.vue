<template>
  <el-menu :default-active="path1" router background-color="white" text-color="#222" style="height:100%;width: 100%">
    <el-menu-item :index="pathPapers"><i class="el-icon-house"></i>我的投稿主页</el-menu-item>
    <el-menu-item :index="pathRebuttal"><i class="el-icon-document-add"></i>复审确认页面</el-menu-item>
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
        pathRebuttal:'/meeting/review/rebuttal?paperId='+this.$route.query.paperId+'&id='+window.localStorage.getItem('meetingId'),
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
