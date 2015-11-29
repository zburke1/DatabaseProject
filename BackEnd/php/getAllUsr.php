<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';

$isStaff = $_POST['isStaff'];
if($isStaff==1){
$query = "SELECT userId,name,address,is_staff,email from usr";

$result = mysqli_query($connection, $query) or die("Error in Selecting " . mysqli_error($connection));

//create an array
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