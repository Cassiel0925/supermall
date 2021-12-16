.<template>
  <div class="cart-bottom-bar">
      <!-- 全选 -->
      <div class="check-all">
          <check-button 
                :is-checked="isSelectAll" 
                class="check-box"
                @click.native="checkClick"/>
          <span>全选</span>
      </div>
      <!-- 合计 -->
      <div class="total-price">
          合计：{{totalPrice}}
      </div>

      <!-- 结算 -->
      <div class="calculate" @click="calcClick">
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
        },
        isSelectAll() {
            if(this.cartList.length === 0) return false
            // 1. 使用find
            return !this.cartList.find(item => !item.checked)

            // 2. 使用filter
            // return !(this.cartList.filter(item => !item.checked).length)

            // 3. 普通遍历
            // for(let item of this.cartList) {
            //     if(!item.checked) {
            //         return false
            //     }
            // }
            // return true
        }
    },
    methods: {
        checkClick() {
            if(this.isSelectAll) { //全部选中
                this.cartList.forEach(item => item.checked = false)
            } else { //部分或全部不选中
                this.cartList.forEach(item => item.checked = true)
            }
        },
        calcClick() {
            if(!this.isSelectAll) {
                this.$toast.show('请选择购买的商品', 2000)
            }
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