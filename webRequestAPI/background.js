
/* --- ブラウザの違いを吸収 --- */
if (typeof browser === 'undefined') browser = chrome;

/* --- 前方一致で検知させる単語・ORで付け加える単語を定義(あらかじめ小文字で定義) --- */
const TAG_WORD_INDEXOF_ARRAY = ["ソフトウェアトーク", "ボイチェビ", "ボイチェビトーク"];
const TAG_WORD_ADDWORD_ARRAY = ["ソフトウェアトーク", "ボイチェビ", "ボイチェビトーク", "voiceroid", "ボイスロイド", "ボイロ", "cevio", "cevio_ai", "a.i.voice", "voicebox"];

/* カウンターとか */
let is_match = false; //前方一致するかどうか
let try_counter = 0; //ORがいくつあるか）
let url_path; //複数回動いてほしくないので事前定義


/* --- リクエストが送信される前にリダイレクトをかける --- */
browser.webRequest.onBeforeRequest.addListener(details => {
    /* タグ名を取得 */
    let url = new URL(details.url);
    let tag = decodeURI(url.pathname.split('/').filter(text => text.length > 0).pop());

    /* --- 前方一致のテーブルを舐め回す --- */
    for (var n = 0; n < TAG_WORD_INDEXOF_ARRAY.length; n++) {
        var tagname = TAG_WORD_INDEXOF_ARRAY[n];
        /* --- 前方一致したら --- */
        if (tag.startsWith(tagname)) {
            is_match = true;
            /* --- 前方一致箇所を抜いた文字列を取得 ex:ソフトウェアトーク劇場 → 劇場 --- */
            var genre = tag.replace(tagname, "");
        }
    }

    //undefinedが文字列として出力されないようにする
    if (genre == undefined) genre = "";
    //ORが無限に出ないようにする
    if (genre.match(/OR/g)) genre = genre.substr(0, genre.indexOf("+OR"));

    //ジャンルを追記しながらURLにする
    url_path = TAG_WORD_ADDWORD_ARRAY.join(genre + '+OR+') + genre;

    //前方一致していたら実行
    if (is_match) {
        url.pathname = '/tag/' + url_path;
        return {redirectUrl : url.href};
    }

    return {};
}, {
    urls : ['*://www.nicovideo.jp/tag/*']
}, ['blocking']);
