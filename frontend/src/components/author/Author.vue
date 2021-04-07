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
          <el-row>
            <el-col :span="24">
              <p style="float: left;margin: 30px 50px;font-size: 1.2em">会议详情</p>
              <div>
                <template>
                  <el-table :data="tableData" stripe style="margin:50px;width: 90%">
                    <el-table-column prop="id" label="会议id" fixed="left"></el-table-column>
                    <el-table-column prop="fullName" label="会议全称"></el-table-column>
                    <el-table-column prop="chairName" label="主席姓名"></el-table-column>
                    <el-table-column prop="place" label="举办地点"></el-table-column>
                    <el-table-column prop="holdTime" label="举办时间"></el-table-column>
                    <el-table-column prop="submitStatus" label="投稿状态"></el-table-column>
                    <el-table-column prop="reviewStatus" label="审稿状态"></el-table-column>
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
                          <el-form-item label="主席用户名:">
                            <span>{{ props.row.chairUsername }}</span>
                          </el-form-item>
                          <el-form-item label="举办地点:">
                            <span>{{ props.row.place }}</span>
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
                          <el-form-item label="会议主题:">
                            <span>{{ props.row.topics }}</span>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </el-col>
          </el-row>
          <el-divider content-position="left">尊敬的投稿人，您可以对进行如下会议操作</el-divider>
          <el-row style="margin: 60px 0">
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin: 10px 50px">
                <img src="../../assets/meeting/submit.jpg" class="image" alt="submit" style="width: 100%;" />
                <div style="padding: 14px;">
                  <span>想要继续为该会议投稿？</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="toSubmit()">前往投稿页面</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin: 10px 50px">
                <img src="../../assets/meeting/processing.jpg" class="image" alt="processing" style="width: 100%;" />
                <div style="padding: 14px;">
                  <span>想要查看稿件状态或修改稿件？</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="toPapers()">查看我的投稿</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <span style="font-size:40px;color: #a2a2a7;float:left;padding: 100px">更多功能正在建设中...</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import NavMenu from "../common/NavMenu";
  import SideNav from "../common/AuthorSide";
  export default {
    components: {SideNav, NavMenu },
    name: "Author",
    data() {
      return {
        id:'',
        tableData: []
      };
    },
    created() {
      window.localStorage.setItem('authority','author');
      window.localStorage.setItem('meetingId',this.$route.query.id);
      this.$axios.get("./meeting/author", {
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        this.tableData.push(res.data.meeting);
        this.tableData[0].chairName = res.data.chairNameAndUsername.name;
        this.tableData[0].chairUsername = res.data.chairNameAndUsername.username;
        if (this.tableData[0].submitStatus === 1) {
          this.tableData[0].submitStatus = "投稿中";
        }
        else if (this.tableData[0].submitStatus === 0) {
          this.tableData[0].submitStatus = "未开启投稿";
        }
        else {
          this.tableData[0].submitStatus = "投稿已结束";
        }
        if(this.tableData[0].reviewStatus === 1){
          this.tableData[0].reviewStatus = '审稿中';
        }
        else if(this.tableData[0].reviewStatus === 0){
          this.tableData[0].reviewStatus = '未开启审稿';
        }
        else{
          this.tableData[0].reviewStatus = '审稿已结束';
        }
      });
    },
    methods: {
      toSubmit() {
        //在url中读取出id，拼接到目标路径中
        if(this.tableData[0].submitStatus === '未开启投稿'){
          this.$message('当前会议未开启投稿');
        }
        else if(this.tableData[0].reviewStatus === '投稿已结束'){
          this.$message('当前会议投稿已结束')
        }
        else{
          this.$router.replace('/submit?id='+this.$route.query.id);
        }
      },
      toPapers(){
        if(this.tableData[0].submitStatus === '未开启投稿'){
          this.$message('当前会议未开启投稿');
        }
        else{
          localStorage.setItem('id',this.$route.query.id);
          this.$router.replace('/meeting/papers?id='+this.$route.query.id);
        }
        
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
