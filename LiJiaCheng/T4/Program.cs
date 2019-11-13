using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace T4
{
    class Program
    {
        static void Main(string[] args)
        {

            MyDbContext db = new MyDbContext();
            var ss=db.Database.BeginTransaction();
            
        }
    }
}
