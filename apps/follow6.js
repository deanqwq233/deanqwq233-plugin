//一定是个制杖写的
//你看他不写注释，这种人，那什么东西啊(
import plugin from '../../lib/plugins/plugin.js'
import { segment } from "oicq";
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
    }
    async liu(e) {
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