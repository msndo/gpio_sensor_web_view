<?php
require_once(dirname(__file__) . '/../library/ctrl_gpio.php');

// GPIOコントローラー - LED側
$controllerGPIOLed = new ControllerGPIO;
//$controllerGPIOLed -> setModeDebug(true);

// 初期化されていなければ初期化
$controllerGPIOLed -> setParamsGPIO(
	array(
		'pathRootGPIO' => '/sys/class/gpio',
		'filenameExportGPIO' => 'export',
		'ixIO' => 24,
		'filenameIFaceDirection' => 'direction',
		'direction' => 'out',
		'filenameIFaceValue' => 'value'
	)
);

$controllerGPIOLed -> setPathTargetIO();
$controllerGPIOLed -> initGPIO();

// GPIOコントローラー - センサ側
$controllerGPIOSensor = new ControllerGPIO;

// 初期化されていなければ初期化
//$controllerGPIOSensor -> initGPIO();

// センサ側監視 デーモンループ
while(true) {
	$statusSensor = $controllerGPIOSensor -> getStatusGPIO();

	if($statusSensor == '1') {
		$controllerGPIOLed -> setStatusGPIO('1');
	}
	else {
		$controllerGPIOLed -> setStatusGPIO('0');
	}
}

?>