import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        data: [[],[]],
        usr: {
            remainMoney: 10,
            deposit: 100,
            boughtList: [],
            soldList: []
        },
        futures: {
            allKinds: [{id:'0',name:"期货A",price: 0},{id:'1',name:"期货B",price:1}],
            depositRate: 0.1
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
        }
    },
    mutations: {
        transRequest: function (state,params) {
            state.error.errorMes = '';
            state.error.errorCode = '';
            if(+params.orderPrice * +params.orderVol * state.futures.depositRate > state.usr.remainMoney){
                state.error.errorMes = "资金不足，交易失败！";
                state.error.errorCode = -1;
            }
            if(params.direction){
                state.usr.soldList.push(params);
            }else{
                state.usr.boughtList.push(params);
            }
        },
        setGameLog: function (state, params) {
            state.log.gameLog.push(params);
        },
        clearGameLog: function (state) {
            state.log.gameLog.splice(0,state.log.gameLog.length);
        }
    }
});

export default store;
