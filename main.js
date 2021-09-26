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
// ==========================================================

let rose = {

  initListeners: function(){
    $.subscribe('Jack-Rose', function(){
      console.group('Jack to Rose')
      console.log("Message > Jack to Rose: Hello Rose this is Jack. let's to be together!");
      console.groupEnd();
      $.publish('Rose-Jack');
      $.publish('Rose-Billy');         
    }),
    $.subscribe('Billy-Rose', function() {
      console.group('Billy to Rose')
      console.log("Message > Billy to Rose: Hello Rose this is Billy, I understand you and run away! Godluck!");
      console.groupEnd();
    });
  }
};

let jack = {
  message: 'Jack-Rose',
  notify: function(){
    $.publish(this.message);
  },
  initListeners: function(){
    $.subscribe('Rose-Jack', function(){
      console.group('Rose to Jack');
      console.log('Message > Rose to Jack: Ok, gladly!');
      console.groupEnd();
    });
  }
};

let billy = {

  initListeners: function(){
    $.subscribe('Rose-Billy', function(){
      console.group('Rose to Billy')
      console.log('Message > Rose to Billy: Hello Billy I am with Jack now - Run Billy, Run!');
      console.groupEnd();
      $.publish('Billy-Rose');
    });
  }
};


$('button').on('click', function() {
  rose.initListeners();
  billy.initListeners();
  jack.initListeners();
  jack.notify();
});



































// let $billy = (function() {
//   let $text = 'Message > Billy to Rose: Hello Rose this is Billy, I understand you and run away! Godluck!';

//   return {
//     $sendMessage: function() {
//       $.subscribe( 'Billy-Message', function() {        
//         console.group('PubSub Billy');
//         console.log('Billy send message > ', $text);
//         console.groupEnd();
//       })
//     }
//   }
// })();

// let $jack = (function() {
//   let $text = "Message > Jack to Rose: Hello Rose this is Jack. let's to be together!";

//   return {
//     $sendMessage: function() {
//       $.subscribe( 'Jack-Message', function() {      
//           console.group('PubSub Jack');
//           console.log('Jack send message > ', $text);
//           console.groupEnd();       
//       });
//     }
//   }
// })();

// let $rose = (function() {
//   let $textBilly = 'Message > Rose to Billy: Hello Billy I am with Jack now - Run Billy, Run!';
//   let $textJack = 'Message > Rose to Jack: Ok, gladly!';

//   return {
//     $sendMessageBilly: function() {
//       $.subscribe( 'Rose-Message-Billy', function() {        
//         console.group('PubSub Rose');
//         console.log('Rose send message > ', $textBilly);
//         console.groupEnd();
//       })
//     },
//     $sendMessageJack: function() {
//       $.subscribe( 'Rose-Message-Jack', function() {        
//         console.group('PubSub Rose');
//         console.log('Rose send message > ', $textJack);
//         console.groupEnd();
//       })
//     }
//   }
// })();

// ========================Pub/Sub=====================================
// (function( $ ) {
//   var o = $( {} );

//   $.each({
//       trigger: 'publish',
//       on: 'subscribe',
//       off: 'unsubscribe'
//   }, function( key, val ) {
//       jQuery[val] = function() {
//         o[key].apply( o, arguments );
//       };
//   });
// })( jQuery );

// $('button').on('click', function() {
//   $.publish( 'Jack-Message', { results: [ {text: $jack.$sendMessage()}] } ); 
//   $.publish( 'Rose-Message-Jack', { results: [ {text: $rose.$sendMessageJack()}] } );
//   $.publish( 'Rose-Message-Billy', { results: [ {text: $rose.$sendMessageBilly()}] } );  
//   $.publish( 'Billy-Message', { results: [ {text: $billy.$sendMessage()}] } );
// });

// ================================================
// ======================================================================================
// let billy = (function() {
//   let text = 'Message > Billy to Rose: Hello Rose this is Billy, I understand you and run away! Godluck!';

//   return {
//     sendMessage: function() {
//       return text;
//     }
//   }
// })();

// let jack = (function() {
//   let text = "Message > Jack to Rose: Hello Rose this is Jack. let's to be together!";

//   return {
//     sendMessage: function() {
//       return text;
//     }
//   }
// })();

// let rose = (function() {
//   let textBilly = 'Message > Rose to Billy: Hello Billy I am with Jack now - Run Billy, Run!';
//   let textJack = 'Message > Rose to Jack: Ok, gladly!';

//   return {
//     sendMessageBilly: function() {
//       return textBilly;
//     },
//     sendMessageJack: function() {
//       return textJack;
//   }
// }
// })();

// // ========================Pub/Sub=====================================
// (function( $ ) {
//   var o = $( {} );

//   $.each({
//       trigger: 'publish',
//       on: 'subscribe',
//       off: 'unsubscribe'
//   }, function( key, val ) {
//       jQuery[val] = function() {
//           o[key].apply( o, arguments );
//       };
//   });
// })( jQuery );

// $('button').on('click', function() {
//   $.publish( 'Jack-Message', { results: [ {text: jack.sendMessage(rose)}] } );
//   setTimeout(function() { 
//     $.publish( 'Rose-Message-Billy', { results: [ {text: rose.sendMessageBilly(billy)}] } );
//   }, 9000);
//   setTimeout(function() { 
//     $.publish( 'Rose-Message-Jack', { results: [ {text: rose.sendMessageJack(jack)}] } );
//   }, 5000);
//   setTimeout(function() {
//     $.publish( 'Billy-Message', { results: [ {text: billy.sendMessage(rose)}] } );
//   }, 13000)
// });

// $.subscribe( 'Jack-Message', function( e, results ) {
//   $('body').html(
//     $.map( results.results, function( obj, index) {
//         return '<li>' + obj.text + '</li>';
//     }).join('')
//   );
// });
// $.subscribe( 'Rose-Message-Billy', function( e, results ) {
//   $('body').html(
//     $.map( results.results, function( obj, index) {
//         return '<li style="background-color: red">' + obj.text + '</li>';
//     }).join('')
//   );
// });
// $.subscribe( 'Rose-Message-Jack', function( e, results ) {
//   $('body').html(
//     $.map( results.results, function( obj, index) {
//         return '<li style="background-color: deeppink">' + obj.text + '</li>';
//     }).join('')
//   );
// });
// $.subscribe( 'Billy-Message', function( e, results ) {
//   $('body').html(
//     $.map( results.results, function( obj, index) {
//         return '<li style="background-color: yellow">' + obj.text + '</li>';
//     }).join('')
//   );
//  setTimeout(() => {
//   location.reload(false);
//  }, 5000) 
// });


// ============================================================================

// class PubSub {
//   constructor() {
//       this.handlers = [];
//   }
//   subscribe(event, handler, context) {
//       if (typeof context === 'undefined') { context = handler; }
//       this.handlers.push({ event: event, handler: handler.bind(context) });
//   }
//   publish(event, args) {
//       this.handlers.forEach((topic) => {
//           if (topic.event === event) {
//               topic.handler(args)
//           }
//       })
//   }
// }
// class Billy {
//   constructor() {
//     this.pubsub = new PubSub();
//     this.pubsub.subscribe('message', this.emitMessage, this);
//   }
//   emitMessage(msg) {
//     console.group('PubSub Billy');
//     console.log('Billy send message > ', msg);
//     console.groupEnd();
//   }
//   sendMessage() {
//     this.pubsub.publish('message', 'Hello Rose this is Billy, I understand you and run away! Godluck!');
//   }
// }

// class Jack {
//   constructor() {
//     this.pubsub = new PubSub();
//     this.pubsub.subscribe('message', this.emitMessage, this);
//   }
//   emitMessage(msg) {
//     console.group('PubSub Jack');
//     console.log('Jack send message > ', msg);
//     console.groupEnd();
//   }
//   sendMessage() {
//     this.pubsub.publish('message', "Hello Rose this is Jack. let's to be together!");
//   }
// }

// class Rose {
//   constructor() {
//     this.pubsub = new PubSub();
//     this.pubsub.subscribe('message', this.emitMessage, this);
//   }
//   emitMessage(msg) {
//     console.group('PubSub Rose');
//     console.log('Rose send message > ', msg);
//     console.groupEnd();
//   }
//   sendMessage() {
//     this.pubsub.publish('message', "Hello Billy I am with Jack now - Run Billy, Run!");
//   }
// }


// let billy = new Billy();
// let jack = new Jack();
// let rose = new Rose();


// $('button').on('click', ()=> {
//   jack.sendMessage(rose);
//   rose.sendMessage(billy);
//   billy.sendMessage(rose);
// });
// ====================================================================
