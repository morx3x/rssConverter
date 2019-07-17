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

export async function toJson(url: string) {
    const res = await axios.get(url);
    const obj =  await asyncParseString(res.data);
    return JSON.stringify(obj);
}
