using Microsoft.EntityFrameworkCore;
using ServiceStatusWebApp.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceStatusWebApp.Data
{
    public class ServiceStatusWebAppDbContext : DbContext
    {
        public ServiceStatusWebAppDbContext(DbContextOptions<ServiceStatusWebAppDbContext> options) 
            : base(options)
        {

        }
        public DbSet<ServiceInfo> ServicesData { get; set; }
    }
}
