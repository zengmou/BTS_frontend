<template>
  <el-menu :default-active="path1" router background-color="white" text-color="#222" style="height:100%;width: 100%">
    <el-menu-item :index="pathManualRepay"><i class="el-icon-s-home"></i>柜面归还贷款</el-menu-item>
    <el-menu-item :index="pathAutoRepay"><i class="el-icon-document-checked"></i>自动归还贷款</el-menu-item>
    <el-menu-item :index="pathTransactionList"><i class="el-icon-info"></i>银行流水信息</el-menu-item>
    <el-menu-item :index="pathPurchase"><i class="el-icon-goods"></i>理财产品购买</el-menu-item>
    <el-menu-item :index="pathProducts"><i class="el-icon-s-marketing"></i>产品收益查询</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "SideNav",
    data () {
      return {
        keywords: '',
        path1: '',
        pathManualRepay:'/manualRepay?id='+this.$route.query.id,
        pathAutoRepay:'/autoRepay?id='+this.$route.query.id,
        pathTransactionList:'/transactionList?id='+this.$route.query.id,
        pathPurchase:'/purchase?id='+this.$route.query.id,
        pathProducts:'/products?id='+this.$route.query.id
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
