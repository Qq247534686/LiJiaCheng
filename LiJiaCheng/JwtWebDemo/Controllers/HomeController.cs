using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JwtWebDemo.Controllers
{
    public class HomeController : Controller
    {
        private const string secret = "lijiacheng";
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult JieMi()
        {
            string token = HttpContext.Request.Cookies["token"].Value;
            const string secret = "lijiacheng";
            var json = "";
            try
            {
                IJsonSerializer serializer = new JsonNetSerializer();
                IDateTimeProvider provider = new UtcDateTimeProvider();
                IJwtValidator validator = new JwtValidator(serializer, provider);
                IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);
                json = decoder.Decode(token, secret, verify: true);
            }
            catch (TokenExpiredException)
            {
                json = "Token has expired";
            }
            catch (SignatureVerificationException)
            {
                json = "Token has invalid signature";
            }
            return Content(json);
        }
        public ActionResult JiaMi()
        {
            var payload = new Dictionary<string, object>{
                { "userName", "liJiaCheng" },
                { "exp",DateTime.Now.ToFileTimeUtc()}
            };
            const string secret = "lijiacheng";

            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);
            var token = encoder.Encode(payload, secret);
            HttpContext.Response.Cookies.Add(new HttpCookie("token", token));
            return Content("Ok");
        }

    }
}