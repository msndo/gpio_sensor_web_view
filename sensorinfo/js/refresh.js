(function($) {
	$(function() {
		$('#indication_status_main').refreshStatus({ keyTypeDataDetection: 'ranged', applyStatusToPage: true });
		$('#indication_status_sub').refreshStatus();
	});

	$.fn.refreshStatus = function(options) {
		var settings = {
			interval: 1000,
			dataKey: 'data-indication-status',
			selectorElemText: '.text_status',
			textStatusActv: 'Busy',
			textStatusInact: 'Free',
			urlForModuleStatus: 'status_gpio.php',
			keyTypeDataDetection: 'immediate',
			dataTypeForModuleStatus: 'json',
			applyStatusToPage: false
		};
		$.extend(settings, options);

		var $elemTarg = this;
		var $elemText = $elemTarg.find(settings.selectorElemText);

		setInterval(function() {
			$.ajax({
				url: settings.urlForModuleStatus,
				dataType: settings.dataTypeForModuleStatus
			}).then(
				function(json) {
					var status = json[settings.keyTypeDataDetection]
					var textStatus = settings.textStatusInact;

					if(status == '1') { textStatus = settings.textStatusActv; }
					$elemTarg.get(0).setAttribute(settings.dataKey, status);
					$elemText.text(textStatus);

					if(settings.applyStatusToPage) {
						$elemTarg.applyStatusToPage(status);
					}
				}
			);
		}, settings.interval);

		return this;
	};

	$.fn.applyStatusToPage = function(status, options) {
		var settings = {
			selectorElemHtmlTitle: 'title',
			selectorElemFavicon: '#favicon',
			textStatusActv: 'Busy',
			textStatusInact: 'Free',
			urlFaviconBusy: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAQMAAAAGz+OhAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX/M3f///9RdG5iAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EEDwY7EwCuBkUAAAAaSURBVEjH7cExAQAAAMKg9U9tDQ+gAACAdwMLuAABXZHjmQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0xNVQxNTo1OToxOSswOTowMCJvpRIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMTVUMTU6NTk6MTkrMDk6MDBTMh2uAAAAAElFTkSuQmCC',
			urlFaviconFree: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAgAAAABT2jafAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAzOEcogAAAAHdElNRQfhBA8HABiqDFrCAAAAL0lEQVRYw+3KIQEAAAgDsPdPgSblKyARm172YqJpmqZpmqZpmqZpmqZpmqZpP1oB0VXEH2Yu008AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDQtMTVUMTY6MDA6MjQrMDk6MDD9vyh3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA0LTE1VDE2OjAwOjI0KzA5OjAwjOKQywAAAABJRU5ErkJggg=='
		};
		$.extend(settings, options);

		var $elemTextStatus = this;

		if(! $elemTextStatus.length) { return; }

		var $elemHtmlTitle = $(settings.selectorElemHtmlTitle);
		var textHtmlTitleSrc = $elemHtmlTitle.get(0).getAttribute('data-text_src');

		var $elemFavicon = $(settings.selectorElemFavicon);

		var urlFaviconBusy = settings.urlFaviconBusy;
		var urlFaviconFree = settings.urlFaviconFree;


		var textStatus =  $elemTextStatus.text().toLowerCase();
		if(textStatus == 'busy') {
			$elemHtmlTitle.html(settings.textStatusActv + ': ' + textHtmlTitleSrc);
			$elemFavicon.attr('href', urlFaviconBusy);
		}
		else {
			$elemHtmlTitle.html(settings.textStatusInact + ': ' + textHtmlTitleSrc);
			$elemFavicon.attr('href', urlFaviconFree);
		}


		return this;
	}
})(jQuery);
