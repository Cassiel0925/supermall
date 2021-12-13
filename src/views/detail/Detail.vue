.<template>
  <div id="detail">
      <!-- 导航栏 -->
      <detail-nav-bar class="detail-nav"></detail-nav-bar>
      <scroll class="detail-content" ref="scroll" :pullUpLoad="true">
              <!-- 轮播图 -->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <!-- 商品基本信息展示 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
    <!-- 商品详情数据展示 -->
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <!-- 商品参数信息展示 -->
    <detail-param-info :param-info="paramInfo" />
      </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'

import Scroll from '../../components/common/scroll/Scroll.vue'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail.js'


export default {
    name: 'Detail',
    components: {
          DetailNavBar,
          DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo
    },
    data () {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {}
        }
    },
    created () {
        // 1. 保存传入的iid
        this.iid = this.$route.params.iid

        // 2. 根据iid 请求详情数据
        getDetail(this.iid).then(res => {
            // 1. 获取顶部轮播图的数据
            console.log(res);
            const data = res.result;
            this.topImages = data.itemInfo.topImages

            // 2. 获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            // 3. 创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            // 4. 保存商品的详情数据
            this.detailInfo = data.detailInfo

            // 5. 获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        })
    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh()
            console.log(this.$refs.scroll);
        }
    },
    // updated () {
    //     this.$refs.scroll.refresh()
    // }
    
}
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* 滚动问题解决  */
    height: 100vh;
}

.detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
}

 #detail .detail-content {
    height: calc( 100% - 44px );
    overflow: hidden;
    
}
</style>