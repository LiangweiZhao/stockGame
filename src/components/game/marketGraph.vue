<template>
    <div class="main">
      <div class="graph">
          <div id="xyChart" class="chartStyle"></div>
      </div>
      <div class="graphInfo">
          <div class="textArea">
              <span><b>当前轮次: </b>第{{marketInfo.round}}轮</span><br/>
              <span><b>开盘价: </b>{{marketInfo.startPrice || '-'}}</span><br/>
              <span><b>当前价格: </b>{{marketInfo.curPrice || '-'}}</span><br/>
              <span><b>涨跌幅: </b>{{marketInfo.curPrice ? `${Number((marketInfo.curPrice - marketInfo.startPrice)/marketInfo.startPrice*100).toFixed(2)}%` : '-'}}</span><br/>
              <span style="color: red;"><b>当次最高价: </b>{{marketInfo.todayPriceH || '-'}}</span><br/>
              <span style="color: green"><b>当次最低价: </b>{{marketInfo.todayPriceL || '-'}}</span><br/>
          </div>
          <div class="riskControl">
            <label for="riskCircle">风控圈</label><br/>
            <el-progress id="riskCircle" type="circle" :percentage="risk.percent" :color="risk.colors"></el-progress>
          </div>
      </div>
      <div class="funcs">
          <div id="futures">
            <el-button-group>
              <el-button type="info" round @click="swapFuctures(0)">期货A</el-button>
              <el-button type="info" round @click="swapFuctures(1)">期货B</el-button>
            </el-button-group>
          </div><br/>
          <div id="timeSet">
            <label>时间设置</label><br/>
            <input type="number" v-model="remMin"/>分<input type="number" v-model="remSec"/>秒<br/>
          </div>
          <div id="speedControl">
            <span class="demonstration">调节时间速度-倍率:{{speed.time/50}}</span>
            <el-slider v-model="speed.time"></el-slider><br/>
            <span class="demonstration">波动浮动调节-倍率:{{speed.rate/50}}</span>
            <el-slider v-model="speed.rate"></el-slider><br/>
          </div>
          <el-button type="success" @click="start">开始</el-button>
          <el-button type="warning" @click="end">结束</el-button><br/>
          <div class="usrOprts">
              <el-button-group>
                  <el-button @click="operation(0)" type="danger" plain>买入开仓</el-button>
                  <el-button @click="operation(1)" type="success" plain>卖出开仓</el-button>
              </el-button-group>
              <el-button-group>
                  <el-button @click="operation(2)" type="danger" plain>买入平仓</el-button>
                  <el-button @click="operation(3)" type="success" plain>卖出平仓</el-button>
              </el-button-group>
          </div>
      </div>
    </div>
</template>

<script>
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/line');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');

    export default {
        name: "marketGraph",
        data(){
            return {
                data : this.$store.state.data,
                myChart: {},
                now : 0,
                oneDay : 1,
                value : Math.random() * 1000,
                running: false,
                remMin: 10,
                remSec: 10,
                speed: {
                    time: 50,
                    rate: 50
                },
                marketInfo: {
                    startPrice: '',
                    todayPriceH: '',
                    todayPriceL: '',
                    curPrice: '',
                    round: 1,
                },
                buttonState:{
                    futures: 0,
                },
                risk: {
                    status: "",
                    percent: Math.round(this.$store.getters.checkDeposit()/(this.$store.getters.checkRemainMoney()+this.$store.getters.checkDeposit()) * 100),
                    text: "危险",
                    limit: 0.1,
                    colors: [
                        {color: '#5cb87a', percentage: 40},
                        {color: '#e6a23c', percentage: 60},
                        {color: '#E60000', percentage: 80},
                        {color: '#D10000', percentage: 90}
                    ]
                }
            }
        },
        watch: {
            "risk.percent": function () {
                if(this.risk.percent > 60){
                    this.$store.commit('setGameLog',{time:this.curTime(),content:`您的占用资金已经达到60%,请注意风险！`})
                }
            }
        },
        computed: {
            remRound: {
                get: function () {
                    return 3 - this.marketInfo.round;
                }
            }
        },
        methods: {
            draw(){
                console.log("In draw method");
                // 初始化echarts实例
                this.myChart = echarts.init(document.getElementById('xyChart'));


                // 绘制图表
                var option = {
                    title: {
                        text: '期货A行情图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            params = params[0];
                            var date = params.name;
                            return Math.round(date/60) + '/' + Math.round(date%60) + ' : ' + params.value[1];
                        },
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {
                          show: true
                        }
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                          show: true
                        }
                    }
                };
                //防止越界，重绘canvas
                window.onresize = this.myChart.resize;
                this.myChart.setOption(option,true);
                //myChart.setOption(option);//设置option
            },
            start: function () {
                if(this.running){
                    this.$store.commit('setGameLog',{time:this.curTime(),content:`游戏已经开始，请等待游戏结束！`});
                    return;
                }
                this.remMin = Math.floor(this.remMin);
                this.remSec = Math.floor(this.remSec);
                if(!this.remMin && !this.remSec) {
                    this.$store.commit('setGameLog',{time:this.curTime(),content:`游戏时间不能为0分0秒！`});
                    return;
                }
                this.$store.commit('setGameLog',{time:this.curTime(),content:`游戏开始！时间为${this.remMin}分${this.remSec}秒,第${this.marketInfo.round}轮!祝你好运～`});
                this.running = true;
                function randomData() {
                  now = now + oneDay;
                  value = value + (Math.random() - 0.5 > 0 ? 1 : -1) * self.marketInfo.startPrice*0.005 * (self.speed.rate/50);
                  if(Math.abs(value - self.marketInfo.startPrice)/self.marketInfo.startPrice >= 0.1){
                      value = value > self.marketInfo.startPrice ? self.marketInfo.startPrice*1.1 : self.marketInfo.startPrice*0.9;
                  }
                  return {
                    name: now,
                    value: [
                      `${Math.floor(now/60)}/${now%60}`, Math.round(value)
                    ]
                  }
                }
                var now = this.now;
                var data = this.data;
                var oneDay = this.oneDay;
                var value = this.value;
                var self = this;
                var option = {
                    xAxis: {
                      min: `0/0`,
                      max: `${this.remMin}/${this.remSec}`
                    },
                    yAxis: {
                      min: Math.round(this.marketInfo.startPrice*0.88),
                      max: Math.round(this.marketInfo.startPrice*1.12)
                    },
                    series: [{
                      name: '股票A行情图',
                      type: 'line',
                      showSymbol: false,
                      hoverAnimation: false,
                      data: data
                    }]
                };

                var interval = setInterval(function () {
                  if(self.remMin === 0 && self.remSec === 0){
                      self.end(1);
                      clearInterval(interval);
                  }
                  //for (var i = 0; i < 5; i++) {
                    //data.shift();
                    let tmpRandom = randomData(0);
                    self.marketInfo.todayPriceH = Math.max(self.marketInfo.todayPriceH,tmpRandom.value[1]);
                    self.marketInfo.todayPriceL = Math.min(self.marketInfo.todayPriceL,tmpRandom.value[1]);
                    self.marketInfo.curPrice = tmpRandom.value[1];
                    data.push(tmpRandom);
                  //}
                  self.timeGone();
                  self.myChart.setOption(option);
                }, Math.round(1000/(self.speed.time/50)));

            },
            end: function(i) {
                if(i === 1 && !this.running) return;
                if(!this.running){
                    this.$store.commit('setGameLog',{time:this.curTime(),content:`请先开始游戏！`});
                    return;
                }
                this.running = false;
                this.$store.commit('setGameLog',{time:this.curTime(),content:`本轮游戏结束！`});
                this.remMin = 0;
                this.remSec = 0;
                this.data = [];
                this.marketInfo.round ++;
            },
            curTime () {
              var date = new Date();
              var hour = date.getHours();
              var min = date.getMinutes();
              var sec = date.getSeconds();
              return (hour < 10 ? '0' + hour : hour) + ":" + (min < 10 ? '0' + min : min) + ":" + (sec < 10 ? '0' + sec : sec)  + " ";
            },
            timeGone: function () {
                if(!this.remSec){
                    if(!this.remMin) return;
                    this.remMin --;
                    this.remSec = 59;
                }else{
                    this.remSec --;
                }
            },
            swapFuctures: function (flag) {
                console.log(flag);
                return this.buttonState.futures = flag ? 1 : 0;
            },
            operation: function (mode) {
                this.$router.push('/gameCenter/usrOperPage/' + mode);
            }
        },
        mounted: function () {
            this.draw();
            this.marketInfo.startPrice = Math.floor(this.value);
            this.marketInfo.todayPriceL = Math.floor(this.value);
            this.data.push({name:'0',value:['0/0',this.marketInfo.startPrice]});
        }
    }
</script>

<style scoped>
    .main{
      overflow: hidden;
      padding: 0 230px;
      height: 500px;
      border-radius: 10px;
    }
    .graph{
      width: 100%;
      height: 100%;
      float: left;
      background: wheat;
    }
    .graphInfo{
      width: 230px;
      height: 100%;
      float: left;
      background: lightskyblue;
      margin-left: -100%;
      position: relative;
      left: -230px;
    }
    .textArea{
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    .funcs{
      width: 230px;
      height: 100%;
      float: left;
      background: lightskyblue;
      margin-right: -230px;
      padding-top: 10px;
    }
    .riskControl{
      width: inherit;
      height: 200px;
    }
    .chartStyle{
      width: inherit;
      height: inherit
    }
    .usrOprts{
      padding: 5px;
      margin-top: 20px;
    }
    #futures{
      margin-top: 10px;
    }
    #timeSet{
      margin-bottom: 10px;
    }
    #speedControl{
      padding: 8px;
    }
</style>
