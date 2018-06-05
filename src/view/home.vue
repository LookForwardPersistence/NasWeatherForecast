<template>
  <div>
    <div class="header"></div>
    <section class="main-box">
    <div class="air-box">
      <img src="../assets/images/b/1.png" class="icon-air" />
      <p class="air-time"><span>2018.06.05</span><span>农历十月十五</span></p>
      <p class="air-num">27<i>℃</i></p>
      <b class="air-city">深圳</b>
      <ul class="air-info">
        <li>空气优 PM2.5 29</li>
        <li>东南风3级</li>
        <li>湿度：58%</li>
      </ul>
    </div>
      <div class="tip-box">
        <div class="air-trend">
          <h3 class="air-trend-tit">空气质量趋势</h3>
          <div class="air-trend-ctn">
            <canvas id="canvas" class="canvas_style"></canvas>
            <div class="chart" id="barchart"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="week-box">
      <div class="date-box">
        <img src="../assets/images/b/0.png"/>
      </div>
      <div class="date-box"></div>
      <div class="date-box"></div>
      <div class="date-box"></div>
      <div class="date-box"></div>
    </section>
  </div>
</template>

<script>
  export default {
    data(){
      return {

      }
    },
    methods: {
      init(){
        var serieChart=document.getElementById("barchart");
        var aqiChart=echarts.init(serieChart);
        var xdata=[];
        var ydata=[];
        data=sortByKey(data.data,"MONITORTIME");
        for(var i in data){
          ydata.push(data[i].AQIVALUE);
          var dates=moment(data[i].MONITORTIME).add(1,"hours").format('YYYY年MM月DD日 HH时');

          var arr=dates.split(' ');
          xdata.push(arr[1]);
        }
        aqiChart.setOption(getOptionNew('line',xdata,ydata,"AQI"));
      }
    }
  }
</script>

<style>
  .header{
    height: 80px;
    background: #58b6ff ;
  }
  .main-box ,.week-box{
   display: flex;
   -webkit-display: flex;
   flex-direction: row;
   -webkit-flex-direction: row;
   justify-content: center;
   -webkit-justify-content: center;
   align-items: center;
   -webkit-align-items: center;
   width: 100%;
    min-width: 100px;
 }
  .date-box{
    background: #58b6ff url(../assets/images/bg_shine.png) no-repeat;
    height: 200px;
    width: 20%;
    margin: 10px 3px;
    position: relative;
  }
  .air-box {
    background: #58b6ff url(../assets/images/bg_shine.png) no-repeat left top;
    background-size: 204px 225px;
    height: 235px;
    margin-top: 10px;
    margin-right: 5px;
    /*margin-right:5px ;*/
    width: 45%;
    position: relative;
  }

  .icon-air {
    position: absolute;
    left: 15px;
    top: 15px;
    width: 50px;
    height: 40px;
  }

  .air-time {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .air-time span {
    display: block;
    font-size: 14px;
    color: #fff;
    line-height: 1.3;
  }

  .air-num {
    font-size: 70px;
    color: #fff;
    position: absolute;
    /*top: 65px;*/
    left: 15px;
  }

  .air-num i {
    font-size: 36px;
  }

  .air-city {
    position: absolute;
    right: 15px;
    top: 75px;
    border: 1px solid #fff;
    border-radius: 300px;
    width: 54px;
    height: 21px;
    text-align: center;
    line-height: 21px;
    color: #fff;
    font-size: 14px;
  }

  .air-info {
    position: absolute;
    top: 155px;
    left: 5px;
    right: 5px;
    border-top: 1px dashed #fff;
    padding: 5px 10px 0;
  }

  .air-info li {
    color: #fff;
    font-size: 14px;
    list-style: none;
  }

  .tip-box {
    background: #58b6ff url(../assets/images/bg_shine.png) no-repeat;
    /*background-size: 204px 225px;*/
    height: 235px;
    margin-top: 10px;
    margin-left:5px ;
    width: 45%;
    position: relative;
  }

</style>
