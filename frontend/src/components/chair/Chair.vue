<template>
  <div>
    <nav-menu></nav-menu>
    <MessageBox :show="show" v-if="reset"></MessageBox>
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
                <p style="float: left;margin: 30px 50px;font-size: 1.5em">会议详情</p>
              </div>
              <div>
                <template>
                  <el-table :data="tableData" stripe style="margin: 60px;width: 90%">
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
          <el-divider content-position="left">尊敬的主席，您可以对进行如下会议操作</el-divider>
          <el-row style="margin: 60px 0" :gutter="20">
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin-left:100px;">
                <img src="../../assets/meeting/open.jpg" class="image" alt="open" style="width: 100%;">
                <div style="padding: 14px;">
                  <span>想要开启会议投稿状态？</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="startSubmitting()">开启投稿</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin:0 50px">
                <img src="../../assets/meeting/group.jpg" class="image" alt="group" style="width: 100%;">
                <div style="padding: 14px;">
                  <span>想要为会议邀请审稿人？</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="toSearch()">前往用户搜索页面</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin-right:100px;">
                <img src="../../assets/meeting/invitation.jpg" class="image" alt="invitation" style="width: 100%;">
                <div style="padding: 14px;">
                  <span>想要确认审稿人邀请状态？</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="checkInvitation()">查看邀请状态</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row style="margin: 60px 0" :gutter="20">
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin-left:100px;">
                <img src="../../assets/meeting/review.jpg" class="image" alt="review" style="width: 100%;">
                <div style="padding: 14px;">
                  <span>稿件征集完毕？</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="startReview()">开启会议审稿</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin:0 50px;">
                <img src="../../assets/meeting/check.jpg" class="image" alt="check" style="width: 100%;">
                <div style="padding: 14px;">
                  <span>想要进行审稿工作？</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="toReview()">进入分配到的稿件页面</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin-right:100px;">
                <img src="../../assets/meeting/result.jpg" class="image" alt="result" style="width: 100%;">
                <div style="padding: 14px;">
                  <span>初次审稿工作进行完毕？</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="showResult()">发布初次评审录取结果</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row style="margin: 60px 0" :gutter="20">
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin-left:100px;">
                <img src="../../assets/meeting/processing.jpg" class="image" alt="processing" style="width: 100%;">
                <div style="padding: 14px;">
                  <span>想要查看作者投递的稿件？</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="toAllPapers()">查看会议所有稿件状态</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="margin:0 50px;">
                <img src="../../assets/meeting/discussing.jpg" class="image" alt="discussing" style="width: 100%;">
                <div style="padding: 14px;">
                  <span>已经完成对作者申辩的讨论和复审？</span>
                  <div>
                    <el-button type="text" class="button" v-on:click="releaseFinal()">发布稿件复审录取结果</el-button>
                  </div>
                </div>
              </el-card>
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
  import MessageBox from "../common/MessageBox";
  export default {
    name: "Chair",
    components: {
      NavMenu,
      SideNav,
      MessageBox
    },
    data(){
      return{
        reset:true,
        show:false,
        id:'',
        tableData: [],
        submitStatus:'',
        reviewStatus:'',
      }
    },
    created(){
      this.show = false;
      window.localStorage.setItem('authority','chair');
      window.localStorage.setItem('meetingId',this.$route.query.id);
      this.$axios.get('./meeting/chair',{
        params:{
          id:this.$route.query.id,
        }
      }) .then((res)=>{
        this.tableData.push(res.data.meeting);
        this.tableData[0].chairName = res.data.chairNameAndUsername.name;
        this.tableData[0].chairUsername = res.data.chairNameAndUsername.username;
        if(this.tableData[0].submitStatus === 1){
          this.tableData[0].submitStatus = '投稿中';
        }
        else if(this.tableData[0].submitStatus === 0){
          this.tableData[0].submitStatus = '未开启投稿';
        }
        else{
          this.tableData[0].submitStatus = '投稿已结束';
        }
        if(this.tableData[0].reviewStatus === 1){
          this.tableData[0].reviewStatus = '初审中';
        }
        else if(this.tableData[0].reviewStatus === 0){
          this.tableData[0].reviewStatus = '待开启审稿';
        }
        else if(this.tableData[0].reviewStatus === 2){
          this.tableData[0].reviewStatus = '已发布初次审稿结果';
        }
        else if(this.tableData[0].reviewStatus === 3){
          this.tableData[0].reviewStatus = '复审中';
        }
        else{
          this.tableData[0].reviewStatus = '审稿已结束';
        }
      })
    },
    methods:{
      startSubmitting(){
        if (this.tableData[0].submitStatus==='投稿中'){
          this.$message('会议已在稿件征集中')
        }
        else if (this.tableData[0].submitStatus==='未开启投稿') {
          // 修改会议投稿状态
          this.$axios.post('./meeting/chair',{
            id:this.$route.query.id,
            submitStatus:1,
          }).then(res =>{
            if(res.status===200 && res.data){
              location.reload();
              this.$router.go(100);
              this.$message.success('已开启会议的投稿状态');
            }
            else{
              this.$message.error('开启投稿失败')
            }
          }).catch(error =>{
            this.$message.error('请求出错')
          })
        }
        else{
          this.$message.error('会议状态错误')
        }
      },
      toSearch(){
        this.$router.replace('/meeting/chair/search?id='+this.$route.query.id);
      },
      checkInvitation(){
        this.$router.replace('/meeting/chair/invitation?id='+this.$route.query.id);
      },
      startReview(){
        if(this.tableData[0].submitStatus==='未开启投稿'){
          this.$message('该会议还未开启投稿');
        }
        else if(this.tableData[0].reviewStatus!=='待开启审稿'&&this.tableData[0].reviewStatus!=='审稿已结束'){
          this.$message('该会议已开启审稿');
        }
        else if(this.tableData[0].reviewStatus==='审稿已结束'){
          this.$message('该会议审稿已结束')
        }
        else{
          localStorage.setItem('meetingId',this.$route.query.id);
          this.show = true;
          this.reset = false;
          this.$nextTick(() => (this.reset=true));
          // this.$axios.post('./meeting/chair',{
          //   reviewStatus:1,
          //   id:this.$route.query.id,
          // }).then(res =>{
          //   if(res.status===200 && res.data){
          //     this.$message.success('已开启会议审稿');
          //     location.reload();
          //     this.$router.go(100);
          //   }
          //   else{
          //     this.$message.error('开启审稿失败');
          //   }
          // }).catch(error =>{
          //   this.$message.error('请求出错');
          // })
        }
      },
      toReview(){
        if(this.tableData[0].reviewStatus === '待开启审稿'){
          this.$message('当前会议未开启审稿');
        }
        else if(this.tableData[0].reviewStatus === '审稿已结束'){
          this.$message('当前会议已结束审稿');
        }
        else{
          this.$router.replace('/meeting/review?id='+this.$route.query.id);
        }
      },
      toAllPapers(){
        this.$router.replace('/meeting/chair/papers?id='+this.$route.query.id);
      },
      showResult(){
        this.$axios.get('./meeting/chair/announce',{
          params:{
            id:this.$route.query.id,
          }
        }).then(res =>{
          if(res.status===200 && res.data){
            this.$message.success('已公布初次评审结果');
            location.reload();
          }
          else{
            this.$message.error('初次审稿还未完成');
          }
        }).catch(error =>{
          this.$message.error('请求出错');
        })
      },
      releaseFinal(){
        this.$axios.get('./meeting/chair/announcefinal',{
          params:{
            id:this.$route.query.id,
          }
        }).then(res =>{
          if(res.status===200 && res.data){
            this.$message.success('已公布最终评审结果');
            location.reload();
          }
          else{
            this.$message.error('复审还未完成');
          }
        }).catch(error =>{
          this.$message.error('请求出错');
        })
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

