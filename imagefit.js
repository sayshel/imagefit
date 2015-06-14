(function( $ ){

	var plugin = {

		settings: {},

		init : function( options ) { 

			plugin.settings = $.extend( {
				maximize			: false,
				centered			: true
			}, options);

			return this.each(function(){
				var div = $(this);
				div.css('overflow', 'hidden');
				plugin.fit( div );
				$( window ).on('resize', function(){
					plugin.fit( div );
				})
			});

		},

		fit: function( div ) {

			var divWidth = div.width();
			var divHeight = div.height();

			var img = div.find('img');
			var imgWidth = img.width();
			var imgHeight = img.height();

			img.css({
				'margin': '0'
			});

			var imgElem = new Image();
			imgElem.src = img.attr('src');

			if(!plugin.settings.maximize && (imgElem.width < divWidth || imgElem.height < divHeight))
			{
				if(plugin.settings.centered)
				{
					img.css({
						'margin-left': '' + (divWidth/2 - img.width()/2) + 'px',
						'margin-top': '' + (divHeight/2 - img.height()/2) + 'px'
					});
				}
				return;
			}

			img.height('auto');
			img.width(divWidth);
			if(img.height() < divHeight)
			{
				img.width('auto');
				img.height(divHeight);
			}

			if(plugin.settings.centered)
			{
				if(img.width() > divWidth)
				{
					img.css({
						'margin-left': '-' + ((img.width() - divWidth)/2) + 'px'
					});
				}
				else if(img.height() > divHeight)
				{
					img.css({
						'margin-top': '-' + ((img.height() - divHeight)/2) + 'px'
					});
				}
			}	

		}
	};

	$.fn.imageFit = function( method ) {

		if ( typeof method === 'object' || ! method ) {
			return plugin.init.apply( this, arguments );
		}
		else
		{
			$.error( 'Incorrect ImageFit initialization!' );
		}

	};

})( jQuery );