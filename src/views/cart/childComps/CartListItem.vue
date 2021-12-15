.<template>
  <div class="cart-list-item">
      <!-- 复选框 -->
      <div class="item-selector">
          <check-button :is-checked = "product.checked" @click.native="checkClick"></check-button>
      </div>
      <!-- 左边图片 -->
      <div class="item-img">
          <img :src="product.image" alt="商品图片">
      </div>
      <!-- 右边详情数据 -->
      <div class="item-info">
          <div class="item-title">{{product.title}}</div>
          <div class="item-desc">{{product.desc}}</div>
          <div class="info-bottom">
              <div class="item-price left">￥{{product.price}}</div>
              <div class="item-count right">×{{product.count}}</div>
          </div>
      </div>
      
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'


export default {
    name: 'CartListItem',
    components: {
      CheckButton  
    },
    props: {
        product: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        checkClick() {
            this.product.checked = !this.product.checked
        }
    }
}
</script>

<style>
    .cart-list-item{
        width: 100%;
        display: flex;
        padding: 8px;
        border-bottom: 1px solid #ccc;
    }

    .item-selector {
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item-img {
        padding-left: 5px;
    }

    .item-img img {
        height: 100px;
        width: 80px;
        display: block;
        border-radius: 5px;
    }

    .item-info{
        /* float: right; */
        /* word-break: keep-all; */
        margin-left: 14px;
        overflow: hidden;
    }

    .item-title,
    .item-desc {
        /* 文字一行显示 超出的部分隐藏并用省略号显示 */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .item-info .item-title {
        font-size: 16px;
    }

    .item-info .item-desc {
        font-size: 14px;
        color: #999;
        margin: 18px 0 24px;
    }

    /* .info-bottom {
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
    } */

    .info-bottom .item-price {
        color: orangered;
    }
</style>