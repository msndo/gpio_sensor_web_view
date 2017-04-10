(function($) {
	$(function() {
		$('#indication_status_main').refreshStatus({ keyTypeDataDetection: 'ranged' });
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
	};
})(jQuery);
