using MongoRepository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MongoDbDemo
{
    [NotMapped]
    public class Preson : UserInfoEntity, IEntity
    {
        public Preson()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

    }
}
