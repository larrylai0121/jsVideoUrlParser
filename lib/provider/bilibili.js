const {combineParams, getTime} = require('../util');

function Bilibili() {
  this.provider = 'bilibili';
  this.defaultFormat = 'embed';
  this.formats = {
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Bilibili;

Bilibili.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:av)([\d]+)/i
  );

  return match ? match[1] : undefined;
};

Bilibili.prototype.parse = function(url) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    id: this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

Bilibili.prototype.createUrl = function(baseUrl, vi, params) {
  var url = baseUrl + vi.id;

  url += combineParams({
    params: params,
  });

  return url;
};

Bilibili.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('//player.bilibili.com/player.html?aid=', vi, params);
};

require('../base').bind(new Bilibili());
