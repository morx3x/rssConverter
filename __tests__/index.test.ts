import {toJson} from '../src/index'

test('Get rss json from note', async () => {
    const data: any = await toJson('https://note.mu/recommend/rss');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
});

test('Get rss json from bbc news', async () => {
    const data: any = await toJson('http://feeds.bbci.co.uk/news/rss.xml#');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
});

test('Get rss json from gigazine', async () => {
    const data: any = await toJson('http://gigazine.net/news/rss_2.0/');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
});

test('Get rss json from yahoo news', async () => {
    const data: any = await toJson('https://news.yahoo.co.jp/pickup/rss.xml');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
});

test('Get rss json from horiemon.com', async () => {
    const data: any = await toJson('http://horiemon.com/feed/');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
});