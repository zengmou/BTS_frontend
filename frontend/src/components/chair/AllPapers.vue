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
            <p style="padding:20px;float: left;font-size: 1.2em">会议所有稿件</p>
            <template>
              <el-table :data="tableData" stripe style="width: 95%;margin: auto" max-height="600">
                <el-table-column prop="id" v-model="tableData" label="稿件id"></el-table-column>
                <el-table-column prop="paperName" label="稿件标题"></el-table-column>
                <el-table-column prop="topicsOfThePaper" label="稿件主题"></el-table-column>
                <el-table-column prop="reviewStatus" label="稿件状态"></el-table-column>
                <el-table-column label="讨论">
                  <template slot-scope="scope">
                    <el-button @click="openDialog(scope.$index)" type="text" size="small">进入讨论帖</el-button>
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
              </el-table>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import NavMenu from "../common/NavMenu";
  import SideNav from "../common/ChairSide";
  export default {
    name: "AllPapers",
    components: {
      SideNav,
      NavMenu
    },
    data(){
      return{
        dialogVisible: false,
        selectedRow:'',
        tableData:[]
      }
    },
    created(){
      this.$axios.get('./meeting/chair/papers',{
        params:{
          //会议id
          id:this.$route.query.id
        }
      }).then(res =>{
        console.log(res.data);
        this.tableData = res.data.papers;
        var length = this.tableData.length;
        for(var i=0;i<length;i++){
          if(this.tableData[i].reviewStatus===0){
            console.log(this.tableData[i].reviewStatus);
            this.tableData[i].reviewStatus='待会议开启审稿';
          }
          else if(this.tableData[i].reviewStatus===1){
            this.tableData[i].reviewStatus='正在进行初审中';
          }
          else if(this.tableData[i].reviewStatus===2 && res.data.papers[i].isAccept===1){
            this.tableData[i].reviewStatus='稿件确认已录取';
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
            this.tableData[i].reviewStatus='稿件确认已录取';
          }
          else if(this.tableData[i].reviewStatus===4 && res.data.papers[i].isAccept===-1){
            this.tableData[i].reviewStatus='稿件复审未录取';
          }
          //获取会议主题
          var l = res.data.paperTopics[i].length;
          this.tableData[i].topicsOfThePaper=res.data.paperTopics[i][0];
          for(var j=1;j<l;j++){
            this.tableData[i].topicsOfThePaper+=','+res.data.paperTopics[i][j];
          }
        }
      })
    },
    methods:{
      openDialog(row){
        this.selectedRow = row;
        this.dialogVisible = true;
      },
      toDiscuss(row){
        this.$router.replace('/meeting/review/discuss?paperId='+this.tableData[this.selectedRow].id);
      }
    }
  }
</script>
