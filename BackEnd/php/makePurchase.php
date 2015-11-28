<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';
	date_default_timezone_set('EST');
	$orderId = rand(1,999999);
	$date = date("Y-m-d");
	echo $date;
	//echo $orderId;
	
	
?>