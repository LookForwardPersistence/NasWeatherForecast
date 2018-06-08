import jsonp from '../common/js/jsonp'

export function getWeatherData1(cityName) {
  const url = "https://sapi.k780.com";
 const data = {
   app: "weather.future",
   appkey: 10003,
   sign: "b59bc3ef6191eb9f747dd4e83c99f2a4",
   //format: 'jsonp',
   jsonpCallback: 'getWeather',
   weaid: cityName,
 }

  const options = {
    param: 'jsonpCallback',
    prefix: 'getWeather'
  }
  return jsonp(url,data,options)
}

export function getWeather(data){
  alert(data)
  console.log(data);
}
