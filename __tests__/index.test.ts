import {toJson} from '../src/index'

test('Get rss json', async () => {
    const data: any = await toJson('https://note.mu/recommend/rss');
    expect(data.hasOwnProperty('rss') !== -1).toBeTruthy();
});
