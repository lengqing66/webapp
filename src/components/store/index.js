import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
    state: {
        tabs: []
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
        }
    }

});

export default store;
