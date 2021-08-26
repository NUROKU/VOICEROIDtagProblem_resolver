
/* --- ブラウザの違いを吸収 --- */
if (typeof browser === 'undefined') browser = chrome;


/* --- 検知して並べるタグたちを定義(あらかじめ小文字で定義) --- */
const TAGNAME_TABLE = [
    ["ソフトウェアトーク", "ボイチェビトーク", "voiceroid", "ボイスロイド", "cevio","a.i.voice","voicevox"],
    ["ソフトウェアトーク実況プレイ", "ボイチェビトーク実況プレイ", "voiceroid実況プレイ","cevio実況プレイ","a.i.voice実況プレイ"],
    ["ソフトウェアトーク劇場", "ボイチェビトーク劇場", "voiceroid劇場","cevio劇場","a.i.voice劇場"],
    ["ソフトウェアトーク解説", "ボイチェビトーク解説", "voiceroid解説","cevio解説"],
    ["ソフトウェアトークキッチン", "ボイチェビトークキッチン", "voiceroidキッチン","cevioキッチン"],
    ["ソフトウェアトーク車載", "ボイチェビトーク車載", "voiceroid車載","cevio車載"],
    ["ボイチェビトーク", "ソフトウェアトーク", "voiceroid", "ボイスロイド", "cevio","a.i.voice","voicevox"],
    ["ボイチェビトーク実況プレイ", "ソフトウェアトーク実況プレイ", "voiceroid実況プレイ","cevio実況プレイ","a.i.voice実況プレイ"],
    ["ボイチェビトーク劇場", "ソフトウェアトーク劇場", "voiceroid劇場","cevio劇場","a.i.voice劇場"],
    ["ボイチェビトーク解説", "ソフトウェアトーク解説", "voiceroid解説","cevio解説"],
    ["ボイチェビトークキッチン", "ソフトウェアトークキッチン", "voiceroidキッチン","cevioキッチン"],
    ["ボイチェビトーク車載", "ソフトウェアトーク車載", "voiceroid車載","cevio車載"],
    ["cevio_ai","cevio"]
];


/* --- リクエストが送信される前にリダイレクトをかける --- */
browser.webRequest.onBeforeRequest.addListener(details => {
    /* タグ名を取得 */
    let url = new URL(details.url);
    let tag = decodeURI(url.pathname.split('/').filter(text => text.length > 0).pop());
    /* タグをテーブルから検索 */
    let tag_names = TAGNAME_TABLE.filter(row => row.indexOf(tag.toLowerCase()) === 0);
    if (tag_names.length === 1) {
        /* タグリストが見つかれば */
        url.pathname = '/tag/' + tag_names[0].join('+OR+');
        return {redirectUrl : url.href};
    }
    return {};
}, {
    urls : ['*://www.nicovideo.jp/tag/*']
}, ['blocking']);
