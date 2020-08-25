import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
    state: {
        tabs: [],
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        //保存用戶信息
        userInfo: null,
    },
    getters: {
        //獲取變量的值
        getUserInfo: (state) => {
            return state.userInfo;
        },
    },
    mutations: {
        add_tabs(state, data){
               state.tabs.push(data);
        },
        delete_tabs (state, x) {
            for (let i = 0; i < state.tabs.length; i++) {
                if (state.tabs[i].i === x) {
                    state.tabs.splice(i, 1)
                }
            }
        },
        // 修改token，并将token存入localStorage
        changeLogin(state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        },
        // 修改USER INFO 改变state的初始值
        updateUserData: (state, userInfo) => {
            state.userInfo = userInfo;
        },
    },
    actions: {
        //包含任意异步操作，这里面的方法是用来异步触发mutations里面的方法
        updateUserData(context, userInfo) {
            console.log(userInfo)
            context.commit('updateUserData', userInfo)
        }
    }

});

export default store;
