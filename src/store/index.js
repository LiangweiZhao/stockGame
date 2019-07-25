import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        data: [[],[]],
        round: 1,
        usr: {
            remainMoney: 100000,
            deposit: 0,
            benefit: 0,
            remainPay: 0,
            boughtList: [],
            positions: [],
            soldList: []
        },
        futures: {
            allKinds: [{id:'0',name:"期货A",price: 0},{id:'1',name:"期货B",price:1}],
            depositRate: 0.1,
            eachOrderVal: 10,
            lastPrice: []
        },
        operations: {
            transaction: [{id: 0, name: "买"},{id: 1, name:"卖"}],
        },
        error: {
            errorCode: '',
            errorMes: ''
        },
        log: {
            gameLog: []
        }
    },
    getters: {
        checkRemainMoney: function (state) {
            return function () {
                return state.usr.remainMoney;
            };
        },
        checkRemainPay: function (state) {
            return function () {
                return state.usr.remainPay;
            };
        },
        checkDeposit: function (state) {
            return function () {
                return state.usr.deposit;
            }
        },
        checkFuture: function (state) {
            return function () {
                return state.futures.allKinds;
            }
        },
        checkTransDireaction: function (state) {
            return function () {
                return state.operations.transaction;
            }
        },
        checkErrorMessage: function (state) {
            return function () {
                return state.error.errorMes;
            }
        },
        checkGameLog: function (state) {
            return function () {
                return state.log.gameLog;
            }
        },
        checkBoughtList: function (state) {
            return function () {
                return state.usr.boughtList;
            }
        },
        checkPosList: function (state) {
            return function () {
                return state.usr.positions;
            }
        },
        checkSoldList: function (state) {
            return function () {
                return state.usr.soldList;
            }
        },
        checkCurTime: function (state) {
            return function () {
              var date = new Date();
              var hour = date.getHours();
              var min = date.getMinutes();
              var sec = date.getSeconds();
              return (hour < 10 ? '0' + hour : hour) + ":" + (min < 10 ? '0' + min : min) + ":" + (sec < 10 ? '0' + sec : sec)  + " ";
          }
        },
        checkTodayPriceH: function (state) {
            return function () {
                return state.marketInfo.todayPriceH;
            }
        },
        checkTodayPriceL: function (state) {
            return function () {
                return state.marketInfo.todayPriceL;
            }
        },
        checkLastPrice: function (state) {
            return function (id) {
                return state.futures.lastPrice[id];
            }
        },
        checkBenefit: function (state) {
          return function () {
            return state.usr.benefit;
          }
        }
    },
    mutations: {
        transRequest: function (state,params) {
            state.error.errorMes = '';
            state.error.errorCode = '';
            //资金情况判断
            // let transDeposit = +params.orderPrice * +params.orderVol * state.futures.eachOrderVal * state.futures.depositRate;
            // if(transDeposit > state.usr.remainMoney){
            //     state.error.errorMes = "资金不足，交易失败！";
            //     state.error.errorCode = -1;
            //     return;
            // }
            params.id = state.futures.allKinds[params.future].id;
            params.futureName = state.futures.allKinds[params.future].name;
            params.round = state.round;
            //state.usr.remainMoney -= transDeposit;
            //state.usr.deposit += transDeposit;

            //持仓管理部分
            if(!state.usr.positions[params.id]){
                state.usr.positions[params.id] = {id:params.id,futureName: params.futureName,positionSell: 0,positionBuy: 0,positionLastSell: 0,positionLastBuy: 0,positionTotal: 0}
            }
            if(params.direction){
                state.usr.soldList.push(params);
                state.usr.positions[params.id].positionSell += +params.orderVol;
            }else{
                state.usr.boughtList.push(params);
                state.usr.positions[params.id].positionBuy += +params.orderVol;
            }
        },
        setGameLog: function (state, params) {
            state.log.gameLog.push(params);
        },
        clearGameLog: function (state) {
            state.log.gameLog.splice(0,state.log.gameLog.length);
        },
        clearData: function (state) {
            state.data.splice(0,state.data.length);
        },
        setLastPrice: function (state, params){
            console.log(params);
            var sum = 0,lastPrice = +params.lastPrice, newAddedDeposit = 0;
            state.futures.lastPrice[params.id] = lastPrice;
            //结算当日 更新保证金
            state.usr.boughtList.map((item) => {
                if(state.round === item.round){
                    sum += (lastPrice - +item.orderPrice) * +item.orderVol * +state.futures.eachOrderVal;
                }
            });
            state.usr.soldList.map((item) => {
                if(state.round === item.round){
                    sum += (+item.orderPrice - lastPrice) * +item.orderVol * +state.futures.eachOrderVal;
                }
            });
            //结算上一日
            let posInfo = state.usr.positions[params.id];
            sum += (+params.startPrice - +params.lastPrice ) * (posInfo.positionLastSell - posInfo.positionLastBuy);
            state.usr.benefit = sum;
            //更新当日为上一日
            posInfo.positionTotal += posInfo.positionBuy - posInfo.positionSell;
            posInfo.positionLastSell = posInfo.positionSell;
            posInfo.positionLastBuy = posInfo.positionBuy;
            posInfo.positionBuy = 0;
            posInfo.positionSell = 0;
            //准备金余额
            state.usr.remainMoney += sum + state.usr.deposit;
            state.usr.deposit = (+posInfo.positionTotal) * +state.futures.eachOrderVal * lastPrice * +state.futures.depositRate;
            state.usr.remainMoney -= state.usr.deposit;
            state.round ++;
        },
    }
});

export default store;
