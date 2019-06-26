const {combineParams, getTime} = require('../util');

function QQ() {
  this.provider = 'qq';
  this.defaultFormat = 'embed';
  this.formats = {
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = QQ;

QQ.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:page\/|cover\/[a-zA-Z\d]+\/|vid=)([a-zA-Z\d]+)/i
  );
  return match ? match[1] : undefined;
};

QQ.prototype.parse = function(url) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    id: this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

QQ.prototype.createUrl = function(baseUrl, vi, params) {
  var url = baseUrl + vi.id;

  url += combineParams({
    params: params,
  });

  return url;
};

QQ.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('//v.qq.com/txp/iframe/player.html?vid=', vi, params);
};

require('../base').bind(new QQ());
