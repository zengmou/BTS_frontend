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
        <div style="margin: 20px 10px">
          <p style="padding:10px;float: left;font-size: 1.2em">已通过的会议申请</p>
          <template>
            <el-table :data="tableDataAccepted" stripe style="width: 95%;margin: auto" max-height="300">
              <el-table-column prop="id" label="会议id" fixed="left" width="120"></el-table-column>
              <el-table-column prop="fullName" label="会议全称" width="150"></el-table-column>
              <el-table-column prop="shortName" label="会议简称" width="150"></el-table-column>
              <el-table-column prop="place" label="举办地点" width="150"></el-table-column>
              <el-table-column prop="holdTime" label="举办时间" width="150"></el-table-column>
              <el-table-column prop="deadline" label="投稿截止日期" width="150"></el-table-column>
              <el-table-column prop="publishTime" label="评审结果发表日期" width="150"></el-table-column>
              <el-table-column prop="approvalStatus" label="申请状态"></el-table-column>
            </el-table>
          </template>
        </div>
        <div style="margin: 60px 10px">
          <p style="padding:10px;float: left;font-size: 1.2em">未处理的会议申请</p>
          <template>
            <el-table :data="tableDataProcessing" stripe style="width: 95%;margin: auto" max-height="300">
              <el-table-column prop="id" v-model="tableDataProcessing" label="会议id" fixed="left" width="120"></el-table-column>
              <el-table-column prop="fullName" label="会议全称" width="150"></el-table-column>
              <el-table-column prop="shortName" label="会议简称" width="150"></el-table-column>
              <el-table-column prop="place" label="举办地点" width="150"></el-table-column>
              <el-table-column prop="holdTime" label="举办时间" width="150"></el-table-column>
              <el-table-column prop="deadline" label="投稿截止日期" width="150"></el-table-column>
              <el-table-column prop="publishTime" label="评审结果发表日期" width="150"></el-table-column>
              <el-table-column prop="approvalStatus" label="申请状态" width="150"></el-table-column>
            </el-table>
          </template>
        </div>
        <div style="margin: 60px 10px">
          <p style="padding:10px;float: left;font-size: 1.2em">未通过的会议申请</p>
          <template>
            <el-table :data="tableDataRefused" stripe style="width: 95%;margin: auto" max-height="300">
              <el-table-column prop="id" v-model="tableDataRefused" label="会议id" fixed="left" width="120"></el-table-column>
              <el-table-column prop="fullName" label="会议全称" width="150"></el-table-column>
              <el-table-column prop="shortName" label="会议简称" width="150"></el-table-column>
              <el-table-column prop="place" label="举办地点" width="150"></el-table-column>
              <el-table-column prop="holdTime" label="举办时间" width="150"></el-table-column>
              <el-table-column prop="deadline" label="投稿截止日期" width="150"></el-table-column>
              <el-table-column prop="publishTime" label="评审结果发表日期" width="150"></el-table-column>
              <el-table-column prop="approvalStatus" label="申请状态" width="150"></el-table-column>
            </el-table>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
  import NavMenu from '../common/NavMenu'
  import SideNav from '../common/MeetingSide'
  export default {
    name: "Application",
    components: {
      NavMenu,
      SideNav
    },
    data() {
      return {
        approvalStatus: '',
        temp:'',
        tableDataAccepted: [],
        tableDataProcessing: [],
        tableDataRefused:[]
      }
    },
    created() {
      //获取审核通过的会议
      this.$axios.get('./meeting/application').then((res) => {
        this.temp = res.data;
        let l = this.temp.length;
        for (let i = 0; i < l; i++) {
          if(res.data[i].approvalStatus===2){
            this.tableDataAccepted.push(res.data[i]);
          }
        }
        let length = this.tableDataAccepted.length;
        for (let j=0;j<length;j++){
          this.tableDataAccepted[j].approvalStatus = '审核通过';
        }
      });
      //获取等待审核的会议
      this.$axios.get('./meeting/application').then((res) => {
        this.temp = res.data;
        let l = this.temp.length;
        for (let i=0;i<l;i++){
          if(res.data[i].approvalStatus===0){
            this.tableDataProcessing.push(res.data[i]);
          }
        }
        let length = this.tableDataProcessing.length;
        for (let j = 0; j<length; j++) {
          this.tableDataProcessing[j].approvalStatus = '等待管理员审核';
        }
      });
      //获取审核未通过的会议
      this.$axios.get('./meeting/application').then((res) => {
        this.temp = res.data;
        let l = this.temp.length;
        for (let i=0;i<l;i++){
          if(res.data[i].approvalStatus===1){
            this.tableDataRefused.push(res.data[i]);
          }
        }
        let length = this.tableDataRefused.length;
        for (let j=0; j<length; j++) {
          this.tableDataRefused[j].approvalStatus = '审核未通过';
        }
      })
    }
  }
</script>
