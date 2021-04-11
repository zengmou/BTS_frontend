<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
    <div>
      <el-row>
        <el-col :span="3">
          <side-nav></side-nav>
        </el-col>
        <el-col :span="21">
          <el-row>
            <el-col :span="24">
              <div>
                <p style="text-align: left;margin: 30px 50px;font-size: 1.5em;font-weight: bold">已购买的产品</p>
              </div>
              <div>
                <p style="float: left;margin: 30px 50px;font-size: 1.2em">定期理财产品</p>
              </div>
              <div>
                <template>
                  <el-table :data="tableDataRegular" stripe style="margin: 60px;width: 90%">
                    <el-table-column prop="fpdId" label="产品编号" fixed="left"></el-table-column>
                    <el-table-column prop="buyTime" label="购买时间">
                      <!--<template slot-scope="scope">-->
                        <!--{{scope.row.buyTime | dateFmt('YYYY-MM-DD')}}-->
                      <!--</template>-->
                    </el-table-column>
                    <el-table-column prop="principal" label="本金"></el-table-column>
                    <el-table-column prop="hold" label="持仓"></el-table-column>
                    <el-table-column prop="profit" label="收益"></el-table-column>
                    <el-table-column prop="interestRate" label="日利率（%）"></el-table-column>
                  </el-table>
                </template>
              </div>
              <div>
                <p style="float: left;margin: 30px 50px;font-size: 1.2em">基金</p>
              </div>
              <div>
                <template>
                  <el-table :data="tableDataFund" stripe style="margin:60px;width:90%">
                    <el-table-column prop="fpdId" label="产品编号" fixed="left"></el-table-column>
                    <el-table-column prop="buyTime" label="购买时间">
                      <!--<template slot-scope="scope">-->
                        <!--{{scope.row.buyTime | dateFmt('YYYY-MM-DD')}}-->
                      <!--</template>-->
                    </el-table-column>
                    <el-table-column prop="principal" label="本金"></el-table-column>
                    <el-table-column prop="hold" label="持仓"></el-table-column>
                    <el-table-column prop="profit" label="收益"></el-table-column>
                    <el-table-column prop="interestRate" label="收益率（%）"></el-table-column>
                  </el-table>
                </template>
              </div>
              <div>
                <p style="float: left;margin: 30px 50px;font-size: 1.2em">股票</p>
              </div>
              <div>
                <template>
                  <el-table :data="tableDataStock" stripe style="margin:60px;width:90%">
                    <el-table-column prop="fpdId" label="产品编号" fixed="left"></el-table-column>
                    <el-table-column prop="buyTime" label="购买时间">
                      <!--<template slot-scope="scope">-->
                        <!--{{scope.row.buyTime | dateFmt('YYYY-MM-DD')}}-->
                      <!--</template>-->
                    </el-table-column>
                    <el-table-column prop="principal" label="本金"></el-table-column>
                    <el-table-column prop="hold" label="持仓"></el-table-column>
                    <el-table-column prop="profit" label="收益"></el-table-column>
                    <el-table-column prop="interestRate" label="收益率（%）"></el-table-column>
                  </el-table>
                </template>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import NavMenu from "../components/common/Nav";
  import SideNav from "../components/common/Side";
  export default {
    name: "Products",
    components: {
      NavMenu,
      SideNav,
    },
    data(){
      return{
        cid:window.localStorage.getItem('id'),
        rateStock:'',
        rateFund:'',
        tableData: [],
        tableDataStock:[],
        tableDataRegular:[],
        tableDataFund:[],
      }
    },
    created(){

      this.$axios.get('./bank/clientProduct/'+this.cid,{
        // params:{
        //   cid:this.$route.query.id,
        // }
      }) .then((res)=>{
        this.tableData = res.data;
        var length = this.tableData.length;
        for(var i=0;i<length;i++){
          if(this.tableData[i].type===0){
            this.tableDataRegular.push(this.tableData[i]);
          }
          else if(this.tableData[i].type===1){
            this.tableDataStock.push(this.tableData[i]);
          }
          else{
            this.tableDataFund.push(this.tableData[i]);
          }
        }

        var lengthRegular = this.tableDataRegular.length;
        for(var i=0;i<lengthRegular;i++){
          this.tableDataRegular[i].interestRate = this.tableDataRegular[i].interestRate*100;
        }

        var lengthStock = this.tableDataStock.length;
        for(var j=0;j<lengthStock;j++){
          this.rateStock = this.tableDataStock[j].profit*100/this.tableDataStock[j].principal;
          //保留两位小数
          this.tableDataStock[j].interestRate = parseFloat(this.rateStock).toFixed(2);
        }

        var lengthFund = this.tableDataFund.length;
        for(var k=0;k<lengthFund;k++){
          this.rateFund = this.tableDataFund[k].profit*100/this.tableDataFund[k].principal;
          this.tableDataFund[k].interestRate = parseFloat(this.rateFund).toFixed(2);
        }

      })
    },


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

