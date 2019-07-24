<template>
    <div class="usrMainPage">
        <div class="headerGuide">
            <h2 class="leftHead">用户信息界面</h2>
            <el-page-header @back="goBack" class="rightHead"></el-page-header>
        </div>
        <div class="bodyPart">
          <span>可用资产: <b>{{usr.remainMoney}}</b></span>&nbsp;&nbsp;
          <span>保证金总数: <b>{{usr.deposit}}</b></span>
        </div>

        <div>
          <div class="bought">
            <el-tag type="danger" style="margin-top: 10px">买入期货表</el-tag>
            <el-table
              :data="usr.boughtList"
              stripe>
              <el-table-column
                type="index">
              </el-table-column>
              <el-table-column
                prop="id"
                label="期货ID">
              </el-table-column>
              <el-table-column
                prop="futureName"
                label="期货名称">
              </el-table-column>
              <el-table-column
                prop="orderPrice"
                label="购买价格">
              </el-table-column>
              <el-table-column
                prop="orderVol"
                label="购买数量">
              </el-table-column>
            </el-table>
          </div>

          <div class="sold">
            <el-tag type="success" style="margin-top: 10px">卖出期货表</el-tag>
            <el-table
              :data="usr.soldList"
              stripe>
              <el-table-column
                type="index">
              </el-table-column>
              <el-table-column
                prop="id"
                label="期货ID">
              </el-table-column>
              <el-table-column
                prop="futureName"
                label="期货名称">
              </el-table-column>
              <el-table-column
                prop="orderPrice"
                label="卖出价格">
              </el-table-column>
              <el-table-column
                prop="orderVol"
                label="卖出数量">
              </el-table-column>
            </el-table>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "usrMainPage",
        data(){
            return {
                futuresOptions: this.$store.getters.checkFuture(),
                usr: {
                    remainMoney: this.$store.getters.checkRemainMoney(),
                    deposit: this.$store.getters.checkDeposit(),
                    boughtList: [],
                    soldList: []
                },
                futures:{
                    lastPrice: []
                }
            }
        },
        methods: {
            goBack: function () {
                this.$router.push('/gameCenter');
            }
        },
        created: function () {
            this.usr.boughtList = this.$store.getters.checkBoughtList();
            this.usr.soldList = this.$store.getters.checkSoldList();
            //for
        }
    }
</script>

<style scoped>
  .headerGuide{
    overflow: hidden;
    margin-bottom: 20px;
    padding: 15px;
    background: aliceblue;
  }
  .leftHead{
    margin: 0;
    padding: 0;
    float: left;
  }
  .rightHead{
    float:right;
    margin-top: 10px;
    margin-right: 10px;
  }
  .bodyPart{
    border: 1px solid silver;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;
    background: #fafafa;
  }

  .bought{
    border: 1px solid silver;
    border-radius: 10px;
  }
  .sold{
    margin-top: 20px;
    border: 1px solid silver;
    border-radius: 10px;
  }
</style>
