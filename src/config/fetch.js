import {
	baseUrl
} from './env'

import fetchJson from 'fetch-jsonp'
import Jsonp from 'jsonp'
import $ from 'jquery'
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "force-cache"
		}
		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		try {
     const rp=await Jsonp(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*"
        },
       // mode: 'cors',
        body: JSON.stringify(data)
      }).then(function(response) {
        alert(response.text())
        return response.text();
      }).then(function(msg){
         console.log(msg)
      });
      console.log(rp)
      return rp
	/*		const response =await fetch(url,requestConfig);
			const responseJson = await response.json();
			return responseJson*/
		} catch (error) {
			throw new Error(error)
		}
	} else {

    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: "cors",
      cache: "force-cache"
    }
    debugger
    const response = await fetchJson(url,requestConfig);
    const responseJson =await  response.json();
    return responseJson
    /*return new Promise((resolve, reject) => {


            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
		})*/
	}
}
