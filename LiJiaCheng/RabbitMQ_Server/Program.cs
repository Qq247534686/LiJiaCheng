using RabbitMQ_Demo;
using ServiceStack.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace RabbitMQ_Server
{
    class Program
    {
        private static string nowQueueName = "messageQueue";
        static void Main(string[] args)
        {
            Console.Title = "消费者";
            while (true)
            {
                var obj = RabbitMQ_Test.Received<QueueObj>(nowQueueName);
                if (obj != null)
                {
                    switch (obj.tag)
                    {
                        case "user":
                            var user = obj.data as User;
                            Console.WriteLine("userId:" + user.name);
                            break;
                        case "comBox":
                            var comBox = obj.data as ComboBox;
                            Console.WriteLine("comBoxId:" + comBox.id);
                            break;
                    }
                }
                Thread.Sleep(1000);
            }
        }
    }
}
