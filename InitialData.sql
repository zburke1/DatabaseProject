use dbFinal;

drop table contains;
drop table orders;
drop table product;
drop table usr;
drop table supplier;

CREATE TABLE supplier(supplierId char(6), name char(30) NOT NULL, PRIMARY KEY(supplierId)); 
CREATE TABLE product(prodId char(6), supplyID char(6),name char(30), description char(50), active BIT, stockQuantity integer, price real, PRIMARY KEY(prodId),FOREIGN KEY(supplyID) references supplier(supplierId));
CREATE TABLE usr(userId char(20),name char(25) NOT NULL,address char(40),is_staff BIT,email char(25),password char(25) NOT NULL,PRIMARY KEY(userId));
CREATE TABLE orders(OrderId char(6),userId char(20),dateOrder date, paid BIT, PRIMARY KEY(OrderId),FOREIGN KEY(userId) references usr(userId)); 


--Weak Entity Set Tables
CREATE TABLE contains(OrId char(6),productId char(6),quantity integer NOT NULL, PRIMARY KEY(OrId,productId));
--CREATE TABLE orders(userId char(6), orderId char(6),OrderId char(6), PRIMARY KEY(userId,orderId,OrId));
--CREATE TABLE supplys(productId char(6),supplierId char(6),supplyId char(6), PRIMARY KEY(productId,supplierId,supplyId));


DELETE FROM product; 
DELETE FROM supplier; 
DELETE FROM orders; 
DELETE FROM usr;

--(supplierId,productId,name)
INSERT INTO supplier VALUES('00000a','Cheap-Cables-R-Us');
INSERT into supplier VALUES('00000b','Net-Works');
INSERT into supplier VALUES('00000c','Screen Shop');

--(prodId,supplyId,name,active,description,stockQuantity,price)
INSERT into product VALUES('000001','00000a','HDMI 25 ft','HDMI Cable - 25 feet',1,'10','30.00');
INSERT into product VALUES('000002','00000a','VGA 15 ft','VGA Cable - 15 feet',1,'50','19.99');
INSERT into product VALUES('000003','00000b','Wireless Router','Wireless router that guarantees GB/s speeds',1,'25','99.99');
INSERT into product VALUES('000004','00000b','25ft Ethernet Cable','25 foot cat5 ethernet cable',1,'100','20.00');
INSERT into product VALUES('000005','00000c','22 inch LED monitor','22inch monitor with vibrant 1080 resolution',1,'8','179.99');
INSERT into product VALUES('000006','00000c','20 inch LED Monitor','Our best priced LED monitor. 20inch screen size',0,'0','99.99');



--(userId,name,address,orderId,is_staff,email,password)
INSERT into usr values('123456','Zachary','123456 Boogaloo Street',0,'zactestemail@gmail.com','1234');
INSERT into usr values('223456','Will','1122 Electric Ave',0,'will@email.com','password');
INSERT into usr values('323456','Nick','Address Madeup',1,'nick@email.com','12345');
INSERT into usr values('423456','James','Madeup Address Dr',0,'james@email.com','123');
INSERT into usr values('523456','Earl','1234 Address Blvd',1,'Earle@email.net','987654321');
INSERT into usr values('zburke1','zac','1234 Address Blvd',1,'zac@email.net','1234');

--(OrderId,dateOrder,prodcutId,paid)
INSERT into orders values('111111','123456','2015-11-03',1);
INSERT into orders values('222222','223456','2015-11-04',1);
INSERT into orders values('333333','323456','2015-11-02',0);
INSERT into orders values('444444','423456','2015-11-02',1);
INSERT into orders values('555555','523456','2015-11-02',1);

--(orderID,productId,prodId,quantity)
INSERT into contains values('111111','000001','3');
INSERT into contains values('111111','000002','1');
INSERT into contains values('111111','000004','1');
INSERT into contains values('111111','000005','1');

INSERT into contains values('222222','000005','1');
INSERT into contains values('222222','000004','5');
INSERT into contains values('222222','000003','1');

INSERT into contains values('333333','000001','4');

INSERT into contains values('444444','000002','4');

INSERT into contains values('555555','000004','10');
INSERT into contains values('555555','000001','3');
INSERT into contains values('555555','000002','10');

--(this check constraint asserts that you cant take an action that would reduce the supply below zero)
ALTER TABLE product
ADD CONSTRAINT NoOverselling
CHECK (stockQuantity > -1);

--This trigger will only allow the staff to delete a product if no one is interested in buying it in the past month.
--Unsure if we need to check if the user attempting the delete is staff?
CREATE TRIGGER DeleteProductTrigger
BEFORE DELETE ON Product
FOR EACH ROW
BEGIN
  IF OLD.prodId = contains.productId AND orders.Orderid = contains.OrId
  AND DATEDIFF (CURDATE(), orders.dateOrder) < 31 THEN
    SIGNAL SQLSTATE '45000' --This is an unhandled user defined exception
    --The custom text that mysql will return if a delete on a product with orders less than a month old is attempted
    SET MESSAGE_TEXT = "Preventing Delete: People are still ordering this product!" 
  END IF;
END
