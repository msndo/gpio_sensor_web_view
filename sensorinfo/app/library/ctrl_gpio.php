<?php
class ControllerGPIO {
	private $seriesSettingGpio;
	private $isModeDebug = false;
	private $pathTargetIO;

	function __construct() {
		$this -> seriesSettingGpio = (array(
			'pathRootGPIO' => '/sys/class/gpio',
			'filenameExportGPIO' => 'export',
			'ixIO' => 25,
			'filenameIFaceDirection' => 'direction',
			'direction' => 'in',
			'filenameIFaceValue' => 'value'
		));

		$this -> setPathTargetIO();
	}

	function setParamsGPIO($seriesSettingGPIO) {
		$this -> seriesSettingGpio = $seriesSettingGPIO;
	}

	function getParamGPIO() {
		echo json_encode($this -> seriesSettingGpio);
	}

	function setPathTargetIO() {
		$this ->  pathTargetIO =
			$this -> seriesSettingGpio['pathRootGPIO'] . '/' .
			'gpio' . (string)$this -> seriesSettingGpio['ixIO']
		;
	}

	function getPathTargetIO() {
		return $this -> pathTargetIO;
	}

	function initGPIO() {
		$pathInitIO = $this -> seriesSettingGpio['pathRootGPIO'] . '/' . $this -> seriesSettingGpio['filenameExportGPIO'];
		$pathTargetIO = $this -> getPathTargetIO();
		$filenameCtrlDirectionGPIO = $pathTargetIO . '/' . $this -> seriesSettingGpio['filenameIFaceDirection'];
		$filenameCtrlValueGPIO = $pathTargetIO . '/' . $this -> seriesSettingGpio['filenameIFaceValue'];

		if($this -> isModeDebug === true) { echo $pathTarg; return; }

		if(!file_exists($pathTargetIO)) {
			file_put_contents($pathInitIO, $this -> seriesSettingGpio['ixIO']);
			sleep(1);
			file_put_contents($filenameCtrlDirectionGPIO, $this -> seriesSettingGpio['direction']);
			return true;
		}

		return false;
	}

	function getStatusGPIO() {
		$pathTarg = $this -> getPathTargetIO(). '/' . $this -> seriesSettingGpio['filenameIFaceValue'];

		$status = 0;

		if($this -> isModeDebug === true) { echo $pathTarg; return; }

		if(file_exists($pathTarg)) {
			$status = preg_replace('/(?:\n|\r|\r\n)/', '', file_get_contents($pathTarg));
		}

		return $status;
	}

	function setStatusGPIO($value) {
		$pathTarg = $this -> getPathTargetIO(). '/' . $this -> seriesSettingGpio['filenameIFaceValue'];

		if(file_exists($pathTarg)) {
			file_put_contents($pathTarg, $value);
		}
	}

	function setModeDebug($isModeDebug) {
		if(!isset($isModeDebug)) {
			return;
		}

		if($isModeDebug === true) {
			$this -> isModeDebug = true;
			return;
		}

		$this -> isModeDebug = false;
	}
}
?>
