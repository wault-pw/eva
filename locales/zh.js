export default {
  ui: {
    loading: "加载",
    login: "退出",
    tag: "代码",
    or: "或者",
    failed: "失败",
    yes: "是",
    no: "否",
    edit: "更改",
    toClone: "复制",
    copied: "已复制",
    copy: "副本",
    delete: "删除",
    archive: "存档",
    restore: "恢复",
    save: "保存",
    cancel: "关闭",
    all: "所有的",
    notes: "笔记",
    create: "创建",
    turnOn: "开启",
    turnOff: "关闭",
  },

  menu: {
    join: "创建账户",
    login: "退出",
    demo: "试玩",
    features: "可能性",
    privacy: "隐私性",
    terms: "使用条款",
    issues: "问题",
    status: "状态",
    passphrase: "密码",
    export: "出口",
    import: "进口",
    logout: "退出",
    preferences: "设置",
  },

  hello: {
    h2: "免费匿名的密码经理与e2e加密开放代码。"
  },

  join: {
    h1: "账户",
    title: "注册",
    step1: "SRP密钥生成",
    step2: "主密钥生成",
    step3: "RSA密钥生成",
  },

  joinForm: {
    step0: "输入帐户数据",
    step1: "确定密码",
    step2: "了解服务规",
    check0: `我明白<i>Wault</i>无法恢复丢失的密码`,
    check1: `我已经阅读并同意<a target="blank" href="{url}">服务规则</a>`,
  },

  login: {
    h1: "登录",
    title: "登录",
    auth0: "SRP#0",
    auth1: "SRP#1"
  },

  spa: {
    title: "Wault脱机副本"
  },

  space: {
    titleTemplate: "%s ✲ 工作空间",
  },

  spaceLeft: {
    workspaces: "工作空间",
  },

  spaceForm: {
    title: "名称",
    label: "标签",
    value: "意义",
  },

  export: {
    h1: "线下副本",
    p1: "下载您的Wault帐户在线副本。在没有互联网连接时非常方便。",
    p2: "线下副本 - 这只是一个HTML文件，它既包含所有WAULT Web应用程序，也包含您所有的加密数据。",
    p3: "复本和WAULT云服务一样安全，因为它使用相同的代码和加密架构。",
    button: "下载",
  },

  termination: {
    h1: "删除账户",
    p1: "在删除帐户之前，请确保您下载了最新版本的离线副本。",
    check: "我所有的数据都将被永久删除。我明白此操作不能取消。",
    button: "永久删除"
  },

  mfa: {
    h1: "两步认证",
    p1: "启用更安全的帐户保护 - 即使他们知道密码，入侵者也无法访问它。如果启用此功能，则要使用两个组件登录：密码和一次性代码。",
    p2: "在进行身份验证的第二步时，我们建议使用Authy或Google Authenticator应用程序。",
  },

  mfaEnable: {
    p1Html: `扫描应用程序中的QR代码进行多因素身份验证或手动添加秘密：<span data-cy="secret" class="text-break text-white">{secret}</span>`,
    p2: "在安全的地方保守秘密，如果您的手机丢失，则帐户将无法访问。",
    check: "我知道如果我丢失了第二个因素，我就会失去访问账户的机会",
  },

  workspaceList: {
    h1: "工作空间",
    p1: "创建您的第一个工作空间来管理密码、凭据和笔记"
  },

  dialog: {
    deleteCard: "删除？",
    archiveCard: "存档？",
    deleteWorkspaceHtml: "输入名字以删除工作空间",
    renameWorkspace: "工作空间重命名",
    createWorkspace: "创建工作空间",
    areYouSure: "您确定？",
    disableMfa: "断开MFA？"
  },

  panelPassphrase: {
    h1: "更改密码",
    p1: " 时常更改密码，这是保证安全的基础。",
    check: "我知道Wault无法恢复丢失的密码。"
  },

  /**
   * domain
   */
  card: {
    tags: "标签",
    archived: "档案"
  },

  workspace: {
    title: "名称"
  },

  user: {
    oldUsername: "旧账号",
    newUsername: "新账号",
    newPassword: "新密码",
    username: "账号",
    password: "密码",
    confirmPassword: "确定密码",
    otpPasscode: "次性密码",
    otpDigits: "6个数字",
  }
}

