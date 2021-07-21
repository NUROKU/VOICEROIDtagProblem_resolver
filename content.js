

function createURLfropArray(array){
    ret = ""
    for(let n = 0; n < array.length; n++){
        ret += array[n]
        if(n < array.length - 1){
            ret += " OR "
        }
    }
    return ret
}



const tagname_array = [
    ["ソフトウェアトーク", "VOICEROID", "ボイスロイド", "CeVIO"],
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

var fullpath = location.pathname
var converted_tag = ""

//タグだけぬきだす、ついでに小文字化
var tagname = decodeURI(fullpath.slice(5)).toLowerCase()


for(let n = 0; n < tagname_array.length; n++){
    //検索するときは全部小文字として見る
    tmp_array = tagname_array[n].map(v => v.toLowerCase())
    
    if (tmp_array.includes(tagname)) {
        converted_tag = createURLfropArray(tagname_array[n])

        var url = "https://" + location.hostname + "/tag/" + encodeURI(converted_tag)
        location.href = url
        break;
    }
}
