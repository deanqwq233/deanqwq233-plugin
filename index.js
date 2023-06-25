
/**
插件更新地址：https://github.com/deanqwq233/deanqwq233-plugin	https://gitee.com/deanqwq233/deanqwq233-plugin
*/
import YAML from 'yaml';
const apps = {};
global.deanqwq233_plugin = {
  apps: apps,
  puppeteer: null
};

let is_icqq = false;
let is_oicq = false;

try {
  let icqq = await import("icqq");
  if (icqq) is_icqq = true;
} catch (err) {
  try {
    let oicq = await import("oicq");
    if (oicq) is_oicq = true;
  } catch (err) { }
}

if (is_icqq || is_oicq) {
  if (!global.core) global.core = (await import(is_icqq ? 'icqq' : 'oicq')).core;
  if (!global.segment) global.segment = (await import(is_icqq ? 'icqq' : 'oicq')).segment;
  global.uploadRecord = (await import("./model/uploadRecord.js")).default;
} else {
  global.uploadRecord = segment.record;
}

if (fs.existsSync("./renderers/puppeteer/lib/puppeteer.js")) {
  try {
    let configFile = `./renderers/puppeteer/config.yaml`;
    let rendererCfg = {};
    if (!fs.existsSync(configFile)) {
      configFile = `./renderers/puppeteer/config_default.yaml`;
    }

    try {
      rendererCfg = YAML.parse(fs.readFileSync(configFile, 'utf8'));
    } catch (e) {
      rendererCfg = {};
    }

    let puppeteer = new (await import("../../renderers/puppeteer/lib/puppeteer.js")).default(rendererCfg);
    deanqwq233_plugin.puppeteer = puppeteer;
  } catch (e) { }
}

if (!deanqwq233_plugin.puppeteer) {
  try {
    let puppeteer = (await import("../../lib/puppeteer/puppeteer.js")).default;
    deanqwq233_plugin.puppeteer = puppeteer;
  } catch (err) {
    deanqwq233_plugin.puppeteer = {};
  }
}

import fs from 'node:fs'
import { Version, Plugin_Path } from './components/index.js'


const files = fs.readdirSync(`${Plugin_Path}/apps`).filter(file => file.endsWith('.js'))

let ret = []

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)
let ver = Version.ver;

logger.info(`你好！`)
logger.info(`欢迎使用水稻插件${ver}`)

if (Version.yunzai[0] != '3') {
  logger.error(`水稻插件${ver}：加载失败，请更新Yunzai-Bot……`)
} else {
  for (let i in files) {
    let name = files[i].replace('.js', '')
    if (ret[i].status != 'fulfilled') {
      logger.error(`【${logger.red(name)}】模块载入失败……`)
      logger.error(ret[i].reason)
      continue
    }
    logger.info(`【${name}】载入成功……`)
    apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
  }
  logger.info(`水稻插件${ver}：加载完成……`)
}
logger.info(`再见！`)
export { apps }