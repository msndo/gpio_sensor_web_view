<?php
require_once(dirname(__file__) . '/app/library/ctrl_gpio.php');
require_once(dirname(__file__) . '/app/library/logging.php');

$controllerGPIOSensor = new ControllerGPIO;
$controllerGPIOSensor -> initGPIO();
$statusImmediate = $controllerGPIOSensor -> getStatusGPIO();

$logging = new Logging;
$statusRanged = $logging -> isGpioActvInRangedTime();

echo(json_encode(array(
	'immediate' => $statusImmediate,
	'ranged' => $statusRanged
)));
?>
