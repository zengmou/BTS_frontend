<template>
    <div class="modal-bg" v-show="show">
        <div class="modal-container">
            <div class="modal-header">
                请选择稿件分配方案
            </div>
            <div class="modal-main">
                <slot>
                    <el-radio v-model="radio" label="1">方式一（相关度）</el-radio>
                    <el-radio v-model="radio" label="2">方式二（平均负担）</el-radio>
                </slot>
            </div>
            <div class="modal-footer">
                <el-button round @click="close">取消</el-button>
                <el-button type="primary" round @click="submit">确认</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageBox',
    data () {
      return {
        radio: '1',
        method:'',
      };
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        // title: {
        //     type: String,
        //     default: ''
        // },
    },
   
    methods: {
        close() {
            this.show = false;
            this.$message('已取消操作');
            // location.reload();
            // this.$router.go(100);
        },
        submit() {
            this.method = this.radio;
            this.$axios.get('./meeting/chair/review',{
                params:{
                    id:localStorage.getItem('meetingId'),
                    method:this.method
                }
            }).then(res =>{
                console.log(res);
                if(res.status===200 && res.data===true){
                    this.$message.success('已开启审稿');
                    location.reload();
                    //this.$router.go(100);
                }
                else{
                    this.$message.error('会议pcmember不满3人');    
                }
            }).catch(error =>{
                this.$message.error('请求出错');
            });
            this.show = false;
        },
    }
}
</script>

<style scoped>
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 10;
}
.modal-container {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.modal-header {
    height: 56px;
    background: #409EFF;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
}
.modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 57px;
    border-top: 1px solid #ddd;
}
.modal-footer button {
    width: 100px;
}
.modal-main {
    padding: 15px 40px;
}
</style>
