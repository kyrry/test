<template>
	
	<div>
		<transition name="fade" v-if="message==='err'" >
		<div class="mdialog"    >
			<div class="content"  >
		    <div class="head">
					<img src="~assets/images/user/err.png">
		    	<h3>申请失败</h3>
		    </div>
		    <div class="main textC">
		    	<p v-html="data"></p>
		    </div>
		    <div class="foot">
		      <p class="dialog-item" @click="confirm">确定</p>
		    </div>
			</div>
	  </div>
	</transition>
<transition name="fade" v-if="message==='cancel'">
		<div class="mdialog"  :class="{ 'is_none': isNone }" > 
		 <div class="content" >
		    <div class="head">
					<img src="~assets/images/user/err.png">
		    	<h3>完善资料</h3>
		    </div>
		    <div class="main">
						<p v-html="data"></p>
		    	<!-- <p >完善拼多多资料并认证，可立即参与平台活动</p> -->
		    </div>
		    <div class="foot foot2 flex">
		      <p class="dialog-item flex-item ok" @click="determine">确定</p>
		      <p class="flex-item cancel" @click="cancel">取消</p>
		      
		    </div>
			</div> 
	  </div>
 </transition> 
<transition name="fade" v-if="message==='success'">
		<div class="mdialog"  :class="{ 'is_none': isNone }" > 
		 <div class="content" >
		    <div class="head">
					<img src="~assets/images/user/succuss.png">
		    	<h3>提交成功</h3>
		    </div>
		    <div class="main">
						<p > 管理员将会在48小时之内审核完成请先学多多试用平台的活动流程</p>
		    	<!-- <p >完善拼多多资料并认证，可立即参与平台活动</p> -->
		    </div>
		    <div class="foot foot2 flex">
		      <p class="dialog-item flex-item ok" @click="confirm">确定</p>
	
		    </div>
			</div> 
	  </div>
 </transition> 

	</div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
