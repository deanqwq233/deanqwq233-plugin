﻿import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'
import { Config, Version } from '../components/index.js'
import * as readline from 'readline';
export class deanqwq233_weather extends plugin {
	constructor() {
		super({
			/** 功能名称 */
			name: '水稻插件_天气',
			/** 功能描述 */
			dsc: '天气网站截图，#天气',
			/** https://oicqjs.github.io/oicq/#events */
			event: 'message',
			/** 优先级，数字越小等级越高 */
			priority: 2000,
			rule: [
				{
					/** 命令正则匹配 */
					reg: '^#?(水稻)?(.*)天气$',
					/** 执行方法 */
					fnc: 'searchweather'
				}
			]
		});

		try {
			let setting = Config.getdefSet('setting', 'system') || {};
			this.priority = setting['weather'] == true ? 10 : 2000;
		} catch (err) { }

	}

	async searchweather() {
		if (/^#?水稻设置.*$/.test(this.e.msg)) return false;

		let msg = this.e.msg
			.replace('#', '')
			.replace('水稻', '')
			.replace('天气', '');
		return await takeWeatherScreenshot(this.e, msg);
	}

}

async function takeWeatherScreenshot(e, msg) {
	let buff = null;
    try {
        // 创建浏览器实例
        const browser = await puppeteer.browserInit();
        const page = await browser.newPage();
		await page.setViewport({
			width: 3840,
			height: 2160
		});
      
        // 构建天气预报URL
        //const weatherUrl = `https://msn.cn/zh-cn/weather/forecast/in-${encodeURIComponent(msg)}%E5%B8%82`;
		const weatherUrl = `https://cn.bing.com/search?q=${encodeURIComponent(msg)}%E5%A4%A9%E6%B0%94`;
      
        // 访问页面
		await page.goto(weatherUrl, { waitUntil: 'networkidle0' });
      
        //await page.evaluate(`$('body').append('<p style="text-align: center;font-size: 15px;margin-top: -25px;">Created By Yunzai-Bot ${Version.yunzai} &amp; deanqwq233-Plugin ${Version.ver}</p><br>');`);//增加版本号显示

		let body = await page.$('body');
		buff = await body.screenshot({
			//fullPage: true,
			type: 'jpeg',
			omitBackground: false,
			quality: 100,
		});

		page.close().catch((err) => logger.error(err));
    }catch (err) {
		logger.error(err);
	}

	await e.reply(segment.image(buff));
}
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
  });

