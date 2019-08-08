import axios from 'axios';
import xml2js from 'xml2js';

function asyncParseString(xml: any) {
    return new Promise(function (resolve, reject) {
        const options = {
            trim: true,
            explicitArray: false,
            attrkey: '_attrs',
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

function extracted(item: any) {
    Object.keys(item).forEach((prop: any) => {
        if (item[prop].hasOwnProperty('_attrs')) {
            Object.keys(item[prop]['_attrs']).forEach((attr: any) => {
                let fieldName = prop + '_' + attr;
                item[fieldName] = item[prop]['_attrs'][attr];
            });
            delete item[prop]['_attrs'];

            if (item[prop].hasOwnProperty('_')) {
                item[prop] = item[prop]['_']
            }

            if (Object.keys(item[prop]).length === 0) {
                delete item[prop];
            }
        }
        if (item[prop] instanceof Object && !(item[prop] instanceof Array)) {
            extracted(item[prop])
        }
    });
}

const flattenAttrs: any = (item: any) => {
    if (item.hasOwnProperty('_attrs')) {
        Object.keys(item['_attrs']).forEach((attr: any) => {
            let fieldName =  'item_' + attr;
            item[fieldName] = item['_attrs'][attr];
        });
    }
    delete item['_attrs'];

    extracted(item);
    return item;
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
        // flatten attrs
        if (Array.isArray(obj.rss.channel.items)) {
            obj.rss.channel.items = obj.rss.channel.items.map((item: any) => {
                return flattenAttrs(item);
            });
        }else{
            obj.rss.channel.items = [flattenAttrs(obj.rss.channel.items)];
        }

        // escape data
        channel = getEscapedData(obj.rss.channel);
    } else if(obj.hasOwnProperty('rdf:RDF')) {
        // RSS 1.0
        obj['rdf:RDF'].channel.items = obj['rdf:RDF'].item;
        delete obj['rdf:RDF'].item;
        // flatten attrs
        if (Array.isArray(obj['rdf:RDF'].channel.items)) {
            obj['rdf:RDF'].channel.items = obj['rdf:RDF'].channel.items.map((item: any) => {
                return flattenAttrs(item);
            });
        }else{
            obj['rdf:RDF'].channel.items = [flattenAttrs(obj['rdf:RDF'].channel.items)];
        }
        // escape data
        channel = getEscapedData(obj['rdf:RDF'].channel);
    } else {
        // ATOM
        obj.feed.items = obj.feed.entry;
        delete obj.feed.entry;
        // flatten attrs
        if (Array.isArray(obj.feed.items)) {
            obj.feed.items = obj.feed.items.map((item: any) => {
                item.link = item.link._attrs.href;
                return flattenAttrs(item);
            });
        }else{
            obj.feed.items.link = obj.feed.items.link._attrs.href;
            obj.feed.items = [flattenAttrs(obj.feed.items)];
        }

        // escape data
        channel = getEscapedData(obj.feed);
    }
    return channel;
}
