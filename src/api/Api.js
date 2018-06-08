import fetch from '../config/fetch'

export const getWeatherData = (cityName) =>fetch('api/',{
  app: "weather.future",
  appkey: 10003,
  sign: "b59bc3ef6191eb9f747dd4e83c99f2a4",
  format:"json",
 // jsoncallback:"getWeather",
  weaid: cityName
})
