<template>
  <div>
    <selection class="header-box">
      <div class="icon-box">
      <img src="../assets/images/b/10.png"/>
      </div>
      <div class="input-box">
      <el-input class="input-input input-width-select" v-model="cityName" placeholder="请输入城市名">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
      </div>
    </selection>
    <section class="main-box">
    <div class="air-box">
      <img :src=currData.weather_iconid class="icon-air" />
      <p class="air-time"><span>{{currData.days}}</span></p>
      <p class="air-num">{{currData.temp_high}}<i>℃</i></p>
      <b class="air-city">{{currData.citynm}}</b>
      <ul class="air-info">
        <li>天气：{{currData.weather}}</li>
        <li>风级：{{currData.winp}}</li>
        <li>气温：{{currData.temperature}}</li>
      </ul>
    </div>
      <div class="tip-box">
        <div class="air-trend">
          <h3 class="air-trend-tit">空气质量趋势</h3>
          <div class="air-trend-ctn">
            <div class="chart" id="barchart"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="week-box">
      <div class="date-box">
        <img src="../assets/images/b/0.png"/>
      </div>
      <div class="date-box">
        <img src="../assets/images/b/1.png"/>
      </div>
      <div class="date-box">
        <img src="../assets/images/b/2.png"/>
      </div>
      <div class="date-box">
        <img src="../assets/images/b/3.png"/>
      </div>
      <div class="date-box">
        <img src="../assets/images/b/4.png"/>
      </div>
    </section>
  </div>
</template>

<script>
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import "../assets/js/nebPay"
  import "../assets/js/nebPay"
  import BaiduMap from 'vue-baidu-map'
  import Vue from 'vue'
  Vue.use(BaiduMap,{
    ak: 'A63e90def3d0f5488ab9032056429a0d'
  })
  import {getWeatherData} from "../api/Api"
  export default {
    components: {
      ElButton,
      ElInput
    },
    data(){
      return {
        cityName: '',
        currData: []
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
        getWeatherData(encodeURI(this.cityName)).then(res =>{
          if(res.success){
            this.currData = res.result[0]
            this.currData.weather_iconid="../assets/images/b/"+res.result[0].weather_iconid+".png";
            console.log(this.currData)
            this.imageToBase64(this.currData.weather_iconid)
          }
        } )
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
      },
      search(){
        if(!this.cityName){
          return
        }
        getWeatherData(encodeURI(this.cityName)).then(res =>{
          if(res.success){
            this.currData = res.result[0];
            this.currData.weather_iconid="../assets/images/b/"+res.result[0].weather_iconid+".png";
            console.log(this.currData)
          }
        })
      },
      imageToBase64(url){
       /* var reader = new FileReader();
        reader.readAsDataURL(url);
        reader.onload = function () {
          console.log(this.result)
        }*/
       console.log("url=" + url)
        //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
        var Img = new Image(),
          dataURL='';
        Img.src=url;
        console.log(Img)
//        Img.onload = function(){ //要先确保图片完整获取到，这是个异步事件
          console.log("onload")
          var canvas = document.createElement("canvas"), //创建canvas元素
            width=Img.width, //确保canvas的尺寸和图片一样
            height=Img.height;
          console.log("canvas:")
          console.log(canvas)
          canvas.width=width;
          canvas.height=height;
          canvas.getContext("2d").drawImage(Img,10,10,width,height); //将图片绘制到canvas中
          dataURL=canvas.toDataURL('image/jpeg'); //转换图片为dataURL
          console.log(dataURL)
//        };
      }
    }
  }
</script>

<style>
  .header-box{
    height: 80px;
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
    width: 50%;
    position: relative;
  }

</style>
