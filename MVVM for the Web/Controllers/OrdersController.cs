using MVVMWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace MVVMWeb.Controllers
{
    public class OrdersController : ApiController
    {
        // GET api/orders
        public IEnumerable<Order> Get()
        {
            return OrdersHelper.Instance;
        }

        // GET api/orders/1
        public Order Get(int id)
        {
            return OrdersHelper.Instance.FirstOrDefault(o => o.OrderId == id);
        }

        // PUT api/orders
        public Order Put(Order order)
        {
            order.OrderDate = DateTime.Now;
            return OrdersHelper.UpdateOrder(order);
        }
    }
}
