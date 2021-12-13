.<template>
  <div class="detail-param-info" v-if="Object.keys(paramInfo).length !== 0">
      <!-- 尺码信息 -->
      <table class="info-size" 
              v-for="(table, index) in paramInfo.sizes" 
              :key="index">
          <tr v-for="(tr, index) in table" :key="index">
            <td v-for="(td, index) in tr" :key="index">{{td}}</td>
          </tr>
      </table>

      <!-- 更多的商品参数信息 -->
      <table class="info-param">
        <tr v-for="(info, index) in paramInfo.infos" :key="index">
          <td class="info-param-key">{{info.key}}</td>
          <td class="info-param-value">{{info.value}}</td>
        </tr>
      </table>

      <!-- 图片 -->
      <div class="info-img" v-if="paramInfo.image.length !== 0">
        <img :src="paramInfo.image" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name: 'DetailParamInfo',
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
}
</script>

<style>
.detail-param-info {
  padding: 20px 15px;
  font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
}

.detail-param-info table {
    width: 100%;
    /* 表格合并边框 */
    border-collapse: collapse;
  }

.detail-param-info table tr {
    height: 42px;
  }

  .detail-param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .info-param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>