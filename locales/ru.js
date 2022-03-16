export default {
  ui: {
    username: "Логин",
    passphrase: "Пароль",
    loading: "Загрузка",
    login: "Войти",
    tag: "Тег",
    or: "Или",
    failed: "Неудача",
    yes: "Да",
    no: "Нет",
    edit: "Изменить",
    toClone: "Клонировать",
    copied: "Скопировано",
    copy: "Копия",
    delete: "Удалить",
    archive: "В архив",
    restore: "Восстановить",
    save: "Сохранить",
    cancel: "Закрыть",
    all: "Все",
    notes: "Заметки"
  },

  menu: {
    join: "Создать.Аккаунт",
    login: "Вход",
    demo: "Демо",
    features: "Возможности",
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
    step1: "Генерация SRP ключей",
    step2: "Генерация мастер ключа",
    step3: "Генерация RSA ключей",
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
    title: "Бекап Wault"
  },

  space: {
    titleTemplate: "%s · воркспейс",
  },

  spaceLeft: {
    workspaces: "Воркспейсы",
  },

  spaceMenu: {
    terminateHtml: `<a href="javascript:">Удалить</a> аккаунт`
  },

  spaceForm: {
    title: "Название",
    label: "Лейбл",
    value: "Значение",
  },

  export: {
    h2: "Экспорт",
    h3: "Оффлайн копия",
    p1: "Скачайте офлайн копию вашего аккаунта Wault. Очень удобно, когда нет подключения к Интернету.",
    p2: "Оффлайн копия — это всего лишь один HTML-файл, который содержит как все веб-приложение Wault, так и все ваши зашифрованные данные.",
    p3: "Копия так же безопасна, как и облачный сервис Wault, поскольку он используют один и тот же код и архитектуру шифрования.",
    button: "Скачать",
  },

  termination: {
    h2: "Удалить аккаунт",
    p1: "Перед удалением учетной записи убедитесь, что вы скачали последнюю версию оффлайн копии вашего аккаунта.",
    check: "Все мои данные будут безвозвратно удалены. Я понимаю, что это действие нельзя отменить.",
    button: "Удалить навсегда"
  },

  dialog: {
    deleteCard: "Удалить?",
    archiveCard: "Архивировать?",
  },

  /**
   * domain
   */
  card: {
    tags: "Теги",
    archived: "Архив"
  }
}
