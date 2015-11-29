<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';

$userIdStored = $_POST['userId'];
$userName = $_POST['name'];
$userAddress = $_POST['address'];
$userEmail = $_POST['email'];
$password_stored = $_POST['password'];
$is_staff = $_POST['is_staff'];
 
if(isset($_POST['password']) && !isset($_POST['deleteAccount']) && !isset($_POST['is_staff'])){
$sql = "UPDATE usr SET name='$userName',address='$userAddress',email='$userEmail',password='$password_stored' WHERE userId='$userIdStored'";

if (mysqli_query($connection, $sql) ) {
    echo json_encode('1');
} else {
    echo "Error updating record: " . mysqli_error($conn);
}
}
else if(!isset($_POST['password']) && !isset($_POST['deleteAccount']) && !isset($_POST['is_staff'])){
	$sql = "UPDATE usr SET name='$userName',address='$userAddress',email='$userEmail' WHERE userId='$userIdStored'";

	if (mysqli_query($connection, $sql)) {
	    echo json_encode('1');
	} else {
	    echo "Error updating record: " . mysqli_error($conn);
	}
}
else if(isset($_POST['deleteAccount'])){
	$sqlDelete = "DELETE FROM usr WHERE userId='$userIdStored'";

	if ($connection->query($sqlDelete) === TRUE) {
	    echo json_encode('3');
	} else {
	   echo json_encode('4') ;
	}
}
else if(isset($_POST['is_staff'])){
	$sql = "UPDATE usr SET name='$userName',address='$userAddress',email='$userEmail', is_staff=$is_staff WHERE userId='$userIdStored'";

	if (mysqli_query($connection, $sql)) {
	    echo json_encode('1');
	} else {
	    echo "Error updating record: " . mysqli_error($conn);
	}
}
?>