interface IWorkspace {
  title: string
}

interface ICard {
  title: string
  tag: string
  items: Array<ICardItem>
}

interface ICardItem {
  title: string
  body: string
  hidden?: boolean
}

export interface ISeed {
  workspace: IWorkspace
  cards: Array<ICard>
}

export const English: ISeed = {
  workspace: {
    title: "personal",
  },
  cards: [
    {
      title: "Credit card (sample)",
      tag: "finance",
      items: [
        {
          title: "Card number",
          body: "4147 2666 1074 7732"
        },
        {
          title: "Cardholder name",
          body: "ALEX WAULT"
        },
        {
          title: "Bank",
          body: "Citi"
        },
        {
          title: "Website",
          body: "https://www.citi.com",
        },
        {
          title: "CVV2",
          body: "853",
          hidden: true,
        },
        {
          title: "PIN",
          body: "2744",
          hidden: true,
        },
        {
          title: "Valid through",
          body: "06/25",
        },
        {
          title: "Password",
          body: "]Gj2ss{+Grg$fBbg}#E})5Re8G",
          hidden: true
        }
      ]
    },
    {
      title: "Deposit account (sample)",
      tag: "finance",
      items: [
        {
          title: "User ID",
          body: "76238784",
        },
        {
          title: "Password",
          body: "?)E%[9=GcgzaAftgP[LSEK7JJv",
          hidden: true,
        },
        {
          title: "Account",
          body: "https://connect.secure.wellsfargo.com",
        },
        {
          title: "BIC",
          body: "WFBIUS6WFFX",
        },
        {
          title: "SWIFT",
          body: "WFBIUS6WFFX",
        },
        {
          title: "Bank account",
          body: "36310481",
        },
      ]
    },
    {
      title: "bitcoin (sample)",
      tag: "finance",
      items: [
        {
          title: "Address",
          body: "1Q7u3cnwo4tAQoBixPSrS5C39E6VaMHWKb",
        },
        {
          title: "Private key [HEX]",
          body: "2ce5820302fd6d8cf756e436484b76fcba11d5664e7bbc643b1bc29994b6bfe5",
          hidden: true
        }
      ]
    },
    {
      title: "Gmail (sample)",
      tag: "social",
      items: [
        {
          title: "Address",
          body: "a.wault@gmail.com",
        },
        {
          title: "Password",
          body: "]Gj2ss{+Grg$fBbg}#E})5Re8G",
          hidden: true
        },
        {
          title: "SMTP",
          body: "smtp.gmail.com:465",
        },
        {
          title: "IMAP",
          body: "imap.gmail.com:993",
        }
      ]
    },
    {
      title: "Passport (sample)",
      tag: "documents",
      items: [
        {
          title: "Issued by",
          body: "British Embassy in Berlin"
        },
        {
          title: "Number",
          body: "83A4568HL25-66",
          hidden: true,
        },
        {
          title: "Issue date",
          body: "2022/06/16",
        },
        {
          title: "Expiry date",
          body: "2045/06/16",
        },
      ]
    }
  ]
}

export const Russian: ISeed = {
  workspace: {
    title: "персональный",
  },
  cards: [
    {
      title: "Кредитная карта (пример)",
      tag: "финансы",
      items: [
        {
          title: "Номер карты",
          body: "8464 2366 1074 7732"
        },
        {
          title: "Держатель карты",
          body: "DMITRY ULYANOV"
        },
        {
          title: "Банк",
          body: "Alfa Bank"
        },
        {
          title: "Сайт",
          body: "http://alfabank.ru/",
        },
        {
          title: "CVV2",
          body: "853",
          hidden: true,
        },
        {
          title: "PIN",
          body: "2744",
          hidden: true,
        },
        {
          title: "Срок действия",
          body: "06/25",
        },
        {
          title: "Пароль",
          body: "]Gj2ss{+Grg$fBbg}#E})5Re8G",
          hidden: true
        }
      ]
    },
    {
      title: "Вклад в банке (пример)",
      tag: "финансы",
      items: [
        {
          title: "User ID",
          body: "76238784",
        },
        {
          title: "Пароль",
          body: "?)E%[9=GcgzaAftgP[LSEK7JJv",
          hidden: true,
        },
        {
          title: "Личный кабинет",
          body: "https://online.sberbank.ru",
        },
        {
          title: "БИК",
          body: "044525225",
        },
        {
          title: "SWIFT",
          body: "SBERBANK",
        },
        {
          title: "Номер счета",
          body: "30301 810 8 0000 6003800",
        },
      ]
    },
    {
      title: "bitcoin (пример)",
      tag: "финансы",
      items: [
        {
          title: "Адрес",
          body: "1Q7u3cnwo4tAQoBixPSrS5C39E6VaMHWKb",
        },
        {
          title: "Приватный ключ [HEX]",
          body: "2ce5820302fd6d8cf756e436484b76fcba11d5664e7bbc643b1bc29994b6bfe5",
          hidden: true
        }
      ]
    },
    {
      title: "Gmail (пример)",
      tag: "социальное",
      items: [
        {
          title: "Адрес",
          body: "d.ulyanov@gmail.com",
        },
        {
          title: "Пароль",
          body: "]Gj2ss{+Grg$fBbg}#E})5Re8G",
          hidden: true
        },
        {
          title: "SMTP",
          body: "smtp.gmail.com:465",
        },
        {
          title: "IMAP",
          body: "imap.gmail.com:993",
        }
      ]
    },
    {
      title: "Паспорт (пример)",
      tag: "документы",
      items: [
        {
          title: "Орган, выдавший паспорт",
          body: "ГУ МВД России по г. Москве"
        },
        {
          title: "Номер паспорта",
          body: "51№1402606",
          hidden: true,
        },
        {
          title: "Дата выдачи",
          body: "16.06.2022",
        },
        {
          title: "Срок действия",
          body: "16.06.2045",
        },
      ]
    }
  ]
}

export const Chinese: ISeed = {
  workspace: {
    title: "个人的",
  },
  cards: [
    {
      title: "信用卡（示例）",
      tag: "金融",
      items: [
        {
          title: "卡号",
          body: "4147 2666 1074 7732"
        },
        {
          title: "持卡人",
          body: "WAN LI"
        },
        {
          title: "银行",
          body: "Citi"
        },
        {
          title: "网站",
          body: "https://www.citibank.com.cn",
        },
        {
          title: "CVV2",
          body: "853",
          hidden: true,
        },
        {
          title: "PIN",
          body: "2744",
          hidden: true,
        },
        {
          title: "有效性",
          body: "06/25",
        },
        {
          title: "密码",
          body: "]Gj2ss{+Grg$fBbg}#E})5Re8G",
          hidden: true
        }
      ]
    },
    {
      title: "银行存款（示例）",
      tag: "金融",
      items: [
        {
          title: "User ID",
          body: "76238784",
        },
        {
          title: "密码",
          body: "?)E%[9=GcgzaAftgP[LSEK7JJv",
          hidden: true,
        },
        {
          title: "网站",
          body: "https://www.citibank.com.cn",
        },
        {
          title: "SWIFT",
          body: "CITICNSXGCG",
        },
        {
          title: "银行账户",
          body: "36310481",
        },
      ]
    },
    {
      title: "比特币（示例）",
      tag: "金融",
      items: [
        {
          title: "地址",
          body: "1Q7u3cnwo4tAQoBixPSrS5C39E6VaMHWKb",
        },
        {
          title: "私钥 [十六进制]",
          body: "2ce5820302fd6d8cf756e436484b76fcba11d5664e7bbc643b1bc29994b6bfe5",
          hidden: true
        }
      ]
    },
    {
      title: "Gmail（示例）",
      tag: "社会的",
      items: [
        {
          title: "地址",
          body: "wan.li@gmail.com",
        },
        {
          title: "密码",
          body: "]Gj2ss{+Grg$fBbg}#E})5Re8G",
          hidden: true
        },
        {
          title: "SMTP",
          body: "smtp.gmail.com:465",
        },
        {
          title: "IMAP",
          body: "imap.gmail.com:993",
        }
      ]
    },
    {
      title: "护照（示例）",
      tag: "文件",
      items: [
        {
          title: "由...发出",
          body: "英国驻柏林大使馆"
        },
        {
          title: "护照ID",
          body: "83A4568HL25-66",
          hidden: true,
        },
        {
          title: "签发日期",
          body: "2022/06/16",
        },
        {
          title: "到期日",
          body: "2045/06/16",
        },
      ]
    }
  ]
}
