
function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text('');
  $nytElem.text('');

  // get the data from the form
  var $street = $('#street').val();
  var $city = $('#city').val();
  var address = $street + ', ' + $city;

  $greeting.text('So, you want to live at ' + address + '?');

  var mapsURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;

  // load streetview
  $body.append('<img class="bgimg" src=' + mapsURL + '>');

  // NYTimes AJAX request
  var nytURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  nytURL += '?' + $.param({
    'api-key': "0a325e9572f4446abdb9e2075802402b",
    'q': $city
  });
  $.getJSON(nytURL, function(data) {
    var link, text;
    $.each(data.response.docs, function() {
      link = '<a href="' + this.web_url + '">' + this.headline.main + '</a>';
      if (this.abstract === null) {
        text = '';
      } else {
        text = '<p>' + this.abstract + '</p>';
      }
      $nytElem.append('<li class="article">' + link + text + '</li>')
    });
  }).error(function() {
      $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

  // Wikipedia AJAX request
  var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + $city + '&format=json&callback=wikiCallback';

  var wikiRequestTimeout = setTimeout(function() {
    $wikiElem.text("failed to get wikipedia resources");
  }, 8000);

  $.ajax( {
    url: wikiURL,
    dataType: 'jsonp',
  } ).done( function(data) {
    for (var i = 0, max = data[1].length; i < max; i++) {
      link = '<a href="' + data[3][i] + '">' + data[1][i] + '</a>';
      $wikiElem.append('<li>' + link + '</li>')
    }
    clearTimeout(wikiRequestTimeout);
  });

  return false;
};

$('#form-container').submit(loadData);
