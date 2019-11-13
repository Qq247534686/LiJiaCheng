using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RabbitMQ_Demo
{
    public class EnumAttribute : Attribute
    {
        public EnumAttribute(string Name) {
            this.Name = Name;
        }
        public string Name { get; set; }
    }
}
