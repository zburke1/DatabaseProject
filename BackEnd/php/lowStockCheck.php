<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';
if(isset($_POST['isStaff']) && isset($_POST['lowCheck'])){
$query = "SELECT product.*,supplier.name AS supplierName from product INNER JOIN supplier ON product.supplyID=supplier.supplierId where stockQuantity<10";

$result = mysqli_query($connection, $query) or die("Error in Selecting " . mysqli_error($connection));
$emparray = array();
while($row =mysqli_fetch_assoc($result)){
    $emparray[] = $row;	
}
echo json_encode($emparray);
}
else if(isset($_POST['isStaff']) && !isset($_POST['lowCheck']) && isset($_POST['searchAll'])){
	$query = "SELECT product.*, supplier.name AS supplierName from product INNER JOIN supplier ON product.supplyID=supplier.supplierId";

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