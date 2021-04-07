<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
    <div>
      <el-row>
        <el-col :span="3">
          <template v-if="authority==='chair'">
            <chair-side></chair-side>
          </template>
          <template v-else>
            <PCSide></PCSide>
          </template>
        </el-col>
        <el-col :span="21">
          <div style="margin-left: 50px">
            <p style="padding:10px;float: left;font-size: 1.2em">所有待处理稿件</p>
            <template>
              <el-table :data="tableDataReview" stripe style="width: 95%;margin:10px" max-height="600">
                <el-table-column prop="id" v-model="tableDataReview" label="稿件id"></el-table-column>
                <el-table-column prop="paperName" label="稿件标题"></el-table-column>
                <el-table-column prop="topicsOfThePaper" label="稿件主题"></el-table-column>
                <el-table-column prop="reviewStatus" label="稿件状态"></el-table-column>
                <el-table-column prop="pcMembersReviewStatus" label="审稿状态"></el-table-column>
                <el-table-column label="讨论">
                  <template slot-scope="scope">
                    <el-button @click="openDialog(scope.$index)" type="text" size="small" v-if="tableDataReview[scope.$index].pcMembersReviewStatus==='待确认初审结果'||tableDataReview[scope.$index].pcMembersReviewStatus==='待确认复审结果'">进入讨论帖</el-button>
                    <el-button type="text" size="small" v-if="tableDataReview[scope.$index].pcMembersReviewStatus!=='待确认初审结果'&&tableDataReview[scope.$index].pcMembersReviewStatus!=='待确认复审结果'" disabled>暂无可进行操作</el-button>
                    <el-dialog
                      title="提示"
                      :visible.sync="dialogVisible"
                      width="30%">
                      <span>你将进入关于该稿件评审的讨论帖</span>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="toDiscuss()">确 定</el-button>
                      </span>
                    </el-dialog>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="toMark(scope.$index)" type="text" size="small" v-if="tableDataReview[scope.$index].pcMembersReviewStatus==='待提交初审结果'">进行初次审稿工作</el-button>
                    <el-button @click="revise1(scope.$index)" type="text" size="small" v-if="tableDataReview[scope.$index].pcMembersReviewStatus==='待确认初审结果'">修改初审结果</el-button>
                    <el-button @click="confirm1(scope.$index)" type="text" size="small" v-if="tableDataReview[scope.$index].pcMembersReviewStatus==='待确认初审结果'">确认不修改</el-button>
                    <el-button @click="revise2(scope.$index)" type="text" size="small" v-if="tableDataReview[scope.$index].pcMembersReviewStatus==='待确认复审结果'">修改复审结果</el-button>
                    <el-button @click="confirm2(scope.$index)" type="text" size="small" v-if="tableDataReview[scope.$index].pcMembersReviewStatus==='待确认复审结果'">确认不修改</el-button>
                    <el-button type="text" size="small" v-if="tableDataReview[scope.$index].pcMembersReviewStatus==='已确认初审结果'||tableDataReview[scope.$index].pcMembersReviewStatus==='等待作者提交申辩'||tableDataReview[scope.$index].pcMembersReviewStatus==='已确认复审结果'" disabled>暂无可进行操作</el-button>
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
  import PCSide from '../common/PCSide';
  import ChairSide from '../common/ChairSide'
  export default {
    name: "Review",
    components:{
      NavMenu,
      PCSide,
      ChairSide
    },
    data(){
      return{
        authority:window.localStorage.getItem('authority'),
        dialogVisible: false,
        selectedRow:'',
        temp:[],
        userId:'',
        tableDataReview:[],
        //tableDataReviewing:[]
      }
    },
    created(){

      // 稿件不分类了，直接放到一个表里

      this.$axios.get('./meeting/review',{
        params:{
          id:this.$route.query.id,
        }
      }).then(res =>{
        console.log(res.data);
        var length = res.data.reviewing.papers.length;
        for(let i=0;i<length;i++){
          this.tableDataReview.push(res.data.reviewing.papers[i]);
          this.tableDataReview[i].topicsOfThePaper = res.data.reviewing.paperTopics[i][0];
          this.tableDataReview[i].pcMembersReviewStatus=res.data.reviewing.pcMembersReviewStatus[i];
          var length_topic = res.data.reviewing.paperTopics[i].length;
          for(var j=1;j<length_topic;j++){
            this.tableDataReview[i].topicsOfThePaper += ','+res.data.reviewing.paperTopics[i][j];
          }
          //稿件状态
          if(this.tableDataReview[i].reviewStatus===1){
            this.tableDataReview[i].reviewStatus='正在进行初审中';
          }
          else if(this.tableDataReview[i].reviewStatus===2 && res.data.reviewing.papers[i].isAccept===1){
            this.tableDataReview[i].reviewStatus='稿件初审已录取';
          }
          else if(this.tableDataReview[i].reviewStatus===2 && res.data.reviewing.papers[i].isAccept===0){
            this.tableDataReview[i].reviewStatus='稿件初审未录取';
          }
          else if(this.tableDataReview[i].reviewStatus===2 && res.data.reviewing.papers[i].isAccept===-1){
            this.tableDataReview[i].reviewStatus='稿件已放弃复审';
          }
          else if(this.tableDataReview[i].reviewStatus===3){
            this.tableDataReview[i].reviewStatus='正在进行复审中';
          }
          else if(this.tableDataReview[i].reviewStatus===4 && res.data.reviewing.papers[i].isAccept===-1){
            this.tableDataReview[i].reviewStatus='稿件复审未录取';
          }
          else if(this.tableDataReview[i].reviewStatus===4 && res.data.reviewing.papers[i].isAccept===1){
            this.tableDataReview[i].reviewStatus='稿件复审已录取';
          }

          //pc处理状态
          if(this.tableDataReview[i].pcMembersReviewStatus===1){
            this.tableDataReview[i].pcMembersReviewStatus='待提交初审结果';
          }
          else if(this.tableDataReview[i].pcMembersReviewStatus===2){
            this.tableDataReview[i].pcMembersReviewStatus='待确认初审结果';
          }
          else if(this.tableDataReview[i].pcMembersReviewStatus===3){
            this.tableDataReview[i].pcMembersReviewStatus='已确认初审结果';
          }
          else if(this.tableDataReview[i].pcMembersReviewStatus===4){
            this.tableDataReview[i].pcMembersReviewStatus='等待作者提交申辩';
          }
          else if(this.tableDataReview[i].pcMembersReviewStatus===5){
            this.tableDataReview[i].pcMembersReviewStatus='待确认复审结果';
          }
          else if(this.tableDataReview[i].pcMembersReviewStatus===6){
            this.tableDataReview[i].pcMembersReviewStatus='已确认复审结果';
          }
        }
      })
    },
    methods:{
      toMark(row){
        this.$router.replace('/meeting/review/mark?paperId='+this.tableDataReview[row].id+'&id='+this.$route.query.id);
      },
      revise1(row){
        this.$router.replace('/meeting/review/remark?paperId='+this.tableDataReview[row].id+'&id='+this.$route.query.id);
      },
      confirm1(row){
        this.$axios.post('./meeting/review/remark',{
          paperId:this.tableDataReview[row].id,
          //会议id
          id:this.$route.query.id,
          confidence:0,
          score:0,
          comment:0
        }).then(res =>{
          if(res.status===200 && res.data){
            this.$message.success('已确认不修改初审结果');
            location.reload();
          }
          else{
            this.$message.error('未参与讨论，无法确认不修改初审结果');           
          }
        }).catch(error =>{
          this.$message.error('请求出错');
        })
      },
      revise2(row){
        this.$router.replace('/meeting/review/rebuttal?paperId='+this.tableDataReview[row].id+'&id='+this.$route.query.id);
      },
      confirm2(row){
        this.$axios.post('./meeting/review/rebuttal',{
          paperId:this.tableDataReview[row].id,
          //会议id
          id:this.$route.query.id,
          confidence:0,
          score:0,
          comment:0
        }).then(res =>{
          if(res.status===200 && res.data){
            this.$message.success('已确认不修改复审结果');
            location.reload();
          }
          else{
            this.$message.error('未参与讨论，无法确认不修改复审结果');           
          }
        }).catch(error =>{
          this.$message.error('请求出错');
        })
      },
      openDialog(row){
        this.selectedRow = row;
        this.dialogVisible = true;
      },
      toDiscuss(row){
        this.$router.replace('/meeting/review/discuss?paperId='+this.tableDataReview[this.selectedRow].id);
      }
    }
  }
</script>
