// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;

// ========= ↓将生成的配置粘贴这以下↓=========

// ========= ↑将生成的配置粘贴这以上↑ ========
/**
 * @typedef {Object} ResinResponse
 * @property {number} total_task_num - 每日委托任务
 * @property {number} finished_task_num - 每日委托完成数
 * @property {number} max_resin - 树脂上限
 * @property {number} current_resin - 当前树脂
 * @property {number} max_home_coin - 洞天宝钱上限
 * @property {number} current_home_coin - 当前洞天宝钱
 * @property {string} resin_recovery_time - 树脂预计恢复时间
 * @property {string} home_coin_recovery_time - 洞天宝钱预计恢复时间
 * @property {number} resin_discount_num_limit - 强敌每周减半次数上限
 * @property {number} remain_resin_discount_num - 强敌每周减半次数剩余
 * @property {number} max_expedition_num - 探索派遣限制
 * @property {number} current_expedition_num - 当前探索派遣人数
 * @property {Array<{ status: string, avatar_side_icon: string, remained_time: string }>} expeditions - 派遣人员详情 
 */

 const ThemeConfig = Device.isPad() ? {
    iconSize: 12,
    iconRadius: 6,
    iconSpacer: 4,
    textSize: 12,
    tipSize: 10,
    avatarSize: 16,
    topSpacer: 40,
    bottomSpacer: 20,
} : {
    iconSize: 12,
    iconRadius: 6,
    iconSpacer: 4,
    textSize: 11,
    tipSize: 8,
    avatarSize: 16,
    topSpacer: 30,
    bottomSpacer: 15,
}

let resin = await getData()

let widget = await createWidget()

if (config.runsInWidget) {
Script.setWidget(widget)
} else {
widget.presentMedium()
}

Script.complete()
async function createWidget() {
let dayEnd = new Date(new Date().setHours(4, 0, 0, 0) + 24*60*60*1000)
let weekEnd = getWeekEnd()
let resinIcon = await loadResinIcon()
let coinIcon = await loadCoinIcon()
let discountIcon = await loadDiscountIcon()
let taskIcon = await loadTaskIcon()
let widget = new ListWidget()
// Add background gradient
let gradient = new LinearGradient()
gradient.locations = [0, 1]
gradient.colors = [
new Color("141414"),
new Color("2a5398")
]
widget.backgroundGradient = gradient

// 布局
let topHorizon = widget.addStack()
topHorizon.layoutHorizontally()
widget.addSpacer(8)
let bottomHorizon = widget.addStack()
bottomHorizon.layoutHorizontally()
widget.addSpacer(8)


let topLeftStack = topHorizon.addStack()
topLeftStack.layoutVertically()
topLeftStack.topAlignContent()
topHorizon.addSpacer(40)
let topRightStack = topHorizon.addStack()
topRightStack.layoutVertically()
topRightStack.bottomAlignContent()

let bottomLeftStack = bottomHorizon.addStack()
bottomLeftStack.layoutVertically()
bottomLeftStack.topAlignContent()
bottomHorizon.addSpacer(20)
let bottomRightStack = bottomHorizon.addStack()
bottomRightStack.layoutVertically()
bottomRightStack.bottomAlignContent()


let resinStack = topLeftStack.addStack()
let resinTipStack = topLeftStack.addStack()
let ResinIconElement = resinStack.addImage(resinIcon)
ResinIconElement.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
ResinIconElement.cornerRadius = ThemeConfig.iconRadius
resinStack.addSpacer(ThemeConfig.iconSpacer)
let ResinElement = resinStack.addText(`当前树脂：${resin.current_resin} / ${resin.max_resin}`)
ResinElement.textColor = Color.white()
ResinElement.textOpacity = 1
ResinElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
let ResinTipElement = resinTipStack.addText(`${await getTime(resin.resin_recovery_time)}(${await getClock(resin.resin_recovery_time)})`)
ResinTipElement.textColor = Color.white()
ResinTipElement.textOpacity = 0.6
ResinTipElement.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)  
resinStack.centerAlignContent()

let coinStack = topRightStack.addStack()
let coinTipStack = topRightStack.addStack()
coinStack.addSpacer(2)
let CoinIconElement = coinStack.addImage(coinIcon)
CoinIconElement.imageSize = new Size(10, 10)
CoinIconElement.cornerRadius = 5
coinStack.addSpacer(4)
let CoinElement = coinStack.addText(`当前宝钱：${resin.current_home_coin} / ${resin.max_home_coin}`)
CoinElement.textColor = Color.white()
CoinElement.textOpacity = 1
CoinElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
coinStack.addSpacer(8)
let CoinTipElement = coinTipStack.addText(`${await getTime(resin.home_coin_recovery_time)}(${await getClock(resin.home_coin_recovery_time)})`)
CoinTipElement.textColor = Color.white()
CoinTipElement.textOpacity = 0.6
CoinTipElement.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)  
coinStack.centerAlignContent()

let resinDiscountStack = bottomLeftStack.addStack()
let resinDiscountTipStack = bottomLeftStack.addStack()
let ResinDiscountIconElement = resinDiscountStack.addImage(discountIcon)
ResinDiscountIconElement.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
ResinDiscountIconElement.cornerRadius = ThemeConfig.iconRadius
resinDiscountStack.addSpacer(ThemeConfig.iconSpacer)
let ResinDiscountTextElement = resinDiscountStack.addText(`每周树脂减半次数：${resin.remain_resin_discount_num} / ${resin.resin_discount_num_limit}`)
ResinDiscountTextElement.textColor = Color.white()
ResinDiscountTextElement.textOpacity = 1
ResinDiscountTextElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
let recoverWeekTime = (weekEnd - new Date())/1000
let ResinDiscountTipElement = resinDiscountTipStack.addText(`${await getTime(recoverWeekTime)}(${await getClock(recoverWeekTime)})`)
ResinDiscountTipElement.textColor = Color.white()
ResinDiscountTipElement.textOpacity = 0.6
ResinDiscountTipElement.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)  
resinDiscountStack.centerAlignContent()

let taskStack = bottomRightStack.addStack()
let taskTipStack = bottomRightStack.addStack()
let TaskIconElement = taskStack.addImage(taskIcon)
TaskIconElement.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
TaskIconElement.cornerRadius = ThemeConfig.iconRadius
taskStack.addSpacer(ThemeConfig.iconSpacer)
let TaskElement = taskStack.addText(`每日委托：${resin.finished_task_num} / ${resin.total_task_num}`)
TaskElement.textColor = Color.white()
TaskElement.textOpacity = 1
TaskElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
let recoverTaskTime = (dayEnd - new Date())/1000
let TaskTipElement = taskTipStack.addText(`${await getTime(recoverTaskTime)}(${await getClock(recoverTaskTime)})`)
TaskTipElement.textColor = Color.white()
TaskTipElement.textOpacity = 0.6
TaskTipElement.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)  
taskStack.centerAlignContent()

let expeditionsTitleStack = widget.addStack()
let isHasFinished = false
let minCoverTime = 0
let expeditionsTitleElement = expeditionsTitleStack.addText(`每日派遣：${resin.current_expedition_num} / ${resin.max_expedition_num}`)
expeditionsTitleElement.textColor = Color.white()
expeditionsTitleElement.textOpacity = 1
expeditionsTitleElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
let expeditionsStackOne = widget.addStack()
expeditionsStackOne.layoutHorizontally()
expeditionsStackOne.centerAlignContent()
let expeditionsStackTwo = widget.addStack()
expeditionsStackTwo.layoutHorizontally()
expeditionsStackTwo.centerAlignContent()
const expeditions = resin.expeditions || []
minCoverTime = expeditions[0] ? +expeditions[0].remained_time : 0
for(let i = -1;i++ < resin.max_expedition_num;) {
    let expeditionsStack = i > 2 ? expeditionsStackTwo : expeditionsStackOne
    let expeditionStack = expeditionsStack.addStack()  
    expeditionStack.layoutHorizontally()
    let isOngoing = !!expeditions[i]
    if (isOngoing) {
            let { status, avatar_side_icon, remained_time } = expeditions[i]
            if (+remained_time < minCoverTime) minCoverTime = +remained_time
            let req = new Request(avatar_side_icon)
            let icon = await req.loadImage()
            let avatarImgElement = expeditionStack.addImage(icon)
            avatarImgElement.imageSize = new Size(ThemeConfig.avatarSize, ThemeConfig.avatarSize)
            avatarImgElement.cornerRadius = 0
            if (expeditions[i].status !== 'Finished') {
                    let remainedTimeElemnet = expeditionStack.addText(`${await getClock(remained_time)}`)  
                    remainedTimeElemnet.centerAlignText()
                    remainedTimeElemnet.textColor = Color.white()
                    remainedTimeElemnet.textOpacity = 0.6
                    remainedTimeElemnet.font = Font.mediumSystemFont(ThemeConfig.tipSize)
            } else {
                    isHasFinished = true
                    let remainedTimeElemnet = expeditionStack.addText('探索完成')  
                    remainedTimeElemnet.centerAlignText()
                    remainedTimeElemnet.textColor = Color.green()
                    remainedTimeElemnet.textOpacity = 0.8
                    remainedTimeElemnet.font = Font.mediumSystemFont(ThemeConfig.tipSize)
            }
            expeditionStack.centerAlignContent()
    }
}
expeditionsTitleStack.addSpacer(16)
if (isHasFinished) {
    let expeditionsRecoverElement = expeditionsTitleStack.addText(`已有派遣完成`)
    expeditionsRecoverElement.textColor = Color.green()
    expeditionsRecoverElement.textOpacity = 0.8
    expeditionsRecoverElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
    
} else {
    let expeditionsRecoverElement = expeditionsTitleStack.addText(`最早完成时间：${await getClock(minCoverTime)}`)
    expeditionsRecoverElement.textColor = Color.white()
    expeditionsRecoverElement.textOpacity = 0.8
    expeditionsRecoverElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
    
}
return widget
}

/**
* 返回原神便笺信息
*
* @return {Promise<ResinResponse>} 便笺数据
*/
async function getData() {
let randomStr = randomIntFromInterval(100000, 200000)
let timestamp = Math.floor(Date.now() / 1000)
let sign = md5("salt=xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs&t=" + timestamp + "&r="+ randomStr + "&b=&q=role_id=" + config[0] + "&server=" + config[1])

let req = new Request("https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/dailyNote?server=" + config[1] + "&role_id=" + config[0])
req.method = "get"
req.headers = {
"DS": timestamp + "," + randomStr + "," + sign,
"x-rpc-app_version": "2.19.1",
"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/2.11.1",
"x-rpc-client_type": "5",
"Referer": "https://webstatic.mihoyo.com/",
"Cookie": config[2],
}

let resp = await req.loadJSON()
let data = resp.data

return data
}

async function getTime(time) {
let hh = ~~(time/3600)
let mm = ~~((time%3600)/60)

return hh + "小时" + mm + "分钟"
}

async function getClock(time) {
let timeNow = Date.now()
let now = new Date(timeNow)
let hoursNow = now.getHours()
let minutesNow = now.getMinutes()*60*1000
let secondsNow = now.getSeconds()*1000
let timeRecovery = new Date(timeNow + time*1000)

let tillTommorow = (24-hoursNow)*3600*1000
let tommorow = timeNow + tillTommorow - minutesNow - secondsNow

let str = ""
if(timeRecovery < tommorow){
str = "本日"
} else if (timeRecovery - tommorow > 86400000) {
str = `周${'日一二三四五六'.charAt(timeRecovery.getDay())}`
} else{
str = "次日"
}

return " " + str + ", " + timeRecovery.getHours() + "点" + timeRecovery.getMinutes() + "分"
}

function randomIntFromInterval(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min)
}

function getWeekEnd() {
    const now = new Date()
    const todayStart = new Date(new Date().setHours(4, 0, 0, 0))
    const weekEndTime = todayStart.getTime() + (7 - now.getDay()) * 86400000;
    return weekEndTime
}

function md5(string){
function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
}
function md5_AddUnsigned(lX,lY){
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
        } else {
                return (lResult ^ lX8 ^ lY8);
        }
}         
function md5_F(x,y,z){
        return (x & y) | ((~x) & z);
}
function md5_G(x,y,z){
        return (x & z) | (y & (~z));
}
function md5_H(x,y,z){
        return (x ^ y ^ z);
}
function md5_I(x,y,z){
        return (y ^ (x | (~z)));
}
function md5_FF(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
};
function md5_GG(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
};
function md5_HH(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
};
function md5_II(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
};
function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
};
function md5_WordToHex(lValue){
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for(lCount = 0;lCount<=3;lCount++){
                lByte = (lValue>>>(lCount*8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
};
function md5_Utf8Encode(string){
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                        utftext += String.fromCharCode(c);
                }else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                }
        }
        return utftext;
};
var x=Array();
var k,AA,BB,CC,DD,a,b,c,d;
var S11=7, S12=12, S13=17, S14=22;
var S21=5, S22=9 , S23=14, S24=20;
var S31=4, S32=11, S33=16, S34=23;
var S41=6, S42=10, S43=15, S44=21;
string = md5_Utf8Encode(string);
x = md5_ConvertToWordArray(string);
a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=md5_FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=md5_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=md5_FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=md5_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=md5_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=md5_FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=md5_FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=md5_FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=md5_FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=md5_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=md5_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=md5_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=md5_FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=md5_FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=md5_FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=md5_FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=md5_GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=md5_GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=md5_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=md5_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=md5_GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=md5_GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=md5_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=md5_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=md5_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=md5_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=md5_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=md5_GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=md5_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=md5_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=md5_GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=md5_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=md5_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=md5_HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=md5_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=md5_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=md5_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=md5_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=md5_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=md5_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=md5_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=md5_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=md5_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=md5_HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=md5_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=md5_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=md5_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=md5_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=md5_II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=md5_II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=md5_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=md5_II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=md5_II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=md5_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=md5_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=md5_II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=md5_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=md5_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=md5_II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=md5_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=md5_II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=md5_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=md5_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=md5_II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=md5_AddUnsigned(a,AA);
        b=md5_AddUnsigned(b,BB);
        c=md5_AddUnsigned(c,CC);
        d=md5_AddUnsigned(d,DD);
}
return (md5_WordToHex(a)+md5_WordToHex(b)+md5_WordToHex(c)+md5_WordToHex(d)).toLowerCase();
}

async function loadResinIcon() {
// Base64 img
const url = "data:image/png;base64,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"

let req = new Request(url)
let icon = await req.loadImage()
return icon
}

async function loadCoinIcon() {
const url = "data:image/jpg;base64,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";


let req = new Request(url)
let icon = await req.loadImage()
return icon
}

async function loadDiscountIcon() {
const url = "data:image/png;base64,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"

let req = new Request(url)
let icon = await req.loadImage()
return icon
}

async function loadTaskIcon() {
const url = "data:image/png;base64,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"

let req = new Request(url)
let icon = await req.loadImage()
return icon
}
