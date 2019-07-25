# RSS CONVERTER

> This is a converter for rss to json.

[![NPM Version][npm-image]][npm-url]

## Install

```bash
npm i -S rss-converter
```

## Usage
Return Value
```$json
{
  title,
  ...,
  items: [
    {
      ...,
    },
    ...
  ]
}

> atom entry.link
link: 'http://~'

> keyname will be changed to snake case.
'：' -> '_'
```
## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/rss-converter.svg
[npm-url]: https://npmjs.org/package/rss-converter
