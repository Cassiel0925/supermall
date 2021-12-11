.<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends" />
    <feature-view/>
    <tab-control :titles="['流行','新款','精选']" 
                class="tab-control" 
                @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods" />
    <ul>
      <li>message1</li>
      <li>message2</li>
      <li>message3</li>
      <li>message4</li>
      <li>message5</li>
      <li>message6</li>
      <li>message7</li>
      <li>message8</li>
      <li>message9</li>
      <li>message10</li>
      <li>message11</li>
      <li>message12</li>
      <li>message13</li>
      <li>message14</li>
      <li>message15</li>
      <li>message16</li>
      <li>message17</li>
      <li>message18</li>
      <li>message19</li>
      <li>message20</li>
      <li>message21</li>
      <li>message22</li>
      <li>message23</li>
      <li>message24</li>
      <li>message25</li>
      <li>message26</li>
      <li>message27</li>
      <li>message28</li>
      <li>message29</li>
      <li>message30</li>
      <li>message31</li>
      <li>message32</li>
      <li>message33</li>
      <li>message34</li>
      <li>message35</li>
      <li>message36</li>
      <li>message37</li>
      <li>message38</li>
      <li>message39</li>
      <li>message40</li>
      <li>message41</li>
      <li>message42</li>
      <li>message43</li>
      <li>message44</li>
      <li>message45</li>
      <li>message46</li>
      <li>message47</li>
      <li>message48</li>
      <li>message49</li>
      <li>message50</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {getHomeMultidata, getHomeGoods} from "network/home"



export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      TabControl,
      GoodsList
       
    },
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
       currentType : 'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created () {
      // 1. 请求多个数据
     this.getHomeMultidata()

      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

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
      })
      }
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

 .tab-control {
   position: sticky;
   top: 44px;
   z-index: 10;
 }
</style>