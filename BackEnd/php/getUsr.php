<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';

$userIdStored = $_GET['userName'];
$query = "SELECT userId,name,address,orderId,is_staff,email from usr where userId='$userIdStored'";

$result = mysqli_query($connection, $query) or die("Error in Selecting " . mysqli_error($connection));

//create an array
$emparray = array();
while($row =mysqli_fetch_assoc($result)){
    $emparray[] = $row;	
}
echo json_encode($emparray);
?>