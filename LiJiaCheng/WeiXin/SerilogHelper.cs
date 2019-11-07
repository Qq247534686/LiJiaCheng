using Serilog;
using Serilog.Core;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeiXin
{
    /// <summary>
    /// 日志插件
    /// </summary>
    public class SerilogHelper
    {
        private SerilogHelper() { }
        private static Logger Log(LogTypeEnum logType)
        {
            var logPath = ConfigurationManager.AppSettings["logPath"] + "\\" + DateTime.Now.ToString("yyyyMMdd");
            var logResult = new LoggerConfiguration().Enrich.With().WriteTo.File(
                logPath + "\\" + logType.EnumToName() + ".log",
                outputTemplate : "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}]{NewLine}{Message:lj}{Exception}",
                shared: true
               ).CreateLogger();
            return logResult;
        }
        private static string newLine(string data)
        {
            if (!string.IsNullOrEmpty(data))
            {
                data = data + "\r\n";
            }
            return data;
        }

        private static void Write(LogTypeEnum logType, string data, Exception ex = null, params object[] objectArray)
        {
            var log = Log(logType);
            switch (logType)
            {
                case LogTypeEnum.Info:
                    log.Information(newLine(data), objectArray);
                    break;
                case LogTypeEnum.Error:
                    if (ex != null)
                    {
                        log.Error(ex, newLine(data), objectArray);
                        break;
                    }
                    log.Error(newLine(data), objectArray);
                    break;
                case LogTypeEnum.Debug:
                    log.Debug(newLine(data), objectArray);
                    break;
                case LogTypeEnum.Fatal:
                    log.Fatal(newLine(data), objectArray);
                    break;
                case LogTypeEnum.Warning:
                    log.Warning(newLine(data), objectArray);
                    break;
                case LogTypeEnum.Verbose:
                    log.Verbose(newLine(data), objectArray);
                    break;
                case LogTypeEnum.QyhMsg:
                    log.Information(newLine(data), objectArray);
                    break;
                case LogTypeEnum.GzhMsg:
                    log.Information(newLine(data), objectArray);
                    break;
            }
        }
        public static void Info(string data, params object[] objectArray)
        {
            Write(LogTypeEnum.Info, newLine(data), objectArray: objectArray);
        }

        public static void Error(string data, params object[] objectArray)
        {
            Write(LogTypeEnum.Error, newLine(data), objectArray: objectArray);
        }

        public static void Error(Exception ex, string data, params object[] objectArray)
        {
            Write(LogTypeEnum.Error, newLine(data), ex: ex, objectArray: objectArray);
        }

        public static void Debug(string data, params object[] objectArray)
        {
            Write(LogTypeEnum.Debug, newLine(data), objectArray: objectArray);
        }

        public static void Fatal(string data, params object[] objectArray)
        {
            Write(LogTypeEnum.Fatal, newLine(data), objectArray: objectArray);
        }

        public static void QyhMsg(string data, params object[] objectArray)
        {
            Write(LogTypeEnum.QyhMsg, newLine(data), objectArray: objectArray);
        }
        public static void GzhMsg(string data, params object[] objectArray)
        {
            Write(LogTypeEnum.GzhMsg, newLine(data), objectArray: objectArray);
        }
    }
    public enum LogTypeEnum
    {
        [Enum("Info")]
        Info,
        [Enum("Error")]
        Error,
        [Enum("Debug")]
        Debug,
        [Enum("Fatal")]
        Fatal,
        [Enum("Warning")]
        Warning,
        [Enum("Verbose")]
        Verbose,
        [Enum("企业号消息")]
        QyhMsg,
        [Enum("公众号消息")]
        GzhMsg,
    }
}
