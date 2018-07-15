<template>
  <div class="detail-page">

      <div class="wrapper">

        <div class="controller">
          <div class="count-down">
            <p  ><span class="mainFontColor">付款倒计时：00:12:03，</span>
              <span>超出时间视为自动放弃</span></p>
          </div>
          <div class="flex mainBg marginTopHeight "></div>
          <div class="goods-detail flex padWrap ">
            <div class="img flex-item ">
               <!-- <img src="~assets/images/ad_1.jpg"> -->
               <img  v-if="orderList.goods_image_url" :src="orderList.goods_image_url">
            </div>
            <div class="text flex-items">
              <p>活动编号 : <span>{{goods_info.goods_id}}</span></p>
              <p>店铺名称 : <span>{{goods_info.relevance_name}}</span></p>
              <p>商品价格 : <span class="mainFontColor">￥{{goods_info.goods_buy_price}}</span></p>
              <p>拍下件数 :<span class="mainFontColor">{{goods_info.goods_buy_num}}件</span></p>
              <p>拍下总价格(含邮费) : <span class="mainFontColor">￥{{goods_info.goods_price}}</span></p>
              <p v-if="goods_info.goods_product==1">活动奖励 : <span>拍下的商品</span></p>
              <p v-if="goods_info.goods_product==2">活动奖励 : <span>获得小礼品</span></p>  
            </div>
          </div>
          
           <div class="flex mainBg marginTopHeight "></div>
          <div class="detailList">
            
            <ul>
                <li @click="switchover(0)"><div :class="{ active: 0 == active}" >活动详情</div></li>
                <li @click="switchover(1)"><div :class="{ active: 1 == active}">新手必看</div></li>
            </ul>
            <div class="flex mainBg marginTopHeight "></div>   


              
          <!-- 晒图  1 晒图  0不晒图 -->    
        <nav   v-if="is_img==1">
          <div class="status">
              <div class="sta-group">
            
                <div class="sta-txt">
                    <!-- 0 放弃  10去提交 ||  20带拍摄  30带选图 || 35待评价 待确认45 ||  40已完成   || 50待售后 -->

                  <i  class="sp1 sp-success  " :class="{ mainBgColor: orderList.order_state==0 ||orderList.order_state==10  || orderList.order_state==20 ||orderList.order_state==30||orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40 }"></i>
                  <span class="num1 num mainBgColor" >1
                    <span class="">申请</span>

                  </span>
                </div>
                <div class="sta-txt">
                  <i  class="sp2 sp-success" :class="{ mainBgColor: orderList.order_state==20 ||orderList.order_state==30||orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40 }"></i>
                   <span class="num2 num" :class="{  mainBgColor: orderList.order_state==0 ||orderList.order_state==10  || orderList.order_state==20 ||orderList.order_state==30||orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40 }">2
                      <span  style="width:102px" class="">找到宝贝并付款</span>
                   </span>
                 
                </div>
                <div class="sta-txt">
                  <i  class="sp3 sp-success" :class="{ mainBgColor: orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40  }"></i>
                   <span class="num3 num" :class="{ mainBgColor: orderList.order_state==20 ||orderList.order_state==30||orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40 }">3
                     <span  class="span3">拍摄图片</span>
                   </span>
                  
                </div>
                <div class="sta-txt">

                  <i  class="sp4 sp-success" :class="{ mainBgColor: orderList.order_state==40 }"></i>
                   <span class="num4 num" :class="{mainBgColor: orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40 }">4
                     <span  class="span4">评价</span>
                   </span>
                  
                </div>
                <div class="sta-txt">
                    <span class="num5 num" :class="{ mainBgColor: orderList.order_state==40 }">5
                      <span  class="span5">完成</span>
                    </span>
                  
                </div>
              </div>
            </div>

        </nav>

        <nav   v-if="is_img==0">

          
          <!-- 晒图  1 晒图  0不晒图 -->
          <div class="status">
              <div class="sta-group sta-group-no-img ">
            
                <div class="sta-txt w25">
                    <!-- 0 放弃  10去提交 ||  20带拍摄  30带选图 || 35待评价 待确认45 ||  40已完成   || 50待售后 -->

                  <i  class="sp1 sp1-no-img sp-success  " :class="{ mainBgColor: orderList.order_state==0 ||orderList.order_state==10  || orderList.order_state==20 ||orderList.order_state==30||orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40 }"></i>
                  <span class="num1 num mainBgColor" >1
                    <span class="">申请</span>

                  </span>
                </div>
                <div class="sta-txt  w25 ">
                  <i  class="sp2 sp2-no-img sp-success" :class="{ mainBgColor: orderList.order_state==20 ||orderList.order_state==30||orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40 }"></i>
                   <span class="num2 num2-no-img num" :class="{  mainBgColor: orderList.order_state==0 ||orderList.order_state==10  || orderList.order_state==20 ||orderList.order_state==30||orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40 }">2
                      <span  style="width:102px" class="">找到宝贝并付款</span>
                   </span>
                 
                </div>
                <!-- <div class="sta-txt">
                  <i  class="sp3 sp-success" :class="{ mainBgColor: orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40  }"></i>
                   <span class="num3 num" :class="{ mainBgColor: orderList.order_state==20 ||orderList.order_state==30||orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40 }">3
                     <span  class="span3">拍摄图片</span>
                   </span>
                  
                </div> -->

                <div class="sta-txt   w25" >
                  <i  class="sp4 sp4-no-img spa4-no-img sp-success" :class="{ mainBgColor: orderList.order_state==40 }"></i>
                   <span class="num4 num" :class="{mainBgColor: orderList.order_state==35 ||orderList.order_state==45||orderList.order_state==40 }">4
                     <span  class="span4">评价</span>
                   </span>
                  
                </div>
                <div class="sta-txt  w25" >
                    <span class="num5 num5-no-img  num" :class="{ mainBgColor: orderList.order_state==40 }">5
                      <span  class="span5">完成</span>
                    </span>
                  
                </div>
              </div>
            </div>

        </nav>


       </div>


          
        </div>
        
      </div>
      
    
     <div class="flex mainBg marginTopHeight " ></div>
      <!-- <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        ref="my_scroller"> -->
          <div class="main bgWrite" :class="{ display: 1 == active}"> 
            <!-- 浏览并付款 orderList.order_state==10" -->
            <div v-if="orderList.order_state==10||orderList.order_state==0">
                <div class="browse ">

                <!-- 找到宝贝  二维码进店 orderList.port_type==4 -->
                <div v-if="orderList.port_type==4">
                  <p>
                      <i class="dot"></i> <span  class="mainSmallBtn">找到宝贝</span>
                    </p>
                    <p>
                      <span>1.长按下边二维码图片，长按图片保存到手机</span>
                    </p>
                    <p class="goodsImg mainBoderBottom bottom-top">
                      <img v-if="orderList.port_qr_code" :src="ercodePic">
                    </p>
              
                    <p>
                      <span>2.返回使用手机扫一扫，选择刚刚保存的二维码图片</span>
                    </p>
                    
                    <p class="mainBoderBottom bottom-top">
                      <a href="javascript:;">如何返回使用微信扫一扫二维码图片？</a>
                    </p>
                  
                </div>
      
                <!-- 浏览宝贝  推荐入口  orderList.port_type==3-->
                <!-- <div v-if="orderList.port_type==3">
                      <p>
                        <i class="dot"></i><span  class="mainSmallBtn">浏览宝贝</span>
                      </p>
                      <p>
                        <span>请打开</span>
                        <span  class="mainSmallBtn">拼多多小程序</span>
                      </p>
                      <p>
                        <span>检查已登录的账号为：</span>
                        <span  class="mainFontColor">{{goods_info.buy_name}}</span>
                      </p>
                      <p>
                        <span>从</span>
                        <span  class="mainFontColor">推荐栏</span>
                        <span >找到需要付款的商品</span>
                      </p>
                      <p class="mainBoderBottom bottom-top">
                        <a href="javascript:;">找不到？换一种入口</a>
                      </p>
                      <p class="mainBoderBottom bottom-top">
                        <span>提示：</span>
                        <span >从推荐栏找不到的时候，建议多刷新2次就会出现了，从推荐栏入口找到宝贝可以额外奖励 </span>
                        <span  class="mainFontColor">+1.5金币</span>
                      </p>
                      <p >
                        <span>请按照下图的筛选条件找到活动产品</span>
                      </p>
                      <p class="goodsImg mainBoderBottom bottom-top">
                        <img v-if="goods_info.port_condition_img" :src="goods_info.port_condition_img">
                      </p>
                </div> -->

                <!-- 浏览宝贝 微信入口  orderList.port_type==3-->
                <div v-if="orderList.port_type==3">
                      <p>
                        <i class="dot"></i><span  class="mainSmallBtn">找到宝贝</span>
                      </p>
                      <p>
                        <span>长按下方链接进行复制，使用微信打开</span>
                      </p>
                      <p class="mainBoder  mainBoder padWrap tip noticeText"  >


                         <span class="inviteCode" :data-clipboard-text="port_link">
                          {{port_link}}
                        </span>
                        <!-- <textarea name="" id="" cols="30" rows="10" class="noticeText" placeholder="https://www.cnblogs.com/GuZhenYin/p/6737460.html"></textarea> -->
                        <!-- <span id="">"https://www.cnblogs.com/GuZhenYin/p/6737460.html"</span> -->
                       <!-- <input type="text" id="success_form_input" readonly="readonly" v-model="link"/> -->
                      <!-- <button ref="copy" data-clipboard-action="copy" data-clipboard-target="#success_form_input" @click="copyLink">复制</button> -->
                        <!-- <button class="copyBtn" :data-clipboard-text = "https://www.baidu.com/" type="text">复制地址</button> -->
                     
                     </p>
                      <p class="mainBoderBottom bottom-top">
                        <a href="javascript:;">如何使用微信打开链接？</a>
                      </p>
                    
                </div>


                <!-- 浏览宝贝  关键进店  orderList.port_type==1||orderList.port_type==2-->
                <div  v-if="orderList.port_type==1||orderList.port_type==2">
                    <p>
                    <i class="dot"></i> <span  class="mainSmallBtn">浏览宝贝</span>
                  </p>
                  <p>
                    <span>请打开</span>
                    <span  class="mainSmallBtn">拼多多小程序</span>
                  </p>
                  <p>
                    <span>检查已登录的账号为：</span>
                    <span  class="mainFontColor">{{goods_info.buy_name?goods_info.buy_name:'无'}}</span>
                  </p>
                  <p>
                    <span>搜索关键词：</span>
                    <span  class="mainFontColor">{{goods_info.port_keyword?goods_info.port_keyword:'无'}}</span>
                  </p>
                  <p class="mainBoderBottom bottom-top">
                    <a href="javascript:;">点击查看，拼多多搜索框在哪里？</a>
                  </p>
                  <p class="mainBoderBottom bottom-top">
                    <span>活动产品所处大概位置：</span>
                    <span  class="mainFontColor">{{goods_info.port_rank?goods_info.port_rank:'无'}}</span>
                  </p>
                  <p >
                    <span>请按照下图的筛选条件找到活动产品</span>
                  </p>
                  <p class="goodsImg mainBoderBottom bottom-top">
                      <!-- <img v-if="goods_info.port_condition_img" :src="goods_info.port_condition_img"> -->
                      <img v-if="goods_info.port_condition_img" :src="port_condition_img ">
                  </p>

                </div>
              
                

                <!-- 核对店铺 -->
                <p>
                  <i class="dot"></i><span  class="mainSmallBtn">核对店铺</span>
                </p>
                <p>
                  请核对店铺名，若拍错店铺进行付款，则违反了平台规则，平台有权对账户扣除金币进行处罚
                </p>
                <p>
                  <span>店铺名：</span>
                  <span  class="mainFontColor">{{goods_info.relevance_name?goods_info.relevance_name:'无'}}</span>
                </p>

                <p class="mainBoderBottom bottom-top">
                <a href="javascript:;">如何找到正确的店铺名称？</a>
                </p>
                <p>
                  <i class="dot"></i><span  class="mainSmallBtn">核对店铺</span>
                </p>
                <p>
                  请在下方空格处补全店铺名称，严禁咨询掌柜客服获取“店铺名称”（违者永久拉黑）；该步骤可有效避免付款错误宝贝，如果核对多次依然错误，请放弃活动并说明放弃理由
                </p>
                <p >
                
                  <!-- 美
                  <input type="text"  class="input">
                  星
                  <input type="text"  class="input">
                  专
                  <input type="text"  class="input" >
                  店</br> -->
                  
                 <!-- <a v-for="(item,index) in shopnameArreven" :key="index" :id="index" class="font14 coloraa333" style="border:none" >
                  <span class="color333" style="padding: 0 5px">{{item}}</span>
                  <input type="text"  class="input" v-model="shopNameStr[index]">
                </a> -->
                 <!-- <span>{{shopName}}</span> -->

                 <a v-if="shopnameArr1" v-for="(item,index) in shopnameArr1" :key="index" :id="index" class="font14 coloraa333" style="border:none" >
                  <span class="color333" style="padding: 0 5px" :class="{'actNone': index%2 == 1 }">{{item}}</span>
                  <input type="text"  class="input" :disabled="disabledStatus"   :class="{'actNone': index%2 !== 1 }"  v-model.trim="listData[index]" >
                </a>
                 


                </p>

                <p class="mainBoderBottom bottom-top">
                  <a href="javascript:;">如何找到正确的店铺名称？</a>
                </p>
                <p class="   checkStore textC" @click="checkShop">
                  <span class="mainSmallBtn">核对店铺名称</span>
                </p>
                <p class="mainBoder  mainBoder padWrap">
                  <span >提示：若店铺名称多次无法核对正确，请在10分钟内主动点击放弃活动，若120分钟后超时才自动放弃，将会影响活动完成率，平台有全对账户进行处罚或扣除金币</span>
                  <span  class=" abandon" @click="ToGiveUp ">放弃活动</span>
                </p>
                <div class="check mainBgColor">
                      <div class="mainBoder  mainBoder padWrap">
                      <p >核对店铺名！！！</p>
                      <span >请您核对店铺名无误后，才可以执行下面的操作，避免发生拍错店铺或宝贝等情况，从而引发售后问题，如发生此类售后问题，平台有权对账户进行处罚或扣除金币</span>
                    </div>
                </div>

                <p>
                  <i class="dot"></i><span  class="mainSmallBtn">执行活动</span>
                </p>
                <p>
                  <span>找到宝贝，并且上传搜索关键词的截图</span>
                </p>
                <p class="goodsImg">
                    <img v-if="keyWord" :src="keyWord">
                    <img v-else src="~assets/images/user/uploading.png">
                    <input ref="keyWord" class="file inputImg inputImg" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update($event, 'keyWord')"/>
                </p>
                <p class="mainBoderBottom bottom-top">
                  <a href="javascript:;">点击查看正确的搜索关键词截图示例图？</a>
                </p>

                <p>
                  <i class="dot"></i><span  class="mainSmallBtn">停留时间</span>
                </p>
                <p class="mainBoderBottom bottom-top">
                  <span>活动建议：</span>
                  <span  class="mainFontColor" v-if="orderList.port_remain == 1">进入宝贝后浏览1-2分钟</span>
                  <span  class="mainFontColor" v-if="orderList.port_remain == 0">不限</span>
                </p>
                <p >
                  <span>收藏宝贝，并且上传收藏宝贝的截图</span>
                </p>
                <p class="mainBoderBottom bottom-top">
                  <span  class="mainFontColor ">注意：</span>
                  <span>收藏宝贝后建议30天内不要取消收藏，取消后会导致或许无法完成掌柜发布的收藏夹入口活动，私自“取消收藏宝贝”行为将会被平台处罚或扣除金币</span>
                </p>
                <p class="goodsImg">
                     <img v-if="collection" :src="collection">
                    <img v-else src="~assets/images/user/uploading.png">
                    <input class="file inputImg inputImg" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update($event, 'collection')"/>
                </p>
                <p class="mainBoderBottom bottom-top">
                  <a href="javascript:;">点击查看正确的搜索关键词截图示例图？</a>
                </p>

                <p>
                  <i class="dot"></i><span  class="mainSmallBtn">核对信息</span>
                </p>
                <p>
                  <span>请确认该店铺名为：</span>
                  <span  class="mainFontColor">{{goods_info.relevance_name}}</span>
                </p>
                <p class="mainBoderBottom bottom-top">
                  <span  class="mainFontColor ">注意：</span>
                  <span>该步骤违规犯错率极高！产生过大量违规罚金！</span>
                </p>

                <p >
                  <span>需要付款的产品规格：</span>
                </p>
                <p class="goodsImg">
                  <img  v-if="goods_info.goods_suk_img!= 0" :src="goods_info.goods_suk_img|url">
                </p>
                <p class="mainBoderBottom bottom-top">
                  <span  class="mainFontColor ">注意：</span>
                  <span>请按照建议的规格（颜色）（型号）等选项进行付款，如果掌柜没有建议规格，试客可根据个人喜好选择和活动详情价格一致的规格进行付款</span>
                </p>
                <p class="bottom-b">
                  <span>下单类型:</span>
                  <span  class="mainFontColor" v-if="orderList.goods_type==1">有团参团，无团开团</span>
                  <span  class="mainFontColor" v-if="orderList.goods_type==2">去参团 </span>
                  <span  class="mainFontColor" v-if="orderList.goods_type==3">一建开团</span>
                  <span  class="mainFontColor" v-if="orderList.goods_type==4">单独购买</span>
                </p>
                <p>
                  <span>需要付款的产品价格（元）</span>
                  <span  class="mainFontColor">￥{{goods_info.goods_buy_price}}</span>
                </p>
                <p>
                  <span>单笔需要拍下件数为（件）:</span>
                  <span  class="mainFontColor">{{goods_info.goods_buy_num}}件</span>
                </p>
                <p>
                  <span>付款总价格为（含邮费/元）:</span>
                  <span  class="mainFontColor">￥{{goods_info.goods_price}}</span>
                </p>
                <p class="mainBoderBottom bottom-top">
                  <span  class="mainFontColor ">注意：</span>
                  <span >请如果实际需要付款的价格高于上方显示的总价格，但已确认宝贝无误，数量无误，可先输入上方的总价格进行提交后再到【我的】--【金币补差】处申请补差即可，如果实际付款价格低于上方显示的价格，请按实际付款价格进行提交</span>
                </p>
                <p >
                  <span >下单注意事项：</span>
                </p>
                <p class="mainBoder  mainBoder padWrap tip">
                  <!-- <textarea name="" id="" cols="30" rows="10" class="noticeText" placeholder="抓取商家填写的下单注意事项。抓取商家填写的下单注意事项。抓取商家填写的下单注意事项。抓取商家填写的下单注意事项。"></textarea> -->
                  <span>抓取商家填写的下单注意事项。抓取商家填写的下单注意事项。抓取商家填写的下单注意事项。抓取商家填写的下单注意事项。</span>
                </p>
                <div class="flex">
                  <p class="flex-item">
                    填写实际支付金额：
                  </p>
                  <p class="flex-item2">
                    <input type="text" class="moneyInput" v-model="moneyInput">
                      <a href="javascript:;">点击查看正确的搜索关键词截图示例图？</a>
                  </p>
                </div>

                <div class="flex mainBoderBottom bottom-top">
                  <p class="flex-item">
                    填写订单编号：
                  </p>
                  <p class="flex-item2">
                    <input type="text" class="moneyInput payOrder" v-model="payOrder">
                      <a href="javascript:;">点击查看如何找到正确的订单编号？</a>
                  </p>
                </div>

                <p >
                  <span>付款后，上传付款成功的截图</span>
                </p>
                <p class="goodsImg  bottom-top " :data-img="payEnd">
                    <img v-if="payEnd" :src="payEnd|url">
                    <img v-else src="~assets/images/user/uploading.png">
                    <input class="file inputImg inputImg" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update($event, 'payEnd')"/>
                </p>
                <p>
                <a href="javascript:;">点击找到正确的付款成功截图？</a>
                  
                </p>
                <p>
                  <button class="mainBtn bottom-top" @click="updatePayStatus">我已确认付款，提交</button>
                </p>
              </div>
              
              <div  v-if="orderList.order_state==50" >
                  <div class="flex  bottom-top  bottom-b after-sale " >
                    <p class="flex-item">
                    <img src="~assets/images/user/err.png">
                    </p>
                    <div class="flex-item5 font12 ">
                      <p class="color666 lineH40">该活动被发起售后问题</p>
                      <p class="color666 lineH40">请主动联系多多试用平台客服进行处理</p>
                    </div>
                </div>
                <div class="mainBoder  mainBoder padWrap service" >
                  <span class="mainFontColor">多多试用客服中心</span>
                  <div class="flex color666 font12 ">
                    <div class="flex-item3">
                      <p class="lineH40">如活动被发起售后问题，请联系右侧QQ客服，可以长按二维码进行识别，初次联系客服时，请发送您注册多多试用账户的手机号。</p>
                      <p class="lineH40"><span class="mainFontColor">QQ号：</span>123456789</p>
                      <p><span class="mainFontColor">电话 ：</span>123456789101</p>
                    </div>
                    <p class="flex-item2 "> 
                      <img src="~assets/images/user/ercodeQQ.png">
                    </p>
                    
                  </div>
                </div>
              </div>

            </div>

            <!-- 拍摄 orderList.order_state==20 ||  orderList.order_state==45"-->
            <div v-if="orderList.order_state==30 ||orderList.order_state==20 && is_img==1">
                   <!-- 拍摄图片 -->
              <div class="browse shoot">

                <p>
                   <i class="dot"></i><span  class="mainSmallBtn">上传图片</span>
                </p>
                <p >
                  <span>试客在签收拍摄产品后，请在48小时内拍摄并提交9张产品的图片</span>
                </p>
                <p class="goodsImg mainBoderBottom bottom-top shootImg ">
                   
                 <a href="javascript:;"   style="border:none" class="inlineBlock imguploadAll"   v-for="(item,index) in commentAllImg" :key="index" >
                   <i @click="delectImg(index)" class="delectImg"></i><img v-if="item" :src="item"></a>
              
                  <a class="pRelative addImg inline"  style="border:none" v-if="addImgBtn">
                      <img  src="~assets/images/user/uploading.png" >
                      <input class="file inputImgall " name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update($event, 'commentPIcs')"/>
                  </a>
                </p>
                <div class="font12 method">
                  <p >
                  <span  class="mainFontColor ">注意：</span>
                  <span>若图片上传失败，一下方法可大大提高成功率</span>
                </p>
                <p >
                  <span  class="mainFontColor ">方法一：</span>
                  <span>将图片发至微信聊天窗口，在保存到相册进行上传</span>
                </p>
                <p >
                  <span  class="mainFontColor ">方法二：</span>
                  <span>将相册的图片一张张进行上传，勿同时勾选9张，若仍然无法上传成功，请用电脑进行访问上传</span>
                </p>
                <p>
                  <button class="mainBtn btn pic" :class="{'picUpdataBtn': updatePicState}" @click="updateImgStatus">提交</button>
                </p>
                </div>
              </div>

            </div>
          
            <!-- 评价 orderList.order_state==35-->
            <div v-if="orderList.order_state==35 ||orderList.order_state==45">
              <div class="browse shoot comment" >
              <div class="goods_appraise">

              </div>
                  <p>
                   <i class="dot"></i><span  class="mainSmallBtn">评价宝贝</span>
                </p>
                <p >
                  <span>左右的评价，请务必认真编辑，若发现存在敷衍编辑评价的行为，平台将有权对账号处罚或拉黑处理。</span>
                </p>
                <p class="bottom-top mainBoderBottom">
                  <span>评价关键词：</span>
                  <span class="style">{{goods_appraise_info}}</span>
                  <!-- <span class="style">质量好</span>
                  <span class="style">无色差</span> -->
                </p>
                <p >
                  <span >填写评价内容：</span>
                </p>
                <p class="mainBoder  mainBoder padWrap tip">
                     <textarea name="" id="" cols="30" rows="10" class="noticeText" v-model="commentContent" placeholder="提示：请认真填写评价内容，平台会对您的文字内容进行打分，评分越高，可领取的活动将会越多，若多次出现敷衍行为，平台将有权对您的账户处罚或拉黑"></textarea>

                  <!-- <span >提示：请认真填写评价内容，平台会对您的文字内容进行打分，评分越高，可领取的活动将会越多，若多次出现敷衍行为，平台将有权对您的账户处罚或拉黑</span> -->
                </p>
                <div v-if="is_img==1">
                <p>
                  <span  class="mainSmallBtn">晒图建议</span>
                </p>
                <p>
                  <span>掌柜建议了下方买家秀图片，请根据建议进行晒图</span>
                </p>
          
                <p class="goodsImg mainBoderBottom bottom-top shootImg" >
                 <img v-if="appraiseInfoImg" :src="i" v-for="(i,idx) in appraiseInfoImg.split(',')" :key="idx" class="commntImg">
                </p>
                </div>

                 


                <p>
                  <span  class="mainSmallBtn">上传评价截图</span>
                </p>
                <p >
                  <span>请填写完上方评价内容后复制，粘贴到拼多多对应的活动商品进行</span>
                </p>
                <p class="goodsImg">
                     <img v-if="comment" :src="comment">
                    <img v-else src="~assets/images/user/uploading.png">
                    <input class="file inputImg inputImg" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update($event, 'comment')"/>
                </p>
                <p>
                <a href="javascript:;">点击找到正确的付款成功截图？</a>
                </p>
                    <p>
                  <button class="mainBtn btn" :class="{'picUpdataBtn': updatePicState}" @click="updateAppraiseAStatus">提交</button>
                   <!-- <button class="mainBtn btn pic" :class="{'picUpdataBtn': updatePicState}" @click="updateImgStatus">提交</button> -->
                </p>
              </div>
            </div>

            <!-- 完成 orderList.order_state==40"-->
            <div v-if="orderList.order_state==40"> 
              <div class="apply complete" >
                  <p>
                    <span  class="找到宝贝">晒图建议</span>
                  </p>
                    <p>活动编号：<span class="mainFontColor">{{goods_info.goods_id}}</span></p>
                    <p>活动类型：<span  class="mainFontColor">{{goods_pdd_name}}</span></p>
                    <p>活动奖励：<span  class="mainFontColor">￥{{return_money}}</span></p>
                    <p><span  class="mainFontColor">恭喜你已完成该活动！！！</span></p>
                    <p class="send">活动奖励已发放至您的平台账号，如果后续发现该活动存在售后问题，平台客服联系您时，请积极配合。<span>无</span></p>
                </div>
              </div>
            </div>



        <!-- </scroller> -->


          <transition name="fade" v-if="ToGiveUpPage">
              <div class="mdialog" > 
              <div class="content" >
                  <div class="head">
                    <h3>请填写放弃理由</h3>
                  </div>
                  <div class="main">
                    <textarea name="" id="" cols="30" rows="10" v-model="GiveUpPageContent" placeholder="请输入理由，仅限22字"  class="reason">

                    </textarea>
                      <!-- <p v-html="data"></p> -->
                    <!-- <p >完善拼多多资料并认证，可立即参与平台活动</p> -->
                  </div>
                  <div class="foot foot2 flex">
                    <p class="dialog-item flex-item ok" @click="determineGiveUp">确定放弃</p>
                    <p class="flex-item cancel" @click="cancelGiveUp">取消</p>
                    
                  </div>
                </div> 
              </div>
          </transition> 
           <div :class="{ display: 0 == active}" class="newPer" style="background:#fff;padding:10px;">
              <h3>
                | 什么是多多零元购？
              </h3>
              <p>多多零元购，是与拼多多商家联合推出的一种新玩法，对多多零元购用户开放申请，只需在限定名额下，成功申请并付款即获得试用资格。在拿到商品后，规定的时间内提交买家秀图片或文字评价。任务完成后，您将可以享受全部金额返还</p>
              <h3>
                | 试用流程：
              </h3>
              <p>1、申请活动成功， 按要求下单并上传相关截图</p>
              <p>①买家申请成功后，请在规定的时间内按提示提交截图（付款截图或浏览截图）</p>
              <p>②如果没有在规定的时间内提交截图信息，系统将视为自动放弃</p>


    
              <p class="martop">2、收货，按提示进行评价（部分任务需要拍摄买家秀图片后再评价） </p>

               <p> ①付款后，商家掌柜会把商品（或小礼品）免费送给您，不用退回   </p>
               <p>②注意查看任务是否需要拍摄买家秀图片，若需要拍摄买家秀图片，请在收到货之后48小时内提交拍摄图片；若不需要，请在7天（或10天）后进行文字评价  </p>

             <h3> 3、任务完成，平台自动返款 </h3>
             <p> 任务完成后，平台将会把你付款的金额全部返还到您注册的平台账户上，您可以进行提现</p>

            <h3> | 如何增加我能领取商品的数量？</h3>
            <p> 多多零元购平台提供了多种增加数量的途径，只要您</p>
            <p>  1)	多领取浏览专区任务</p>
             <p> p2)	多邀请好友一起参与</p>
              <p> 3)	多登陆，及时绑定微信</p>
               <p>4)	认真填写评价内容</p>
              <p> 您可以领取到的商品将会越来越多</p>

           <h3>  | 注意事项：  </h3>
            <p>1)	禁止联系掌柜商家，违规者，将受到平台处罚或拉黑处理</p> 
          <p> 2)	任务过程中，如有疑问，请联系 <span style="color:#c00">多多零元购平台客服QQ：123456789</span>处理
            （工作时间：周一到周六9:00-18:00）</p> 



           
            </div>
          <!-- <app-footer></app-footer> -->
  
     <!-- <div :class="{ display: 1 == active}">
         rtret
       </div> -->
    </div>

</template>

<script>
import Index from "./index.js";
export default Index;
</script>
