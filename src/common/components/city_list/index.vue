<template>
  <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
    <div class="city-list-page" >
      <div class="location-layer">
          <div class="inner">
            <!-- <app-header title="地区选择" :isBack="false">
              <div class="slot" slot="right" v-on:click="handleSubmit()">
                <span>确定</span>
              </div>
            </app-header> -->
            <div class="head">
              <ul class="city-nav"  >
                <li v-on:click="handleParent(1)" class="nav-item" :class="{ active: 1 === parentIndex }">{{'请选择省' }}</li>
                <li  v-on:click="handleParent(2)" :class="{ active: 2 === parentIndex }" class="nav-item">{{  '请选择市' }}</li>

              </ul>
            </div>
            <scroller ref="myCityScroller">
              <ul class="list">
                <li v-if="cityLIstProvince"  v-for="(item, index) in cityLIstProvince.area_list" :key="index" class="item"
                  v-on:click="handleSelect(item.area_id,item.area_name)"
                >{{ item.area_name }}</li>
              </ul>
            </scroller>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>