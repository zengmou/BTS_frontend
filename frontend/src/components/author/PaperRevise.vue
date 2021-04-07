<template>
    <div>
      <el-row>
        <el-col :span="8">
          <img src="../../assets/background/blue.jpg" alt="blue" id="submit_img">
        </el-col>
        <el-col :span="16">
          <div>
            <el-form :ref="submitForm" :model="submitForm" :rules="rules" class="submit_container" label-position="left" v-loading="loading">
              <p class="submit_title">稿件修改</p>
              <el-form-item prop="paperName" label-width="130px" label="论文标题" required>
                <el-input type="text" v-model="submitForm.paperName" placeholder="请输入论文标题" maxlength="50" show-word-limit></el-input>
              </el-form-item>
              <el-form-item prop="info" label-width="130px" label="内容简介">
                <el-input type="textarea" :rows="3" v-model="submitForm.info" placeholder="请输入论文内容简介" maxlength="800" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label-width="130px" label="论文主题" required>
                <el-checkbox-group
                  v-model="selectedTopics"
                  :min="1">
                  <el-checkbox v-for="topic in topicOptions" :label="topic" :key="topic">{{topic}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label-width="130px" label="第1作者信息" required>
                <el-col :span="5">
                  <el-form-item prop="name1">
                    <el-input @input="changeTagName" type="text" v-model="submitForm.name1" auto-complete="off" placeholder="姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item prop="workplace1">
                    <el-input @input="changeTagWorkplace" type="text" v-model="submitForm.workplace1" auto-complete="off" placeholder="工作单位"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item prop="region1">
                    <el-input @input="changeTagRegion" type="text" v-model="submitForm.region1" auto-complete="off" placeholder="所在地区"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="email1">
                    <el-input @input="changeTagEmail" type="text" v-model="submitForm.email1" auto-complete="off" placeholder="邮箱"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item>
                    <el-button @click="addUser" type="text">新增</el-button>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <!-- 动态生成 -->
              <div class="moreRules">
                <div class="moreRulesIn" v-for="(item, index) in submitForm.moreNotifyObject" :key="item.key" >
                  <el-form-item label-width="130px" :label='"第"+[index+2]+"作者信息"' required>
                    <el-col :span="5">
                      <el-form-item :prop="'moreNotifyObject.' + index +'.name'"  :rules="[{required: true, message: '请完善信息',trigger:'blur'}]">
                        <el-input v-model="item.name" @input="changeName(item,index)" placeholder="姓名"  class="el-select_box"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item :prop="'moreNotifyObject.'+ index +'.workplace'" :rules="[{required: true, message: '请完善信息',trigger:'blur'}]">
                        <el-input v-model="item.workplace" @input="changeWorkplace(item,index)" placeholder="工作单位"  class="el-select_box"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item :prop="'moreNotifyObject.'+ index +'.region'" :rules="[{required: true, message: '请完善信息',trigger:'blur'}]">
                        <el-input v-model="item.region" @input="changeRegion(item,index)" placeholder="所在地区"  class="el-select_box"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item :prop="'moreNotifyObject.'+ index +'.email'" :rules="moreRules.email">
                        <el-input v-model="item.email" @input="changeEmail(item,index)" placeholder="邮箱"  class="el-select_box"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item>
                        <el-button @click="deleteRules(item,index)" type="text">删除</el-button>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </div>
              </div>
              <el-form-item prop="file" label-width="130px" label="上传稿件">
                <el-upload ref="upload" drag action="https://localhost" :limit="1" :multiple="false" :before-upload="beforeAvatarUpload" :auto-upload="true" v-model="submitForm.file">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击重新上传</em></div>
                  <div class="el-upload__tip" slot="tip" style="margin-top: -10px;">注：只能上传一个大小不超过2MB的pdf文件</div>
                  <div class="el-upload__tip" slot="tip" style="margin-top: -10px;">
                    旧上传文件:{{pdfUrl}}.pdf
                    <el-button @click="download()" type="text" size="small">查看稿件</el-button>
                  </div>
                  <div class="el-upload__tip" slot="tip" style="margin-top: -10px;">新上传文件:{{submitForm.file.name}}</div>
                </el-upload>
              </el-form-item>
              <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%;border: none" v-on:click="submit(submitForm)">确认修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>

</template>
<script>
  import NavMenu from '../common/NavMenu';
  import draggable from 'vuedraggable';

  import 'pdfjs-dist/build/pdf.worker';
  export default {
    name: "PaperRevise",
    components:{NavMenu,draggable},
    data(){
      //验证邮箱格式
      const dataValidEmail = (rule,value,callback) =>{
        if(value===''){
          return callback(new Error('Can\'t be empty'))
        }
        else{
            var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
            if(!reg.test(value)){
              return callback(new Error('邮箱格式不正确'))
            }
          return callback();
        }
      };
      return{
        dynamicTagsNames: [],
        dynamicTagsRegions: [],
        dynamicTagsWorkplaces: [],
        dynamicTagsEmails: [],
        //checkedTopics表示投稿主题
        checkedTopics: [],
        selectedTopics:[],
        selectedTopicsTemp:[],
        //topicOptions表示会议的topics[]
        topicOptions: [],
        pdfUrl:'',
        submitForm: {
          submitMeetingId: "",
          paperId:"",
          paperName: "",
          info: "",
          name1:"",
          workplace1:"",
          region1:"",
          email1:"",
          file: "",
          moreNotifyObject: [{
            name: '',
            region:'',
            workplace:'',
            email: ''
          }]
        },
        // addForm: {
        //   name: '',
        //   content: '',
        //   moreNotifyObject: [{
        //     name: '',
        //     region:'',
        //     workplace:'',
        //     email: ''
        //   }]
        // },
        rules: {
          paperName: [{ required: true, message: "请完善信息", trigger: "blur" }],
          info: [{ required: true, message: "请完善信息", trigger: "blur" }],
          //file: [{ required: true, message: "请完善信息", trigger: "change" }],
          name1: [{ required: true, message: "请完善信息", trigger: "blur"}],
          workplace1: [{ required: true, message: "请完善信息", trigger: "blur"}],
          region1: [{ required: true, message: "请完善信息", trigger: "blur"}],
          email1: [{ required: true, message: "请完善信息", trigger: "blur"},{validator: dataValidEmail, trigger: 'blur'}],
          //checkedTopics:[{ required: true, message: "需选择至少一个topic", trigger: "blur"}],
        },
        moreRules:{
          email:[{required: true, message: "请完善信息", trigger: "blur"},{validator: dataValidEmail, trigger: 'blur'}],
        },
        loading: false
      }
    },
    methods:{
      changeTagName(){
        this.dynamicTagsNames[0]=this.submitForm.name1;
      },
      changeTagWorkplace(){
        this.dynamicTagsWorkplaces[0]=this.submitForm.workplace1;
      },
      changeTagRegion(){
        this.dynamicTagsRegions[0]=this.submitForm.region1;
      },
      changeTagEmail(){
        this.dynamicTagsEmails[0]=this.submitForm.email1;
      },
      changeName(item,index){
        this.dynamicTagsNames[index+1] = item.name;
      },
      changeWorkplace(item,index){
        this.dynamicTagsWorkplaces[index+1] = item.workplace;
      },
      changeRegion(item,index){
        this.dynamicTagsRegions[index+1] = item.region;
      },
      changeEmail(item,index){
        this.dynamicTagsEmails[index+1] = item.email;
      },
      addUser() {
        this.dynamicTagsNames.push('');
        this.dynamicTagsRegions.push('');
        this.dynamicTagsWorkplaces.push('');
        this.dynamicTagsEmails.push('');
        this.submitForm.moreNotifyObject.push({
          region: '',
          name: '',
          workplace: '',
          email:''
        })
      },
      deleteRules(item, index) {
        this.dynamicTagsNames.splice(index+1,1);
        this.dynamicTagsWorkplaces.splice(index+1,1);
        this.dynamicTagsRegions.splice(index+1,1);
        this.dynamicTagsEmails.splice(index+1,1);
        this.index = this.submitForm.moreNotifyObject.indexOf(item);
        if (index !== -1) {
          this.submitForm.moreNotifyObject.splice(index, 1)
        }
      },
      getWriters(){
        this.writers = [];
        var length = this.dynamicTagsNames.length;
        for(var i=0;i<length;i++){
          this.writers.push({
            name:this.dynamicTagsNames[i],
            workplace:this.dynamicTagsWorkplaces[i],
            region:this.dynamicTagsRegions[i],
            email:this.dynamicTagsEmails[i],
          })
        }
      },
      download(){
        this.$axios.get('./paper/preview',{
          params:{
            paperId:this.$route.query.paperId,
          },
          responseType:'blob'
        }).then(res => {
          if(res.status===200 && res.data!==''){
            var binaryData = [];
            var url ="";
            binaryData.push(res.data);
            url = window.URL.createObjectURL(new Blob(binaryData,{type:"application/pdf"}));
            window.open('/static/pdf/web/viewer.html?file='+encodeURIComponent(url));
          }
          else{
            this.$message.error('文件获取失败');
          }
        }).catch(error =>{
          this.$message.error('文件请求出错');
        })
      },
      submit(formName) {
        this.$refs[formName].validate(valid => {
          if(valid){
            this.getWriters();
            let l = this.selectedTopics.length;
            var length = this.topicOptions.length;
            let config = null;
            let params = null;
            if(l===0){
              this.$message.error('需选择至少一个主题');
            }
            else{
              for(var i=0;i<length;i++){
                if(this.selectedTopics.indexOf(this.topicOptions[i])>-1){
                  this.checkedTopics[i]=1;
                }
                else{
                  this.checkedTopics[i]=0;
                }
              }
              let data = new FormData();
              data.append('submitMeetingId',this.$route.query.id);
              data.append('paperId', this.$route.query.paperId);
              data.append('paperName', this.submitForm.paperName);
              data.append('info', this.submitForm.info);
              data.append('writers',JSON.stringify(this.writers));
              if(this.submitForm.file===''){
                data.append('file',null)
              }
              else{
                data.append('file', this.submitForm.file);
              }
              data.append('topics', this.checkedTopics);
              params = data;
              config = {
                headers: {'Content-Type': 'multipart/form-data'}
              };
              this.$axios.post("./meeting/papers/revise", params, config)
                .then(res => {
                  if (res.status === 200 && res.data) {
                    this.$message.success("修改稿件成功！");
                    this.$router.replace("/meeting");
                  }
                  else {
                    this.$message.error("修改稿件失败")
                  }
                })
                .catch(error => {
                  this.$message.error("修改稿件请求失败");
                });
            }
          }
          else{
            this.$message.error('格式不正确');
          }
        })
      },
      beforeAvatarUpload(file) {
        const isPDF = file.type === "application/pdf";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPDF) {
          this.$message.error("上传文件必须是PDF格式!");
        } else if (!isLt2M) {
          this.$message.error("上传文件大小不能超过 2MB!");
        } else {
          this.submitForm.file = file;
          this.$message.success("已选择" + this.submitForm.file.name);
        }
      }
    },
    created(){
      this.submitForm.moreNotifyObject = [];
      this.dynamicTagsNames.push(this.submitForm.name1);
      this.$axios.get('./meeting/papers/revise',{
        params:{
          paperId:this.$route.query.paperId
          // submitMeetingId:this.$route.query.id
        }
      }).then(res=>{
        if(res.data===''){
          this.$message('该会议已处于审稿状态，不得再进行修改');
          this.$router.replace('./meeting/papers?id='+this.$route.query.id);
        }
        else{
          this.topicOptions=res.data.allTopics;
          this.selectedTopicsTemp = res.data.paperTopics;
          console.log(res.data.paperTopics);
          var length = res.data.paperTopics.length;
          for(var i=0;i<length;i++){
            if(this.selectedTopicsTemp[i]==1){
              this.selectedTopics.push(this.topicOptions[i]);
            }
          }
          this.checkedTopics = this.topicOptions;
          console.log(this.selectedTopics);
          //获取所有作者信息
          this.submitForm.moreNotifyObject = res.data.allWriters;
          length = this.submitForm.moreNotifyObject.length;
          //获得第一作者信息
          this.submitForm.name1 = this.submitForm.moreNotifyObject[0].name;
          this.submitForm.region1 = this.submitForm.moreNotifyObject[0].region;
          this.submitForm.workplace1 = this.submitForm.moreNotifyObject[0].workplace;
          this.submitForm.email1 = this.submitForm.moreNotifyObject[0].email;
          //将所有作者信息存入动态数组
          for(i=0;i<length;i++){
            this.dynamicTagsNames[i] = this.submitForm.moreNotifyObject[i].name;
            this.dynamicTagsRegions[i] = this.submitForm.moreNotifyObject[i].region;
            this.dynamicTagsWorkplaces[i] = this.submitForm.moreNotifyObject[i].workplace;
            this.dynamicTagsEmails[i] = this.submitForm.moreNotifyObject[i].email;
          }
          //可增删表格中删去第一作者
          this.submitForm.moreNotifyObject.splice(0,1);
          //获取论文其他信息
          this.submitForm.submitMeetingId = res.data.paperInfo.submitMeetingId;
          this.submitForm.paperId = res.data.paperInfo.id;
          this.submitForm.paperName = res.data.paperInfo.paperName;
          this.submitForm.info = res.data.paperInfo.introduction;
          //获取文件路径
          this.pdfUrl = res.data.paperInfo.paperFilePath;
        }
      })
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  #submit_img{
    width: 100%;
    /*height: 100%;*/
    margin-left: -100px;
    float: left;
    background-size: cover;
    border-radius: 0 25% 25% 0/ 50%;
  }
  .submit_container {
    background-clip: padding-box;
    margin: auto;
    width: 600px;
    padding: 35px 35px 15px 35px;
  }
  .submit_title {
    margin: 40px auto;
    text-align: center;
    color: #72707c;
    font-size: 2em;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>
