import plugin from '../../../lib/plugins/plugin.js'
import fs from 'fs';
import yaml from 'js-yaml';

export class example extends plugin {
    constructor() {
        super({
            name: '遇到6随机往后接不超过5位',
            dsc: '遇到6随机往后接不超过5位',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^6$',
                    fnc: 'liu'
                },
            ]
        })

        // 读取并解析 setting.system.yaml 文件  
        try {
            const file = fs.readFileSync('./defSet/defult/setting.system.yaml', 'utf8');
            const data = yaml.load(file);

            // 判断 follow6 的值  
            if (data.follow6 === true) {
                this.follow6 = true;
            } else {
                this.follow6 = false;
            }
        } catch (err) {
            console.error(err);
        }
    }
    async liu(e) {
        if (!this.follow6) return; // 如果 follow6 为 false，则直接返回，不执行下面的代码  
        let n = Math.floor(Math.random() * 5 + 1)
        let msg = ''
        let i = 0;
        for (i = 1; i <= n; i++) {
            let send = i + 6;
            msg = [`${send}`]
            await this.reply(msg)
            await sleep(1500);
        }
        return true
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}