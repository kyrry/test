<template>
  <div class="home-page">
      <div class="wrapper">
        <div class="controller">
          <div class="photo" ref="mySwiper">
            <div class="swiper-wrapper" >

           <div class="swiper-slide" id="item.article_id" v-if="bannerList"  v-for="(item, index) in bannerList" :key="index"  :id="item.goods_id">
              <div class="photo-item">
                  <img :src="item.article_logo|url" @click="bannerContent(item.article_id)">
              </div>
            </div>

            </div>
            <div class="swiper-pagination"></div>
          </div>
          

          <div class="HomeList">
            
            <ul>
                <!-- <li><div :class="{ active: 0 ==status}" >浏览专区</div></li> -->
                <li @click="switchover(0)"><div :class="{ active: 0 ==status}" >浏览专区</div></li>
                <li @click="switchover(1)"><div :class="{ active: 1 == status}">试用专区</div></li>
            </ul>
            <nav>
              <div @click="switchState('in')"><p  :class="{ active: 'in' == type}" >开抢中<span v-if="numIn">({{numIn}})</span></p></div>
              <div @click="switchState('order')"><p  :class="{ active: 'order' == type}">待开抢<span  v-if="numOrder">({{numOrder}})</span></p></div>
              <div @click="switchState('end')"><p  :class="{ active: 'end' == type}">已结束<span  v-if="numEnd">({{numEnd }})</span></p></div>
            </nav>
          </div>
          
        </div>
        
      </div> 
      <!-- :on-refresh="refresh" -->
        <!-- :on-infinite="infinite" -->
      <scroller  
       
        ref="my_scroller">
          <div class="main">
             
          <ul>
              <li class="item" v-if="formTemp.list"  v-for="(item, index) in formTemp.list" :key="index"  :id="item.goods_id">
              <div class="list">
                <div class="image">
                   <img :src="item.goods_image_url">
                  <p class="bg" v-if="goodType =='end'">   
                       <img src="~assets/images/over.png">
                  </p>
                </div>
                <div class="detail">
                    <p class="name">{{item.goods_name}}</p>
                    <em class="money"  v-if="type =='in'|| type =='order'">奖励{{item.return_money}}金币</em> 
                    <em class="moneyEnd" v-if="goodType =='end'">{{item.return_money}}</em> 
                    <p class="Price"  v-if="type =='in'|| type =='order'" ><span class="font14">￥</span><span>{{item.goods_buy_price}}</span></p> 
                    <p class="PriceEnd font666" v-if="goodType =='end'" ><span class="font14">￥</span><span>{{item.goods_buy_price}}</span></p> 
                    <div class="Price grayText ">
                   
                        <div class="progressContainerEnd progressContainer" v-if="goodType =='end'">
                           <div class="progress" :style="{width:(item.balance) / item.num *100+'%'}"></div>
                           <span class="num">{{item.balance}}/{{item.num}}</span>
                      </div>
                      
                        <div class=" progressContainer" v-if="type =='in'||type =='order'">
                           <div class="progress" :style="{width:(item.balance) / item.num *100+'%'}"></div>
                           <span class="num">{{item.balance}}/{{item.num}}</span>
                      </div>
                      
                    </div> 
                
                    <button class="btn" v-if="goodType =='in'" @click="robClick(item.goods_id)">立即抢</button>
                    <button class="btn green " v-if="goodType =='order'">待开抢</button>
                    <button class="btn gray " v-if="goodType =='end'">已结束</button>
                    
                </div>
              </div>
             </li>


            <li v-if="performShow"> 
              <div class="textC noDate">
                <img src="~assets/images/wait.png" class="marginAuto">
                <p v-if=" 0 == status || 1 == status " class="font15">当前活动被抢完，请等待下一个整点~</p>
                <p v-if=" 1 == status" class="font14">浏览活动做的越多，获得的试用机会越多~</p>
              </div> 
            </li>  

          </ul>
          
        
          </div>
        </scroller>

        <app-footer></app-footer>
  </div>
</template>

<script>
import Index from "./index.js";
export default Index;
</script>
