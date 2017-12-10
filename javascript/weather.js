'use strict'

// ============================================================
// API Key
// ------------------------------------------------------------
// Don't have a key? Check README.md for instructions
// on how to get one.
// ============================================================

const APIKEY = 'ca8632ef6d8168fa12427b9dc658fa2c'  //配置apikey

// ============================================================
// Select DOM Elements
// ============================================================

// Search
let area = document.querySelector('#area').value || 'Boston'   //这里设置初始值，当输入框无输入城市时候，系统默认你设置的初始值，比如这边就是Boston


const locationSearch = document.querySelector('#location-search')//用javascript定义获取页面元素

// Location
const locationName = document.querySelector('#location-name')//用javascript定义获取页面元素----城市名称
const country = document.querySelector('#country')//用javascript定义获取页面元素 --------------国家

// Temperature
const temp = document.querySelector('#temp')//用javascript定义获取页面元素----------------温度
const tempMin = document.querySelector('#temp-min')//用javascript定义获取页面元素-----------温度最小
const tempMax = document.querySelector('#temp-max')//用javascript定义获取页面元素---------温度最大

// Weather
// const condition = document.querySelector('#condition')//用javascript定义获取页面元素-------
// const conditionDescription = document.querySelector('#condition-description')//用javascript定义获取页面元素-----

// Wind
const windSpeed = document.querySelector('#wind-speed')//用javascript定义获取页面元素------

// Error
const errorBox = document.querySelector('#error')//用javascript定义获取页面元素----------
const monday = document.querySelector('#monday')//用javascript定义获取页面元素----------
const datespan = document.querySelector('#datespan')//用javascript定义获取页面元素----------

const bg = document.querySelector('#bg')//用javascript定义获取页面元素----------
const weatherclute = document.querySelector('#weather-clute')//用javascript定义获取页面元素----------
const gifbg = document.querySelector('#gifbg')
const weatherdiv = document.querySelector('#weatherdiv')
// ============================================================
// Get Weather Function
// ============================================================
//这边是调用api接口方法-----当你输入城市时，会用这个方法去第三方调用天气预报接口，第三方返回天气数据
async function getWeather (city, key, units = 'imperial') {
  try {
    const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=${key}`)//第三方接口链接
    const data = await r.json()  //返回数据获取
    console.log(data);
    // Reset body class
    document.body.classList = ''

    // Clear Error
    errorBox.classList.add('dn')

    // Set Location Data
    locationName.innerText = data.name || ''  //赋值给页面
    country.innerText = data.sys.country     //赋值给页面的元素

    // Set Temperature Data
    temp.innerText = Math.round(data.main.temp)+'°'  //Math.round返回一个数字四舍五入后最接近的整数值 -----这边是从返回的天气值中拿出温度值
    tempMin.innerText = '↓'+Math.round(data.main.temp_min) //-----这边是从返回的天气值中拿出温度最小值
    tempMax.innerText = Math.round(data.main.temp_max)+'↑' //-----这边是从返回的天气值中拿出温度最大值

    // Set Temperature Body Class
    console.log(bg);
    if (data.main.temp < 45) {   //判断温度小于45的情况才执行的语句
      // document.body.classList.add('cold')     //当小于45°时，显示的样式
      bg.innerHTML = '<img src="image/bg1.png">';
    } else if (data.main.temp >= 45 && data.main.temp <= 75) {
      // document.body.classList.add('warm')   //当小于75°时，显示的样式
      bg.innerHTML = '<img src="image/bg2.png">';
    } else {
      // document.body.classList.add('hot')
      bg.innerHTML = '<img src="image/bg3.png">';
    }

    // Set Weather Data
    // condition.innerText = data.weather[0].main //从返回的天气值赋值给页面的元素
    // conditionDescription.innerText = data.weather[0].description         //从返回的天气值赋值给页面的元素
    windSpeed.innerText = 'Wind '+Math.round(data.wind.speed)+'mph'    //从返回的天气值赋值给页面的元素

    // Set Weather Body Class
    document.body.classList.add(data.weather[0].main.toLowerCase())

    // Set Wind Body Class
    if (data.wind.speed > 10 && data.wind.speed < 20) {//判断speed的情况才执行的语句
      document.body.classList.add('breezy')   // ----同上
    } else if (data.wind.speed >= 20) {
      document.body.classList.add('windy')// ----同上
    } else {
      document.body.classList.add('calm')// ----同上
    }

    // Log data from the API to the console

    var newDate = new Date();
    newDate.setTime(data.dt * 1000);
    var arr = new Array('','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday');
    console.log(arr);
    monday.innerText = arr[newDate.getDay()]
    var day = newDate.getDate();
    if(day <= 9){
        day = '0'+day;
    }

    var month = newDate.getMonth()+1;
    if(month <= 9){
        month = '0'+month;
    }
    datespan.innerText = day+'/'+month+'/'+newDate.getFullYear() //--
    weatherclute.innerHTML = '<img src="image/'+data.weather[0].main+'.png">';

  } catch (e) {
    console.error(e)
    errorBox.classList.remove('dn')
  }
}

// ============================================================
// Listen for form submission
// ============================================================

locationSearch.addEventListener('submit', function (e) {//监听输入事件，当键盘输入城市时候触发调用
  area = document.querySelector('#area').value || 'Boston'

  // Run the getWeather function
  getWeather(area, APIKEY)//调用前面的获取天气方法

	gifbg.classList.add('hide')
	weatherdiv.classList.add('show')
	weatherdiv.classList.remove('hide')
	gifbg.classList.remove('show')
  // Prevent the default behavior of the form
  e.preventDefault()
})

// ============================================================
// Get weather on page load
// ============================================================

getWeather(area, APIKEY)//调用前面的获取天气方法
