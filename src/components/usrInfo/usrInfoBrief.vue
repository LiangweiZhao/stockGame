<template>
  <div class="clientInfo">
    <h2>用户信息</h2><br/>
    <label for="bought">期货交易:</label>
    <el-button id="bought" icon="el-icon-search" circle @click="showUsrInfo"></el-button><br/>
    <label for="usrFund">用户资金：</label>
    <span id="usrFund">{{usr.remainMoney}}元</span><br/>
    <label for="benefits">盈亏总数：</label>
    <span id="benefits">0元</span><br/>
    <label for="deposit">已购保证金：</label>
    <span id="deposit">{{usr.deposit}}元</span>
  </div>
</template>

<script>
    export default {
        name: "usrInfoBrief",
        data() {
            return {
                usr: {
                    remainMoney: this.$store.getters.checkRemainMoney(),
                    deposit: this.$store.getters.checkDeposit()
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
