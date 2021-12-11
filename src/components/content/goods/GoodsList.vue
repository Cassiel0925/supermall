.<template>
  <div class="goods">
      <goods-list-item v-for="item in goods" 
      :key="item.id" :goods-item='item'/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
    name: 'GoodsList',
    components: {
        GoodsListItem
    },
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style>
    .goods {
        /* 一行显示 */
        display: flex;
        /* 包裹 根据宽度一行显示多少个元素 */
        flex-wrap: wrap;
        /* 均等分 */
        justify-content: space-around;

        padding: 2px;
    }
</style>