<?php
require_once(dirname(__file__) . '/app/library/ctrl_gpio.php');

$controllerGPIOSensor = new ControllerGPIO;

$controllerGPIOSensor -> initGPIO();
$statusSensor = $controllerGPIOSensor -> getStatusGPIO();

$modeSenseImmediate = false;
$paramModeSenseImmediate = htmlspecialchars($_GET['mode'], ENT_QUOTES, 'UTF-8');
if(!empty($paramModeSenseImmediate) && $paramModeSenseImmediate === 'immediate') {
	$modeSenseImmediate = true;
}
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,user-scalable=yes">

<title data-text_src="使用中？">使用中？</title>
<meta name="description" content="人感センサステータス">

<link rel="stylesheet" href="css/common.css">

<link id="favicon" rel="shortcut icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAgAAAABT2jafAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAzOEcogAAAAHdElNRQfhBA8HABiqDFrCAAAAL0lEQVRYw+3KIQEAAAgDsPdPgSblKyARm172YqJpmqZpmqZpmqZpmqZpmqZpP1oB0VXEH2Yu008AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDQtMTVUMTY6MDA6MjQrMDk6MDD9vyh3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA0LTE1VDE2OjAwOjI0KzA5OjAwjOKQywAAAABJRU5ErkJggg==">

<script src="js/lib/jquery-3.2.0.min.js"></script>
<script src="js/refresh.js"></script>
</head>

<body>

<div class="container_content">

<div class="container_indication_status container_indication_status_main">
<span id="indication_status_main" data-indication-status="<?php echo($statusSensor); ?>"><span class="text_status"></span></span>
</div>

<?php if($modeSenseImmediate === true) : ?>
<div class="container_indication_status container_indication_status_sub">
<span id="indication_status_sub" data-indication-status="<?php echo($statusSensor); ?>"><span class="text_status"></span></span>
</div>
<?php endif; ?>

</div>
</body>

</html>
