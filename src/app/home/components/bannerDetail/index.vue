<template>
  <div class="banner-page" v-if="contentList">

      <div class="wrapper "   >
            <p class="tit color333 font24">{{contentList.article_title}}</p>
            <p class="tit color999 font12">作者：{{contentList.article_author}}   {{contentList.article_time | handleDate}}</p>
            <p class="tit color333 font16" v-html="contentList.article_content">  </p>         
      </div>
</div>
</template>

<script>
import Index from "./index.js";
export default Index;
</script>
