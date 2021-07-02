<template>
  <div id="footerMenu" v-show="$store.state.flag != 'yes' && flag">
    <van-grid square :column-num="3" :border="false">
      <van-grid-item
        v-for="(item,i) in menuListIcon"
        :key="i"
        :icon="item.iconUrl"
        :text="item.iconText"
        :to="item.path"
      />
    </van-grid>
  </div>
</template>
<script>
let shouyedefault = require("../assets/shouyedefault@2x.png");
let shouyeactive = require("../assets/shouyeactive@2x.png");
let icon_map_default = require("../assets/icon_map_default@2x.png");
let icon_map_selected = require("../assets/icon_map_selected@2x.png");
let icon_me_selected = require("../assets/icon_me_selected@2x.png");
let icon_me_default = require("../assets/icon_me_default@2x.png");

export default {
  data() {
    return {
      flag: true,
      menuListIcon: [],
      menuList: [
        {
          iconUrl: shouyedefault,
          iconText: "首页",
          path: "/"
        },
        {
          iconUrl: icon_map_default,
          iconText: "电子地图",
          path: "/map/goodPathMap"
        },
        {
          iconUrl: icon_me_default,
          iconText: "我的",
          path: "/oneself"
        }
      ],
      activeIcon: {
        iconUrl: "",
        iconText: "",
        path: ""
      }
    };
  },
  created(){
   
  },
  watch: {
    $route(to, from) {
      // console.log(to.path);
      if(localStorage.getItem('flag')){  //app端隐藏底部tab
        this.flag = false
      }
      if (
        to.path != "/" &&
        to.path != "/map/goodPathMap" &&
        to.path != "/oneself" &&
        to.path != "/map/goodPathList"
      ) {
        this.flag = false;
        return false;
      }
      if (to.path == "/") {
        this.activeIcon.iconUrl = shouyeactive;
        this.activeIcon.iconText = "首页";
        this.activeIcon.path = "/";
      } else if (to.path == "/map/goodPathMap") {
        this.activeIcon.iconUrl = icon_map_selected;
        this.activeIcon.iconText = "电子地图";
        this.activeIcon.path = "/map/goodPathMap";
      } else if(to.path == "/map/goodPathList"){
        this.activeIcon.iconUrl = icon_map_selected;
        this.activeIcon.iconText = "电子地图";
        this.activeIcon.path = "/map/goodPathMap";
      }
      else {
        this.activeIcon.iconUrl = icon_me_selected;
        this.activeIcon.iconText = "我的";
        this.activeIcon.path = "/oneself";
      }
      this.menuListIcon = this.menuList.map(t => {
        return t.path == this.activeIcon.path ? this.activeIcon : t;
      });
      this.flag  = true
    }
  }
};
</script>
<style lang="less" scoped>
#footerMenu {
  width: 100%;
  height: 2.9rem;
  line-height: 2.5rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  margin-bottom: env(safe-area-inset-bottom) !important;
  /deep/.van-grid-item__content--center {
    padding: 4px;
    display: flex;
    justify-content: flex-start;
  }
  /deep/.van-grid-item__icon {
    font-size: 1.4rem;
  }
    //   @supports(bottom: env(safe-area-inset-bottom)){
    //   div{
    //     margin-bottom: env(safe-area-inset-bottom) !important;
    //   }
    // }
}
</style>