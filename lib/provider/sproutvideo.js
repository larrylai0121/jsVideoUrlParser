const {combineParams, getTime} = require('../util');

function SproutVideo() {
  this.provider = 'sproutvideo';
  this.defaultFormat = 'embed';
  this.formats = {
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = SproutVideo;

SproutVideo.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:embed)\/([a-zA-Z\d]+)\/([a-zA-Z\d]+)/i
  );
  return match ? match[1] + '/' + match[2] : undefined;
};

SproutVideo.prototype.parse = function(url) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    id: this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

SproutVideo.prototype.createUrl = function(baseUrl, vi, params) {
  var url = baseUrl + vi.id;

  url += combineParams({
    params: params,
  });

  return url;
};

SproutVideo.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('//videos.sproutvideo.com/embed/', vi, params);
};

require('../base').bind(new SproutVideo());
