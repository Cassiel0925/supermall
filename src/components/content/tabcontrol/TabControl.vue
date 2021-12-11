.<template>
  <div class="tab-control">
      <div v-for="(item, index) in titles" :key="item.id" 
      class="tab-control-item"
      :class="{active: index=== currentIndex}" @click="itemClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'TabControl',
    // 外面传进来数据 用 props
    props: {
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data () {
        return {
            currentIndex: 0
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            // 里面往外面传数据 this.$emit()
            this.$emit('tabClick', index)

        }
    }
}
</script>

<style>
.tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    background-color: #fff;
}

.tab-control-item {
    flex: 1;
}

.tab-control-item span {
    padding: 6px;
}

.active {
    color: var(--color-high-text);
}

.active span {
    border-bottom: 2px solid var(--color-tint);
}
</style>