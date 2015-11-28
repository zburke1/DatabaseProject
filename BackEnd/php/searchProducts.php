<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';
	
	$product = $_GET['ProductName'];
	$sql = "SELECT * from product WHERE (lower(name) LIKE '%$product%') ORDER BY price ASC";
	$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
	
    echo json_encode($emparray);
	
	
?>