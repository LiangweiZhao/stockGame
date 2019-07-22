<template>
  <div class="mainGuide">
      <div class="headerGuide">
          <h1 class="leftHead">游戏指引交易</h1>
          <el-page-header @back="goBack" content="Welcome" class="rightHead"></el-page-header>
      </div>
      <el-container class="bodyGuide">
          <el-aside class="leftBody">
              <el-steps direction="vertical" :active="step" align-center>
                  <el-step
                      v-for="item in stepTxt"
                      :key="item.index"
                      :title="item.title"
                      :description="item.description"
                      @click.native="gotoStep(item.index)">
                  </el-step>
              </el-steps>
          </el-aside>
          <el-container class="rightBody">
              <div v-for="item in stepTxt[step].content" class="txtPart">
                  <h1 v-text="item.title"></h1>
                  <div v-for="subText in item.text">
                    <p v-text="subText"></p>
                  </div>
              </div>
          </el-container>
      </el-container>
  </div>
</template>

<script>
    export default {

      name: "guide",

      data(){
          return {
              step: 0,
              stepTxt: [
                {index:0, title: "第一步", description: "游戏简介",
                  content:
                    [
                      {title:"游戏介绍",text: ["本项目主要任务是设计并开发出一款模拟期货交易的小游戏。这个小游戏从投资者的角度出发，以客户交易维度模拟实现期货实时交易的全过程，其中包括下单、撮合交易、平仓/交割。同时，也设计了实时的行情变化，且在一日结束后会进行用户的盈亏计算与盘后的日终清结算。"]},
                      {title:"基本业务介绍",
                        text:
                          ["1.\t当日结算准备金:\n" +
                          "当日结算准备金余额=上一交易日结算准备金余额+上一交易日交易保证金－当日交易保证金+当日实际可用充抵额度－上一交易日实际可用充抵额度+当日盈亏+当日入金－当日出金－交易手续费+其他资金等",
                            "2.\t交易手续费\n" + "交易手续费=∑[成交量(手)×合约交易手续费(元/手）",
                            "3.\t 当日盈亏\n" + "当日盈亏=∑[(卖出成交价-当日结算价)×卖出量]+∑[(当日结算价-买入成交价)×买入量]+(上一交易日结算价-当日结算价)×(上一交易日卖出持仓量-上一交易日买入持仓量)",
                            "4.\t实际可用冲抵额度\n" +
                            "交易所按照会员在交易所专用结算账户中的实有货币资金的4倍确定会员的最大充抵金额（即配比充抵额度），即最大充抵金额＝4×实有货币资金；\n" +
                            "当充抵金额≤最大充抵金额，实际可用充抵额度＝充抵金额；\n" +
                            "当充抵金额＞最大充抵金额，实际可用充抵额度＝最大充抵金额。\n" +
                            "保证金账户的余额≥结算价x持仓量x保证金比率，否则要在下一个交易日强行平仓。"]}

                    ]
                },
                {index:1, title: "第二步", description: "功能介绍",
                  content:
                    [
                      {
                        title: "功能简介",
                        text:[
                            "本软件为股指期货模拟游戏，仅提供股指期货交易的虚拟操作环境，可以完成买入开仓、卖出平仓、卖出开仓、买入平仓等虚拟交易操作，在游戏中设定每次交易下单数量为1手。游戏时间可以自行设定，当剩余时间为0分0秒，或客户点击[停止]按钮时游戏结束。游戏结束时系统根据浮动盈亏情况计算客户本次操作的收益率，收益率进入前5名及后5名的客户，将被写入盈亏排行榜。"
                        ]
                      },
                      {
                        title: "功能界面",
                        text: [
                            "1.行情显示图: 模拟了期货的行情曲线图",
                            "2."
                        ]
                      }
                    ]
                },
                {index:2, title: "第三步", description: "操作说明",
                  content:
                    [
                      {
                        title:"操作说明",
                        text:[
                          "1.返回点击主界面的开始游戏进入到游戏主界面",
                          "2.下单:"
                        ]
                      }
                    ]
                },
                {index:3, title: "第四步", description: "结果分析",
                  content:
                    [
                      {
                        title:"结果分析",
                        text:[
                          "1.风控:",
                          "2.盈亏分析:"
                        ]
                      }
                    ]
                },
              ]
          }
      },
      methods: {
          add: function () {
              this.step ++;
          },
          goBack: function () {
              this.$router.push('/');
          },
          gotoStep: function (index) {
              this.step =  index;
          }
      }
    }
</script>

<style scoped>
  *{
      margin: 0;
      padding: 0;
  }
  p{
      text-indent: 2em;
      text-align: left;
  }
  .mainGuide{
      background: azure;
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
  .bodyGuide{
      text-align: center;
  }
  .leftBody{
      height: 600px;
      width: 150px;
      padding: 50px;
      display: inline-block;
      border-radius: 10px;
      background: wheat;
  }
  .rightBody{
      height: 600px;
      display: table;
      border-radius: 10px;
      padding: 50px;
      background: lightblue;
  }
  .rightBody p{
      margin-top: 10px;
  }
  .txtPart{
      margin-bottom: 30px;
  }
</style>
