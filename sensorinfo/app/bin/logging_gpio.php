<?php
require_once(dirname(__file__) . '/../library/ctrl.php');
require_once(dirname(__file__) . '/../library/logging.php');

$logging = new Logging;

while(true) {
	$logging -> updateLogFile();
	sleep(1);
}
?>