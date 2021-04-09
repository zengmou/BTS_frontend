<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
    <div>
      <el-row style="margin: 60px 0" :gutter="20">
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin-left:100px;height:400px">
                <img src="../assets/background/blue.jpg" class="image" alt="review" style="width: 100%;height:300px">
                <div style="padding: 14px;">
                  <span>通过柜员操作归还客户贷款</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="manualRepay()">柜员归还贷款</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin:0 50px;height:400px">
                <img src="../assets/background/blue.jpg" class="image" alt="check" style="width: 100%;height:300px">
                <div style="padding: 14px;">
                  <span>系统自主归还贷款</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="autoRepay()">自动归还贷款</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin-right:100px;height:400px">
                <img src="../assets/background/blue.jpg" class="image" alt="result" style="width: 100%;height:300px">
                <div style="padding: 14px;">
                  <span>查看银行流水信息</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="transactionList()">查看流水信息</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row style="margin: 60px 0" :gutter="20">
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin-left:100px;height:400px">
                <img src="../assets/background/blue.jpg" class="image" alt="processing" style="width: 100%;height:300px">
                <div style="padding: 14px;">
                  <span>用户购买理财产品</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="purchase()">购买理财产品</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin:0 50px;height:400px">
                <img src="../assets/background/blue.jpg" class="image" alt="discussing" style="width: 100%;height:300px">
                <div style="padding: 14px;">
                  <span>用户查询理财产品</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="products()">查询理财产品</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
    </div>
  </div>
</template>

<script>
  import NavMenu from "../components/common/Nav";
  export default {
    name: "Menu",
    components: {
      NavMenu,
    },
    data(){
      return{
        id:localStorage.getItem('id'),
      }
    },
    methods:{
      manualRepay(){
        this.$router.replace('/manualRepay?id='+this.id);
      },
      autoRepay(){
        this.$router.replace('/autoRepay?id='+this.id);
      },
      transactionList(){
        this.$router.replace('/transactionList?id='+this.id);
      },
      purchase(){
          this.$router.replace('/purchase?id='+this.id);
      },
      products(){
          this.$router.replace('/products?id='+this.id);
      }
    }
  }
</script>

<style scoped>
  #demo-table-expand {
    font-size: 0;
  }
  #demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

