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
        <div v-for="item in stepTxt[step].content" class="txtPart" :key="item">
          <h1 v-text="item.title"></h1>
          <div v-for="subText in item.text" :key="subText">
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
                      "保证金账户的余额≥结算价x持仓量x保证金比率，否则要在下一个交易日强行平仓。",
                      "5.\t开仓:\n"+"开仓是指用户通过下单、集体竞价、撮合交易后，成功购入后便为开仓成功。开仓成功后，用户实际得到的是一份期货合约，期货合约的内容包含：交易品种、交易单位、报价单位、最小变动价位、涨跌停板幅度、合约月份、交易时间、最后交易日、最后交割日、交割等级、交割地点、最低交易保证金、交割方式、交易代码、上市交易所。",
                      "6.\t平仓:\n"+"平仓是指交易者了解持仓的交易方式，其方式是针对持仓方向做相反的对冲买卖，其中分为买入平仓和卖出平仓。",
                      "7.\t结算:\n"+"每个交易日交易结束，交易所会对每一个会员、客户的盈亏、交易手续费、交易保证金等款项进行结算。"]}

              ]
          },
          {index:1, title: "第二步", description: "功能介绍",
            content:
              [
                {
                  title: "功能简介",
                  text:[
                    "本软件为股指期货模拟游戏，仅提供股指期货交易的虚拟操作环境，可以完成买入开仓、卖出平仓、卖出开仓、买入平仓等虚拟交易操作，在游戏中设定每次交易下单数量为1手。游戏时间可以自行设定，当剩余时间为0分0秒，或客户点击[停止]按钮时游戏结束。游戏结束时系统根据浮动盈亏情况计算客户本次操作的收益率，收益率进入前5名的客户，将被写入盈亏排行榜。"
                  ]
                },
                {
                  title: "功能界面",
                  text: [
                    "1.行情显示图: 模拟了期货的行情曲线图",
                    "2.市场信息表: 展示了期货在当次的最高最低价、实时价格等，是最重要的信息之一。",
                    "3.风控圈: 用数字来体现当前操作的风险度，数字越高则越需谨慎操作。",
                    "4.期货选择键: 本游戏一共有2种期货可供选择，对不同的期货进行操作时，采用的策略也应改变。",
                    "5.时间控制栏: 时间控制栏中随着时间的推移，期货价格发生波动，系统也会定时进行准备金结算。[调节时间速度]键用来调整游戏时间和现实时间的换算比例,[波动浮动调节]键用来调整期货价格的波动幅度。",
                    "6.提示信息栏: 实时显示用户进行的操作，并且当特殊情况发生时显示提示信息。",
                    "6.用户资金信息栏: 包含用户资金、盈亏额、保证金等资金信息，又可查看用户买入/卖出期货表。",
                    "7.交易栏: 包括[买入开仓]、[卖出开仓]、[买入平仓]、[卖出平仓]4个按钮，点击输入相关信息即可进行交易。"
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
                    "2.开户: 系统将默认您拥有开户的资格，并为您充值100万人民币可供使用。",
                    "3.开始游戏: 点击[开始]按钮进行一局游戏，当时间变为0时游戏终止，系统将为您计算盈亏额并提供改善建议。",
                    "4.交易: 游戏开始后，您可以在任何时候进行交易（当然，切记真实的期货市场有交易时间的限制），交易分为4种，即买入开仓、卖出开仓、买入平仓、卖出平仓，点击按钮后将出现交易界面，您需要输入购买的期货、交易数量和交易价格进行操作。",
                    "5.结算: 每一轮，系统将对每一个会员、客户的盈亏、交易手续费、交易保证金等款项进行结算。如果您的保证金过低，系统将提醒您追加保证金。",
                    "6.提示: 每当进行交易、结算或发生保证金不足等情况，提示信息栏中将会产生记录。",
                    "6.结束游戏: 如果您觉得自己赚的够多了，点击[结束]按钮立即结束游戏，当计时为0时，该轮游戏也将结束。",
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
                    "1.风险控制:\n"+
                    "风险度=持仓保证金/客户权益。若客户没有持仓，则风险度为0，若客户满仓，则风险度为100%，若风险度大于100%，则客户已经穿仓了，要被期货公司强行平仓。当风险度大于l00％时则会收到《追加保证金通知书》，保证金应追加至可用资金大于等于0。我们将风险度以数值的形式在页面上显示出来，实时提醒用户操作期货时一定要注意风险控制。",
                    "2.盈亏分析:\n",
                    "资金规划: 决定操作的方向之后，必须作好整体资金规划。首先决定欲操作的部位有多大，通常以投入资金为参考，长期部位可以较高的资金比例投入，短期部位最好不要超过总投入资金的三分之一。",
                    "止损点的设置: 如果不设置止损点，就不能控制风险。面对不同阶段的操作，止损点的设置亦有不同。在长线的操作方面，止损的选择上需要较高的比重，所占的资金比例较高，以防因一时的反向行情而被扫出场。中线操作止损的选择通常倾向于技术面，以目前走势的趋势线或前波高低点作为参考依据。在止损的选择倾向于更小的格局，常以前日高低点或开收盘价作为参考。",
                    "切勿频繁的交易: 长期来看，超短线交易者的最佳业绩就是与市场打平,而交易绩效与交易次数成反比，这对任何人来说都不例外。因此，想要获利，你可以参考这个方法：耐心等个机会，一把砸进去，不止赢止损，长线持有，让利润去奔跑或暴仓。"
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
