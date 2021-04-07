<template>
  <el-menu :default-active="path1" router background-color="white" text-color="#222" style="height:100%;width: 100%">
    <el-menu-item index="/meeting"><i class="el-icon-discover"></i>会议主界面</el-menu-item>
    <el-menu-item index="/apply"><i class="el-icon-plus"></i>申请新会议</el-menu-item>
    <el-menu-item index="/meeting/application"><i class="el-icon-document-checked"></i>会议申请状态</el-menu-item>
    <el-menu-item index="/meeting/joining"><i class="el-icon-document"></i>我参与的会议</el-menu-item>
    <el-menu-item index="/meeting/submitting"><i class="el-icon-view"></i>查看所有会议</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'SideNav',
    data () {
      return {
        keywords: '',
        path1: ''
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
  }
</script>
