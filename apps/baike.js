import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'
import { Config, Version } from '../components/index.js'
import * as readline from 'readline';
export class deanqwq233_baike extends plugin {
	constructor() {
		super({
			/** 功能名称 */
			name: '水稻插件_百科',
			/** 功能描述 */
			dsc: '百度百科截图，#百科',
			/** https://oicqjs.github.io/oicq/#events */
			event: 'message',
			/** 优先级，数字越小等级越高 */
			priority: 2000,
			rule: [
				{
					/** 命令正则匹配 */
					reg: '^#?(水稻)?(.*)百科$',
					/** 执行方法 */
					fnc: 'searchbaike'
				}
			]
		});

		try {
			let setting = Config.getdefSet('setting', 'system') || {};
			this.priority = setting['baike'] == true ? 10 : 2000;
		} catch (err) { }

	}

	async searchbaike() {
		if (/^#?水稻设置.*$/.test(this.e.msg)) return false;

		let msg = this.e.msg
			.replace('#', '')
			.replace('水稻', '')
			.replace('百科', '');
		return await takebaikeScreenshot(this.e, msg);
	}

}

async function takebaikeScreenshot(e, msg) {
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
        const baikeUrl = `https://baike.baidu.com/item/${encodeURIComponent(msg)}`;
		//const baikeUrl = `https://cn.bing.com/search?q=${encodeURIComponent(msg)}`;
      
        // 访问页面
		await page.goto(baikeUrl, { waitUntil: 'networkidle0' });
      
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

