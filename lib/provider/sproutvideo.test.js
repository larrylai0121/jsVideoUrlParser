const SproutVideo = require('./sproutvideo');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new SproutVideo());
  return parser;
}

test('SproutVideo: undefined', () => {
  expect(newParser().parse('https://sproutvideo')).toBe(undefined);
});

test('SproutVideo: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'sproutvideo',
      id: '709ddcb01a1de7c1f8/8a51db5ea768cba3',
      mediaType: 'video',
    },
    formats: {
      embed: '//videos.sproutvideo.com/embed/709ddcb01a1de7c1f8/8a51db5ea768cba3',
    },
    urls: ['https://videos.sproutvideo.com/embed/709ddcb01a1de7c1f8/8a51db5ea768cba3',
      '//videos.sproutvideo.com/embed/709ddcb01a1de7c1f8/8a51db5ea768cba3',
    ],
  });
});