import axios from 'axios';
import xml2js from 'xml2js';

function asyncParseString(xml: any) {
    return new Promise(function (resolve, reject) {
        const options = {
            trim: true,
            explicitArray: false,
            tagNameProcessors: [xml2js.processors.stripPrefix]
        };

        xml2js.parseString(xml, options, function (err: any, obj: any) {
            if (err) {
                reject(err);
            }
            resolve(obj);
        });
    });
}

// dotでアクセスできないkeyを置換する
// アクセス可能なkey pattern: [a-zA-Z_$][0-9a-zA-Z_$]*
// -> 冒頭が数値の場合は_を付加。マッチしない文字はすべて_に置換。
// $は_に変換
const getEscapedKey: any = (key: any) =>  {
    return key.replace(/^([0-9])/, '_$1').replace(/[^0-9a-zA-Z_$]/g, '_').replace('$', '_');
};

const getEscapedData: any = (data: any) => {
    if (!data || typeof data !== 'object') return data;
    // array
    if (Array.isArray(data)) {
        return data.map(item => getEscapedData(item))
    }
    // object
    return Object.entries(data).reduce(
        (acc, [key, val]) => ({
            ...acc,
            [getEscapedKey(key)]: getEscapedData(val)
        }),
        {}
    )
};

export async function toJson(url: string) {
    const res = await axios.get(url);
    const obj: any =  await asyncParseString(res.data);
    const channel: any = getEscapedData(obj.rss.channel);
    return JSON.stringify(channel);
}
