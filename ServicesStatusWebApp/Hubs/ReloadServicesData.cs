using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using ServiceStatusWebApp.Core;
using ServiceStatusWebApp.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServicesStatusWebApp.Hubs
{
    public class ReloadServicesData : Hub
    {
        private readonly IConfiguration config;
        private readonly IServiceData serviceData;

        public ReloadServicesData(IConfiguration config, IServiceData serviceData)
        {
            this.config = config;
            this.serviceData = serviceData;
        }
        public async Task ReloadServices()
        {
            var Services = serviceData.GetAndParseServices();
            var status = true;
            foreach (var service in Services)
            {
                if (service.Status == StatusType.Problem)
                {
                    status = false;
                    break;
                }
            }
            await Clients.All.SendAsync("ReloadServices", Services, status);
        }
    }
}
