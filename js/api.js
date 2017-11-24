(function($) {


    $( '.new-quote-button' ).on( 'click', function (e) {
      e.preventDefault();
      
      $('#quote-content').empty();  
      $('#quote-title').empty();

      $.ajax( {
        method: 'GET',
        url: api_vars.root_url + 'wp/v2/posts/?filter[orderby]=rand&filter[posts_per_page]=1',
      })
      .done( function(data) {

          var slug = data[0].slug;
          var post = data.shift(); // The data is an array of posts. Grab the first one.
            
          $( '#quote-title' ).text( post.title.rendered );
          $( '#quote-content' ).html( post.content.rendered );
          // $( '#quote-content' ).html( post.content.rendered );
          
          $( '.hentry' ).append( history.pushState(null, null, slug) );

          if (data._qod_quote_source){
          $('.source').html('<a href="' + post._qod_quote_source_url + '">' + post._qod_quote_source + '</a>');
          }

          // .fail
          //     console.log(post);
          // });
        });
      
      });
      
//submit new post
  
      $( '#submit-quote-button' ).on( 'click', function ( e ) {

        e.preventDefault();
        
        var quoteAuthor =$('#quote-author').val();
        var quoteContent =$('#quote-content').val();
        var quoteSource =$('#quote-source').val();
        var quoteSourceUrl =$('#quote-source-url').val();
        
        // console.log(quoteAuthor);

  
        // $('#quote-content').empty();
        // $('#quote-title').empty();
  
        $.ajax( {
          method: 'POST',
          url: api_vars.root_url + 'wp/v2/posts',
          data: {
            title: quoteAuthor,
            content: quoteContent,
            _qod_quote_source: quoteSource,
            _qod_quote_source_url: quoteSourceUrl,
            status: 'publish'
          },
          
          beforeSend: function(xhr) {
            xhr.setRequestHeader( 'X-WP-Nonce', api_vars.nonce );
          }
          
        }).done( function() {
      
          // var post = data.shift(); // The data is an array of posts. Grab the first one.
          // $( '#quote-title' ).text( post.title.rendered );
          // $( '#quote-content' ).html( post.content.rendered );
          
          //       // console.log(post);
        }).always(function() {
          $('#quote-submission-form').trigger('reset');
        });

      }); // end of $( '#submit-quote-button' ).on( 'click'
 
  
  

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



















})(jQuery);