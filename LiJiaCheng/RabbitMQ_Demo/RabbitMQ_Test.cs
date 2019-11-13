using RabbitMQ.Client.Events;
using ServiceStack;
using ServiceStack.Messaging;
using ServiceStack.Model;
using ServiceStack.RabbitMq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RabbitMQ_Demo
{
    public class RabbitMQ_Test
    {
        public static void Send(string queueName, Message<QueueObj> data)
        {
            //入队
            using (var factory = new RabbitMqMessageFactory(username: "admin", password: "admin"))
            {
                using (var mqClientMQ = new RabbitMqQueueClient(factory))
                {
                    mqClientMQ.Publish(queueName, data);
                }
            }
        }
        public static QueueObj Received<T>(string queueName)
        {
            //出队
            using (var factory = new RabbitMqMessageFactory(username: "admin", password: "admin"))
            {
                using (var mqClientMQ = new RabbitMqQueueClient(factory))
                {
                    var result = mqClientMQ.Get<QueueObj>(queueName);
                    var entity = result.Body as QueueObj;
                    if (entity.id.HasValue)
                    {
                        mqClientMQ.Ack(result);
                        return entity;
                    }
                    return null;
                }
            }
        }
        public static void StartMqServer()
        {
            var mqServer = new RabbitMqServer(username: "admin", password: "admin")
            {
                PublishMessageFilter = (thisQueueName, properties, msg) =>
                {
                    //2.入队后的事件
                    var appid = properties.AppId;

                },
                GetMessageFilter = (thisQueueName, basicMsg) =>
                {
                    //3.出队前的事件
                    var props = basicMsg.BasicProperties;
                    Console.WriteLine(thisQueueName);

                },
                ErrorHandler = (ex) =>
                {
                    //出错
                    Console.WriteLine(ex.Message);


                }
            };
            mqServer.Start();
        }
    }
}
