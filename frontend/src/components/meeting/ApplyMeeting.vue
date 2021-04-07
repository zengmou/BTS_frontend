<template>
  <el-row>
    <el-col :span="8">
      <img src="../../assets/background/blue.jpg" alt="blue" id="apply_img">
    </el-col>
    <el-col :span="16">
      <div>
        <el-form :model="applyForm" :rules="rules" class="apply_container" label-position="left"  v-loading="loading" :ref="applyForm">
          <p class="apply_title">会议开设申请</p>
          <el-form-item prop="shortName" label-width="130px" label="会议简称">
            <el-input type="text" v-model="applyForm.shortName" auto-complete="off" placeholder="请输入会议简称"></el-input>
          </el-form-item>
          <el-form-item prop="fullName" label-width="130px" label="会议全称">
            <el-input type="text" v-model="applyForm.fullName" auto-complete="off" placeholder="请输入会议全称"></el-input>
          </el-form-item>
          <el-form-item prop="place" label-width="130px" label="会议举办地点">
            <el-input type="text" v-model="applyForm.place" auto-complete="off" placeholder="请输入举办地点"></el-input>
          </el-form-item>
          <el-form-item prop="holdTime" label-width="130px" label ="会议举办日期">
            <el-tooltip class="item" effect="dark" content="会议举办日期必须在截稿日期和评审结果发布日期之后" placement="right">
              <el-date-picker v-model="applyForm.holdTime" type="date" placeholder="选择会议举办日期" style="width: 100%"></el-date-picker>
            </el-tooltip>
          </el-form-item>
          <el-form-item prop="deadline" label-width="130px" label="投稿截止日期">
            <el-tooltip class="item" effect="dark" content="会议截稿日期必须在评审结果发布日期之前" placement="right">
              <el-date-picker v-model="applyForm.deadline" type="date" placeholder="选择会议投稿截止日期" style="width: 100%"></el-date-picker>
            </el-tooltip>
          </el-form-item>
          <el-form-item prop="publishTime" label-width="130px" label="结果发布日期">
            <el-tooltip class="item" effect="dark" content="评审结果发布日期必须在截稿日期之后" placement="right">
              <el-date-picker v-model="applyForm.publishTime" type="date" placeholder="选择评审结果发布日期" style="width: 100%"></el-date-picker>
            </el-tooltip>
          </el-form-item>
          <el-form-item prop="topics" label-width="130px" label="会议主题">
            <draggable v-model="dynamicTags">
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
                >
                {{tag}}
              </el-tag>
            </draggable>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput" type="primary" plain>+ 添加主题</el-button>
          </el-form-item>
          <el-form-item style="margin-top: 35px">
            <el-button type="primary" style="width: 100%;border: none;" v-on:click="apply(applyForm)">申请会议</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import draggable from 'vuedraggable'
  export default {
    name: 'ApplyMeeting',
    components:{
      draggable
    },
    data() {     
      return {
        applyForm: {
          shortName: '',
          fullName: '',
          place:'',
          holdTime: '',
          deadline:'',
          publishTime:'',
          holdTimeString:'',
          deadlineString:'',
          publishTimeString:'',
          topics:['主题一', '主题二', '主题三']
        },
        dynamicTags: ['主题一', '主题二', '主题三'],
        inputVisible: false,
        inputValue: '',
        rules: {
          // blur 失去鼠标焦点时触发验证
          shortName: [{ required: true, message: '', trigger:'blur'}],
          fullName: [{ required: true, message: '', trigger: 'blur' }],
          holdTime: [{ required: true, message: '', trigger: 'blur' }],
          place: [{ required: true, message: '', trigger: 'blur' }],
          deadline: [{ required: true, message: '', trigger: 'blur' }],
          publishTime: [{ required: true, message: '', trigger: 'blur' }],
          topics:[{required:true,message:'',trigger:'blur'}]
        },
        loading: false
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.applyForm.topics=this.dynamicTags;
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        console.log(this.dynamicTags);
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
          this.applyForm.topics=this.dynamicTags;
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      handleListChange(event){
        this.$emit('update:dynamicTags', event)
      },
      checkTopics(){
        var array = this.dynamicTags;
        var s = array.join(",") + ",";
        for (var i = 0; i < array.length; i++) {
          if (s.replace(array[i] + ",", "").indexOf(array[i] + ",") > -1) {
              this.$message.error("有重复主题：" + array[i]);
              return false;
          }
        }
        return true;
      },
      apply (formName) {
        let year1 = this.applyForm.holdTime.getFullYear();
        let month1 = this.applyForm.holdTime.getMonth()+1;
        month1 = (month1<10?'0'+month1:month1);
        let date1 = (this.applyForm.holdTime.getDate()<10?'0'+this.applyForm.holdTime.getDate():this.applyForm.holdTime.getDate());
        this.holdTimeString = year1+month1+date1;
        console.log(this.holdTimeString);

        //console.log(this.applyForm.deadline);
        let year2 = this.applyForm.deadline.getFullYear();
        let month2 = this.applyForm.deadline.getMonth()+1;
        month2 = (month2<10?'0'+month2:month2);
        let date2 = (this.applyForm.deadline.getDate()<10?'0'+this.applyForm.deadline.getDate():this.applyForm.deadline.getDate());
        this.deadlineString = year2+month2+date2;
        console.log(this.deadlineString);

        //console.log(this.applyForm.publishTime);
        let year3 = this.applyForm.publishTime.getFullYear();
        let month3 = this.applyForm.publishTime.getMonth()+1;
        month3 = (month3<10?'0'+month3:month3);
        let date3 = (this.applyForm.publishTime.getDate()<10?'0'+this.applyForm.publishTime.getDate():this.applyForm.publishTime.getDate());
        this.publishTimeString = year3+month3+date3;
        console.log(this.publishTimeString);
        //alert(this.dynamicTags);
        //判断申请日期是否合理
        var checkDate = ((this.publishTimeString>this.deadlineString && this.holdTimeString>this.publishTimeString)?true:false);

        this.$refs[formName].validate(valid => {
          if(valid){
            if(this.checkTopics() && checkDate){
              //topics中存放会议主题数组
              this.$axios.post('./apply',{
                shortName:this.applyForm.shortName,
                fullName:this.applyForm.fullName,
                place:this.applyForm.place,
                holdTime:this.holdTimeString,
                deadline:this.deadlineString,
                publishTime:this.publishTimeString,
                topics:this.dynamicTags,
              }).then((res)=>{
                if(res.status === 200 && res.data){
                  this.$message.success('申请成功');
                  this.$router.replace('/meeting')
                }
                else{
                  this.$message.error('申请失败')
                }
              }).catch(error =>{
                console.log(error);
                this.$message.error('申请请求出错')
              })
            }
            else{
              this.$message.error('申请日期不合理')
            }
          }
          else {
            this.$message.error('格式不正确')
          }
        })
      }
    },
    created(){
      this.$axios.get('/apply').then(res=>{
        if(res.status!==200){
          this.$router.replace({path:"/login"});
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body{
    margin:0;
    padding:0;
    height: 100%;
    width: 100%;
  }
  #apply_img{
    height: 100%;
    float: left;
    background-size: cover;
    border-radius: 0 25% 25% 0/ 50%;
  }
  .apply_container {
    background-clip: padding-box;
    margin: 60px auto;
    width: 500px;
    padding: 30px auto;
  }
  .apply_title {
    margin: auto;
    text-align: center;
    color: #505458;
    font-size: 2em;
    padding-bottom: 50px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
