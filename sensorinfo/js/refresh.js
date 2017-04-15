(function($) {
	$(function() {
		$('#indication_status_main').refreshStatus({ keyTypeDataDetection: 'ranged' }).applyStatusToFavicon();
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
			dataTypeForModuleStatus: 'json'
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
				}
			);
		}, settings.interval);

		return this;
	};

	$.fn.applyStatusToFavicon = function(options) {
		var settings = {
			selectorElemFavicon: '#favicon'
		};
		$.extend(settings, options);

		var $elemTextStatus = this;

		if(! $elemTextStatus.length) { return; }

		var $elemFavicon = $(settings.selectorElemFavicon);

		var urlFaviconBusy = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAQMAAAAGz+OhAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX/M3f///9RdG5iAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EEDwY7EwCuBkUAAAAaSURBVEjH7cExAQAAAMKg9U9tDQ+gAACAdwMLuAABXZHjmQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0xNVQxNTo1OToxOSswOTowMCJvpRIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMTVUMTU6NTk6MTkrMDk6MDBTMh2uAAAAAElFTkSuQmCC';
		var urlFaviconFree = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAgAAAABT2jafAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAzOEcogAAAAHdElNRQfhBA8HABiqDFrCAAAAL0lEQVRYw+3KIQEAAAgDsPdPgSblKyARm172YqJpmqZpmqZpmqZpmqZpmqZpP1oB0VXEH2Yu008AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDQtMTVUMTY6MDA6MjQrMDk6MDD9vyh3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA0LTE1VDE2OjAwOjI0KzA5OjAwjOKQywAAAABJRU5ErkJggg==';


		setInterval(function() {
			var textStatus =  $elemTextStatus.text().toLowerCase();
			if(textStatus == 'busy') {
				$elemFavicon.attr('href', urlFaviconBusy);
			}
			else {
				$elemFavicon.attr('href', urlFaviconFree);
			}
		}, 100);

		return this;
	}
})(jQuery);
