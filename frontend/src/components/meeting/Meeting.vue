<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" style="margin: 10px;">
            <img src="../../assets/meeting/chair.jpg" class="image" alt="chair" style="width: 100%">
            <div style="padding: 14px;">
              <span>成为会议主席？来申请开设一场会议吧！</span>
              <div class="bottom clearfix">
                <router-link to="../apply"><el-button type="text" class="button">前往会议申请页面</el-button></router-link>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" style="margin: 10px;">
            <img src="../../assets/meeting/processing.jpg" class="image" alt="processing" style="width: 100%;">
            <div style="padding: 14px;">
              <span>申请的会议是否审核通过？来查看详情吧！</span>
              <div class="bottom clearfix">
                <router-link to="../meeting/application"><el-button type="text" class="button">查看我的申请状态</el-button></router-link>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" style="margin: 10px;">
            <img src="../../assets/meeting/discussing.jpg" class="image" alt="discussing" style="width: 100%;">
            <div style="padding: 14px;">
              <span>查看会议详情？先选择会议和身份吧！</span>
              <div class="bottom clearfix">
                <router-link to="../meeting/joining"><el-button type="text" class="button">前往我参与的会议</el-button></router-link>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" style="margin: 10px;">
            <img src="../../assets/meeting/submit.jpg" class="image" alt="submit" style="width: 100%;">
            <div style="padding: 14px;">
              <span>想为未参与会议投稿？先来选择会议吧！</span>
              <div class="bottom clearfix">
                <router-link to="../meeting/submitting"><el-button type="text" class="button">查看可投稿会议</el-button></router-link>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
  import NavMenu from '../common/NavMenu'
  export default {
    name: 'Meeting',
    components: {NavMenu},
    created(){
    this.$axios.post('/meeting').then(res=>{
      if(res.status!==200){
        this.$router.replace({path:"/login"});
      }
    })
  },
  }
</script>
