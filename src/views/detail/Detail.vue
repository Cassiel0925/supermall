.<template>
  <div id="detail">
      <!-- 导航栏 -->
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="detail-content" ref="scroll" :pullUpLoad="true" :probe-type="3" @scroll="contentScroll">
              <!-- 轮播图 -->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <!-- 商品基本信息展示 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
    <!-- 商品详情数据展示 -->
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <!-- 商品参数信息展示 -->
    <detail-param-info :param-info="paramInfo" ref="param" />
    <!-- 评论信息 -->
    <detail-comment-info :comment-info="commentInfo" ref="comment"/>
    <!-- 推荐商品 -->
    <goods-list :goods="recommends" ref="recommend"/>
    
      </scroll>
      <!-- 底部工具栏 -->
    <detail-bottom-bar @addCart="addToCart"/>
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'
// import BackTop from 'components/content/backtop/BackTop.vue'

import Scroll from '../../components/common/scroll/Scroll.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'

import {getDetail, Goods, Shop, GoodsParam,getRecommend} from 'network/detail.js'
import {backTopMixin} from 'common/mixin.js'

export default {
    name: 'Detail',
    components: {
          DetailNavBar,
          DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        // BackTop
    },
    mixins: [backTopMixin],
    data () {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            currentIndex: 0,
        }
    },
    created () {
        // 1. 保存传入的iid
        this.iid = this.$route.params.iid

        // 2. 根据iid 请求详情数据
        getDetail(this.iid).then(res => {
            // 1. 获取顶部轮播图的数据
            // console.log(res);
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

            // 6. 获取评论信息
            if(data.rate.cRate !==0) {
                this.commentInfo = data.rate.list[0]
            }

            /*
            // 等上面的数据获取完 执行下面的数据
            this.$nextTick(() => {
                // 根据最新的数据，对应的DOM是已经被渲染出来 但是图片依然是没有加载完
                this.themeTopYs = [];
                
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)

                console.log(this.themeTopYs);
            })
            */
        })

        // 3. 请求推荐数据
        getRecommend().then(res => {
            console.log(res);
            this.recommends = res.data.list
        })
    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh()
            // console.log(this.$refs.scroll);
             this.themeTopYs = [];
                
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
                this.themeTopYs.push(Number.MAX_VALUE)

                console.log(this.themeTopYs);
        },
        titleClick(index) {
            // console.log(index);
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        },
        contentScroll(position) {
            // console.log(position);
            // 获取y值
            const positionY = -position.y

            // positionY和主题中值进行对比
            // 方法一： 性能低
            let length = this.themeTopYs.length
            // for(let i = 0; i < length; i++) {
            //     if(this.currentIndex !== i) {
            //         if((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] )|| (i === length -1 && positionY >= this.themeTopYs[i])){
            //             this.currentIndex = i;
            //             this.$refs.nav.currentIndex = this.currentIndex
            //         }
            //     }
            // }

            // 方法二：性能提高 空间增大 空间换时间
            for(let i = 0; i < length -1 ; i++) {
                if(this.currentIndex !== i) {
                    if(i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] ){
                        this.currentIndex = i;
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }
            }

            // 是否会到顶部
            this.isShowBackTop = (-position.y) > 1000

        },
        addToCart() {
            // 1. 获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;

            // 2. 将商品加入到购物车里
            // this.$store.commit('addCart', product)
            this.$store.dispatch('addCart', product)

        }
        
    }
    
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
    height: calc( 100% - 44px - 49px);
    overflow: hidden;
    
}
</style>