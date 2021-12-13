.<template>
      <!-- 导航栏 -->
  <nav-bar>
      <!-- 返回 -->
          <div slot="left" class="back" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <!-- 标题 -->
          <div slot="center" class="title">
              <div v-for="(item, index) in titles" 
              :key="item.id" 
              class="title-item"
              :class="{active: currentIndex === index}"
              @click="titleClick(index)">{{item}}</div>
          </div>
      </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    data () {
        return {
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    methods: {
        // 获取当前点击的对象
        titleClick(index) {
            this.currentIndex = index
        },
        // 返回按钮
        backClick() {
            this.$router.back()
        }
    }
}
</script>

<style scoped>
 .title {
     display: flex;
     font-size: 16px;
 }
 .title-item {
     flex: 1;
 }
 .active {
     color: var(--color-high-text);
 }
 .back img{
     margin-top: 10px;
 }
</style>