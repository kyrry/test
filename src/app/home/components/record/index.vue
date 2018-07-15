<template>
  <div class="user-record-page">

    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="my_scroller">
        <main class="record">

           <section class="record_wrapper">
            <div v-if="recordList" class="record_content" v-for="(i,index) in recordList" :key="index">
              <p>{{i.description}}</p>
              <p class="date">{{i.addtime | handleDate}}</p>
              <span class="integral">{{i.amount}}</span>
            </div>
          </section>
          <section class="no-perform" v-show="performShow" >
            
            <!-- <p class="tip">~~ 没有更多数据 ~~</p> -->
            <div class="img-wrapper">
              <img src="~assets/images/noData2.png">
            </div>

          </section>
      </main>

    </scroller>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
