<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'configUsr.php';
if(isset($_POST['isStaff'])){
	$OrderId = $_POST['OrderId'];
	$paid = $_POST['paid'];
	
$sql = "UPDATE orders SET paid=$paid WHERE OrderId='$OrderId'";

if (mysqli_query($connection, $sql) ) {
    echo json_encode('1');
} else {
    echo "Error updating record: " . mysqli_error($conn);
}
}
else{
	echo json_encode('User is not staff');
}

?>