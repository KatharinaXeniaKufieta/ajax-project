
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
  console.log($wikiElem);
  $body.append('<img class="bgimg" src=' + link + '>');

  return false;
};

$('#form-container').submit(loadData);
