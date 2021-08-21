
//動画の最初に言ってた対応表みたいなやつ
//自由に列も中の単語も編集しちゃって大丈夫(ニコ動の仕様上OR検索は最大10件なんで行は最大10個かも)
const TAGNAME_TABLE = [
    ["ソフトウェアトーク", "VOICEROID", "ボイスロイド", "CeVIO","a.i.voice","VOICEVOX"],
    ["ソフトウェアトーク実況プレイ", "VOICEROID実況プレイ","CeVIO実況プレイ","a.i.voice実況プレイ"],
    ["ソフトウェアトーク劇場", "VOICEROID劇場","CeVIO劇場","A.I.VOICE劇場"],
    ["ソフトウェアトーク解説", "VOICEROID解説","CeVIO解説"],
    ["ソフトウェアトークキッチン", "VOICEROIDキッチン","CeVIOキッチン"],
    ["ソフトウェアトーク車載", "VOICEROID車載","CeVIO車載"],
    ["CeVIO_AI","CeVIO"],
    [],
    [],
    []
]

//URL取得してタグの部分だけ良い感じに抜き出す
// "/tag/ソフトウェアトーク" みたいな感じに取得されるから、/tag/を空白に置換している
var url_path = location.pathname
var tag_name = decodeURI(url_path.replace("/tag/",""))

//テーブルを上から1行ずつ舐め回す
for(let n = 0; n < TAGNAME_TABLE.length; n++){
    //行をいったん変数に格納
    tagname_array = TAGNAME_TABLE[n]

    //比較用に小文字化したものを変数に格納
    comvarsion_tag = tag_name.toLowerCase()
    comversion_array = tagname_array.map(v => v.toLowerCase())

    //行の中にタグの単語が存在してた場合、{ }で囲まれた部分の処理をする
    if (comversion_array.includes(comvarsion_tag)) {
        //["VOICEROID","CeVIO"] → "VOICEROID OR CeVIO" みたいな変換する
        var converted_tag = tagname_array.join(" OR ")

        //良い感じにURL作って飛ばす、こわい
        var url = "https://www.nicovideo.jp/tag/" + encodeURI(converted_tag)
        location.href = url
        break;
    }
}
