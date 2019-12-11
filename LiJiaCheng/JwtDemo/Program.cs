using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;

namespace JwtDemo
{
    class Program
    {
        static void Main(string[] args)
        {

            var miMa=jiaMi();
            var ss=MD5.Create();
            jieMi(miMa);
            //for (int i = 0; i < 5; i++)
            //{
            //    ss();
            //    Thread.Sleep(1000);

            //}
            


        }
        public static void ss() {

            IDateTimeProvider provider = new UtcDateTimeProvider();
            var now = provider.GetNow();
            var secondsSinceEpoch = now.AddSeconds(3).ToFileTimeUtc();

            var payload = new Dictionary<string, object>
            {
                { "exp", secondsSinceEpoch }
            };
            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IJwtValidator validator = new JwtValidator(serializer, provider);
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            const string secret = "lijiacheng";
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);
            var token = encoder.Encode(payload, secret);
            IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);
            var json = decoder.Decode(token, secret, verify: true); // throws TokenExpiredException
            Console.WriteLine(json);
        }


        public static string jiaMi()
        {
            var payload = new Dictionary<string, object>{
                { "lijiacheng", "{name:'Ljc',age:123}" },
                { "exp",DateTime.Now.ToFileTimeUtc()}
            };
            const string secret = "lijiacheng";

            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

            var token = encoder.Encode(payload, secret);
            Console.WriteLine(token);
            return token;
        }

            public static void jieMi(string miMa) {
            string token = miMa;
            const string secret = "lijiacheng";

            try
            {
                IJsonSerializer serializer = new JsonNetSerializer();
                IDateTimeProvider provider = new UtcDateTimeProvider();
                IJwtValidator validator = new JwtValidator(serializer, provider);
                IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);

                var json = decoder.Decode(token, secret, verify: true);
                Console.WriteLine(json);
            }
            catch (TokenExpiredException)
            {
                Console.WriteLine("Token has expired");
            }
            catch (SignatureVerificationException)
            {
                Console.WriteLine("Token has invalid signature");
            }


        }
    }
}
