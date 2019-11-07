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

        public StatusType Status {
            get
            {
                var _status = StatusType.Alright;
                foreach(var service in Services)
                {
                    if(service.Status == StatusType.Problem)
                    {
                        _status = StatusType.Problem;
                        break;
                    }
                }
                return _status;
            }
        }
    }
}
