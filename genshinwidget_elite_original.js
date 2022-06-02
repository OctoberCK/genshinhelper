// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: moon;

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
const pTransformerIcon = await loadParametricTransformerIcon()
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
    var transformIcon = LeftStack3.addImage(pTransformerIcon)
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
        if (transformer_recovery_time.Day != 0) {
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
        if (transformer_recovery_time.Hour != 0) {
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
        if (transformer_recovery_time.Minute != 0) {
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
        if (transformer_recovery_time.Second != 0) {
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
            let { status, icon, remained_time } = expeditions[i]
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
    let minCoverTimeElement = expeditionsTitleStack.addText(`已派出`)
    minCoverTimeElement.textColor = ThemeColor.textColor1
    minCoverTimeElement.font = Font.mediumRoundedSystemFont(ThemeConfig.textSize)
    let minCoverTimeElement2 = expeditionsTitleStack.addText(` ${resin.current_expedition_num} `)
    minCoverTimeElement2.textColor = ThemeColor.textColor1
    minCoverTimeElement2.font = new Font("AvenirNextCondensed-BoldItalic", ThemeConfig.info2Size)
    let minCoverTimeElement3 = expeditionsTitleStack.addText(`人`)
    minCoverTimeElement3.textColor = ThemeColor.textColor1
    minCoverTimeElement3.font = Font.mediumRoundedSystemFont(ThemeConfig.textSize)
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

async function loaddarkbackground() {
    const url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA/YAAAHaCAYAAACq6dIwAAAAAXNSR0IArs4c6QAAIABJREFUeF7s3QmUJHd9J/hfZJ1d3VXVrVtCBwgJiRsDBktqCQFSG2MDBtNqbDzrA4/Hw6zH652Z9bxd766e561nZud5dj0zPphZ3za21HgAc0sCBJKQDcbcQhISkhBIQlKru/quK2NfZHVV15FZGZGVWV0V8cn3GklV/zh+n182733jH/GPJDbvJ3nFm960pf/ottG+dHK4lgwMRd/Mjkhqz02idklajwsjidOTSE9L0zgtkuS0JOLsiOjbvCU7cwIECBAgQIAAAQIECBDIITCbRnw/0vSZJIln0kieiTT2JbX4Thr1B+r1uKdWrx1Nk/rxmbR/cmbk8KEvfuhDxyIizbHvDTck2XBntPoJJa9+/U+eNdQ388J6WntxJOlLkjSeF0mck0ZyVhIxtsnqcboECBAgQIAAAQIECBAgcGoEJiLiyTRNvx9J3B9p8tVaUv/aTAx//XO3/NlTmynkb4pgf+2PvPP82ZmZN6QRP5Ik8eKI2J5GjCcRg6em/45KgAABAgQIECBAgAABAiUTmIqILOwfSNP619Kk76MDfX2fuP1jf/HdjV7nhgz2r3jTm0a2Tm49fTZmL08i+ekk4q0RyehGx3R+BAgQIECAAAECBAgQIFAmgfRQGsn761H/k8G+2fsnD/Ttu/vuvdkt+xvqs6GC/VVXvXk0GdnyhkjS65M0rookuTwiahtKzMkQIECAAAECBAgQIECAQKUE0oh6EvGNNI3PJUn9tqm+wVv+7mN/cXCjIGyIYP+CF+we3HFuvLVWS/5FJMnzYu5Z+Q1xbhulUc6DAAECBAgQIECAAAECBE65QLa43sFI0/vrSfpb+8fj/ffs3Zvdwn9KP6cyPCc7f/SntieTs9ekSfq/J0nyilMq4eAECBAgQIAAAQIECBAgQKCAQJrG36dp/NuBmclP3X77B7Ln80/JqvqnJtjv3t13zYHkh+tJ/EIS8caIZKiAnaEECBAgQIAAAQIECBAgQGCDCKSTacRH00j+21233PSJiKiv94mte7B/9bVvO39gYOA3kyTNAv1pbrlf75Y7HgECBAgQIECAAAECBAh0WSCNSJ9J0/ib2dn0f7/7U3u/1+X9r7q79Qr2jdvuY2r2uiRJfzMiuWQ9i3QsAgQIECBAgAABAgQIECCwTgIPpGn8rzHYd9udH3nv/vU45joE+xtrV7zuG6/s66v9WpKkb45I+tejMMcgQIAAAQIECBAgQIAAAQKnRiCdiUg+mEb93955y95/6PWz9z0P9ldet/tHa7XabycRz/HqulPzlXJUAgQIECBAgAABAgQIEFh3gXok8UC9nv7qXbfe/NFeHr1XwT55xbU/efrIQP2X0yR+PfEu+l720L4JECBAgAABAgQIECBAYIMKpBH1WqT/5vjs9H/+/Cff/0wvZu97EuyvesPuy5J68u+SNPnRSGJgg/o6LQIECBAgQIAAAQIECBAgsB4C02mkH0lr6b++6+N77+v2Abse7K/ctedFfWl6c5okl5mp73a77I8AAQIECBAgQIAAAQIENqNANnOfpOl9Scy+5bO3/vW3ullD14L97t27+x7bH1ckfbU/T9K4qJsnaV8ECBAgQIAAAQIECBAgQKAUAmk8VKslP3PW2Ozn9u7dO9uNmroW7Hfu2vNjEfEfkojLu3Fi9kGAAAECBAgQIECAAAECBMookEbcm6b1X7vr1r1/0436uhLsr9q1+121tPbvIokzunFS9kGAAAECBAgQIECAAAECBEotkMbTEfV/dcete/94rXWuKdjfeOONtU/e/c03RZr+QURy+lpPxvYECBAgQIAAAQIECBAgQKA6Aum+SJJ3vf6K53/oxhtvrHda95qC/VXX7d5Zq9V+PyJe2OkJ2I4AAQIECBAgQIAAAQIECFRWIE3vqdfrv3TXJ993R6cGHQf7udXv48ORWCivU3zbESBAgAABAgQIECBAgACBSOORtB677vzkTfd3otFRsN/5xj3Pi5n44EBf7fKZ2Y7vFsh9vkmSRJqmucevZWB2rOyz+J+1Wi36an2R1JKo1ZLG77I/teyftVpj/FpOb30qW4uKbQkQIECAAAECBAgQIHBSoKMgOb/5oo3n/zWt16Oepo3cl/2p19NI62nM1mejXq8v5MH5XNjrfJhlvUiicR69/mSHyvJkGvGNmI23dRLuC/dj586f2pGMzP5eRLz9nDO29g0P9sV3njjUs4K3jw7FQH9fPLX/aM88s5De19e38KfWV5sL7UltIeCfPHjzxgr2PWuPHRMgQIAAAQIECBAgsMEECgfJxeffJNivLG/poEbgPxHwZ2frMTs7u/CnFyG/v78Wlz17R3z3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IECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQIECAAAECBAgQIFACAcG+BE1UAgECBAgQIECAAAECBAhUV0Cwr27vVU6AAAECBAgQIECAAAECJRAQ7EvQRCUQIECAAAECBAgQIECAQHUFBPvq9l7lBAgQ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"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loadlightbackground() {
    const url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA/YAAAHaCAYAAACq6dIwAAAAAXNSR0IArs4c6QAAIABJREFUeF7svWmMJFt233duZlV1V1Wv1cvrt/Rs72k41CNnCMmgYVimYYGkKUqyRVk2ZNgABVGGZQNeBEOQYVD+YoDyAn0gbENeIEgCBMGmacikSBo0KNKybAEWDNlDzZDD4ayvl9evq7qqq6prr8wwzl0iIzMjMm5ERi6V+YtBT2+RN+793cjG+99zzv8YuaJXkiRG5OP1o6P2zYuLzvV2e/XaSmLudiV537RaH0jS/ZR05V4isiUts2X0Z5G3RKR9RZfMtCEAAQhAAAIQgAAEIAABCEAgjkBHRD5JRHalm+waMbvSSl6JaX3U6na/0W6v/NZp9/J4dbV92jm4ONt82DkUefvEGJPEDT9fd5n5ms7o2aiYPzp6+bCdtD/sdLvfL6b1xZaYzydJ91Ei8tAYc+sqrYe5QgACEIAABCAAAQhAAAIQgMBsCCSJ7IskL43RAwDzdUm6v5m0Wv9Y5NpXbty4sX2VRP6VEPbJ8av3ji/lx0SSP5QkyfcbY+6IyG0RWZvNK8BTIQABCEAAAhCAAAQgAAEIQGDBCJyLyH6SJK+NMf+41Ta/ct3Ir5qNe0/nfZ1zKeyfP3++cefatXvdtnzBmORfN0Z+IhG5Oe8wmR8EIAABCEAAAhCAAAQgAAEILA4BI3LYTeRvt1vyN5Jz8/X14+NX5vHjk3lb4VwJ+yTZvnmy3/qxpNX9kUTMP21EviAirXmDxnwgAAEIQAACEIAABCAAAQhAYHkIJEnSNS3zVRHzD7od+bXzjvxv9+7dO5gXAnMh7JPkq2tv9h/8RMu0/gMx8nkR0Vr5uZjbvGwU84AABCAAAQhAAAIQgAAEIACBmRNIEpEDk8jXu0n3L9+4/eBvG2M0hX+m18zEsxrh7e/v31ltXf6QmOQvSmJ+/0xJ8HAIQAACEIAABCAAAQhAAAIQgEA1Av+PMfKX1m+0f13kzv6sDPdmIuyTJGkfH2z/82Jaf0Yk+XERc60aO+6GAAQgAAEIQAACEIAABCAAAQjMA4HkTMT8iiTd/37j1oNfNcZ0pz2rqQv741dP35PV6z+TiPy4uN7yU5/DtCHzPAhAAAIQgAAEIAABCEAAAhBYaAKaor8rIr/YWpG/uLFx/9k0VzsVUa1p97K/f+ek3fnhJEl+RkQ+mOYieRYEIAABCEAAAhCAAAQgAAEIQGAaBIzIN8SY/+i80/61O3fu7E3pmZN9TJIkrZODV/9EYuQviMi/ICIrk30io0MAAhCAAAQgAAEIQAACEIAABGZK4FJEfmG1vfKXVjdu/6NJ195PPGJ/tL/9h0XkZ8WYz9K6bqYvFg+HAAQgAAEIQAACEIAABCAAgekR6Gr0Pklaf27z9tavTPKxExH2mnp/ePjxvXay+u+IMT+NoJ/kFjI2BCAAAQhAAAIQgAAEIAABCMwxga4Y8590ktX/8ubNm7uTiN5PRNifHmx/T0fMfyoiGq1fnWPATA0CEIAABCAAAQhAAAIQgAAEIDBpAhci8sttWfsPr9+69TtNP6xxYX+4u/t9ZqX7c0bke4jUN71djAcBCEAAAhCAAAQgAAEIQAACV5RAN0nkd1Zk9V+8fvv27za5hsaEffJzP9c+/LEf/qfa0v2bIvLpJifJWBCAAAQgAAEIQAACEIAABCAAgYUgkCTfbpnkJ6/ffPAPjDGdJtbUmLA/Otj9I4l0/wsj8oUmJsYYEIAABCAAAQhAAAIQgAAEIACBRSRgRL6WSPIXNm89+MUm1teIsD86ePlTYmvqzf0mJsUYEIAABCAAAQhAAAIQgAAEIACBxSZgdhJJ/vyNW/f/+rjrHEvYa4/648NXf1RE/qqI3IudzNnRriSSyLWNu2JMK/Zj3AcBCEAAAhCAAAQgAAEIQAACEJg7AknSleP9F7Jx520xUklmvxKRn9q4ee/vGGO6dRdW6YmDDzk52P0DXdP9bySRD2Mn0Lk8lzd7T0SSRDZuP5LVazdiP8p9EIAABCAAAQhAAAIQgAAEIACBuSNwfnIgJwcv5Pqtt+Ta+u2q8/utlnT/7Pqth3+/6gfD/bWF/dnh7vdddru/JKaaUZ5G608Ot0UkkbX1O7J+6yFR+7q7x+cgAAEIQAACEIAABCAAAQhAYKYENFp/sv9Czk8PpL16TW5sfbqOxv1u5yz50VsPHny9zmJqCfvTg4PPd+X8F5KKRnndzoUc7T2TzuWpnatpteXG3cfSXr1eZ+65n1GoZ8eHcrS/I+cnh9LtdvVBsnZtQzZv35PrN+5Iq9Vu7HkMBAEIQAACEIAABCAAAQhAAALzQ6BzeSFH+9tycrgnlxdndmIrq9dk/eZd2bz9QNorq41O9vL8WN7sPrHBa2OMXL/50JadV70Ska+uSPLHr9+qLu4rC/vXr797d619468kSfInRKSSQj59syP6I3tpKv7mnXdFTOWpDHHqdjtyuPvCbmKign7wMkbWb9yRm3e1BGC9KmfuhwAEIAABCEAAAhCAAAQgAIE5JnB+8kb2d57J+elR7izXrm/K7fvvytp6QyXhSVcOdz+SzoULXuvVXl2Xzbvv1Qgom44x8j+dXbb+rbt3776ugrmymj7af/nTptX66SSRa1UepKcYR7tPJZFBwa0nGvfl+ma0917hYw92P5Y3uy8kSZKRU9OTmjsPP1UDdJUVcy8EIAABCEAAAhCAAAQgAAEITIuARup3P/5WoagP81Bxv/X25xqJ3Kth3vnJsAa/vrllI/dVL2PkTJLWf7xxa+s/r/LZaGGvDvhnxzt/uNMxv6BZ9FUe4lLwn0jn4jz3k6a1Ipt33pGVtY0qw/bde3F2LC8/+lrvlGRlVW7cfSTXN2/L5cWpHOw8k4uzE/v3mh5x561Py8bNrdrP44MQgAAEIAABCEAAAhCAAAQgMD8EDl49txncVvO1WrJ5675s2NT7FTl89bEcHeykmd03tx7JrXvvjDX5i9MD64Sv5eBDVyKyufWurF67WfkZiUjHSPLHN27e/6VYp/xogX68v/ODiZG/JSLvV5lZ0u3I8cEncnF6aGsOiq6VtXXZuP22tNprVYZP781uov6hRuQ3b99P//7s5I09vel2Lu2faSr+yvWG0i9qzZgPQQACEIAABCAAAQhAAAIQgEBTBM6OXkv38sIOd+POQ7n94L2+ofe3n8qb1y/tn7VX1+TRZ76v9qM19f54/2PpXLoa/rxrrAB2knzrUsy/evv2/X8YM8koYX9wcHCvLWd/XcT8uIhUajyvi1Xr/1GiPkxUTfRubH2qjoOg7Dz9upwdv0kzAt754Af6xtGae43oa/Rer0QSOTs/j2HEPRCAAAQgAAEIQAACEIAABCAw5wSur15L9eDb739pqPT64vxMXn73q+kq3v09v6/WijR4/ebVt6Xjg8ajBtHA9Y2tx9JqVzbs60qS/J1LWfvTt2/f3i2baJSwf3Pw8ieNtP5qFbM8Tb8/PdyR81OtN4h6jD852ZCN229Je6VSCX9lYa/JA6feIbEMEn8PAQhAAAIQgAAEIAABCEAAAvNNYPLCPpHL8xMbqVe9G3tpN7ibaqa3cr2qaXynJfJT67fu/42yZ5Uq7pOT159NLi//9ySRT5UNFv7+4uxQzt7syuWFq2mverVX1mRt466srd+Ojt5XT8XfkJXrm1Wnxv0QgAAEIAABCEAAAhCAAAQgMIcEJpmK3006cn60J2fHryXpuvLuKpcxLbm2eVeubWzZtu/RVyJPWsnKP7t+5863R31mpLBPkmT15GD3byYm+VdiHqwpCaeHL+X87DC/3VzMIP4eXbim5q/feiQq9MuufPO8t+T65h17wHCw87xnnidG7jzCPK+MKX8PAQhAAAIQgAAEIAABCEDgqhCYlHle5+LE+sZ1bMb36A5so1kZaa2sycbtR7KyGt9+3RjzP67f2PrXjDGdovELhX2SJObk8NUfS0Q0Bf9uzGY2K+yN7f8XK+x1fod7n8jhq+e0u4vZLO6BAAQgAAEIQAACEIAABCCwQAQm1e6ucWF/662qHeF2RZI/5V3yc08WCoX9/v6TrRWz/tdE5I9WKpIXsQ74p0evRJ0C61xqLHBtQ9MU7mifgugh1PFene/VAT//MrJ+847cvPvIuuJzQQACEIAABCAAAQhAAAIQgMDiEDg/eSP7O88Ke9lrGrx2UNu4GRW7TsFoEPvsaFfOTjQVvzBwXghSM9LXNu7I9c171VLx3YiJJMkvbSSrP2nu3NnLe0ihsD853PmD3ST5JRFTSwF3Ls+tqYCmwZcW8mdmpqJe295p+7sqpns6hDuh+aacnx73RkxcD8PV6+u2j+H1G3eG3BEX5zVmJRCAAAQgAAEIQAACEIAABJabgOrCo/1tOT7clc7Fucue96JUBfbth49l89a9GpASuTh9I8cHLyqKeyObd96VlWubYkwVddw3xZOOdH7k1q23/q9oYf8bv/EbKz/4+7/4iyLJH6qx2t6pRtKVo71ncnl+FDWM1tJv3q3VCsCOf356JNtPfid9lgr52w/fizbgi5okN0EAAhCAAAQgAAEIQAACEIDAlSHQ7XRk75PvyOnRvp2z9ri/df/d2iL78vxUjl8/lW6EiV6rtSIbd9+TldXrDfBKfnHj5v2fMMZ0BwfLPS5483rnh01L/lcRWRn36brYk4NP7MnGKKMBradXE4Gqbe6y89vfeSpv9l7aP7InMQ/ek83b98ddAp+HAAQgAAEIQAACEIAABCAAgStM4HD3hRy8+thqUs0Ov//uB9JeqdxbPiWgbe9ODl5I51IN9fIvo6L+tpaB32iK3GVLWv/c+q2t/7NU2CdJsnJ08OqXjZEfberp2uPvaO+pdC615n74LEEXvHnnnaoGAn3T63Qu5JPvfDV142+vrsmDdz8v+jMXBCAAAQhAAAIQgAAEIAABCCwvAa29f/Xxt0R92fTaeucDWd+8NRYQ9ZY7Pvg4vyNcIrK59VhWrzXbYj1J5Fc3b937I8aYvp57Qyr75PD1H+wml/+DiDwYa5UDH748P5Y3e09FksGsATW0eyDXNrfGetzB9jM5eP1JemywefuB3Hn4eKwx+TAEIAABCEAAAhCAAAQgAAEILAaBnae/K2cnh3YxK6tr8vDTH9ZOxw9E1Ffu/MSl+Gev6xtbcv3Ww0mA2+525U/evHP/17OD9wn7JEnWjg53f8ZI8udEJN6OPnK6p2925OTNTl/MfvX6DWskUNUoL/vIy4sz0U1Swz69NA3/4ae/V1ZWr0XOjNsgAAEIQAACEIAABCAAAQhAYJEJnB2/kZ1nX0+XePftz8rGjWru+IN8kqQrh7vfla7tce8uTfVXjauZ6RO4uokkf/m7T17+9IcffugE8KCaTt68eXTcPf1fROSfnMAExKbkv36WtsFTt/obdz8l7bGMBBI53P1EDnY/FklcSz+tq9cWBlwQgAAEIAABCEAAAhCAAAQgAIFA4OWTr8mF76KmLdDvv/f5sbum2ez03Y+cwDZGrt98aNu3T/D6v5NW94/duPHwRa6wPznc+6Fu0vk1EanvIlAye+39d3K4bU0L1tbvyPqth2O51mu0XnvXX5yd2Ce3Wm27OfSpn+BrxNAQgAAEIAABCEAAAhCAAASuIIEzrbV/9ruSJIkV4bfuvSs37o6XMq9Re03J15p7NYO/ce/TY2ncCKwXrdX2D6+v3/0/coX90cHOXxORPxUxUO1bNF3+aO+JBdmEQ+D+9lN589o54eul0frb99+zveu5IAABCEAAAhCAAAQgAAEIQAACgYBrffdtOT06sH+0em1D7r3z/lgO+TqO1tkfH3wiG7fekrX121MAbv67zVv3/s0hYZ/s7t4+aneeGGNuTnoWZ8e7tvPd2sadsU4ytG+91tbrCYle2q5g6533Ze3axqSXwPgQgAAEIAABCEAAAhCAAAQgcAUJaD/7vRffkW63Y2d/c+uR3Lr3zlgrUU2q7e82br89ln9chUnsn3fan7l79+5r/Uxqnnd6uPtnO0n3r1QYaKa3di4vZOfZN0T7B4br5t235NZ9NeLjggAEIAABCEAAAhCAAAQgAAEI5BN49fxbcnpkNbG9Hrz3PbK23mxrukmzT6T7p2/ceqhZ907YJ0nSOj7c+WUR82OTfngT4yfdruy/ei5H+9upYd7a9U259+4HYxsfNDE/xoAABCAAAQhAAAIQgAAEIACB+SXQuTiX7WdfF/1ZL+2otvXO52R1bX1+Jz04M2N+fvPmvX+5J+yPd949uZS/l4i8fxVWoakTuy++LSrw9WqvrMk93QRS8K/C9jFHCEAAAhCAAAQgAAEIQAACMyegPe1fPftmWtq9ceue3Hmgfm3tmc8tZgJG5HcuZe0P3Lp1a8dG7E/fvPqRTlf+lkhyP2aAWd6jqffbT76e1kNoz/rb99+VzTsPZjktng0BCEAAAhCAAAQgAAEIQAACV4lAoq3TX8jBrnaNc63T7771aVm/uWUd8+f/Sl62pP0n1m9t/X2TJIk5Otj594wx/5mIrM3z5LU1wetPPpLLi9N0mnqqcvvBe6Tgz/PGMTcIQAACEIAABCAAAQhAAAJzSEC92zQb/PzkTTo79W27cefBWEbv01lqciqm/e9v3tz6b02SPFk/Prz+syLm35jOw+s95eLs2AK/PD9LB1i7fkPuvfs+or4eUj4FAQhAAAIQgAAEIAABCEBg6QmouH/50W9Lt3NpWWi0/sbWI1Fzds0Qn+MrESP/1fMXe3/eHB4ePmwnpz+fiPln5nHC2jbg9M2+7H7yndQoT+epZnl3H31WVlbnOslgHpEyJwhAAAIQgAAEIAABCEAAAhDIELg4P5VXz74hnUtnpqfXxu37tg1eu70yt6ySRP5u16z9SbO7+/xT11fWfjUR+cK8zVahHr3eljf726lRns7x2sYtuX3/Hczy5m3DmA8EIAABCEAAAhCAAAQgAIErSkDN9F6//Kg/S3z9htzaeiTX1m9qKH/uVmZEviYr5kfNwcH251ti/qERuT1Ps1Tn+9fbT337AWdkoJfWOtzceltac3xqMk8cmQsEIAABCEAAAhCAAAQgAAEIxBHQ4PLui+/K+clh+oFWqy3rN+/KnYefihtkinclIvtdSX7QnBy+/KFu0vp7TT9bU+jPjg/laH/HQulqazrTkrVrG7J5+55cv3FnqDZe29dpCsTh3sdyenTQl3qvQn7ztor6ua9zaBol40EAAhCAAAQgAAEIQAACEIDAlAh0ux3Z334mJ4e7aSs8fXSrtWIzx69t3pb2yurQbLRW/2h/W04O9+TywnnDraxes4cCqmXzPtPEklrS/SFztL/zb4uR/7qJAcMYCkLbBuiiQq/5vvGNkfUbd+Tm3Ueyem1dkm7HCvmTo305PXrd/xlj5PrGLdm8fd+m4F+NtgNN0mQsCEAAAhCAAAQgAAEIQAACEJgmAdWxx4d7NlB9cXbU9+jVtXVZv7Ul1zdvif5aL3XV3995Juen/feGD6pHnLZpX1u/0fgyWu2VP2Pe7O/8rDHy7zY5+sHux/Jm94UkSS+FPm/865u3ZWVt3Yr57uVF2ps+3Ntqr8qdB+9ZQd9qt5ucImNBAAIQgAAEIAABCEAAAhCAAARGEtAo/PHBKzncezEQtDbSXlmxpu7rN+7Km9cvC0V9Vtxvvf25xiP3SSI/qz3sf15E/qWm9lPb0r386GvpcJpucOPuI1ERr/3nD3aeycXZSeHjNCLfWlmVzVv3bXuBeTQoaIoV40AAAhCAAAQgAAEIQAACEIDAFSCQdGTvkydyenwo3c5FsZ5ttayW3bCp9yty+OpjOTrYSQ8Fbm49sk77DV//szk+2Pm7icgfbGrgg1fPbRp+uNRgQNPow3V28kZ2P/5W2iMw/LlptazT4LX1G7b+XmsRuCAAAQhAAAIQgAAEIAABCEAAAvNC4OL0WE6P9+Xkzb4PWPdnqW/eeWizzrPX/vZTG9HXq726Jo8+832NLseI/Lo52t/+f8WYH2hq5J2nX5ez4zcivhPAOx/8gBjTSofXWgWN6Gv0Plwbt7asmcDK6nVS7pvaCMaBAAQgAAEIQAACEIAABCAAgYkQ0BT9y/MT0TL08+OjVP++/f6XhkziL87P5OV3v5rO493f8/uanVOS/H9aY/8dY+TTTY1cVdir2/3bn/tiU49nHAhAAAIQgAAEIAABCEAAAhCAwNQIPPvdf5Q+axbCPpHk61pjr3nzbzW16qqp+Jp2f+/tzzX1eMaBAAQgAAEIQAACEIAABCAAAQhMjcCL73xFOhfn9nmzSMUXkefm6GD7RMRcb2rV+eZ5b8n1zTtyeXEiBzvPU/M8I0buPPq0bNzcaurxjAMBCEAAAhCAAAQgAAEIQAACEJgagWxwW73jpm+el5xqxH50T7oaOA73PpHDV89L292t37wraq7XatHKrgZmPgIBCEAAAhCAAAQgAAEIQAACMyag9fZqEF/Uwz5MT1vjTaLdnY4/EWHf7XasM/7R/vZAr7+wJCPrN+/IzbuPZPXa+oy3gcdDAAIQgAAEIAABCEAAAhCAAATqEzg/eSP7O88Kxb2K+tv335W19Rv1HzLikxMR9vq8JOnK2fGhvNnflrOjAxHNCzBG1tY3bGqC1tYTqZ/InjIoBCAAAQhAAAIQgAAEIAABCEyZgEbuNbh9dPBKuheu131rdVU2b92zXeDaK6sTm9HEhH2Y8fnZsTz5xpftb9eubcjjD740scUwMAQgAAEIQAACEIAABCAAAQhAYJYEdl8+kb3tp3YKdx+8J1sPH098Ogj7iSPmARCAAAQgAAEIQAACEIAABCCwLAQQ9suy06wTAhCAAAQgAAEIQAACEIAABBaSAMJ+IbeVRUEAAhCAAAQgAAEIQAACEIDAshBA2C/LTrNOCEAAAhCAAAQgAAEIQAACEFhIAgj7hdxWFgUBCEAAAhCAAAQgAAEIQAACy0IAYb8sO806IQABCEAAAhCAAAQgAAEIQGAhCSDsF3JbWRQEIAABCEAAAhCAAAQgAAEILAsBhP2y7DTrhAAEIAABCEAAAhCAAAQgAIGFJICwX8htZVEQgAAEIAABCEAAAhCAAAQgsCwEEPbLstOsEwIQgAAEIAABCEAAAhCAAAQWkgDCfiG3lUVBAAIQgAAEIAABCEAAAhCAwLIQQNgvy06zTghAAAIQgAAEIAABCEAAAhBYSAII+4XcVhYFAQhAAAIQgAAEIAABCEAAAstCAGG/LDvNOiEAAQhAAAIQgAAEIAABCEBgIQkg7BdyW1kUBCAAAQhAAAIQgAAEIAABCCwLAYT9suw064QABCAAAQhAAAIQgAAEIACBhSSAsF/IbWVREIAABCAAAQhAAAIQgAAEILAsBBD2y7LTrBMCEIAABCAAAQhAAAIQgAAEFpIAwn4ht5VFQQACEIAABCAAAQhAAAIQgMCyEEDYL8tOs04IQAACEIAABCAAAQhAAAIQWEgCCPuF3FYWBQEIQAACEIAABCAAAQhAAALLQgBhvyw7zTohAAEIQAACEIAABCAAAQhAYCEJIOwXcltZFAQgAAEIQAACEIAABCAAAQgsCwGE/bLsNOuEAAQgAAEIQAACEIAABCAAgYUkgLBfyG1lURCAAAQgAAEIQAACEIAABCCwLAQQ9suy06wTAhCAAAQgAAEIQAACEIAABBaSAMJ+IbeVRUEAAhCAAAQgAAEIQAACEIDAshBA2C/LTrNOCEAAAhCAAAQgAAEIQAACEFhIAgj7hdxWFgUBCEAAAhCAAAQgAAEIQAACy0IAYb8sO806IQABCEAAAhCAAAQgAAEIQGAhCSDsF3JbWRQEIAABCEAAAhCAAAQgAAEILAsBhP2y7DTrhAAEIAABCEAAAhCAAAQgAIGFJICwX8htZVEQgAAEIAABCEAAAhCAAAQgsCwEEPbLstOsEwIQgAAEIAABCEAAAhCAAAQWkgDCfiG3lUVBAAIQgAAEIAABCEAAAhCAwLIQQNgvy06zTghAAAIQgAAEIAABCEAAAhBYSAII+4XcVhYFAQhAAAIQgAAEIAABCEAAAstCAGG/LDvNOiEAAQhAAAIQgAAEIAABCEBgIQkg7BdyW1kUBCAAAQhAAAIQgAAEIAABCCwLAYT9suw064QABCAAAQhAAAIQgAAEIACBhSSAsF/IbWVREIAABCAAAQhAAAIQgAAEILAsBBD2y7LTrBMCEIAABCAAAQhAAAIQgAAEFpIAwn4ht5VFQQACEIAABCAAAQhAAAIQgMCyEEDYL8tOs04IQAACEIAABCAAAQhAAAIQWEgCCPuF3FYWBQEIQAACEIAABCAAAQhAAALLQgBhvyw7zTohAAEIQAACEIAABCAAAQhAYCEJIOwXcltZFAQgAAEIQAACEIAABCAAAQgsCwGE/bLsNOuEAAQgAAEIQAACEIAABCAAgYUkgLBfyG1lURCAAAQgAAEIQAACEIAABCCwLAQQ9suy06wTAhCAAAQgAAEIQAACEIAABBaSAMJ+IbeVRUEAAhCAAAQgAAEIQAACEIDAshBA2C/LTrNOCEAAAhCAAAQgAAEIQAACEFhIAgj7hdxWFgUBCEAAAhCAAAQgAAEIQAACy0IAYb8sO806IQABCEAAAhCAAAQgAAEIQGAhCSDsF3JbWRQEIAABCEAAAhCAAAQgAAEILAsBhP2y7DTrhAAEIAABCEAAAhCAAAQgAIGFJICwX8htZVEQgAAEIAABCEAAAhCAAAQgsCwEEPbLstOsEwIQgAAEIAABCEAAAhCAAAQWkgDCfiG3lUVBAAIQgAAEIAABCEAAAhCAwLIQQNgvy06zTghAAAIQgAAEIAABCEAAAhBYSAII+4XcVhYFAQhAAAIQgAAEIAABCEAAAstCAGG/LDvNOiEAAQhAAAIQgAAEIAABCEBgIQkg7BdyW1kUBCAAAQhAAAIQgAAEIAABCCwLAYT9suw064QABCAAAQhAAAIQgAAEIACBhSSAsF/IbWUIiU2MAAAgAElEQVRREIAABCAAAQhAAAIQgAAEILAsBBD2y7LTrBMCEIAABCAAAQhAAAIQgAAEFpIAwn4ht5VFQQACEIAABCAAAQhAAAIQgMCyEJiNsN/fTsSYiTE+PzuWJ9/4sh1/7dqGPP7gSxN7FgNDAAIQgAAEIAABCEAAAhCAAARmSWD6wj4Rc/T6RSKmJfbHBC6E/QSgMiQEIAABCEAAAhCAAAQgAAEIzCWB6Qr7RKTbFXO09zQR0xb3QyP3zUbvEfZz+a4xKQhAAAIQgAAEIAABCEAAAhCYAIHpCPtEJNEfHZFEhf3uk8TYiL2RRHzkvkGBj7CfwJvCkBCAAAQgAAEIQAACEIAABCAwlwQmL+xdlF5ERX0iquStsHc0jI/Yt0RampbvxP64F8J+XIJ8HgIQgAAEIAABCEAAAhCAAASuCoGJCnsboVcx37WR+kSj9qrme8I+YFKBHyL3KvCD4K+HEWFfjxufggAEIAABCEAAAhCAAAQgAIGrR6B5Ye9j8UlXpNsRsaLe/5nHkyPsrd63wfqkgdp7hP3VexGZMQQgAAEIQAACEIAABCAAAQjUIzARYa+CXmvppRelz86uQNg7cW999Gz0Xo31fPS+4toQ9hWBcTsEIAABCEAAAhCAAAQgAAEIXFkCzQn7REySSOIN8lyUvj9SHyCZ472nScjLzyVnjBhpSdJqe7FfrS0ewv7Kvo9MHAIQgAAEIAABCEAAAhCAAAQqEmhG2Kvjvaujd873Ool8UW8z7o9fP08Se/OoGwci9xV63iPsK74F3A4BCEAAAhCAAAQgAAEIQAACV5bA+MJeI/Wact/x7vdFgl51umtZb44OXia2AD+cBhTiy7rmt9VQX0yEaz7C/sq+j0wcAhCAAAQgAAEIQAACEIAABCoSGEvYW8f7jiRWoxen3rspGdfRzrRV2O8kvRC/D/OPmrjveS9mJT0dGHU7wr7iW8DtEIAABCAAAQhAAAIQgAAEIHBlCdQW9mnafXC9HxGp1/b0XtT7iP2Ou9ueBrhQv3XaS/8sh2cw0tO6+xJTPYT9lX0fmTgEIAABCEAAAhCAAAQgAAEIVCRQS9h3u06PW3GfH6kPGfMa008N7nup+F7Yh8mqhX7iQ/+arj/QH6+3Jpeab1orkqQ19/qB/gthX/Et4HYIQAACEIAABCAAAQhAAAIQuLIEqgl7NcnTmnoNsnckGWGQZ4GkGlzN7TPq3Kbi9106sAp6PS0oy+v3dfetFRFNBcipuUfYX9n3kYlDAAIQgAAEIAABCEAAAhCAQEUC8cI+ON+XmeR53Z22og8B9V5g3dXY512aAqAKv9txqfllkXvTdpH7Acd8hH3Ft4DbIQABCEAAAhCAAAQgAAEIQODKEogT9l7Uq0me6m6rv/OuYGLf9jX1zgV/8CoW9vZO94DUar9Q3Gfa4WkBf6IC3z0KYX9l30cmDgEIQAACEIAABCAAAQhAAAIVCZQKe6uruzaIbn8eEUTXuvrEeG+7EW3nS4R9T9zHPlSL+F3NvTtZQNhXfAu4HQIQgAAEIAABCEAAAhCAAASuLIHRwl6z4r1RnhX2RVdIv19xkfqcKH32kxHC3t+uqQH2waHuvmACad6/niog7K/s28jEIQABCEAAAhCAAAQgAAEIQKAygWJh74zypHsxIvVeZbRG6VXM+/T7ElGvE4wX9np3TF89dekTny7Qasv52Yk8+caXLYy1axvy+IMvVQbDByAAAQhAAAIQgAAEIAABCEAAAleBQL6wd5F6Ix1J0pZ2w6uxLe00C96a0+cb1OcxMEf7L5NBw7uRsLy4d3X3+f317Od95P78/FyefBNhfxVeQOYIAQhAAAIQgAAEIAABCEAAAuMRyAr7rQfvyd0H7/Vq6oNJ/dAjjGsyZ0vbXfZ7Wfq9G8J54Zuj1y8Sl7OvPyIv32cvse3witz7nLi/OD+Xj771FTswEftIvtwGAQhAAAIQgAAEIAABCEAAAleSwJCwv/+O6zQXHPBzRb2RRFPubSv54IQfs3yfCXC09zQRs+Ij7FXEvQp6rbu/HOnid3F+Kh99+7cR9jF7wj0QgAAEIAABCEAAAhCAAAQgcKUJ9Av7d+XuvUciGhQvunz6vUbr4yP1OpjqcU3v74o52n2S2A/3WegP98XLnUMmLV9TAPJ63Z+fn8kThP2VfjGZPAQgAAEIQAACEIAABCAAAQjEEegT9vfflrv3Vdi7lPmhq0/UVwi0+3Z5oUTeCXt7eXGvaflpf7wIgV9iqHd+dipPvvM1+4S1a+vePC9i3Dhm3AUBCEAAAhCAAAQgAAEIQAACEJgbAn3mefceyZYK+2FF70rorTfdihjT8tXyZcvwzvq+LF4T+DXAnhH2Qdy3XF5/Ku7LBta/17x+TckfboU3JOw/90Xfhy9mXO6BAAQgAAEIQAACEIAABCAAAQhcHQIxwt4KeRutr6K9M6J+oF5/QNjriYF337NF+5oKoA+LgJhG7vvF/aCw/9TnPpTETj5m0IjncgsEIAABCEAAAhCAAAQgAAEIQGAeCCSJ7G4/kb3tZ3Y2Wl8/HLFXja0Bda2p95q7bO6hI50G1DWwPtChbljYhwG15t6m5bdFkoriPnN60C/sr8vjz/7etBVetayAspXy9xCAAAQgAAEIQAACEIAABCAAgVkRcA71u9tPZW/nebGwt/52Xm/bu8qC3irk1ShPDfi6vsNdf81+sbAPFvumLabVdgcCpVH2XmqAK+LvypCw/8wXMsI+uP7NCjzPhQAEIAABCEAAAhCAAAQgAAEIjEvAiXotT9/deSZ7Oy9yhL1rY2fMiiS25XyZoHdzMklHQqt5/USeaf1oYW9HyfbSi3DpsycAvdOE89OTjHnedXmswt6O608prFlA3ILGRc3nIQABCEAAAhCAAAQgAAEIQAACjRIIafHJpYvY73wse68Ghb3vTR9K3mM0cFZba8TeXvnu+iOEfVhqqLnXVIF25KmCSxXQk4Wzk2N58p3Qxz4j7IO4b61IInpqgbhv9OViMAhAAAIQgAAEIAABCEAAAhCYPIHgN+dL0nd3XvQJ+3sP3vaaty1JtKbWyHxHjDWpVzFf0C7Pry5S2Acbfl/gH5MyoJb7SVfOTt/Ik2//ln3c2rVBYa+CXg8MnLjnggAEIAABCEAAAhCAAAQgAAEIXB0CmoKvBvL6w0XVs8JejfPu3n8nU1MfkQWvg+h43Y7V1Gp558R98RUh7MOHM8596pYfFWHvyvnJkTz51lcKhb2tK7CnFtTbX52Xl5lCAAIQgAAEIAABCEAAAhBYdgI9Uzsj6jHnxHdfxP7+27L14F1fiu6z4UdiK25p15CwH2iFF2nLf3Z6JE+/+Zv5wl7/1B4QBKt/FfhcEIAABCAAAQhAAAIQgAAEIACBOSeQOtX3t3zvi9g/eEfuPnjPCfuSSw8GjOayp2Z5+oHRkfowZIWIvWpw4zIAQr+9iMmdnx3Lk298uVDYh9r6JLjvq8jnggAEIAABCEAAAhCAAAQgAAEIzCsBFcZaA6+GeQNO9X0R+wfvyZYV9uWl5yZJJNHxbFp/vKjXOysJ+5SptehvS2Id7UefPJQJ+/SEwbRExb3W23NBAAIQgAAEIAABCEAAAhCAAATmk4A3i/d95Qfbzw0J+4ePI5bhO8t5A76ID/TdUk/Y2wx6FeJe2Nu0/PxrSNh/9vcWuPoZMS0dc8X1ueeCAAQgAAEIQAACEIAABCAAAQjMGwHvgu9S5odT5bXVnYp7vTQNf6tU2KsBnwr7C7/SuPT7LJbawl4Hsan5fVH24fSCfmG/Lp/63Ic2tcCtf2DCab094n7e3l3mAwEIQAACEIAABCAAAQhAAAKJmK7q2Z4Lfj8TY1vdaS/7MmFva+pVQg+46tdhPJawt472mpYf2tXlRNoHhf3j979fZEQvPqN2AZqOP2jOF1GTUAcAn4EABCAAAQhAAAIQgAAEIAABCAwTyImcW8M8rYN3re2GLmNkb+cT2d15XirsXbTbp+Db8apH6sPzxxT2OowX92ZFkpam0PdH7YeE/QdfGnki4bIAVN63er3trajPtAZA5POtgwAEIAABCEAAAhCAAAQgAIEJEHBt41Vkq0u9/r9vQWef5R3wc1LwnZZtyd7OC9ndfjZa2HtR79L5u6V96suW2YCwdyn5rmXdiqu7z1z9wn5DHquwtw6C/pRj6KTDoeuvs9fDA3+IYCW+bQLgsgUUngUf5lG2ZP4eAhCAAAQgAAEIQAACEIAABCCgBFSb+p+dsuwX2RkBr8ozpM8P1tYHUa/m8rvbz2Vv+2mJsO+KSbqSaPR/jEh92MNGhL0dzBrpOXGfjdrnCnu9P60j6FR8n5ygd5f+2h8kENWvyJHbIQABCEAAAhCAAAQgAAEILBmBVKgPivgg6P2fB60fIbpdsFm16YpIqyW7L5+OFvZpq7xgvlc/Bb95YZ+K+7ZrgefFd6GwV0BW3F+69IacVIboV8ym7vtUfX2uOvYrGy0N8JH88VFFz4YbIQABCEAAAhCAAAQgAAEIQGAuCGSUoE+v1/p41zM+1MmPpxZtxzibwe50cLmw7/QC3Q0xai5ib4W9F9cZ87tCYR9qFmxNga9TGGNRISXfDZGN6Ieofoj0Dzv3j/FYPgoBCEAAAhCAAAQgAAEIQAAC80ggGNKp+7xPs+8FlAdS7seYvzFtSayob9tRdl8+KYjY+2wATb/X9nYR2QCx02pW2AdRHRZlWlIcsdebfb8+W2+fSXmInX3pfS6Ob+v+rZ5v+Zp8RH4pOm6AAAQgAAEIQAACEIAABCBwlQikmtKb3mlkPq2Zd/XxTV+utl67uvWy1guFvTXJ8y746obf4NW4sO/VF+jCWnJ+fipPvvFlO+W1a948L7sAPT1RYZ8aFYRfuc1wqfTuA+NvhBf0VuiH1H2Xrp8152uQL0NBAAIQgAAEIAABCEAAAhCAwEQJZOrjvZhvwmneebplAut9yd+ZLPE0Y90tsljYd8R0L1PH/SaRNC7srWe9cY0BNB3h4vx8tLDPnKD0UhEyaRH+VMXWQIyZquDc+/0hQequ3xLT8jURGef9JiEzFgQgAAEIQAACEIAABCAAAQg0S8C51GsEXKPf2ZZxPjo8doS+14XNzryvA1zo0qZa0v5lurhcYW/nqQHt8Vvb5VGcgLAPj9GFtuX84lyefPM37R/mRuzt32QNDQanGf4uK/ZdPUK/6V6dtIpsG70QzQ8pFNTiN/u1YzQIQAACEIAABCAAAQhAAALjEgi6MAj6rJt99bH7g78+q9u3Vk8j9hnR3nuC14s5weFhYf9eahzfa61Xfa6jPjFBYa/Z7i0504j9t75SIuxjFhX6CyrerucxqkVBzJjZQ4jwa5+mb09jqMWvQpF7IQABCEAAAhCAAAQgAAEINE0g9I639em2VVzXVVZ7V/vqJdsZnZcKcyfUXWm592izJdvVA75Dwv7Buy5ar6bxE7omKuxVGJ+fn8mTb/9WA8K+gEDGICFstEPfi/RX2ehwYuP6EGai96Emf0IbwbAQgAAEIAABCEAAAhCAAAQgMEggE6G3/mxOHMdrvJClHcZVQ3X9dUuSVOMFod8M/X5h/65s3X/bifqxSwOK5zdhYS9ycX4mH337tycn7MPaFFI4TLGnOK6lQRJqGFKIsSn7mTR9a7anEXz9Ue/UpplXhFEgAAEIQAACEIAABCAAAQgsAYFMz3kbobf19Jky7VIEIVU+6LqQke01XZqdXTpQ5Rv6hP39d2Tr/qM0u6DyYJEfMEe7T3s57pEfqnKbi9hPQdjnTUrFvfEvQEjZCAYLMYswvl2eU/Ni9FTHG+1lazFihuIeCEAAAhCAAAQgAAEIQAACEBhNwKbd2+Cs++FM6YNkjQvSOq0WIvItkZa6uweH+8EIfvM70i/s35ate48a7VmfN+OJR+zPz07lyXe+Zp9dbJ7XPMwwYlqPodJcnfVDXYa4l8S+JrEpESr0jboe6svgI/g1ai4mt1pGhgAEIAABCEAAAhCAAAQgcAUJhKCsOtzb2nkv6mO0WqrJnE7TkKzTbO5nG66tXipfG2KfsL/3yEXsJ3yZ471niRW7E7r6hf26PP7gS32tACb02BHD9vc4dHUOVZwUMyn6rbZLz6f+fvrbyBMhAAEIQAACEIAABCAAgatPIKPHrEm61aaxEfoBs3Orz2ZvgD59YW/EHL3+ONG+f2nKesOvxpCwf/+LA/3/Mg/M1slnjlRc1H0SRyxe0NuXSc0M9HRI5xOX4qGC3kXw2yItX7PRMD+GgwAEIAABCEAAAhCAAAQgsGgEXMq973hme7yrKV65DrOu9eE2zaK2Oix4oYX6+UnQSh/aO3jIaXWnT56esA8+Am0xR/vbiSTeej8mzaEioyFh/7nvEwknKdmx0pOZro2Ap+kTek+fqJ+AwM846xtfy+HqOMperKwhQ0jPD6dEFUFxOwQgAAEIQAACEIAABCAAgWUgEIzONcBsW5lHpt17nWjLokOJ9ARN8NxWZHShDUSH3/ue9zkB3r2XH8nu9jP76bsTTMW3hxyWhQr7g53ERqq1r15wkG/wZeoX9tfl8Wc/FGmtDEftraDWqHnH1UBYhJm09zSCP/BnjUbysxF81yPRpYOUCXx3+GDN9XQ+1N83+AYxFAQgAAEIQAACEIAABCCwMARCQDdE6NMga/EKXW/5oLOyPzcZ9M0Gdgd+HTIJ+nShcQFrq/0y80i6srf9dPLCPpSDa4v2VirsdeJOVDujguauYWH/vWJaK5LY2vRsqoT2JHQHDE5IZ1IdnBWiTcd3f5qpm0gX5P88/P3YS1AmXTsnlybijffKxg3CXgGn9fdlH+LvIQABCEAAAhCAAAQgAAEILC4Bq6fUGC/jeD9qtWnKvdVXIYg6qCHH4GV1rxeaVmVmg7xBdaoGDLdl9amWZLclUc2XDTTbm7uy+/Kp7O08t5ObWMQ+tGQ3qq3FR+z1iT4F3aXlR0SoIxkOCfvPfK9rNyArPiU/M5B3P7T1FdkDBoWVTsnV2zvA+rP+3hvYhdOSxszs/EOtwO94R30La8TqdZNDtoE/wWlsPpHQuQ0CEIAABCAAAQhAAAIQgMC8EEi1ptN5Ts+VaU7vZxbq6G27uiYi9E7A25E0iBuy1v18Qnu9vlr+rP6zc2iLaamwH6jpt+u8lL3t57K78/Fkhb3NFuhlwrtUfLsof0rRvYxPP494UYaF/Rfcp1qrLmKfB6PyHDIb7HsWusMD/2NcYZ2pwbelAv73pS9jOGjQuouQnh/BjFsgAAEIQAACEIAABCAAAQhcfQIuC9plhvtfj1xUKLv2+ikN3OqHxhH1IRrvyq21Tt61Qs8eLpQdNPg5qLa0peWaoZ29/Pq6l7K781z2dl5MSNj7Aw6bgr+STqAn7J26t26EGp2u1N99xOYUCXt3wqGnDANA7PnCpa/5j4Gb9/DMCxHS9oPgH/eUJ2QV2Bc04uXM1j6k9ffjvJRX/+vNCiAAAQhAAAIQgAAEIACBxSVgo96pXlJt6bVT2ZK9EZyNzA/Wrpd9dvDvfVp8OherdX22QJRReoHOtJHyUFufucdneetBxqvt57L3qnlhHzrFJSFSnwmS9wv7TNTepcLXFda9BRYKe3Ux9HUJQ63sQup7ZMuD0Yc+QUQPpOuP5Z4YTp70Bc2+pKNT9NMXwL6w4546VX2zuR8CEIAABCAAAQhAAAIQgMCECXhB7QzaVdTrVayT0m5oLW0j7tLvh7K6o6esOs0/L9t1LcKgr+wRTrO2JMkzgreP7KTB6d3tjyci7J3XnLb407p6ZdULGA9E7DMQbJ172IiyZRb/fWEqfpoyr2kMIW0+7LvuRkdMV43rxp9DX9qGfVS752Df57xfYZ1p2oafZ3rqUybuvXvikHlghWdzKwQgAAEIQAACEIAABCAAgXkikC1fVpO8VMeN0EdpVnUQ89kOaBUWF57tu5ppZrXNGCg5VKjwhF4ZuY2WD2RgBw8B22kukd2dFxMS9irqQ8ZA/xxyhL1fXveiVwtRacX9NxcKe70tpFoM9bUPNRDh1GOMCQx9tNd73p4OpW6CA8YH0Y/M1mvEdRXQUyh9bugMMJSxEP1sboQABCAAAQhAAAIQgAAEIDB7AtbU3Bqxa0/6wfr1nPnZdPtgNj5Yr15lPa6cPM04TwOw42ef983CR8qHa+tDtL4XGJ+EsHcd4ly0vtclrjfDYmEfWt/ZU4f610hhn0klGIra2wi4a3/XdAu+sJpeP8Rgspc5Kaq8ZNeuz2YY2JdZ60pGpJxYce9eZt0gxH1l4HwAAhCAAAQgAAEIQAACEJg1gbQ1eNBBZaLep5OnAdaB7O2Y9aTZAZnS6L72dTGDVLgnzFUN4Acu1Xwt20Gt111uEsJeg+LaNt7px+HLHO1va7+44b+xxnDj97YvF/bBVVAj5nkpDWEODZ+49B+/+EcPui/WMLlLXR9D7X1Jar465tu0/IEeiBXeM26FAAQgAAEIQAACEIAABCAwfQI913sX5CxLu3d16i6dvEbGdF+3Mi/qaxvhRdIKRn55xu/h2TYY3Sshb17Y92rrc7np4crR6xdJbts5XaePmBsp2aQRTEYLe9eL3onags21JgRaFjBJYd9bQGqKkJo21OmX2EsHsewsy/T/Bmhl2hWMZRQR+WJyGwQgAAEIQAACEIAABCAAgbEJ+IzlkgzrtB+8UbO30BmtagDVa0GrDTOCfuw1jB7AZXirZl1xhxFDLfeC7usvyW5S2Ns5pN0C8koWfGe7o71nSW+igwvLpMPXPAkpFfYKR3vOG9/XfmgKoe+h7304jc3T3bMvXkiVD+0WKjw86waZOucXHU54k4hRBxwVHs2tEIAABCAAAQhAAAIQgAAEJkYgm91tdaI+KTdB3GnhtJY+J0u7dJKuTV2vZV552XPpkNE3+CBsbt96Hwj3vgLZQHTzwt6l4A9n2ge/t0sxR7tPE1uAX3QCEfrK27T86lHzKGGvYAOsobKAydfaF++rE/epwV7wBIh+ETxo2zMx1FyUpadkU1OqnmRFT4wbIQABCEAAAhCAAAQgAAEIVCcQvNgigpdOSwWDvIqp94OB0pqB5uoLzH7CiLQ1Sp6XXe4PHIKwz3ysOWHv2v8lwQl/cDGWkWYxdFTYP0nSVHhb7z0oJn2tfVdPRqqn5JcLez+71LY/L72gK9IJJnrVDxfG20z9tBHT0jSM8FIGRhWEt08bcQxD64W8mWXMJEL9/fgLYAQIQAACEIAABCAAAQhAAAL1CKiAtO7gam4eouflmsa0WtK1RuFVRb1Lt0+1U40Ac72FDoh6DTpbF3r1RMvRyd1LMdY4r1+jNiPseyXbpqWGecPPN7at36XdEy/s9aa2SNtb5w9RSEQ6vv1dRULRwj5tfadzGDqKcGYEaRuDipNo5HZtjuda9LkTkzppJPpF8OvITVXxE7UvjfceQNw3snsMAgEIQAACEIAABCAAAQiMQWCoY9moTGTNCPcG4VUfmdbRqxndLIK6WU3W8ho552DCzvMyt7VfM8JezxNUd2oaft7zXbTedN3BghP2VrC2M/DzXPJ9T/mR0ebhXYsW9ukctNbe/qZ/sODQb0+IZrjBVnCHqHodN0d/ypWWNoyqu88aC1bIDqj65eF+CEAAAhCAAAQgAAEIQAACeQRsPb33PZPQ+Wv4RmdCnjV6q9LGzpUwq7O+PisZ8ZypbZINPPsDiiLTPNsafljPNSLs03aAKuzz9Hm2NXxG2Nvc/dDwPldYd12agUacKwjrasJe68vDicSgsA/t93r9Aae2qQMP6jk7ZtrjVUovGXDNL0gtcS6M3j0yLZNA4M9q33kuBCAAAQhAAAIQgAAElopAapJX5kSf9SarFvxUxWNLlf3hgc34n0nqfW9nnQ5z2tTp5P7LHUAUa+NxhX32+fltAYOeVG2sc8tG7PX3I04lXMvAjphEU/Ldh2OuysI+zCH3VKLjau3ts+OeHzPH2vekKfNO4LtNjxTe/uTLiKZO6ItRwDRwyJ4Wedf+2vPmgxCAAAQgAAEIQAACEIAABEYSCF5rwUS9QH95TWRaK04M5+m43OcEo3Ffrpz2qJ/9tlhdZzPa81rcqUG/71tfkM0+vrD3z891wndeBy7ortrYXb1UfPu7kPo9Itzvi/NjhXU1YR9S3IvqCHwKSMWsgYm/GiE1X30KbGTdwix/bHh5Q5nBSHEf9sbX9kd/YcqnwR0QgAAEIAABCEAAAhCAAAQcgWzP+BhRr5HtUE8foYHCM/qyAeYkcBteASvog7AffC98tLwgDV/vHlfYuzJ5zXzIM5bPP1joF/ZWj6pBwKoXpnnp8HqichEdMa8k7G3auZGksE9gsPOffTr+0Nde+96nNSV6WqXnJDEvdug9qF+akOIy/I+KS8fQK2xyRWdJ/p2CAAQgAAEIQAACEIAABCBQRsAL7p7be36kvtcWXB3bNXs5RvvYPHuXCR66hc047T4XR9qKPc+0bjhaPjjGeMLeO/EX9a3Xh6keT9sNuqcPC3uNNKfue3mbExzy40zsqgl7J4Z7aQ/57oOme6mVGO6lmKMr1MS7kgY9YalgGJGpK7GblHNlDSl6LQ8iv0BzxImpQAACEIAABCAAAQhAAAJzRiBoK59N7Grfi9LvVadpunhLtKVdVLayLjeY8KlRXo1W6tMgZjWXWbVryy0rKEnD1zmOJexHmfZl+tYPasYcYe+j9kVRcxXUdjHF0eUs8KrCvuc4P8LWP5xQzEOdfb4Ed5kPvt9gdN/GNB3FR+8L31x/+GK/RAXpGdN463kGBCAAAQhAAAIQgAAEILAYBGK1SOrWXsEkLy1BVg05h9nX2R20Ok61aJ7OitPC9YW96jz/fPUrGLxCy8GcrgF9wr7n9q7i3i+m0Fr/Irdn3+CzKwt7HSCFmXP6k57yhHqP+f0eGdOWJIjv6NQUd2BSlvriMK247AbryG+T/2pxPrAAACAASURBVOcXBjODAAQgAAEIQAACEIAABOaTgOoPFYu2J3p+9rDVHyG7OtUgZcsJ9freIG8e2tiNnLIX1nZ9ecK+a83c1RXfZpAXXHWFvePrNN5waYNrO+hM81z2vNPvvnu962Ov1eEiiW9z51LKgxFcfs+82NZ31YW9pj74g4VcF0LfRzFkDZS9SzP8+77U/HQtEeLbZ0PYF0ZTYQoulybSdikw+vMM18qjIQABCEAAAhCAAAQgAIGrSEBFtxOMKhaL0+9Ve/j2b9GtvoOzvs/2dr3s5heS1Vc+c3xojT0dOrJMoWYqvlXk1o1/JWPIPoAqmK7rH9sMi57poDnae65Sv2eWF3SnXUi+CNXN1jZtpuRER59XXdj7yZcYFqjhgqsrmL9a+6E3NZuuYjcsRtz7L4E9OSvyM/CHIHoI09YTJQz15vdfCWYGAQhAAAIQgAAEIACBeSMQ+qGXuN+nWcjBR6xsHU6jpYHKOWpllzfznlF5SMPP01XhkKK8lKBexD543Y0qcegX8z1hr33s9z+xEXv9Ee/kLnaTtD4isa3niq96wt6nQBS2GAi9+zQFwvWA752azOEJkHXM14wIv0kjDk36SQ5mJ9hR+m9J3fjd2HrkEu1IWfZ95O8hAAEIQAACEIAABCAAgcUkkHWnLwskatDV9qiPDCSG8ul03PnUaG5j/Zp8C/NCh/8KJeG1hL01ItQs7NjDk/Ba+kOUo4Od6pSz/ddLesrXE/Ya1NY0hNA7sDjC7bIHQlR7jiP4IUofXA6jHfPLSw/SEyabtqGR+4iMgMX854lVQQACEIAABCAAAQhAAAKlBMo1RprVnfZTj9AYfc765ZHt0mlO7IaQRa0Rel1XRIBUdW9q/DdaQtcS9mlnusjDkwE2ppaw10HspqmgDhuWv7i6wt6K05Ft9zIrSes0/Jx82oerEbGTndgrUX1gVzvh1hbbGsJ/8fRFsqdeBVdI+bcnahFfvOqT5xMQgAAEIAABCEAAAhCAwFUmkKhGCjX1mv1c1KfetbNzbbwjxGYI/vZ5oc2TDtNN81os6Ca7j6G8uUQ/JR0xnYuRpnnhtagu7I1IOzjx19Nx9YW9IlBzt+7lyB6E9YV9xkAv5kWyFFUAByGvL6t6FWrdSFGN+iy+kX6j0jqVgv6Ig1OLaD8RzPqcGz+R+1nsLs+EAAQgAAEIQAACEIDA/BLwzurqlTbKod6bdEeLeivB9JCgY5319eOFJnzThhMypX2qvUu9j/Q9S+fqvAiMlqJHmP9VFvYjW+zFARtL2DsnPrX717YITUfss23vavZqty9XiOKHNP0g/OMATe4u/zKFVgplhnrhwCI4IY5sQ9GSJK2DqXfiM7l1MzIEIAABCEAAAhCAAAQgMAsCMYFZVxJdIVIfzMxtmrrzP5t9xrT3JgsZ0nY9+meafVCDfOgfP6JjWXbUysJ+zDR8ffb4wl70VKa4fmK8iH1IWdfU8rqXdw60vRmTjNnfnKSFpKczkWn5aSu8ET0m7UtbNd2/Ll8+BwEIQAACEIAABCAAAQjMPYHQA93ridz5jmz3lvOJNIiqmnB+sqT1cEKFvBrh2TKCNIhaR9XrOYXW17tshJirmrDXEvTxvdLGEva6j9r2zgr7grZz4wj79LSokZpxn6afuhnOy4unG+n7JdoXL+ZlC6kgReI+pJa4PvfOUI8LAhCAAAQgAAEIQAACEFhKAlkNVNh6zgvMVAhH6BLfKW2eRH1aPpBG6yPWUfZSWFHvMxLK7q3Qxz50M3O968cJZo8bsddF+bQE125u2NhtHGHvRG5LpL3anBmcP1Wy9ff25EUj97OM3vsXra+OJeLlCydtdg0Fhnpp5F6NGCIMLyJeUm6BAAQgAAEIQAACEIAABK4SAQ0KhjT5Au0TxLwKzFjd0CfqrTCcHZS0BXhoyZdpYdfErCy/Ebpr4BmxEfvgkSat1XjuBesZK2Jvx7QO9O5FaVzYB9dCPb2IfcFiNy6TNuJE/qwFvp5haGRdI+xxafk6b/U4sNwL5p+2DbS1/BEHBrH8uA8CEIAABCAAAQhAAAIQmHMCMW3tfNZwrKiv0Pp88nCymcrBF0Cf2qTuyR6MjOhQlllsFWGvOtdG7MfUu+MLe5uC7+sNGo7Y959g6OY0uUGBvIpibdvn6iVc5sEMT5zS1PnItPyM+6RbUc5JmQr61EyPyP3k/4HhCRCAAAQgAAEIQAACEJg1Ae811r0ozvAN7vA2kBpTvhv8y9QhXsuCZ6ObrE7UAHNL+88HQT8hvZhmJsTV1yuRWGFvA6+pmfp4Oq0RYa/uipreMZmIfaj1iHnR6n150jICL/Bn157BHVzYKHuVLIXg0jiyZYWa6YWToEkckNRjz6cgAAEIQAACEIAABCAAgeYJaNmxim/nVJ+XJh+6dGl9d0zGcFbUa7b2LDOefT/60OJ7zGh3EX3rrZ864sd7tEULez1YCYcqY2ZXNyLs7YsS6g4GqIxVY29Vrhek0cZydb8UPfd8Vz8xwxc1PbnRL1hk5F4zDtK6j4Kofdq2YnKHJHXp8zkIQAACEIAABCAAAQhAoCECfWZ5w+njRvOUs5qjTBhbeeH71Nssba+dGppu/DDhMGLCUfowoVC+HbRW5ETjhL1fS0NtypsT9mnfwn5RObawT08xghFCJM3at3nHeelKMqOWDa4EQQ81tC5ef8SkZbh5jzR1yKR62KyA2oz4IAQgAAEIQAACEIAABCAwnwRUF3SdD5otM84L+jltZVorXhOUZfS6QK5maudlaU+eQzAcD+3rpqsNqxjnKYtoYR+6owUH/zFANiDs9ek+Ym/r1Cch7KsI3DFoZD8a+jzqmlwORkMDxw9jBb4V9ppCb5X+6A9bMz1NudGyiIL56hfYtCUJaSvx0+FOCEAAAhCAAAQgAAEIQGDeCaT+Z/k14S6ImC3TLZMYapZeEkCcKJOMqFcNE+UF0NSERvvJFT0lXthnstPHnHJDwl4zMy68Ad2CCHubXuLrUfRFnlG6iXO11xMpFfdlJ2m+/WD6xSuqpdEXKGQCRIw55kvGxyEAAQhAAAIQgAAEIACBSRNQAa7xSNVlRfXgmdr0mCixDxw6XRRfY97oSq0W8qn3weyv0QeUDFax1Z2OFiXsbTa16rJmWrs3KOzze/s1kYpv3Q4baAFQef/1RbbReo2CzyY1X0/U7CRabUm0FV6suLfZE8ErYGDl2udRo/bRaf6VyfEBCEAAAhCAAAQgAAEIQGCaBGwbcnWqz++33us4Fmmo7evLgwFfYUbwhNbYK0/2Ac6pRurDohIxVthXK0GoJOyN9rAfP9jamLC36d+2xrvfnKEJYZ8a6EXVmjf7Ztk2Ciqt7brc+qb9UuuKVIiruO+KptLbPxm9UJuC417CwUvNMvSyzvuk5Df7wjAaBCAAAQhAAAIQgAAEpk7AZRurCM1zq3ft4dSXu8J//4cDAtUUU77CIUQvGDm+8K21BG9CWNVbIE7Y+0wEa543/vrM0f520sQJQc+4rb+WoxlhrxFrPcmIMZGrtWVxHwop7jMx1XNRe8cgxilfWxCG9hbD4t5lAQQ3yZj2FnGIuAsCEIAABCAAAQhAAAIQmDKBVIBqxL6gHNf+t78XkWUR4tRVvyADeJLLCxnLPrDZhOitP91iL7lRY8YLexe8HX+NiZjj1x8njaRkF5g0LJSw192L6Rlf/80Z+Ul3cqWbH19vb9NxckwN7YMyLvnucGf8k6IJLZ1hIQABCEAAAhCAAAQgAIE8AqH+PY2sF7jgh37pJRT1YKBlx7yYeqayLUO2JcPB9X7G+iQYqqft0ONewVhh30xGggvomqO9Zy5ib93SQ7uDuAn33WUFr57o9KdqjC/srQJ1EXt7mjH7y6VijIqGT2aOvRSa0CWgTIz7/pK6J1bcD19qztf/5ZnM3BkVAhCAAAQgAAEIQAACEGiaQHnLa6NeXVnzucIp+AMBzU62rcz199PsDGbEeqtZX7GYDOWmWeaMZ4W9ljd4U/XIR0YJ+2xngrIMitznBrN3nWNXzNHuE+cQZx35gjlbjZT3SQp7XahNxZ8PYW+59qWn2D+I3ObxbktNLzSNRtNpSqPsvS+7xvuHU3N075WvpuXMyRdoPER8GgIQgAAEIAABCEAAAstBYGSpsBpmh/bZkX3f0yzsKTvgW2Hry4SjNM60tjcR6VxU7ggQJew1sN5acYcupZpucL0ugNszS5SMsNd7U3FfQ0BPUNi7lm+afq4HD9PaxIjnWHGv0fApv/iSOc2KefH1tE3bERa1qAitFmbReSACM7dAAAIQgAAEIAABCEAAAj0CtnmX9rbrXrruXTmG2T1PreCCX0LQ6zkj1Rzgx9+XOfb+8hH7qgbqscLelVjXEPYhyJxmZSdB2OuL4Z0STVtMW1PyKyrodPDmU/FTYR8jYsd/s6qNkNZdhN6O1T5e++6++viIDItuV4z4zgVDD8201LMlGRHj1Z44H4QABCAAAQhAAAIQgAAExiYwoguWHdumswcX/AhRb3vWTzkFf24j9Z5X8FdT1hWuOGHvjfMqC3uXkW3bEGYysn0qfphlJi276gMmKOxdqvjq/KaK12yDUOHdyL811MrYTIaIgxjb/i6/r2X65a97ajT2YhgAAhCAAAQgAAEIQAACEIgiUNatK3TSijbd1lbZQSdMp8S4rxx8XkuC0wzt5oW9Nc5LtVfUrrub0sOG/qzxAWHvnNJ77nwVIrfhhGegz2Ej5nnzWGM/yN5H7lU4T63PffaEK8ZgIpNekz3d6S1FU/zVXCO01avwgnErBCAAAQhAAAIQgAAEIDAFAomYrna+0kzpgtZ2aYl1RJp3CFLqmFPyDQvm7VpqbbOzq2aLT4FyENHWPK/AiLxoGjER+1rC3mpuPYAZDtYOC3ut37Y17aGnXiS1qUTs56zGfgCNrW3ROhf9QuTWuUSyrHJb1fr4pOP+ISist/fGGrYDQYWDnSpz5l4IQAACEIAABCAAAQhAoAaBchd8l4LvW2SPeoIr1O95cU1Lv+icNJgoah7XRA/3GhhjPxJc8Sck7LstPdio4G9XEK3X5eQIe19vn5rVRaR460iTFPZ6gtOe41T87IsRTARFT1GmlMaSpuRHuF3aOWVTbQbfal+OEe26H/ut4D4IQAACEIAABCAAAQhAYCwCZebdVXy4rC7o+qBftVTz+mvw3djswUNENkH9BzXzyQmm4rvDF9/GPGq2Pnhsy6uHWxHmCns7rs331x8VhH2o4c5MrIlU/Lk2z8vbhDRyr46S0xD3WW+EkhMfbYtg9Bwm9LbPT9/RHpK6/679AhcEIAABCEAAAhCAAAQgMHMC3XMfUC1Iwbf/DR/Kaot1nGoUm2Xss43zXfWbXW31tt3NPr/WaDV1XUwqfi+rwmu50gn69napF0L/B4qFfXBQjBV2wR1+WWvs+7jql0Rd6J1T/uS/KFo+oRU2rchTH9f3cGSrPluX41sMlr5k3AABCEAAAhCAAAQgAAEITJxA56yg5NdHwm0EOCYSriXELovX6oiJByNVr5hMuXdk8HjiQEse4CP2rqVgfMA2TthX7GNv5+JKv/O8FUoi9hVM1CaZin8VzPPy3okyF/pGX9QQtdc9W4kYOaI+p73mTvy4IAABCEAAAhCAAAQgAIHZE7g8yZ2Dy3D27e1iMq5tq7wpuuCHEgENHM6rUV4uWe+hNhfCPrQjzC/5HhGx94YLFSL29vRgoMdfE6n49tTpKkaPU6O66dSs2C+0T6GP+sKUHTy01lwGABcEIAABCEAAAhCAAAQgMHsCBcLe/re//nd7rHC2wl61m7ZMm8J1ZYW9diC4cBnYM4/YO2Gv/evzsgcKhb1paX11fMTePsCe+vSL2PGFvUai9WBn9eqITG9EoSyqpm2M9bWyqTeaPj+6Ll5xJvbLrF/kYpM/015z7wAXBCAAAQhAAAIQgAAEIDB7AirsXe5831w0zV07WiWxqfhW0HdEOqrd4lPMxwIQMgqugmmeX2jwIaja0jw6FV972VvNHVOaoNkDesAQzPP6d6NA2PsTnwrC3gr6nFOf8YW9rlNf0itS7x0cCi3waic79b8ovmYlmlFZGn6o0Sk/JKg/Zz4JAQhAAAIQgAAEIAABCFQi0Dmzpnf59d6Z/4bXyOgosRg0S6rfpiHuVWNqADIY/MWI2Up0JnCzRuxDH/t4RrHCPnXGjylPSLubVRL2yjtEyOOAu4j9cDpHE8K+eiuACexp1JC+BUEwEqyQrhE1fO5NwYgi64A5ajRn7OfSOBL9Z2Hg5vAPQsv2VFS/TC4IQAACEIAABCAAAQhAYA4IhOChzbwdFpo2cm87W8VEgVW7dHy7u+H2aZNZbWh359t0x5Z9T2Yy5aN6w/Gi9PeiAWKFvWmp3orZK32S05om0YOG4RKKnIi9O91JU/HLl+vuKKjXHl/YX5XosbYf0NOzaUbqtUTBpd04D4KI1nRlLRuubP1L7IvKfRCAAAQgAAEIQAACELjCBFRvFLU8s/8t33JiMSbl3QpXX049pXp7ozkHkW35Zr9LriWgy8SO9yOIEvbBF6FGi3mXtdE/n3xhb2sz4uvrJy7s68xn2m9B+EIUnJ5NYjquF6SP1Ed9cd0L2TtxGjjlq3pIMIlFMSYEIAABCEAAAhCAAAQgUEwgdCOz+iMnPdwG+0Ib7NjAn9ba63j62PiU89rb5A8g5j8tv6yEOZ9AlLAPDDRTPjpLWksD3EFMibAPLdO0DYEKxtg0bH+SoQ8ZeBGaiNjbFIWqBw2137KKH+yrqfep+BWHqHu7a2uhbDRtPsIwr8wFP3QfqLT3dWfP5yAAAQhAAAIQgAAEIACBygTS+vgLL+wLxH2V9ndWLF6OqN+vPMvSD1yJyH3NjIZYYW9Ln6tE7G06fiaLIKO9MxF7rdXWw4K2M6qLPjVwpzpqKpDnFji2sA9lAVZsRpw4lb5CDd+QRsCL3eUbfqIfTg9hNMUmLrNCywQkuXCdC/IuX49jGc8j58lAZFQIQAACEIAABCAAAQhcPQL2v+2DQ3peinjVgG02Mj2tenvF7ksHbKAyttZ8mtvlOVdsDRgj7J0fQku6ZqU0SDu04m627Z072PHC3reU60vZiI3WO2Fvaw8mEbHXBduDhjnc6Bmk37tN1UOY0M4ioh1dovX/o9wcvUNlRKu8aX6NeBYEIAABCEAAAhCAAAQgUEAgNXbrDqVlB81g6+xj/xs/pPingcAppOR7bePmqbqmStb4NN6MyQl762tn/QaCV1oF/e33Kmvq54R9tra6rDXCED/1TU+cI35ONLiJiL0zhtONrrDYCe6z6wMfnOX1i+QPNyb4zDC0q6v3hx02sl7CxE5Oex6OSK2xp0WrPqV/PhhPASWPgAAEIAABCEAAAhCAwNUmELpdiWqSvG5XKhe8liops9bPh77tJne8yaFKNU7ISC7TOJObSv/ItotYN61rj31sTMTeZSv4LOzK2Qo+Jd8Gml2LdXO89zTRGm01YdNa9lKhmCPsrSGb9vfLcQocX9hnHd/nQXQGiHqQkd9mInbD69zn6urdyZt+dW0KR+HVq8Eo+nLa8fRkrL1iDyhGj1dnxnwGAhCAAAQgAAEIQAACEJgIAZuZm2+mlj7PtF0ba6v1yq6Qkt+VaYt7l5XsI9g+Rb9stpP/+2xNe0FJc84k4oS9irnQsrxGdnrwWhBtWdgVc7T3PLF12nXTHkoMBRZL2Lse8Ea8C+FU+tRn3pS+E50YvwFXIlHcdzGbgm8NFib/3eAJEIAABCAAAQhAAAIQgEBDBLKR23zPL033Vr3X621f9t/82f728S3emlnQHPa59+3CXbu7uPKEasI+iPsYfTdAOTVy74h5s7+djBWl9bUdRb39xhH2aTu3tnfpb+ZtqTeKT2l3mQnTNJToTddolN62tYurPXGtEIrmGww19HRI+XJBAAIQgAAEIAABCEAAAleSgE/JLgro2Q5a1qMr1iRdS3lDf/s4Mdskt2yWcnyntiZnkB2rLFg6/Nx4Ya+HLNkM9fprMEcHO+PtVLDbt30Ph4caR9gHl0RpV+ntVx9G4Set873WLrg16v+me/mTq9QBv+yUTQ+TOoV19e7ARN+hOTUlnC5cngYBCEAAAhCAAAQgAIErTqAXZdeo8mC9vQvkunruXuS+eMlpvX3SGZH9O1lkrmRY56weAT4oOdlHFo+eZkHHZTBUE/bBPy2mVKJ4ig0Ie99moaDefCxhH0z9ZibsQ+q9d5rM8RCY/LsVRH1wiowR9cHYT7/UOS+fb60Q7ZA5+UXyBAhAAAIQgAAEIAABCEBgHAJpIFK1QAMt8FITbq0tdwZt071cO3brB2YPJLQlXoQWmsQkJyXsg4FeGnCtP/lmhH33wtUbNB2xDz3Vo1NG6oMY+mR4ke0pVZ7LZIPPKhyqulOiCvledsHwFzotbxjHV2EaS+cZEIAABCAAAQhAAAIQgEA8gbTeepTJt6u3tx3HbIetssu3e5uxJjItjd6HOYdW7WVzb/DvbR9770AfMWxsxD5kUtRqeTcwjzGFvdto070obPk2TsS+16t92jXgzg3SOkHOwPk+3aPgkmgPNsov13bQpeC7K+dUzR+WmJa66s/oxKt8KdwBAQhAAAIQgAAEIAABCFQmENF3PdvqPFbc27Z6vua+8pya+IDXLZUOJZp4bpBVoQtcnDN+rLB35uWJSGvVH7bU12fjCfvUEV9PMPJTM8YR9r3TpPHqDeK31JviWaOIkG4y7ZQTP1ubLh/XczKsz5pl2NOk/NoPZ0KhL8uKiDXh44IABCAAAQhAAAIQgAAEFotAaFmnmccF/mBpADGy3Xmall+sNSbPMNTZ+6yDSEPxRuZlnfGdMXnMFS/s/WgayI3OosifQQPCflQ7NZHxhb0uctIiVE+2FJBumIrifCPAmE0c/x6fWmJFvXOvLL+0f6WuQR3wi+pfjNgUFn1hpvklKJ88d0AAAhCAAAQgAAEIQAACTRLI1tvnlkyHDllBa8VEijMHBjkGfU1Ov3iskIbvdVLwDpt0JrLlqVpRS9DLr+rC3ncqi9J+ExH2xc7r4XG1hX2aIqJpCTEvWjng3Dsyvf+KWvbVHLnGx/w6dUPtqU2MqNfsDW9gOELUW4atFTFqPFFjZnwEAhCAAAQgAAEIQAACELg6BJzv1uXI0mJX+hwp7lU3qVyxRnLeXHyWOFJD8CkFLu26Qyvx0QuvKuybKEEfM2Lv67lH9HWvL+y9C7w1eZuQsA8nLzZ13dejzPTlDCdPsWYWQdSP6jGZMeCbJMtZcuPZEIAABCAAAQhAAAIQgMAAAdfhy6aPF+o1Df553WWDimW6yxumByO5ETpwOtvhO4iF0gI7/bI11JyZGgh2fYZ0yRC1hL1mVo+h18YQ9iEVo7i+Xtc7lrAP5giNb45/yW3bBvfDusVPvYVD9o2o6lCpr6ya5anrZce1gsibf1qrr19U/dLWfJH5GAQgAAEIQAACEIAABCBwxQj00ueLfLisQGi1bWZvV7TFXIRg8F5r1uNrJi3BwzaElnia5O2d862XWMQaqu5kMA+MMFevKuytmLOHE/Wz1esLe1/TbU0ERiR31xP22ZOjJo3zwgmTvrIuQj/bF9G/TXYTg1lelfT70IpvlFleJgug6svL/RCAAAQgAAEIQAACEIDA1SaQZikHH7G8wlwtBQ56REVxhDDO1PHbgONMg6Qqp3QWQVeFoGbEOmJ3N6y3RP/qcJWFvRLXkmlbFhHJf2DeYwh7n/5dcmIxnrCvUGc+akPSlyxrjqcfmINqc2+Qp6Z2esoUdaXdCHzbibwP2YMCn9IflVYT9WRuggAEIAABCEAAAhCAAASuGoGQpWwj7L4T2NAaqmYQewNym+rvM6FnzSXNNtCDilDSHdz0x52cz36wrcVH68g6wt5G7MfIWK8n7BPtgK6t1XxbuBGM6gv74Aw47ilLqC0JJ1T50e1xt7nW542mjrSdU32sqLfnEaNMC106ik3UV2d9+0JzQQACEIAABCAAAQhAAALLTEAzlVu+NbaTpYPi1KXhJ1Y/xHbn8uNYXViuDafJ367FaqyQwdyyhxpRpQZ5E63Q8q+esFcR1xZpr8RlTAzMsbawd1b/Ra3Vek+pLuzdiYpprfRSKSq/AS4VJKTbp/UkMzd3yCwktLKrJOr1VExFffZEbPgL6Rzw9bBggsaDlfeED0AAAhCAAAQgAAEIQAACMyVgDeBCXXyOjlCxH4KPmhZur4hAaybdfx7S8u2sbWq+n3/ouGZavha/+i4Efdkz0CuO2tcR9vbAQX0CQtvzilOsKew1pf1SjGiN+ug0hOrCXnchtHurGG1Ohbs/cFBTPFvvkXciVZFUY7cHl/qs+2TE4P6EqPiLmHlp+1LwI8bmFghAAAIQgAAEIAABCEBgCQhkAoWjgrQqgFvaJrtC5D4tF56vyH16OBFq14O/mR5YVK1n1zV2L7zGLM4EryPs3RmE8tas6+oGgDWFfWhzV57WXk/Yr7gXqSw9PfRStLpd1bsX9Gnd/xzU0A/882Dr6H36vc4uJhXEnpHZSL0aFY44TAlZAPZ0LeJkbQn+6WKJEIAABCAAAQhAAAIQgECWQLlTvot2+yxgTQ+Pccq3miV0HfMG6zM21Bvad9tKzAlo01IXfS+go9vkKTvXlWxUnX1dYe/KB0I5dTU9V0PYuxchtrVBVWFv9PzDugHGnA5pNF7n4tLutW5El98L0M+ZsLepH6GmPm6jEn3dEl3bpRjr4m+/MTn/NlU1u+CfNwhAAAIQgAAEIAABCEBgOQmUGcF5rRJKpCuZcSdWn6kAdh3I5kiT6Xr8huel6dvgaNkhhvUpGJ2VUFfY26nZfvbVTeTN0f5LLaTwAd4IsWlPYYLILN+kqsK+l4afl37gHRxtmod/SUL6/bydBvX9CxH6Eob0+wjO9vN+nalJYRHvrKiv1x5hOf9BY9UQzHN3tQAAIABJREFUgAAEIAABCEAAAhBYUgIhuu6zgvMpeKFbx1AvbQ83Z+J+aKFeP9ka98yv7RGA6reBD4RMav254Kov7ANvFfaxZemupbs5fv3cxrvt2UXWYMCeFgyKxCA0fUuDiO9AFWHfS/nQVHIV9kHI+lYKVuiqk6FLR7fR+bkW9BZixgzQC/wIbv2ivvilSd0erckCoj4KLTdBAAIQgAAEIAABCEBg6Ql4PeWd8lPD8Rwuadp6FePvkFWt2d62nLi8jHu2WxKC3ToLFfT9Ij8149N1advAEen49YW91+CD6fip5s3oY51mJshtjnaf2L/V2u++dIRQf6CLsu3VtR4hmC2MrinIbkhVYa8Psy0WbB6BJqJno/RFPRdn+wrkPT1svOWafgFiI/W+pt6WGRTX1DtR79zv7eFMWdrI/GFiRhCAAAQgAAEIQAACEIDADAlYzaXG6D4jujBwmvZZ9y3kYuecidwb47qXXY3L66vgN5BJ03caLbRTH17NWMJedZ31m1Od11dn7h6UHpBoJn3v96mwT6cTxKE1FfCC3v4ijOqi5rG1ElWEvZ1D1jBvaNOvzktgT3i8UV61HvXeBDCkxIysqfep/emJ0tX4ijBLCEAAAhCAAAQgAAEIQGBeCHh9l5p1W/WYMznf575yBy6ffW2FcFYMXxVtFzRxVh/7IHTBIcV4wj5kzofS9KC/8/alx3BY2A9sYYgCpx+p2DqumrDXl2WOze8ivnuupMFnHbhUh3IDhnTcXvsJewrkjmRyv1S2BYKtuwhpIhGT4xYIQAACEIAABCAAAQhAAAK5CsNF7lNn+yJKweS8Slp+0DVd1TuhrPsqCfsejGxKfhGicYW9fUYItPdhKmZWKuzHfeurCftxnzbjz6vLok2L1/KFKr0HwylMV0Rb9Y0wYuil3/sUGNLvZ7zpPB4CEIAABCAAAQhAAAKLQkD1iLbZ1nr4ETXxWXEf4yQfhL0t73bjX426+3r7Oq6wr/NUhH0dakOf8QZ5tp4+tOmLrKdPDQ+6vp6+2CjPlkMQqW9kxxgEAhCAAAQgAAEIQAACEBgkkEnLD675RZBqiXs/WKi77+t0tji7gbC/cnvZ6+8owZU+6xFQuh51VFTLgtA+cNSpWKjZ144BEf0VS5/NDRCAAAQgAAEIQAACEIAABIYJWEM9X3Pvfj2q7XZLjFlxAc4qlx3TZQho9F6vq2OsN3qhCPsqL8I83JueUtVMi7cnVSrqnRlh2RfGHh4g6udh55kDBCAAAQhAAAIQgAAEFpdAEPJaD1+Wlm9d3J3/ly1JrlQq7Nuph+yAuW+JF7flCPs4TnNwV4ie+7T7OqdT9qX19fSjTsD63PXpUz8Hm88UIAABCEAAAhCAAAQgsBwEbLtzF4h0fehHRO5D0FNbl7v2apFXxjVftDy5LOgZOewMb0PYzxB+1KPt6ZNv8yDtigZ54XugYj7zo+DLoe76SRD1LR+pj5okN0EAAhCAAAQgAAEIQAACEGiIQJI4ozvfjts2Qc8JTAa3eJeWrwn8mqJfQeB7QW9sSzzfIeyKRvAR9g29e5Maxjreh970+pAqL6oKeHvi1bEmeS71XgcZPvVy7Q3UKE8PD6qeeE1q9YwLAQhAAAIQgAAEIAABCCwlgbQeXlvVuYh60WXUUNyafq94vVRB3Ntxg3O+moprQPTqtcVD2M/jtySN0nvH+8p1I35R/uRpdF9I99LbL0Nf/f48gmFOEIAABCAAAQhAAAIQgMDyEMjUw9vo/SjBnS1dblcMiCrREBTNli5fHYGPsJ+rb4VPubf1867NnEbRK6WT2HfSRemtoC85cQqC3v2skXp/YjVXXJgMBCAAAQhAAAIQgAAEILCUBELkXrVNmbj3AVI11ZOgqSplPAct1et57xz6vfCf4w1A2M98c1S4u0m4mpBslL7q5KqdMvVSVvTFV1HPBQEIQAACEIAABCAAAQhAYN4IZHvdawCzWGi7oKirt9cSY03R1/9V8tazw/sgqXXo98/3qm3e6Oh8EPYz3ZXQG16j8/oC+tr2qqdK9sXzdSdp+v3oOhR7mqBiPq2nr1KHMlNoPBwCEIAABCAAAQhAAAIQWEoCGrWPTJW3mirbUSxoryrggqB3zvmJaq1Ue1UZZ/L3Iuwnzzj/Cbkvmt5aTWCrO6QdStNS7IvmWzeMqj8JZnyhpn5WDHguBCAAAQhAAAIQgAAEIACBWAIqrq1i6liBb53zRxjd9XX9sun5Y7TyHuwyVmLoF7ukpu5D2DdFMmqckALi2jBYszor5OucHoUofbaVXZlbpE9JsZH68OyoiXMTBCAAAQhAAAIQgAAEIACBOSGQpJF7WwPflyqfM0Ub0FTZ5Vt61xb4mZKA1GyvJFN6SsQQ9lMBnRH0LS+u6zrdh0h82v5BI/URL1PoT68vsz1Q4IIABCAAAQhAAAIQgAAEIHCFCdgoujcNL+s/34SxXkCVGvqpDgvt8bJ1+NNnirCfCPNMOr3xTvfWvEEF9bii2r8wXe3n6I0cCteg80ickLc/Ql/HiSyaQSEAAQhAAAIQgAAEIAABCEyXQCqyfb97+3uvg/JmYvWZ9r13qfnu13Wv4HPmMwhU5GdHG1EmUPeJRZ9D2DdNVF8O68IY0utVULtf6746X7xqdfT6CVdLP5ByMvJFsd6Pvd70jRwqNA2L8SAAAQhAAAIQgAAEIAABCIxJIBX3IXpfJtV9RrXREml1zvearfY0QrS+16UsqkSg9vOGP4iwHxemFfJBrGvdfKiZ95H5cdPeU7f70GZhsN1C7jFUr4Y/NcirfpgwLho+DwEIQAACEIAABCAAAQhAYCoEsroptKorjZirwA/Zzf7XNYKwvfX5AwV9rs+utirM/9pNp+zQoR4thH0tbqFmPrgqhnT7TPu6Oi3r0rlkXgiN/XsHRuf4WPIipG77RkxrxWUOcEEAAhCAAAQgAAEIQAACEFgCAqqZWuqWb/vPq3O+tqkr1lDW1Nxy8e3Ag8H5WHrOgw51/6GEOqvnfHezUXOrsl0zEvZPQ0+2KnONvvf87FSefOdr9v61a9fl8We+EP3Z0Td6kRyM6Ozme3d5l/deJ8s+55H+hCfJtHCIqBVx76PWiuipU7uhNTMMBCAAAQhAAAIQgAAEIACBK0ZAtVSi7fB87f3I6buafFdvHwR+0HpNrTuk6WcM91LDv/Gj+LMR9q9fJC4dITgINgXLjTO+sHcC3dXKW7XsU9t7EfpUwTdxkmOfEaL0mfZ1ZW0bArY0Sq8GfUHQE6lv9q1iNAhAAAIQgAAEIAABCEDgahHwAdNux+mtMud8r/3SfvfqU2YDpg1oq1S7h19kXfQzNfrR8+zfiakJ+0x3AXN08DIRdXW36RHjn04Mvlylwl4n443ssqnqVshnzO16DolhI53Q13SN5q6s0YI/6Ig9ucnW89vMAefo2Oz8mlspI0EAAhCAAAQgAAEIQAACEJgeAe+QH4LKXuDb+Hxp/b3qqpYzIw+Z2kF/NbkAP49eycBg+bWWZqt8dcpVfw5XUKU6xO7Ox7L36oX9q7v3HsnW/UdNzrJ/LGXSWhFztO+FfWm7tnpzGRL2n/0wnL30Y0j1ube/8871ri1dk+K9aB0ZIW/r6CNq6F3+gHPZtyUB/gRpXJO+eqj5FAQgAAEIQAACEIAABCAAgStAoFfubCP3kdpLF+YEvmuP50R+L/Db/MKddFcx7zLcgzTVDmkanQ5PDNXtKviNvNp5Lns7H09c2DtPAqdDzdHec5+K33y0XlfSL+zX5fH7X8zwzhHsuRp+EsK+B9/ukDd0cGkhsSyyzo2hLcMk5tr8K8qIEIAABCAAAQhAAAIQgAAEZkogNbLritgIvl4xWswJepflHXSY/myl/wSWFEq1y4Z29+1uP5W97WcTF/b2Af6AwxzvPU1iUh/KllD09/3CfkMefxCEvUvBnwj30sm6ExZjgkPjQE1F6ed13q7GQyP1ZuxeizEP5B4IQAACEIAABCAAAQhAAAILREADqrY023u+qbivEL1P/deCqEzNyych7uO4q7bes8L+aUbYvx15YBH3jMG7NHJvjnYn7Yp/Jk++89v22WvXVNh/qd5sx/5UEO+9VA+ThHYLMadC9jhEpKUviauht2UCrpB+7NkxAAQgAAEIQAACEIAABCAAgaUloC3nvFldUtHcvdcmz0XtXeBVU/YnmaZfvFO7L5+kwn7r/tu2zj4uE6H+7puj3SexqrbWU87Pz+TJt2ch7Pv7z6cp9mm6hy4nZukDbfWy7fVmk25Qax/4EAQgAAEIQAACEIAABCAAgbknYCP2rjuZa5GXca6PnvxAyXT6uWxNfvRglW/sF/bvyF01z4vqAlD5Ub2VTVTYGyPnZyrsf8s+cPIR+4xQDyYMqZCPM8MLZNJTH/1Yq21PfZKpGfnV31A+CQEIQAACEIAABCAAAQhA4OoTCO3xur7xeRD5zo8+7soY7GUDtIOR/FASEDdo6V1ZYX/3wbuiUXvnIRA779JHDN0w0Yi9MW0504j9t74yUWGftiPwIt7F2P3Ghzr+aEM8z8i0nONiWj9vczpmZQpQfWf5BAQgAAEIQAACEIAABCAAgatMwApu1cMugm/r7+t0c8sI+Z6TvNb2+wh+wyn7/cL+Pbn34F1JksveGiawJ5MT9r792/n5hTz55pcbEvauJt62mLPpGZkofBDufSkOVU5EQlqGsb3nez0SZ1OXMYG9ZkgIQAACEIAABCAAAQhAAAJXk0DaFi+jAysZ7YVlZwO22bJrH91Py63rB3aHhP3D9ySxxoD6Q40Cm78mKOzbYlo+Yv+NCGEfhHnQ0Wpsl7YJ7NVVuMQLZ4RnI/WV2tP1A7QCPhgxBjM867ag5ngY4jX/ujEiBCAAAQhAAAIQgAAEIACBMQikNfgueh+yt61OtP9XJbjr5xFa51kt6MLItj+89Un3veLTc4GeTkwl7ICZ+qCw33r42AWmVdx3L8dYfPFHJyTsjZjWinRNSy7OT+XJSGE/2DdeT2B0wj3zO4fOifhU92duqV2rYDfAOSZa10TNBcDhfiIvGoNCAAIQgAAEIAABCEAAAhBohkBWK2pWd9Zor56w72lQ1YS984Eg7O2fWTWaifI76Z/2kg9ryxP2LvNcxb1PyW8GRDpK88I+mBKYFbvA87OTEcLei3p7ajHgdpjWxvcp+LGW70S7P3HJc7enhn4svnwYAhCAAAQgAAEIQAACEIDAdAmoptQn9tfgpz5sjU0mpOZ76ZrVjlb7arDYif78iL33ChCN2nvPgMbmJtrHvsl2d/60orXiI+Eq7I+Lhb01P7icnEOgB2sd7e1hip6+9H6dJEToG3yXGAoCEIAABCAAAQhAAAIQgMDMCPTS8p03mxP7Op2QJV4jmh+xGi1BT0xbRH+MEvZ2MomN2ve38ot4SMktDQp7L5KNLsqnt4uUCPuOmO6lhz4u5ND2wKVOuMi8/qT18v70xEfsx8fGCBCAAAQgAAEIQAACEIAABCAwvwS8mPcC30pEb7bX82mr0jqveKU2eGx/tG0guTBiH4ZIOmKSS0m61Vqyj2LdoLD3Yr6lJxUqpt1VGLG3robjWv5nDO76WhQYkZavn0/F/fy+cswMAhCAAAQgAAEIQAACEIAABJokkAkc93m4qSt9NoIf6vVT1V1jEqFtXluk1Zbdl09lb/upHefug/fEmedlL43aq7jvNBTkbjIVX08nNAUh7fteJOy/aDm6RaiwrxGpz7gW9vUhzETknds9zvY13ko+AgEIQAACEIAABCAAAQhAYEEJZLzdbGm467Zmzdp9RN+Z61fVqT5LvLUiu9vPSoS9r7e37e/0R9VnDW9NMxF7m3q/ItIabhM3HLH/ojudkK7r5ZdzhTZ0wXwg/b11HNQP+IyAPsMC+s0v6DePZUEAAhCAAAQgAAEIQAACEJgAASeoU6M9GxwOAr+Xuu9EaC/K7/Rpjhi3Bu0rsrvzXPa2n9mx8yP2fimaxZ665I8n7scU9l5Ma/q9NcwbjpD3C/t1efy+CvuLDJjB/cn0kbdg3N+nBnj2N71U/wnsLkNCAAIQgAAEIAABCEAAAhCAwFISCC77IUVfU/czl7bWy0T3+//SpeTv7ryQvZ3n5cJe70iN9HyJQE3mYwl75zDfsnUERWJ7SNh/7sNCF/w0rb61OtQLsOb6+BgEIAABCEAAAhCAAAQgAAEIQKAZAqGz24gU+t1Xn8jezsdxwt665GsLvE5/tkDF2dYU9iGMrqLe9avPi9brXIaE/We/N3UjHJyrq9HX6P9wSn/FdXE7BCAAAQhAAAIQgAAEIAABCECgYQKJmCRxZeUq7l0vtr5r95VG7F9ECnuf8q9jaVq+vaqn5dcX9poOn0bqi03q+oX9dXn8me/Nn2gYz5rvkWrf8NvHcBCAAAQgAAEIQAACEIAABCDQBAHrtafCPpjB9wtxm4r/qoKwt1q+6w3m65np1RL2RnvVa1TdtAsj9YHXsLD/Qh/K1BjP1unreIj6Jt41xoAABCAAAQhAAAIQgAAEIACByRBIrBAPYry/Dn9Q2N97+DgiBq+1/doSXn9UF/fVhb2NrGv6vYrw8qtU2Kv1gKbyt1ZFGw3Qoq6cKXdAAAIQgAAEIAABCEAAAhCAwCwJeJd8NYb3bfLCbPqE/f13XB/72Kx0PSzoXkpi0/zjr2rCvlK6vHMTPD87+v/bu/MY2dLzruPPe6pr76quql5u993GHo89saw4A1KCyGIiZGzLJDHBkQJBkTBxoizkjxCBEpBAIooisEQklpgoEYlBIDAGQmyQgxNQFEuJiMDghMT2zNyZO3du79XVte/nRc9bVX17qe6utW+dO99jjWZ87znvec/nnH9+9b7v88qjV//A9SgS1an4Z0fs3fp83SpPfyhg3/nR3xxnIoAAAggggAACCCCAAAIIPD0BF+h1y7rBevteV84G+y1ZXb8jdjDb/drM2x+5d22OXil/5GDvKuAP9qu/tjODAgC+tJoVefTgj4YGe6N72Xnabn+rvFHafXqvjTsjgAACCCCAAAIIIIAAAggg0BcYbInXq2rfC+Jng31ubVOya7d7I/ZuQPvy+nQnrJf8YHAV+wjBvrcXnxtRd2vgR+mI3rJX1a/VqMmj178yJNj3Qr1br++mJYzQLh8QAggggAACCCCAAAIIIIAAAosk4NbE99bGa6rNH+w8KZ63uika7nvBvpepNbePtARdi/O5Hwxctb4rn/j6YD/ogPv35dvaPbnLYK2Blur3pdWoDw/2J2v1CfWL9E3SFwQQQAABBBBAAAEEEEAAgTEEBiPs/YCve9jrdHw9soNgr5H/zNL2EQa2z4zcXz0t/+pg78J8v1jeqCPqJ1X8eov9hwd7Ha1nXf0YnwqnIoAAAggggAACCCCAAAIILKpAf1Td+G05OtweEuy144PZ8GE3e33Uw/T3uNdK/JcdVwR7DfSThXot+2/7D9ZqNs6O2L/93f1CeVosb/SHGfWhOQ8BBBBAAAEEEEAAAQQQQACBGxfob1dXOHjswr0eT0bs+70ZLHMXnZY/Yh7uj9xrwLf+8JH7IcF+gjX12scLe+711gBcDPbv6Y/WjzKt/8ZfBTdEAAEEEEAAAQQQQAABBBBAYAKB3rL0o4M3RcP90GCvfziYGe92hhsv3Ls191qJ34X9J8fZYD9YQ++q9Q3W1I/wPNqoW0/wpBLg4KqzwT4u997x9b0Rew4EEEAAAQQQQAABBBBAAAEEnjGBo/1HUjh48/Jg7/5Gl6eHxGgxPRkx3GsBPR2xP8ndT8J9P9j3F+5rsB+sfe+V6rue+Eyov1it70Kwf+EbqIB/vSpnIIAAAggggAACCCCAAAIIBFBgtGD/JNy7ge9RR+71Mrfmvh/wnY+VJ8Fet7JzDQ7C/Aih3v1iMBipH16Cv9VqyqPX/tjdLhKNy70XXgrgq6HLCCCAAAIIIIAAAggggAACCFwvcCbYr23J6tqWXFr4brDmftQ97vtB3k3FP5k1L2Kqhcf2zBz/6/vZO8NV5NNg3+n/97ALjbRajVPBPiH33Ig9BwIIIIAAAggggAACCCCAAALPnsDZYH9bVte3XGbuFZgfcpzZYn7Uafnaju8G2o21YmrHO9aOO/Svgd4N/19cU3/STWNE/9fUEfsH/8/9cSRKsH/2PlueCAEEEEAAAQQQQAABBBBAYCBwJtiv35XV9dti3YD48Fnu7rqTkftxp+Vb0V3pTLW43xuxH/m4fvp9r2NafM+TVqstj179vwT7kX05EQEEEEAAAQQQQAABBBBAIKgC54N9buPuk4FxN0h+2ci97lB3eon8iMvjtTxetXR4SatDGN2WdoNR+ss6NNguz3NV/lzxvFcI9kH9KOk3AggggAACCCCAAAIIIIDA6AIXg/29/jJ2nTrf6f23++f80c/SrmK+7lQ3+hbxIwd7XeyvQ/zDtrR70p1BqO9PH9AR+2aNYD/6N8CZCCCAAAIIIIAAAggggAACARYYHuz1gS7fru7M47oZ9TpQ7rmt8MwIu9WNEOz7I/O6nl4X57uieUN+WzBGi+z3p+APqusbgn2AP0i6jgACCCCAAAIIIIAAAgggMJ7A5cG+F+51wNytub92Wr4ubx+sub96Wv41wV5vqsG+V/n+0ip+bq2/J64In26bpwG/fzBiP95HwNkIIIAAAggggAACCCCAAALBFbg62PfCveZr43f72+BdsebeDZ4vudH70zn7vM7lwd4Fel+M9G/m7jV8HYBODTiprH+uEB/BPrgfJD1HAAEEEEAAAQQQQAABBBAYT+D6YK/RWue768h9t/fvSwrquWn4OoiuU/J1ar7VUfyL/RkS7DXQ6436U+/9/n71w55lsJh/yEj94HSC/XgfAWcjgAACCCCAAAIIIIAAAggEV2CkYO8e79Sae7fs/bK69udr2V0sqnc22A/21bO6yb3+ajB8Pb3rw5lQ31/cP8SeYB/cD5KeI4AAAggggAACCCCAAAIIjCcwerDvh/t+oXrrdqC7atM6I8YLiR0U1ztVVO9csO+K+Dr9vjdKf+maetdAb5/682vqzz8ywX68j4CzEUAAAQQQQAABBBBAAAEEgiswXrDvP6cOqruCeteN3Ov5Wik/JPbUuvt+sNdGBhXv9d/9Xw6GWvYr32uRPPdLwdXV+Qj2wf0g6TkCCCCAAAIIIIAAAggggMB4AhMFexfBB9vLXz9y72bQax7XZfFixNSK+7Y35H/5VnZ6D1cgzz2PjtIv9UP99Q9IsL/eiDMQQAABBBBAAAEEEEAAAQSeDYGJg/1JuB8E/MuXxg/2ttdp+Tp6b2rHO1Yr8Q2veH8K1pjecP/JPnqjoRPsR3PiLAQQQAABBBBAAAEEEEAAgeALTBXs+3vbu2H1/l73vWX3V6y913BfPXqzXwb/MsDrK/BdRU+wD/6HyRMggAACCCCAAAIIIIAAAgiMJjBdsD8V4t26+/7s+quCvU7Frx49uir6i9E98waj9Keq7o32SCIE+1GlOA8BBBBAAAEEEEAAAQQQQCDoAtMH+77AqV3rrl06PzzYD0bp+4vxB1vbTSBMsJ8AjUsQQAABBBBAAAEEEEAAAQQCKTCzYD94+pOieoOK+RfH5s+N2Pcr3J+rsNfbs36yg2A/mRtXIYAAAggggAACCCCAAAIIBE9g5sHerbvXZfY6Lb9fH+/cfvcXg73bm16r3muYnzzQD/gJ9sH7EOkxAggggAACCCCAAAIIIIDAZAKzD/an+nGy7l4Dvh690fsnwd6N0uve9CGxuvh+ilH6049PsJ/sY+AqBBBAAAEEEEAAAQQQQACB4AnMNdi7LN/fqv7U6L2pFrQqvq6l7//j/nt2eAT72VnSEgIIIIAAAggggAACCCCAwGILzD3Yu8fX6fmDgO+LqRa2rXg6Uu/NZOr9eWKC/WJ/dPQOAQQQQAABBBBAAAEEEEBgdgI3E+z7/e2He1MpHthZTbsfRkGwn90HQksIIIAAAggggAACCCCAAAKLLXCjwV4prBVTLR1esY/99GAE++kNaQEBBBBAAAEEEEAAAQQQQCAYAjce7F3xPIJ9ML4OeokAAggggAACCCCAAAIIILDwAgT7hX9FdBABBBBAAAEEEEAAAQQQQACBywUI9nwdCCCAAAIIIIAAAggggAACCARYgGAf4JdH1xFAAAEEEEAAAQQQQAABBBAg2PMNIIAAAggggAACCCCAAAIIIBBgAYJ9gF8eXUcAAQQQQAABBBBAAAEEEECAYM83gAACCCCAAAIIIIAAAggggECABQj2AX55dB0BBBBAAAEEEEAAAQQQQAABgj3fAAIIIIAAAggggAACCCCAAAIBFiDYB/jl0XUEEEAAAQQQQAABBBBAAAEECPZ8AwgggAACCCCAAAIIIIAAAggEWIBgH+CXR9cRQAABBBBAAAEEEEAAAQQQINjzDSCAAAIIIIAAAggggAACCCAQYAGCfYBfHl1HAAEEEEAAAQQQQAABBBBAgGDPN4AAAggggAACCCCAAAIIIIBAgAUI9gF+eXQdAQQQQAABBBBAAAEEEEAAAYI93wACCCCAAAIIIIAAAggggAACARYg2Af45dF1BBBAAAEEEEAAAQQQQAABBAj2fAMIIIAAAggggAACCCCAAAIIBFiAYB/gl0fXEUAAAQQQQAABBBBAAAEEECDY8w0ggAACCCCAAAIIIIAAAgggEGABgn2AXx5dRwABBBBAAAEEEEAAAQQQQIBgzzeAAAIIIIAAAggggAACCCCAQIAFCPYBfnl0HQEEEEAAAQQQQAABBBBAAAGCPd8AAggggAACCCCAAAIIIIAAAgEWINgH+OXRdQQQQAABBBBAAAEEEEAAAQQI9nwDCCCAAAIIIIAAAggggAACCARYgGAf4JdH1xFAAAEEEEAAAQQQQAABBBAg2PMNIIAAAggggAACCCCAAAIIIBBgAYJ9gF8eXUdTzScOAAAZGklEQVQAAQQQQAABBBBAAAEEEECAYM83gAACCCCAAAIIIIAAAggggECABQj2AX55dB0BBBBAAAEEEEAAAQQQQAABgj3fAAIIIIAAAggggAACCCCAAAIBFiDYB/jl0XUEEEAAAQQQQAABBBBAAAEECPZ8AwgggAACCCCAAAIIIIAAAggEWIBgH+CXR9cRQAABBBBAAAEEEEAAAQQQINjzDSCAAAIIIIAAAggggAACCCAQYAGCfYBfHl1HAAEEEEAAAQQQQAABBBBAgGDPN4AAAggggAACCCCAAAIIIIBAgAUI9gF+eXQdAQQQQAABBBBAAAEEEEAAAYI93wACCCCAAAIIIIAAAggggAACARYg2Af45dF1BBBAAAEEEEAAAQQQQAABBAj2fAMIIIAAAggggAACCCCAAAIIBFiAYB/gl0fXEUAAAQQQQAABBBBAAAEEECDY8w0ggAACCCCAAAIIIIAAAgggEGABgn2AXx5dRwABBBBAAAEEEEAAAQQQQIBgzzeAAAIIIIAAAggggAACCCCAQIAFCPYBfnl0HQEEEEAAAQQQQAABBBBAAAGCPd8AAggggAACCCCAAAIIIIAAAgEWINgH+OXRdQQQQAABBBBAAAEEEEAAAQQI9nwDCCCAAAIIIIAAAggggAACCARYgGAf4JdH1xFAAAEEEEAAAQQQQAABBBAg2PMNIIAAAggggAACCCCAAAIIIBBgAYJ9gF8eXUcAAQQQQAABBBBAAAEEEECAYM83gAACCCCAAAIIIIAAAggggECABZ65YO/7XakVD0UfzPOMGONJPJGWWCorseSKeF4owK+LriOAAAIIIIAAAggggAACCCDQE9D826gcS+X4QFrNqvuzSDQhy9lbc8+/plo6tPN4Ee1mXcqFXamXCxeaN8ZIbDkjqeymhKPxedyeNhFAAAEEEEAAAQQQQAABBBC4EYGnnX/nEuz1l4rj/TeGhvrTqvFUVjIb9xm5v5FPjZsggAACCCCAAAIIIIAAAgjMWmAR8u9cgn2tlJfC3kPnFVqKSCq3KfHljBjPk1rpSMr5Hel226Ij95lbz0kilZu1Le0hgAACCCCAAAIIIIAAAgggMHeBs/k3LKnc1o3n37kE+/zOA7e2QA8dkU+urJ3BrBYP3Yi+Hjolf3Xr+bljcwMEEEAAAQQQQAABBBBAAAEEZi2wCPl3LsF+58GXxe92nNftF15yRfNOH/p3eo4eXmhJtp5/76xtaQ8BBBBAAAEEEEAAAQQQQACBuQssQv411dJBXcTEZvm04zyYWJFoMiXJlXWJxJMSCoVn2RXaQgABBBBAAAEEEEAAAQQQQGCmArq0vFWvSrV4IM1qWcT0mn86A9u2YSrFgz1jzMYsn3KcqQgn9zVGIrGExJMZiSUzshSJzrJLtIUAAggggAACCCCAAAIIIIDAVAKdVkPq1aJbet5q1ER0pPrU8ZSWou+ZSvHwdWPkuame7tzFtfKRHO89FGvtkOJ5eSnnd13xvKGHMe4aXZe/nNlwBfY4EEAAAQQQQAABBBBAAAEEEHhaApptK8f7ovXiup2WiB2+a3xo6XzxvCf5d17F462Vh6ZaPPiSGPPSLIFGLve/nBXd8k5/CGg3qm5dvoINjqVwVFbW7kgkkWJLvFm+INpCAAEEEEAAAQQQQAABBBC4VkCzbatWluLhY+m0myfna0jXenHhWNLt8lYvF6ReKVzZ3ty2e7f2/5jK8cFvG8+879onGvOEdrMu5cKum6JwOqxrM4qg1fBT2U0JR+Nu+kK71ZBmrSzNakma9fLJNVp4L5ZckWRmXaLx5TF7wekIIIAAAggggAACCCCAAAIIjC/QrFfcGvpGpSjW+q4BzbLReEqiybREEykJR7RcnZHx8u/4fbnqCiPy33Uq/ueNkQ/Otulea/rrRqNalLquP6hX3J9F4stuTz8N654XunBbHbV3v4jkt8/8IjKY0pBIrzI9fx4vizYRQAABBBBAAAEEEEAAAQTcIHOteOgGqrudJ0vIezPKb0sknnKj9eePSfLvjLh/3dTLh7/gW/mRGTU4s2YUs3S4LbVy/mTrPDHGjfLr2nsvdPFHgZndnIYQQAABBBBAAAEEEEAAAQTecgI60Kxr6cuFvZN19BriE6lVSa/dXshBZs/IJ021fPijYuWfLeIb03Dfqpcdqk7THxw64p9a3ZJwRKfxcyCAAAIIIIAAAggggAACCCAwnYBOpy/ld6RRPT5pKJpISyp7y808X9jC7lZ+zNTL++/zrffb0xHM92r3q0lhT8qF/ZPtBHRdQ3bzbaJT9DkQQAABBBBAAAEEEEAAAQQQmFRAp9wXdl939d56h84WvyXLWZ0tfnHa/aT3mcd1nvH/jGmUDl7sWvO/xEhyHjeZVZs6eq9bC5SPdk6m5uuvJqtb72Ba/qyQaQcBBBBAAAEEEEAAAQQQeIsJ+N2u5HdePakLp0E+ndtyW7DrcvBFPqxI0Rf7TaZeP7pv2/4XrMi7FrnD2jcN9/XykdtqQEfx9dCtBVY27rEd3qK/PPqHAAIIIIAAAggggAACCCyYgIb64sEjtwW7Hhrqdcv1eCq3uFPvzxr+kWmbD5lyubxubPPTRuTbF8z40u5opf2j3dfE+r7DTq/edgX1Fv3XlKD40k8EEEAAAQQQQAABBBBA4JkXsNYVyivlt90gsvE8yW2+3e3gFpjDym92Tesvm5dffjl6ezP7CevLjy/4LIMTW0Uv57elfLzvKhV6obCsbj0vkfhCryYIzLdBRxFAAAEEEEAAAQQQQACBZ12gVa9KfueB+N22GyROZW65Iu0LWyRv2Asx8k+2dwt/0y0YKB8f/LDnmZ8XkVhQXp4rbrD3+km1/HA0Lqt33imhBS9sEBRf+okAAggggAACCCCAAAIIPKsC3W5H8o9fFq2Er0c0kZLsraAVZ7cN8eUnkpn1f+6Cfb109G2+dD8jYjaC9OI67ZYcPPpq7xcWEUlm1iWzfi9Ij0BfEUAAAQQQQAABBBBAAAEEbljgeP+RVIsH7q46A3z93ouyFI7ccC+mvZ3d9yT0PfF07ndcsC+VSmtL0vqiFXlx2qZHvb5RzUs0kRVjvFEvGXqe7jF4tPOaWxMRCoUld/t5icSYkj8VKhcjgAACCCCAAAIIIIAAAs+owOkp+JpHc1tvk1gyM9XTWutLrbgricyWGLmZSvpW5Gu+RL4lnU4fntyxWjr8jIh8dKqnGfHibrshlcKbkljZlHB0ecSrhp/m+1053nso9cqxOyGZXpOV9buu8AEHAggggAACCCCAAAIIIIAAAgMBLcB+rFXwS3n3R7HljGRvPTf1LmuteknqpV2JpW9JNH5jxff+YzK95jL8SbCvlPY/ZsT7FzfxyqvHj6XdKEsknpF4emMGo/ZFKew+FN/vuBeydvddomvuORBAAAEEEEAAAQQQQAABBBAYCLSbNTl882XRAWLd2k5D/bRV8HW0vl7clVajJKFwVJZzz02dcUd5Y1b8v7ac3viVM8G+UChkIqHu6yIy158X2s2q1IrbYv2uGC8ky9l7EgpPWbPPWrf93cmo/cqaZDbuj2LBOQgggAACCCCAAAIIIIAAAm8RgcLew5PR+vhyRnJbz0/95J1WTSpHj0TEuor6sdSGW3Y+56OYSK0+Z4wpngn2+n+qpfwvitgfmlcHTv+SMbiHTsVPZu5MvQe9/vKy/+irbvs7nYa/cf/dshSOzutRaBcBBBBAAAEEEEAAAQQQQCBAAu1WQw7e+IpoLtXt7Tbufd30M72tL+WjN0SXmw+OUDguyezdqaf3X0lr5BeSqbUfG5xzZlV/vV54n9/u/qaIhOfxflr1stRL267Q3ZNDf9FYk1hydepb5ndfk0a54NpJrqxLZoMK+VOj0gACCCCAAAIIIIAAAggg8AwI6HbptdKRe5J4Kiu5zbdP/VRaMK9V79V7O33Ekjk3cj+no22seV9iZfX3hgb7SmV/0/jer4nIn5p1B/xOU8r5h71fR84dxluSZOa2LEUSU91WqxsePv5ar0L+UkTW7r6TUfupRLkYAQQQQAABBBBAAAEEEAi+QKfVkMPHr0i303Lr39fuvFMi8el2U2s3Sq4S/rCMK1Ykmbsj4Whq5nhG5Pd8z//u5eWN3aHB3lobrpYPf9aI+Undzm9WPeh2mu6Bu+36pU1qqNcq+V5o8r0D/W7HrbVv1sruZWl1/OTK2qweg3YQQAABBBBAAAEEEEAAAQQCKFAtHkrx4E0XwqOJtOQ23+aK50166NT7WnFHNOtedsxqAPtc+10j8onXHu39vfe85z2tocFe/7B8fPhnPU/+rYisT/qQp6/TInnV4rZ0mtVrmwtF4q6Y3uR721sp5XelfLTj7uW2vtu4O0V713aZExBAAAEEEEAAAQQQQAABBBZYQMP88f6TLe5SuS1Jr26e3iRurN5rxq3kX5Nut3PtdTpwvZy7J15oZqvdDzwT+t54Kvs/Tt/8zBp7/Qtr7VK1lP+cMfLBa3t55QlW/E5bauVd6TRrIzcV0pH79C0JLU1W+K5RK0lh93XR0XstoqdVCXVXv2gsKbFU1m1loFvicSCAAAIIIIAAAggggAACCDx7ArqVXaNy7P5pNqquwLou19aAr6P0Olqvo/bjH1Y6rbobqfe77ZEv193gUlpMbyk2ddF4MeY3Esu57zDGnPlV4UKw197VS0ff6ouvvwBMNDdBwVr1kjSrR+J3T2YHjPzguj4+kshJJJ4ee7S9Wa/I0c4DF+zPH27rgeWMpLKb01c/HPlpOBEBBBBAAAEEEEAAAQQQQOAmBNrNupQLu1LvF1U/f08X7Leel2h8eazu+LYrrWpBmrVjsf71I/UXs6gn0WRWoomc2/Z9wqPpiff+eDr3xQvtD2vQWuvVyof/ScR817g3tN2O1Eq7onv5DS0iMGKDOh1fp+bHUzp6P9q6e/1l5nj/jUtf4uDWWgFR97ln5H7El8FpCCCAAAIIIIAAAggggMCCC8wrD2qtuFppT7ptXU9/eoe3cUGMeEsRV1tuKRwf92Kdjf7v48u5v2SMuVCRfuiIvd6hVNr75iUT+oK1Mlap+lkG+6VIXGJjBPtaKS+FvYcOSH8MSOU2Jb6ccVPydVuDcn5Hut22m56fufWcJFK5sTG5AAEEEEAAAQQQQAABBBBAYPEErs6DeSnndyfKgzMP9ulbY+8IZ0TKYs0HTm9xd/oNXBrsC4VCJhLq/rKI/MVxqwro+gXdy69RyU80TUELC0STOYnGV0TM6MX58zsP3DoKPXRE/nxFfK2EqCP6euiU/OXsLan29zFcvM+SHiGAAAIIIIAAAggggAACCIwq0GlUpd2v7zZKHlzden7UpkUL5ulS82Zdp+J3R75ucKLOSI8kMhJLrk4yFd/2RuvNDxmTKw67+aXB3lpraqWDD1nj/Ssjsjp2z8VKp92U2vH2WOvsvaWwJNJboqP1WvRunGPnwZdP1tbffuGlC+vzdd29nqOHrq1Yzm3J/uNXxrkF5yKAAAIIIIAAAggggAACCCygQCwcPYmQo+TBreffO+ZTWGk3Km7p+Xjh3kgyc0eWosl+cffxbmtF8sb6359Ir3/eGDN0LcCVydlaG6qVj35JxH5svFs/OVurBVaPt6/cw35wtk6fT2Yn3wqAYD/pW+I6BBBAAAEEEEAAAQQQQCDYAvMP9j2fTqshteM3xR+hiJ7nLUkie1eWwrGJca3Ip5Kp1R8wxlw6VeDaIfF6/ei+3/K/KEbuTdqTbrvhftXQf192aKG8RHpz4m3utF2m4k/6hrgOAQQQQAABBBBAAAEEEAi2QKdREa2Kr8esp+Kfl9Ft7+qacTtaUG/4YTTUr+iObONV4D/bmn3NC4e+PR7P9daUX3avUV5dpZT/mBH7S1qTbpTzh53jd5pSzr/u9g88f+gDJzO3xy4gcL6dWvlIjvceuntcLJ43ebGESZ+Z6xBAAAEEEEAAAQQQQAABBG5G4KbzYLtRllppR6x/oUi9K56fzN2TcDQ5zcN3fd//K6nMxr+7rpFrR+y1gVKptBqS5qdEzIfHXvh+qgetetGN3MuZcG8knlp3xfKmPea1vcG0/eJ6BBBAAAEEEEAAAQQQQACB+Qo8jTxYK+6I5tzzRyyRk1h6Y5oH1l8Lfr1jwz+wsrJydF1DIwX7Xrjf+5aQDf0bMXL/ukYv+3vd175W3JV2o3RySji27AoJjFso77J76NSLcmHXVcc/PztAt7nTaviprE6HGH/fwEmfm+sQQAABBBBAAAEEEEAAAQTmL3DTeVAzbvnoofhuj/veoYXgNePqzPQpjlc7Vr5vZWXtf47SxsjB/tOf/nToOz/8/u/1ff9fj9LwZed0mlWpFrddFUHdX345e19CUxQSGHYf/aWmUS1KvXIsrXrFnRKJL7s97WPJFfG8iVcUTPPoXIsAAggggAACCCCAAAIIIDBngZvOg51WTSpHvSXwbjA5tSHRRHbKp7QfSaTWPmeMGTLP/2LTIwf7waWV0sE/MmJ+XH+ImLSn1ePHousRIvGMxNMbF7alm7RdrkMAAQQQQAABBBBAAAEEEEDgJgV6M9N3XMYNLUVlefW5iTOuMabtW/+fLqfX/8Y4zzB2sC+XdzeMH/pVY8yHJp0/r9XxK4U3Z1AhcJxH5VwEEEAAAQQQQAABBBBAAAEEZi/Qqye3J4n0LYnEVya9gRVrP+97sb+aSqX2x2lk7GBvrTW12sFL0jX/QcS8fZybnT63WT2SSCIz8S8Zk96X6xBAAAEEEEAAAQQQQAABBBCYpYCO2uv2d4mVrUnHv7WSvm4j99HEytqXjDEXt5O7osNjB/tBW8XizjcumaVfEzG3ZwlCWwgggAACCCCAAAIIIIAAAgi8tQTstljzF5Ira78/yXNPHOz1ZpXjvfcb431SjHlhkptzDQIIIIAAAggggAACCCCAAAJvZQEr9mshz/xofHnttyZ1mCrYW2tD9crR91grnxSx05b9m/QZuA4BBBBAAAEEEEAAAQQQQACBIArkReTjidTqZ40x3UkfYKpgP7hptXz0w2Ltz4jYtUk7wnUIIIAAAggggAACCCCAAAIIvHUE7KFnzU/GV9b+5bTPPJNgr52olg6+y4j5B1bk66btFNcjgAACCCCAAAIIIIAAAggg8MwKGPOH4pufSq7k/sssnnFmwV6n5TfKB9/sW/MpMZNXy5/FQ9EGAggggAACCCCAAAIIIIAAAospYF/rSuj7U6ns7xpj/Fn0cWbBftCZRrH4zo60/7Mx8qKIeLPoJG0ggAACCCCAAAIIIIAAAgggEHAB34r9w6WI/WgstvHKLJ9l5sFeO9colV7sSuvnROQ7RCQ8yw7TFgIIIIAAAggggAACCCCAAAIBE2gZMZ/1bPenYiuzDfXqMJdgb6015XI5Z2zzr3vG/F1G7gP2ydFdBBBAAAEEEEAAAQQQQACBWQn4YszPdPylf5xOpwvGGDurhgftzCXYn+5ktXTwnWLl5/vr7pmaP+s3SHsIIIAAAggggAACCCCAAAKLKOBbkVeM9X4iuZL7r/Ps4NyDvbXWqxUP/6R45qdF5LvnNUtgnki0jQACCCCAAAIIIIAAAggggMAYAr6x5jPW+v8wsbL2v+cxSn+6L3MP9oOb2ePjbD3U/XNi7c9akRfGAOFUBBBAAAEEEEAAAQQQQAABBAIhYEReEWP+drPjfSGbzR7fRKdvLNgPHqZWO7xjO/L3rchHjEiOEfybeM3cAwEEEEAAAQQQQAABBBBAYI4C1orNi5jPmVD87ySTye053utC0zce7LUHbnp+6eCDYrwfFLEfFjHRm3xo7oUAAggggAACCCCAAAIIIIDAbARsUwN9yDO/GE3mfmtWe9OP07enEuz74d6IHK/UavZbpeP/tBj504zej/PqOBcBBBBAAAEEEEAAAQQQQOApCmh1+9+VkPdziYT5okimOO+19Jc961ML9qc7ZK0N1ytHH7G+/VvWyLuMSJqQ/xQ/T26NAAIIIIAAAggggAACCCAwTMBakZIR+WNjup+IL2981hjTftpUCxHsBwj5fD4dj8gHrPU/aMR8mxV58WkDcX8EEEAAAQQQQAABBBBAAAEErMhXjdjfMcb7jUq9+/mNjY3KoqgsVLAfoGxvbyeysdiaH/X/hHTl4yLyARGJLAoa/UAAAQQQQAABBBBAAAEEEHhLCLRE5L9JKPTLXtN+KZZtHBpzu7ZoT76Qwf48kq0f3a+0uh/3PPPnRWRDrKREZFlEQosGSn8QQAABBBBAAAEEEEAAAQQCKdAVkYoYKYuVXbH2s4lI6FdNPPfGoj9NIIL9ANFam6gW9t7hhcPvsl37onhuqv4LYuWuGLlD0F/0z43+IYAAAggggAACCCCAAAILI9AVK4+NMY+s2FdFp9ob8zXfmK9WKq0Hm5ub1YXp6TUdCVSwP/0s1lojspeoVs1yp2MToVA4HhF5d0fkvWLte62190VMwojErbFxsRI3xiRFxAvKy6GfCCCAAAIIIIAAAggggAACEwn41tqqGKkba+pWpC5ia9aY1z1jvmzE/kFXzFe63XZ9acnUkkm3Xr72tKraT/SEpy76/3VFqgBdfQwZAAAAAElFTkSuQmCC"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loaddarkuidbackground() {
    const url = "data:image/png;base64,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"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loadlightuidbackground() {
    const url = "data:image/png;base64,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"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loaddarkavatarbackground() {
    const url = "data:image/png;base64,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"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loadlightavatarbackground() {
    const url = "data:image/png;base64,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"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loadResinIcon() {
    // Base64 img
    const url = "data:image/png;base64,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"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loadCoinIcon() {
    const url = "data:image/png;base64,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";


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

async function loadAvatarIcon() {
    const url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAAAXNSR0IArs4c6QAAFnZJREFUeF7tWmt4XWWVfr99Pffk5NamTa+hoS2UFloKw0UKFgoOap0RpQ4MKD46PqACj/qgDN4vKB0dRgFFB+SigNWCQEFRaYmFQlsopS20TZukbe63c9/3vb951k42bs8kbaFJ8Qd5enJ2sneTfO/3rrXe9a6P4d0PHwH2Lg7DCLwLxAgT3gXiXSD+Pim8y4h/YEaUbw4/Hgn9H4URbDEgLVg2v3paXaqxvq5qgawqca1Uat3Xl9/Ss/al7jWAO5GAvNNA0O8XPrRk2rwLzjrp+jlTKpcoglCbqqmqFARJsjStMFSyDjRv3fvlWx954VkAzkSB8U4BIaxa1lR1+tymc6fVV11VnVKW19TEYoIoQpJliLIEUY7Asx1mmwbvG8znn930+ieee6D58Q3DzBj3cDneQIjXnDWv4bwLliyvrU5dnE5EVoiCl5RFh6vRCORoBKIgg4kCBFGCa1vMNW3OGOMd3YOvPfz4S5ff9YetLSNAjCsYxwMIn/7LTphaf9G58y5cdPLsz06tr2kSBRZjjENggCAxpkQiXFQUepTRwknruZbts8KxTF7STH3Dpl033XDXujtDQIwbGBMCxDJAmv2Bs6Mn1lQnpTgmwXX/ddH8WVekIrxBVVVBUGJMkgUuqVEwgTFRkjiDCyaIjEjPmMA914OpGXBth7m2CdMTs0+s337t1//3id8A8ELhMS5gjAcQ9DP8XV8+v37KSY3TT180b9bpMxrqGkSRzxIY5lWkEpWC4DFBBIcgQZAjzHNdLsADB4coMnguASEzUGgwAZyDOxaB4IJzB7orbP/OXY9e/sSmHa34W54gEN5RIAQA4oqF05vOXnjC+XNnTVkQjwtzZAHT0unaGkVWUmpEEgRJgOeanHZaVCPgnMPz/E/MsU1Oq7VMhyjAooM6Il056HUVsCZVg0sSdx0HjuNClgQ0b37jx1/98W+/kQeKI4sPJ81jBuOtMkK47qKlM+pr4iurG6ZeOW/O9FPTSQW2bULwipAlQI0lORMUMIEzURLABQGuoXOPiz4LPNeB5xGFiA8iy2VyqOw1kGrphza9Go4qcieqMrsixg0AtmkhXpHCM82v/OKO32y4uadYJCAIBAqPIESOGxA+YJcvmzvjosUn3yvY9lm240qSqgqWZWLqrOmYe2ItJEnggACRSYAkEhvg2SYsQ4fnCXA9D5xTGpCY64kAE+Dt6+S1uwZZYe5klKZXQ+wrQCro9Bi02iSKjoXK6jR0w+16YeuuG/7r9y/8YWBgwHwngAhYI377mhW3NFYmby7lCwLzMwNnpVIJNVNn4PwPvgeOnoWkRgkMf/cdLQ+zmIXtusx1ad0qHA9wHM61koloLIG69S3ob0iyut0DsJIRyN15FE+ohZuQIXTn0bdkGtLpNIUJ33+o+8Gb73j8i/t7e3MhIMKJ823rrSOFRnCfLZ6SrLrpk/+yAZp+EhzX31ePe7Adh+mWg9OWL8O0WWlQqeMczLEsruczMHUdrusy7lE5UABRhaFbiERjsCyL1+7oweBps5jaMYTqJ7f7P3Pw0oUcmskSzXuQ+dg5UCvi3LEdvPbG/p9df8cvv5LLQQ+FB4UFgXFMH4cD4k0QaO8/eua8hZ+58n2PD7a2TxEFEUyS4Xkmc20/oXE1Xc3Oev8F8Mwctw0TtunALBVQzOfguh5kNUr5lVHVsG0ORVV9SsW6MjAmV0Hd082SG16HVRmDLYncTalM7smieOX5kKIRXioUrWeefeFbX3vgmZ8AsEbkdsCGCQMiDBBVCLbq7PlnfnrVxWuyBzomMcYQralGsqaSOYUBbhQK0EwPsxcvYbWTK7iWz8HSDJhaCUap5JfIUkFj0USKcyZBjcZJOwCcQR0sQm3v5+K+HhQWz2J2dRKRTXu43DXICmc0gZ3a5LMvXyhk733o6Wvv/dPWp0aAoIQZVI4JB8LXB74ynDet6SufXPmk1tc/3dcN3OMOc1j97NmwikOwbI9Xz2xitfXVsA0DWnbIDwvHcrjHbYiSzDwwrqoxJsoqGBOpegIeR/Wjm6HJIrSlcwBNR3z9Du7UptjQBacgkU6T1OY9fYOHvv2LNZdt2t62m4rJCAgBEMesJ8YKjUAkvQlEIoHUDz992X0pkV3CHRuSLPkFMFVTA0ERYVser5nRiMp0DI5lMCOf5VZJh+M6/oLlSIRR/yCIig8CVQxiCmEqDRYQ3bQXxApS19qMGhSWngBxymQIAuDYFjq7erd/5b9//ZHdnQM97xQQ4ggr1KuWn7biw+efdl9vZ08klYjyWEyFGk8gVlXBSCjFa+uRTETBHBv5gV4Uhob85okWqybijABggsQFai5EUo8MnBOrGZxCCULRABMEWIoIR5aRqKrmjm3AMg22v+3QXz5/64PXZA0j804A4SvIkRetKPWNVcu/unRR478JnhfzXJunausgxxN6z8DQvr6cbp1z5qJTmGPImd4u5Ieyfh4g9siRGDgTICsqJEWlUKFbjLseBGqwBvJQX22FNb0GpboUj1fXopDLQKTfDo7t2/eu/dLtj3xeH1aWFBrkTRy30CgHQjmxoW7KtZctu6Zxat0/iwJLZTSnZdMrbzzz5MZtz1/3ycuXf2D5ks9ZpVykMDiA/GAGlu1AjcXguQyirJCcRjyRBJNlVDXMYMXBAbjdfUg9vxfynh44qShK712A/KQkdx2LxRIJLsoymptfeujGO9Z8AUBpBIR3BAhiA+2NDECpTiYrTj952tRkPBHZtf9Qfl9b9yCFz92rb7r6nEUzr3NMXentOIRCJgfbchklPFFRfXZwj3MmCmxq0zyuqFHG8wWIO/eDdWc4WrqZvnAWzG270XfuCVxKxaHEY0ySBGxo3vzQl3762I0AtFFCY0KrRpAow6FBgAQvAoXu+c/F4/HIfT+66fMnNVRczT1PyPT3YbC712dANJFiIO0xkiQ9znnjwkUY6Opmua4eRCWRV7b0I+fYbKAhBYHyhgCoqsIj8Ti17Nj5+v61N/zggc9qfwuN41Y+36wYoRwRBoKu/dJKr5PnNk767hf/ffXsSRVnOo7DMv39vJTNw9AMJCorACYx6sOJEulJU5Cur0fn/v0wCkWmDBVQ8WIL7z97LrNVEbZtg7pTWRaRrEghmUyis7N347Xff+DK7mx2tGQ54YwgMAJGhJlB10G4+IB97OJ/Ov3Dl573s2mTqhOyLEnZ/j6UsjnQ5soRFdxjjP7aSCKBdN1kTt/rOXCQGSUN1ZtawCyXD549h3mMg3seXNuGrmmIx6I8XVXBCoVi2+oHn1y1/rX210OJ8rgKqqB8lgMSfO0zor6mou62L3/q+qULmz6qFwtSpq8PpUIRnt9xUoRIEAQRFbV1LDPQR7WEJavTXOvsZlMe2YLB954EraHSB4F5Lqgi2WTMmCavqq2kKmM1b9r2vR+ue/Z/cjlQh07J8rhJ7EBYhcEIV5IgNKSbP77yQx/58MVfi4i8upgvoL+7C7TbpmmzZDrNY8kEIrEk+ru6YBomVDWCmSfNZ7k1zyK2u4v3rjyVuRL9Og7Rc8FdmxumBde0UJFOIhaPobOnf8vD61+++tHmne1lynLCQiM8Kfd7jXA+GLkOMyL23P23/ammJjKHKK0VNeQHh5AbyqJ+9izomg69pLN0bR13HIcAYtWTJyOZrkDhJ2vBCgbvv3QBdZ6+bSvChQjPB6KUL6AiXckSqQR3PM/d9ca+Z3669q//sbNrqPd49BphIMrldpA3gndpejI6b+3939soeBaHx5hhGCjm8pxUYmXdJHTub4XtuJAkGTX19ay2YSpohlHMZuHc+QS4wNB/4Tw/jIbLkEt9KsiqywwOcVVVka6rRiQWhWtZrGV/1zN7Dhy65deb2nZ0dHSQSTPuvcaReg8C6M1KEWiLRZMq33PfPd95zNFLvhdhGiY3DR2xRAUyff0wdMMf2jAmMUEUMP3EJshqBH0HD0Bct5mzosn63jMHLvc44xyKJECWSHO4MHXqYg3EEnHEUkmIEiN1yju6+vZs2vr6bS19A8/s7N472N7ut+ZvO0TKF360/kQABm2gctqk9Ln33fu9x22jSKrZL3+iLLHutg6QLe96gCiJEAQBnufyGfPnM0WNoPfAAZgHuqC2dCI3byp3fDefQxEYZFlkIhsGw/NNXJvrmoV0bRqUbzTd5Mxx84amDe7c297+8q7276/Z2rI+FC5vyag5kkNVfqqmPEx8tTm9Qp6z9t7Vmxm3BIFRdAMD3X3I9A/4zrUSUbmsKIxChZqwaU1N/miv98ABXsxmGNNtWNzhJMcFWYAqiYioKj0OKjnEEsexuOe4KBQ0VFZXQFZkyKoC6mHJENZ0gw/2DG7Y3dbz3S2vdm98et8+YshRm7pHA0SA7N85ViNhQX8qKcyq9b+67eWE7FX5u87BhnoHUMoVaId920FRVeZ6Lo/E4mhobGQExFBPH4Z6e8inZbZtcXqSzOBYNIoILZJx5qMKzkuFgj8Vo/yTrEhAVVWmxmI8EomCexaDZ8EuZpAbKrRvbuldfcsDG34xYuAMd21H+HgrQATsKC+pflf62N1f/920mvgZrmP7uYA6z+Few+YkrxVVIe8SsWQSDbNn+xMueJy3797tawcCgXxJDg+KLNOLST4jSJBz2JbFOHe5JAr+QEiNqKC5CalPQQATPAvwHHi2hVy2kHnsud2rbl/3yp9DeeOwYBwrEEEJjd7+tWtvuejchZ/NDfT5kyqtqCM/kAWxwCgZiMQifvynqqpRWz8FNN0TmAC9VGId+1q5pEjDJ9sYrcehPoPJkghRoIIKNjwNc7gkScQeRCLkazAw5tIzNEpg3LHAXReOrvNte3qe/+4Tz1/a2prJh8gwJhjjAQQxQrnusvcuv+KyFfdIzI16Pp0FUHgUMllwl0NWFCIAUlVpqIrKPKoQTIRWLPrXVCppIMQ4DcYE7nsYksik4UVyJrJhrS9K0A0dTBIRi0dpXMAkUeAioUJQOy4cy6Kc0ffAupcuv/uP25vLqsmoYIwXENKC2Q0N37z+itXz5zYuzw31+sNc1/HQ3X4I+aEcxTQisRimNTZCVGRGE6yBnh4yqBiVTZd7kPwkKfsDYkVRGFUaAoIJNBfzG1maDsIwbVTW1XLmWrCNItM1jVuWg6iq+mxins08buZ/v37nZ771q+Y1oRnImPliPIAIfIpoU2268fylJ1/2ueuu+NRQR6sqSzK3XBemaTLJE3hlTa0fNjS7cFyOjtY2Ro4VZQLbcRBLxpmqyFCj0jAQFPzM88UXVQ5ffosipzGiHIkybpvcsWzmOdSXmJSPwAkc3WQlTc//+aU3rl392EsERDAiDNjw/1hxLEAEPUfYn1DrktFpT//y++v0oUNpkjemYcA0LEiixMmjVKNR8i9huw4Ge/p9644qpCAI1JEyVZGgqCKFhc8Qf0CoyJxyq/+PZqmccVFU4ZgGJVEYWtFngqFpEJkDgbtMM7z++59+8apfPfc6aQtq0MKDoHEBIqge5YYNlVECJfHwbV/49ZypiSWuofk77douWfko5oqkHzgXGaqmTkOWVGdJR1X9ZJSyGQKJyYrIZVFgrmVwWZZAzFAiCp2a8QfC5HVIapIG6twyDDi2zWh8QMcKHMsEd2weiTLW1qdtv+nONe/vGtIHjsb6fzuMCAMRZgUBQS91xRnzF93wiZU/qI4KM7njSLZtMFGJMI9ymW3T0QBomoG66TMgySr6O9qgRKKMGKBGRnafc7iWTlWAKdEopz7EMk24Np2wISNYgm3piMVEZlk2F+Ex17K5bbu2IKule5/YeOM9T734OOC37IGbNeb0/K0CEdYSYZkdDg9JVRFfddE5FzbUpU85Y0HTeZMqpblyLDp8HIAJZOfDMDRYOtn3NAUUyZfkkigzNaaSwIJnWeRSQSvkmSip3HE82LbHXJvTjATRWJK7nskSCQmW5fKDbf2ZbEnfWrLsPTt3tL3xcPOLT2cNkJtFYREYveMORLj5CodIEB4ERlTy5NjKCxYvvfKjl9w4e+bUOYKjC9RqS0qERBbTsgOU5EhZ+cJJlEhNDs86aG5qahozDZszUYHLBUb3FUXiqiojEk+wfFG3Dx7s3fXyzn3PvtpycFNLx8DBgUwxWzBNcrqpKw3b/mGP85hzRFhuh32KwLr7O3M3oSiJi05tWlwZES6cXBW/dNn7VlQsPH2RYJtFLskKSIXqhSHAsZhjG9zQNEbDY8+xRmLegkXKW1AYnbdSVQWSKBKSue07Wlp/+sgffrJlf8+OEfoHC6cFEwMCEAI2TBgQgdQun30QGH6+uGLZwvetXL50tanpCVWN8GRFBdKTJiFdW41UTaXfgNmGBjo+YBlFmKUcHNMDlULqWj3O4LiMCRLJadHL5Qvd+w/2rd/yeutfn3r+tR1DBZ3OSYRpHyw2CIdyRoxraIRZcTinO3rXjR+5NalIqyiJKQqdoRQweWYDqT82e8liKIroD2+MYgGlfAb5zBATuUiVgLuOy2goRMfNNE33tuzY++jG7S2PNb/S8oZm2zTbCJfEYIEBG4L3cjZMKBCjghEBEj+/5eq7vGL+EkWiM1XUXIh88vQGpigKdF3DvDNP5zT1sQyTjg9w0zAZNWDUbpMs1zTdbmvv3Lbm6Y33PbFl1/MjcR8WR4E2CM5TBYwIAxI8f9jx4NupGuGGNuxPBAavnyeiQPLuW666XbatD3GSkaLo+wdKNMIq6uqR7+vjs09ZACWq+o0SiaFhFrh01IgPDeW7tu/c9/TPf/eXR1r7BrtGYj7sWpeDQPfCQARfB+/jKqjKu/oAyHL7jsCI3vqJS25eeGLDdfmBHAzHYTObToBe1BCJJ5Ht6+EzTj7ZN/6okRoWRBYzLMvd2dL64qN/3HLnX7ftpTCgChDseDgExgIizI7y/zduEns0e6OcFUE5Vc5fOGPZTVdfeo+WLSU91xFiyQpUVKVRHBoAmQg1M2bQuTM4lg1JUrySphWfXL9p7YPrNt7fOVCkcxCBy0QLCIfE4a7Lny3PC+PSfY7l84yVNFPf/NTKyxc21l9nZjLTJEVEPBKBJItckGRUTGkYdrOLmtt+oHPruvVbf/vQhm1/GRn0BskwiO3w2crwTofPW5ZfB+72mEwot9+O5GQd6X55KX1TaaZUtfLrV6+4KSm5H58yuVpQZIkcKU7Hh2obm9BxsFPbvH3vI7/98+ZHdh7qOxSadId3Nhzv4etweJTngKMGodyYPdJiD3d/LE3hHyO4+oJFKz647JT/jIhsusi4zJnEY1NmZtvaD+390S8fW72trX8v4B8ZHG3BYUaUsyNYfHiuUX49IZ7l4UIjHB7h8xSyCsTPXXLigvPmzTw3FZdnI5rI72jt2vJU87ZXuzIFOltBwidM93DJC1+Hq0Y49gPql881jmjaTkRoBP3HWO2535nGZTlm27ZrDfcCo8X64UAoL5+j7f5RMWCs8ncsYREOsXAZLT9LEbAk6FGCP3i0XFDOgrAWOFzsHzUDJgqI8vY8fIQgACT4XpBPRgOiHIBwmRwtFN7W7o+lAY6VDWP1HmHTJgxMAESws2PlhoAp4efCC3/bu388gAjyRDApH+0sRVjWB4scTSOMVRHGjQXlvcJ4MSIcHuEKEs4b4fxQHhrlmmC03mBcWTDRQASAhI2bAJiwHA8nvXD8j5YLJgyAAIz/A0ywwehN5vs5AAAAAElFTkSuQmCC"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loadParametricTransformerIcon() {
    const url = "data:image/png;base64,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"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loadPaiMonIcon() {
    const url = "data:image/png;base64,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"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loaddarkNoneIcon() {
    const url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAARJJREFUKFOVUr1KA0EYnNmYmHgooogvIXqBs7O4WIuiiFiIjTY+g7XPYGVhK/6CD5AipUUQn0JOFPQuJsEd2TMndxbCfcUuO8vM7LffEKPy/XCaY1wXuAlo5QdmR7RXHOK+222/pYhbFoNwoUJzDGA3E8h2CX0SN1+yJ48P7SemylVzCmAHgPlLGJ0tgAsN7RGbQWsf5Lm7MKaChuehNl4HSfR7CXpJDGstnJNoD+kHrVuSG47gTU6h3pgomHwmMeKP9xSTdMdmsBqBmHXAzNx8qpwvp/4aPWeEqBQBwkv5Jy0th3tG5gxE7b+mIQws7UH5by0MTthyToWuhQGI69/B5aOhKtYobhNMoyGoI+oyH41v+kOLOjpMFUsAAAAASUVORK5CYII="

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loadlightNoneIcon() {
    const url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAS9JREFUKFOVUjFOAlEQffM/AQmrkGxiyQm8ATZUNEazxBgKY2K04QzWnMHKwpbgriY0SmEDnIAj0IkEsqCwZv8zn6xEEi2YZpL3/3szb2YESbwGQSHj8BigR+DQwgJ0ST5E87Bd9i4nCQb0nv0DpXFDsvYj8CsvhQgMvxqlSm0gVnlnl7c05gwi6g8CQBpR0lyEqi79jn8B8N5+1CmNQj6HbDYDpQSz2Sem0zni2NjnJamupddpPQrkxCKuuwfHyW4UCcMPjMfhCiP4JP1OawSIa4FicR8iskGw6sPhW0LAaCsCwPftW+q9BOeC+A4i6ZTWyBf+MU1GhL7aYqyquQilvnK4XpwxVVtpwzUZiVK+idEoVaqD9UjsAtM5HEHiU0lOg0AX1K1ojnbZ81an8Q1OD6JkVyyvbgAAAABJRU5ErkJggg=="

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loaddarkIngIcon() {
    const url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAATxJREFUKFOVUr9LQlEYPeflS4WGIKK1xiDqia+hCJ42REEkRUiQtPSWtpqdm5qjKaGlIPtpLTUJOYZIOPhHqNhipHS/uC8NX0t4h3u553K+c777HaKzLCs2zADXBFwHZOEHZkGortnGY6mUb3iI3qbt2NQAjTSArW6B7imCTxK3X6IO317zZXqVTeMEQBKA8ZfQuSsAl9JWe4zY8R2QZ/phbHQI7nYUzvw4wiETuacKMhdF1OpNaCWhcmnZ8TuSCU1I7ztIrEz6RLK5Mo6OCx4mIveM2ItVECMaeMm5CAYDPkLj/QNLSc+AJlT7IkBQ81s6cJBY/sfSzGwsZYhxCmLQazoVhTM3gXAogIfnCjLnRVTrTUDQUlS7/X+rb3CCDa3k61rQAnHzO7jeaIiJVQo3CXrREEhBKFe90fgGuaqLOuafHxoAAAAASUVORK5CYII="

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loadlightIngIcon() {
    const url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAT9JREFUKFOVkjFLA0EQhd/syakYIaBVKn+AKGiZWKSKhSgXRFKIINqktbVO4S+wsrANMaeQRlMImkutkMrSJiAR1COQ3OX2ycZTErDJNAtv95uZtzOCOO5dNzmd4DZAh0DGyAI0SF4FXb+WdQ4/Yg3wbqvLysIpycJvgpGzL4SrGZbSuUJLTOaZeZ5T6z2IqH8AgNSipNzzVVGa9eoBwEvz0OYXUtEDkvoFCiE6ahVtK4NQEua6T6pj8eqVa4HsGGVpUMOifh4r8qbW8Tq1OdQI3kizXukAsmCEteAMCoMxYIBZPNknMYDORADA98lb8u7cfUF0ARHb5idS0eOI6RW0rY0f02RAWEcTfKsq93wpinHzNzit86bSmGsyEKWqOkIpncu3hoAJM0B7DluQaFfi1SDQAK1K0EUt6zjD1fgG8y6iZIyPeQoAAAAASUVORK5CYII="

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loaddarkYesIcon() {
    const url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAStJREFUKFOVUr1KA0EYnFldg4iQQxvfwCLqBc5CsLjY2IiiiFqIjTY+g7ZWPoCVha0Yf8BKm4ApFCyCWPkEFqcEEcklcT/ZzSXk7O4rdtlZ5pud/YZIyvfDPAe5LOAqIPMdmFWhKbOF21qtUneIXaaDsDBAdQBgq9ugu4sgJnH1K+bo5bnyStdZqxMAGwDUf0JyNgDOpWX2WQxKOyDP7IXOK4wvDmN0SkPliPpjjOi+gfaXgVUSmj36Qema5IolTGyOwJvLpUQ+Hxp4L/84TERuWAwWIhBjFpg89qC0s9Wr9rfB26HzawlRJgIEH9mfNDMbbitRpyCGtJeYLiSmn2JEdx3TEDQNzW72b00NTrBmlVKuBU0Ql73B9UdDNJYoXCfooiGQqlAu+qPxBzi+izq6q7g1AAAAAElFTkSuQmCC"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loadlightYesIcon() {
    const url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAUpJREFUKFOVkr9LQlEUx7/nSir9gCgIogIhKoKGmoKswckliicRQhFELf4Nzf4NTUGtYlrgUg4FqUtQixC0CIEUYRCY8Hz27jeuvSKhxbNc+N77Oed87zkCL66y2cFAP9cAWgSWjSxAgeSp06jnItbuu6cBxYvMnPLhgGT8J8GfsylEVrOVDEfjZTGZgwM8pNabEFH/AACpRUnKrquElPKZHYAn5qHfbmCicoeh2hOU28Lr6DSqoXk4gV5z3STVvhTz6TOBrBtl8uEGI8+PHUVexmZRmVlqawTPpZRP1wAZNsLi9TGUdjuAz54gble2PAC1rgCAb923VLzMbgvcI4j4A/YHxiv3f0xPoRpa+DZNOoRvr4tvVSm7Lgkxbn4Hp3XMVOpwTTqiVEa7SIajsXIbMGEG6O/DKsTdEG81CBRAX9ppIBexrPZqfAGHpaZkGunkRwAAAABJRU5ErkJggg=="

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}