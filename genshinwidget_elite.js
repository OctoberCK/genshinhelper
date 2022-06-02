// ========= ↓将生成的配置粘贴这以下↓=========

// ========= ↑将生成的配置粘贴这以上↑ ========

// 图标引入
import avatarIconSource from "./Icon/avatarIcon.png";
import coinIconSource from "./Icon/coinIcon.png";
import darkavatarbackgroundIconSource from "./Icon/darkavatarbackground.png";
import darkbackgroundIconSource from "./Icon/darkbackground.png";
import darkingIconSource from "./Icon/darkingIcon.png";
import darknoneIconSource from "./Icon/darknoneIcon.png";
import darkuidbackgroundIconSource from "./Icon/darkuidbackground.png";
import darkyesIconSource from "./Icon/darkyesIcon.png";
import discountIconSource from "./Icon/discountIcon.png";
import lightavatarbackgroundIconSource from "./Icon/lightavatarbackground.png";
import lightbackgroundIconSource from "./Icon/lightbackground.png";
import lightingIconSource from "./Icon/lightingIcon.png";
import lightnoneIconSource from "./Icon/lightnoneIcon.png";
import lightuidbackgroundIconSource from "./Icon/lightuidbackground.png";
import lightyesIconSource from "./Icon/lightyesIcon.png";
import resinIconSource from "./Icon/resinIcon.png";
import taskIconSource from "./Icon/taskIcon.png";
import transformerIconSource from "./Icon/transformerIcon.png";
import paimonIconSource from "./Icon/paimon.png";

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
let resin = {}
try {
    if (config[1].startsWith("os")) {
        resin = await getDataOs()
    } else {
        resin = await getData()
    }
    resin = resin || {}
} catch (error) {
    console.error(error)
}

// 背景图片定义
const darkbackground = await loaddarkbackground()
const darkuidbackground = await loaddarkuidbackground()
const darkavatarbackground = await loaddarkavatarbackground()
const lightbackground = await loadlightbackground()
const lightuidbackground = await loadlightuidbackground()
const lightavatarbackground = await loadlightavatarbackground()

// 各类图标定义
const resinIcon = await loadResinIcon()
const coinIcon = await loadCoinIcon()
const discountIcon = await loadDiscountIcon()
const taskIcon = await loadTaskIcon()
const avatarIcon = await loadAvatarIcon()
const transformerIcon = await loadTransformerIcon()
const paimonIcon = await loadPaiMonIcon()

// 指示符号
const darknoneIcon = await loaddarkNoneIcon()
const darkingIcon = await loaddarkIngIcon()
const darkyesIcon = await loaddarkYesIcon()
const lightnoneIcon = await loadlightNoneIcon()
const lightingIcon = await loadlightIngIcon()
const lightyesIcon = await loadlightYesIcon()

let widget = await createWidget()
if (config.runsInWidget) {
    Script.setWidget(widget)
} else {
    widget.presentMedium()
}

Script.complete()

// 图标处理器，后续单独处理不同图标类型
async function loadAvatarIcon() {
    let req = new Request(avatarIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadCoinIcon() {
    let req = new Request(coinIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loaddarkavatarbackground() {
    let req = new Request(darkavatarbackgroundIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loaddarkbackground() {
    let req = new Request(darkbackgroundIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loaddarkIngIcon() {
    let req = new Request(darkingIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loaddarkNoneIcon() {
    let req = new Request(darknoneIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loaddarkuidbackground() {
    let req = new Request(darkuidbackgroundIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loaddarkYesIcon() {
    let req = new Request(darkyesIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadDiscountIcon() {
    let req = new Request(discountIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadlightavatarbackground() {
    let req = new Request(lightavatarbackgroundIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadlightbackground() {
    let req = new Request(lightbackgroundIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadlightIngIcon() {
    let req = new Request(lightingIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadlightNoneIcon() {
    let req = new Request(lightnoneIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadlightuidbackground() {
    let req = new Request(lightuidbackgroundIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadlightYesIcon() {
    let req = new Request(lightyesIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadResinIcon() {
    let req = new Request(resinIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadTaskIcon() {
    let req = new Request(taskIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadTransformerIcon() {
    let req = new Request(transformerIconSource);
    let icon = await req.loadImage();
    return icon;
}
async function loadPaiMonIcon() {
    let req = new Request(paimonIconSource);
    let icon = await req.loadImage();
    return icon;
}

async function createWidget() {
    let widget = new ListWidget()
    if (config.widgetFamily === 'small') {
        return await renderSmall(widget);
    } else if (config.widgetFamily === 'medium') {
        return await renderMedium(widget);
    } else if (config.widgetFamily === 'large') {
        return await renderLarge(widget);
    } else {
        return await renderMedium(widget);
    }
}

/**
     * 渲染中尺寸组件
     */
 async function renderMedium(widget) {
    const ThemeConfig = Device.isPad() ? {
        titleSize: 7,
        coinSize: 10,
        iconSize: 24,
        iconRadius: 6,
        coinRadius: 5,
        iconSpacer: 2,
        textSize: 8,
        infoSize: 14,
        info2Size: 11,
        tipSize: 6,
        avatarSize: 24,
        topSpacer: 30,
        bottomSpacer: 15,
    } : {
        titleSize: 7,
        coinSize: 10,
        iconSize: 24,
        iconRadius: 6,
        coinRadius: 5,
        iconSpacer: 2,
        textSize: 8,
        infoSize: 14,
        info2Size: 11,
        tipSize: 6,
        avatarSize: 24,
        topSpacer: 30,
        bottomSpacer: 15,
    }

    const ThemeColor = Device.isUsingDarkAppearance() ? {
        textColor1: new Color("C6BBAD"),
        textColor2: new Color("C6BBAD"),
        LabelColor: new Color("31D154"),
        titleColor: new Color("283346"),
        stackColor: new Color("3D4657"),
    } : {
        textColor1: new Color("4B5566"),
        textColor2: new Color("5F6776"),
        LabelColor: new Color("FF794A"),
        titleColor: new Color("CEBD98"),
        stackColor: new Color("E0D6C7"),
    }

    const ThemeImage = Device.isUsingDarkAppearance() ? {
        bgImage1: darkuidbackground,
        bgImage2: darkbackground,
        bgImage3: darkavatarbackground,
        noneIcon: darknoneIcon,
        yesIcon: darkyesIcon,
        ingIcon: darkingIcon,
    } : {
        bgImage1: lightuidbackground,
        bgImage2: lightbackground,
        bgImage3: lightavatarbackground,
        noneIcon: lightnoneIcon,
        yesIcon: lightyesIcon,
        ingIcon: lightingIcon,
    }

    // 背景
    widget.backgroundImage = ThemeImage.bgImage2

    // 布局
    let headerStack = widget.addStack();
    headerStack.size = new Size(322, 15);
    headerStack.centerAlignContent();
    // 标题
    let stacktime = headerStack.addStack()
    stacktime.backgroundColor = ThemeColor.titleColor
    stacktime.size = new Size(88, 13)
    stacktime.cornerRadius = 7
    stacktime.centerAlignContent()
    headerStack.addSpacer(3)
    let stackHeader = headerStack.addStack()
    stackHeader.backgroundImage = ThemeImage.bgImage1
    stackHeader.size = new Size(158, 13)
    stackHeader.centerAlignContent()
    headerStack.addSpacer(3)
    let stackServer = headerStack.addStack()
    stackServer.backgroundColor = ThemeColor.titleColor
    stackServer.size = new Size(50, 13)
    stackServer.cornerRadius = 7
    stackServer.centerAlignContent()
    // 添加UID
    var textItem = stackHeader.addText(` UID：${config[0]}`)
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize)
    textItem.textColor = ThemeColor.textColor1
    // 添加服务器
    if (config[1] == "cn_qd01") {
        let server = stackServer.addText(`世界树`)
        server.textColor = ThemeColor.ThemeColor.textColor1
        server.font = Font.boldSystemFont(ThemeConfig.titleSize)
    } else {
        let server = stackServer.addText(`天空岛`)
        server.textColor = ThemeColor.textColor1
        server.font = Font.boldSystemFont(ThemeConfig.titleSize)
    }
    // 添加更新时间
    var myDate = new Date();
    var textItem = stacktime.addText(`最近${myDate.getHours().toString().padStart(2, '0')}:${myDate.getMinutes().toString().padStart(2, '0')}更新`)
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize)
    textItem.textColor = ThemeColor.textColor1

    const contentStack = widget.addStack();
    contentStack.size = new Size(322, 125);
    contentStack.centerAlignContent();

    //contentStack.addSpacer();

    const contentLeftStack = contentStack.addStack();
    contentLeftStack.size = new Size(140, 118);
    contentLeftStack.centerAlignContent();
    contentLeftStack.layoutVertically();


    const LeftRow1 = contentLeftStack.addStack();
    LeftRow1.centerAlignContent()
    LeftRow1.size = new Size(140, 34);
    LeftRow1.backgroundColor = ThemeColor.stackColor
    LeftRow1.cornerRadius = 5
    LeftRow1.addSpacer(2)
    const LeftStack1 = LeftRow1.addStack()
    LeftRow1.addSpacer(2)
    const LeftStack11 = LeftRow1.addStack()
    LeftRow1.addSpacer()
    const LeftStack111 = LeftRow1.addStack()
    LeftRow1.addSpacer(3)
    LeftStack1.layoutVertically()
    LeftStack11.layoutVertically()
    LeftStack111.layoutVertically()


    contentLeftStack.addSpacer(6);

    const LeftRow2 = contentLeftStack.addStack();
    LeftRow2.centerAlignContent()
    LeftRow2.size = new Size(140, 34);
    LeftRow2.backgroundColor = ThemeColor.stackColor
    LeftRow2.cornerRadius = 5
    LeftRow2.addSpacer(2)
    const LeftStack2 = LeftRow2.addStack()
    LeftRow2.addSpacer(2)
    const LeftStack22 = LeftRow2.addStack()
    LeftRow2.addSpacer()
    const LeftStack222 = LeftRow2.addStack()
    LeftRow2.addSpacer(3)
    LeftStack2.layoutVertically()
    LeftStack22.layoutVertically()
    LeftStack222.layoutVertically()


    contentLeftStack.addSpacer(6);

    const LeftRow3 = contentLeftStack.addStack();
    LeftRow3.centerAlignContent()
    LeftRow3.size = new Size(140, 34);
    LeftRow3.backgroundColor = ThemeColor.stackColor
    LeftRow3.cornerRadius = 5
    LeftRow3.addSpacer(2)
    const LeftStack3 = LeftRow3.addStack()
    LeftRow3.addSpacer(2)
    const LeftStack33 = LeftRow3.addStack()
    LeftRow3.addSpacer()
    const LeftStack333 = LeftRow3.addStack()
    LeftRow3.addSpacer(3)
    LeftStack3.layoutVertically()
    LeftStack33.layoutVertically()
    LeftStack333.layoutVertically()

    contentStack.addSpacer(6);

    const contentRightStack = contentStack.addStack();
    contentRightStack.size = new Size(159, 118);
    contentRightStack.layoutVertically();
    contentRightStack.centerAlignContent();


    const RightRow1 = contentRightStack.addStack();
    RightRow1.size = new Size(159, 55);
    const RightStack1 = RightRow1.addStack()
    RightStack1.size = new Size(49, 55)
    RightStack1.backgroundColor = ThemeColor.stackColor
    RightStack1.cornerRadius = 5
    RightStack1.layoutVertically()
    RightRow1.addSpacer(6)
    const RightStack2 = RightRow1.addStack()
    RightStack2.size = new Size(49, 55)
    RightStack2.backgroundColor = ThemeColor.stackColor
    RightStack2.cornerRadius = 5
    RightStack2.layoutVertically()
    RightRow1.addSpacer(6)
    const RightStack3 = RightRow1.addStack()
    RightStack3.size = new Size(49, 55)
    RightStack3.backgroundColor = ThemeColor.stackColor
    RightStack3.cornerRadius = 5

    contentRightStack.addSpacer(6);

    const RightRow2 = contentRightStack.addStack();
    RightRow2.layoutVertically()
    RightRow2.size = new Size(159, 55);
    RightRow2.cornerRadius = 5
    RightRow2.backgroundImage = ThemeImage.bgImage3

    // 树脂获取
    let ResinIconElement = LeftStack1.addImage(resinIcon)
    ResinIconElement.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
    let resinStack = LeftStack11.addStack()
    let resinTipStack = LeftStack11.addStack()
    let ResinElement = resinStack.addText(`树脂：`)
    ResinElement.textColor = ThemeColor.textColor2
    ResinElement.font = Font.regularSystemFont(ThemeConfig.textSize)
    let ResinElement2 = resinStack.addText(`${resin.current_resin}`)
    let ResinElement3 = resinStack.addText(` / ${resin.max_resin}`)
    resinStack.centerAlignContent()
    ResinElement2.textColor = ThemeColor.textColor1
    ResinElement3.textColor = ThemeColor.textColor1
    ResinElement2.font = new Font("AvenirNextCondensed-BoldItalic", ThemeConfig.infoSize)
    ResinElement3.font = new Font("AvenirNextCondensed-Italic", ThemeConfig.info2Size)
    let ResinTipElement = resinTipStack.addText(`预计满额时间  `)
    ResinTipElement.textColor = ThemeColor.textColor2
    ResinTipElement.font = Font.regularSystemFont(ThemeConfig.tipSize)
    if (resin.current_home_coin == resin.max_home_coin) {
        let ResinTipElement2 = resinTipStack.addText(`树脂已满`)
        ResinTipElement2.textColor = ThemeColor.LabelColor
        ResinTipElement2.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
    } else {
        let ResinTipElement2 = resinTipStack.addText(`${await getClock(resin.resin_recovery_time)}`)
        ResinTipElement2.textColor = ThemeColor.textColor1
        ResinTipElement2.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
    }
    // 树脂指示标记
    let starResin = LeftStack111.addStack()
    starResin.layoutVertically()
    let starResinline1 = starResin.addStack()
    starResin.addSpacer(1)
    let starResinline2 = starResin.addStack()
    starResin.addSpacer(1)
    let starResinline3 = starResin.addStack()
    starResin.addSpacer(1)
    let starResinline4 = starResin.addStack()
    starResin.size = new Size(11, 21)
    let starcurrent = Math.floor(resin.current_resin / 20)
    let starmax = Math.ceil(resin.max_resin / 20)
    if (starcurrent == starmax) {
        for (let i = 0; i < starmax; i++) {
            if (i === 0 || i === 1) {
                starResinline1.addSpacer(1)
                let starResinElement = starResinline1.addImage(ThemeImage.yesIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
            if (i === 2 || i === 3) {
                starResinline2.addSpacer(1)
                let starResinElement = starResinline2.addImage(ThemeImage.yesIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
            if (i === 4 || i === 5) {
                starResinline3.addSpacer(1)
                let starResinElement = starResinline3.addImage(ThemeImage.yesIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
            if (i === 6 || i === 7) {
                starResinline4.addSpacer(1)
                let starResinElement = starResinline4.addImage(ThemeImage.yesIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
        }
    } else {
        for (let i = 0; i < starcurrent; i++) {
            if (i === 0 || i === 1) {
                starResinline4.addSpacer(1)
                let starResinElement = starResinline4.addImage(ThemeImage.ingIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
            if (i === 2 || i === 3) {
                starResinline3.addSpacer(1)
                let starResinElement = starResinline3.addImage(ThemeImage.ingIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
            if (i === 4 || i === 5) {
                starResinline2.addSpacer(1)
                let starResinElement = starResinline2.addImage(ThemeImage.ingIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
            if (i === 6 || i === 7) {
                starResinline1.addSpacer(1)
                let starResinElement = starResinline1.addImage(ThemeImage.ingIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
        }
        for (let i = starcurrent; i < starmax; i++) {
            if (i === 0 || i === 1) {
                starResinline4.addSpacer(1)
                let starResinElement = starResinline4.addImage(ThemeImage.noneIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
            if (i === 2 || i === 3) {
                starResinline3.addSpacer(1)
                let starResinElement = starResinline3.addImage(ThemeImage.noneIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
            if (i === 4 || i === 5) {
                starResinline2.addSpacer(1)
                let starResinElement = starResinline2.addImage(ThemeImage.noneIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
            if (i === 6 || i === 7) {
                starResinline1.addSpacer(1)
                let starResinElement = starResinline1.addImage(ThemeImage.noneIcon)
                starResinElement.imageSize = new Size(4, 4)
            }
        }
    }

    resinStack.centerAlignContent()

    // 宝钱获取
    let CoinIconElement = LeftStack2.addImage(coinIcon)
    CoinIconElement.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
    let coinStack = LeftStack22.addStack()
    let coinTipStack = LeftStack22.addStack()
    let CoinElement = coinStack.addText(`宝钱：`)
    CoinElement.textColor = ThemeColor.textColor2
    CoinElement.font = Font.regularSystemFont(ThemeConfig.textSize)
    let CoinElement2 = coinStack.addText(`${resin.current_home_coin}`)
    let CoinElement3 = coinStack.addText(` / ${resin.max_home_coin}`)
    coinStack.centerAlignContent()
    CoinElement2.textColor = ThemeColor.textColor1
    CoinElement3.textColor = ThemeColor.textColor1
    CoinElement2.font = new Font("AvenirNextCondensed-BoldItalic", ThemeConfig.infoSize)
    CoinElement3.font = new Font("AvenirNextCondensed-Italic", ThemeConfig.info2Size)
    let CoinTipElement = coinTipStack.addText(`预计满额时间  `)
    CoinTipElement.textColor = ThemeColor.textColor2
    CoinTipElement.font = Font.regularSystemFont(ThemeConfig.tipSize)
    if (resin.current_home_coin == resin.max_home_coin) {
        let CoinTipElement2 = coinTipStack.addText(`财瓮已满`)
        CoinTipElement2.textColor = ThemeColor.LabelColor
        CoinTipElement2.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
    } else {
        let CoinTipElement2 = coinTipStack.addText(`${await getClock(resin.home_coin_recovery_time)}`)
        CoinTipElement2.textColor = ThemeColor.textColor1
        CoinTipElement2.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
    }
    // 宝钱指示标记
    let starCoin = LeftStack222.addStack()
    starCoin.layoutVertically()
    let starCoinline1 = starCoin.addStack()
    starCoin.addSpacer(1)
    let starCoinline2 = starCoin.addStack()
    starCoin.addSpacer(1)
    let starCoinline3 = starCoin.addStack()
    starCoin.addSpacer(1)
    let starCoinline4 = starCoin.addStack()
    starCoin.size = new Size(11, 21)
    let starcoincurrent = Math.floor(resin.current_home_coin / 300)
    let starcoinmax = Math.ceil(resin.max_home_coin / 300)
    if (resin.current_home_coin == resin.max_home_coin) {
        for (let i = 0; i < starcoinmax; i++) {
            if (i === 0 || i === 1) {
                starCoinline1.addSpacer(1)
                let starCoinElement = starCoinline1.addImage(ThemeImage.yesIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
            if (i === 2 || i === 3) {
                starCoinline2.addSpacer(1)
                let starCoinElement = starCoinline2.addImage(ThemeImage.yesIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
            if (i === 4 || i === 5) {
                starCoinline3.addSpacer(1)
                let starCoinElement = starCoinline3.addImage(ThemeImage.yesIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
            if (i === 6 || i === 7) {
                starCoinline4.addSpacer(1)
                let starCoinElement = starCoinline4.addImage(ThemeImage.yesIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
        }
    } else {
        for (let i = 0; i < starcoincurrent; i++) {
            if (i === 0 || i === 1) {
                starCoinline4.addSpacer(1)
                let starCoinElement = starCoinline4.addImage(ThemeImage.ingIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
            if (i === 2 || i === 3) {
                starCoinline3.addSpacer(1)
                let starCoinElement = starCoinline3.addImage(ThemeImage.ingIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
            if (i === 4 || i === 5) {
                starCoinline2.addSpacer(1)
                let starCoinElement = starCoinline2.addImage(ThemeImage.ingIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
            if (i === 6 || i === 7) {
                starCoinline1.addSpacer(1)
                let starCoinElement = starCoinline1.addImage(ThemeImage.ingIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
        }
        for (let i = starcoincurrent; i < starcoinmax; i++) {
            if (i === 0 || i === 1) {
                starCoinline4.addSpacer(1)
                let starCoinElement = starCoinline4.addImage(ThemeImage.noneIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
            if (i === 2 || i === 3) {
                starCoinline3.addSpacer(1)
                let starCoinElement = starCoinline3.addImage(ThemeImage.noneIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
            if (i === 4 || i === 5) {
                starCoinline2.addSpacer(1)
                let starCoinElement = starCoinline2.addImage(ThemeImage.noneIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
            if (i === 6 || i === 7) {
                starCoinline1.addSpacer(1)
                let starCoinElement = starCoinline1.addImage(ThemeImage.noneIcon)
                starCoinElement.imageSize = new Size(4, 4)
            }
        }
    }
    coinStack.centerAlignContent()

    // 参量质变仪
    var transformIcon = LeftStack3.addImage(transformerIcon)
    transformIcon.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
    let stackText = LeftStack33.addStack()
    let stackTipStack = LeftStack33.addStack()
    var textItem = stackText.addText("参量质变仪：")
    textItem.font = Font.regularSystemFont(ThemeConfig.textSize)
    textItem.textColor = ThemeColor.textColor2
    stackText.centerAlignContent()
    const transformer_recovery_time = resin.transformer && resin.transformer.recovery_time || {}
    if (transformer_recovery_time.reached) {
        var textItem = stackTipStack.addText(`冷却时间 `)
        var textItem2 = stackTipStack.addText(`冷却完毕`)
        textItem.font = Font.regularSystemFont(ThemeConfig.tipSize)
        textItem.textColor = ThemeColor.textColor2
        textItem2.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
        textItem2.textColor = ThemeColor.LabelColor
        var textItem3 = stackText.addText("可使用")
        textItem3.font = Font.boldRoundedSystemFont(ThemeConfig.info2Size)
        textItem3.textColor = ThemeColor.textColor1
        textItem3.textOpacity = 1
    } else {
        if (+transformer_recovery_time.Day > 0) {
            var textItem = stackTipStack.addText(`冷却时间  `)
            var textItem2 = stackTipStack.addText(`${transformer_recovery_time.Day}天`)
            textItem.font = Font.regularSystemFont(ThemeConfig.tipSize)
            textItem.textColor = ThemeColor.textColor2
            textItem2.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
            textItem2.textColor = ThemeColor.textColor1
            var textItem3 = stackText.addText("冷却中")
            textItem3.font = Font.boldRoundedSystemFont(ThemeConfig.info2Size)
            textItem3.textColor = ThemeColor.textColor1
            textItem3.textOpacity = 1
        }
        if (+transformer_recovery_time.Hour > 0) {
            var textItem = stackTipStack.addText(`冷却时间  `)
            var textItem2 = stackTipStack.addText(`${transformer_recovery_time.Hour}小时`)
            textItem.font = Font.regularSystemFont(ThemeConfig.tipSize)
            textItem.textColor = ThemeColor.textColor2
            textItem2.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
            textItem2.textColor = ThemeColor.textColor1
            var textItem3 = stackText.addText("冷却中")
            textItem3.font = Font.boldRoundedSystemFont(ThemeConfig.info2Size)
            textItem3.textColor = ThemeColor.textColor1
            textItem3.textOpacity = 1
        }
        if (+transformer_recovery_time.Minute > 0) {
            var textItem = stackTipStack.addText(`冷却时间  `)
            var textItem2 = stackTipStack.addText(`${transformer_recovery_time.Minute}分钟`)
            textItem.font = Font.regularSystemFont(ThemeConfig.tipSize)
            textItem.textColor = ThemeColor.textColor2
            textItem2.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
            textItem2.textColor = ThemeColor.textColor1
            var textItem3 = stackText.addText("冷却中")
            textItem3.font = Font.boldRoundedSystemFont(ThemeConfig.info2Size)
            textItem3.textColor = ThemeColor.textColor1
            textItem3.textOpacity = 1
        }
        if (+transformer_recovery_time.Second > 0) {
            var textItem = stackTipStack.addText(`冷却时间  `)
            var textItem2 = stackTipStack.addText(`${transformer_recovery_time.Second}秒`)
            textItem.font = Font.regularSystemFont(ThemeConfig.tipSize)
            textItem.textColor = ThemeColor.textColor2
            textItem2.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
            textItem2.textColor = ThemeColor.textColor1
            var textItem3 = stackText.addText("冷却中")
            textItem3.font = Font.boldRoundedSystemFont(ThemeConfig.info2Size)
            textItem3.textColor = ThemeColor.textColor1
            textItem3.textOpacity = 1
        }
    }
    // 质变仪指示标记
    let starTrans = LeftStack333.addStack()
    starTrans.layoutVertically()
    let starTransline1 = starTrans.addStack()
    starTrans.addSpacer(1)
    let starTransline2 = starTrans.addStack()
    starTrans.addSpacer(1)
    let starTransline3 = starTrans.addStack()
    starTrans.addSpacer(1)
    let starTransline4 = starTrans.addStack()
    starTrans.size = new Size(11, 21)
    let startranscurrent = 7 - transformer_recovery_time.Day
    let startransmax = 7
    if (transformer_recovery_time.reached) {
        for (let i = 0; i < startransmax; i++) {
            if (i === 0 || i === 1) {
                starTransline1.addSpacer(1)
                let starTransElement = starTransline1.addImage(ThemeImage.yesIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
            if (i === 2 || i === 3) {
                starTransline2.addSpacer(1)
                let starTransElement = starTransline2.addImage(ThemeImage.yesIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
            if (i === 4 || i === 5) {
                starTransline3.addSpacer(1)
                let starTransElement = starTransline3.addImage(ThemeImage.yesIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
            if (i === 6 || i === 7) {
                starTransline4.addSpacer(1)
                let starTransElement = starTransline4.addImage(ThemeImage.yesIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
        }
    } else {
        for (let i = 0; i < startranscurrent; i++) {
            if (i === 0 || i === 1) {
                starTransline4.addSpacer(1)
                let starTransElement = starTransline4.addImage(ThemeImage.ingIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
            if (i === 2 || i === 3) {
                starTransline3.addSpacer(1)
                let starTransElement = starTransline3.addImage(ThemeImage.ingIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
            if (i === 4 || i === 5) {
                starTransline2.addSpacer(1)
                let starTransElement = starTransline2.addImage(ThemeImage.ingIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
            if (i === 6 || i === 7) {
                starTransline1.addSpacer(1)
                let starTransElement = starTransline1.addImage(ThemeImage.ingIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
        }
        for (let i = startranscurrent; i < startransmax; i++) {
            if (i === 0 || i === 1) {
                starTransline4.addSpacer(1)
                let starTransElement = starTransline4.addImage(ThemeImage.noneIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
            if (i === 2 || i === 3) {
                starTransline3.addSpacer(1)
                let starTransElement = starTransline3.addImage(ThemeImage.noneIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
            if (i === 4 || i === 5) {
                starTransline2.addSpacer(1)
                let starTransElement = starTransline2.addImage(ThemeImage.noneIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
            if (i === 6 || i === 7) {
                starTransline1.addSpacer(1)
                let starTransElement = starTransline1.addImage(ThemeImage.noneIcon)
                starTransElement.imageSize = new Size(4, 4)
            }
        }
    }



    // 每日委托获取
    let TaskIcon = RightStack1.addStack()
    TaskIcon.layoutHorizontally()
    TaskIcon.addSpacer()
    let TaskIconElement = TaskIcon.addImage(taskIcon)
    TaskIconElement.imageSize = new Size(22, 22)
    TaskIcon.addSpacer()
    let taskStack = RightStack1.addStack()
    let taskText = RightStack1.addStack()
    taskStack.addSpacer(8)
    let TaskElement = taskStack.addText(`每日委托`)
    TaskElement.textColor = ThemeColor.textColor2
    TaskElement.font = Font.regularSystemFont(ThemeConfig.textSize)
    let remaintasknum = resin.total_task_num - resin.finished_task_num
    taskText.addSpacer()
    let TaskElement2 = taskText.addText(`剩`)
    let TaskElement3 = taskText.addText(` ${remaintasknum} `)
    let TaskElement4 = taskText.addText(`个`)
    taskText.addSpacer()
    TaskElement2.centerAlignText()
    TaskElement2.textOpacity = 1
    TaskElement2.font = Font.mediumRoundedSystemFont(ThemeConfig.textSize)
    TaskElement2.textColor = ThemeColor.textColor1
    TaskElement3.textOpacity = 1
    TaskElement3.font = new Font("AvenirNextCondensed-BoldItalic", ThemeConfig.info2Size)
    TaskElement3.textColor = ThemeColor.textColor1
    TaskElement4.textOpacity = 1
    TaskElement4.font = Font.mediumRoundedSystemFont(ThemeConfig.textSize)
    TaskElement4.textColor = ThemeColor.textColor1
    taskText.centerAlignContent()
    // 指示标记
    let starTask = RightStack1.addStack()
    starTask.addSpacer()
    if (remaintasknum == resin.total_task_num) {
        for (let i = 0; i++ < resin.total_task_num;) {
            starTask.addSpacer(2)
            let starTaskElement = starTask.addImage(ThemeImage.yesIcon)
            starTaskElement.imageSize = new Size(4, 4)
        }
    } else {
        for (let i = 0; i++ < remaintasknum;) {
            starTask.addSpacer(2)
            let starTaskElement = starTask.addImage(ThemeImage.ingIcon)
            starTaskElement.imageSize = new Size(4, 4)
        }
        for (let i = remaintasknum; i++ < resin.finished_task_num;) {
            starTask.addSpacer(2)
            let starTaskElement = starTask.addImage(ThemeImage.noneIcon)
            starTaskElement.imageSize = new Size(4, 4)
        }
    }
    starTask.addSpacer()
    RightStack1.addSpacer(4)
    taskStack.centerAlignContent()

    // 周本获取
    let DiscountIcon = RightStack2.addStack()
    DiscountIcon.layoutHorizontally()
    DiscountIcon.addSpacer()
    let DiscountIconElement = DiscountIcon.addImage(discountIcon)
    DiscountIconElement.imageSize = new Size(22, 22)
    DiscountIcon.addSpacer()
    let resinDiscountStack = RightStack2.addStack()
    let resinDiscountText = RightStack2.addStack()
    resinDiscountStack.addSpacer(8)
    let ResinDiscountTextElement = resinDiscountStack.addText(`半价周本`)
    ResinDiscountTextElement.textColor = ThemeColor.textColor2
    ResinDiscountTextElement.font = Font.regularSystemFont(ThemeConfig.textSize)
    resinDiscountText.addSpacer()
    let ResinDiscountTextElement2 = resinDiscountText.addText(`剩`)
    let ResinDiscountTextElement3 = resinDiscountText.addText(` ${resin.remain_resin_discount_num} `)
    let ResinDiscountTextElement4 = resinDiscountText.addText(`次`)
    resinDiscountText.addSpacer()
    ResinDiscountTextElement2.textOpacity = 1
    ResinDiscountTextElement2.font = Font.mediumRoundedSystemFont(ThemeConfig.textSize)
    ResinDiscountTextElement2.textColor = ThemeColor.textColor1
    ResinDiscountTextElement3.textOpacity = 1
    ResinDiscountTextElement3.font = new Font("AvenirNextCondensed-BoldItalic", ThemeConfig.info2Size)
    ResinDiscountTextElement3.textColor = ThemeColor.textColor1
    ResinDiscountTextElement4.textOpacity = 1
    ResinDiscountTextElement4.font = Font.mediumRoundedSystemFont(ThemeConfig.textSize)
    ResinDiscountTextElement4.textColor = ThemeColor.textColor1
    resinDiscountText.centerAlignContent()
    resinDiscountStack.centerAlignContent()
    // 指示标记
    let starDiscount = RightStack2.addStack()
    starDiscount.addSpacer()
    if (resin.remain_resin_discount_num == resin.resin_discount_num_limit) {
        for (let i = 0; i++ < resin.total_task_num;) {
            starDiscount.addSpacer(2)
            let starDiscountElement = starDiscount.addImage(ThemeImage.yesIcon)
            starDiscountElement.imageSize = new Size(4, 4)
        }
    } else {
        for (let i = 0; i++ < resin.remain_resin_discount_num;) {
            starDiscount.addSpacer(2)
            let starDiscountElement = starDiscount.addImage(ThemeImage.ingIcon)
            starDiscountElement.imageSize = new Size(4, 4)
        }
        for (let i = resin.remain_resin_discount_num; i++ < resin.resin_discount_num_limit;) {
            starDiscount.addSpacer(2)
            let starDiscountElement = starDiscount.addImage(ThemeImage.noneIcon)
            starDiscountElement.imageSize = new Size(4, 4)
        }
    }
    starDiscount.addSpacer()
    RightStack2.addSpacer(4)

    // 派蒙图片
    let PaimonIcon = RightStack3.addStack()
    let PaimonIconElement = PaimonIcon.addImage(paimonIcon)
    PaimonIconElement.imageSize = new Size(46, 55)


    // 派遣任务获取
    let expeditionsTitleStack = RightRow2.addStack()
    expeditionsTitleStack.layoutHorizontally()
    expeditionsTitleStack.centerAlignContent()
    //let isHasFinished = false
    let minCoverTime = 0
    expeditionsTitleStack.addSpacer(5)
    let avatarIconElement = expeditionsTitleStack.addImage(avatarIcon)
    avatarIconElement.imageSize = new Size(20, 20)
    expeditionsTitleStack.addSpacer(ThemeConfig.iconSpacer)
    let expeditionsTitleElement = expeditionsTitleStack.addText(`探索派遣：`)
    expeditionsTitleElement.textColor = ThemeColor.textColor2
    expeditionsTitleElement.font = Font.regularSystemFont(ThemeConfig.textSize)
    let expeditionsStack = RightRow2.addStack()
    RightRow2.addSpacer(4)
    let starExpedition = RightRow2.addStack()
    RightRow2.addSpacer(3)
    expeditionsStack.addSpacer(7)
    starExpedition.addSpacer(16)
    const expeditions = resin.expeditions || []
    await Promise.all(expeditions.map(async (expedition) => {
        let req = new Request(expedition.avatar_side_icon)
        expedition.icon = await req.loadImage()
    }));
    minCoverTime = expeditions[0] ? +expeditions[0].remained_time : 0
    for (let i = -1; i++ < resin.max_expedition_num;) {
        let expeditionStack = expeditionsStack.addStack()
        expeditionStack.layoutHorizontally()
        let isOngoing = !!expeditions[i]
        if (isOngoing) {
            const { status, icon, remained_time } = expeditions[i]
            if (+remained_time < minCoverTime) minCoverTime = +remained_time
            let avatarImgElement = expeditionStack.addImage(icon)
            avatarImgElement.imageSize = new Size(ThemeConfig.avatarSize, ThemeConfig.avatarSize)
            avatarImgElement.cornerRadius = 0
            expeditionStack.addSpacer(6)
            expeditionStack.topAlignContent()
            if (status === 'Finished') {
                isHasFinished = true
                let starExpeditionElement = starExpedition.addImage(ThemeImage.yesIcon)
                starExpeditionElement.imageSize = new Size(4, 4)
                starExpedition.addSpacer(27)
            } else {
                let starExpeditionElement = starExpedition.addImage(ThemeImage.ingIcon)
                starExpeditionElement.imageSize = new Size(4, 4)
                starExpedition.addSpacer(27)
            }
        } else {
            let starExpeditionElement = starExpedition.addImage(ThemeImage.noneIcon)
            starExpeditionElement.imageSize = new Size(4, 4)
            starExpedition.addSpacer(27)
        }
    }
    //RightRow2.addSpacer()
    let minCoverTimeElemnet = expeditionsTitleStack.addText(`已派出`)
    minCoverTimeElemnet.textColor = ThemeColor.textColor1
    minCoverTimeElemnet.font = Font.mediumRoundedSystemFont(ThemeConfig.textSize)
    let minCoverTimeElemnet2 = expeditionsTitleStack.addText(` ${resin.current_expedition_num} `)
    minCoverTimeElemnet2.textColor = ThemeColor.textColor1
    minCoverTimeElemnet2.font = new Font("AvenirNextCondensed-BoldItalic", ThemeConfig.info2Size)
    let minCoverTimeElemnet3 = expeditionsTitleStack.addText(`人`)
    minCoverTimeElemnet3.textColor = ThemeColor.textColor1
    minCoverTimeElemnet3.font = Font.mediumRoundedSystemFont(ThemeConfig.textSize)
    // if (isHasFinished) {
    //     let minCoverTimeElemnet = expeditionsTitleStack.addText(`已派出${resin.current_expedition_num}人`)
    //     minCoverTimeElemnet.textColor = ThemeColor.textColor1
    //     minCoverTimeElemnet.font = Font.boldRoundedSystemFont(ThemeConfig.textSize)
    // } else {
    //     let minCoverTimeElemnet = expeditionsTitleStack.addText(`已派出${resin.current_expedition_num}人`)
    //     minCoverTimeElemnet.textColor = ThemeColor.textColor1
    //     minCoverTimeElemnet.font = Font.boldRoundedSystemFont(ThemeConfig.textSize)
    // }
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
    let sign = md5("salt=xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs&t=" + timestamp + "&r=" + randomStr + "&b=&q=role_id=" + config[0] + "&server=" + config[1])
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

/**
 * 返回原神便笺信息(国际服)
 *
 * @return {Promise<ResinResponse>} 便笺数据
 */
async function getDataOs() {
    let randomStr = randomStrGen(6)
    let timestamp = Math.floor(Date.now() / 1000)
    let sign = md5("salt=6s25p5ox5y14umn1p61aqyyvbvvl3lrt&t=" + timestamp + "&r=" + randomStr)

    let req = new Request("https://bbs-api-os.hoyolab.com/game_record/genshin/api/dailyNote?server=" + config[1] + "&role_id=" + config[0])
    req.method = "GET"
    req.headers = {
        "DS": timestamp + "," + randomStr + "," + sign,
        "x-rpc-client_type": "5",
        "x-rpc-app_version": "2.9.1",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBSOversea/2.9.1",
        "Origin": "https://act.hoyolab.com",
        "Referer": "https://act.hoyolab.com/",
        "Cookie": config[2]
    }

    let resp = await req.loadJSON()
    let data = resp.data

    return data
}

function randomStrGen(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function getTime(time) {
    let hh = ~~(time / 3600)
    let mm = ~~((time % 3600) / 60)

    return hh + ":" + mm
}

async function getClock(time) {
    if (+time <= 0) return "已满"
    
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
        str = "今日"
    } else if (timeRecovery - tommorow > 86400000) {
        str = `周${'日一二三四五六'.charAt(timeRecovery.getDay())}`
    } else {
        str = "明日"
    }

    return " " + str + timeRecovery.getHours() + "点" + timeRecovery.getMinutes() + "分"
}

// 获取每日素材信息
async function getWeeklyMaterialData() {
    const RegionAbbr = { "MD": "蒙德", "LY": "璃月", "DQ": "稻妻" };
    const AvatarMaterial = new Map([
        ["自由", { day: [1, 4], loc: "MD", icon: ziyouIcon }],
        ["繁荣", { day: [1, 4], loc: "LY", icon: fanrongIcon }],
        ["浮世", { day: [1, 4], loc: "DQ", icon: fushiIcon }],
        ["抗争", { day: [2, 5], loc: "MD", icon: kangzhengIcon }],
        ["勤劳", { day: [2, 5], loc: "LY", icon: qinlaoIcon }],
        ["风雅", { day: [2, 5], loc: "DQ", icon: fengyaIcon }],
        ["诗文", { day: [3, 6], loc: "MD", icon: shiwenIcon }],
        ["黄金", { day: [3, 6], loc: "LY", icon: huangjinIcon }],
        ["天光", { day: [3, 6], loc: "DQ", icon: tianguangIcon }]
    ])  // Start from 1: monday

    const WeaponsMaterial = new Map([
        ["高塔孤王", { day: [1, 4], loc: "MD", icon: gaotaIcon }],
        ["孤云寒林", { day: [1, 4], loc: "LY", icon: guyunIcon }],
        ["远海夷地", { day: [1, 4], loc: "DQ", icon: yuanhaiIcon }],
        ["凛风奔狼", { day: [2, 5], loc: "MD", icon: lingfengIcon }],
        ["雾海云间", { day: [2, 5], loc: "LY", icon: wuhaiIcon }],
        ["鸣神御灵", { day: [2, 5], loc: "DQ", icon: mingshenIcon }],
        ["狮牙斗士", { day: [3, 6], loc: "MD", icon: shiyaIcon }],
        ["漆黑陨铁", { day: [3, 6], loc: "LY", icon: qiheiIcon }],
        ["今昔剧画", { day: [3, 6], loc: "DQ", icon: jinxiIcon }]
    ]);

    for (let [key, value] of AvatarMaterial.entries()) {
        value.loc = RegionAbbr[value.loc];
    }

    for (let [key, value] of WeaponsMaterial.entries()) {
        value.loc = RegionAbbr[value.loc];
    }

    return [AvatarMaterial, WeaponsMaterial]

}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function md5(string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
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
    function md5_F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function md5_G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function md5_H(x, y, z) {
        return (x ^ y ^ z);
    }
    function md5_I(x, y, z) {
        return (y ^ (x | (~z)));
    }
    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    function md5_WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };
    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
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
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}

start();