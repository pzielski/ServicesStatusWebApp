using System;
using System.ComponentModel.DataAnnotations;

namespace ServiceStatusWebApp.Core
{
    public class Service
    {
        public string Name { get; set; }
        
        public bool Status { get; set; }
    }
}
