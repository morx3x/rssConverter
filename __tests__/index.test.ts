import {toJson} from '../src/index'

test('Get rss json from note', async () => {
    const data: any = await toJson('https://note.mu/recommend/rss');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 10000);

test('Get rss json from bbc news', async () => {
    const data: any = await toJson('http://feeds.bbci.co.uk/news/rss.xml#');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from gigazine', async () => {
    const data: any = await toJson('http://gigazine.net/news/rss_2.0/');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from yahoo news', async () => {
    const data: any = await toJson('https://news.yahoo.co.jp/pickup/rss.xml');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from horiemon.com', async () => {
    const data: any = await toJson('http://horiemon.com/feed/');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from hnrss.org', async () => {
    const data: any = await toJson('https://hnrss.org/frontpage');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from hnrss.org newest', async () => {
    const data: any = await toJson('https://hnrss.org/newest');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from lifehacker.jp', async () => {
    const data: any = await toJson('http://feeds.lifehacker.jp/rss/lifehacker/index.xml');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from huffingtonpost.jp', async () => {
    const data: any = await toJson('http://www.huffingtonpost.jp/rss/index.xml');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from nifty.com', async () => {
    const data: any = await toJson('http://portal.nifty.com/rss/headline.rdf');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from digiday.jp', async () => {
    const data: any = await toJson('https://digiday.jp/feed/');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from livedoor.jp', async () => {
    const data: any = await toJson('http://blog.livedoor.jp/dqnplus/index.rdf');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from billmaher.hbo.libsynpro.com', async () => {
    const data: any = await toJson('http://billmaher.hbo.libsynpro.com/rss');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from rss.nytimes.com', async () => {
    const data: any = await toJson('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from www.reddit.com', async () => {
    const data: any = await toJson('https://www.reddit.com/.rss');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from www.npr.org', async () => {
    const data: any = await toJson('https://www.npr.org/rss/podcast.php?id=510298');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);

test('Get rss json from prtimes.jp', async () => {
    const data: any = await toJson('https://prtimes.jp/companyrdf.php?company_id=25503');
    expect(data.hasOwnProperty('item') !== -1).toBeTruthy();
}, 100000);
