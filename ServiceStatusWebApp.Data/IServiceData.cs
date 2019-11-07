using ServiceStatusWebApp.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceStatusWebApp.Data
{
    public interface IServiceData
    {
        IEnumerable<ServiceInfo> GetRawServices();
        IEnumerable<ServiceCategory> GetAndParseServices();

    }
}
