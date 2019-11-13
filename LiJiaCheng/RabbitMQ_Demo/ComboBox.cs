using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.Commands;

namespace RabbitMQ_Demo
{
    [Serializable]
    public class ComboBox
    {
        public string id { get; set; }
        public string value { get; set; }
        public string text { get; set; }
    }

    public enum MsgType
    {
        [Enum("One")]
        One,
        [Enum("Tow")]
        Tow,
        [Enum("Three")]
        Three,
    }
}
