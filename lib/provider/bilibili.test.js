const Bilibili = require('./bilibili');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Bilibili());
  return parser;
}

test('Bilibili: undefined', () => {
  expect(newParser().parse('https://www.bilibili.com')).toBe(undefined);
});

test('Bilibili: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'bilibili',
      id: '52813793',
      mediaType: 'video',
    },
    formats: {
      embed: '//player.bilibili.com/player.html?aid=52813793',
    },
    urls: ['https://www.bilibili.com/video/av52813793/',
      '//www.bilibili.com/video/av52813793/',
    ],
  });
});