<template>
  <div>
    <nav-menu></nav-menu>
    <router-view />
    <div>
      <el-row>
        <el-col :span="3">
          <side-nav></side-nav>
        </el-col>
        <el-col :span="21">
          <p style="padding:40px;float: left;font-size: 1.2em">待处理的成为会议审稿人的邀请</p>
          <template>
            <el-table :data="tableData" stripe style="width: 90%;margin: 40px auto" max-height="600">
              <el-table-column prop="id" v-model="tableData" label="会议id"  width="200"></el-table-column>
              <el-table-column prop="fullName" label="会议全称" width="220"></el-table-column>
              <el-table-column prop="chairName" label="主席姓名" width="220"></el-table-column>
              <el-table-column prop="place" label="举办地点" width="220"></el-table-column>
              <el-table-column prop="submitStatus" label="投稿状态" width="200"></el-table-column>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline id="demo-table-expand">
                    <el-form-item label="会议全称:">
                      <span>{{ props.row.fullName }}</span>
                    </el-form-item>
                    <el-form-item label="会议简称:">
                      <span>{{ props.row.shortName }}</span>
                    </el-form-item>
                    <el-form-item label="会议id:">
                      <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="主席姓名:">
                      <span>{{ props.row.chairName }}</span>
                    </el-form-item>
                    <el-form-item label="举办地点:">
                      <span>{{ props.row.holdTime }}</span>
                    </el-form-item>
                    <el-form-item label="举办时间:">
                      <span>{{ props.row.holdTime }}</span>
                    </el-form-item>
                    <el-form-item label="投稿截止日期:">
                      <span>{{ props.row.deadline }}</span>
                    </el-form-item>
                    <el-form-item label="评审结果发表日期:">
                      <span>{{ props.row.publishTime }}</span>
                    </el-form-item>
                    <el-form-item label="我负责的主题:">
                      <el-checkbox-group v-model="selectedTopics" :min="1">
                        <el-checkbox v-for="topic in tableData[props.$index].topics" :label="topic" :key="topic" >{{topic}}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="操作:">
                      <el-button @click="accept(props.row.id,props.$index)" type="text" size="small">接受邀请</el-button>
                      <el-button @click="refuse(props.row.id)" type="text" size="small">拒绝邀请</el-button>
                    </el-form-item>
                  </el-form>
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
import SideNav from "../common/HomeSide";
export default {
  name: "ReceivedInvitation",
  components: { NavMenu, SideNav },
  data() {
    return {
      tableData: [{
        id:'',
        fullName:'',
        chairName:'',
        place:'',
        submitStatus:'',
        shortName:'',
        holdTime:'',
        deadline:'',
        publishTime:'',
        topics:[],
      }],
      id: "",
      invitationStatus: "",
      //存放0和1，0代表没选中，1代表选中
      checkedTopics: [],
      selectedTopics:[],
      //可以将topicOptions改为会议的topic[]属性
      //topicOptions: []
    };
  },
  created() {
    this.$axios.get("/message").then(res => {
      this.tableData = res.data.meetings;
      let l = this.tableData.length;
      for (let i = 0; i < l; i++) {
        this.tableData[i].chairName = res.data.meetingsChairs[i].name;
        if (this.tableData[i].submitStatus === 1) {
          this.tableData[i].submitStatus = "投稿中";
        } else if (this.tableData[i].submitStatus === 0) {
          this.tableData[i].submitStatus = "未开启投稿";
        } else {
          this.tableData[i].submitStatus = "投稿已结束";
        }
      }

    });
  },
  methods: {
    accept(id,index) {
      //checkedTopics表示主题是否被选中，选中为1，否则为0
      //alert(this.checkedTopics);
      var l = this.selectedTopics.length;
      var length = this.tableData[index].topics.length;
      this.checkedTopics = this.tableData[index].topics;
      if (l === 0) {
        this.$message.error("需选择至少一个主题");
      } 
      else {
        for(var i=0;i<length;i++){
          if(this.selectedTopics.indexOf(this.checkedTopics[i])>-1){
            this.checkedTopics[i]=1;
          }
          else{
            this.checkedTopics[i]=0;
          }
        }
        console.log(this.checkedTopics);
        this.$axios.post("/message", {
          id: id,
          invitationStatus: 1,
          checkedTopics: this.checkedTopics
        })
        .then(res => {
          if (res.status === 200 && res.data === true) {
            this.$message.success("已接受会议" + id + "成为审稿人的邀请");
            // alert(this.tableData[row].id);
            location.reload();
            this.$router.go(100);
          } 
          else {
            this.$message.error("接受邀请失败");
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("请求出错");
        });
      }
    },
    refuse(id) {
      this.$axios.post("/message", {
        id: id,
        invitationStatus: 2,
      })
      .then(res => {
        if (res.status === 200 && res.data === true) {
          this.$message.success("已拒绝会议" + id + "成为审稿人的邀请");
          location.reload();
          this.$router.go(100);
        } 
        else {
          this.$message.error("未查询到相应会议id");
        }
      })
      .catch(error => {
        console.log(error);
        this.$message.error("请求出错");
      });
    }
    
  }
};
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
