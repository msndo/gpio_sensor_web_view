<?php
class Logging {
	private $durationPolling;
	private $pathLog;

	function __construct() {
		$this -> setDurationPolling(20);
		$this -> setPathLog(dirname(__file__) . '/../log/last' . (string)$this -> durationPolling . 'sec.log');
	}

	public function setDurationPolling($rangeInSecond) {
		$this -> durationPolling = $rangeInSecond;
	}

	public function setPathLog($pathLog) {
		$this -> pathLog = $pathLog;
	}

	private function readLogFile() {
		if(file_exists($this -> pathLog)) {
			return file_get_contents($this -> pathLog);
		}

		return '[]';
	}

	public function isGpioActvInRangedTime() {
		$seriesLog = json_decode($this -> readLogFile(), true);
		foreach($seriesLog as $recordLog) {
			if($recordLog['value'] == '1') {
				return '1';
			}
		}

		return '0';
	}

	public function updateLogFile() {
		if(!file_exists($this -> pathLog)) {
			if(file_put_contents($this -> pathLog, '') === null) {
				echo 'File IO Error' . "\n";
				exit;
			}
		}

		$seriesLog = json_decode($this -> readLogFile(), true);
		$timestampCurrent = time();

		$controllerGPIOSensor = new ControllerGPIO;
		$seriesLog[] = array(
			'timestamp' => $timestampCurrent,
			'value' => $controllerGPIOSensor -> getStatusGPIO()
		);

		while($seriesLog[0]['timestamp'] < ($timestampCurrent - $this -> durationPolling)) {
			array_shift($seriesLog);
		}

		file_put_contents($this -> pathLog, json_encode($seriesLog));
	}
}
?>
