import axios from 'axios';
import xml2js from 'xml2js';

function asyncParseString(xml: any) {
    return new Promise(function (resolve, reject) {
        const options = {
            trim: true,
            explicitArray: false
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

export async function toJson(feedUrl: string) {
    const res = await axios.get(feedUrl, {
        timeout: 100000,
        responseType: 'document',
        headers: {
            'User-Agent': 'rss-converter',
            'Accept': 'application/rss+xml'
        }
    }).then((res) => {
        return res;
    }).catch((e) => {
        console.log(e);
        throw e;
    });
    const obj: any =  await asyncParseString(res.data);
    let channel: any;
    if (obj.hasOwnProperty('rss')) {
        // RSS 2.0
        obj.rss.channel.items = obj.rss.channel.item;
        delete obj.rss.channel.item;
        channel = getEscapedData(obj.rss.channel);
    } else if(obj.hasOwnProperty('rdf:RDF')) {
        // RSS 1.0
        obj['rdf:RDF'].items = obj['rdf:RDF'].item;
        delete obj['rdf:RDF'].item;
        channel = getEscapedData(obj['rdf:RDF']);
    } else {
        // ATOM
        obj.feed.items = obj.feed.entry;
        delete obj.feed.entry;
        obj.feed.items = obj.feed.items.map((item: any) => {
            item.link = item.link.$.href;
            return item;
        });
        channel = getEscapedData(obj.feed);
    }
    return JSON.stringify(channel);
}
