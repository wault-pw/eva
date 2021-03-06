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
                    body: "]Gj2ss{+Grg$fBbg}#",
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
                    body: "?)E%[9=GcgzaAftgP[LSEK",
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
                    body: "]Gj2ss{+Grg$fBbg}#",
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
        title: "????????????????????????",
    },
    cards: [
        {
            title: "?????????????????? ?????????? (????????????)",
            tag: "??????????????",
            items: [
                {
                    title: "?????????? ??????????",
                    body: "8464 2366 1074 7732"
                },
                {
                    title: "?????????????????? ??????????",
                    body: "DMITRY ULYANOV"
                },
                {
                    title: "????????",
                    body: "Alfa Bank"
                },
                {
                    title: "????????",
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
                    title: "???????? ????????????????",
                    body: "06/25",
                },
                {
                    title: "????????????",
                    body: "]Gj2ss{+Grg$fBbg}#",
                    hidden: true
                }
            ]
        },
        {
            title: "?????????? ?? ?????????? (????????????)",
            tag: "??????????????",
            items: [
                {
                    title: "User ID",
                    body: "76238784",
                },
                {
                    title: "????????????",
                    body: "?)E%[9=GcgzaAftgP[LSEK",
                    hidden: true,
                },
                {
                    title: "???????????? ??????????????",
                    body: "https://online.sberbank.ru",
                },
                {
                    title: "??????",
                    body: "044525225",
                },
                {
                    title: "SWIFT",
                    body: "SBERBANK",
                },
                {
                    title: "?????????? ??????????",
                    body: "30301 810 8 0000 6003800",
                },
            ]
        },
        {
            title: "bitcoin (????????????)",
            tag: "??????????????",
            items: [
                {
                    title: "??????????",
                    body: "1Q7u3cnwo4tAQoBixPSrS5C39E6VaMHWKb",
                },
                {
                    title: "?????????????????? ???????? [HEX]",
                    body: "2ce5820302fd6d8cf756e436484b76fcba11d5664e7bbc643b1bc29994b6bfe5",
                    hidden: true
                }
            ]
        },
        {
            title: "Gmail (????????????)",
            tag: "????????????????????",
            items: [
                {
                    title: "??????????",
                    body: "d.ulyanov@gmail.com",
                },
                {
                    title: "????????????",
                    body: "]Gj2ss{+Grg$fBbg}#",
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
            title: "?????????????? (????????????)",
            tag: "??????????????????",
            items: [
                {
                    title: "??????????, ???????????????? ??????????????",
                    body: "???? ?????? ???????????? ???? ??. ????????????"
                },
                {
                    title: "?????????? ????????????????",
                    body: "51???1402606",
                    hidden: true,
                },
                {
                    title: "???????? ????????????",
                    body: "16.06.2022",
                },
                {
                    title: "???????? ????????????????",
                    body: "16.06.2045",
                },
            ]
        }
    ]
}

export const Chinese: ISeed = {
    workspace: {
        title: "?????????",
    },
    cards: [
        {
            title: "?????????????????????",
            tag: "??????",
            items: [
                {
                    title: "??????",
                    body: "4147 2666 1074 7732"
                },
                {
                    title: "?????????",
                    body: "WAN LI"
                },
                {
                    title: "??????",
                    body: "Citi"
                },
                {
                    title: "??????",
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
                    title: "?????????",
                    body: "06/25",
                },
                {
                    title: "??????",
                    body: "]Gj2ss{+Grg$fBbg}#",
                    hidden: true
                }
            ]
        },
        {
            title: "????????????????????????",
            tag: "??????",
            items: [
                {
                    title: "User ID",
                    body: "76238784",
                },
                {
                    title: "??????",
                    body: "?)E%[9=GcgzaAftgP[LSEK",
                    hidden: true,
                },
                {
                    title: "??????",
                    body: "https://www.citibank.com.cn",
                },
                {
                    title: "SWIFT",
                    body: "CITICNSXGCG",
                },
                {
                    title: "????????????",
                    body: "36310481",
                },
            ]
        },
        {
            title: "?????????????????????",
            tag: "??????",
            items: [
                {
                    title: "??????",
                    body: "1Q7u3cnwo4tAQoBixPSrS5C39E6VaMHWKb",
                },
                {
                    title: "?????? [????????????]",
                    body: "2ce5820302fd6d8cf756e436484b76fcba11d5664e7bbc643b1bc29994b6bfe5",
                    hidden: true
                }
            ]
        },
        {
            title: "Gmail????????????",
            tag: "?????????",
            items: [
                {
                    title: "??????",
                    body: "wan.li@gmail.com",
                },
                {
                    title: "??????",
                    body: "]Gj2ss{+Grg$fBbg}#",
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
            title: "??????????????????",
            tag: "??????",
            items: [
                {
                    title: "???...??????",
                    body: "????????????????????????"
                },
                {
                    title: "??????ID",
                    body: "83A4568HL25-66",
                    hidden: true,
                },
                {
                    title: "????????????",
                    body: "2022/06/16",
                },
                {
                    title: "?????????",
                    body: "2045/06/16",
                },
            ]
        }
    ]
}
