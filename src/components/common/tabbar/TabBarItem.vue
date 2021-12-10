.<template>
  <div class="tab-bar-item" @click="itemClick">
          <div v-if="!isActive"><slot name="item-icon"></slot></div>
          <div v-else><slot name="item-icon-active"></slot></div>
          <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
     
     
</template>

<script>
export default {
    name: 'TabBarItem',
    props: {
        path: String,
        activeColor: {
            type: String,
            default: 'pink'
        }
    },
    data() {
        return {
            // isActive: false,
        }
    },
    computed: {
        // 颜色的动态控制
      isActive() {
          return this.$route.path.includes(this.path)
      },
      activeStyle() {
          return this.isActive ? {color: this.activeColor} : {}
      }  
    },
    methods: {
        itemClick() {
            // 双击报错解决
            // 第一种方法
            // if(this.$route.path === this.path) {
            //     return;
            // }else {
            //     this.$router.replace(this.path)
            // }

            // 第二种方法
            this.$router.replace(this.path).catch(() => {})
        }
    }
}
</script>

<style>
    .tab-bar-item {
    flex: 1;
    height: 49px;
    text-align: center;
  }

  /* .active {
      color: pink;
  } */
</style>