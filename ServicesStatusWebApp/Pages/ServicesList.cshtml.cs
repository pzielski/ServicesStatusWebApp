using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ServiceStatusWebApp.Core;

namespace ServicesStatusWebApp.Pages
{
    public class ServicesListModel : PageModel
    {
        public IEnumerable<ServiceCategory> ServiceCategories { get; set; }
        public void OnGet()
        {

        }
    }
}