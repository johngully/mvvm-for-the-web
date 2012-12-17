var server = sinon.fakeServer.create();

// GET /api/orders

server.respondWith("GET", "/api/orders", JSON.stringify([
    { "OrderId": 1, "OrderNumber": "12345", "ShipName": "John Gully", "ShipAddress": "108 N. Bend Ct.", "ShipCity": "Waco", "ShipState": "TX", "ShipZip": "76712", "OrderDate": "2012-12-29T00:00:00", "RequiredDate": "2013-01-31T00:00:00", "ShipDate": null },
    { "OrderId": 2, "OrderNumber": "23456", "ShipName": "Elaina Gully", "ShipAddress": "4444 Ballymena Dr.", "ShipCity": "Frisco", "ShipState": "TX", "ShipZip": "75034", "OrderDate": "2012-10-03T00:00:00", "RequiredDate": "2012-11-01T00:00:00", "ShipDate": "2012-10-15T00:00:00" }
]));

// GET api/orders/1
server.respondWith("GET", "/api/orders/1", JSON.stringify(
    { "OrderId": 1, "OrderNumber": "12345", "ShipName": "John Gully", "ShipAddress": "108 N. Bend Ct.", "ShipCity": "Waco", "ShipState": "TX", "ShipZip": "76712", "OrderDate": "2012-12-29T00:00:00", "RequiredDate": "2013-01-31T00:00:00", "ShipDate": null }
));

// PUT api/orders
server.respondWith("PUT", "/api/orders", [
    200,
    { "Content-Type": "application/json" },
    JSON.stringify({ "OrderId": 1, "OrderNumber": "12345", "ShipName": "John Gully", "ShipAddress": "108 N. Bend Ct.", "ShipCity": "Waco", "ShipState": "TX", "ShipZip": "76712", "OrderDate": "2012-12-29T23:33:27", "RequiredDate": "2013-01-31T00:00:00", "ShipDate": null })
]);
