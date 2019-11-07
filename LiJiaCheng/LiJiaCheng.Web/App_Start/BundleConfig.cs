using System.Web;
using System.Web.Optimization;
using WebHelpers.Mvc5;

namespace LiJiaCheng.Web
{
    public class BundleConfig
    {
        // 有关捆绑的详细信息，请访问 https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Bundles/css")
                 .Include("~/Content/AdminLTE/css/bootstrap.min.css", new CssRewriteUrlTransformAbsolute())
                 .Include("~/Content/AdminLTE/css/bootstrap-select.css")
                 .Include("~/Content/AdminLTE/css/bootstrap-datepicker3.min.css")
                 .Include("~/Content/AdminLTE/css/font-awesome.min.css", new CssRewriteUrlTransformAbsolute())
                 .Include("~/Content/AdminLTE/css/icheck/blue.min.css", new CssRewriteUrlTransformAbsolute())
                 .Include("~/Content/AdminLTE/css/AdminLTE.css", new CssRewriteUrlTransformAbsolute())
                 .Include("~/Content/AdminLTE/css/skins/skin-blue.css"));

            bundles.Add(new ScriptBundle("~/Bundles/js")
                .Include("~/Content/AdminLTE/js/plugins/jquery/jquery-3.3.1.js")
                .Include("~/Content/AdminLTE/js/plugins/bootstrap/bootstrap.js")
                .Include("~/Content/AdminLTE/js/plugins/fastclick/fastclick.js")
                .Include("~/Content/AdminLTE/js/plugins/slimscroll/jquery.slimscroll.js")
                .Include("~/Content/AdminLTE/js/plugins/bootstrap-select/bootstrap-select.js")
                .Include("~/Content/AdminLTE/js/plugins/moment/moment.js")
                .Include("~/Content/AdminLTE/js/plugins/datepicker/bootstrap-datepicker.js")
                .Include("~/Content/AdminLTE/js/plugins/icheck/icheck.js")
                .Include("~/Content/AdminLTE/js/plugins/validator/validator.js")
                .Include("~/Content/AdminLTE/js/plugins/inputmask/jquery.inputmask.bundle.js")
                .Include("~/Content/AdminLTE/js/adminlte.js")
                .Include("~/Content/AdminLTE/js/init.js"));
        }
    }
}
