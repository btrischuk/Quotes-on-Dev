// (function($){

  (function( $ ) {
    $( '#new-quote-button' ).on( 'click', function ( e ) {
      e.preventDefault();

      $('#quote-content').empty();
      $('#quote-title').empty();

      $.ajax( {
        method: 'get',
        url: api_vars.root_url + 'wp/v2/posts/?filter[orderby]=rand&filter[posts_per_page]=1',
        data: {
        comment_status: 'closed'
        },
      beforeSend: function(xhr) {
        xhr.setRequestHeader( 'X-WP-Nonce', api_vars.wpapi_nonce );
      }
      })

      .done( function(data) {
        $.ajax( {
          success: (function () {
            var post = data.shift(); // The data is an array of posts. Grab the first one.
            $( '#quote-title' ).text( post.title ),
            $( '#quote-content' ).html( post.content );
        
              console.log(post);
          })
        });
    });
  })  
})(jQuery);



     // $.ajax( {
      //   url: 'http://localhost:3000/wpsandbox/wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      //   success: function ( data ) {
      //     var post = data.shift(); // The data is an array of posts. Grab the first one.
      //     $( '#quote-title' ).text( post.title );
      //     $( '#quote-content' ).html( post.content );

      //     console.log(post);

      //     // If the Source is available, use it. Otherwise hide it.
      //     if ( typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined' ) {
      //       $( '#quote-source' ).html( 'Source:' + post.custom_meta.Source );
      //     } else {
      //       // $( '#quote-source' ).text( '' );
      //     }


          
          // .done(function (data) {
          //   clear;
          // }            
        // },
        // cache: false
      // } );
    // } );
  // } );