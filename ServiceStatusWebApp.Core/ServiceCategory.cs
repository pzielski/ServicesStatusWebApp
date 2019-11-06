using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ServiceStatusWebApp.Core
{
    public class ServiceCategory
    {
        public string Name { get; set; }

        public List<Service> Services { get; set; }

        public bool Status {
            get
            {
                var _status = true;
                foreach(var service in Services)
                {
                    if(service.Status == false)
                    {
                        _status = false;
                        break;
                    }
                }
                return _status;
            }
        }
    }
}
