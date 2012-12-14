using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVVMWeb.Models
{
    public static class OrdersHelper
    {
        private static IList<Order> _instance;

        public static IList<Order> Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new List<Order>()
                    {
                        new Order(){ OrderId = 1, OrderNumber = "12345", ShipName = "John Gully", ShipAddress = "108 N. Bend Ct.", ShipCity = "Waco", ShipState = "TX", ShipZip = "76712", OrderDate = new DateTime(2012, 12, 29), RequiredDate = new DateTime(2013, 01, 31), ShipDate = null },
                        new Order() { OrderId = 2, OrderNumber = "23456", ShipName = "Elaina Gully", ShipAddress = "4444 Ballymena Dr.", ShipCity = "Frisco", ShipState = "TX", ShipZip = "75034", OrderDate = new DateTime(2012, 10, 03), RequiredDate = new DateTime(2012, 11, 01), ShipDate = new DateTime(2012, 10, 15) }
                    };
                }

                return _instance;
            }
        }

        public static Order UpdateOrder(Order order)
        {
            var existingOrder = OrdersHelper.Instance.FirstOrDefault(o => o.OrderId == order.OrderId);
            existingOrder.OrderDate = order.OrderDate;
            existingOrder.OrderNumber = order.OrderNumber;
            existingOrder.RequiredDate = order.RequiredDate;
            existingOrder.ShipAddress = order.ShipAddress;
            existingOrder.ShipCity = order.ShipCity;
            existingOrder.ShipDate = order.ShipDate;
            existingOrder.ShipName = order.ShipName;
            existingOrder.ShipState = order.ShipState;
            existingOrder.ShipZip = order.ShipZip;

            return existingOrder;
        }
    }
}