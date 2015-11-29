<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';
	$prodId = $_POST['prodId'];
	
	$sqlDelete = "DELETE FROM product WHERE prodId='$prodId'";

	if ($connection->query($sqlDelete) === TRUE) {
	    echo json_encode('1');
	} else {
	   echo json_encode('0') ;
	}

?>