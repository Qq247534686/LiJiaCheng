using MongoRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MongoDbDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            //var manager = new MongoRepositoryManager();
            var repo = new MongoRepository<Preson>();
            var configInfoRepo = new MongoRepository<ConfigInfo>();
            for (int i = 0; i < 100; i++)
            {
                configInfoRepo.Add(new ConfigInfo() { desc = "111", name = "123", value = i.ToString() });
            }
            configInfoRepo.DeleteAll();



            // adding new entity
            //var newCustomer = new Preson
            //{
            //     F_Name = "Steve",
            //     F_PassWord = "Cornell"
            //};

            //repo.Add(newCustomer);

            //// searching
            //var result = repo.Where(c => c.FirstName == "Steve");

            //// updating 
            //newCustomer.LastName = "Castle";
            //repo.Update(newCustomer);

        }
}
}
