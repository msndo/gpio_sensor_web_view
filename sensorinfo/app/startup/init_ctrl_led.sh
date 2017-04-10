#!/bin/sh

su 'pi';

nohup sh -c '/usr/bin/php /var/www/sensorinfo/app/bin/init_ctrl_led.php' &
