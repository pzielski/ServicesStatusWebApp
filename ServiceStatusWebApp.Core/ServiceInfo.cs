using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ServiceStatusWebApp.Core
{
    public class ServiceInfo
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string CategoryName { get; set; }

        [Required]
        public StatusType Status { get; set; }

        public string ServiceDeskId { get; set; }
    }
}
