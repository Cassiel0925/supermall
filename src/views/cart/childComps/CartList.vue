.<template>
  <div class="cart-list">
      <scroll class="content" :pullUpLoad="true" :probe-type="3" ref="scroll">
          <cart-list-item 
                v-for="(item, index) in cartList"
                :key="index"
                :product="item" />
      </scroll>
      <!-- 底部结算模块 -->
      <cart-bottom-bar/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from './CartListItem.vue'
import CartBottomBar from './CartBottomBar.vue'

export default {
    name: 'CartList',
    components: {
        Scroll,
        CartListItem,
        CartBottomBar  
    },
    computed: {
        ...mapGetters(['cartList'])
    },
    activated () {
        this.$refs.scroll.refresh()
    }

}
</script>

<style scoped>
    .cart-list {
        height: calc(100% - 44px - 49px - 36px);
    }
    .content {
        height: 100%;
        overflow: hidden;
    }
</style>