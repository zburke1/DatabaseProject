<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';
if(isset($_POST['addStock'])){
	$updateBy = $_POST['addStock'];
	$productId = $_POST['prodId'];
	$sql = "UPDATE product SET stockQuantity=stockQuantity + $updateBy WHERE prodId='$productId'";
	if (mysqli_query($connection, $sql) ) {
	    echo json_encode('1');
	} else {
	    echo json_encode('0');
	}
}
else if(isset($_POST['deleteProd'])){
	
}
else{
	echo json_encode('0');
}

?>