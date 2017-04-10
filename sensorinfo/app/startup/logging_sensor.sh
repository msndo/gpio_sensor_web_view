#!/bin/sh

su 'pi';

nohup sh -c '/usr/bin/php /var/www/sensorinfo/app/bin/logging_gpio.php' &
