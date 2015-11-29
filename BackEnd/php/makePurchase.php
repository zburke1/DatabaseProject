<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';
	date_default_timezone_set('EST');
	if(!isset($_POST['contains']) && !isset($_POST['decrement'])){
	$orderId = rand(1,999999);
	$date = date("Y-m-d");
	$userId = $_POST['userId'];
	$paid = 1;
	$sql = "INSERT INTO orders(orderId,userId,dateOrder,paid) VALUES('$orderId', '$userId', '$date',$paid)";

	if (mysqli_query($connection, $sql) ) {
	    //echo json_encode('1');
		echo $orderId;
	} else {
	    //echo "Error: " . $sql . "<br>" . $connection->error;
		 echo json_encode('0');
	}
}
else if(isset($_POST['contains']) && !isset($_POST['decrement'])){
		$orderId = $_POST['orderId'];
		$productId = $_POST['productId'];
		$quantity = $_POST['quantity'];
		
		$sql = "INSERT INTO contains(OrId,productId,quantity) VALUES('$orderId', '$productId', '$quantity')";

		if (mysqli_query($connection, $sql) ) {
		    //echo json_encode('1');
			echo json_encode('1');
		} else {
		    //echo "Error: " . $sql . "<br>" . $connection->error;
			 echo json_encode('0');
		}
}
	//echo $orderId;
	else if(!isset($_POST['contains']) && isset($_POST['decrement'])){
		$productId = $_POST['productId'];
		$quantity = $_POST['stockQuantity'];
		$sqlDec = "UPDATE product SET stockQuantity= stockQuantity - '$quantity' WHERE prodId='$productId'";
		if ($connection->query($sqlDec) === TRUE) {
		    echo json_encode('1');
		} else {
		   echo json_encode('0') ;
		}
		
	}
	
?>