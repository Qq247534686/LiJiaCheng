using MongoRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MongoDbDemo
{
    public class ConfigInfo : IEntity
    {
        public ConfigInfo()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }
        public string desc { get; set; }
        public string name { get; set; }
        public string value { get; set; }

    }
}
