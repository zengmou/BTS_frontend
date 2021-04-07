<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
    <div>
      <el-row>
        <el-col :span="3">
          <side-nav></side-nav>
        </el-col>
        <el-col :span="21" style="padding: 20px">
          <p style="padding:10px;float: left;font-size: 1.2em">当前所有会议（仅显示审核通过的会议）</p>
          <template>
            <el-table :data="tableData" stripe style="width: 100%" max-height="500">
              <el-table-column prop="id" v-model="tableData" label="会议id" fixed="left" width="120"></el-table-column>
              <el-table-column prop="fullName" label="会议全称" width="150"></el-table-column>
              <el-table-column prop="chairName" label="主席姓名" width="120"></el-table-column>
              <el-table-column prop="chairUsername" label="主席用户名" width="150"></el-table-column>
              <el-table-column prop="place" label="举办地点" width="150"></el-table-column>
              <el-table-column prop="holdTime" label="举办时间" width="150"></el-table-column>
              <el-table-column prop="deadline" label="投稿截止日期" width="150"></el-table-column>
              <el-table-column prop="publishTime" label="评审结果发表日期" width="150"></el-table-column>
              <el-table-column prop="submitStatus" label="投稿状态" width="150"></el-table-column>
              <el-table-column label="操作" fixed="right" width="150">
                <template slot-scope="scope">
                  <el-button @click="toSubmit(scope.$index)" type="text" size="small">为该会议投稿</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import NavMenu from "../common/NavMenu";
  import SideNav from "../common/MeetingSide";
  export default {
    name: "AllMeetings",
    components: {
      SideNav,
      NavMenu
    },
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.$axios.get('./meeting/submitting').then((res) => {
        this.tableData = res.data.approvedMeetings;
        let l = this.tableData.length;
        for(let i=0;i<l;i++){
          this.tableData[i].chairName = res.data.approvedMeetingsChairs[i].name;
          this.tableData[i].chairUsername = res.data.approvedMeetingsChairs[i].username;
          if(this.tableData[i].submitStatus === 1){
            this.tableData[i].submitStatus = '投稿中';
          }
          else if(this.tableData[i].submitStatus === 0){
            this.tableData[i].submitStatus = '未开启投稿';
          }
          else{
            this.tableData[i].submitStatus = '投稿已结束';
          }
        }
      })
    },
    methods: {
      toSubmit(row) {
        if (this.tableData[row].submitStatus === '未开启投稿') {
          this.$message('当前会议未开启投稿');
        }
        else if(this.tableData[row].submitStatus === '投稿已结束'){
          this.$message('当前会议未开启投稿');
        }
        else if(this.tableData[row].chairUsername===localStorage.getItem('username')){
          this.$message('您已经是本会议的chair，不可以参与投稿')
        }
        else {
          this.$router.replace('../submit?id=' + this.tableData[row].id);
        }
      }
    }
  }
</script>
