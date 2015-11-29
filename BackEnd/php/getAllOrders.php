<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';

$staff = $_POST['isStaff'];

if(isset($_POST['isStaff'])){
$query = "SELECT orders.* from orders";

$result = mysqli_query($connection, $query) or die("Error in Selecting " . mysqli_error($connection));
$emparray = array();
while($row =mysqli_fetch_assoc($result)){
    $emparray[] = $row;	
}
echo json_encode($emparray);
}
else{
	echo json_encode('0');
}
?>