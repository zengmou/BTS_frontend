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
              <div style="margin: 20px 50px">
                <p style="padding:10px;float: left;font-size: 1.2em">已同意的审稿人邀请</p>
                <template>
                  <el-table :data="tableDataAccepted" stripe style="width: 100%;margin:30px" max-height="300" border>
                    <el-table-column prop="name" v-model="tableDataAccepted" label="用户姓名"></el-table-column>
                    <el-table-column prop="username" label="用户名"></el-table-column>
                    <el-table-column prop="status" label="邀请状态"></el-table-column>
                  </el-table>
                </template>
              </div>
              <div style="margin: 20px 50px">
                <p style="float: left;padding: 10px;font-size: 1.2em">待接受的审稿人邀请</p>
                <template>
                  <el-table :data="tableDataProcessing" stripe style="width: 100%;margin: 30px" max-height="300" border>
                    <el-table-column prop="name" v-model="tableDataProcessing" label="用户姓名"></el-table-column>
                    <el-table-column prop="username" label="用户名"></el-table-column>
                    <el-table-column prop="status" label="邀请状态"></el-table-column>
                  </el-table>
                </template>
              </div>
              <div style="margin: 20px 50px">
                <p style="float: left;padding: 10px;font-size: 1.2em">已拒绝的审稿人邀请</p>
                <template>
                  <el-table :data="tableDataRefused" stripe style="width: 100%;margin: 30px" max-height="300" border>
                    <el-table-column prop="name" v-model="tableDataRefused" label="用户姓名"></el-table-column>
                    <el-table-column prop="username" label="用户名"></el-table-column>
                    <el-table-column prop="status" label="邀请状态"></el-table-column>
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
  import NavMenu from "../common/NavMenu";
  import SideNav from "../common/ChairSide";
  export default {
    name: "SentInvitation",
    components: {
      NavMenu,
      SideNav
    },
    data() {
      return {
        id: '',
        temp:[],
        tableDataAccepted: [],
        tableDataProcessing: [],
        tableDataRefused: [],
        invitationStatus: ''
      }
    },
    created() {
      this.$axios.get('meeting/chair/invitation', {
        params: {
          id: this.$route.query.id,
        }
      }).then((res) => {
        console.log(res);
        this.temp = res.data;
        let l = this.temp.length;
        for(let i=0;i<l;i++){
          if(res.data[i].invitationStatus===1){
            this.tableDataAccepted.push(res.data[i]);
          }
        }
        let length = this.tableDataAccepted.length;
        for(let j=0;j<length;j++){
          this.tableDataAccepted[j].status = '已接受邀请';
        }
      });
      this.$axios.get('meeting/chair/invitation', {
        params: {
          id: this.$route.query.id,
        }
      }).then((res) => {
        console.log(res);
        this.temp = res.data;
        let l = this.temp.length;
        for(let i=0;i<l;i++){
          if(res.data[i].invitationStatus===0){
            this.tableDataProcessing.push(res.data[i]);
          }
        }
        let length = this.tableDataProcessing.length;
        for(let j=0;j<length;j++){
          this.tableDataProcessing[j].status = '等待回复中';
        }
      });
      this.$axios.get('meeting/chair/invitation', {
        params: {
          id: this.$route.query.id,
        }
      }).then((res) => {
        console.log(res);
        this.temp = res.data;
        let l = this.temp.length;
        for(let i=0;i<l;i++){
          if(res.data[i].invitationStatus===2){
            this.tableDataRefused.push(res.data[i]);
          }
        }
        let length = this.tableDataRefused.length;
        for(let j=0;j<length;j++){
          this.tableDataRefused[j].status = '已拒绝邀请';
        }
      })
    }
  }
</script>
