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
          <div style="margin: 0 50px">
            <p style="padding:20px;float: left;font-size: 1.2em">我的稿件</p>
            <template>
              <el-table :data="tableData" stripe style="width: 95%;margin: auto" max-height="600">
                <el-table-column prop="id" v-model="tableData" label="稿件id"></el-table-column>
                <el-table-column prop="paperName" label="稿件标题"></el-table-column>
                <el-table-column prop="topicsOfThePaper" label="稿件主题"></el-table-column>
                <el-table-column prop="reviewStatus" label="稿件状态"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="toRevise(scope.$index)" type="text" size="small" v-if="tableData[scope.$index].reviewStatus==='待会议开启审稿'">修改投稿内容</el-button>
                    <el-button type="text" size="small" v-if="tableData[scope.$index].reviewStatus==='正在进行初审中'||tableData[scope.$index].reviewStatus==='正在进行复审中'||tableData[scope.$index].reviewStatus==='稿件已放弃复审'" disabled>暂无可进行操作</el-button>
                    <el-button @click="toRebuttal(scope.$index)" type="text" size="small" v-if="tableData[scope.$index].reviewStatus==='稿件初审未录取'">查看初审结果</el-button>
                    <el-button @click="toResult(scope.$index)" type="text" size="small" v-if="tableData[scope.$index].reviewStatus==='稿件初审已录取'">查看初审结果</el-button>
                    <el-button @click="toResult(scope.$index)" type="text" size="small" v-if="tableData[scope.$index].reviewStatus==='稿件复审已录取'">查看复审结果</el-button>
                    <el-button @click="toResult(scope.$index)" type="text" size="small" v-if="tableData[scope.$index].reviewStatus==='稿件复审未录取'">查看复审结果</el-button>
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
  import SideNav from "../common/PaperSide";
  export default {
    name: "MyPapers",
    components: {
      SideNav,
      NavMenu
    },
    data(){
      return{
        tableData:[]
      }
    },
    created(){
      this.$axios.get("./meeting/papers",{
        params:{
          id: this.$route.query.id,
        }
      }).then(res =>{
        this.tableData = res.data.papers;
        var length = this.tableData.length;
        for(var i=0;i<length;i++){
          if(this.tableData[i].reviewStatus===0){
            this.tableData[i].reviewStatus='待会议开启审稿';
          }
          else if(this.tableData[i].reviewStatus===1){
            this.tableData[i].reviewStatus='正在进行初审中';
          }
          else if(this.tableData[i].reviewStatus===2 && res.data.papers[i].isAccept===1){
            this.tableData[i].reviewStatus='稿件初审已录取';
          }
          else if(this.tableData[i].reviewStatus===2 && res.data.papers[i].isAccept===0){
            this.tableData[i].reviewStatus='稿件初审未录取';
          }
          else if(this.tableData[i].reviewStatus===2 && res.data.papers[i].isAccept===-1){
            this.tableData[i].reviewStatus='稿件已放弃复审';
          }
          else if(this.tableData[i].reviewStatus===3){
            this.tableData[i].reviewStatus='正在进行复审中';
          }
          else if(this.tableData[i].reviewStatus===4 && res.data.papers[i].isAccept===1){
            this.tableData[i].reviewStatus='稿件复审已录取';
          }
          else if(this.tableData[i].reviewStatus===4 && res.data.papers[i].isAccept===-1){
            this.tableData[i].reviewStatus='稿件复审未录取';
          }
          var l = res.data.topics[i].length;
          this.tableData[i].topicsOfThePaper=res.data.topics[i][0];
          for(var j=1;j<l;j++){
            this.tableData[i].topicsOfThePaper+=','+res.data.topics[i][j];
          }

        }
      })
    },
    methods:{
      toRevise(row){
        this.$axios.get('./meeting/papers/revise',{
          params:{
            paperId:this.tableData[row].id
          }
        }).then(res =>{
          if(res.data===''){
            this.$message('已进入审稿状态，无法修改稿件');
          }
          else{
            this.$router.replace('/meeting/papers/revise?paperId='+this.tableData[row].id+'&id='+this.$route.query.id);
          }
        }).catch(error =>{
          this.$message.error('未查询到相应稿件');
        })
      },
      toResult(row){
        this.$axios.get('./meeting/papers/results',{
          params:{
            id:this.$route.query.id,
            paperId:this.tableData[row].id
          }
        }).then(res =>{
          if(res.data===''){
            this.$message('会议主席还未公布审核结果，请耐心等待');
          }
          else{
            this.$router.replace('/meeting/papers/results?paperId='+this.tableData[row].id+'&id='+this.$route.query.id);
          }
        }).catch(error =>{
          this.$message.error('未查询到相应稿件');
        })       
      },
      toRebuttal(row){
        this.$router.replace('/meeting/papers/rebuttal?paperId='+this.tableData[row].id+'&id='+this.$route.query.id);
      }
    }
  }
</script>
