.<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                ref="tabControl1" 
                @tabClick="tabClick"
                class="tab-control"
                v-show="isTabFixed"></tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load= "true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <home-recommend-view :recommends="recommends" />
    <feature-view/>
    <tab-control :titles="['流行','新款','精选']" 
                ref="tabControl2" 
                @tabClick="tabClick"></tab-control>
                <!-- :class="{fixed: isTabFixed}"></tab-control> -->
    <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import {getHomeMultidata, getHomeGoods} from "network/home"
import {debounce} from "../../common/utils"
import {backTopMixin} from "common/mixin.js"

export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      TabControl,
      GoodsList,
       Scroll,
    },
    mixins: [backTopMixin],
    data () {
      return {
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
       currentType : 'pop',
       tabOffsetTop: 0,
       isTabFixed: false,
       saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed () {
      console.log();
    },

    // 让Home中的内容保持原来的位置
    activated () {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated () {
      this.saveY = this.$refs.scroll.getScrollY()
    },

    created () {
      // 1. 请求多个数据
     this.getHomeMultidata()

      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      
    },
    mounted () {
      // 1. 监听item中图片加载完成 
      // 最好在mouted里面监听 
      const refresh = debounce(this.$refs.scroll.refresh)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })

    },
    methods: {
      /* 
        事件监听相关的方法
       */   
     
      tabClick(index) {
        switch (index) {
          case 0: 
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2: 
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },
      
      contentScroll(position) {
        // 1. 判断backTop是否显示
        // console.log(position);
        this.isShowBackTop = (-position.y) > 1000

        // 2. 决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        // this.$refs.scroll.scroll.refresh()
      },
      
      //   获取tabControl的offsetTop
      // 所有的组件都有一个属性$el:用于获取组件中的元素
      // this.$refs.tabControl.$el.offsetTop --> 这里得到的offsetTop 是图片未加载完得到的高度
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },


      /* 网络请求相关的方法 */

      getHomeMultidata() {
         getHomeMultidata().then(res => {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res); 
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
      })
      }
    }
}
        
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
 .home-nav {
   background-color: var(--color-tint);
   color: #fff;

  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
   /* position: fixed;
   top: 0;
   left: 0;
   right: 0;
   z-index: 10; */
 }

 .tab-control {
   /* position: sticky;
   top: 44px;
   z-index: 10; */

   position: relative;
   z-index: 9;
 }

 .fixed {
   position: fixed;
   left: 0;
   top: 44px;
   right: 0;
   z-index: 10;
 }

 .content {
   /* height: 300px; */
   overflow: hidden;

   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;

   
 }
</style>