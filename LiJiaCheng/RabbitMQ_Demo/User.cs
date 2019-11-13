using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.Commands;

namespace RabbitMQ_Demo
{
    [Serializable]
    public class User
    {
        public string name { get; set; }
        public int age { get; set; }
        public bool sex { get; set; }
    }

    [Serializable]
    public class QueueObj
    {
        public Guid? id { get; set; }
        public string tag { get; set; }
        public object data { get; set; }
    }
}
