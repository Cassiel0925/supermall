.<template>
  <div class="detail-comment-info">
      <!-- 头部 -->
      <div class="info-header">
          <div class="header-title">用户评价</div>
          <div class="header-more">更多</div>
      </div>
     <!-- 有评论信息 -->
      <div v-if="Object.keys(commentInfo).length !==0">
      <!-- 用户评价 -->
      <div class="info-user">
          <!-- 用户头像 -->
          <img :src="commentInfo.user.avatar" alt="">
          <!-- 用户名称 -->
          <span>{{commentInfo.user.uname}}</span>
      </div>
      <!-- 用户评价及日期、评价 -->
      <div class="info-detail">
          <p>{{commentInfo.content}}</p>
          <div class="info-other">
              <span class="date">{{commentInfo.created | showDate}}</span>
              <span>{{commentInfo.style}}</span>
          </div>
          <div class="info-imgs">
              <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" alt="">
          </div>
      </div>
     </div>
     <!-- 没有评论信息 -->
     <div v-else class="no-comment-info">
         暂无评论信息
     </div>
  </div>
</template>

<script>
// import {formatDate} from 'common/utils.js'

export default {
    name: 'DeatilCommentInfo',
    props: {
        commentInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    filters: {
        showDate(value) {
            // 1. 将时间戳转成Date对象
            // const date = new Date(value * 1000)
            // return new Date(value * 1000)

            // 2. 将date进行格式化
            // return formatDate(date, 'yyyy-MM-dd hh:mm')
            var now = new Date(value * 1000),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
        }
    }
}
</script>

<style scoped>
.detail-comment-info{
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
}

.info-header {
    /* display: flex; */
    height: 50px;
    line-height: 50px;
    border-bottom: 3px solid #f2f5f8;

    /* flex: 1; */
    /* justify-content: space-evenly; */
}

.header-title{
    float: left;
    font-size: 16px;
}

.header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
}

.info-user {
    padding: 15px 0;
    /* line-height: 45px; */
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
}

.info-user img{
    height: 38px;
    width: 38px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);

}

.info-user span {
    font-size: 15px;
    margin-left: 10px;
    vertical-align: center;
}

.info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
}

.info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
}
.info-other .date {
    margin-right: 10px;
}
.info-imgs {
    margin-top: 10px;
}

.info-imgs img{
    height: 70px;
    width: 70px;
    margin-right: 5px;
}

.no-comment-info {
    margin: 15px;
    color: #999;
}
</style>