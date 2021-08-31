
/* --- ブラウザの違いを吸収 --- */
if (typeof browser === 'undefined') browser = chrome;

/* --- 前方一致で検知させる単語・ORで付け加える単語を定義(あらかじめ小文字で定義) --- */
const TAG_WORD_INDEXOF_TABLE = [
    ["ソフトウェアトーク", "ボイチェビ", "ボイチェビトーク"],
    ["ソフトウェアシンガー", "vocaloid"]
];
const TAG_WORD_ADDWORD_TABLE = [
    ["ソフトウェアトーク", "ボイチェビ", "ボイチェビトーク", "voiceroid", "ボイスロイド", "ボイロ", "cevio", "cevio_ai", "a.i.voice", "voicebox"],
    ["ソフトウェアシンガー", "vocaloid", "ボカロ", "utau", "cevio", "synthv", "synthesizerv", "neutrino", "歌うボイスロイド"]
];

/* カウンターとか */
let is_match = false; //前方一致するかどうか
let table_col; //前方一致したときのテーブル列
let url_path; //複数回動いてほしくないので事前定義

/* --- リクエストが送信される前にリダイレクトをかける --- */
browser.webRequest.onBeforeRequest.addListener(details => {
    /* タグ名を取得 */
    let url = new URL(details.url);
    let tag = decodeURI(url.pathname.split('/').filter(text => text.length > 0).pop());

    //ORの数を数える
    var ORcount = tag.match(/OR/g);

    /* --- 前方一致のテーブルを舐め回す --- */
    for (var n = 0; n < TAG_WORD_INDEXOF_TABLE.length; n++) {
        //とりあえず配列を代入
        var tagname_arr = TAG_WORD_INDEXOF_TABLE[n];

        //タグを小文字化
        tag = tag.toLowerCase();

        //前方一致するものを探す
        var match_tagname = tagname_arr.find(el => tag.startsWith(el));
        console.log(match_tagname);
        console.log(tag)

        /* --- 前方一致したら --- */
        if (match_tagname) {
            is_match = true;
            /* --- 前方一致箇所を抜いた文字列を取得 ex:ソフトウェアトーク劇場 → 劇場 --- */
            var genre = tag.replace(match_tagname, "");
            table_col = n;
        }
    }

     //前方一致・ORが5個以下なら実行 
    if (is_match && (!ORcount)) {
        //undefinedが文字列として出力されないようにする
        if (genre == undefined) genre = "";
        //ORが無限に出ないようにする
        if (genre.match(/OR/g)) genre = genre.substr(0, genre.indexOf("+OR"));

        //ジャンルを追記しながらURLにする
        url_path = TAG_WORD_ADDWORD_TABLE[table_col].join(genre + '+OR+') + genre;

        //リダイレクト
        url.pathname = '/tag/' + url_path;
        return { redirectUrl: url.href };
    }
    is_match = false;

    return {};
}, {
    urls: ['*://www.nicovideo.jp/tag/*']
}, ['blocking']);
