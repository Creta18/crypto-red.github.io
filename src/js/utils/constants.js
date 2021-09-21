import createHistory from "history/createBrowserHistory";
const HISTORY = createHistory();

import en_locale from "date-fns/locale/en-US";
import fr_locale from "date-fns/locale/fr";
import id_locale from "date-fns/locale/id";
import pt_locale from "date-fns/locale/pt";
import it_locale from "date-fns/locale/it";
import de_locale from "date-fns/locale/de";
import ja_locale from "date-fns/locale/ja";
import zh_locale from "date-fns/locale/zh-CN";
import ko_locale from "date-fns/locale/ko";
import ru_locale from "date-fns/locale/ru";
import hi_locale from "date-fns/locale/hi";

const LANGUAGES = ["en", "fr", "id", "pt", "it", "de", "ja", "zh", "ko", "ru", "hi"];

const DATE_FNS_LOCALE_MAP = {
    en: en_locale,
    fr: fr_locale,
    id: id_locale,
    pt: pt_locale,
    it: it_locale,
    de: de_locale,
    ja: ja_locale,
    zh: zh_locale,
    ko: ko_locale,
    ru: ru_locale,
    hi: hi_locale,
}

/*
 * The page routes system is working with regex, tabs system (weird) isn't great but it will change
 */
const PAGE_ROUTES = [
    {
        page_regex: /\/*/,
        page_name: "unknown",
        tabs: ""
    },
    {
        page_regex: /\/$/,
        page_name: "home",
        tabs: ""
    },
    {
        page_regex: /\/(settings)$/,
        page_name: "settings",
        tabs: ""
    },
    {
        page_regex: /\/(accounts)$/,
        page_name: "accounts",
        tabs: ""
    },
    {
        page_regex: /\/(dashboard)$/,
        page_name: "dashboard",
        tabs: ""
    },
    {
        page_regex: /\/(coins)$/,
        page_name: "coins",
        tabs: ""
    },
    {
        page_regex: /\/(coins)(\/bitcoin|\/cardano|\/dash|\/dogecoin|\/eos|\/ethereum|\/litecoin|\/monero|\/neo|\/v-systems|\/zcash)(\/balance|\/transactions|\/charts|\/send(\/[a-zA-Z0-9]+)?|\/receive)?$/,
        page_name: "coin",
        tabs: "coin"
    },
    {
        page_regex: /\/(about)((\/info(\/intellectual|\/terms)?)|(\/wiki(\/topup|\/mixer|\/swap|\/crypt|\/contribute|\/tips)?)|(\/faq(\/organization|\/security|\/privacy|\/fees|\/usage)?))?$/,
        page_name: "about",
        tabs: ""
    }
];

const COINS = [
    {
        id: "bitcoin",
        name: "Bitcoin",
        short_name: "BTC",
        image_url: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png"  
    },
    {
        id: "dash",
        name: "Dash",
        short_name: "DASH",
        image_url: "https://assets.coingecko.com/coins/images/19/small/dash-logo.png"
    },
    {
        id: "dogecoin",
        name: "Dogecoin",
        short_name: "DOGE",
        image_url: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png"
    },
    {
        id: "litecoin",
        name: "Litecoin",
        short_name: "LTC",
        image_url: "https://assets.coingecko.com/coins/images/2/small/litecoin.png"
    },
    {
        id: "v-systems",
        name: "Vsystems",
        short_name: "VSYS",
        image_url: "https://assets.coingecko.com/coins/images/7492/small/VSYS_Coin_200.png"
    },/*
    {
        id: "zcash",
        name: "Zcash",
        short_name: "ZEC",
        image_url: "https://assets.coingecko.com/coins/images/486/small/circle-zcash-color.png"
    }*/
];

const LOCALES = [
    {code: "ar-SA", name: "Arabic (Saudi Arabia)"},
    {code: "ar-SA", name: "Arabic (Saudi Arabia)"},
    {code: "bn-BD", name: "Bangla (Bangladesh)"},
    {code: "bn-IN", name: "Bangla (India)"},
    {code: "cs-CZ", name:  "Czech (Czech Republic)"},
    {code: "da-DK", name:  "Danish (Denmark)"},
    {code: "de-AT", name:  "Austrian German"},
    {code: "de-CH", name: "\"Swiss\" German"},
    {code: "de-DE", name: "Standard German (as spoken in Germany)"},
    {code: "el-GR", name: "Modern Greek"},
    {code: "en-AU", name: "Australian English"},
    {code: "en-CA", name: "Canadian English"},
    {code: "en-GB", name: "British English"},
    {code: "en-IE", name: "Irish English"},
    {code: "en-IN", name: "Indian English"},
    {code: "en-NZ", name: "New Zealand English"},
    {code: "en-US", name: "US English"},
    {code: "en-ZA", name: "English (South Africa)"},
    {code: "es-AR", name: "Argentine Spanish"},
    {code: "es-CL", name: "Chilean Spanish"},
    {code: "es-CO", name: "Colombian Spanish"},
    {code: "es-ES", name: "Castilian Spanish (as spoken in Central-Northern Spain)"},
    {code: "es-MX", name: "Mexican Spanish"},
    {code: "es-US", name: "American Spanish"},
    {code: "fi-FI", name: "Finnish (Finland)"},
    {code: "fr-BE", name: "Belgian French"},
    {code: "fr-CA", name: "Canadian French"},
    {code: "fr-CH", name: "\"Swiss\" French"},
    {code: "fr-FR", name: "Standard French (especially in France)"},
    {code: "he-IL", name: "Hebrew (Israel)"},
    {code: "hi-IN", name: "Hindi (India)"},
    {code: "hu-HU", name: "Hungarian (Hungary)"},
    {code: "id-ID", name: "Indonesian (Indonesia)"},
    {code: "it-CH", name: "\"Swiss\" Italian"},
    {code: "it-IT", name: "Standard Italian (as spoken in Italy)"},
    {code: "ja-JP", name: "Japanese (Japan)"},
    {code: "ko-KR", name: "Korean (Republic of Korea)"},
    {code: "nl-BE", name: "Belgian Dutch"},
    {code: "nl-NL", name: "Standard Dutch (as spoken in The Netherlands)"},
    {code: "no-NO", name: "Norwegian (Norway)"},
    {code: "pl-PL", name: "Polish (Poland)"},
    {code: "pt-BR", name: "Brazilian Portuguese"},
    {code: "pt-PT", name: "European Portuguese (as written and spoken in Portugal)"},
    {code: "ro-RO", name: "Romanian (Romania)"},
    {code: "ru-RU", name: "Russian (Russian Federation)"},
    {code: "sk-SK", name: "Slovak (Slovakia)"},
    {code: "sv-SE", name: "Swedish (Sweden)"},
    {code: "ta-IN", name: "Indian Tamil"},
    {code: "ta-LK", name: "Sri Lankan Tamil"},
    {code: "th-TH", name: "Thai (Thailand)"},
    {code: "tr-TR", name: "Turkish (Turkey)"},
    {code: "zh-CN", name: "Mainland China, simplified characters"},
    {code: "zh-HK", name: "Hong Kong, traditional characters"},
    {code: "zh-TW", name: "Taiwan, traditional characters"},
];

// We use this to know which currency to select when we have the country code known
const CURRENCY_COUNTRIES = {
    ARS: ["AR"],
    AUD: ["AU", "CC", "CX", "HM", "KI", "NF", "NR", "TV"],
    BDT: ["BD"],
    BRL: ["BR"],
    CAD: ["CA"],
    CHF: ["CH", "LI"],
    CLP: ["CL"],
    CNY: ["CN"],
    COP: ["CO"],
    CZK: ["CZ"],
    DKK: ["DK", "FO", "GL"],
    EUR: ["AD", "AT", "AX", "BE", "BL", "CY", "DE", "EE", "ES", "FI", "FR", "GF", "GP", "GR", "IE", "IT", "LU", "MC", "ME", "MF", "MQ", "MT", "NL", "PM", "PT", "RE", "SI", "SK", "SM", "TF", "VA", "YT"],
    GBP: ["GB", "GG", "GS", "IM", "JE"],
    HKD: ["HK"],
    HUF: ["HU"],
    IDR: ["ID"],
    ILS: ["IL", "PS"],
    INR: ["IN"],
    JPY: ["JP"],
    KRW: ["KR"],
    LKR: ["LK"],
    MXN: ["MX"],
    NOK: ["BV", "NO", "SJ"],
    NZD: ["CK", "NU", "NZ", "PN", "TK"],
    PLN: ["PL"],
    RON: ["RO"],
    RUB: ["RU"],
    SAR: ["SA"],
    SEK: ["SE"],
    THB: ["TH"],
    TRY: ["TR"],
    TWD: ["TW"],
    USD: ["AS", "BQ", "EC", "FM", "GU", "IO", "MH", "MP", "PR", "PW", "TC", "TL", "UM", "US", "VG", "VI"],
    ZAR: ["ZA"],
};

const FIRST_WEEK_DAY_BY_COUNTRY = {
    "001": "mon",
    "AD": "mon",
    "AE": "sat",
    "AF": "sat",
    "AG": "sun",
    "AI": "mon",
    "AL": "mon",
    "AM": "mon",
    "AN": "mon",
    "AR": "mon",
    "AS": "sun",
    "AT": "mon",
    "AU": "sun",
    "AX": "mon",
    "AZ": "mon",
    "BA": "mon",
    "BD": "sun",
    "BE": "mon",
    "BG": "mon",
    "BH": "sat",
    "BM": "mon",
    "BN": "mon",
    "BR": "sun",
    "BS": "sun",
    "BT": "sun",
    "BW": "sun",
    "BY": "mon",
    "BZ": "sun",
    "CA": "sun",
    "CH": "mon",
    "CL": "mon",
    "CM": "mon",
    "CN": "sun",
    "CO": "sun",
    "CR": "mon",
    "CY": "mon",
    "CZ": "mon",
    "DE": "mon",
    "DJ": "sat",
    "DK": "mon",
    "DM": "sun",
    "DO": "sun",
    "DZ": "sat",
    "EC": "mon",
    "EE": "mon",
    "EG": "sat",
    "ES": "mon",
    "ET": "sun",
    "FI": "mon",
    "FJ": "mon",
    "FO": "mon",
    "FR": "mon",
    "GB": "mon",
    "GB-alt-variant": "sun",
    "GE": "mon",
    "GF": "mon",
    "GP": "mon",
    "GR": "mon",
    "GT": "sun",
    "GU": "sun",
    "HK": "sun",
    "HN": "sun",
    "HR": "mon",
    "HU": "mon",
    "ID": "sun",
    "IE": "mon",
    "IL": "sun",
    "IN": "sun",
    "IQ": "sat",
    "IR": "sat",
    "IS": "mon",
    "IT": "mon",
    "JM": "sun",
    "JO": "sat",
    "JP": "sun",
    "KE": "sun",
    "KG": "mon",
    "KH": "sun",
    "KR": "sun",
    "KW": "sat",
    "KZ": "mon",
    "LA": "sun",
    "LB": "mon",
    "LI": "mon",
    "LK": "mon",
    "LT": "mon",
    "LU": "mon",
    "LV": "mon",
    "LY": "sat",
    "MC": "mon",
    "MD": "mon",
    "ME": "mon",
    "MH": "sun",
    "MK": "mon",
    "MM": "sun",
    "MN": "mon",
    "MO": "sun",
    "MQ": "mon",
    "MT": "sun",
    "MV": "fri",
    "MX": "sun",
    "MY": "mon",
    "MZ": "sun",
    "NI": "sun",
    "NL": "mon",
    "NO": "mon",
    "NP": "sun",
    "NZ": "mon",
    "OM": "sat",
    "PA": "sun",
    "PE": "sun",
    "PH": "sun",
    "PK": "sun",
    "PL": "mon",
    "PR": "sun",
    "PT": "sun",
    "PY": "sun",
    "QA": "sat",
    "RE": "mon",
    "RO": "mon",
    "RS": "mon",
    "RU": "mon",
    "SA": "sun",
    "SD": "sat",
    "SE": "mon",
    "SG": "sun",
    "SI": "mon",
    "SK": "mon",
    "SM": "mon",
    "SV": "sun",
    "SY": "sat",
    "TH": "sun",
    "TJ": "mon",
    "TM": "mon",
    "TR": "mon",
    "TT": "sun",
    "TW": "sun",
    "UA": "mon",
    "UM": "sun",
    "US": "sun",
    "UY": "mon",
    "UZ": "mon",
    "VA": "mon",
    "VE": "sun",
    "VI": "sun",
    "VN": "mon",
    "WS": "sun",
    "XK": "mon",
    "YE": "sun",
    "ZA": "sun",
    "ZW": "sun"
}

module.exports = {
    LANGUAGES: LANGUAGES,
    DATE_FNS_LOCALE_MAP: DATE_FNS_LOCALE_MAP,
    HISTORY: HISTORY,
    PAGE_ROUTES: PAGE_ROUTES,
    COINS: COINS,
    LOCALES: LOCALES,
    CURRENCY_COUNTRIES: CURRENCY_COUNTRIES,
    FIRST_WEEK_DAY_BY_COUNTRY: FIRST_WEEK_DAY_BY_COUNTRY,
};
