// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: sticky-note;

const mihoyoCookie = ""
// 请设置When Interacting为Open URL，URL为yuanshengame://
const userRoleNumber = 0 // 如果你有多个角色，请将0依次改为1,2,3...后运行查看
const textColor = Color.dynamic(Color.white(), Color.black())
const widgetColor = Color.dynamic(Color.white(), Color.black())

function md5(str) {
  function d(n, t) {
    var r = (65535 & n) + (65535 & t)
    return (((n >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r)
  }

  function f(n, t, r, e, o, u) {
    return d(((c = d(d(t, n), d(e, u))) << (f = o)) | (c >>> (32 - f)), r)
    var c, f
  }

  function l(n, t, r, e, o, u, c) {
    return f((t & r) | (~t & e), n, t, o, u, c)
  }

  function v(n, t, r, e, o, u, c) {
    return f((t & e) | (r & ~e), n, t, o, u, c)
  }

  function g(n, t, r, e, o, u, c) {
    return f(t ^ r ^ e, n, t, o, u, c)
  }

  function m(n, t, r, e, o, u, c) {
    return f(r ^ (t | ~e), n, t, o, u, c)
  }

  function i(n, t) {
    var r, e, o, u;
    (n[t >> 5] |= 128 << t % 32), (n[14 + (((t + 64) >>> 9) << 4)] = t)
    for (var c = 1732584193, f = -271733879, i = -1732584194, a = 271733878, h = 0; h < n.length; h += 16)
      (c = l((r = c), (e = f), (o = i), (u = a), n[h], 7, -680876936)),
      (a = l(a, c, f, i, n[h + 1], 12, -389564586)),
      (i = l(i, a, c, f, n[h + 2], 17, 606105819)),
      (f = l(f, i, a, c, n[h + 3], 22, -1044525330)),
      (c = l(c, f, i, a, n[h + 4], 7, -176418897)),
      (a = l(a, c, f, i, n[h + 5], 12, 1200080426)),
      (i = l(i, a, c, f, n[h + 6], 17, -1473231341)),
      (f = l(f, i, a, c, n[h + 7], 22, -45705983)),
      (c = l(c, f, i, a, n[h + 8], 7, 1770035416)),
      (a = l(a, c, f, i, n[h + 9], 12, -1958414417)),
      (i = l(i, a, c, f, n[h + 10], 17, -42063)),
      (f = l(f, i, a, c, n[h + 11], 22, -1990404162)),
      (c = l(c, f, i, a, n[h + 12], 7, 1804603682)),
      (a = l(a, c, f, i, n[h + 13], 12, -40341101)),
      (i = l(i, a, c, f, n[h + 14], 17, -1502002290)),
      (c = v(c, (f = l(f, i, a, c, n[h + 15], 22, 1236535329)), i, a, n[h + 1], 5, -165796510)),
      (a = v(a, c, f, i, n[h + 6], 9, -1069501632)),
      (i = v(i, a, c, f, n[h + 11], 14, 643717713)),
      (f = v(f, i, a, c, n[h], 20, -373897302)),
      (c = v(c, f, i, a, n[h + 5], 5, -701558691)),
      (a = v(a, c, f, i, n[h + 10], 9, 38016083)),
      (i = v(i, a, c, f, n[h + 15], 14, -660478335)),
      (f = v(f, i, a, c, n[h + 4], 20, -405537848)),
      (c = v(c, f, i, a, n[h + 9], 5, 568446438)),
      (a = v(a, c, f, i, n[h + 14], 9, -1019803690)),
      (i = v(i, a, c, f, n[h + 3], 14, -187363961)),
      (f = v(f, i, a, c, n[h + 8], 20, 1163531501)),
      (c = v(c, f, i, a, n[h + 13], 5, -1444681467)),
      (a = v(a, c, f, i, n[h + 2], 9, -51403784)),
      (i = v(i, a, c, f, n[h + 7], 14, 1735328473)),
      (c = g(c,(f = v(f, i, a, c, n[h + 12], 20, -1926607734)),i,a,n[h + 5],4,-378558)),
      (a = g(a, c, f, i, n[h + 8], 11, -2022574463)),
      (i = g(i, a, c, f, n[h + 11], 16, 1839030562)),
      (f = g(f, i, a, c, n[h + 14], 23, -35309556)),
      (c = g(c, f, i, a, n[h + 1], 4, -1530992060)),
      (a = g(a, c, f, i, n[h + 4], 11, 1272893353)),
      (i = g(i, a, c, f, n[h + 7], 16, -155497632)),
      (f = g(f, i, a, c, n[h + 10], 23, -1094730640)),
      (c = g(c, f, i, a, n[h + 13], 4, 681279174)),
      (a = g(a, c, f, i, n[h], 11, -358537222)),
      (i = g(i, a, c, f, n[h + 3], 16, -722521979)),
      (f = g(f, i, a, c, n[h + 6], 23, 76029189)),
      (c = g(c, f, i, a, n[h + 9], 4, -640364487)),
      (a = g(a, c, f, i, n[h + 12], 11, -421815835)),
      (i = g(i, a, c, f, n[h + 15], 16, 530742520)),
      (c = m(c,(f = g(f, i, a, c, n[h + 2], 23, -995338651)),i,a,n[h],6,-198630844)),
      (a = m(a, c, f, i, n[h + 7], 10, 1126891415)),
      (i = m(i, a, c, f, n[h + 14], 15, -1416354905)),
      (f = m(f, i, a, c, n[h + 5], 21, -57434055)),
      (c = m(c, f, i, a, n[h + 12], 6, 1700485571)),
      (a = m(a, c, f, i, n[h + 3], 10, -1894986606)),
      (i = m(i, a, c, f, n[h + 10], 15, -1051523)),
      (f = m(f, i, a, c, n[h + 1], 21, -2054922799)),
      (c = m(c, f, i, a, n[h + 8], 6, 1873313359)),
      (a = m(a, c, f, i, n[h + 15], 10, -30611744)),
      (i = m(i, a, c, f, n[h + 6], 15, -1560198380)),
      (f = m(f, i, a, c, n[h + 13], 21, 1309151649)),
      (c = m(c, f, i, a, n[h + 4], 6, -145523070)),
      (a = m(a, c, f, i, n[h + 11], 10, -1120210379)),
      (i = m(i, a, c, f, n[h + 2], 15, 718787259)),
      (f = m(f, i, a, c, n[h + 9], 21, -343485551)),
      (c = d(c, r)),
      (f = d(f, e)),
      (i = d(i, o)),
      (a = d(a, u))
    return [c, f, i, a]
  }

  function a(n) {
    for (var t = '', r = 32 * n.length, e = 0; e < r; e += 8)
      t += String.fromCharCode((n[e >> 5] >>> e % 32) & 255)
    return t
  }

  function h(n) {
    var t = []
    for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1)
      t[e] = 0
    for (var r = 8 * n.length, e = 0; e < r; e += 8)
      t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32
    return t
  }

  function e(n) {
    for (var t, r = '0123456789abcdef', e = '', o = 0; o < n.length; o += 1)
      (t = n.charCodeAt(o)),
        (e += r.charAt((t >>> 4) & 15) + r.charAt(15 & t))
    return e
  }

  function r(n) {
    return unescape(encodeURIComponent(n))
  }

  function o(n) {
    return a(i(h((t = r(n))), 8 * t.length))
    var t
  }

  function u(n, t) {
    return (function (n, t) {
      var r,e,o = h(n),u = [],c = []
      for (u[15] = c[15] = void 0,16 < o.length && (o = i(o, 8 * n.length)),r = 0;r < 16;r += 1)
        (u[r] = 909522486 ^ o[r]), (c[r] = 1549556828 ^ o[r])
      return ((e = i(u.concat(h(t)), 512 + 8 * t.length)), a(i(c.concat(e), 640)))
    })(r(n), r(t))
  }

  function t(n, t, r) {
    return t ? (r ? u(t, n) : e(u(t, n))) : r ? o(n) : e(o(n))
  }

  return t(str)
}

async function makeGenshinRequest(url) {
  var time_ = String(parseInt(Date.now() / 1000))
  var random_ = String(parseInt((Math.random() + 1) * 100000))
  var check = md5("salt=xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs&t=" + time_ + "&r=" + random_ + "&b=&q=" + url.split("?")[1])

  var ds = time_ + "," + random_ + "," + check

  const req = new Request(url)
  req.method = "GET"
  req.headers = {
    "Cookie": mihoyoCookie,
    "DS": ds,
    "x-rpc-app_version": "2.20.1",
    "x-rpc-client_type": "5"
  };

  await req.load()
  return req.loadJSON()
}

function formatExpRemainTime(timeRemain) {
  let processTimeTmp = parseInt(timeRemain / 60)
  let hour = parseInt(processTimeTmp / 60)
  let minute = parseInt(processTimeTmp % 60)
  let second = parseInt(timeRemain % 60)
  return [hour.toString().padStart(2, '0'), minute.toString().padStart(2, '0'), second.toString().padStart(2, '0')]
}

function getFont(fontName, fontSize) {
  const fontGenerator = {
    medium: function () {
      return Font.mediumMonospacedSystemFont(fontSize)
    },
    regular: function () {
      return Font.regularMonospacedSystemFont(fontSize)
    },
    bold: function () {
      return Font.boldMonospacedSystemFont(fontSize)
    },
    heavy: function () {
      return Font.heavyMonospacedSystemFont(fontSize)
    },
    black: function () {
      return Font.blackMonospacedSystemFont(fontSize)
    }
  }

  const systemFont = fontGenerator[fontName]
  if (systemFont) {
    return systemFont()
  }
  return new Font(fontName, fontSize)
}

// 计算恢复时间
async function getClock(time) {
  if (time == 0) {
    return "树脂已满"
  }
  let timeNow = Date.now()
  let now = new Date(timeNow)
  let hoursNow = now.getHours()
  let minutesNow = now.getMinutes() * 60 * 1000
  let secondsNow = now.getSeconds() * 1000
  let timeRecovery = new Date(timeNow + time * 1000)

  let tillTommorow = (24 - hoursNow) * 3600 * 1000
  let tommorow = timeNow + tillTommorow - minutesNow - secondsNow

  let str = ""
  if (timeRecovery < tommorow) {
    str = "本日"
  } else {
    str = "次日"
  }

  return str + timeRecovery.getHours() + ":" + timeRecovery.getMinutes() + ""
}

var genshinData = {
  "current_resin": 0, // 原粹树脂
  "max_resin": 160, // 树脂上限
  "resin_recovery_time": "0", // 树脂恢复时间
  "finished_task_num": 0, // 每日任务完成数量
  "total_task_num": 4,
  "is_extra_task_reward_received": false, // 每日任务完成奖励
  "remain_resin_discount_num": 0,  // 周本减半
  "resin_discount_num_limit": 3,
  "current_expedition_num": 0, // 当前派遣人数
  "max_expedition_num": 5, // 最大派遣人数
  "expeditions": [], // 派遣详细信息
  "current_home_coin": 0, // 洞天宝钱
  "max_home_coin": 2400, // 宝钱上限
  "home_coin_recovery_time": "0" // 洞天宝钱恢复时间
}

async function createWidget() {
  // 获取角色信息
  var genshinRsp = await makeGenshinRequest("https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_cn")
  const userRole = genshinRsp["data"]["list"][userRoleNumber]

  // 获取原神便笺
  var genshinRsp = await makeGenshinRequest("https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/dailyNote?role_id=" + userRole["game_uid"] + "&server=" + userRole["region"])
  genshinData = genshinRsp["data"]

  // 创建小组件
  let widget = new ListWidget()

  // Add background image
  // let background = await loadImageFromUrl("https://gitee.com/muuuj1an/GenshinTools/raw/main/img/background/yuanshen_Door.png")
  // widget.backgroundImage = background

  // Add background color
  let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = [
    new Color("141414e6"),
    new Color("2a5398b3")
  ]
  widget.backgroundGradient = gradient

  // 创建原神标题部分
  var stackHeader = widget.addStack()
  stackHeader.centerAlignContent()

  // 添加原神图标
  var req = new Request("https://ys.mihoyo.com/main/favicon.ico")
  req.method = 'GET'
  var stackImgItem = stackHeader.addImage(await req.loadImage())
  stackImgItem.imageSize = new Size(12, 12)
  stackImgItem.cornerRadius = 5
  stackHeader.addSpacer(3)

  // 添加原神标题
  var textItem = stackHeader.addText("原神便笺")
  textItem.font = getFont('semibold', 10)
  textItem.textColor = textColor

  // 添加更新时间
  stackHeader.addSpacer()
  var myDate = new Date();
  var textItem = stackHeader.addText(`${myDate.getHours().toString().padStart(2, '0')}:${myDate.getMinutes().toString().padStart(2, '0')}更新`)
  textItem.font = getFont('semibold', 10)
  textItem.textColor = textColor
  textItem.rightAlignText()

  // 添加旅行者信息
  var textItem = widget.addText(`${userRole["level"]}级 - ${userRole["nickname"]}`)
  textItem.font = getFont('regular', 11)
  textItem.textColor = textColor
  textItem.centerAlignText()

  widget.addSpacer(5)

  // 添加小标题
  // var textItem = widget.addText("详细数据")
  // textItem.font = getFont('semibold', 11)
  // textItem.textColor = textColor

  // 添加 树脂信息
  var stackText = widget.addStack()
  var resinIcon = stackText.addImage(await loadImageFromUrl("https://gitee.com/muuuj1an/GenshinTools/raw/main/img/ico/resin.png"))
  resinIcon.imageSize = new Size(12, 12)
  stackText.addSpacer(1)
  var textItem = stackText.addText("当前树脂: ")
  textItem.font = getFont('regular', 10)
  textItem.textColor = textColor
  var textItem = stackText.addText(`${genshinData["current_resin"]}/${genshinData["max_resin"]}`)
  textItem.font = getFont('regular', 10)
  if (genshinData["current_resin"] >= genshinData["max_resin"] * 0.9) {
    textItem.textColor = Color.red()
  } else {
    textItem.textColor = textColor
  }
  // 树脂恢复时间
  if (genshinData["current_resin"] != genshinData["max_resin"]) {
    var stackText = widget.addStack()
    var textItem = stackText.addText(`·`)
    stackText.addSpacer()
    textItem.font = getFont('regular', 8)
    var restDate = await getClock(genshinData["resin_recovery_time"])
    var textItem = stackText.addText(`全部恢复时间: ${restDate}`)
    textItem.font = getFont('regular', 8)
    // textItem.textColor = new Color('f0fcff')
    textItem.textColor = new Color('e3f9fd')
    textItem.rightAlignText()
  }

  // 添加 洞天宝钱信息
  var stackText = widget.addStack()
  var huIcon = stackText.addImage(await loadImageFromUrl("https://gitee.com/muuuj1an/GenshinTools/raw/main/img/ico/mola.png"))
  huIcon.imageSize = new Size(12, 12)
  stackText.addSpacer(1)
  var textItem = stackText.addText("洞天宝钱: ")
  textItem.font = getFont('regular', 10)
  textItem.textColor = textColor
  var textItem = stackText.addText(`已累计 ${genshinData["current_home_coin"]} 枚`)
  textItem.font = getFont('regular', 10)
  if (genshinData["current_home_coin"] >= genshinData["max_home_coin"] * 0.9) {
    textItem.textColor = Color.red()
  } else {
    textItem.textColor = textColor
  }
  // 洞天宝钱恢复时间
  if (genshinData["current_home_coin"] != genshinData["max_home_coin"]) {
    var stackText = widget.addStack()
    var textItem = stackText.addText(`·`)
    stackText.addSpacer()
    textItem.font = getFont('regular', 8)
    var restDate = await getClock(genshinData["home_coin_recovery_time"])
    var textItem = stackText.addText(`全部恢复时间: ${restDate}`)
    textItem.font = getFont('regular', 8)
    textItem.textColor = new Color('e3f9fd')
    textItem.rightAlignText()
  }

  // 添加 每日委托信息
  var stackText = widget.addStack()
  var taskIcon = stackText.addImage(await loadImageFromUrl("https://gitee.com/muuuj1an/GenshinTools/raw/main/img/ico/yuanshi.png"))
  taskIcon.imageSize = new Size(12, 12)
  stackText.addSpacer(1)
  var textItem = stackText.addText("每日委托: ")
  textItem.font = getFont('regular', 10)
  textItem.textColor = textColor

  var textItem = stackText.addText(`已完成 ${genshinData["finished_task_num"]}/${genshinData["total_task_num"]} 个`)
  textItem.font = getFont('regular', 10)
  if (genshinData["finished_task_num"] != genshinData["total_task_num"]) {
    textItem.textColor = Color.red()
  } else {
    textItem.textColor = textColor
  }

  // 添加 周本信息
  var stackText = widget.addStack()
  var weekIcon = stackText.addImage(await loadImageFromUrl("https://gitee.com/muuuj1an/GenshinTools/raw/main/img/ico/tiantianhuaji.png"))
  weekIcon.imageSize = new Size(12, 12)
  stackText.addSpacer(1)
  var textItem = stackText.addText("周本减半: ")
  textItem.font = getFont('regular', 10)
  textItem.textColor = textColor
  var textItem = stackText.addText(`${genshinData["remain_resin_discount_num"]}/3 次`)
  textItem.font = getFont('regular', 10)
  if (genshinData["remain_resin_discount_num"] != 0) {
    textItem.textColor = Color.red()
  } else {
    textItem.textColor = textColor
  }

  // 生成派遣状态, 最短的派遣恢复时间
  var i = 0
  var min_index = 'nolabor'
  var minCdTime = 500000
  var finish_count = 0
  for (var i = 0; i < genshinData["expeditions"].length; i++) {
    var current_expeditions = genshinData["expeditions"][i]
    if (current_expeditions["status"] == "Finished") {
      min_index = i
      minCdTime = -1
      finish_count++
    } else {
      if (minCdTime > parseInt(current_expeditions["remained_time"])) {
        min_index = i
        minCdTime = parseInt(current_expeditions["remained_time"])
      }
    }
  }
// 添加 派遣信息
  var stackText = widget.addStack()
  var laborIconUrl = genshinData["expeditions"][min_index]["avatar_side_icon"]
  var laborIcon = stackText.addImage(await loadImageFromUrl(laborIconUrl))
  laborIcon.imageSize = new Size(12, 12)
  laborIcon.cornerRadius = 5
  stackText.addSpacer(1)
  var textItem = stackText.addText("探索派遣: ")
  textItem.font = getFont('regular', 10)
  textItem.textColor = textColor
  if (minCdTime < 0) {
    var textItem = stackText.addText(`已完成 ${finish_count}/${genshinData["max_expedition_num"]} 人`)
    textItem.font = getFont('regular', 8)
    textItem.textColor = Color.red()
  } else {
    if (minCdTime != 500000) {
      var restDate = await getClock(minCdTime)
      var textItem = stackText.addText(`${restDate}`)
      textItem.font = getFont('regular', 10)
      textItem.textColor = new Color('e3f9fd')
    }
  }

  // 参量质变仪
  var stackText = widget.addStack()
  var transformIcon = stackText.addImage(await loadImageFromUrl("https://gitee.com/muuuj1an/GenshinTools/raw/main/img/ico/jingyanshu.png"))
  transformIcon.imageSize = new Size(12, 12)
  stackText.addSpacer(1)
  var textItem = stackText.addText("参量质变仪: ")
  textItem.font = getFont('regular', 10)
  textItem.textColor = textColor
  if (genshinData['transformer']['recovery_time']['reached']) {
    var textItem = stackText.addText(`可使用`)
    textItem.font = getFont('regular', 10)
    textItem.textColor = Color.red()
  } else {
    if (genshinData['transformer']['recovery_time']['Day'] != 0) {
      var textItem = stackText.addText(`${genshinData['transformer']['recovery_time']['Day']}天`)
      textItem.font = getFont('regular', 10)
      textItem.textColor = textColor
    }
    if (genshinData['transformer']['recovery_time']['Hour'] != 0) {
      var textItem = stackText.addText(`${genshinData['transformer']['recovery_time']['Hour']}小时`)
      textItem.font = getFont('regular', 10)
      textItem.textColor = textColor
    }
    if (genshinData['transformer']['recovery_time']['Minute'] != 0) {
      var textItem = stackText.addText(`${genshinData['transformer']['recovery_time']['Minute']}分钟`)
      textItem.font = getFont('regular', 10)
      textItem.textColor = textColor
    }
    if (genshinData['transformer']['recovery_time']['Second'] != 0) {
      var textItem = stackText.addText(`${genshinData['transformer']['recovery_time']['Second']}秒`)
      textItem.font = getFont('regular', 10)
      textItem.textColor = textColor
    }
  }
  return widget
}

async function main() {
  if (config.runsInWidget) { //为桌面小组件，检查大小
    if (config.widgetFamily != 'small') {
      let widget = new ListWidget()
      widget.addText("小组件大小错误")
      Script.setWidget(widget)
      return
    }
  }
  try { //添加运行错误提示
    let widget = await createWidget()
    if (!config.runsInWidget) { //测试时展示
      widget.presentSmall()
      return
    }
    Script.setWidget(widget)
    widget.backgroundColor = widgetColor
  } catch (err) {
    console.log(err)
    let widget = new ListWidget()
    widget.addText("运行异常")
    Script.setWidget(widget)
    return
  }
}

async function loadImageFromUrl(url) {
  let req = new Request(url)
  req.method = 'GET'
  return await req.loadImage()
}

// main
await main()
Script.complete()
