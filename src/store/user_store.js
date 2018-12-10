export default{
    state:{
        userInfo:{}
    },
    getters:{ //类似计算属性
        // not_show(state){//这里的state对应着上面这个state
        //    // 注意 : $store.getters.not_show 的值是不能直接修改的,
            // 需要对应的 state 发生变化才能修改
        //     return !state.show;
        // }
    },
    mutations:{
        saveUserInfo(state,user){//这里的state是上面的,第二个参数是传过来的
            state.userInfo = {...state.userInfo ,...user};
        }
    },
    //多个 state 的操作 , 使用 mutations 会来触发会比较好维护 
    //那么需要执行多个 mutations 就需要用 action 了:
    actions:{
        handleMoreMut(context){
            //这里的context和我们使用的$store拥有相同的对象和方法
            // context.commit('handleState');
            // context.commit('increaseCount');//触发account
            //你还可以在这里触发其他的mutations方法
        }
    }
}
// mutations 中的方法是不分组件的 , 假如你在 dialog_stroe.js 文件中的定义了

// switch_dialog 方法 , 在其他文件中的一个 switch_dialog 方法 , 那么

// $store.commit('switch_dialog') 会执行所有的 switch_dialog 方法。

// mutations里的操作必须是同步的。