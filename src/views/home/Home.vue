.<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends" />
    <feature-view/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import {getHomeMultidata} from "network/home"



export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView
       
    },
    data () {
      return {
        // result: null
        banners: [],
        recommends: []
      }
    },
    created () {
      // 1. 请求多个数据
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
}
        
</script>

<style>
  #home {
    padding-top: 44px;
  }
 .home-nav {
   background-color: var(--color-tint);
   color: #fff;

   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   z-index: 10;
 }
</style>