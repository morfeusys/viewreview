(function() {
  var types = {'apps': 'app', 'movies': 'movie', 'music': 'album', 'books': 'book'};
  var url$ = $('#url');
  var urls$ = $('.urls');
  $('#generator').submit(function(e) {
    urls$.empty();
    e.preventDefault();
    var data = parseURL(url$.val());
    if (data) {
      Object.keys(data).forEach(function(item) {
        var url = data[item];
        var div$ = $('<div class="animated fadeIn"><div><span class="label label-' + (item === 'rss' ? 'warning' : 'info') + '">' + item +  '</span></div>&nbsp;'
        + '<a target="_blank" href="' + url + '">' + url + '</a>'
        + '</div>');
        urls$.append(div$);
      });
    }
  });

  function parseURL(url) {
    url = purl(url);
    var host = url.attr('host');
    if (host.indexOf('play.google.com') === -1) return;
    var id = url.param('id');
    if (!id) return;
    var path = url.attr('path');
    var segments = path.split('/');
    if (!segments.length || segments.length < 3) return;
    if (segments[1] !== 'store') return;
    var type = types[segments[2]];
    if (!type) return;

    return {
      rss: 'http://api.viewreview.org/rss/' + type + '?id=' + id,
      json: 'http://api.viewreview.org/json/' + type + '?id=' + id
    }
  }
})();