using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.Extensions.Configuration;
using ServiceStatusWebApp.Core;

namespace ServiceStatusWebApp.Data
{
    public class TxtServiceData : IServiceData
    {
        private readonly IConfiguration config;

        public TxtServiceData(IConfiguration config)
        {
            this.config = config;
        }
        public IEnumerable<ServiceCategory> GetAndParseServices()
        {
            var servicesList = GetServicesList();
            var problematicServices = GetProblematicServices();
            foreach (var service in servicesList)
            {
                if(problematicServices.Contains(new Tuple<string, string>(service.CategoryName, service.Name)))
                {
                    service.Status = StatusType.Problem;
                }
            }
            var categories = from r in servicesList
                             group new { r.Name, r.Status } by r.CategoryName into c
                             select new ServiceCategory { Name = c.Key, Services = c.Select(x => new Service() { Name = x.Name, Status = x.Status }).ToList() };
            return categories;
        }
        private IEnumerable<ServiceInfo> GetServicesList()
        {
            var Services = new List<ServiceInfo>();
            var fileName = config["serviceListFile"];
            FileStream fileStream = new FileStream(fileName, FileMode.Open);
            string line;
            string[] elements;
            using (StreamReader reader = new StreamReader(fileStream))
            {
                while((line = reader.ReadLine()) != null){
                    elements = line.Split(';');
                    Services.Add(new ServiceInfo()
                    {
                        CategoryName = elements[0],
                        Name = elements[1],
                        Status = StatusType.Alright
                    });
                }
            }
            return Services;
        }

        private List<Tuple<string, string>> GetProblematicServices()
        {
            var services = new List<Tuple<string, string>>();
            var fileName = config["problematicServicesFile"];
            FileStream fileStream = new FileStream(fileName, FileMode.Open);
            string line;
            string[] elements;
            using (StreamReader reader = new StreamReader(fileStream))
            {
                while ((line = reader.ReadLine()) != null)
                {
                    elements = line.Split(';');
                    services.Add(new Tuple<string, string>(elements[0], elements[1]));
                }
            }
            return services;
        }
    }
}
