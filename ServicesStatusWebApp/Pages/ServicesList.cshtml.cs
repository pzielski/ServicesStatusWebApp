using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using ServiceStatusWebApp.Core;
using ServiceStatusWebApp.Data;

namespace ServicesStatusWebApp.Pages
{
    public class ServicesListModel : PageModel
    {
        private readonly IConfiguration config;
        private readonly IServiceData serviceData;

        public IEnumerable<ServiceCategory> ServiceCategories { get; set; }
        public ServicesListModel(IConfiguration config, IServiceData serviceData)
        {
            this.config = config;
            this.serviceData = serviceData;
        }
        public void OnGet()
        {
            ServiceCategories = serviceData.GetAndParseServices();
        }
    }
}