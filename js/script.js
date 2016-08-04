
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

  var link = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;

  // load streetview
  $body.append('<img class="bgimg" src=' + link + '>');

  // NYTimes AJAX request
  var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  url += '?' + $.param({
    'api-key': "0a325e9572f4446abdb9e2075802402b",
    'q': $city
  });
  $.getJSON(url, function(data) {
    console.log(data.status);
    console.log(data.response.docs);
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

  return false;
};

$('#form-container').submit(loadData);
