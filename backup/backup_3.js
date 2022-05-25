// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comments;
// 
// iOS 桌面组件脚本 @「小件件」
// 开发说明：请从 Widget 类开始编写，注释请勿修改
// https://x.im3x.cn
// 

// 添加require，是为了vscode中可以正确引入包，以获得自动补全等功能
if (typeof require === 'undefined') require = importModule
const {Base} = require("./「小件件」开发环境")

// @组件代码开始
const GenshinConfig = {
  Cookie: "",
  UID: "",
  server: ""
}

class Widget extends Base {
  /**
   * 传递给组件的参数，可以是桌面 Parameter 数据，也可以是外部如 URLScheme 等传递的数据
   * @param {string} arg 自定义参数
   */
  constructor(arg) {
    super(arg)
    this.name = '原神每日摘要'
    this.desc = '每日摘要'

    this.API_ARGS = {
      API_APP_INFO_VERSION: "2.12.1",
      API_APP_SIGN_VERSION: "2.3.0",
      API_INFO_SALT: "xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs",
      API_SIGN_SALT: "h8w582wxwgqvahcdkpvdhbh2w9casgfl"
    }

    this.GenshinConfig = GenshinConfig

    this.logo_url = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3-bcy.byteimg.com%2Fimg%2Fbanciyuan%2F7865d3e3ae4744d7bca730765cad6dd8~tplv-banciyuan-2X2.image&refer=http%3A%2F%2Fp3-bcy.byteimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651910656&t=6bde033b3aa0e5ee2f4ccb23ff27ad60"
  }

  /**
   * 渲染函数，函数名固定
   * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
   */
  async render() {
    const data = await this.getDailyNoteData()
    // const userInfo = await this.getUserInfoData()
    switch (this.widgetFamily) {
      case 'large':
        return await this.renderLarge(data.content['data'])
      case 'medium':
        return await this.renderMedium(data.content['data'])
      default:
        return await this.renderSmall(data.content['data'])
    }
  }

  /**
   * 渲染小尺寸组件
   */
  async renderSmall(data) {
    let w = new ListWidget()
    // await this.renderHeader(w, data['logo'], data['title'])
    const t = w.addText(data['content'])
    t.font = Font.lightSystemFont(16)
    w.addSpacer()
    w.url = this.actionUrl('open-url', data['url'])
    return w
  }

  /**
   * 渲染中尺寸组件
   */
  async renderMedium(data) {
    let w = new ListWidget()
    // w.backgroundImage = await this.getImageByUrl("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F17%2F20210617213349_41f2a.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651910169&t=76f9ce4ae3a8bf5539f2c7780d52541d")

    await this.renderHeader(w, this.logo_url, this.name)

    {
      let largeCell = w.addStack()
      await this.makeResinCell(largeCell.addStack(), data);
      largeCell.addSpacer()
      await this.makeDailyTask(largeCell.addStack(), data);
      largeCell.addSpacer()
      await this.makeWeekBoss(largeCell.addStack(), data);
      largeCell.centerAlignContent();
      w.addSpacer(10)
    }


    await this.makeHomeCoinCell(w.addStack(), data)
    w.addSpacer(5);
    await this.makeTransformer(w.addStack(), data)
    w.addSpacer(5);
    await this.makeWeeklyMaterial(w.addStack())

    w.addSpacer()
    return w
  }

  /**
   * 渲染大尺寸组件
   */
  async renderLarge(data) {
    return await this.renderMedium(data, 10)
  }

  /**
   * 构造DS
   * @param {*} q
   * @param {*} b
   * @returns
   */
  async getDS(q = "", b = "") {
    // let MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

    let timestamp = Math.floor(Date.now() / 1000);
    let randomStr = Math.random().toString(10).slice(-6);
    let s = "salt=" + this.API_ARGS.API_INFO_SALT + "&t=" + timestamp + "&r=" + randomStr + "&b=" + b + "&q=" + q;
    let check = this.md5(s);
    return timestamp + "," + randomStr + "," + check;
  }

  /**
   * 获取米游社每日数据
   * @returns
   */
  async getDailyNoteData() {
    let data;
    try {
      let base_url = "https://api-takumi.mihoyo.com/game_record/app/genshin/api/dailyNote"
      let headers = {
        "Host": "api-takumi-record.mihoyo.com",
        "x-rpc-client_type": "5",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Accept": "application/json, text/plain, */*",
        "Origin": "https://webstatic.mihoyo.com",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/" + this.API_ARGS.API_APP_INFO_VERSION,
        "Connection": "keep-alive",
        "x-rpc-app_version": this.API_ARGS.API_APP_INFO_VERSION,
        "Referer": "https://webstatic.mihoyo.com/"
      }
      let query = "role_id=" + this.GenshinConfig.UID + "&server=" + this.GenshinConfig.server;
      let url = base_url + "?" + query
      headers['Cookie'] = this.GenshinConfig.Cookie;
      headers['DS'] = await this.getDS(query);

      let req = new Request(url);
      req.headers = headers;
      req.timeoutInterval = 20;

      let json = await req.loadJSON();
      data = {
        content: json,
        last_check: new Date().getTime()
      };
      // cache.write("data", data);
    } catch (error) {
      console.log(error);
      // data = await cache.read('data');
    }
    return data;
  }

  async getWeeklyMaterialData() {
    const RegionAbbr = {"MD": "蒙德", "LY": "璃月", "DQ": "稻妻"};
    const AvatarMaterial = new Map([
      ["自由", {day: [1, 4], loc: "MD"}],
      ["繁荣", {day: [1, 4], loc: "LY"}],
      ["浮世", {day: [1, 4], loc: "DQ"}],

      ["抗争", {day: [2, 5], loc: "MD"}],
      ["勤劳", {day: [2, 5], loc: "LY"}],
      ["风雅", {day: [2, 5], loc: "DQ"}],

      ["诗文", {day: [3, 6], loc: "MD"}],
      ["黄金", {day: [3, 6], loc: "LY"}],
      ["天光", {day: [3, 6], loc: "DQ"}]
    ])  // Start from 1: monday

    const WeaponsMaterial = new Map([
      ["高塔孤王", {
        day: [1, 4],
        loc: "MD",
        icon: "https://patchwiki.biligame.com/images/ys/thumb/a/ae/ril3957ally2n06x63okj5u4xlgxkat.png/60px-%E9%AB%98%E5%A1%94%E5%AD%A4%E7%8E%8B%E7%9A%84%E7%A2%8E%E6%A2%A6.png"
      }],
      ["孤云寒林", {
        day: [1, 4],
        loc: "LY",
        icon: "https://patchwiki.biligame.com/images/ys/thumb/a/a3/1tu23zexvw3rzspu1srih6obhzvis7n.png/60px-%E5%AD%A4%E4%BA%91%E5%AF%92%E6%9E%97%E7%9A%84%E7%A5%9E%E4%BD%93.png"
      }],
      ["远海夷地", {
        day: [1, 4],
        loc: "DQ",
        icon: "https://patchwiki.biligame.com/images/ys/thumb/e/ee/sb5eljgxovf5ai76kdiky1nc8sofixq.png/60px-%E8%BF%9C%E6%B5%B7%E5%A4%B7%E5%9C%B0%E7%9A%84%E9%87%91%E6%9E%9D.png"
      }],

      ["凛风奔狼", {
        day: [2, 5],
        loc: "MD",
        icon: "https://patchwiki.biligame.com/images/ys/thumb/8/87/9pms7n56y93l3pubhkf50f0ve26xeay.png/60px-%E5%87%9B%E9%A3%8E%E5%A5%94%E7%8B%BC%E7%9A%84%E6%80%80%E4%B9%A1.png"
      }],
      ["雾海云间", {
        day: [2, 5],
        loc: "LY",
        icon: "https://patchwiki.biligame.com/images/ys/thumb/5/50/4pyz2quwtyekg7q9nz7uwvvk8u0lp1r.png/60px-%E9%9B%BE%E6%B5%B7%E4%BA%91%E9%97%B4%E7%9A%84%E8%BD%AC%E8%BF%98.png"
      }],
      ["鸣神御灵", {
        day: [2, 5],
        loc: "DQ",
        icon: "https://patchwiki.biligame.com/images/ys/thumb/a/a7/8c1i8vpz8xtfkhq2ql02htt2jhqjer8.png/60px-%E9%B8%A3%E7%A5%9E%E5%BE%A1%E7%81%B5%E7%9A%84%E5%8B%87%E6%AD%A6.png"
      }],

      ["狮牙斗士", {
        day: [3, 6],
        loc: "MD",
        icon: "https://patchwiki.biligame.com/images/ys/thumb/3/39/nev6qh0704ntykkzomnpfmy61b8jo6t.png/60px-%E7%8B%AE%E7%89%99%E6%96%97%E5%A3%AB%E7%9A%84%E7%90%86%E6%83%B3.png"
      }],
      ["漆黑陨铁", {
        day: [3, 6],
        loc: "LY",
        icon: "https://patchwiki.biligame.com/images/ys/thumb/a/a5/ondpda6fqcktdngxx59hjx0x86eifeu.png/60px-%E6%BC%86%E9%BB%91%E9%99%A8%E9%93%81%E7%9A%84%E4%B8%80%E5%9D%97.png"
      }],
      ["今昔剧画", {
        day: [3, 6],
        loc: "DQ",
        icon: "https://patchwiki.biligame.com/images/ys/thumb/e/e1/2io89qzgybi350jsqrpm0p6efnh16yb.png/60px-%E4%BB%8A%E6%98%94%E5%89%A7%E7%94%BB%E7%9A%84%E9%AC%BC%E4%BA%BA.png"
      }]
    ]);

    for (let [key, value] of AvatarMaterial.entries()) {
      value.loc = RegionAbbr[value.loc];
    }

    for (let [key, value] of WeaponsMaterial.entries()) {
      value.loc = RegionAbbr[value.loc];
    }


    return [AvatarMaterial, WeaponsMaterial]
  }

  async getUserInfoData() {
    let data;
    try {
      let base_url = "https://api-takumi-record.mihoyo.com/game_record/app/card/wapi/getGameRecordCard"
      let headers = {
        "Host": "api-takumi-record.mihoyo.com",
        "x-rpc-client_type": "5",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Accept": "application/json, text/plain, */*",
        "Origin": "https://webstatic.mihoyo.com",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/" + this.API_ARGS.API_APP_INFO_VERSION,
        "Connection": "keep-alive",
        "x-rpc-app_version": this.API_ARGS.API_APP_INFO_VERSION,
        "Referer": "https://webstatic.mihoyo.com/"
      }
      let query = "uid=" + this.GenshinConfig.UID;
      let url = base_url + "?" + query
      headers['Cookie'] = this.GenshinConfig.Cookie;
      headers['DS'] = await this.getDS(query);

      let req = new Request(url);
      req.headers = headers;
      req.timeoutInterval = 20;

      let json = await req.loadJSON();
      console.log("mmmm")
      console.log(json)
      if (json['data']['list'].length !== 0) {
        data = {
          content: json['data']['list'][0],
          last_check: new Date().getTime()
        };
      }
      // cache.write("data", data);
    } catch (error) {
      console.log(error);
      // data = await cache.read('data');
    }
    return data;
  }

  async makeWeeklyMaterial(cell) {
    cell.layoutVertically()
    let currentDay = new Date()
    if (currentDay.getHours() < 4) {
      currentDay.setDate(currentDay.getDate() - 1);
    }
    let [avatarMaterials, weaponsMaterials] = await this.getWeeklyMaterialData();
    let avatarsMcell = cell.addStack();
    {
      avatarsMcell.bottomAlignContent()
      let header = avatarsMcell.addText("角色突破：")
      header.font = Font.boldSystemFont(12)
      if (currentDay.getDay() === 0) {
        avatarsMcell.addText("全部素材").font = Font.lightSystemFont(12)
      } else {
        let day = currentDay.getDay()
        let added = false;
        for (let [key, value] of avatarMaterials.entries()) {
          if (value.day.indexOf(day) !== -1) {
            if (added) {
              avatarsMcell.addText("，").font = Font.lightSystemFont(12)
            }

            let m = avatarsMcell.addText(`${key}`)
            m.font = Font.lightSystemFont(12)
            m = avatarsMcell.addText(`(${value.loc})`)
            m.font = Font.lightSystemFont(10)
            m.textColor = Color.gray();
            added = true;
          }

        }
      }
    }

    cell.addSpacer(5)

    let weaponsMcell = cell.addStack();
    {
      weaponsMcell.layoutHorizontally()
      weaponsMcell.bottomAlignContent()
      let header = weaponsMcell.addText("武器突破：")
      header.font = Font.boldSystemFont(12)
      let content;
      if (currentDay.getDay() === 0) {
        weaponsMcell.addText("全部素材").font = Font.lightSystemFont(12)
      } else {
        let day = currentDay.getDay()
        let materials = []
        let txt = ""
        let added = false;
        for (let [key, value] of weaponsMaterials.entries()) {
          if (value.day.indexOf(day) !== -1) {
            if (added) {
              weaponsMcell.addText("，").font = Font.lightSystemFont(12)
            }
            let icon = weaponsMcell.addImage(await this.getImageByUrl(value.icon))
            icon.imageSize = new Size(16, 16)
            let loc = weaponsMcell.addText(`(${value.loc})`)
            loc.font = Font.lightSystemFont(10)
            loc.textColor = Color.gray();
            added = true;
            // materials.push(`${key}(${value.loc})`)
          }
        }
      }
    }
  }

  /**
   * 分析体力数据
   * @param data
   * @returns {Promise<string[]>}
   */
  async parseResin(data) {
    let current_resin = data['current_resin']
    let max_resin = data['max_resin']
    let resin_txt = `${current_resin} / ${max_resin}`
    let recovery_txt = "";
    if (current_resin !== max_resin) {
      let resin_recovery_second = parseInt(data['resin_recovery_time'])
      recovery_txt += await this.beautifyTimeDelta(resin_recovery_second);
      recovery_txt += "恢复"
    } else {
      recovery_txt = "树脂已满"
    }

    return [current_resin === max_resin, resin_txt, recovery_txt]
  }

  /**
   * 渲染树脂块
   * @param cell
   * @param data
   * @returns {Promise<void>}
   */
  async makeResinCell(cell, data) {
    const [full, resin, recovery] = await this.parseResin(data);

    let resign_t = await this.centerTextInStack(cell, resin)
    resign_t.font = Font.boldSystemFont(18);
    if (full) {
      resign_t.textColor = Color.green();
    }

    let recovery_t = await this.centerTextInStack(cell, recovery)
    recovery_t.font = Font.lightSystemFont(10);
    recovery_t.textColor = Color.gray();

    cell.centerAlignContent();
    cell.layoutVertically()
  }

  /**
   * 分析每日任务
   * @param data
   * @returns {Promise<(string|string)[]>}
   */
  async parseDailyTask(data) {
    let finished_task = data['finished_task_num']
    let total_task = data['total_task_num']
    let extra_reward = data['is_extra_task_reward_received']

    let task_txt = `${finished_task} / ${total_task}`
    let extra_txt = extra_reward ? "额外奖励已领取" : "额外奖励未领取";
    return [task_txt, extra_txt]
  }

  /**
   * 渲染每日任务
   * @param cell
   * @param data
   * @returns {Promise<void>}
   */
  async makeDailyTask(cell, data) {
    let [task, extra] = await this.parseDailyTask(data);

    let task_cnt = await this.centerTextInStack(cell, task)
    task_cnt.font = Font.boldSystemFont(18);

    let extra_t = await this.centerTextInStack(cell, extra);
    extra_t.font = Font.lightSystemFont(10);
    extra_t.textColor = Color.gray();
    cell.layoutVertically();
    cell.centerAlignContent();
  }

  /**
   * 分析周本
   * @param data
   * @returns {Promise<(string|string)[]>}
   */
  async parseWeekBoss(data) {
    let undefeated_boss = data['remain_resin_discount_num']
    let total_boss = data['resin_discount_num_limit']

    let boss_txt = `${undefeated_boss} / ${total_boss}`
    return [undefeated_boss !== 0, boss_txt]
  }

  /**
   * 渲染周本
   * @param cell
   * @param data
   * @returns {Promise<void>}
   */
  async makeWeekBoss(cell, data) {
    let [available, boss] = await this.parseWeekBoss(data);

    let boss_cnt = await this.centerTextInStack(cell, boss)
    boss_cnt.font = Font.boldSystemFont(18);
    if (available) {
      boss_cnt.textColor = Color.green()
    }

    let extra_t = await this.centerTextInStack(cell, "周本体力减半");
    extra_t.font = Font.lightSystemFont(10);
    extra_t.textColor = Color.gray();
    cell.layoutVertically();
    cell.centerAlignContent();
  }

  /**
   * 分析洞天宝钱
   * @param data
   * @returns {Promise<string[]>}
   */
  async parseHomeCoin(data) {
    let current_coin = data['current_home_coin']
    let max_coin = data['max_home_coin']
    let coin_txt = `${current_coin} / ${max_coin}`

    let recovery_txt = "";
    if (current_coin !== max_coin) {
      let coin_recovery_second = parseInt(data['home_coin_recovery_time'])
      recovery_txt = await this.beautifyTimeDelta(coin_recovery_second);
      recovery_txt += " 恢复"
    } else {
      recovery_txt = "宝钱已满"
    }

    return [current_coin === max_coin, coin_txt, recovery_txt]
  }

  /**
   * 渲染洞天宝钱
   * @param cell
   * @param data
   * @returns {Promise<void>}
   */
  async makeHomeCoinCell(cell, data) {
    const [full, coin, recovery] = await this.parseHomeCoin(data);
    let coin_header = cell.addText("洞天宝钱：");
    coin_header.font = Font.boldSystemFont(12);
    let coin_cnt = cell.addText(coin);
    coin_cnt.font = Font.lightSystemFont(12);
    if (full) {
      coin_cnt.textColor = Color.green()
    }
    // let coin_t = cell.addText(coin);
    // coin_t.font = Font.boldSystemFont(12);
    cell.addSpacer()
    let recovery_t = cell.addText(recovery);
    recovery_t.font = Font.lightSystemFont(10);
    recovery_t.textColor = Color.gray();
    // cell.addSpacer();
    cell.bottomAlignContent();
  }

  /**
   * 分析参量质变仪
   * @param data
   * @returns {Promise<void>}
   */
  async parseTransformer(data) {
    let transformer = data['transformer']
    console.log(transformer)
    let transformer_txt = "";
    let recovery_txt = "";
    let available = false;
    if (!transformer['obtained']) {
      available = false;
      transformer_txt = "未获取"
      recovery_txt = "";
    } else if (transformer["recovery_time"]["reached"]) {
      available = true;
      transformer_txt = "可用"
      recovery_txt = "已恢复";
    } else {
      available = false;
      transformer_txt = "冷却中"
      let recovery_time = transformer['recovery_time'];
      let delta = 0;
      delta += recovery_time['Day'];
      delta = delta * 24 + recovery_time['Hour'];
      delta = delta * 60 + recovery_time['Minute'];
      recovery_txt = await this.beautifyTimeDelta(delta * 60);
      recovery_txt += " 恢复"
    }
    return [available, transformer_txt, recovery_txt];
  }

  async makeTransformer(cell, data) {
    const [ready, obtained, recovery] = await this.parseTransformer(data);
    let transformer_header = cell.addText("参量质变：");
    transformer_header.font = Font.boldSystemFont(12);
    let transformer_state = cell.addText(obtained);
    transformer_state.font = Font.lightSystemFont(12);
    if (ready) {
      transformer_state.textColor = Color.green();
    }
    // let coin_t = cell.addText(coin);
    // coin_t.font = Font.boldSystemFont(12);
    cell.addSpacer()
    let transformer_t = cell.addText(recovery);
    transformer_t.font = Font.lightSystemFont(10);
    transformer_t.textColor = Color.gray();
    // cell.addSpacer();
    cell.bottomAlignContent();
  }

  async centerTextInStack(parent, txt) {
    let sub_cell = parent.addStack();
    sub_cell.addSpacer()
    let extra_t = sub_cell.addText(txt);
    sub_cell.addSpacer()
    return extra_t;
  }

  /**
   * 自定义注册点击事件，用 actionUrl 生成一个触发链接，点击后会执行下方对应的 action
   * @param {string} url 打开的链接
   */
  async actionOpenUrl(url) {
    Safari.openInApp(url, false)
  }

  async beautifyTimeDelta(delta_seconds) {
    let txt = "";
    let current = new Date();
    let current_d = new Date(current)
    current_d.setHours(0, 0, 0, 0);
    let tomorrow_d = new Date(current_d)
    tomorrow_d.setDate(tomorrow_d.getDate() + 1)
    let recovery = new Date(current.getTime() + delta_seconds * 1000);
    let recovery_d = new Date(recovery);
    recovery_d.setHours(0, 0, 0, 0);
    if (current_d.getTime() === recovery_d.getTime()) {
      txt = ""
    } else if (recovery_d.getTime() === tomorrow_d.getTime()) {
      txt = "明天"
    } else {
      let days = ['日', '一', '二', '三', '四', '五', '六'];
      // const date_formatter = new DateFormatter();
      // date_formatter.useShortDateStyle();
      // date_formatter.useNoTimeStyle();
      //
      // txt = date_formatter.string(recovery_d) + " "
      txt = `周${days[recovery_d.getDay()]}`
    }

    const time_formatter = new DateFormatter();
    time_formatter.useNoDateStyle();
    time_formatter.useShortTimeStyle();
    txt += time_formatter.string(recovery);

    return txt;
  }
}

// @组件代码结束

const {Testing} = require("./「小件件」开发环境")
await Testing(Widget)
