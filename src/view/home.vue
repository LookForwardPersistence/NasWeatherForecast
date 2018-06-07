<template>
  <div>
    <selection class="header-box">
      <div class="icon-box">
      <img src="../assets/images/logo.png" class="img-logo"/>
        <span>星云看天气</span>
      </div>
      <div class="input-box">
      <el-input class="input-input input-width-select" v-model="cityName" @keyup.enter.native="search()" placeholder="请输入城市名">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
      </div>
    </selection>
    <section class="main-box">
    <div class="air-box">
      <img :src=currData.weather_icon class="icon-air" />
      <img :src=currData.weather_icon1 class="icon-air1" />
      <p class="air-time"><span>{{currData.days}}</span><span>{{currData.week}}</span></p>
      <p class="air-num">{{currData.temp_high}}<i>℃</i></p>
      <P class="air-weather">{{currData.weather}}</P>
      <b class="air-city">{{currData.citynm}}</b>
      <ul class="air-info">
        <!--<li>天气：{{currData.weather}}</li>-->
        <li>风级：{{currData.winp}}</li>
        <li>气温：{{currData.temperature}}</li>
      </ul>
    </div>
      <div class="tip-box">
        <div class="air-trend">
          <div class="air-trend-ctn">
            <div class="chart" id="gotobedbar"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="week-box">
      <div class="date-box" v-for="em in weekData">
        <img :src=em.weather_icon class="date-icon" />
        <ul class="air-info-date">
          <li>天气：{{em.weather}}</li>
          <li>风级：{{em.winp}}</li>
          <li>气温：{{em.temperature}}</li>
          <li>日期：{{em.days}}</li>
          <li>{{em.week}}</li>
        </ul>
      </div>
    </section>
    <section class="bottom-box">
      <span>Copyright © 2018-2019 fqhua_5@sin.cn</span>
    </section>
  </div>
</template>

<script>
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import "../assets/js/nebPay"
  import "../assets/js/nebPay"
  import {getWeatherData} from "../api/Api"
  import echarts from 'echarts'
  import macarons from 'echarts/theme/macarons';
  import data from '../assets/data/data.json';


  export default {
    components: {
      ElButton,
      ElInput
    },
    data(){
      return {
        cityName: '',
        currData: [],
        weekData:[]
      }
    },
    computed:{

    },
    created(){
      var localCity = new BMap.LocalCity();
      localCity.get(myFun); //异步获得当前城市
      var cName;
      function myFun(result){
        cName = result.name.replace('市', '');
        localStorage.setItem("cityName", cName);
      }
    },
    mounted(){
        this.cityName = localStorage.getItem("cityName")
        this.search();
    },
    methods: {
      drawbar(id,xData,dayData,nightData) {
      let o = document.getElementById(id);
      let height = document.documentElement.clientHeight;
      height -= 420;
      o.style.height= height+"px";
      this.chart = echarts.init(o,'macarons');
      const option = this.getOption(xData,dayData,nightData)
      this.chart.setOption(option);
    },
      getOption(xData,dayData,nightData){
        var option = {
          title: {
            text: '七天气温趋势',
            subtext: '气温（℃）',
            left:'center',
            color:'red'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['白天', '晚上'],
            orient:'vertical',
            left:'right',
            top:'middle',//如果 top 的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐。
            itemGap:20
          },
          toolbox: {
            show: true,
            orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
            // 'horizontal' ¦ 'vertical'
            x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
                                       // 'center' ¦ 'left' ¦ 'right'
                                       // ¦ {number}（x坐标，单位px）
            y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                       // 'top' ¦ 'bottom' ¦ 'center'
                                       // ¦ {number}（y坐标，单位px）
            color: ['#d2691e', '#22bb22', '#4b0082', '#1e90ff'],
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          dataZoom: {
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: xData
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '白天',
              type: 'line',
              tiled : '气温',
              areaStyle: {normal: {}},
              data: dayData
            },
            {
              name: '晚上',
              type: 'line',
              tiled : '气温',
              areaStyle: {normal: {}},
              data: nightData
            }
          ]
        };

        return option;
      },
      getFormatDate: function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var formatdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return formatdate;
      },
      weekLine(data){
        var serieChart=document.getElementById("barchart");
        var aqiChart=echarts.init(serieChart);
        var xdata=[];
        var ydata=[];
        for(var i in data){
          ydata.push(data[i].temperature);
          xdata.push(data[i].weeks);
        }
        aqiChart.setOption(getOptionNew('line',xdata,ydata,"AQI"));
      },
      search(){
        if(!this.cityName){
          return
        }
        getWeatherData(encodeURI(this.cityName)).then(res =>{
          if(res.success){
            if(res.success ==="0"){
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'warning'
              });
              return
            }
            var data = res.result;
            this.weekData = res.result;
//            this.weekLine(res.result)
            console.log(data)
            var date=this.getFormatDate();
            for(let i=0;i<data.length;i++){
              if(date === data[i].days){
                this.currData = data[i];
                break;
              }
            }
            console.log(this.currData)
            //仪表盘
            var xData = [];
            var dayData = [];
            var nightData = []
            for(let j=0;j<data.length;j++){
              xData.push(data[j].days);
              dayData.push(data[j].temp_high);
              nightData.push(data[j].temp_low);
            }

              this.drawbar('gotobedbar', xData,dayData,nightData);
              var that = this;
              var resizeTimer = null;
              window.onresize = function () {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                  that.drawbar('gotobedbar', xData,dayData,nightData);
                }, 300);
              }
          }
        })
      },
      imageToBase64(url,callBack){
       /* var reader = new FileReader();
        reader.readAsDataURL(url);
        reader.onload = function () {
          console.log(this.result)
        }*/
       console.log("url=" + url)
        //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
        var Img = new Image(),
          dataURL='';
        console.log(Img)
        Img.onload = function(){ //要先确保图片完整获取到，这是个异步事件
          console.log("onload")
          var canvas = document.createElement("canvas"), //创建canvas元素
            width=Img.width, //确保canvas的尺寸和图片一样
            height=Img.height;
          canvas.width=width;
          canvas.height=height;
          canvas.getContext("2d").drawImage(Img,10,10,width,height); //将图片绘制到canvas中
          dataURL=canvas.toDataURL('image/jpg'); //转换图片为dataURL
          console.log(dataURL);
          callBack?callBack(dataURL):null;
        };
      }
    },
  }
</script>

<style>
  .header-box{
    height: 60px;
    background: #58b6ff ;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .icon-box{
    width: 30%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #ffffff;
    font-size: 35px;
  }
  .img-logo{
    top: 15px;
    width: 65px;
    margin-left: 5px;
    border-radius: 30px;
  }
  .input-box{
     width: 70%;
     display: flex;
     justify-content: flex-end;
     margin-right: 30px;
  }
  .input-input{
    /*align-items: center;*/
    width: 60%;
  }
  .icon-header{
    position: relative;
    left: 10px;
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
    width: 50%;
    position: relative;
  }

  .icon-air {
    position: absolute;
    left: 15px;
    top: 15px;
    width: 50px;
    height: 40px;
  }
  .icon-air1 {
    position: absolute;
    left: 85px;
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

  .air-weather{
    font-size: 20px;
    color: #fff;
    position: relative;
    left: 8%;
    top: 60px;
  }
  .air-num i {
    font-size: 36px;
  }

  .air-trend-title{
    color: #ffffff;
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
  .air-info-date{
   position: absolute;
   top: 55px;
   left: 5px;
   right: 5px;
   border-top: 1px dashed #fff;
   padding: 5px 10px 0;
 }
  .air-info-date li {
    color: #fff;
    font-size: 14px;
    list-style: none;
  }

  .date-icon{
    position: absolute;
    left: 65px;
    top: 15px;
    width: 50px;
    height: 40px;
    text-align: center;
  }
  .tip-box {
    background: #58b6ff url(../assets/images/bg_shine.png) no-repeat;
    /*background-size: 204px 225px;*/
    height: 235px;
    margin-top: 10px;
    margin-left:5px ;
    width: 50%;
    position: relative;
  }
  .bottom-box{
    height: 120px;
    background: #58b6ff ;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
  }
</style>
