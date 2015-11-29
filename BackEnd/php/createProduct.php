<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';
	$prodId = rand(1,999999);
	$supplyId = $_POST['supplyId'];
	$name = $_POST['name'];
	$pDescription = $_POST['descrip'];
	$quantity = $_POST['quantity'];
	$price = $_POST['price'];
	
	
	
	$check_sql = "SELECT * FROM product WHERE prodId='$prodId'";
	$result = mysqli_query($connection, $check_sql) or die("Error in Selecting " . mysqli_error($connection));
	$num_rows = $result->num_rows;
	if($num_rows<1){

	$sql = "INSERT INTO product (prodId,supplyID,name,description,active,stockQuantity,price) VALUES('$prodId', '$supplyId','$name','$pDescription',1,'$quantity','$price')";
	if ($connection->query($sql) === TRUE) {
	    echo json_encode('1');
	} else {
	    echo $connection->error;
	}
}
else{
	echo json_encode('2');
}

?>