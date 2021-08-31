
/* --- 前方一致で検知させる単語・ORで付け加える単語を定義(あらかじめ小文字で定義) --- */
const TAG_WORD_INDEXOF_TABLE = ["ソフトウェアトーク", "ボイチェビ", "ボイチェビトーク"];
const TAG_WORD_ADDWORD_TABLE = ["ソフトウェアトーク", "ボイチェビ", "ボイチェビトーク", "voiceroid", "ボイスロイド", "ボイロ", "cevio", "cevio_ai", "a.i.voice", "voicebox", "coefont"];

/* カウンターとか */
let is_match = false; //前方一致するかどうか
let try_counter = 0;

//URL取得してタグの部分だけ良い感じに抜き出す
// "/tag/ソフトウェアトーク" みたいな感じに取得されるから、/tag/を空白に置換している
var url_path = location.pathname;
var tag = decodeURI(url_path.replace("/tag/", ""));

var ORcount = tag.match(/OR/g);
if(ORcount){
    try_counter = ORcount.length;
}

/* --- 前方一致のテーブルを舐め回す --- */
for (var n = 0; n < TAG_WORD_INDEXOF_TABLE.length; n++) {
    var tagname = TAG_WORD_INDEXOF_TABLE[n];
    /* --- 前方一致したら --- */
    if (tag.startsWith(tagname)) {
        is_match = true;
        /* --- 前方一致箇所を抜いた文字列を取得 ex:ソフトウェアトーク劇場 → 劇場 --- */
        var genre = tag.replace(tagname, "");
    }
}

//undefinedが文字列として出力されないようにする
if (genre == undefined) genre = "";
var url_path = TAG_WORD_ADDWORD_TABLE.join(genre + '+OR+') + genre;

if (is_match && (try_counter < 7)) {
    var url = "https://www.nicovideo.jp/tag/" + encodeURI(url_path)
    location.href = url
}

