<template>
  <div class="gameCenter">
      <div class="headerGuide">
          <h1 class="leftHead">游戏交易主界面</h1>
          <el-page-header @back="goBack" content="Welcome" class="rightHead"></el-page-header>
      </div>
      <div class="main">
          <marketGraph></marketGraph>
      </div>
      <div class="footer">
          <div class="tips">提示信息</div>
          <div class="clientInfo">用户资金信息</div>
      </div>
  </div>
</template>

<script>
    import marketGraph from './marketGraph';
    export default {
        name: "gameCenter",
        data(){
            return {

            }
        },
        methods: {
            goBack: function () {
                this.$router.push('/');
            }
        },
        components: {
            marketGraph
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
  .tips{
      width: 48%;
      height: inherit;
      border-radius: 10px;
      float: left;
      background: goldenrod;
  }
  .clientInfo{
      width: 48%;
      height: inherit;
      border-radius: 10px;
      float: right;
      background: dodgerblue;
  }
</style>
