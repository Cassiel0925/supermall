.<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
      <div class="info-title">{{goods.title}}</div>

      <div class="info-price">
          <span class="n-price">{{goods.newPrice}}</span>
          <span class="o-price">{{goods.oldPrice}}</span>
          <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
      </div>

      <div class="info-other">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>

      <div class="info-services">
          <span v-for="index in goods.services.length -1" :key="index.id">
              <img :src="goods.services[index -1].icon" alt="">
              <span>{{goods.services[index -1 ].name}}</span>
          </span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DetailBaseInfo',
    props: {
        goods: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style scoped>
.base-info {
    margin-top: 12px;
    padding: 0 8px;
    border-bottom: 5px solid #f2f5f8;

}

.info-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
}

.info-price {
    margin-bottom: 18px;
}

.info-price .n-price {
    font-size: 22px;
    color: var(--color-high-text);
}

.info-price .o-price {
    font-size: 14px;
    text-decoration: line-through;
    color: #c3c3c3;
    margin-left: 5px;
}

.info-price .discount {
    margin-left: 8px;
    padding: 2px 6px;
    background-color: var(--color-high-text);
    color: #fff;
    font-size: 14px;
    border-radius: 8px;

    position: relative;
    top: -8px;
}

.info-other {
    margin-bottom: 8px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    color: #c3c3c3;
    justify-content: space-between;
    border-bottom: 1px solid rgba(100,100,100,.1);

}

.info-services {
    display: flex;
    line-height: 39px;
    justify-content: space-between;
}

.info-services img{
    height: 14px;
    width: 14px;
    position: relative;
    top: 2px;

}

.info-services span {
    font-size: 13px;
    color: #333;
}
</style>