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
          <div>
            <p style="margin-left:-865px;padding:10px;font-size: 1.2em">{{this.title}}</p>
            <div v-for="(item, index) in comments" :key="item.key">
              <el-card shadow="never" style="min-height: 200px">
                <el-row>
                  <el-col :span="3">
                    <div class="block" style="padding: 15px">
                      <el-avatar :size="60">User</el-avatar>
                    </div>
                    <div style="padding: 0 15px">{{comments[index].name}}</div>
                  </el-col>
                  <el-col :span="18">
                    <div v-if="comments[index].reply!==0" style="font-size: small;color: #959595;padding: 15px;margin-left: -840px">
                      回复{{comments[index].reply}}楼{{comments[comments[index].reply-1].name}}：{{comments[comments[index].reply-1].content}}
                    </div>
                    <div style="float: left;padding: 15px">{{comments[index].content}}</div>
                  </el-col>
                  <el-col :span="3">
                    <div style="margin-top: 130px">
                      <span style="font-size: small;color: #959595;padding-right: 10px">{{index+1}}楼</span>
                      <el-button type="text" @click="answer(index)" style="font-size: small">回复</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </div>
            <div>
              <el-form ref="replyForm" :model="replyForm" v-loading="loading">
                <el-form-item prop="content">
                  <label v-if="replyId!==''" style="font-size: small;color: #959595;padding: 15px;float: left">
                    回复{{replyId}}楼{{comments[replyId-1].name}}：{{comments[replyId-1].content}}
                  </label>
                  <el-input
                    type="textarea"
                    placeholder="请输入评论"
                    v-model="replyForm.content"
                    maxlength="500"
                    :rows="5"
                    show-word-limit
                  >
                  </el-input>
                </el-form-item>
                <el-form-item style="width: 15%;margin:10px 20px;float: right">
                  <el-button id="login_button" type="primary" style="width: 100%;border: none;" v-on:click="releaseComment(replyForm)">发布</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import NavMenu from '../common/NavMenu'
  import SideNav from '../common/DiscussSide';
  export default {
    name: "Discuss",
    components:{
      NavMenu,
      SideNav
    },
    data(){
      return{
        paperId:this.$route.query.paperId,
        title:'',
        replyId:'',
        textarea:'',
        username:'',
        comments:[],
        replyForm:{
          content:''
        },
        loading:false
      }
    },
    methods:{
      answer(row){
        this.replyId=row+1;
      },
      releaseComment(formName){
        if (this.replyId===''){
          this.replyId=0
        }
        this.$axios.post('./meeting/review/discuss',{
          paperId:this.$route.query.paperId,
          text:this.replyForm.content,
          replyIndex:this.replyId,
        }).then(res =>{
          this.username = res.data.senderName;
          this.comments.push({
            name:this.username,
            content:this.replyForm.content,
            reply:this.replyId
          });
          location.reload();
        }).catch(error =>{
          console.log(error);
          this.$message.error('发布讨论请求失败')
        })
      }
    },
    created(){
      this.$axios.get('./meeting/review/discuss',{
        params: {
          paperId: this.$route.query.paperId,
        }
      }).then(res =>{
        console.log(res.data);
        console.log(res.data.chatMessages.length);
        this.title = res.data.title;
        var length = res.data.chatMessages.length;
        for(var i=0;i<length;i++){
          this.comments.push({
            name:res.data.chatMessages[i].senderUsername,
            content:res.data.chatMessages[i].text,
            reply:res.data.replyIndex[i]
          })
        }
      })
    }
  }
</script>
