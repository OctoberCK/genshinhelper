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

const resinIcon = await loadResinIcon()
const coinIcon = await loadCoinIcon()
const discountIcon = await loadDiscountIcon()
const taskIcon = await loadTaskIcon()
const avatorIcon = await loadAvatorIcon()
const transformerIcon = await loadTransformerIcon()

let widget = await createWidget()
if (config.runsInWidget) {
    Script.setWidget(widget)
} else {
    widget.presentMedium()
}

Script.complete()


async function createWidget() {
    let widget = new ListWidget();

    widget.backgroundColor = Color.dynamic(
        new Color('#fff5e5'),
        new Color('#181e28')
    );

    if (config.widgetFamily === 'small') {
        return await renderSmall(widget);
    } else if (config.widgetFamily === 'medium') {
        return await renderMedium(widget);
    } else {
        return await renderMedium(widget);
    }
}

/**
 * 渲染小尺寸组件
 */
async function renderSmall(widget) {
    const ThemeConfig = Device.isPad() ? {
        titleSize: 7,
        coinSize: 10,
        iconSize: 12,
        iconRadius: 6,
        coinRadius: 5,
        iconSpacer: 4,
        textSize: 11,
        infoSize: 25,
        info2Size: 16,
        tipSize: 9,
        avatarSize: 20,
        topSpacer: 30,
        bottomSpacer: 15,
    } : {
        titleSize: 7,
        coinSize: 10,
        iconSize: 12,
        iconRadius: 6,
        coinRadius: 5,
        iconSpacer: 4,
        textSize: 11,
        infoSize: 25,
        info2Size: 16,
        tipSize: 9,
        avatarSize: 20,
        topSpacer: 30,
        bottomSpacer: 15,
    }

    //添加标题栏
    let stackHeader = widget.addStack()
    stackHeader.centerAlignContent()
    // 添加UID
    var textItem = stackHeader.addText(` UID：${config[0]}`)
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize)
    textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white())
    // 添加更新时间
    stackHeader.addSpacer()
    var myDate = new Date();
    var textItem = stackHeader.addText(`${myDate.getHours().toString().padStart(2, '0')}:${myDate.getMinutes().toString().padStart(2, '0')}更新`)
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize)
    textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white())
    textItem.rightAlignText()

    // 页面共分为 1*2 个模块，首先建立横向布局
    // 横向布局 - 第一行
    let topHorizon = widget.addStack()
    topHorizon.layoutHorizontally()
    topHorizon.centerAlignContent()
    widget.addSpacer(1)
    // 横向布局 - 第二行
    let bottomHorizon = widget.addStack()
    bottomHorizon.layoutHorizontally()
    bottomHorizon.centerAlignContent()

    // 纵向布局 - 第一行左侧
    let topLeftStack = topHorizon.addStack()
    topLeftStack.layoutVertically()
    topLeftStack.size = new Size(120, 60)
    topLeftStack.centerAlignContent()
    // 纵向布局 - 第二行右侧
    let bottomLeftStack = bottomHorizon.addStack()
    bottomLeftStack.layoutVertically()
    bottomLeftStack.size = new Size(120, 60)
    bottomLeftStack.centerAlignContent()

    // 树脂获取
    let resinStack = topLeftStack.addStack()
    let resinStack2 = topLeftStack.addStack()
    let resinTipStack = topLeftStack.addStack()
    let ResinIconElement = resinStack.addImage(resinIcon)
    ResinIconElement.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
    ResinIconElement.cornerRadius = ThemeConfig.iconRadius
    resinStack.addSpacer(ThemeConfig.iconSpacer)
    let ResinElement = resinStack.addText(`当前树脂：`)
    ResinElement.textColor = Color.dynamic(Color.black(), Color.white())
    ResinElement.textOpacity = 0.6
    ResinElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
    let ResinElement2 = resinStack2.addText(`${resin.current_resin}`)
    let ResinElement3 = resinStack2.addText(` / ${resin.max_resin}`)
    resinStack2.centerAlignContent()
    if (resin.current_resin >= resin.max_resin * 0.9) {
        ResinElement2.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
        ResinElement3.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
    } else {
        ResinElement2.textColor = Color.dynamic(new Color("#995c00"), Color.white())
        ResinElement3.textColor = Color.dynamic(new Color("#995c00"), Color.white())
    }
    ResinElement2.textOpacity = 1
    ResinElement2.font = Font.boldRoundedSystemFont(ThemeConfig.infoSize)
    ResinElement3.textOpacity = 1
    ResinElement3.font = Font.boldRoundedSystemFont(ThemeConfig.info2Size)
    let ResinTipElement = resinTipStack.addText(`- ${await getTime(resin.resin_recovery_time)} (${await getClock(resin.resin_recovery_time)} )`)
    ResinTipElement.textColor = Color.dynamic(Color.black(), Color.white())
    ResinTipElement.textOpacity = 0.5
    ResinTipElement.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
    resinStack.centerAlignContent()

    // 宝钱获取
    let coinStack = bottomLeftStack.addStack()
    let coinStack2 = bottomLeftStack.addStack()
    let coinTipStack = bottomLeftStack.addStack()
    let CoinIconElement = coinStack.addImage(coinIcon)
    CoinIconElement.imageSize = new Size(ThemeConfig.coinSize, ThemeConfig.coinSize)
    CoinIconElement.cornerRadius = ThemeConfig.coinRadius
    coinStack.addSpacer(5)
    let CoinElement = coinStack.addText(`洞天宝钱：`)
    CoinElement.textColor = Color.dynamic(Color.black(), Color.white())
    CoinElement.textOpacity = 0.6
    CoinElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
    let CoinElement2 = coinStack2.addText(`${resin.current_home_coin}`)
    let CoinElement3 = coinStack2.addText(` / ${resin.max_home_coin}`)
    coinStack2.centerAlignContent()
    if (resin.current_home_coin >= resin.max_home_coin * 0.9) {
        CoinElement2.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
        CoinElement3.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
    } else {
        CoinElement2.textColor = Color.dynamic(new Color("#995c00"), Color.white())
        CoinElement3.textColor = Color.dynamic(new Color("#995c00"), Color.white())
    }
    CoinElement2.textOpacity = 1
    CoinElement2.font = Font.boldRoundedSystemFont(ThemeConfig.infoSize)
    CoinElement3.textOpacity = 1
    CoinElement3.font = Font.boldRoundedSystemFont(ThemeConfig.info2Size)
    let CoinTipElement = coinTipStack.addText(`- ${await getTime(resin.home_coin_recovery_time)} (${await getClock(resin.home_coin_recovery_time)} )`)
    CoinTipElement.textColor = Color.dynamic(Color.black(), Color.white())
    CoinTipElement.textOpacity = 0.5
    CoinTipElement.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
    coinStack.centerAlignContent()

    return widget
}

/**
 * 渲染中尺寸组件
 */
async function renderMedium(widget) {
    const ThemeConfig = Device.isPad() ? {
        titleSize: 7,
        coinSize: 10,
        iconSize: 12,
        iconRadius: 6,
        coinRadius: 5,
        iconSpacer: 4,
        textSize: 11,
        infoSize: 25,
        info2Size: 16,
        tipSize: 10,
        avatarSize: 20,
        topSpacer: 30,
        bottomSpacer: 15,
    } : {
        titleSize: 7,
        coinSize: 10,
        iconSize: 12,
        iconRadius: 6,
        coinRadius: 5,
        iconSpacer: 4,
        textSize: 11,
        infoSize: 25,
        info2Size: 16,
        tipSize: 10,
        avatarSize: 20,
        topSpacer: 30,
        bottomSpacer: 15,
    }

    //添加标题栏
    let stackHeader = widget.addStack()
    stackHeader.centerAlignContent()
    // 添加UID
    var textItem = stackHeader.addText(` UID：${config[0]}`)
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize)
    textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white())
    // 添加更新时间
    stackHeader.addSpacer()
    var myDate = new Date();
    var textItem = stackHeader.addText(`${myDate.getHours().toString().padStart(2, '0')}:${myDate.getMinutes().toString().padStart(2, '0')}更新      `)
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize)
    textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white())

    // 页面共分为 2*2 个模块，首先建立横向布局
    // 横向布局 - 第一行
    let topHorizon = widget.addStack()
    topHorizon.layoutHorizontally()
    topHorizon.centerAlignContent()
    widget.addSpacer(4)
    // 横向布局 - 第二行
    let bottomHorizon = widget.addStack()
    bottomHorizon.layoutHorizontally()
    bottomHorizon.centerAlignContent()

    // 纵向布局 - 第一行左侧
    let topLeftStack = topHorizon.addStack()
    topLeftStack.layoutVertically()
    topLeftStack.size = new Size(140, 60)
    topLeftStack.centerAlignContent()
    // 左侧与右侧间的间距
    topHorizon.addSpacer()
    // 纵向布局 - 第一行右侧
    let topRightStack = topHorizon.addStack()
    topRightStack.size = new Size(105, 60)
    topRightStack.layoutVertically()
    topRightStack.centerAlignContent()

    // 纵向布局 - 第二行左侧
    let bottomLeftStack = bottomHorizon.addStack()
    bottomLeftStack.layoutVertically()
    bottomLeftStack.size = new Size(140, 60)
    bottomLeftStack.centerAlignContent()
    // 左侧与右侧间的间距
    bottomHorizon.addSpacer()
    // 纵向布局 - 第二行右侧
    let bottomRightStack = bottomHorizon.addStack()
    bottomRightStack.layoutVertically()
    bottomRightStack.size = new Size(105, 60)
    bottomRightStack.centerAlignContent()

    // 树脂获取
    let resinStack = topLeftStack.addStack()
    let resinStack2 = topLeftStack.addStack()
    let resinTipStack = topLeftStack.addStack()
    let ResinIconElement = resinStack.addImage(resinIcon)
    ResinIconElement.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
    ResinIconElement.cornerRadius = ThemeConfig.iconRadius
    resinStack.addSpacer(ThemeConfig.iconSpacer)
    let ResinElement = resinStack.addText(`当前树脂：`)
    ResinElement.textColor = Color.dynamic(Color.black(), Color.white())
    ResinElement.textOpacity = 0.6
    ResinElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
    let ResinElement2 = resinStack2.addText(`${resin.current_resin}`)
    let ResinElement3 = resinStack2.addText(` / ${resin.max_resin}`)
    resinStack2.centerAlignContent()
    if (resin.current_resin >= resin.max_resin * 0.9) {
        ResinElement2.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
        ResinElement3.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
    } else {
        ResinElement2.textColor = Color.dynamic(new Color("#995c00"), Color.white())
        ResinElement3.textColor = Color.dynamic(new Color("#995c00"), Color.white())
    }
    ResinElement2.textOpacity = 1
    ResinElement2.font = Font.boldRoundedSystemFont(ThemeConfig.infoSize)
    ResinElement3.textOpacity = 1
    ResinElement3.font = Font.boldRoundedSystemFont(ThemeConfig.info2Size)
    let ResinTipElement = resinTipStack.addText(`- ${await getTime(resin.resin_recovery_time)} (${await getClock(resin.resin_recovery_time)} )`)
    ResinTipElement.textColor = Color.dynamic(Color.black(), Color.white())
    ResinTipElement.textOpacity = 0.5
    ResinTipElement.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
    resinStack.centerAlignContent()

    // 宝钱获取
    let coinStack = bottomLeftStack.addStack()
    let coinStack2 = bottomLeftStack.addStack()
    let coinTipStack = bottomLeftStack.addStack()
    let CoinIconElement = coinStack.addImage(coinIcon)
    CoinIconElement.imageSize = new Size(ThemeConfig.coinSize, ThemeConfig.coinSize)
    CoinIconElement.cornerRadius = ThemeConfig.coinRadius
    coinStack.addSpacer(5)
    let CoinElement = coinStack.addText(`洞天宝钱：`)
    CoinElement.textColor = Color.dynamic(Color.black(), Color.white())
    CoinElement.textOpacity = 0.6
    CoinElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
    let CoinElement2 = coinStack2.addText(`${resin.current_home_coin}`)
    let CoinElement3 = coinStack2.addText(` / ${resin.max_home_coin}`)
    coinStack2.centerAlignContent()
    if (resin.current_home_coin >= resin.max_home_coin * 0.9) {
        CoinElement2.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
        CoinElement3.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
    } else {
        CoinElement2.textColor = Color.dynamic(new Color("#995c00"), Color.white())
        CoinElement3.textColor = Color.dynamic(new Color("#995c00"), Color.white())
    }
    CoinElement2.textOpacity = 1
    CoinElement2.font = Font.boldRoundedSystemFont(ThemeConfig.infoSize)
    CoinElement3.textOpacity = 1
    CoinElement3.font = Font.boldRoundedSystemFont(ThemeConfig.info2Size)
    let CoinTipElement = coinTipStack.addText(`- ${await getTime(resin.home_coin_recovery_time)} (${await getClock(resin.home_coin_recovery_time)} )`)
    CoinTipElement.textColor = Color.dynamic(Color.black(), Color.white())
    CoinTipElement.textOpacity = 0.5
    CoinTipElement.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
    coinStack.centerAlignContent()

    // 周本获取
    let resinDiscountStack = topRightStack.addStack()
    let ResinDiscountIconElement = resinDiscountStack.addImage(discountIcon)
    ResinDiscountIconElement.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
    ResinDiscountIconElement.cornerRadius = ThemeConfig.iconRadius
    resinDiscountStack.addSpacer(ThemeConfig.iconSpacer)
    let ResinDiscountTextElement = resinDiscountStack.addText(`半价周本：`)
    ResinDiscountTextElement.textColor = Color.dynamic(Color.black(), Color.white())
    ResinDiscountTextElement.textOpacity = 0.6
    ResinDiscountTextElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
    let done_resin_discount_num = resin.resin_discount_num_limit - resin.remain_resin_discount_num
    let ResinDiscountTextElement2 = resinDiscountStack.addText(`${done_resin_discount_num} / ${resin.resin_discount_num_limit}`)
    if (resin.remain_resin_discount_num != 0) {
        ResinDiscountTextElement2.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
    } else {
        ResinDiscountTextElement2.textColor = Color.dynamic(new Color("#995c00"), Color.white())
    }
    ResinDiscountTextElement2.textOpacity = 1
    ResinDiscountTextElement2.font = Font.boldRoundedSystemFont(ThemeConfig.textSize)
    resinDiscountStack.centerAlignContent()

    //每日委托获取
    let taskStack = topRightStack.addStack()
    let TaskIconElement = taskStack.addImage(taskIcon)
    TaskIconElement.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
    TaskIconElement.cornerRadius = ThemeConfig.iconRadius
    taskStack.addSpacer(ThemeConfig.iconSpacer)
    let TaskElement = taskStack.addText(`每日委托：`)
    TaskElement.textColor = Color.dynamic(Color.black(), Color.white())
    TaskElement.textOpacity = 0.6
    TaskElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
    let TaskElement2 = taskStack.addText(`${resin.finished_task_num} / ${resin.total_task_num}`)
    if (resin.finished_task_num != resin.total_task_num) {
        TaskElement2.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
    } else {
        TaskElement2.textColor = Color.dynamic(new Color("#995c00"), Color.white())
    }
    TaskElement2.textOpacity = 1
    TaskElement2.font = Font.boldRoundedSystemFont(ThemeConfig.textSize)
    taskStack.centerAlignContent()

    // 参量质变仪
    var stackText = topRightStack.addStack()
    var transformIcon = stackText.addImage(transformerIcon)
    transformIcon.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
    stackText.addSpacer(ThemeConfig.iconSpacer)
    var textItem = stackText.addText("参量质变：")
    textItem.font = Font.mediumSystemFont(ThemeConfig.textSize)
    textItem.textColor = Color.dynamic(Color.black(), Color.white())
    textItem.textOpacity = 0.6
    const transformer_recovery_time = resin.transformer && resin.transformer.recovery_time || {}
    if (transformer_recovery_time.reached) {
        var textItem = stackText.addText(`可使用`)
        textItem.font = Font.boldRoundedSystemFont(10)
        textItem.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
    } else {
        if (transformer_recovery_time.Day != 0) {
            var textItem = stackText.addText(`${transformer_recovery_time.Day} 天`)
            textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize)
            textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white())
        }
        if (transformer_recovery_time.Hour != 0) {
            var textItem = stackText.addText(`${transformer_recovery_time.Hour} 时`)
            textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize)
            textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white())
        }
        if (transformer_recovery_time.Minute != 0) {
            var textItem = stackText.addText(`${transformer_recovery_time.Minute} 分`)
            textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize)
            textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white())
        }
        if (transformer_recovery_time.Second != 0) {
            var textItem = stackText.addText(`${transformer_recovery_time.Second} 秒`)
            textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize)
            textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white())
        }
    }

    // 派遣任务获取
    let expeditionsTitleStack = topRightStack.addStack()
    let isHasFinished = false
    let minCoverTime = 0
    let AvatorIconElement = expeditionsTitleStack.addImage(avatorIcon)
    AvatorIconElement.imageSize = new Size(ThemeConfig.iconSize, ThemeConfig.iconSize)
    AvatorIconElement.cornerRadius = ThemeConfig.iconRadius
    expeditionsTitleStack.addSpacer(ThemeConfig.iconSpacer)
    let expeditionsTitleElement = expeditionsTitleStack.addText(`探索派遣：`)
    expeditionsTitleElement.textColor = Color.dynamic(Color.black(), Color.white())
    expeditionsTitleElement.textOpacity = 0.6
    expeditionsTitleElement.font = Font.mediumSystemFont(ThemeConfig.textSize)
    let expeditionsStack = bottomRightStack.addStack()
    bottomRightStack.addSpacer(6)
    let expeditionsStack2 = bottomRightStack.addStack()
    bottomRightStack.addSpacer(4)
    let expeditionsStack3 = bottomRightStack.addStack()
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
            expeditionStack.bottomAlignContent()
            if (status === 'Finished') {
                isHasFinished = true
            }
        }
    }

    if (isHasFinished) {
        let expeditionsTitleElement2 = expeditionsTitleStack.addText(`${resin.current_expedition_num} / ${resin.max_expedition_num}`)
        expeditionsTitleElement2.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
        expeditionsTitleElement2.textOpacity = 1
        expeditionsTitleElement2.font = Font.boldRoundedSystemFont(ThemeConfig.textSize)
        let minCoverTimeElemnet = expeditionsStack2.addText(` -  最快剩余 ${await getTime(minCoverTime)} `)
        minCoverTimeElemnet.textColor = Color.dynamic(Color.black(), Color.white())
        minCoverTimeElemnet.textOpacity = 0.5
        minCoverTimeElemnet.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
        let minCoverTimeElemnet2 = expeditionsStack3.addText(` -  已有角色完成 `)
        minCoverTimeElemnet2.textColor = Color.dynamic(new Color("#FC766A"), new Color("#FC766A"))
        minCoverTimeElemnet2.textOpacity = 1
        minCoverTimeElemnet2.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)

    } else {
        let expeditionsTitleElement2 = expeditionsTitleStack.addText(`${resin.current_expedition_num} / ${resin.max_expedition_num}`)
        expeditionsTitleElement2.textColor = Color.dynamic(new Color("#995c00"), Color.white())
        expeditionsTitleElement2.textOpacity = 1
        expeditionsTitleElement2.font = Font.boldRoundedSystemFont(ThemeConfig.textSize)
        let minCoverTimeElemnet = expeditionsStack2.addText(` -  最快剩余 ${await getTime(minCoverTime)} `)
        minCoverTimeElemnet.textColor = Color.dynamic(Color.black(), Color.white())
        minCoverTimeElemnet.textOpacity = 0.5
        minCoverTimeElemnet.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
        let minCoverTimeElemnet2 = expeditionsStack3.addText(` - ${await getClock(minCoverTime)} `)
        minCoverTimeElemnet2.textColor = Color.dynamic(Color.black(), Color.white())
        minCoverTimeElemnet2.textOpacity = 0.5
        minCoverTimeElemnet2.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize)
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
        str = "本日"
    } else if (timeRecovery - tommorow > 86400000) {
        str = `周${'日一二三四五六'.charAt(timeRecovery.getDay())}`
    } else {
        str = "次日"
    }

    return " " + str + ", " + timeRecovery.getHours() + "点" + timeRecovery.getMinutes() + "分"
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
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

async function loadResinIcon() {
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

async function loadAvatorIcon() {
    const url = "data:image/png;base64,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"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}

async function loadTransformerIcon() {
    const url = "data:image/png;base64,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"

    let req = new Request(url)
    let icon = await req.loadImage()
    return icon
}
