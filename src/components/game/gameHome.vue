<template>
  <div class="gameCenter">
    <div class="headerGuide">
      <h1 class="leftHead">游戏交易主界面</h1>
      <el-page-header @back="goBack" content="Welcome" class="rightHead"></el-page-header>
    </div>
    <div class="main">
      <keep-alive>
        <marketGraph></marketGraph>
      </keep-alive>
    </div>
    <div class="footer">
      <div class="tipsMain">
        <h2>提示信息</h2>
        <el-button class="clearLog" type="primary" @click="clearlog">清空</el-button><br/>
        <div class="tipsContent">
          <span
            style="display: block"
            v-for="log in logs"
            v-text="log.time + log.content">
          </span>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import marketGraph from './marketGraph';
  export default {
    name: "gameCenter",
    data(){
      return {
          logs: this.$store.getters.checkGameLog(),
      }
    },
    watch: {
    },
    methods: {
        goBack: function () {
            this.$router.push('/');
        },
        curTime () {
            var date = new Date();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            return (hour < 10 ? '0' + hour : hour) + ":" + (min < 10 ? '0' + min : min) + ":" + (sec < 10 ? '0' + sec : sec)  + " ";
        },
        clearlog: function () {
            var msg = "确定要清除掉所有提示日志吗？";
            this.$confirm(msg,'提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.commit('clearGameLog');
                this.$message({
                    type: 'success',
                    message: '你已经成功清除掉提示日志'
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    components: {
      marketGraph
    },
    created() {
      this.$store.commit('setGameLog',{
        time:this.curTime(),
        content: "欢迎来到期货交易游戏"
      });
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .headerGuide{
    overflow: hidden;
    margin-bottom: 20px;
    padding: 15px;
    background: aliceblue;
  }
  .leftHead{
    float: left;
  }
  .rightHead{
    float:right;
    margin-top: 10px;
    margin-right: 10px;
  }
  .footer{
    height: 300px;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;
    background: slategray;
  }
  .tipsMain{
    width: 48%;
    height: inherit;
    border-radius: 10px;
    float: left;
    background: goldenrod;
  }
  .tipsContent{
    width: 95%;
    height: 80%;
    border: 1px solid black;
    border-radius: 10px;
    text-align: left;
    overflow: scroll;
    margin: auto;
  }
  .clearLog{
    float: right;

  }
  .clientInfo{
    width: 48%;
    height: inherit;
    border-radius: 10px;
    float: right;
    background: dodgerblue;
    color: aliceblue;
  }
  .usrMainPage{
    width: 48%;
    height: inherit;
    float: right;
    border-radius: 10px;
    border: 1px solid black;
    background: dodgerblue;
    overflow: scroll;
  }
  .usrOperPage{
    width: 48%;
    height: inherit;
    border-radius: 10px;
    float: right;
    overflow: scroll;
    background: aliceblue;
  }
</style>
