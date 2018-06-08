/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';


if (process.env.NODE_ENV == 'development') {
  baseUrl = '';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'https://sapi.k780.com/';
}

export {
	baseUrl
}
