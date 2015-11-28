<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';
	$userIdStored = $_POST['userId'];
	$userName = $_POST['name'];
	$userAddress = $_POST['address'];
	$userEmail = $_POST['email'];
	$password_stored = $_POST['password'];
	
	$check_sql = "SELECT * FROM usr WHERE userId='$userIdStored'";
	$result = mysqli_query($connection, $check_sql) or die("Error in Selecting " . mysqli_error($connection));
	$num_rows = $result->num_rows;
	if($num_rows<1){
	//mysql_select_db("dbFinal");
	$sql = "INSERT INTO usr (userId,name,address,is_staff,email,password) VALUES('$userIdStored', '$userName', '$userAddress',0,'$userEmail','$password_stored')";
// 	//$sql = "INSERT INTO usr (userId,name,address,is_staff,email,password) VALUES('$userIdStored', '$userName', '$userAddress',0,'$userEmail','$password_stored')";
	if ($connection->query($sql) === TRUE) {
	    echo json_encode('1');
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
}
else{
	echo json_encode('2');
}
?>