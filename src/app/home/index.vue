<template>
  <div class="home-page">
      <div class="wrapper">
        <div class="controller">
          <div class="photo" ref="mySwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="photo-item">
                  <img src="~assets/images/ad_1.jpg">
                </div>
              </div>
              <div class="swiper-slide">
                <div class="photo-item">
                  <img src="~assets/images/ad_1.jpg">
                </div>
              </div>
              <div class="swiper-slide">
                <div class="photo-item">
                  <img src="~assets/images/ad_1.jpg">
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          

          <div class="HomeList">
            
            <ul>
                <li @click="switchover(0)"><div :class="{ active: 0 ==status}" >浏览专区</div></li>
                <li @click="switchover(1)"><div :class="{ active: 1 == status}">试用专区</div></li>
            </ul>
            <nav>
              <div @click="switchState('in')"><p  :class="{ active: 'in' == type}" >开抢中(<span>{{numIn ? numIn : 0}}</span>)</p></div>
              <div @click="switchState('order')"><p  :class="{ active: 'order' == type}">待开抢(<span>{{numOrder ? numOrder : 0}}</span>)</p></div>
              <div @click="switchState('end')"><p  :class="{ active: 'end' == type}">已结束(<span>{{numEnd ? numEnd : 0}}</span>)</p></div>
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
              <!-- <router-link class="item" tag="li" v-for="(item, index) in formTemp.list" :key="index" :to="{ name: 'user.CardDetail', params: { id: item.id }, query: { type: type } }"> -->
              <li class="item" v-if="formTemp.list"  v-for="(item, index) in formTemp.list" :key="index"  :id="item.goods_id">
              <div class="list">
                <div class="image">
                   <img :src="item.goods_image_url">
                    <!-- <img src="~assets/images/ad_1.jpg"> -->
                  <p class="bg" v-if="type =='end'">   
                       <img src="~assets/images/over.png">
                  </p>
                </div>
                <div class="detail">
                    <p class="name">{{item.goods_name}}</p>
                    <em class="money"  v-if="type =='in'|| type =='order'">{{item.return_money}}</em> 
                    <em class="moneyEnd"  v-if="type =='end'">{{item.return_money}}</em> 
                    <p class="Price"  v-if="type =='in'|| type =='order'" >￥<span>{{item.goods_buy_price}}</span></p> 
                    <p class="PriceEnd font666"  v-if="type =='end'" >￥<span>{{item.goods_buy_price}}</span></p> 
                    <div class="Price grayText ">
                   
                        <div class="progressContainerEnd progressContainer"  v-if="type =='end'">
                           <div class="progress" :style="{width:(item.balance) / item.num *100+'%'}"></div>
                           <span class="num">{{item.balance}}/{{item.num}}</span>
                      </div>
                      
                        <div class=" progressContainer" v-if="type =='in'||type =='order'">
                           <div class="progress" :style="{width:(item.balance) / item.num *100+'%'}"></div>
                           <span class="num">{{item.balance}}/{{item.num}}</span>
                      </div>
                      
                    </div> 
                
                    <button class="btn" v-if="type =='in'" @click="robClick(item.goods_id)">立即抢</button>
                    <button class="btn green " v-if="type =='order'">待开抢</button>
                    <button class="btn gray " v-if="type =='end'">已结束</button>
                    
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
