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
                <p style="text-align: left;margin: 30px 50px;font-size: 1.5em;font-weight: bold">柜面归还贷款</p>
              </div>
              <div>
                <p style="float: left;margin: 30px 50px;font-size: 1.2em">贷款记录</p>
              </div>

              <div>
                <template>
                  <el-table :data="loans" stripe style="margin: 60px;width: 90%">
                    <el-table-column prop="id" label="贷款id" align="center"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="center">
                      <template slot-scope="scope">
                        {{scope.row.createTime | dateFmt('YYYY-MM-DD')}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="expirationTime" label="到期时间" align="center">
                      <template slot-scope="scope">
                        {{scope.row.expirationTime | dateFmt('YYYY-MM-DD')}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.status == '0'">未还</span>
                        <span v-if="scope.row.status == '1'">已还</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="clientId" label="用户id" align="center"></el-table-column>
                    <el-table-column prop="totalAccount" label="总金额" align="center"></el-table-column>
                    <el-table-column prop="currentAccount" label="待还金额" align="center"></el-table-column>
                    <el-table-column prop="fine" label="罚金" align="center">
                      <!--<template slot-scope="scope">-->
                        <!--<span v-if="scope.row.fine == '0'">无罚金或已还清</span>-->
                      <!--</template>-->
                    </el-table-column>

                    <el-table-column prop="ope" label="操作" align="center" width="230px">
                      <template slot-scope="scope">
                        <el-button type="button" v-if="scope.row.fine!='0'" v-on:click="payFine(scope.row.id)">清缴罚款</el-button>
                        <el-button type="button" v-if="scope.row.fine=='0'" v-on:click="paySome(scope.row.id)">部分还款</el-button>
                        <el-button type="button" v-if="scope.row.fine=='0'" v-on:click="payAll(scope.row.id)">全额还款</el-button>
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
    name: "ManualRepay",
    components: {
      NavMenu,
      SideNav,
    },

    data(){
      return{

        loans:[
          {
            id:'',
            createTime:'',
            expirationTime:'',
            status:'',
            clientId:'',
            totalAccount:'',
            currentAccount:'',
            nper:'',
            fine:''
          }
        ]
      }
    },

    mounted(){
      console.log("页面初始化");
      this.getLoans();

    },

    methods:{

      getLoans(){
        var temp =window.localStorage.getItem('id');
        this.$axios.get('/bank/loan-record/user/'+temp,{
        })
          .then(res=>{
            this.loans = res.data;
          })
      },

      //清缴罚款
      payFine(loanid){
        this.$store.commit('clearLoanId');
        this.$store.commit('setLoanId',loanid);
        var temp1 =this.$store.state.loanId;
        this.$axios.get('/bank/loan-record/fine/'+temp1,{
        })
          .then(res=>{
            this.$message.success('清缴成功');
          });
        location.reload();
        //emmm为什么不能先提示再刷新...
      },

      //全额还款
      payAll(loanid){
        this.$store.commit('clearLoanId');
        this.$store.commit('setLoanId',loanid);
        var temp2 =this.$store.state.loanId;
        this.$axios.get('/bank/loan-record/repay/'+temp2,{
        })
          .then(res=>{
            this.$message.success('还款成功');
          });
        //location.reload();
      },

      //部分还款
      paySome(loanid){
        this.$store.commit('clearLoanId');
        this.$store.commit('setLoanId',loanid);
        var temp3 =this.$store.state.loanId;
        this.$prompt('请输入还款金额', '确认还款', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
          inputErrorMessage: '请输入正确的还款金额'
        }).then(({ value }) => {
          this.$axios.post('/bank/loan-record/repay?account='+value+'&id='+temp3)
            .then(res =>{
              if(res.status===200){
                this.$message.success('还款成功');
              }
              else{
                this.$message.error('还款出错');
              }
            })
            .catch(error =>{
              this.$message.error('还款请求出错')
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消还款'
          });
        });
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


