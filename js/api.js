(function($) {

  $( '.new-quote-button' ).on( 'click', function (e) {
    e.preventDefault();
     
    $.ajax( {
      method: 'GET',
      url: api_vars.root_url + 'wp/v2/posts/?filter[orderby]=rand&filter[posts_per_page]=1',
    })
    .done( function(data) {

      var slug = data[0].slug;
      var post = data.shift(); // The data is an array of posts. Grab the first one.
      
      var postUrl = homeUrl + '/' + slug; 
      var homeUrl = api_vars.home_url; 
      history.pushState(null, null, postUrl);
            
      $( '#quote-title' ).text( post.title.rendered );
      $( '#quote-content' ).html( post.content.rendered );
          
      $( '.hentry' ).append();
      history.pushState(null, null, slug);

      if (data._qod_quote_source){
        $('.source').html('<a href="' + post._qod_quote_source_url + '">' + post._qod_quote_source + '</a>');
    }
          
    }).fail(function() {
      return 'The submission can not be processed. Try harder next time!';
    });
  });
      
//submit new post
  
  $( '#submit-quote-button' ).on( 'click', function ( e ) {

    e.preventDefault();
        
      var quoteAuthor =$('#quote-author').val();
      var quoteContent =$('#quote-content').val();
      var quoteSource =$('#quote-source').val();
      var quoteSourceUrl =$('#quote-source-url').val();
     
      $.ajax( {
        method: 'POST',
        url: api_vars.root_url + 'wp/v2/posts',
        data: {
          title: quoteAuthor,
          content: quoteContent,
          _qod_quote_source: quoteSource,
          _qod_quote_source_url: quoteSourceUrl,
          status: 'draft'
        },
          
        beforeSend: function(xhr) {
          xhr.setRequestHeader( 'X-WP-Nonce', api_vars.nonce );
        }
          
      }).done( function() {        
        $('.logo').append(alert('Great success!')); //append to element 
      }).always(function() {
        $('#quote-submission-form').trigger('reset');
      }).fail(function() {
        $('body').append(alert ('Something esploded'));
      });

  }); // end of $( '#submit-quote-button' ).on( 'click'


})(jQuery);