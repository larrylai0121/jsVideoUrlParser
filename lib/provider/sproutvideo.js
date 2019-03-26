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

SproutVideo.prototype.parseParameters = function(params) {
  return this.parseTime(params);
};

SproutVideo.prototype.parseTime = function(params) {
  if (params.t) {
    params.start = getTime(params.t);
    delete params.t;
  }
  return params;
};

SproutVideo.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: this.parseParameters(params),
    id: this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

SproutVideo.prototype.createUrl = function(baseUrl, vi, params) {
  var url = baseUrl + vi.id;
  var startTime = params.start;
  delete params.start;

  url += combineParams({
    params: params,
  });

  if (startTime) {
    url += '#t=' + startTime;
  }
  return url;
};

SproutVideo.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('//videos.sproutvideo.com/embed/', vi, params);
};

require('../base').bind(new SproutVideo());
