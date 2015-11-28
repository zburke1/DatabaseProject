<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';
	$userIdStored = $_GET['userId'];
	$userName = $_GET['name'];
	$userAddress = $_GET['address'];
	$userEmail = $_GET['email'];
	$password_stored = $_GET['password'];
	
	//mysql_select_db("dbFinal");
	$sql = "INSERT INTO usr (userId,name,address,is_staff,email,password) VALUES('$userIdStored', '$userName', '$userAddress',0,'$userEmail','$password_stored')";
// 	//$sql = "INSERT INTO usr (userId,name,address,is_staff,email,password) VALUES('$userIdStored', '$userName', '$userAddress',0,'$userEmail','$password_stored')";
	if ($connection->query($sql) === TRUE) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
?>