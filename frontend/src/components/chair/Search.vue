<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
    <div>
      <el-row>
        <el-col :span="3">
          <template v-if="authority==='chair'">
            <side-nav></side-nav>
          </template>
        </el-col>
        <el-col :span="21">
          <el-row>
            <el-col :span="22">
              <div style="margin: 50px 30px">
                <p style="float: left;margin: 0 50px;font-size: 1.2em">搜索用户：</p>
                <el-input placeholder="请输入姓名搜索" v-model="searchName" style="width: 50%">
                  <el-button slot="append" icon="el-icon-search" v-on:click="search()"></el-button>
                </el-input>
              </div>
              <div>
                <template>
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%;margin: 50px 80px"
                    @selection-change="handleSelectionChange"
                    max-height="450px"
                  >
                    <el-table-column type="selection" width="80"></el-table-column>
                    <el-table-column prop="id" label="用户id" width="120"></el-table-column>
                    <el-table-column prop="name" label="用户姓名" width="150"></el-table-column>
                    <el-table-column prop="username" label="用户名" width="150"></el-table-column>
                    <el-table-column prop="email" label="用户邮箱" width="200"></el-table-column>
                    <el-table-column prop="workplace" label="用户工作单位" width="180"></el-table-column>
                    <el-table-column prop="region" label="用户所在地" width="160"></el-table-column>
                  </el-table>
                  <div style="margin-top: 20px">
                    <el-button type="primary" @click="sendInvitation()" style="border: none">向选定用户发送成为投稿人的邀请</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                  </div>
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
  import NavMenu from "../common/NavMenu";
  import SideNav from "../common/ChairSide";
  export default {
    name: "Search",
    components: {
      NavMenu,
      SideNav
    },
    data() {
      return {
        authority:'chair',
        id:'',
        searchName:'',
        tableData: [],
        multipleSelection: [],
        inviteId:[]
      }
    },
    created(){
      this.$axios.get('meeting/chair/search',{
        params:{
          id:this.$route.query.id,
          searchName:this.searchName
        }
      }).then((res) =>{
        this.tableData=[];
        this.tableData=res.data;
      })
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(selections) {
        this.multipleSelection = selections.map(v => {
          const {id} = v;
          return {
            meetingId:this.$route.query.id,
            id,
          }
        });
        console.log(this.multipleSelection);
      },
      search(){
        // 搜索用户
       // this.$router.replace('/meeting/chair/search?id='+this.$route.query.id+'&search='+this.searchName);
        this.$axios.get('meeting/chair/search',{
          params:{
            id:this.$route.query.id,
            searchName:this.searchName
          }
        }).then((res) =>{
          this.tableData=[];
          this.tableData=res.data;
        })
      },
      sendInvitation(){
        this.$axios.post('meeting/chair/search',{
          multipleSelection:this.multipleSelection,
        }).then((res) =>{
          if(res.status===200 && res.data.length !== 0){
            this.inviteId = res.data;
            var l = res.data.length;
            for(var i=0;i<l;i++){
              this.message.error("未成功邀请到用户id为："+this.inviteId[i]+'的用户');
            }
            location.reload();
            this.$router.go(100);
          }
          else{
            this.$message.success('成功邀请到所有用户');
            location.reload();
            this.$router.go(100);
          }
        }).catch(error =>{
          console.log(error);
        })
      }
    }
  }
</script>
