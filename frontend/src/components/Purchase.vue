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
                <p style="text-align: left;margin: 30px 50px;font-size: 1.5em;font-weight: bold">账户信用等级: {{creditLevel}}</p>
              </div>
              <div>
                <p style="float: left;margin: 30px 50px;font-size: 1.5em">定期理财产品</p>
              </div>
              <div>
                <template>
                  <el-table :data="tableDataRegular" stripe style="margin: 60px;width: 90%">
                    <el-table-column prop="id" label="产品编号" fixed="left"></el-table-column>
                    <el-table-column prop="name" label="产品名称"></el-table-column>
                    <el-table-column prop="price" label="产品价格"></el-table-column>
                    <el-table-column prop="interestRate" label="日利率（%）"></el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button @click="pay(scope.row)" type="text" size="small">购买</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
              <div>
                <p style="float: left;margin: 30px 50px;font-size: 1.5em">基金</p>
              </div>
              <div>
                <template>
                  <el-table :data="tableDataFund" stripe style="margin:60px;width:90%">
                    <el-table-column prop="id" label="产品编号" fixed="left"></el-table-column>
                    <el-table-column prop="name" label="基金名称"></el-table-column>
                    <el-table-column prop="price" label="基金份额"></el-table-column>
                    <el-table-column prop="interestRate" label="当前涨跌（%）"></el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button @click="pay(scope.row)" type="text" size="small" v-if="creditLevel!='三级'">购买</el-button>
                        <el-button type="text" size="small" v-if="creditLevel==='三级'" disabled>信用等级不足</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
              <div>
                <p style="float: left;margin: 30px 50px;font-size: 1.5em">股票</p>
              </div>
              <div>
                <template>
                  <el-table :data="tableDataStock" stripe style="margin:60px;width:90%">
                    <el-table-column prop="id" label="产品编号" fixed="left"></el-table-column>
                    <el-table-column prop="name" label="股票名称"></el-table-column>
                    <el-table-column prop="price" label="每股单价"></el-table-column>
                    <el-table-column prop="interestRate" label="当前涨跌（%）"></el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button @click="pay(scope.row)" type="text" size="small" v-if="creditLevel==='一级'">购买</el-button>
                        <el-button type="text" size="small" v-if="creditLevel==='三级'||creditLevel==='二级'" disabled>信用等级不足</el-button>
                      </template>
                    </el-table-column>
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
    name: "Purchase",
    components: {
      NavMenu,
      SideNav
    },
    data(){
      return{
        id:'',
        creditRate:'',
        creditLevel:'',
        tableData: [],
        tableDataStock:[],
        tableDataRegular:[],
        tableDataFund:[],
      }
    },
    created(){
      this.$axios.get('./bank/account/'+localStorage.getItem('identity'),{
        //idn: this.loginForm.identity,
      })
        .then(res =>{
          this.creditRate = res.data.creditRate;
          if(this.creditRate===1){
            this.creditLevel = '一级';
          }
          else if(this.creditRate===2){
            this.creditLevel = '二级';
          }
          else{
            this.creditLevel = '三级';
          }
        })


      this.$axios.get('./bank/finance-product',{
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
        for(var i=0;i<lengthStock;i++){
          this.tableDataStock[i].interestRate = this.tableDataStock[i].interestRate*100;
        }

        var lengthFund = this.tableDataFund.length;
        for(var i=0;i<lengthFund;i++){
          this.tableDataFund[i].interestRate = this.tableDataFund[i].interestRate*100;
        }
      })
    },
    methods:{
      pay(row){
        this.$prompt('请输入购买金额', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
          inputErrorMessage: '请输入正确的购买金额'
        }).then(({ value }) => {
          this.$axios.post('./bank/finance-product/buyProduct',{
            clientId:window.localStorage.getItem('id'),
            fpdId:row.id,
            principal:value,
          }).then(res =>{
            if(res.status===200){
              this.$message.success('购买成功！');
            }
            else{
              this.$message.error('余额不足');
            }
          }).catch(error =>{
            this.$message.error('余额不足')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消购买'
          });
        });

      },
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

