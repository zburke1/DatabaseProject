<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'configUsr.php';

$userAccount = $_GET['userId'];

$query = "SELECT orders.*, contains.*, product.name AS productNAME, product.price AS productPRICE from orders INNER JOIN contains ON contains.OrId=orders.OrderId INNER JOIN product ON contains.productId=product.prodId where orders.userId='$userAccount'";

$result = mysqli_query($connection, $query) or die("Error in Selecting " . mysqli_error($connection));
$emparray = array();
while($row =mysqli_fetch_assoc($result)){
    $emparray[] = $row;	
}
echo json_encode($emparray);
?>