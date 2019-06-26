const QQ = require('./qq');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new QQ());
  return parser;
}

test('SproutVideo: undefined', () => {
  expect(newParser().parse('https://sproutvideo')).toBe(undefined);
});

test('SproutVideo: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'qq',
      id: 'x0666x22ncy',
      mediaType: 'video',
    },
    formats: {
      embed: '//v.qq.com/txp/iframe/player.html?vid=x0666x22ncy',
    },
    urls: ['https://v.qq.com/x/page/x0666x22ncy.html',
      '//v.qq.com/x/page/x0666x22ncy.html',
      'https://v.qq.com/x/cover/5cmmfm878hexl79/x0666x22ncy.html',
      '//v.qq.com/x/cover/5cmmfm878hexl79/x0666x22ncy.html',
      'https://v.qq.com/txp/iframe/player.html?vid=x0666x22ncy',
      '//v.qq.com/txp/iframe/player.html?vid=x0666x22ncy'
    ],
  });
});