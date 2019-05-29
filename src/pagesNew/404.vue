<template>
  <div class="errorPage">
    <div class="errorPage_content">
        <p class="errorPage_img">
            <img src="../assets/image/404.jpg">
        </p>
        <div class="errorPage_text">
            <p class="page-container">抱歉，您访问的页面出错了</p>
            <p class="img">
                <img src="../assets/image/sx.jpg" style="vertical-align:middle;">刷新页面
            </p>
        </div>
    </div>        
  </div>
</template>

<style>
  .errorPage{
    width: 100%;
    margin: 0 auto;
  }
  .errorPage_content{
    width: 1200px;
    margin: 10% auto 0;
    text-align: center
  }
  .errorPage_text .img{
    font-size: 24px;
    color: #f60;
  }
  .errorPage_text{
    padding-top: 10px;
  }
  .errorPage .page-container {
    font-size: 22px;
    /* text-align: center; */
    color: #444;
  }
</style>
