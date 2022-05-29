// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: moon;

// 图标按照这种方式引入
import paimonIconSource from "./AvatorIcon/派蒙.png";

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

const start = async () => {
  let resin = {};
  try {
    if (config[1].startsWith("os")) {
      resin = await getDataOs();
    } else {
      resin = await getData();
    }
    resin = resin || {};
  } catch (error) {
    console.error(error);
  }

  const resinIcon = await loadIcon();
  const coinIcon = await loadIcon();
  const discountIcon = await loadIcon();
  const taskIcon = await loadIcon();
  const avatorIcon = await loadIcon();
  const pTransformerIcon = await loadIcon();
  const ziyouIcon = await loadIcon();
  const shiwenIcon = await loadIcon();
  const kangzhengIcon = await loadIcon();
  const fanrongIcon = await loadIcon();
  const qinlaoIcon = await loadIcon();
  const huangjinIcon = await loadIcon();
  const fushiIcon = await loadIcon();
  const fengyaIcon = await loadIcon();
  const tianguangIcon = await loadIcon();
  const gaotaIcon = await loadIcon();
  const guyunIcon = await loadIcon();
  const yuanhaiIcon = await loadIcon();
  const lingfengIcon = await loadIcon();
  const wuhaiIcon = await loadIcon();
  const mingshenIcon = await loadIcon();
  const shiyaIcon = await loadIcon();
  const qiheiIcon = await loadIcon();
  const jinxiIcon = await loadIcon();
  const tianfuIcon = await loadIcon();
  const paimonIcon = await loadIcon();

  let widget = await createWidget();
  if (config.runsInWidget) {
    Script.setWidget(widget);
  } else {
    widget.presentMedium();
  }

  Script.complete();

  // 图标处理器，后续单独处理不同图标类型
  async function loadIcon() {
    let req = new Request(paimonIconSource);
    let icon = await req.loadImage();
    return icon;
  }

  async function createWidget() {
    let widget = new ListWidget();

    widget.backgroundColor = Color.dynamic(
      new Color("#fff5e5"),
      new Color("#181e28")
    );

    if (config.widgetFamily === "small") {
      return await renderSmall(widget);
    } else if (config.widgetFamily === "medium") {
      return await renderMedium(widget);
    } else if (config.widgetFamily === "large") {
      return await renderLarge(widget);
    } else {
      return await renderMedium(widget);
    }
  }

  /**
   * 渲染小尺寸组件
   */
  async function renderSmall(widget) {
    const ThemeConfig = Device.isPad()
      ? {
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
      : {
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
        };

    //添加标题栏
    let stackHeader = widget.addStack();
    stackHeader.centerAlignContent();
    // 添加UID
    var textItem = stackHeader.addText(` UID：${config[0]}`);
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize);
    textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
    // 添加更新时间
    stackHeader.addSpacer();
    var myDate = new Date();
    var textItem = stackHeader.addText(
      `${myDate.getHours().toString().padStart(2, "0")}:${myDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}更新`
    );
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize);
    textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
    textItem.rightAlignText();
    //widget.addSpacer(2)

    // 页面共分为 1*2 个模块，首先建立横向布局
    // 横向布局 - 第一行
    let topHorizon = widget.addStack();
    topHorizon.layoutHorizontally();
    topHorizon.centerAlignContent();
    //widget.addSpacer(1)
    // 横向布局 - 第二行
    let bottomHorizon = widget.addStack();
    bottomHorizon.layoutHorizontally();
    bottomHorizon.centerAlignContent();
    //widget.addSpacer(4)

    // 纵向布局 - 第一行右侧
    let topRightStack = topHorizon.addStack();
    topRightStack.size = new Size(105, 60);
    topRightStack.layoutVertically();
    topRightStack.bottomAlignContent();
    // 纵向布局 - 第二行右侧
    let bottomRightStack = bottomHorizon.addStack();
    bottomRightStack.layoutVertically();
    bottomRightStack.size = new Size(105, 50);
    bottomRightStack.bottomAlignContent();

    // 周本获取
    let resinDiscountStack = topRightStack.addStack();
    let ResinDiscountIconElement = resinDiscountStack.addImage(discountIcon);
    ResinDiscountIconElement.imageSize = new Size(
      ThemeConfig.iconSize,
      ThemeConfig.iconSize
    );
    ResinDiscountIconElement.cornerRadius = ThemeConfig.iconRadius;
    resinDiscountStack.addSpacer(ThemeConfig.iconSpacer);
    let ResinDiscountTextElement = resinDiscountStack.addText(`半价周本：`);
    ResinDiscountTextElement.textColor = this.widgetColor;
    ResinDiscountTextElement.textOpacity = 0.6;
    ResinDiscountTextElement.font = Font.mediumSystemFont(ThemeConfig.textSize);
    let done_resin_discount_num =
      resin.resin_discount_num_limit - resin.remain_resin_discount_num;
    let ResinDiscountTextElement2 = resinDiscountStack.addText(
      `${done_resin_discount_num} / ${resin.resin_discount_num_limit}`
    );
    if (resin.remain_resin_discount_num != 0) {
      ResinDiscountTextElement2.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
    } else {
      ResinDiscountTextElement2.textColor = Color.dynamic(
        new Color("#995c00"),
        Color.white()
      );
    }
    ResinDiscountTextElement2.textOpacity = 1;
    ResinDiscountTextElement2.font = Font.boldRoundedSystemFont(
      ThemeConfig.textSize
    );
    resinDiscountStack.centerAlignContent();

    //每日委托获取
    let taskStack = topRightStack.addStack();
    let TaskIconElement = taskStack.addImage(taskIcon);
    TaskIconElement.imageSize = new Size(
      ThemeConfig.iconSize,
      ThemeConfig.iconSize
    );
    TaskIconElement.cornerRadius = ThemeConfig.iconRadius;
    taskStack.addSpacer(ThemeConfig.iconSpacer);
    let TaskElement = taskStack.addText(`每日委托：`);
    TaskElement.textColor = this.widgetColor;
    TaskElement.textOpacity = 0.6;
    TaskElement.font = Font.mediumSystemFont(ThemeConfig.textSize);
    let TaskElement2 = taskStack.addText(
      `${resin.finished_task_num} / ${resin.total_task_num}`
    );
    if (resin.finished_task_num != resin.total_task_num) {
      TaskElement2.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
    } else {
      TaskElement2.textColor = Color.dynamic(
        new Color("#995c00"),
        Color.white()
      );
    }
    TaskElement2.textOpacity = 1;
    TaskElement2.font = Font.boldRoundedSystemFont(ThemeConfig.textSize);
    taskStack.centerAlignContent();

    // 参量质变仪
    var stackText = topRightStack.addStack();
    var transformIcon = stackText.addImage(pTransformerIcon);
    transformIcon.imageSize = new Size(
      ThemeConfig.iconSize,
      ThemeConfig.iconSize
    );
    stackText.addSpacer(ThemeConfig.iconSpacer);
    var textItem = stackText.addText("参量质变：");
    textItem.font = Font.mediumSystemFont(ThemeConfig.textSize);
    textItem.textColor = this.widgetColor;
    textItem.textOpacity = 0.6;
    const transformer_recovery_time =
      (resin.transformer && resin.transformer.recovery_time) || {};
    if (transformer_recovery_time.reached) {
      var textItem = stackText.addText(`可使用`);
      textItem.font = Font.boldRoundedSystemFont(10);
      textItem.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
    } else {
      if (transformer_recovery_time.Day != 0) {
        var textItem = stackText.addText(`${transformer_recovery_time.Day} 天`);
        textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize);
        textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
      }
      if (transformer_recovery_time.Hour != 0) {
        var textItem = stackText.addText(
          `${transformer_recovery_time.Hour} 时`
        );
        textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize);
        textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
      }
      if (transformer_recovery_time.Minute != 0) {
        var textItem = stackText.addText(
          `${transformer_recovery_time.Minute} 分`
        );
        textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize);
        textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
      }
      if (transformer_recovery_time.Second != 0) {
        var textItem = stackText.addText(
          `${transformer_recovery_time.Second} 秒`
        );
        textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize);
        textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
      }
    }

    // 派遣任务获取
    let expeditionsTitleStack = topRightStack.addStack();
    let isHasFinished = false;
    let minCoverTime = 0;
    let AvatorIconElement = expeditionsTitleStack.addImage(avatorIcon);
    AvatorIconElement.imageSize = new Size(
      ThemeConfig.iconSize,
      ThemeConfig.iconSize
    );
    AvatorIconElement.cornerRadius = ThemeConfig.iconRadius;
    expeditionsTitleStack.addSpacer(ThemeConfig.iconSpacer);
    let expeditionsTitleElement = expeditionsTitleStack.addText(`探索派遣：`);
    expeditionsTitleElement.textColor = this.widgetColor;
    expeditionsTitleElement.textOpacity = 0.6;
    expeditionsTitleElement.font = Font.mediumSystemFont(ThemeConfig.textSize);
    let expeditionsStack = bottomRightStack.addStack();
    bottomRightStack.addSpacer(6);
    let expeditionsStack2 = bottomRightStack.addStack();
    bottomRightStack.addSpacer(4);
    let expeditionsStack3 = bottomRightStack.addStack();
    const expeditions = resin.expeditions || [];
    minCoverTime = expeditions[0] ? +expeditions[0].remained_time : 0;
    for (let i = -1; i++ < resin.max_expedition_num; ) {
      let expeditionStack = expeditionsStack.addStack();
      expeditionStack.layoutHorizontally();
      let isOngoing = !!expeditions[i];
      if (isOngoing) {
        let { status, avatar_side_icon, remained_time } = expeditions[i];
        if (+remained_time < minCoverTime) minCoverTime = +remained_time;
        let req = new Request(avatar_side_icon);
        let icon = await req.loadImage();
        let avatarImgElement = expeditionStack.addImage(icon);
        avatarImgElement.imageSize = new Size(
          ThemeConfig.avatarSize,
          ThemeConfig.avatarSize
        );
        avatarImgElement.cornerRadius = 0;
        expeditionStack.bottomAlignContent();
        if (expeditions[i].status == "Finished") {
          isHasFinished = true;
        }
      }
    }

    if (isHasFinished) {
      let expeditionsTitleElement2 = expeditionsTitleStack.addText(
        `${resin.current_expedition_num} / ${resin.max_expedition_num}`
      );
      expeditionsTitleElement2.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
      expeditionsTitleElement2.textOpacity = 1;
      expeditionsTitleElement2.font = Font.boldRoundedSystemFont(
        ThemeConfig.textSize
      );
      let minCoverTimeElemnet = expeditionsStack2.addText(
        ` -  最快剩余 ${await getTime(minCoverTime)} `
      );
      minCoverTimeElemnet.textColor = this.widgetColor;
      minCoverTimeElemnet.textOpacity = 0.5;
      minCoverTimeElemnet.font = Font.mediumRoundedSystemFont(
        ThemeConfig.tipSize
      );
      // minCoverTimeElemnet.rightAlignText()
      let minCoverTimeElemnet2 = expeditionsStack3.addText(` -  已有角色完成 `);
      minCoverTimeElemnet2.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
      minCoverTimeElemnet2.textOpacity = 1;
      minCoverTimeElemnet2.font = Font.mediumRoundedSystemFont(
        ThemeConfig.tipSize
      );
      // minCoverTimeElemnet2.rightAlignText()
    } else {
      let expeditionsTitleElement2 = expeditionsTitleStack.addText(
        `${resin.current_expedition_num} / ${resin.max_expedition_num}`
      );
      expeditionsTitleElement2.textColor = Color.dynamic(
        new Color("#995c00"),
        Color.white()
      );
      expeditionsTitleElement2.textOpacity = 1;
      expeditionsTitleElement2.font = Font.boldRoundedSystemFont(
        ThemeConfig.textSize
      );
      let minCoverTimeElemnet = expeditionsStack2.addText(
        ` -  最快剩余 ${await getTime(minCoverTime)} `
      );
      minCoverTimeElemnet.textColor = this.widgetColor;
      minCoverTimeElemnet.textOpacity = 0.5;
      minCoverTimeElemnet.font = Font.mediumRoundedSystemFont(
        ThemeConfig.tipSize
      );
      // minCoverTimeElemnet.rightAlignText()
      let minCoverTimeElemnet2 = expeditionsStack3.addText(
        ` - ${await getClock(minCoverTime)} `
      );
      minCoverTimeElemnet2.textColor = Color.dynamic(
        Color.black(),
        Color.white()
      );
      minCoverTimeElemnet2.textOpacity = 0.5;
      minCoverTimeElemnet2.font = Font.mediumRoundedSystemFont(
        ThemeConfig.tipSize
      );
      // minCoverTimeElemnet2.rightAlignText()
    }

    return widget;
  }

  /**
   * 渲染中尺寸组件
   */
  async function renderMedium(widget) {
    const ThemeConfig = Device.isPad()
      ? {
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
      : {
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
        };
    // Add background gradient
    // let gradient = new LinearGradient()
    // gradient.locations = [0, 1]
    // gradient.colors = [
    //         Color.dynamic(new Color("#fff5e5"), new Color("2a5398")),
    //         Color.dynamic(new Color("#ffebcc"), new Color("141414"))
    // ]
    // widget.backgroundGradient = gradient

    //添加标题栏
    let stackHeader = widget.addStack();
    stackHeader.centerAlignContent();
    // 添加UID
    var textItem = stackHeader.addText(` UID：${config[0]}`);
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize);
    textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
    // 添加更新时间
    stackHeader.addSpacer();
    var myDate = new Date();
    var textItem = stackHeader.addText(
      `${myDate.getHours().toString().padStart(2, "0")}:${myDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}更新      `
    );
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize);
    textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
    //textItem.rightAlignText()
    widget.addSpacer(3);

    // 横向布局 - 第一行
    let finalHorizon = widget.addStack();
    finalHorizon.layoutVertically();
    finalHorizon.size = new Size(300, 120);
    finalHorizon.centerAlignContent();

    // 今日素材标题
    let TodayMaterialTitle = finalHorizon.addStack();
    finalHorizon.addSpacer();
    // 添加派蒙图片
    let paimon = finalHorizon.addStack();
    paimon.addSpacer();
    let PaimonElement = paimon.addImage(paimonIcon);
    PaimonElement.imageSize = new Size(50, 50);
    //finalHorizon.addSpacer()
    // 今日素材
    let AvatorMaterial = finalHorizon.addStack();
    finalHorizon.addSpacer(4);
    let WeaponMaterial = finalHorizon.addStack();
    TodayMaterialTitle.centerAlignContent();
    AvatorMaterial.centerAlignContent();
    WeaponMaterial.centerAlignContent();
    let TianFuTitle = TodayMaterialTitle.addImage(tianfuIcon);
    TianFuTitle.imageSize = new Size(
      ThemeConfig.iconSize,
      ThemeConfig.iconSize
    );
    TianFuTitle.cornerRadius = ThemeConfig.iconRadius;
    TodayMaterialTitle.addSpacer(ThemeConfig.iconSpacer);
    let MaterialTitle = TodayMaterialTitle.addText(`今日素材：`);
    MaterialTitle.textColor = Color.dynamic(Color.black(), Color.white());
    MaterialTitle.textOpacity = 0.6;
    MaterialTitle.font = Font.mediumSystemFont(ThemeConfig.textSize);
    let currentDay = new Date();
    if (currentDay.getHours() < 4) {
      currentDay.setDate(currentDay.getDate() - 1);
    }
    let [avatarMaterials, weaponsMaterials] = await getWeeklyMaterialData();
    let avatorheader = AvatorMaterial.addText(`角色天赋： `);
    avatorheader.textColor = Color.dynamic(new Color("#995c00"), Color.white());
    avatorheader.font = Font.mediumSystemFont(12);
    if (currentDay.getDay() === 0) {
      let all = AvatorMaterial.addText("任君挑选，享受周日吧~");
      all.font = Font.mediumSystemFont(12);
      all.textOpacity = 0.5;
    } else {
      let day = currentDay.getDay();
      let added = false;
      for (let [key, value] of avatarMaterials.entries()) {
        if (value.day.indexOf(day) !== -1) {
          if (added) {
            let delimiter = AvatorMaterial.addText(" / ");
            delimiter.font = Font.mediumSystemFont(12);
            delimiter.textOpacity = 0.5;
          }

          // let m = AvatorMaterial.addText(`${key}`)
          // m.font = Font.mediumSystemFont(12)
          // m = AvatorMaterial.addText(`(${value.loc})`)
          // m.font = Font.mediumSystemFont(10)
          // m.textColor = Color.gray();
          // added = true;
          let icon = AvatorMaterial.addImage(value.icon);
          icon.imageSize = new Size(25, 25);
          let loc = AvatorMaterial.addText(` (${value.loc})`);
          loc.textOpacity = 0.5;
          loc.font = Font.mediumSystemFont(12);
          loc.textColor = Color.dynamic(Color.black(), Color.white());
          added = true;
        }
      }
    }
    let weaponheader = WeaponMaterial.addText(`武器突破： `);
    weaponheader.textColor = Color.dynamic(new Color("#995c00"), Color.white());
    weaponheader.font = Font.mediumSystemFont(12);
    if (currentDay.getDay() === 0) {
      let all = WeaponMaterial.addText("任君挑选，享受周日吧~");
      all.font = Font.mediumSystemFont(12);
      all.textOpacity = 0.5;
    } else {
      let day = currentDay.getDay();
      let added = false;
      for (let [key, value] of weaponsMaterials.entries()) {
        if (value.day.indexOf(day) !== -1) {
          if (added) {
            let delimiter = WeaponMaterial.addText(" / ");
            delimiter.font = Font.mediumSystemFont(12);
            delimiter.textOpacity = 0.5;
          }

          // let m = WeaponMaterial.addText(`${key}`)
          // m.font = Font.mediumSystemFont(12)
          // m = WeaponMaterial.addText(`(${value.loc})`)
          // m.font = Font.mediumSystemFont(10)
          // m.textColor = Color.gray();
          // added = true;
          let icon = WeaponMaterial.addImage(value.icon);
          icon.imageSize = new Size(25, 25);
          let loc = WeaponMaterial.addText(` (${value.loc})`);
          loc.textOpacity = 0.5;
          loc.font = Font.mediumSystemFont(12);
          loc.textColor = Color.dynamic(Color.black(), Color.white());
          added = true;
        }
      }
    }

    return widget;
  }

  /**
   * 渲染大尺寸组件
   */
  async function renderLarge(widget) {
    const ThemeConfig = Device.isPad()
      ? {
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
      : {
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
        };
    // Add background gradient
    // let gradient = new LinearGradient()
    // gradient.locations = [0, 1]
    // gradient.colors = [
    //         Color.dynamic(new Color("#fff5e5"), new Color("2a5398")),
    //         Color.dynamic(new Color("#ffebcc"), new Color("141414"))
    // ]
    // widget.backgroundGradient = gradient

    //添加标题栏
    let stackHeader = widget.addStack();
    stackHeader.centerAlignContent();
    // 添加UID
    var textItem = stackHeader.addText(` UID：${config[0]}`);
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize);
    textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
    // 添加更新时间
    stackHeader.addSpacer();
    var myDate = new Date();
    var textItem = stackHeader.addText(
      `${myDate.getHours().toString().padStart(2, "0")}:${myDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}更新      `
    );
    textItem.font = Font.boldRoundedSystemFont(ThemeConfig.titleSize);
    textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
    //textItem.rightAlignText()

    // 页面共分为 3*2 个模块，首先建立横向布局
    // 横向布局 - 第一行
    let topHorizon = widget.addStack();
    topHorizon.layoutHorizontally();
    topHorizon.centerAlignContent();
    widget.addSpacer(4);
    // 横向布局 - 第二行
    let bottomHorizon = widget.addStack();
    bottomHorizon.layoutHorizontally();
    bottomHorizon.centerAlignContent();
    // 横向布局 - 第三行
    widget.addSpacer();
    let finalHorizon = widget.addStack();
    finalHorizon.layoutVertically();
    finalHorizon.size = new Size(300, 170);
    finalHorizon.centerAlignContent();

    // 纵向布局 - 第一行左侧
    let topLeftStack = topHorizon.addStack();
    topLeftStack.layoutVertically();
    topLeftStack.size = new Size(140, 60);
    topLeftStack.centerAlignContent();
    // 左侧与右侧间的间距
    topHorizon.addSpacer();
    // 纵向布局 - 第一行右侧
    let topRightStack = topHorizon.addStack();
    topRightStack.size = new Size(105, 60);
    topRightStack.layoutVertically();
    topRightStack.centerAlignContent();

    // 纵向布局 - 第二行左侧
    let bottomLeftStack = bottomHorizon.addStack();
    bottomLeftStack.layoutVertically();
    bottomLeftStack.size = new Size(140, 60);
    bottomLeftStack.centerAlignContent();
    // 左侧与右侧间的间距
    bottomHorizon.addSpacer();
    // 纵向布局 - 第二行右侧
    let bottomRightStack = bottomHorizon.addStack();
    bottomRightStack.layoutVertically();
    bottomRightStack.size = new Size(105, 60);
    bottomRightStack.centerAlignContent();

    // 树脂获取
    let resinStack = topLeftStack.addStack();
    let resinStack2 = topLeftStack.addStack();
    let resinTipStack = topLeftStack.addStack();
    let ResinIconElement = resinStack.addImage(resinIcon);
    ResinIconElement.imageSize = new Size(
      ThemeConfig.iconSize,
      ThemeConfig.iconSize
    );
    ResinIconElement.cornerRadius = ThemeConfig.iconRadius;
    resinStack.addSpacer(ThemeConfig.iconSpacer);
    let ResinElement = resinStack.addText(`当前树脂：`);
    ResinElement.textColor = Color.dynamic(Color.black(), Color.white());
    ResinElement.textOpacity = 0.6;
    ResinElement.font = Font.mediumSystemFont(ThemeConfig.textSize);
    let ResinElement2 = resinStack2.addText(`${resin.current_resin}`);
    let ResinElement3 = resinStack2.addText(` / ${resin.max_resin}`);
    resinStack2.centerAlignContent();
    if (resin.current_resin >= resin.max_resin * 0.9) {
      ResinElement2.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
      ResinElement3.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
    } else {
      ResinElement2.textColor = Color.dynamic(
        new Color("#995c00"),
        Color.white()
      );
      ResinElement3.textColor = Color.dynamic(
        new Color("#995c00"),
        Color.white()
      );
    }
    ResinElement2.textOpacity = 1;
    ResinElement2.font = Font.boldRoundedSystemFont(ThemeConfig.infoSize);
    ResinElement3.textOpacity = 1;
    ResinElement3.font = Font.boldRoundedSystemFont(ThemeConfig.info2Size);
    let ResinTipElement = resinTipStack.addText(
      `- ${await getTime(resin.resin_recovery_time)} (${await getClock(
        resin.resin_recovery_time
      )} )`
    );
    ResinTipElement.textColor = Color.dynamic(Color.black(), Color.white());
    //ResinTipElement.minimumScaleFactor = 0.8
    ResinTipElement.textOpacity = 0.5;
    ResinTipElement.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize);
    resinStack.centerAlignContent();

    // 宝钱获取
    let coinStack = bottomLeftStack.addStack();
    let coinStack2 = bottomLeftStack.addStack();
    let coinTipStack = bottomLeftStack.addStack();
    let CoinIconElement = coinStack.addImage(coinIcon);
    CoinIconElement.imageSize = new Size(
      ThemeConfig.coinSize,
      ThemeConfig.coinSize
    );
    CoinIconElement.cornerRadius = ThemeConfig.coinRadius;
    coinStack.addSpacer(5);
    let CoinElement = coinStack.addText(`洞天宝钱：`);
    CoinElement.textColor = Color.dynamic(Color.black(), Color.white());
    CoinElement.textOpacity = 0.6;
    CoinElement.font = Font.mediumSystemFont(ThemeConfig.textSize);
    let CoinElement2 = coinStack2.addText(`${resin.current_home_coin}`);
    let CoinElement3 = coinStack2.addText(` / ${resin.max_home_coin}`);
    coinStack2.centerAlignContent();
    if (resin.current_home_coin >= resin.max_home_coin * 0.9) {
      CoinElement2.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
      CoinElement3.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
    } else {
      CoinElement2.textColor = Color.dynamic(
        new Color("#995c00"),
        Color.white()
      );
      CoinElement3.textColor = Color.dynamic(
        new Color("#995c00"),
        Color.white()
      );
    }
    CoinElement2.textOpacity = 1;
    CoinElement2.font = Font.boldRoundedSystemFont(ThemeConfig.infoSize);
    CoinElement3.textOpacity = 1;
    CoinElement3.font = Font.boldRoundedSystemFont(ThemeConfig.info2Size);
    //coinStack.addSpacer(8)
    let CoinTipElement = coinTipStack.addText(
      `- ${await getTime(resin.home_coin_recovery_time)} (${await getClock(
        resin.home_coin_recovery_time
      )} )`
    );
    CoinTipElement.textColor = Color.dynamic(Color.black(), Color.white());
    CoinTipElement.textOpacity = 0.5;
    CoinTipElement.font = Font.mediumRoundedSystemFont(ThemeConfig.tipSize);
    coinStack.centerAlignContent();

    // 周本获取
    let resinDiscountStack = topRightStack.addStack();
    let ResinDiscountIconElement = resinDiscountStack.addImage(discountIcon);
    ResinDiscountIconElement.imageSize = new Size(
      ThemeConfig.iconSize,
      ThemeConfig.iconSize
    );
    ResinDiscountIconElement.cornerRadius = ThemeConfig.iconRadius;
    resinDiscountStack.addSpacer(ThemeConfig.iconSpacer);
    let ResinDiscountTextElement = resinDiscountStack.addText(`半价周本：`);
    ResinDiscountTextElement.textColor = Color.dynamic(
      Color.black(),
      Color.white()
    );
    ResinDiscountTextElement.textOpacity = 0.6;
    ResinDiscountTextElement.font = Font.mediumSystemFont(ThemeConfig.textSize);
    let done_resin_discount_num =
      resin.resin_discount_num_limit - resin.remain_resin_discount_num;
    let ResinDiscountTextElement2 = resinDiscountStack.addText(
      `${done_resin_discount_num} / ${resin.resin_discount_num_limit}`
    );
    if (resin.remain_resin_discount_num != 0) {
      ResinDiscountTextElement2.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
    } else {
      ResinDiscountTextElement2.textColor = Color.dynamic(
        new Color("#995c00"),
        Color.white()
      );
    }
    ResinDiscountTextElement2.textOpacity = 1;
    ResinDiscountTextElement2.font = Font.boldRoundedSystemFont(
      ThemeConfig.textSize
    );
    resinDiscountStack.centerAlignContent();

    //每日委托获取
    let taskStack = topRightStack.addStack();
    let TaskIconElement = taskStack.addImage(taskIcon);
    TaskIconElement.imageSize = new Size(
      ThemeConfig.iconSize,
      ThemeConfig.iconSize
    );
    TaskIconElement.cornerRadius = ThemeConfig.iconRadius;
    taskStack.addSpacer(ThemeConfig.iconSpacer);
    let TaskElement = taskStack.addText(`每日委托：`);
    TaskElement.textColor = Color.dynamic(Color.black(), Color.white());
    TaskElement.textOpacity = 0.6;
    TaskElement.font = Font.mediumSystemFont(ThemeConfig.textSize);
    let TaskElement2 = taskStack.addText(
      `${resin.finished_task_num} / ${resin.total_task_num}`
    );
    if (resin.finished_task_num != resin.total_task_num) {
      TaskElement2.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
    } else {
      TaskElement2.textColor = Color.dynamic(
        new Color("#995c00"),
        Color.white()
      );
    }
    TaskElement2.textOpacity = 1;
    TaskElement2.font = Font.boldRoundedSystemFont(ThemeConfig.textSize);
    taskStack.centerAlignContent();

    // 参量质变仪
    var stackText = topRightStack.addStack();
    var transformIcon = stackText.addImage(pTransformerIcon);
    transformIcon.imageSize = new Size(
      ThemeConfig.iconSize,
      ThemeConfig.iconSize
    );
    stackText.addSpacer(ThemeConfig.iconSpacer);
    var textItem = stackText.addText("参量质变：");
    textItem.font = Font.mediumSystemFont(ThemeConfig.textSize);
    textItem.textColor = Color.dynamic(Color.black(), Color.white());
    textItem.textOpacity = 0.6;
    const transformer_recovery_time =
      (resin.transformer && resin.transformer.recovery_time) || {};
    if (transformer_recovery_time.reached) {
      var textItem = stackText.addText(`可使用`);
      textItem.font = Font.boldRoundedSystemFont(10);
      textItem.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
    } else {
      if (transformer_recovery_time.Day != 0) {
        var textItem = stackText.addText(`${transformer_recovery_time.Day} 天`);
        textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize);
        textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
      }
      if (transformer_recovery_time.Hour != 0) {
        var textItem = stackText.addText(
          `${transformer_recovery_time.Hour} 时`
        );
        textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize);
        textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
      }
      if (transformer_recovery_time.Minute != 0) {
        var textItem = stackText.addText(
          `${transformer_recovery_time.Minute} 分`
        );
        textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize);
        textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
      }
      if (transformer_recovery_time.Second != 0) {
        var textItem = stackText.addText(
          `${transformer_recovery_time.Second} 秒`
        );
        textItem.font = Font.boldRoundedSystemFont(ThemeConfig.textSize);
        textItem.textColor = Color.dynamic(new Color("#995c00"), Color.white());
      }
    }

    // 派遣任务获取
    let expeditionsTitleStack = topRightStack.addStack();
    let isHasFinished = false;
    let minCoverTime = 0;
    let AvatorIconElement = expeditionsTitleStack.addImage(avatorIcon);
    AvatorIconElement.imageSize = new Size(
      ThemeConfig.iconSize,
      ThemeConfig.iconSize
    );
    AvatorIconElement.cornerRadius = ThemeConfig.iconRadius;
    expeditionsTitleStack.addSpacer(ThemeConfig.iconSpacer);
    let expeditionsTitleElement = expeditionsTitleStack.addText(`探索派遣：`);
    expeditionsTitleElement.textColor = Color.dynamic(
      Color.black(),
      Color.white()
    );
    expeditionsTitleElement.textOpacity = 0.6;
    expeditionsTitleElement.font = Font.mediumSystemFont(ThemeConfig.textSize);
    let expeditionsStack = bottomRightStack.addStack();
    bottomRightStack.addSpacer(6);
    let expeditionsStack2 = bottomRightStack.addStack();
    bottomRightStack.addSpacer(4);
    let expeditionsStack3 = bottomRightStack.addStack();
    const expeditions = resin.expeditions || [];
    minCoverTime = expeditions[0] ? +expeditions[0].remained_time : 0;
    for (let i = -1; i++ < resin.max_expedition_num; ) {
      let expeditionStack = expeditionsStack.addStack();
      expeditionStack.layoutHorizontally();
      let isOngoing = !!expeditions[i];
      if (isOngoing) {
        let { status, avatar_side_icon, remained_time } = expeditions[i];
        if (+remained_time < minCoverTime) minCoverTime = +remained_time;
        let req = new Request(avatar_side_icon);
        let icon = await req.loadImage();
        let avatarImgElement = expeditionStack.addImage(icon);
        avatarImgElement.imageSize = new Size(
          ThemeConfig.avatarSize,
          ThemeConfig.avatarSize
        );
        avatarImgElement.cornerRadius = 0;
        expeditionStack.bottomAlignContent();
        if (expeditions[i].status == "Finished") {
          isHasFinished = true;
        }
      }
    }

    if (isHasFinished) {
      let expeditionsTitleElement2 = expeditionsTitleStack.addText(
        `${resin.current_expedition_num} / ${resin.max_expedition_num}`
      );
      expeditionsTitleElement2.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
      expeditionsTitleElement2.textOpacity = 1;
      expeditionsTitleElement2.font = Font.boldRoundedSystemFont(
        ThemeConfig.textSize
      );
      let minCoverTimeElemnet = expeditionsStack2.addText(
        ` -  最快剩余 ${await getTime(minCoverTime)} `
      );
      minCoverTimeElemnet.textColor = Color.dynamic(
        Color.black(),
        Color.white()
      );
      minCoverTimeElemnet.textOpacity = 0.5;
      minCoverTimeElemnet.font = Font.mediumRoundedSystemFont(
        ThemeConfig.tipSize
      );
      let minCoverTimeElemnet2 = expeditionsStack3.addText(` -  已有角色完成 `);
      minCoverTimeElemnet2.textColor = Color.dynamic(
        new Color("#FC766A"),
        new Color("#FC766A")
      );
      minCoverTimeElemnet2.textOpacity = 1;
      minCoverTimeElemnet2.font = Font.mediumRoundedSystemFont(
        ThemeConfig.tipSize
      );
    } else {
      let expeditionsTitleElement2 = expeditionsTitleStack.addText(
        `${resin.current_expedition_num} / ${resin.max_expedition_num}`
      );
      expeditionsTitleElement2.textColor = Color.dynamic(
        new Color("#995c00"),
        Color.white()
      );
      expeditionsTitleElement2.textOpacity = 1;
      expeditionsTitleElement2.font = Font.boldRoundedSystemFont(
        ThemeConfig.textSize
      );
      let minCoverTimeElemnet = expeditionsStack2.addText(
        ` -  最快剩余 ${await getTime(minCoverTime)} `
      );
      minCoverTimeElemnet.textColor = Color.dynamic(
        Color.black(),
        Color.white()
      );
      minCoverTimeElemnet.textOpacity = 0.5;
      minCoverTimeElemnet.font = Font.mediumRoundedSystemFont(
        ThemeConfig.tipSize
      );
      let minCoverTimeElemnet2 = expeditionsStack3.addText(
        ` - ${await getClock(minCoverTime)} `
      );
      minCoverTimeElemnet2.textColor = Color.dynamic(
        Color.black(),
        Color.white()
      );
      minCoverTimeElemnet2.textOpacity = 0.5;
      minCoverTimeElemnet2.font = Font.mediumRoundedSystemFont(
        ThemeConfig.tipSize
      );
    }

    // 今日素材标题
    let TodayMaterialTitle = finalHorizon.addStack();
    finalHorizon.addSpacer();
    // 添加派蒙图片
    let paimon = finalHorizon.addStack();
    paimon.addSpacer();
    let PaimonElement = paimon.addImage(paimonIcon);
    PaimonElement.imageSize = new Size(100, 100);
    //finalHorizon.addSpacer()
    // 今日素材
    let AvatorMaterial = finalHorizon.addStack();
    finalHorizon.addSpacer(4);
    let WeaponMaterial = finalHorizon.addStack();
    TodayMaterialTitle.centerAlignContent();
    AvatorMaterial.centerAlignContent();
    WeaponMaterial.centerAlignContent();
    let TianFuTitle = TodayMaterialTitle.addImage(tianfuIcon);
    TianFuTitle.imageSize = new Size(
      ThemeConfig.iconSize,
      ThemeConfig.iconSize
    );
    TianFuTitle.cornerRadius = ThemeConfig.iconRadius;
    TodayMaterialTitle.addSpacer(ThemeConfig.iconSpacer);
    let MaterialTitle = TodayMaterialTitle.addText(`今日素材：`);
    MaterialTitle.textColor = Color.dynamic(Color.black(), Color.white());
    MaterialTitle.textOpacity = 0.6;
    MaterialTitle.font = Font.mediumSystemFont(ThemeConfig.textSize);
    let currentDay = new Date();
    if (currentDay.getHours() < 4) {
      currentDay.setDate(currentDay.getDate() - 1);
    }
    let [avatarMaterials, weaponsMaterials] = await getWeeklyMaterialData();
    let avatorheader = AvatorMaterial.addText(`角色天赋： `);
    avatorheader.textColor = Color.dynamic(new Color("#995c00"), Color.white());
    avatorheader.font = Font.mediumSystemFont(12);
    if (currentDay.getDay() === 0) {
      let all = AvatorMaterial.addText("任君挑选，享受周日吧~");
      all.font = Font.mediumSystemFont(12);
      all.textOpacity = 0.5;
    } else {
      let day = currentDay.getDay();
      let added = false;
      for (let [key, value] of avatarMaterials.entries()) {
        if (value.day.indexOf(day) !== -1) {
          if (added) {
            let delimiter = AvatorMaterial.addText(" / ");
            delimiter.font = Font.mediumSystemFont(12);
            delimiter.textOpacity = 0.5;
          }

          // let m = AvatorMaterial.addText(`${key}`)
          // m.font = Font.mediumSystemFont(12)
          // m = AvatorMaterial.addText(`(${value.loc})`)
          // m.font = Font.mediumSystemFont(10)
          // m.textColor = Color.gray();
          // added = true;
          let icon = AvatorMaterial.addImage(value.icon);
          icon.imageSize = new Size(25, 25);
          let loc = AvatorMaterial.addText(` (${value.loc})`);
          loc.textOpacity = 0.5;
          loc.font = Font.mediumSystemFont(12);
          loc.textColor = Color.dynamic(Color.black(), Color.white());
          added = true;
        }
      }
    }
    let weaponheader = WeaponMaterial.addText(`武器突破： `);
    weaponheader.textColor = Color.dynamic(new Color("#995c00"), Color.white());
    weaponheader.font = Font.mediumSystemFont(12);
    if (currentDay.getDay() === 0) {
      let all = WeaponMaterial.addText("任君挑选，享受周日吧~");
      all.font = Font.mediumSystemFont(12);
      all.textOpacity = 0.5;
    } else {
      let day = currentDay.getDay();
      let added = false;
      for (let [key, value] of weaponsMaterials.entries()) {
        if (value.day.indexOf(day) !== -1) {
          if (added) {
            let delimiter = WeaponMaterial.addText(" / ");
            delimiter.font = Font.mediumSystemFont(12);
            delimiter.textOpacity = 0.5;
          }

          // let m = WeaponMaterial.addText(`${key}`)
          // m.font = Font.mediumSystemFont(12)
          // m = WeaponMaterial.addText(`(${value.loc})`)
          // m.font = Font.mediumSystemFont(10)
          // m.textColor = Color.gray();
          // added = true;
          let icon = WeaponMaterial.addImage(value.icon);
          icon.imageSize = new Size(25, 25);
          let loc = WeaponMaterial.addText(` (${value.loc})`);
          loc.textOpacity = 0.5;
          loc.font = Font.mediumSystemFont(12);
          loc.textColor = Color.dynamic(Color.black(), Color.white());
          added = true;
        }
      }
    }

    return widget;
  }

  /**
   * 返回原神便笺信息
   *
   * @return {Promise<ResinResponse>} 便笺数据
   */
  async function getData() {
    let randomStr = randomIntFromInterval(100000, 200000);
    let timestamp = Math.floor(Date.now() / 1000);
    let sign = md5(
      "salt=xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs&t=" +
        timestamp +
        "&r=" +
        randomStr +
        "&b=&q=role_id=" +
        config[0] +
        "&server=" +
        config[1]
    );
    let req = new Request(
      "https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/dailyNote?server=" +
        config[1] +
        "&role_id=" +
        config[0]
    );
    req.method = "get";
    req.headers = {
      DS: timestamp + "," + randomStr + "," + sign,
      "x-rpc-app_version": "2.19.1",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/2.11.1",
      "x-rpc-client_type": "5",
      Referer: "https://webstatic.mihoyo.com/",
      Cookie: config[2],
    };

    let resp = await req.loadJSON();
    let data = resp.data;

    return data;
  }

  /**
   * 返回原神便笺信息(国际服)
   *
   * @return {Promise<ResinResponse>} 便笺数据
   */
  async function getDataOs() {
    let randomStr = randomStrGen(6);
    let timestamp = Math.floor(Date.now() / 1000);
    let sign = md5(
      "salt=6s25p5ox5y14umn1p61aqyyvbvvl3lrt&t=" + timestamp + "&r=" + randomStr
    );

    let req = new Request(
      "https://bbs-api-os.hoyolab.com/game_record/genshin/api/dailyNote?server=" +
        config[1] +
        "&role_id=" +
        config[0]
    );
    req.method = "GET";
    req.headers = {
      DS: timestamp + "," + randomStr + "," + sign,
      "x-rpc-client_type": "5",
      "x-rpc-app_version": "2.9.1",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBSOversea/2.9.1",
      Origin: "https://act.hoyolab.com",
      Referer: "https://act.hoyolab.com/",
      Cookie: config[2],
    };

    let resp = await req.loadJSON();
    let data = resp.data;

    return data;
  }

  function randomStrGen(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async function getTime(time) {
    let hh = ~~(time / 3600);
    let mm = ~~((time % 3600) / 60);

    return hh + ":" + mm;
  }

  async function getClock(time) {
    let timeNow = Date.now();
    let now = new Date(timeNow);
    let hoursNow = now.getHours();
    let minutesNow = now.getMinutes() * 60 * 1000;
    let secondsNow = now.getSeconds() * 1000;
    let timeRecovery = new Date(timeNow + time * 1000);

    let tillTommorow = (24 - hoursNow) * 3600 * 1000;
    let tommorow = timeNow + tillTommorow - minutesNow - secondsNow;

    let str = "";
    if (timeRecovery < tommorow) {
      str = "本日";
    } else if (timeRecovery - tommorow > 86400000) {
      str = `周${"日一二三四五六".charAt(timeRecovery.getDay())}`;
    } else {
      str = "次日";
    }

    return (
      " " +
      str +
      ", " +
      timeRecovery.getHours() +
      "点" +
      timeRecovery.getMinutes() +
      "分"
    );
  }

  // 获取每日素材信息
  async function getWeeklyMaterialData() {
    const RegionAbbr = { MD: "蒙德", LY: "璃月", DQ: "稻妻" };
    const AvatarMaterial = new Map([
      ["自由", { day: [1, 4], loc: "MD", icon: ziyouIcon }],
      ["繁荣", { day: [1, 4], loc: "LY", icon: fanrongIcon }],
      ["浮世", { day: [1, 4], loc: "DQ", icon: fushiIcon }],
      ["抗争", { day: [2, 5], loc: "MD", icon: kangzhengIcon }],
      ["勤劳", { day: [2, 5], loc: "LY", icon: qinlaoIcon }],
      ["风雅", { day: [2, 5], loc: "DQ", icon: fengyaIcon }],
      ["诗文", { day: [3, 6], loc: "MD", icon: shiwenIcon }],
      ["黄金", { day: [3, 6], loc: "LY", icon: huangjinIcon }],
      ["天光", { day: [3, 6], loc: "DQ", icon: tianguangIcon }],
    ]); // Start from 1: monday

    const WeaponsMaterial = new Map([
      ["高塔孤王", { day: [1, 4], loc: "MD", icon: gaotaIcon }],
      ["孤云寒林", { day: [1, 4], loc: "LY", icon: guyunIcon }],
      ["远海夷地", { day: [1, 4], loc: "DQ", icon: yuanhaiIcon }],
      ["凛风奔狼", { day: [2, 5], loc: "MD", icon: lingfengIcon }],
      ["雾海云间", { day: [2, 5], loc: "LY", icon: wuhaiIcon }],
      ["鸣神御灵", { day: [2, 5], loc: "DQ", icon: mingshenIcon }],
      ["狮牙斗士", { day: [3, 6], loc: "MD", icon: shiyaIcon }],
      ["漆黑陨铁", { day: [3, 6], loc: "LY", icon: qiheiIcon }],
      ["今昔剧画", { day: [3, 6], loc: "DQ", icon: jinxiIcon }],
    ]);

    for (let [key, value] of AvatarMaterial.entries()) {
      value.loc = RegionAbbr[value.loc];
    }

    for (let [key, value] of WeaponsMaterial.entries()) {
      value.loc = RegionAbbr[value.loc];
    }

    return [AvatarMaterial, WeaponsMaterial];
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function md5(string) {
    function md5_RotateLeft(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function md5_AddUnsigned(lX, lY) {
      var lX4, lY4, lX8, lY8, lResult;
      lX8 = lX & 0x80000000;
      lY8 = lY & 0x80000000;
      lX4 = lX & 0x40000000;
      lY4 = lY & 0x40000000;
      lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
      if (lX4 & lY4) {
        return lResult ^ 0x80000000 ^ lX8 ^ lY8;
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
        } else {
          return lResult ^ 0x40000000 ^ lX8 ^ lY8;
        }
      } else {
        return lResult ^ lX8 ^ lY8;
      }
    }
    function md5_F(x, y, z) {
      return (x & y) | (~x & z);
    }
    function md5_G(x, y, z) {
      return (x & z) | (y & ~z);
    }
    function md5_H(x, y, z) {
      return x ^ y ^ z;
    }
    function md5_I(x, y, z) {
      return y ^ (x | ~z);
    }
    function md5_FF(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(
        a,
        md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac)
      );
      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    function md5_GG(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(
        a,
        md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac)
      );
      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    function md5_HH(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(
        a,
        md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac)
      );
      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    function md5_II(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(
        a,
        md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac)
      );
      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    function md5_ConvertToWordArray(string) {
      var lWordCount;
      var lMessageLength = string.length;
      var lNumberOfWords_temp1 = lMessageLength + 8;
      var lNumberOfWords_temp2 =
        (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
      var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
      var lWordArray = Array(lNumberOfWords - 1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] =
          lWordArray[lWordCount] |
          (string.charCodeAt(lByteCount) << lBytePosition);
        lByteCount++;
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
    }
    function md5_WordToHex(lValue) {
      var WordToHexValue = "",
        WordToHexValue_temp = "",
        lByte,
        lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        WordToHexValue_temp = "0" + lByte.toString(16);
        WordToHexValue =
          WordToHexValue +
          WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
      }
      return WordToHexValue;
    }
    function md5_Utf8Encode(string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }
      return utftext;
    }
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22;
    var S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20;
    var S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23;
    var S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xefcdab89;
    c = 0x98badcfe;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
      a = md5_FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
      d = md5_FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
      c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070db);
      b = md5_FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
      a = md5_FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
      d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
      c = md5_FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
      b = md5_FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
      a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
      d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
      c = md5_FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
      b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
      a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
      d = md5_FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
      c = md5_FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
      b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
      a = md5_GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
      d = md5_GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
      c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
      b = md5_GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
      a = md5_GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
      d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = md5_GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
      b = md5_GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
      a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
      d = md5_GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
      c = md5_GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
      b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
      a = md5_GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
      d = md5_GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
      c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
      b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
      a = md5_HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
      d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
      c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
      b = md5_HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
      a = md5_HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
      d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
      c = md5_HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
      b = md5_HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
      a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
      d = md5_HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
      c = md5_HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
      b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
      a = md5_HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
      d = md5_HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
      c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
      b = md5_HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
      a = md5_II(a, b, c, d, x[k + 0], S41, 0xf4292244);
      d = md5_II(d, a, b, c, x[k + 7], S42, 0x432aff97);
      c = md5_II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
      b = md5_II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
      a = md5_II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
      d = md5_II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
      c = md5_II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
      b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
      a = md5_II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
      d = md5_II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
      c = md5_II(c, d, a, b, x[k + 6], S43, 0xa3014314);
      b = md5_II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
      a = md5_II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
      d = md5_II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
      c = md5_II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
      b = md5_II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
      a = md5_AddUnsigned(a, AA);
      b = md5_AddUnsigned(b, BB);
      c = md5_AddUnsigned(c, CC);
      d = md5_AddUnsigned(d, DD);
    }
    return (
      md5_WordToHex(a) +
      md5_WordToHex(b) +
      md5_WordToHex(c) +
      md5_WordToHex(d)
    ).toLowerCase();
  }
};

start();
