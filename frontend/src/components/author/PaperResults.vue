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
            <p style="padding:20px;float: left;font-size: 1.2em">稿件评审结果</p>
            <template>
              <el-table :data="tableData" stripe style="width: 95%;margin: auto" max-height="600">
                <el-table-column prop="index" v-model="tableData" label="评价序号"></el-table-column>
                <el-table-column prop="score" label="对稿件的评分"></el-table-column>
                <el-table-column prop="confidence" label="稿件可信度"></el-table-column>
                <el-table-column prop="comment" label="对稿件的评论"></el-table-column>
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
  import SideNav from '../common/ResultSide';
  export default {
    name: "PaperResults",
    components:{
      NavMenu,
      SideNav
    },
    data(){
      return{
        tableData:[],
      }
    },
    created(){
      this.$axios.get('./meeting/papers/results',{
        params:{
          id:this.$route.query.id,
          paperId:this.$route.query.paperId,
        }
      }).then(res =>{
        if(res.data===''){
          this.$message('会议主席还未公布评审结果，请耐心等待');
          //this.tableData = res.data;
        }
        else{
         var length = res.data.comments.length;
         for(var i=0;i<length;i++){
           this.tableData.push({
             index:'No.'+[i+1],
             confidence:res.data.confidences[i],
             score:res.data.scores[i],
             comment:res.data.comments[i]
           })
         }
        }
      })
    }
  }
</script>

