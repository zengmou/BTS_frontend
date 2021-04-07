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
          <p style="font-size: 1.2em;float:left;margin:30px 40px">网站工作流程</p>
          <div style="margin:100px 70px">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="1.如何进行会议审批：" name="1">
                <div style="height: 250px;">
                  <el-steps direction="vertical" :active="1">
                    <el-step title="步骤 1" description="选择进入会议审批页面"></el-step>
                    <el-step title="步骤 2" description="查看会议申请信息，决定是否批准"></el-step>
                    <el-step title="步骤 3" description="批准会议后申请人自动成为会议主席（审批结果将由通知告知用户）"></el-step>
                  </el-steps>
                </div>
              </el-collapse-item>
              <el-collapse-item title="2.其余功能正在开发中：" name="2">
                <div>
                  <span>正在建设中...</span>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import AdminNav from "../common/AdminNav";
  import SideNav from "../common/AdminSide";
  export default {
    name: "Admin",
    components:{
      AdminNav,
      SideNav
    },
    data(){
      return{
        activeName:'1'
      }
    },
    created(){
      this.$axios.post('/admin/home').then(res=>{
        if(res.status!==200){
          this.$router.replace({path:"/login"});
        }
      })
    }
  }
</script>
