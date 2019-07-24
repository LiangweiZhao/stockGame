import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        data: [[],[]],
        usr: {
            remainMoney: 10000,
            deposit: 0,
            benefit: 0,
            boughtList: [],
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
        }
    },
    mutations: {
        transRequest: function (state,params) {
            state.error.errorMes = '';
            state.error.errorCode = '';
            let transDeposit = +params.orderPrice * +params.orderVol * state.futures.depositRate;
            if(transDeposit > state.usr.remainMoney){
                state.error.errorMes = "资金不足，交易失败！";
                state.error.errorCode = -1;
                return;
            }
            if(params.direction){
                params.id = state.futures.allKinds[params.future].id;
                params.futureName = state.futures.allKinds[params.future].name;
                state.usr.soldList.push(params);
            }else{
                params.id = state.futures.allKinds[params.future].id;
                params.futureName = state.futures.allKinds[params.future].name;
                state.usr.remainMoney -= transDeposit;
                state.usr.deposit += transDeposit;
                state.usr.boughtList.push(params);
            }
        },
        setGameLog: function (state, params) {
            state.log.gameLog.push(params);
        },
        clearGameLog: function (state) {
            state.log.gameLog.splice(0,state.log.gameLog.length);
        },
        setLastPrice: function (state, params){
            state.futures.lastPrice[params.id] = params.lastPrice;
            this.balance(params.lastPrice);
            console.log(this.state.usr.benefit);
        },
        balance: function (lastPrice) {
            var sum = 0;
            for(let item in state.usr.boughtList){
                sum += (lastPrice - item.orderPrice) * item.orderVol * this.state.futures.eachOrderVal;
            }
            for(let item in state.usr.soldList){
                sum += (item.orderPrice - lastPrice) * item.orderVol * this.state.futures.eachOrderVal;
            }
            this.state.usr.benefit += sum;
        }
    }
});

export default store;
