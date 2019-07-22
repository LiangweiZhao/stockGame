<template>
    <div class="main">
      <div class="graph">
          <div id="xyChart" class="chartStyle"></div>
      </div>
      <div class="graphInfo">
          <div >
              <span>上局成交价: {{marketInfo.yesPrice}}</span><br/>
              <span>当前价格: {{marketInfo.curPrice}}</span><br/>
              <span>当次最高价: {{marketInfo.todayPriceH}}</span><br/>
              <span>当次最低价: {{marketInfo.todayPricel}}</span><br/>
          </div>
          <div class="riskControl">风控</div>
      </div>
      <div class="funcs">
          <el-button-group>
              <el-button type="info" round @click="swapFuctures(0)">期货A</el-button>
              <el-button type="info" round @click="swapFuctures(1)">期货B</el-button>
          </el-button-group>
          <el-button type="success">开始/暂停</el-button><br/>
          <el-button type="warning">结束</el-button><br/>
          <label>时间设置</label><br/>
          <input v-model="remMin"/>分<input v-model="remSec"/>秒<br/>
          <span class="demonstration">调节时间速度</span>
          <el-slider v-model="speed"></el-slider>
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
                data : [[],[]],
                now : 0,
                oneDay : 24 * 3600 * 1000,
                value : [Math.random() * 1000,Math.random() * 600],
                changeStyle: [ 21 , 19.5],
                runInterval: '',
                remMin: 10,
                remSec: 10,
                speed: 50,
                marketInfo: {
                    yesPrice: 0,
                    todayPriceH: 0,
                    todayPricel: 0,
                    curPrice: 0
                },
                buttonState:{
                    futures: 0,
                }
            }
        },
        computed: {
        },
        methods: {
            draw(){
                console.log("In draw method");
                // 初始化echarts实例
                let myChart = echarts.init(document.getElementById('xyChart'));

                function randomData(i) {
                    now = new Date(+now + oneDay);
                    value[i] = value[i] + changeStyle[i] * Math.random() - 10;
                    return {
                        name: now.toString(),
                        value: [
                            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), Math.round(value[i])
                        ]
                    }
                }
                var now = this.now;
                var data = this.data;
                var oneDay = this.oneDay;
                var value = this.value;
                var changeStyle = this.changeStyle;
                for (var i = 0; i < 1000; i++) {
                  data[0].push(randomData(0));
                  data[1].push(randomData(1));
                }

                // 绘制图表
                var option = {
                    title: {
                        text: '期货A行情图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            params = params[0];
                            var date = new Date(params.name);
                            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                        },
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: {
                        type: 'time',
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
                    },
                    series: [{
                        name: '模拟数据1',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: data[0]
                     },
                      //{
                    //     name: '模拟数据2',
                    //     type: 'line',
                    //     showSymbol: false,
                    //     hoverAnimation: false,
                    //     data: data[1]
                    // }
                    ]
                };
                //防止越界，重绘canvas
                window.onresize = myChart.resize;
                var self = this;
                this.runInterval= setInterval(function () {
                    for (var i = 0; i < 5; i++) {
                        data.shift();
                        data.push(randomData(0));
                    }
                    self.timeGone();
                    myChart.setOption(option);
                }, self.speed/50.0*1000);

                //myChart.setOption(option);//设置option
            },
            start: function () {
                if(this.running) return;
                this.running = true;
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
            }
        },
        mounted: function () {
            this.draw();
        }
    }
</script>

<style scoped>
    .main{
      overflow: hidden;
      padding: 0 200px;
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
      width: 200px;
      height: 100%;
      float: left;
      background: lightskyblue;
      margin-left: -100%;
      position: relative;
      left: -200px;
    }
    .funcs{
      width: 200px;
      height: 100%;
      float: left;
      background: lightskyblue;
      margin-right: -200px;
      padding-top: 10px;
    }
    .riskControl{
      width: inherit;
      height: 200px;
      background: goldenrod;
      border-radius: 100px
    }
    .chartStyle{
      width: inherit;
      height: inherit
    }
</style>
