<template>
  <div class="user-addCard-page">
    <scroller ref="myscroller">
      <div class="wrapper">
        <div class="controller">

           <main class="addCard">

              <section class="addCard_wrapper">
                <div class="info_box">
                  <ul class="info">

                    <li class="list"  v-if="bankCardList"  v-for="(item, index) in bankCardList" :key="index" @click="cardSelect(item.card_id,item.card_bank)">
                      <p class="bankName">{{item.card_bank}}</p>
                      <p class="num">{{item.card_number}}</p>
                      <div class="cardBottom">
                        <p>持卡人：<span>{{item.card_name}}</span></p>
                        <p>开户地：<span>{{item.card_bank_addr}}</span></p>
                      </div>
                    </li>

                  
                  </ul>
              
                  <button type="submit" class="mainBtn btnTop" @click="toWithdraw" >提现</button>
                  <!-- <button type="submit" class="btn" :class="{ 'on': active }" @click="save">提现</button> -->
                </div>
              </section>

          </main>
        </div>
      </div>
    </scroller>


  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
