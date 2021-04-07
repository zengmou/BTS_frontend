<template>
  <div>
    <admin-nav></admin-nav>
    <router-view/>
    <div>
      <el-row>
        <el-col :span="3">
          <side-nav></side-nav>
        </el-col>
        <el-col :span="21">
          <p style="padding:20px 40px;float: left;font-size: 1.2em">待审批的会议申请</p>
          <template>
            <el-table :data="tableData" stripe style="width: 95%;margin: 40px 70px;" max-height="600">
              <el-table-column prop="id" v-model="tableData" label="会议id" width="220px"></el-table-column>
              <el-table-column prop="fullName" label="会议全称" width="220px"></el-table-column>
              <el-table-column prop="chairName" label="主席姓名" width="220px"></el-table-column>
              <el-table-column prop="place" label="举办地点" width="220px"></el-table-column>
              <el-table-column prop="holdTime" label="举办时间" width="220px"></el-table-column>
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
                    <el-form-item label="主席id:">
                      <span>{{ props.row.chairId }}</span>
                    </el-form-item>
                    <el-form-item label="举办地点:">
                      <span>{{ props.row.holdTime }}</span>
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
                    <el-form-item label="操作:">
                      <el-button @click="accept(props.row.id,props.row.chairId)" type="text" size="small">审核通过</el-button>
                      <el-button @click="refuse(props.row.id,props.row.chairId)" type="text" size="small">审核不通过</el-button>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import AdminNav from "../common/AdminNav";
  import SideNav from "../common/AdminSide";
  export default {
    name: "Audit",
    components:{
      AdminNav,
      SideNav
    },
    data(){
      return{
        tableData: [],
        approvalStatus:'',
        chairId:[],
      }
    },
    created(){
      this.$axios.get('./admin/audit').then((res)=>{
        this.tableData=res.data.meeting;
        console.log(res.data.meeting);
        var length = this.tableData.length;
        for(var i=0;i<length;i++){
          this.tableData[i].chairName = res.data.chair[i].name;
          this.chairId.push(res.data.meeting[i].chairId);
        }
      })
    },
    methods:{
      accept(id,chairId){
        this.$axios.post('./admin/audit',{
          id:id,
          approvalStatus:2,
          chairId:chairId
        }).then((res)=>{
          if(res.status===200 && res.data){
            this.$router.replace('/admin/audit');
            // location.reload();
            // this.$router.go(0);
            this.$message.success('已通过会议'+id+'举办的申请');
          }
          else{
            this.$message.error('出现错误')
          }
        })
      },
      refuse(id,chairId){
        this.$axios.post('./admin/audit',{
          id:id,
          approvalStatus:1,
          chairId:chairId
        }).then((res)=>{
          if(res.status===200 && res.data){
            this.$message.success('已拒绝会议'+id+'举办的申请');
            // alert(this.tableData[row].id);
            location.reload();
            this.$router.go(100);
          }
          else{
            this.$message.error('出现错误')
          }
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
