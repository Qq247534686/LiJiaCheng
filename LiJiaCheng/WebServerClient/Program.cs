using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace WebServerClient
{
    class Program
    {
        static void Main(string[] args)
        {
            ServiceReference1.Service1Client service = new ServiceReference1.Service1Client();
            var ss=service.GetData(123);
        }
    }
}
