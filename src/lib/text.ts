/*
* resize text and inputs font size based on text length
*/
export function TextScale(input: string | null): number {
    if (input == null) {
        return 1
    }

    if (input.length <= 80) {
        return 1
    }

    if (input.length <= 280) {
        return 2
    }

    return 3
}

export function TextMask(input: string | null): string {
    // with regular asterisks mask char "*", css word-reak:break-all;
    // property not working on mobile safari and chrome
    // @refs https://unicode-table.com/en/sets/star-symbols/
    return input == null ? "" : input.replace(/./g, '✶')
}

export function QrCodeSize(text: string | null): number {
    const bytes = new Blob([text ?? ""]).size
    if (!bytes || bytes >= 1000) return 0
    return Math.floor(100 + 30 * Math.log(bytes))
}
