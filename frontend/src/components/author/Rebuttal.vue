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
            <div style="margin: 0 50px">
              <p style="padding:20px;float: left;font-size: 1.2em">稿件初次评审结果</p>
              <template>
                <el-table :data="tableData" stripe style="width: 90%;margin: 20px auto" max-height="600">
                  <el-table-column prop="index" v-model="tableData" label="评价序号"></el-table-column>
                  <el-table-column prop="score" label="对稿件的评分"></el-table-column>
                  <el-table-column prop="confidence" label="稿件可信度"></el-table-column>
                  <el-table-column prop="comment" label="对稿件的评论"></el-table-column>
                </el-table>
              </template>
            </div>
          </el-row>
          <el-divider content-position="left">请选择是否对初审结果进行申辩</el-divider>
          <el-row>
            <el-form ref="replyForm" :model="rebuttalForm" v-loading="loading" style="margin: 20px auto">
              <el-form-item prop="rebuttal">
                <el-input
                  type="textarea"
                  placeholder="请输入评论"
                  v-model="rebuttalForm.rebuttal"
                  maxlength="500"
                  style="width: 90%"
                  :rows="5"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-on:click="rebuttal()">提交申辩内容</el-button>
                <el-button v-on:click="quit()"> 放弃稿件录取</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import NavMenu from '../common/NavMenu'
  import SideNav from '../common/RebuttalSide';
  export default {
    name: "Rebuttal",
    components:{
      NavMenu,
      SideNav
    },
    data(){
      return{
        tableData:[],
        rebuttalForm:{
          rebuttal:''
        }
      }
    },
    created(){
      this.$axios.get('./meeting/papers/rebuttal',{
        params:{
          paperId:this.$route.query.paperId,
          id:this.$route.query.id
        }
      }).then(res =>{
        var length = res.data.comments.length;
        for(var i=0;i<length;i++){
           this.tableData.push({
             index:'No.'+[i+1],
             confidence:res.data.confidences[i],
             score:res.data.scores[i],
             comment:res.data.comments[i]
           })
        }
        
      })
    },
    methods:{
      rebuttal(){
        if(this.rebuttalForm.rebuttal!==''){
          //console.log(this.rebuttalForm.rebuttal);
          this.$axios.post('./meeting/papers/rebuttal',{
            paperId:this.$route.query.paperId,
            //id:this.$route.query.id,
            text:this.rebuttalForm.rebuttal,
            replyIndex:0
          }).then(res =>{
            if(res.status===200 && res.data){
              this.$message.success('已成功提交申辩');
              this.$router.replace('/meeting/papers?id='+this.$route.query.id);
            }
            else{
              this.$message.error('提交申辩失败');
            }
          }).catch(error =>{
            this.$message.error('提交申辩请求失败');
          })
        }
        else{
          this.$message.error('申辩内容不能为空');
        }      
      },

      quit() {
        this.$confirm("您将放弃稿件录取, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$axios.post('./meeting/papers/rebuttal',{
            paperId:this.$route.query.paperId,
            //id:this.$route.query.id,
            text:'',
            replyIndex:0
          }).then(res =>{
            if(res.status===200 && res.data){
              this.$router.replace('/meeting/papers?id='+this.$route.query.id);
              this.$message.success("已放弃稿件录取")
            }
            else{
              this.$message.error('操作失败');
            }
          }).catch(error =>{
            this.$message.error('请求出错')
          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
      },
    }
  }
</script>
