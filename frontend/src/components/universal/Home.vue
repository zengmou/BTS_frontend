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
          <p style="margin-top:50px;margin-left:50px;float: left;font-size: 1.2em">网站操作指南</p>
          <div style="margin: 120px 80px">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="如何申请开设会议：" name="1">
                <div style="height: 250px;">
                  <el-steps direction="vertical" :active="1">
                    <el-step title="步骤 1" description="在会议主页选择申请会议"></el-step>
                    <el-step title="步骤 2" description="填写会议详细信息并选择提交"></el-step>
                    <el-step title="步骤 3" description="待管理员审核通过后自动成为会议主席（审核是否通过会以通知告知）"></el-step>
                  </el-steps>
                </div>
              </el-collapse-item>
              <el-collapse-item title="会议主席如何开启会议投稿状态：" name="2">
                <div style="height: 250px;">
                  <el-steps direction="vertical" :active="1">
                    <el-step title="步骤 1" description="选择以会议主席身份进入该会议的主页"></el-step>
                    <el-step title="步骤 2" description="选择开启会议投稿"></el-step>
                    <el-step title="步骤 3" description="成功开启投稿后用户就可以自由向会议投稿了！"></el-step>
                  </el-steps>
                </div>
              </el-collapse-item>
              <el-collapse-item title="如何向会议投稿：" name="3">
                <el-row>
                  <el-col :span="12">
                    <div style="height: 250px;">
                      <el-steps direction="vertical" :active="1">
                        <el-step title="步骤 1" description="在会议主页选择查看当前正在投稿中的所有会议"></el-step>
                        <el-step title="步骤 2" description="选择其中一个会议就可以进入投稿页面了（不可以向自己是主席的会议投稿）"></el-step>
                        <el-step title="步骤 3" description="上传稿件后你将自动成为该会议的作者"></el-step>
                      </el-steps>
                    </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="height: 250px;">
                        <el-steps direction="vertical" :active="1">
                          <el-step title="步骤 1" description="选择以作者或审稿人身份进入该会议的主页"></el-step>
                          <el-step title="步骤 2" description="选择向会议投稿就可以进入投稿页面了"></el-step>
                          <el-step title="步骤 3" description="上传稿件后你将拥有该会议的作者身份（对审稿人而言）"></el-step>
                        </el-steps>
                      </div>
                    </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="会议主席如何邀请用户成为会议的审稿人：" name="4">
                <div style="height: 250px;">
                  <el-steps direction="vertical" :active="1">
                    <el-step title="步骤 1" description="选择以会议主席身份进入该会议的主页"></el-step>
                    <el-step title="步骤 2" description="选择邀请会议的审稿人，会进入用户搜索页面（需要根据用户姓名搜索）"></el-step>
                    <el-step title="步骤 3" description="在搜索结果中选择用户发出邀请吧"></el-step>
                    <el-step title="步骤 4" description="当用户同意邀请后自动成为会议的审稿人（邀请是否被接受会以通知告知）"></el-step>
                  </el-steps>
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
  import NavMenu from '../common/NavMenu'
  import SideNav from "../common/HomeSide";
  export default {
    name: 'Home',
    components: {SideNav, NavMenu},
    data() {
      return {
        activeName: '1'
      }
    },
    created(){
      this.$axios.post('/home').then(res=>{
        if(res.status!==200){
          this.$router.replace({path:"/login"});
        }
      })
    }
  }
</script>
