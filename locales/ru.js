export default {
  ui: {
    username: "Логин",
    passphrase: "Пароль",
    login: "Войти",
    tag: "Tag",
    register: "Register",
    or: "Или",
    failed: "Неудача",
    yes: "Yes",
    no: "No",
    edit: "Edit",
    clone: "Clone",
    delete: "Delete",
    archive: "Archive",
    restore: "Restore",
    save: "Save",
    cancel: "Cancel",
    all: "All",
  },

  menu: {
    join: "Создать.Аккаунт",
    login: "Вход",
    demo: "Демо",
    about: "Что это?",
    privacy: "Приватность",
    terms: "Условия пользования",
    issues: "Проблемы",
    status: "Статус",
    passphrase: "Пароль",
    export: "Экспорт",
    import: "Импорт",
    logout: "Выйти",
    preferences: "Настройки",
  },

  hello: {
    h2: "Бесплатный, анонимный менеджер паролей с e2e шифрованием и открытым кодом_"
  },

  join: {
    h1: "Аккаунт",
    title: "Регистрация в Wault",
    step1: "Generating SRP keys",
    step2: "Generating master key",
    step3: "GENERATING PUBLIC KEY PAIR",
    step4: "Transfer",
  },

  joinForm: {
    step0: "Введите учетные данные",
    step1: "Подтвердите пароль",
    step2: "Ознакомьтесь с парвилами сервиса",
    check0: `Я понимаю, что <i>Wault</i> не может восстановить утраченный пароль`,
    check1: `Я прочитал и согласен с <a target="_blank" href="{url}">правилами спервиса</a>.`,
  },

  login: {
    h1: "Вход",
    title: "Войти в облако Wault",
    auth0: "SRP#0",
    auth1: "SRP#1"
  },

  spa: {
    title: "Sign in to OKA backup"
  },

  space: {
    titleTemplate: "%s · workspace",
  },

  spaceLeft: {
    workspaces: "Workspaces",
  },

  export: {
    h2: "Export",
    h3: "Offline copy",
    p1: "Download a read-only portable version of OKA. Very convenient when no Internet connection is available.",
    p2: "An offline copy is just a single HTML file that contains both the whole OKA web application and your encrypted data, except file attachments.",
    p3: "It is as secure as the hosted OKA service since they both share the same code and security architecture.",
    button: "Download offline copy",
  },

  termination: {
    h2: "Delete Account",
    p1: "Please make sure you have downloaded the latest backup before deleting your account.",
    check: "All my data will be permanently deleted. I understand that this action cannot be undone or canceled.",
    button: "Terminate"
  },

  /**
   * domain
   */
  card: {
    tags: "Tags",
    archived: "Archived"
  }
}
