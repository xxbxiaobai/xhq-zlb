<template>
  <div id="app">
      <!-- <transition :name="transitionName"> -->
    <keep-alive include="homePage">
      <router-view v-if="isRouterAlive" ></router-view>
    </keep-alive>
                <!-- </transition> -->
    <!--底部tabbar-->
    <!-- <BottomMenu v-show="isShow"></BottomMenu> -->
  </div>
</template>
<script>
import BottomMenu from "@/components/bottomMenu";
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      isShow: true,
      transitionName: ''
    };
  },
    // vue监听路由对象$route的方法
  watch: {
    // watch $route 决定使用哪种过渡
    '$route' (to, from) {
      // console.log(from); // '/'
      // console.log(to); // '/next1'
      // //to、from是最基本的路由对象，分别表示从(from)某个页面跳转到(to)另一个页面,to.path（表示要跳转到的路由地址），from.path同理。
      // const routerDeep = [from, to];
      // //找到to.path和from.path在routerDeep数组中的下标
      // const toDepth = routerDeep.indexOf(to.path);
      // const fromDepth = routerDeep.indexOf(from.path);
      // console.log(toDepth+'----------'+fromDepth)
      // this.transitionName = toDepth > fromDepth ? 'fold-left' : 'fold-right';
      // console.log(to.name)
      
      if(to.name=='goodMap'||from.name=='goodMap'||from.name=='goodList'||to.name=='goodList'||from.name=='homePage'||to.name=='homePage'){
        return false
      }
      // alert(11111111);
      if(to.meta.index > from.meta.index){
        this.transitionName='fold-left'
      }else{
        this.transitionName='fold-right'
      }
    }
  },
  components: {
    BottomMenu
  },
  methods: {
    // provide / inject 组合 依赖注入,解决刷新问题
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  created(){
    if(window.location.href.includes('tabbar=YES')){
        this.isShow = false
    }else{
      this.isShow = true
    }
  }
};
</script>
<style lang="less">
#app {
  width: 100%;
  min-height: 100%;
  padding-bottom: env(safe-area-inset-bottom);
}
// .app-view {
//   background: yellow;
// }
//     .slide-right-enter-active,
//     .slide-right-leave-active,
//     .slide-left-enter-active,
//     .slide-left-leave-active {
//     will-change: transform;
//     transition: all 500ms;
//     position:absolute;
//     }
    
//     .slide-right-enter {
//     opacity: 0;
//     transform: translate(-100%);
//     }
    
//     .slide-right-leave-active {
//     opacity: 0;
//     transform: translateX(100%);
//     }
    
//     .slide-left-enter {
//     opacity: 0;
//     transform: translateX(100%);
//     }
    
//     .slide-left-leave-active {
//     opacity: 0;
//     transform: translateX(-100%);
//     }

</style>
