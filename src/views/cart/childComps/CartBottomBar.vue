.<template>
  <div class="cart-bottom-bar">
      <!-- 全选 -->
      <div class="check-all">
          <check-button class="check-box"/>
          <span>全选</span>
      </div>
      <!-- 合计 -->
      <div class="total-price">
          合计：{{totalPrice}}
      </div>

      <!-- 结算 -->
      <div class="calculate">
          去计算({{checkLength}})
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

import { mapGetters } from 'vuex'
export default {
    name: 'CartBottomBar',
    components: { 
        CheckButton 
    },
    // mixins: ['mapGetters'],
    computed: {
        ...mapGetters(['cartList']),
        totalPrice() {
            return '￥' + this.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            }, 0).toFixed(2)
        },
        checkLength() {
            return this.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.count
            },0)
        }
    }

}
</script>

<style>
    .cart-bottom-bar {
        position: relative;
        display: flex;

        height: 36px;
        line-height: 36px;

        background-color: #eee;
    }

    .check-all {
        display: flex;
        align-items: center;
        margin-left: 8px;
        width: 60px;
    }

    .check-all .check-box {
        width: 20px;
        height: 20px;
        line-height: 20px;
        
    }

    .check-all span {
        margin-left: 5px;
        font-size: 14px;
    }

    .total-price {
        margin-left: 18px;
        font-size: 16px;
        flex: 1;
    }

    .calculate {
        width: 100px;
        background-color: red;
        color: #fff;
        text-align: center;
    }

</style>