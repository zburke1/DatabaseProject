<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'configUsr.php';
	$orderId = $_POST['OrderId'];
	
	if(isset($_POST['isStaff'])){
	$sqlDelete = "DELETE FROM orders WHERE OrderId='$orderId'";

	if ($connection->query($sqlDelete) === TRUE) {
	    echo json_encode('1');
	} 
	else {
	   echo json_encode('0') ;
	}
}
	else{
		echo json_encode('User must be staff to delete an object');
	}


?>