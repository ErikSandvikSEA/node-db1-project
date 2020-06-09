-- Database Queries

-- Find all customers with postal code 1010
SELECT * FROM Customers WHERE PostalCode = '1010' limit 3

-- Find the phone number for the supplier with the id 11
SELECT * FROM Suppliers WHERE SupplierID = '11'
--SupplierID	SupplierName	ContactName	Address	City	PostalCode	Country	Phone
--11	Heli Süßwaren GmbH & Co. KG	Petra Winkler	Tiergartenstraße 5	Berlin	10785	Germany	(010) 9984510


-- List first 10 orders placed, sorted descending by the order date
SELECT * FROM Orders ORDER BY OrderDate desc limit 10


-- Find all customers that live in London, Madrid, or Brazil
SELECT * FROM Customers WHERE Country = 'Brazil' or City in ('Madrid', 'London')

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
INSERT INTO Customers ('CustomerName', 'ContactName', 'Address', 'City', 'PostalCode', 'Country') VALUES ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth')

-- Update Bilbo Baggins record so that the postal code changes to "11122"
UPDATE Customers SET PostalCode = '11122' where CustomerName = 'The Shire'

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
SELECT COUNT (DISTINCT(City)) FROM Customers


-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
SELECT * FROM Suppliers WHERE length(SupplierName) > 20