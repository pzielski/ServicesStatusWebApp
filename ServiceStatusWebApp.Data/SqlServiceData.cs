using System;
using System.Collections.Generic;
using System.Text;
using ServiceStatusWebApp.Core;
using System.Linq;

namespace ServiceStatusWebApp.Data
{
    public class SqlServiceData : IServiceData
    {
        private readonly ServiceStatusWebAppDbContext db;

        public SqlServiceData(ServiceStatusWebAppDbContext db)
        {
            this.db = db;
        }
        private IEnumerable<ServiceInfo> GetRawServices()
        {
            var query =  from r in db.ServicesData
                                select r;
            return query;

        }

        public IEnumerable<ServiceCategory> GetAndParseServices()
        {
            var rawServices = GetRawServices();
            var categories = from r in rawServices
                             group new { r.Name, r.Status } by r.CategoryName into c
                             select new ServiceCategory { Name = c.Key, Services = c.Select(x => new Service() { Name = x.Name, Status = x.Status }).ToList() };
            return categories;
        }
    }
}
