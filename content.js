/* --- 前方一致で検知させる単語・ORで付け加える単語を定義(あらかじめ小文字で定義) --- */
const TAG_WORD_INDEXOF_TABLE = [
    ["ソフトウェアトーク", "ボイチェビ", "ボイチェビトーク"],
    ["ソフトウェアシンガー", "vocaloid"]
];
const TAG_WORD_ADDWORD_TABLE = [
    ["ソフトウェアトーク", "ボイチェビ", "ボイチェビトーク", "voiceroid", "ボイスロイド", "ボイロ", "cevio", "cevio_ai", "a.i.voice", "voicebox"],
    ["ソフトウェアシンガー", "vocaloid", "ボカロ", "utau", "cevio", "synthv", "synthesizerv", "neutrino", "歌うボイスロイド"]
];


/* --- カウンターとかの事前定義 --- */
let is_match = false; //前方一致するかどうか
let table_col; //前方一致したときのテーブル列

/* --- カURL取得してタグの部分だけ良い感じに抜き出す --- */
// "/tag/ソフトウェアトーク" みたいな感じに取得されるから、/tag/を空白に置換している
var url_path = location.pathname;
var tag = decodeURI(url_path.replace("/tag/", ""));

/* --- ORの数を数える --- */
var ORcount = tag.match(/OR/g);

/* --- 前方一致のテーブルを舐め回す --- */
for (var n = 0; n < TAG_WORD_INDEXOF_TABLE.length; n++) {
    //とりあえず配列を代入
    var tagname_arr = TAG_WORD_INDEXOF_TABLE[n];

    //タグを小文字化
    tag = tag.toLowerCase();

    //前方一致するものを探す
    var match_tagname = tagname_arr.find(el => tag.startsWith(el));

    /* --- 前方一致したら --- */
    if (match_tagname) {
        is_match = true;
        /* --- 前方一致箇所を抜いた文字列を取得 ex:ソフトウェアトーク劇場 → 劇場 --- */
        var genre = tag.replace(match_tagname, "");
        table_col = n;
    }
}

//undefinedが文字列として出力されないようにする
if (genre == undefined) genre = "";
//ORが無限に出ないようにする
if (genre.match(/OR/g)) genre = genre.substr(0, genre.indexOf("+OR"));

//ジャンルを追記しながらURLにする
url_path = TAG_WORD_ADDWORD_TABLE[table_col].join(genre + '+OR+') + genre;

//前方一致し、入力文字列にORが無い時に実行
if (is_match && (!ORcount)) {
    var url = "https://www.nicovideo.jp/tag/" + encodeURI(url_path)
    location.href = url
}