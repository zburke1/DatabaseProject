<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';

if(!isset($_SESSION['user_id'])){
	$userIdStored = $_POST['userId'];
	$password_stored = $_POST['password'];
	
	if(isset($_POST['userId']) && isset($_POST['password'])){
 	$query = "SELECT userId,name,address,orderId,is_staff,email from usr where userId='$userIdStored' AND password='$password_stored'";
	$result = mysqli_query($connection, $query) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;	
    }
	$num_rows = $result->num_rows;
	if($num_rows==1){
		session_start();
	    $_SESSION['user_id'] = $_POST['user_id'];
		
		echo json_encode($emparray);
	}
	else{
		echo json_encode($emparray);
	}
}
 else{
	 echo "Search Failed";
 }   
}
else{
  	$emparray = array();
	echo json_encode("1");
}
?>