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
            <el-col :span="12">
              <div style="margin: 30px 40px">
                <p style="padding:10px;float: left;font-size: 1.2em">稿件详细信息</p>
                <template>
                  <el-table :data="tableData" stripe style="width: 90%;margin: auto" max-height="600">
                    <el-table-column prop="id" v-model="tableData" label="稿件id" width="150"></el-table-column>
                    <el-table-column prop="paperName" label="稿件标题"></el-table-column>
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form label-position="left" inline id="demo-table-expand">
                          <el-form-item>
                            <label>稿件id：</label>
                            <span>{{ props.row.id }}</span>
                          </el-form-item>
                          <el-form-item>
                            <label>稿件标题：</label>
                            <span>{{ props.row.paperName }}</span>
                          </el-form-item>
                          <el-form-item>
                            <label>稿件简介：</label>
                            <span>{{ props.row.introduction }}</span>
                          </el-form-item>
                          <el-form-item>
                            <label>稿件主题：</label>
                            <span>{{ props.row.topics }}</span>
                          </el-form-item>
                          <el-form-item>
                            <label>稿件文件：</label>
                            <el-button @click="download(props.row.id)" type="text" size="small">预览并下载稿件</el-button>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="margin: 30px 40px">
                <p style="margin:70px auto 50px -400px;font-size: 1.2em;">稿件评审提交</p>
                <template>
                  <el-form :ref="markForm" :model="markForm" :rules="rules" class="mark_container" label-position="left" v-loading="loading">
                    <el-form-item  prop="score" label-width="100px" label="稿件评分" style="margin: 30px auto;width: 90%">
                      <el-slider
                        v-model="markForm.score"
                        :max="2"
                        :min="-2"
                        show-input>
                      </el-slider>
                    </el-form-item>
                    <el-form-item  prop="comment" label-width="100px" label="稿件评语" style="margin: 30px auto;width: 90%">
                      <el-input type="textarea" :rows="3" v-model="markForm.comment" auto-complete="off" placeholder="请输入稿件评语" maxlength="800" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item  prop="confidence" label-width="100px" label="论文可信度" style="margin: 30px auto;width: 90%">
                      <el-select value="confidence" v-model="markForm.confidence" placeholder="请选择" style="float: left">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item style="width: 100%;margin:30px auto">
                      <el-button type="primary" style="width: 80%;border: none;" v-on:click="mark(markForm)">提交评论</el-button>
                    </el-form-item>
                  </el-form>
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
  import NavMenu from '../common/NavMenu'
  import SideNav from '../common/RemarkSide';
  export default {
    name: "Remark",
    components:{
      NavMenu,
      SideNav
    },
    data(){
      const dataValidScore = (rule,value,callback) =>{
        if(value===0){
          return callback(new Error('评分不能为0'))
        }
      };
      return{
        pdfUrl:'',
        markForm:{
          score: '' ,
          comment:'',
          confidence:''
        },
        tableData:[],
        options: [{
          value: '0',
          label: '糟糕'
        }, {
          value: '1',
          label: '较低'
        }, {
          value: '2',
          label: '较高'
        }, {
          value: '3',
          label: '优秀'
        }],
        rules:{
          comment: [{required: true, message: '请填写评语', trigger: 'blur'}],
          confidence: [{required: true, message: '请选择论文可信度', trigger: 'blur'}],
          score: [{required: true, message: '请填写分数', trigger: 'blur'}, {validator: dataValidScore, trigger: 'blur'}],
        },
        loading:false
      }
    },
    created(){
      this.$axios.get('./meeting/review/remark',{
        params:{
          paperId:this.$route.query.paperId,
        }
      }).then(res =>{
        this.tableData.push(res.data.paper);
        var length = res.data.paperTopics.length;
        this.tableData[0].topics = res.data.paperTopics[0];
        for(var i=1;i<length;i++){
          this.tableData[0].topics += ','+res.data.paperTopics[i];
        }
        console.log(res.data);
        this.markForm = res.data.opinion;
      })
    },
    methods:{
      download(id){
        console.log(id);
        this.$axios.get('./paper/preview',{
          params:{
            paperId:id,
          },
          responseType:'blob'
        }).then(res => {
          if(res.status===200 && res.data!==''){
            var binaryData = [];
            var url ="";
            binaryData.push(res.data);
            url = window.URL.createObjectURL(new Blob(binaryData,{type:"application/pdf"}));
            window.open('/static/pdf/web/viewer.html?file='+encodeURIComponent(url));
            console.log(res.data);
          }
          else{
            this.$message.error('文件获取失败');
          }
        }).catch(error =>{
          console.log(error);
          this.$message.error('文件请求出错');
        })
      },
      mark(formName){
        // this.$refs[formName].validate(valid =>{
        //   console.log(valid);
        //   if(valid){
        if(this.markForm.score===0){
          this.$message.error('评分不能为0');
        }
        else if(this.markForm.comment===''){
          this.$message.error('请填写评价');
        }
        else if(this.markForm.confidence===''){
          this.$message.error('请选择论文可信度');
        }
        else{
          this.$axios.post('./meeting/review/remark',{
            paperId:this.$route.query.paperId,
            //会议id
            id:this.$route.query.id,
            confidence:this.markForm.confidence,
            score:this.markForm.score,
            comment:this.markForm.comment
          }).then(res =>{
            if(res.status===200 && res.data===true){
              this.$message.success('成功提交评价');
              this.$router.replace('/meeting/review?id='+this.$route.query.id);
            }
            else{
              this.$message.error('未参与讨论，不能修改初审结果');
            }
          }).catch(error =>{
            this.$message.error('请求出错');
          })
        }
      }
    }
  }
</script>
