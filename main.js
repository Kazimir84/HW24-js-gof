let billy = (function() {
  let text = 'Billy to Rose: Hello Rose this is Billy, I understand you and run away! Godluck!';

  return {
    sendMessage: function() {
      return text;
    }
  }
})();

let jack = (function() {
  let text = "Jack to Rose: Hello Rose this is Jack. let's to be together!";

  return {
    sendMessage: function() {
      return text;
    }
  }
})();

let rose = (function() {
  let text = 'Rose to Billy: Hello Billy I am with Jack now - Run Billy, Run!';

  return {
    sendMessage: function() {
      return text;
    }
  }
})();

// =============================================================
(function( $ ) {
  var o = $( {} );

  $.each({
      trigger: 'publish',
      on: 'subscribe',
      off: 'unsubscribe'
  }, function( key, val ) {
      jQuery[val] = function() {
          o[key].apply( o, arguments );
      };
  });
})( jQuery );

$('button').on('click', function() {
  $.publish( 'Jack-Message', { results: [ {text: jack.sendMessage()}] } );
  setTimeout(function() { 
    $.publish( 'Rose-Message', { results: [ {text: rose.sendMessage()}] } );
  }, 4000);
  setTimeout(function() {
    $.publish( 'Billy-Message', { results: [ {text: billy.sendMessage()}] } );
  }, 8000)
});

$.subscribe( 'Jack-Message', function( e, results ) {
  $('body').html(
    $.map( results.results, function( obj, index) {
        return '<li>' + obj.text + '</li>';
    }).join('')
  );

  $.subscribe( 'Rose-Message', function( e, results ) {
    $('body').html(
      $.map( results.results, function( obj, index) {
          return '<li style="background-color: red">' + obj.text + '</li>';
      }).join('')
    );
  })
  $.subscribe( 'Billy-Message', function( e, results ) {
    $('body').html(
      $.map( results.results, function( obj, index) {
          return '<li style="background-color: yellow">' + obj.text + '</li>';
      }).join('')
    );
  })
});
