<template>
  <div class="clientInfo">
    <h2>用户信息</h2><br/>
    <label for="bought">期货交易:</label>
    <el-button id="bought" icon="el-icon-search" circle @click="showUsrInfo"></el-button><br/>
    <label for="usrFund">余额：</label>
    <span id="usrFund">{{remainMoney}}元</span><br/>
    <label for="benefits">当日盈亏总额：</label>
    <span id="benefits">{{benefit}}元</span><br/>
    <label for="deposit">已交保证金：</label>
    <span id="deposit">{{deposit}}元</span><br/>
  </div>
</template>

<script>
    export default {
        name: "usrInfoBrief",
        computed:{
          benefit: {
            get:function () {
              return this.$store.getters.checkBenefit();
            }
          },
          deposit: {
            get: function () {
              return this.$store.getters.checkDeposit();
            }
          },
          remainMoney:{
            get: function () {
              return this.$store.getters.checkRemainMoney();
            }
          }
        },
        methods: {
            showUsrInfo: function () {
                this.$router.push('/gameCenter/usr');
            }
        }
    }
</script>

<style scoped>

</style>
