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
          <div>
            <p style="padding:10px;float: left;font-size: 1.2em">身份为主席的会议</p>
            <template>
              <el-table :data="tableDataChair" stripe style="width: 95%;margin: auto" max-height="300">
                <el-table-column prop="id" v-model="tableDataChair" label="会议id"></el-table-column>
                <el-table-column prop="fullName" label="会议全称"></el-table-column>
                <el-table-column prop="chairName" label="主席姓名"></el-table-column>
                <el-table-column prop="submitStatus" label="投稿状态"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="enterMeetingAsChair(scope.$index)" type="text" size="small">以主席身份进入会议</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div style="padding-top:20px">
            <p style="float: left;padding: 10px;font-size: 1.2em">身份为审稿人的会议</p>
            <template>
              <el-table :data="tableDataPC" stripe style="width: 95%;margin: auto" max-height="300">
                <el-table-column prop="id" v-model="tableDataPC" label="会议id"></el-table-column>
                <el-table-column prop="fullName" label="会议全称"></el-table-column>
                <el-table-column prop="chairName" label="主席姓名"></el-table-column>
                <el-table-column prop="submitStatus" label="投稿状态"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="enterMeetingAsPC(scope.$index)" type="text" size="small">以审稿人身份以进入会议</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div style="padding-top:20px">
            <p style="float: left;padding: 10px;font-size: 1.2em">身份为作者的会议</p>
            <template>
              <el-table :data="tableDataAuthor" stripe style="width: 95%;margin: auto" max-height="300">
                <el-table-column prop="id" v-model="tableDataAuthor" label="会议id"></el-table-column>
                <el-table-column prop="fullName" label="会议全称"></el-table-column>
                <el-table-column prop="chairName" label="主席姓名"></el-table-column>
                <el-table-column prop="submitStatus" label="投稿状态"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="enterMeetingAsAuthor(scope.$index)" type="text" size="small">以作者身份以进入会议</el-button>
                  </template>
                </el-table-column>
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
    name: "MyMeetings",
    components: {
      NavMenu,
      SideNav
    },
    data() {
      return {
        authority: '',
        tableDataChair: [],
        tableDataPC: [],
        tableDataAuthor: []
      }
    },
    created() {
      this.$axios.get('./meeting/joining', {
        params: {
          authority: 'chair'
        }
      }).then(res => {
        let length = res.data.chairMeetings.length;
        for (let i=length-1;i>=0;i--){
          if (res.data.chairMeetings[i].approvalStatus!==2){
            res.data.chairMeetings.splice(i,1)
          }
        }
        this.tableDataChair = res.data.chairMeetings;
        let l = this.tableDataChair.length;
        for (let i = 0; i < l; i++) {
          this.tableDataChair[i].chairName = res.data.chairMeetingsChairs[i].name;
          if (this.tableDataChair[i].submitStatus === 1) {
            this.tableDataChair[i].submitStatus = '投稿中';
          }
          else if (this.tableDataChair[i].submitStatus === 0) {
            this.tableDataChair[i].submitStatus = '未开启投稿';
          }
          else {
            this.tableDataChair[i].submitStatus = '投稿已结束';
          }
        }
      });
      this.$axios.get('./meeting/joining', {
        params: {
          authority: 'PC'
        }
      }).then(res => {
        this.tableDataPC = res.data.PCMemberMeetings;
        let l = this.tableDataPC.length;
        for (let i = 0; i < l; i++) {
          this.tableDataPC[i].chairName = res.data.PCMemberMeetingsChairs[i].name;
          if (this.tableDataPC[i].submitStatus === 1) {
            this.tableDataPC[i].submitStatus = '投稿中';
          } else if (this.tableDataPC[i].submitStatus === 0) {
            this.tableDataPC[i].submitStatus = '未开启投稿';
          } else {
            this.tableDataPC[i].submitStatus = '投稿已结束';
          }
        }
      });
      this.$axios.get('./meeting/joining', {
        params: {
          authority: 'author'
        }
      }).then(res => {
        this.tableDataAuthor = res.data.authorMeetings;
        let l = this.tableDataAuthor.length;
        for(let i=0;i<l;i++){
          this.tableDataAuthor[i].chairName = res.data.authorMeetingsChairs[i].name;
          if(this.tableDataAuthor[i].submitStatus === 1){
            this.tableDataAuthor[i].submitStatus = '投稿中';
          }
          else if(this.tableDataAuthor[i].submitStatus === 0){
            this.tableDataAuthor[i].submitStatus = '未开启投稿';
          }
          else{
            this.tableDataAuthor[i].submitStatus = '投稿已结束';
          }
        }
      })
    },
    methods: {
      enterMeetingAsChair(row) {
        localStorage.setItem('authority', 'chair');
        localStorage.setItem('meetingId', this.tableDataChair[row].id);
        this.$router.replace('/meeting/chair?id=' + this.tableDataChair[row].id);
      },
      enterMeetingAsPC(row) {
        localStorage.setItem('authority', 'PC');
        localStorage.setItem('meetingId', this.tableDataPC[row].id);
        this.$router.replace('/meeting/PC?id=' + this.tableDataPC[row].id);
      },
      enterMeetingAsAuthor(row) {
        localStorage.setItem('authority', 'author');
        localStorage.setItem('meetingId', this.tableDataAuthor[row].id);
        this.$router.replace('/meeting/author?id=' + this.tableDataAuthor[row].id);
      }
    }
  }
</script>
