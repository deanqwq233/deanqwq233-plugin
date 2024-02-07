import plugin from '../../../lib/plugins/plugin.js'
import fetch from "node-fetch";
import puppeteer from '../../../lib/puppeteer/puppeteer.js'
import { Config, Version } from '../components/index.js'
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
		return await weather(this.e, msg);
	}

}

async function weather(e, search) {
	var reg = null, city = '', district = '';
	search = search.replace(/\s\s/g, ' ').replace(/\s\s/g, ' ');
	reg = /((.*)市)?((.*)区)?/.exec(search);
	if (reg[4]) { city = reg[4]; search = search.replace('市', ' '); }
	if (reg[6]) { district = reg[6]; search = search.replace('区', ' '); }

	try {
        const browser = await puppeteer.browserInit();
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});
		
		let url = `https://msn.cn/zh-cn/weather/forecast/in-${city}/${district}`;
		
		await page.goto(url);//MSN天气

		await page.evaluate(() => {
			$('a').remove();
			$('#ct-footer').remove();
		});

		await page.evaluate(`$('body').append('<p style="text-align: center;font-size: 15px;margin-top: -25px;">Created By Yunzai-Bot ${Version.yunzai} &amp; deanqwq233-Plugin ${Version.ver}</p><br>');`);

		let body = await page.$('body');
		buff = await body.screenshot({
            type: 'jpeg',
            omitBackground: false,
            quality: 100,
        });

        page.close().catch((err) => logger.error(err));

        puppeteer.renderNum++;
        puppeteer.restart();
    } catch (err) {
        logger.error(err);
    }

    if (!buff) {
        if (e.msg.includes('#')) await e.reply('水稻天气截图失败……');
        return false;
    }

    await e.reply(segment.image(buff));

    return true;
}