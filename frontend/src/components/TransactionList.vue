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
                <p style="text-align: left;margin: 30px 50px;font-size: 1.5em;font-weight: bold">银行流水信息</p>
              </div>

              <div style="display: flex">
                <div>
                  <el-input type="text" style="margin-left: 50px" placeholder="按流水号查询" ref="input1" v-model="eltest"></el-input>
                </div>
                <div>
                  <el-button type="primary" style="margin-left: 80px" v-on:click="search()">确定</el-button>
                </div>
              </div>

              <div>
                <template>
                  <el-table :data="transactions" stripe style="margin: 60px;width: 90%">
                    <el-table-column prop="id" label="流水号" align="center"></el-table-column>
                    <el-table-column prop="createTime" label="时间" align="center">
                      <!--<template slot-scope="scope">-->
                        <!--{{scope.row.createTime | dateFmt('YYYY-MM-DD')}}-->
                      <!--</template>-->
                    </el-table-column>
                    <el-table-column prop="clientId" label="客户id" align="center"></el-table-column>
                    <el-table-column prop="accountChange" label="余额变动情况" align="center"></el-table-column>
                    <el-table-column prop="type" label="业务类型" align="center"
                                     column-key="type"
                                     :filters="[{text: '存款', value: '0'},
                                     {text: '偿还贷款', value: '1'},
                                     {text: '扣除罚金', value: '2'},
                                     {text: '购买理财产品', value: '3'}]"
                                     :filter-method="filterHandler">
                      <template slot-scope="scope">
                        <span v-if="scope.row.type == '0'">存款</span>
                        <span v-if="scope.row.type == '1'">偿还贷款</span>
                        <span v-if="scope.row.type == '2'">扣除罚金</span>
                        <span v-if="scope.row.type == '3'">购买理财产品</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="备注" align="center"></el-table-column>
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
    name: "TransactionList",
    components: {
      NavMenu,
      SideNav,
    },
    data(){
      return{

        eltest:'',

        transactions:[
          {
            id:'',
            createTime:'',
            clientId:'',
            accountChange:'',
            type:'',
            desc:''
          }
        ]
      }
    },
    mounted(){
      console.log("页面初始化");
      this.trans();
    },
    methods:{
      trans(){
        var temp =window.localStorage.getItem('id');
        this.$axios.get('/bank/water-log/'+temp,{
        })
          .then(res=>{
            this.transactions = res.data;
          })
      },

      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] == value;
      },

      search(){
        var temp1 =window.localStorage.getItem('id');
        var inputValue = this.$refs.input1.value;
        this.$axios.get('/bank/water-log/'+temp1+'/'+inputValue,{
        })
          .then(res=>{
            this.transactions = res.data;
          })
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

