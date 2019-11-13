using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;
using ServiceStack.RabbitMq;
using ServiceStack.Messaging;
using System.Collections.Generic;
using ServiceStack;
using ServiceStack.Text;
using System.Threading;

namespace RabbitMQ_Demo
{

    class Program
    {
        private static string nowQueueName = "messageQueue";
        static void Main(string[] args)
        {
            //RabbitMQ_Test.StartMqServer();
            Console.Title = "生产者";
            while (true)
            {
                var user = new User() { name = Guid.NewGuid().ToString() };
                var comBox = new ComboBox() { id = Guid.NewGuid().ToString() };
                var msg1 = new Message<QueueObj>(new QueueObj() { id = Guid.NewGuid(), tag = "user", data = user });
                var msg2 = new Message<QueueObj>(new QueueObj() { id = Guid.NewGuid(), tag = "comBox", data = comBox });
                RabbitMQ_Test.Send(nowQueueName, msg1);
                Console.WriteLine("userId:" + user.name);
                RabbitMQ_Test.Send(nowQueueName, msg2);
                Console.WriteLine("comBoxId:" + comBox.id);
                Thread.Sleep(3000);
            }

            ////return;
            //for (int i = 0; i < 200; i++)
            //{
            //    var obj = RabbitMQ_Test.Received<QueueObj>(nowQueueName);
            //    if (obj != null)
            //    {
            //        switch (obj.tag)
            //        {
            //            case "user":
            //                var user = obj.data as User;
            //                Console.WriteLine("userId:"+user.name);
            //                break;
            //            case "comBox":
            //                var comBox = obj.data as ComboBox;
            //                Console.WriteLine("comBoxId:" + comBox.id);
            //                break;
            //            default:
            //                Console.WriteLine("----------------------------------------Error----------------------------------------");
            //                break;
            //        }
            //        Console.WriteLine(i);
            //    }
            //}
            
        }

        public static void Send()
        {
            var factory = new ConnectionFactory();
            factory.HostName = "localhost";//RabbitMQ服务在本地运行
            factory.UserName = "admin";//用户名
            factory.Password = "admin";//密码

            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(nowQueueName, false, false, false, null);//创建一个名称为hello的消息队列
                    string message = "Hello World"; //传递的消息内容
                    var body = Encoding.UTF8.GetBytes(message);
                    channel.BasicPublish("", nowQueueName, null, body); //开始传递
                    Console.WriteLine("已发送： {0}", message);
                }
            }



        }
        public static void Received()
        {
            var factory = new ConnectionFactory();
            factory.HostName = "localhost";
            factory.UserName = "admin";
            factory.Password = "admin";

            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(nowQueueName, false, false, false, null);

                    var consumer = new EventingBasicConsumer(channel);
                    channel.BasicConsume(nowQueueName, false, consumer);
                    consumer.Received += (model, ea) =>
                    {
                        var body = ea.Body;
                        var message = Encoding.UTF8.GetString(body);
                        Console.WriteLine("已接收： {0}", message);
                    };
                }
            }



        }
    }
}
