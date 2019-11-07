using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace LiJiaCheng.Code
{
    public class ConnMultiplexer
    {
        public static Action<object, ConnectionFailedEventArgs> ConnectionRestored { get; set; }
        public static Action<object, ConnectionFailedEventArgs> ConnectionFailed { get; internal set; }
        public static Action<object, RedisErrorEventArgs> ErrorMessage { get; internal set; }
        public static Action<object, EndPointEventArgs> ConfigurationChanged { get; internal set; }
        public static Action<object, HashSlotMovedEventArgs> HashSlotMoved { get; internal set; }
        public static Action<object, InternalErrorEventArgs> InternalError { get; internal set; }
        public static Action<object, EndPointEventArgs> ConfigurationChangedBroadcast { get; internal set; }
    }
}
