/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */

export const helpCfg = {
  title: '水稻帮助',
  subTitle: 'Yunzai-Bot & deanqwq233-Plugin',
  columnCount: 3,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 3,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  },
  bgBlur: false
}

export const helpList = [
{
  group: '水稻插件功能',
  list: [{
    icon: 33,
    title: '6',
    desc: '话不多说直接7 8 9 10'
  },{
    icon: 71,
    title: '#天气 #水稻天气',
    desc: '例如：#北京天气 #水稻北京天气'
  }]
},{
  group: '管理命令，仅管理员可用',
  auth: 'master',
  list: [{
    icon: 32,
    title: '#水稻设置',
    desc: '配置水稻功能'
  },{
    icon: 35,
    title: '#水稻更新 #水稻强制更新',
    desc: '更新水稻插件'
  }]
}]

export const isSys = true
