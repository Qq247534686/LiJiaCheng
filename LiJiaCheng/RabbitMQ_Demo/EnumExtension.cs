using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace RabbitMQ_Demo
{
    /// <summary>
    /// 枚举扩展类
    /// </summary>
    public static class EnumExtension
    {
        /// <summary>
        /// 转换为枚举
        /// </summary>
        /// <typeparam name="TEnum"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static TEnum StringToEnum<TEnum>(this string value) where TEnum : struct
        {
            TEnum result;//= default(TEnum);

            if (Enum.TryParse<TEnum>(value, out result))
            {
                return result;
            }

            throw new InvalidCastException("转换枚举失败...");
        }

        /// <summary>
        /// 转换为枚举
        /// </summary>
        /// <typeparam name="TEnum"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static TEnum IntToEnum<TEnum>(this int value) where TEnum : struct
        {
            TEnum result;//= default(TEnum);

            if (Enum.TryParse<TEnum>(value.ToString(), out result))
            {
                return result;
            }
            throw new InvalidCastException("转换枚举失败...");
        }

        /// <summary>
        /// 转换为int
        /// </summary>
        /// <typeparam name="TEnum"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static int EnumToInt<TEnum>(this TEnum value) where TEnum : struct
        {
            if (!value.GetType().IsEnum)
            {
                throw new ArgumentException("类型不是枚举");
            }
            return Convert.ToInt32(value);
        }

        private static Dictionary<string, Dictionary<string, FieldInfo>> _dicEnumField = new Dictionary<string, Dictionary<string, FieldInfo>>();
        /// <summary>
        /// 转换为名字
        /// </summary>
        /// <typeparam name="TEnum"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string EnumToName<TEnum>(this TEnum value, int statu = 0) where TEnum : struct//System.Enum
        {
            if (!value.GetType().IsEnum)
            {
                throw new ArgumentException("类型不是枚举");
            }

            string fullName = value.GetType().FullName;
            if (!_dicEnumField.ContainsKey(fullName))
            {
                //添加枚举值的字段特性
                _dicEnumField.Add(fullName, value.GetType().GetFields(BindingFlags.Static | BindingFlags.Public).ToDictionary(p => p.Name));
            }

            FieldInfo fi = _dicEnumField[fullName][value.ToString()];
            if (fi == null)
            {
                throw new InvalidOperationException("不存在此枚举值的字段特性");
            }

            EnumAttribute enumAttr = Attribute.GetCustomAttribute(fi, typeof(EnumAttribute), false) as EnumAttribute;
            if (enumAttr != null)
            {
                return enumAttr.Name;
            }

            return value.ToString();
        }

        /// <summary>
        /// 获取下拉数据源
        /// </summary>
        /// <typeparam name="TEnum"></typeparam>
        /// <returns></returns>
        public static List<ComboBox> GetComboBox<TEnum>() where TEnum : struct
        {
            return GetComboBox<TEnum>(null, null);
        }

        /// <summary>
        /// 获取下拉数据源
        /// </summary>
        /// <typeparam name="TEnum">枚举</typeparam>
        /// <param name="funcGetText">获取Text的委托</param>
        /// <param name="funcGetValue">获取Value的委托</param>
        /// <returns></returns>
        /// 创建人：尹学良
        /// 2014/5/22 11:14
        /// <exception cref="System.ArgumentException">类型不是枚举</exception>
        public static List<ComboBox> GetComboBox<TEnum>(Func<TEnum, string> funcGetText, Func<TEnum, string> funcGetValue) where TEnum : struct
        {
            if (!typeof(TEnum).IsEnum)
            {
                throw new ArgumentException("类型不是枚举");
            }

            List<ComboBox> result = new List<ComboBox>();
            foreach (TEnum item in Enum.GetValues(typeof(TEnum)))
            {
                result.Add(new ComboBox()
                {
                    id = funcGetValue == null ? (Convert.ToInt32(item)).ToString() : funcGetValue(item),
                    text = funcGetText == null ? item.EnumToName() : funcGetText(item),
                    value = funcGetValue == null ? (Convert.ToInt32(item)).ToString() : funcGetValue(item)
                });
            }

            return result;
        }
        public static Dictionary<string, Dictionary<string, string>> _dicEnumName = new Dictionary<string, Dictionary<string, string>>();
        public static string NameToEnumString(this string name, Type type)
        {
            if (!type.IsEnum)
            {
                throw new ArgumentException("类型不是枚举");
            }
            string fullName = type.FullName;
            if (!_dicEnumField.ContainsKey(fullName))
            {
                //添加枚举值的字段特性
                _dicEnumField.Add(fullName, type.GetFields(BindingFlags.Static | BindingFlags.Public).ToDictionary(p => p.Name));
            }
            if (!_dicEnumName.ContainsKey(fullName))
            {
                _dicEnumName.Add(fullName, new Dictionary<string, string>());
            }
            //string enumString = _dicEnumName[fullName][name];
            if (_dicEnumName[fullName].ContainsKey(name))
                return _dicEnumName[fullName][name];
            foreach (FieldInfo fi in _dicEnumField[fullName].Values)
            {
                EnumAttribute enumAttr = Attribute.GetCustomAttribute(fi, typeof(EnumAttribute), false) as EnumAttribute;
                if (enumAttr != null && enumAttr.Name.Equals(name))
                {
                    _dicEnumName[fullName].Add(name, fi.Name);
                    return fi.Name;
                }
            }
            return null;
        }
    }
}
