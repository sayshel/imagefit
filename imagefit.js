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

				var rtime = new Date(1, 1, 2000, 12, 0, 0);
				var timeout = false;
				var delta = 200;
				$(window).resize(function() {
					rtime = new Date();
					if (timeout === false) {
						timeout = true;
						setTimeout(resizeend, delta);
					}
				});

				function resizeend() {
					if (new Date() - rtime < delta) {
						setTimeout(resizeend, delta);
					} else {
						timeout = false;
						plugin.fit( div );
					}               
				}
			});

		},

		fit: function( el ) {

			var elWidth = el.width();
			var elHeight = el.height();

			var img = el.find('img');

			img.css({
				'margin': '0'
			});

			var imgElem = new Image();
			imgElem.src = img.attr('src');

			if(!plugin.settings.maximize && (imgElem.width < elWidth || imgElem.height < elHeight))
			{
				if(plugin.settings.centered)
				{
					img.css({
						'margin-left': '' + (elWidth/2 - img.width()/2) + 'px',
						'margin-top': '' + (elHeight/2 - img.height()/2) + 'px'
					});
				}
				return;
			}

			img.height('auto');
			img.width(elWidth);
			if(img.height() < elHeight)
			{
				img.width('auto');
				img.height(elHeight);
			}

			if(plugin.settings.centered)
			{
				if(img.width() > elWidth)
				{
					img.css({
						'margin-left': '-' + ((img.width() - elWidth)/2) + 'px'
					});
				}
				else if(img.height() > elHeight)
				{
					img.css({
						'margin-top': '-' + ((img.height() - elHeight)/2) + 'px'
					});
				}
			}

			delete imgElem;	
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