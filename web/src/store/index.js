import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);


//如果组件多了,状态不好管理,所以用 modules
import user_store from './user_store'
export default new vuex.Store({//store对象
    modules:{
        user : user_store
    }
})