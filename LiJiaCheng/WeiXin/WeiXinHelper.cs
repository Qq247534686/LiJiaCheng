using Senparc.CO2NET;
using Senparc.CO2NET.RegisterServices;
using Senparc.NeuChar.Entities;
using Senparc.Weixin;
using Senparc.Weixin.Entities;
using Senparc.Weixin.MP.AdvancedAPIs;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;
using Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage;
using Senparc.Weixin.MP.AdvancedAPIs.UserTag;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Caching;
using Senparc.Weixin.MP;
using Senparc.Weixin.Work.AdvancedAPIs;
using Senparc.Weixin.Work.AdvancedAPIs.MailList;
using Senparc.Weixin.Work.AdvancedAPIs.Mass;
using Senparc.Weixin.Work.AdvancedAPIs.OAuth2;

namespace WeiXin
{
    /// <summary>
    /// new 2019/11/02 ljc 包含企业微信 
    /// </summary>
    public class WeiXinHelper
    {
        #region 私有字段
        private WeiXinHelper() { }
        private static string aouthAccessTokenName = "WxAouthAccessToken";
        private static Cache s_Cache
        {
            get
            {
                return System.Web.HttpContext.Current.Cache;
            }
        }
        private static string s_AgentId
        {
            get
            {
                return Senparc.Weixin.Config.SenparcWeixinSetting.WeixinCorpAgentId;
            }
        }
        private static string s_CorpId
        {
            get
            {
                return Senparc.Weixin.Config.SenparcWeixinSetting.WeixinCorpId;
            }
        }
        private static string s_CorpSecret
        {
            get
            {
                return Senparc.Weixin.Config.SenparcWeixinSetting.WeixinCorpSecret;
            }
        }

        #endregion

        #region 初始化微信/企业微信设置
        /// <summary>
        /// 初始化微信配置
        /// </summary>
        public static void InitWeiXinnConfig()
        {
            var senparcSetting = SenparcSetting.BuildFromWebConfig(false);
            //CO2NET 全局注册，必须！！
            IRegisterService register = RegisterService.Start(senparcSetting).UseSenparcGlobal(false, null);
            var senparcWeixinSetting = SenparcWeixinSetting.BuildFromWebConfig(false);
            //微信全局注册，必须！！
            register.UseSenparcWeixin(senparcWeixinSetting, senparcSetting);
            //微信AccessToken注册，必须！！
            Senparc.Weixin.MP.Containers.AccessTokenContainer.RegisterAsync(senparcWeixinSetting.WeixinAppId, senparcWeixinSetting.WeixinAppSecret);
            Senparc.Weixin.Work.Containers.AccessTokenContainer.RegisterAsync(senparcWeixinSetting.WeixinCorpId, senparcWeixinSetting.WeixinCorpSecret);
        }
        #endregion

        #region 微信:消息发送
        /// <summary>
        /// 微信:获取AccessToken
        /// </summary>
        /// <param name="isNewToken"></param>
        /// <returns></returns>
        public static string GetAccessToken(bool isNewToken = false)
        {
            var result = Senparc.Weixin.MP.Containers.AccessTokenContainer.GetAccessToken(Senparc.Weixin.Config.SenparcWeixinSetting.WeixinAppId, isNewToken);
            if (string.IsNullOrEmpty(result))
            {
                SerilogHelper.Error("微信获取AccessToken出错\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 微信:文本消息
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="content"></param>
        /// <param name="timeOut"></param>
        /// <param name="kfAccount"></param>
        /// <returns></returns>
        public static WxJsonResult SendText(string openId, string content, int timeOut = 10000, string kfAccount = "")
        {
            var result = CustomApi.SendText(GetAccessToken(), openId, content, timeOut, kfAccount);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error(" 微信:文本消息\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 微信:图文消息
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="content"></param>
        /// <param name="timeOut"></param>
        /// <param name="kfAccount"></param>
        /// <returns></returns>
        public static WxJsonResult SendNews(string openId, List<Article> content, int timeOut = 10000, string kfAccount = "")
        {
            var result = CustomApi.SendNews(GetAccessToken(), openId, content, timeOut, kfAccount);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("微信:图文消息\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 微信:消息模板
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="templateId"></param>
        /// <param name="url"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static SendTemplateMessageResult SendTemplateMessage(string openId, string templateId, string url, object data)
        {
            var result = TemplateApi.SendTemplateMessage(GetAccessToken(), openId, templateId, url, data);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("微信:消息模板\r\n{@result}", result);
            }
            return result;
        }
        #endregion

        #region 微信:Web授权
        /// <summary>
        /// 微信Web:认证地址获取Code
        /// </summary>
        /// <param name="redirectUrl"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        public static string Aouth_GetAuthorizeUrl(string redirectUrl)
        {
            return OAuthApi.GetAuthorizeUrl(Senparc.Weixin.Config.SenparcWeixinSetting.WeixinAppId, redirectUrl, "STATE", OAuthScope.snsapi_userinfo);
        }
        /// <summary>
        /// 微信Web:登陆的Aouth认证
        /// </summary>
        /// <param name="code"></param>
        /// <param name="grantType"></param>
        /// <returns></returns>
        public static OAuthAccessTokenResult Aouth_GetAccessToken(string code, string grantType = "authorization_code")
        {
            var aouthAccessToken = s_Cache.Get(aouthAccessTokenName);
            if (aouthAccessToken == null)
            {
                var accessToken = OAuthApi.GetAccessToken(Senparc.Weixin.Config.SenparcWeixinSetting.WeixinAppId, Senparc.Weixin.Config.SenparcWeixinSetting.WeixinAppSecret, code, grantType);
                s_Cache.Add(aouthAccessTokenName, accessToken, null, DateTime.Now.AddMinutes(30), TimeSpan.Zero, CacheItemPriority.Default, null);
            }
            return (aouthAccessToken as OAuthAccessTokenResult);
        }
        /// <summary>
        /// 微信Web:AouthAccessToken是否有效
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public static WxJsonResult Aouth_Auth(string openId)
        {
            return OAuthApi.Auth((s_Cache.Get(aouthAccessTokenName) as OAuthAccessTokenResult).access_token, openId);
        }
        /// <summary>
        /// 微信Web:根据AouthAccessToken获取用户信息
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public static OAuthUserInfo Aouth_GetUserInfo(string openId)
        {
            return OAuthApi.GetUserInfo((s_Cache.Get(aouthAccessTokenName) as OAuthAccessTokenResult).access_token, openId);
        }

        #endregion

        #region 微信:服务器验证/签名
        /// <summary>
        /// 检查签名是否正确
        /// </summary>
        /// <param name="signature"></param>
        /// <param name="postModel"></param>
        /// <returns></returns>
        public static bool Check(string signature, Senparc.Weixin.MP.Entities.Request.PostModel postModel)
        {
            var result = CheckSignature.Check(signature, postModel);
            if (!result)
            {
                SerilogHelper.Error("检查签名是否正确\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 返回正确的签名
        /// </summary>
        /// <param name="timestamp"></param>
        /// <param name="nonce"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public static string GetSignature(string timestamp, string nonce, string token = null)
        {
            var result = CheckSignature.GetSignature(timestamp, nonce, token);
            if (string.IsNullOrEmpty(result))
            {
                SerilogHelper.Error("返回正确的签名\r\n{@result}", result);
            }
            return result;
        }

        #endregion

        #region 微信:标签操作
        /// <summary>
        /// 创建标签
        /// </summary>
        /// <param name="name"></param>
        /// <param name="timeOut"></param>
        /// <returns></returns>
        public static Senparc.Weixin.MP.AdvancedAPIs.UserTag.CreateTagResult Tag_Create(string name, int timeOut = 10000)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserTagApi.Create(GetAccessToken(), name, timeOut);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("创建标签\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 获取公众号已创建的标签
        /// </summary>
        /// <returns></returns>
        public static Senparc.Weixin.MP.AdvancedAPIs.UserTag.TagJson Tag_GetAll()
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserTagApi.Get(GetAccessToken());
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("获取公众号已创建的标签\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 编辑标签
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static WxJsonResult Tag_Update(int id, string name)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserTagApi.Update(GetAccessToken(), id, name);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("编辑标签\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 删除标签
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static WxJsonResult Tag_Delete(int id)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserTagApi.Delete(GetAccessToken(), id);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("删除标签\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 获取标签下粉丝列表
        /// </summary>
        /// <param name="tagid"></param>
        /// <param name="nextOpenid"></param>
        /// <returns></returns>
        public static UserTagJsonResult Tag_Get(int tagid, string nextOpenid = "")
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserTagApi.Get(GetAccessToken(), tagid, nextOpenid);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("获取标签下粉丝列表\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 批量为用户打标签
        /// </summary>
        /// <param name="tagid"></param>
        /// <param name="openid_list"></param>
        /// <returns></returns>
        public static WxJsonResult Tag_BatchTagging(int tagid, List<string> openid_list)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserTagApi.BatchTagging(GetAccessToken(), tagid, openid_list);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("批量为用户打标签\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 批量为用户取消标签
        /// </summary>
        /// <param name="tagid"></param>
        /// <param name="openid_list"></param>
        /// <returns></returns>
        public static WxJsonResult Tag_BatchUntagging(int tagid, List<string> openid_list)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserTagApi.BatchUntagging(GetAccessToken(), tagid, openid_list);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("批量为用户取消标签\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 获取用户身上的标签列表
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public static UserTagListResult Tag_UserTagList(string openid)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserTagApi.UserTagList(GetAccessToken(), openid);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("获取用户身上的标签列表\r\n{@result}", result);
            }
            return result;
        }
        #endregion

        #region 微信:用户操作
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public static Senparc.Weixin.MP.AdvancedAPIs.User.UserInfoJson User_Info(string openId)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(GetAccessToken(), openId);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("获取用户信息\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 获取关注者OpenId信息
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public static Senparc.Weixin.MP.AdvancedAPIs.User.OpenIdResultJson User_Get(string openId)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Get(GetAccessToken(), openId);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("获取关注者OpenId信息\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 修改关注者备注信息
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="remark"></param>
        /// <returns></returns>
        public static WxJsonResult User_UpdateRemark(string openId, string remark)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserApi.UpdateRemark(GetAccessToken(), openId, remark);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("修改关注者备注信息\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 批量获取用户基本信息
        /// </summary>
        /// <param name="userList"></param>
        /// <returns></returns>
        public static Senparc.Weixin.MP.AdvancedAPIs.User.BatchGetUserInfoJsonResult User_BatchGetUserInfo(List<Senparc.Weixin.MP.AdvancedAPIs.User.BatchGetUserInfoData> userList)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserApi.BatchGetUserInfo(GetAccessToken(), userList);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("批量获取用户基本信息\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 获取黑名单
        /// </summary>
        /// <param name="beginOpenId"></param>
        /// <returns></returns>
        public static Senparc.Weixin.MP.AdvancedAPIs.User.OpenIdResultJson User_GetBlackList(string beginOpenId)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserApi.GetBlackList(GetAccessToken(), beginOpenId);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("获取黑名单\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 取消拉黑用户
        /// </summary>
        /// <param name="openidList"></param>
        /// <returns></returns>
        public static WxJsonResult User_BatchUnBlackList(List<string> openidList)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserApi.BatchUnBlackList(GetAccessToken(), openidList);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("取消拉黑用户\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 拉黑用户
        /// </summary>
        /// <param name="openidList"></param>
        /// <returns></returns>
        public static WxJsonResult User_BatchBlackList(List<string> openidList)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.UserApi.BatchBlackList(GetAccessToken(), openidList);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("拉黑用户\r\n{@result}", result);
            }
            return result;
        }
        #endregion

        #region 微信:用户组接口
        /// <summary>
        /// 创建分组
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public static Senparc.Weixin.MP.AdvancedAPIs.Groups.CreateGroupResult Group_Create(string name)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.GroupsApi.Create(GetAccessToken(), name);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("创建分组\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 获取所有分组
        /// </summary>
        /// <returns></returns>
        public static Senparc.Weixin.MP.AdvancedAPIs.Groups.GroupsJson Group_Get()
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.GroupsApi.Get(GetAccessToken());
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("获取所有分组\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 获取用户分组
        /// </summary>
        /// <returns></returns>
        public static Senparc.Weixin.MP.AdvancedAPIs.Groups.GetGroupIdResult Group_GetId(string openId)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.GroupsApi.GetId(GetAccessToken(), openId);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("获取用户分组\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 修改分组名
        /// </summary>
        /// <returns></returns>
        public static WxJsonResult Group_Update(int id, string name)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.GroupsApi.Update(GetAccessToken(), id, name);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("修改分组名\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 移动用户分组
        /// </summary>
        /// <returns></returns>
        public static WxJsonResult Group_Update(string openId, int toGroupId)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.GroupsApi.MemberUpdate(GetAccessToken(), openId, toGroupId);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("移动用户分组\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 批量移动用户分组
        /// </summary>
        /// <returns></returns>
        public static WxJsonResult Group_BatchUpdate(int toGroupId)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.GroupsApi.BatchUpdate(GetAccessToken(), toGroupId);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("批量移动用户分组\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 删除分组
        /// </summary>
        /// <returns></returns>
        public static WxJsonResult Group_Delete(int groupId)
        {
            var result = Senparc.Weixin.MP.AdvancedAPIs.GroupsApi.Delete(GetAccessToken(), groupId);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("删除分组\r\n{@result}", result);
            }
            return result;
        }

        #endregion

        #region 微信:事件处理
        //...待完善
        #endregion

        #region 微信:群发消息
        //...待完善
        #endregion

        #region 微信:客服接口
        //...待完善
        #endregion


        #region 企业微信:获取AccessToken
        /// <summary>
        /// 企业微信:获取AccessToken
        /// </summary>
        /// <param name="isNewToken"></param>
        /// <returns></returns>
        public static string QyGetAccessToken(bool isNewToken = false)
        {
            return Senparc.Weixin.Work.Containers.AccessTokenContainer.GetToken(s_CorpId, s_CorpSecret, isNewToken);
        }
        #endregion

        #region 企业微信:标签管理
        /// <summary>
        ///  创建标签
        /// </summary>
        /// <param name="tagName"></param>
        /// <param name="tagId"></param>
        /// <returns></returns>
        public static Senparc.Weixin.Work.AdvancedAPIs.MailList.CreateTagResult TagQy_Create(string tagName, int? tagId = null)
        {
            var result = MailListApi.CreateTag(QyGetAccessToken(), tagName, tagId);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:创建标签\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 更新标签名字
        /// </summary>
        /// <param name="tagId"></param>
        /// <param name="tagName"></param>
        /// <returns></returns>
        public static WorkJsonResult TagQy_Update(int tagId, string tagName)
        {
            var result = MailListApi.UpdateTag(QyGetAccessToken(), tagId, tagName);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:更新标签名字\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 删除标签
        /// </summary>
        /// <param name="tagId"></param>
        /// <returns></returns>
        public static WorkJsonResult TagQy_Delete(int tagId)
        {
            var result = MailListApi.DeleteTag(QyGetAccessToken(), tagId);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:删除标签\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 获取标签成员
        /// </summary>
        /// <param name="tagId"></param>
        /// <returns></returns>
        public static GetTagMemberResult TagQy_GetTagMember(int tagId)
        {
            var result = MailListApi.GetTagMember(QyGetAccessToken(), tagId);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:获取标签成员\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 增加标签成员
        /// </summary>
        /// <param name="accessTokenOrAppKey"></param>
        /// <param name="tagId"></param>
        /// <param name="userList"></param>
        /// <param name="partyList"></param>
        /// <returns></returns>
        public static AddTagMemberResult TagQy_AddTagMember(string accessTokenOrAppKey, int tagId, string[] userList = null, long[] partyList = null)
        {
            var result = MailListApi.AddTagMember(QyGetAccessToken(), tagId, userList, partyList);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:增加标签成员\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 删除标签成员
        /// </summary>
        /// <param name="tagId"></param>
        /// <param name="userList"></param>
        /// <param name="partylist"></param>
        /// <returns></returns>
        public static DelTagMemberResult TagQy_DelTagMember(int tagId, string[] userList = null, long[] partylist = null)
        {
            var result = MailListApi.DelTagMember(QyGetAccessToken(), tagId, userList, partylist);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:删除标签成员\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 获取标签列表
        /// </summary>
        /// <returns></returns>
        public static GetTagListResult TagQy_GetTagList()
        {
            var result = MailListApi.GetTagList(QyGetAccessToken());
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:获取标签列表\r\n{@result}", result);
            }
            return result;
        }
        #endregion

        #region 企业微信:消息发送

        /// <summary>
        /// 企业微信:文本消息
        /// </summary>
        /// <param name="content"></param>
        /// <param name="toUser"></param>
        /// <param name="toParty"></param>
        /// <param name="toTag"></param>
        /// <param name="safe"></param>
        /// <param name="timeOut"></param>
        /// <returns></returns>
        public static MassResult SendQyText(string content, string toUser = null, string toParty = null, string toTag = null, int safe = 0, int timeOut = 10000)
        {
            var result = MassApi.SendText(QyGetAccessToken(), s_AgentId, content, toUser, toParty, toTag, safe, timeOut);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:发送文本消息\r\n{@result}", result);
            }
            return result;
        }
        /// <summary>
        /// 企业微信:发送图片消息
        /// </summary>
        /// <param name="mediaId"></param>
        /// <param name="toUser"></param>
        /// <param name="toParty"></param>
        /// <param name="toTag"></param>
        /// <param name="safe"></param>
        /// <returns></returns>
        public static MassResult SendQyImage(string mediaId, string toUser = null, string toParty = null, string toTag = null, int safe = 0)
        {
            var result = MassApi.SendImage(QyGetAccessToken(), s_AgentId, mediaId, toUser, toParty, toTag, safe);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:发送图片消息\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 企业微信:发送语音消息
        /// </summary>
        /// <param name="mediaId"></param>
        /// <param name="toUser"></param>
        /// <param name="toParty"></param>
        /// <param name="toTag"></param>
        /// <param name="safe"></param>
        /// <returns></returns>
        public static MassResult SendQyVoice(string mediaId, string toUser = null, string toParty = null, string toTag = null, int safe = 0)
        {
            var result = MassApi.SendVoice(QyGetAccessToken(), s_AgentId, mediaId, toUser, toParty, toTag, safe);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:发送语音消息\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 企业微信:发送视频消息
        /// </summary>
        /// <param name="mediaId"></param>
        /// <param name="toUser"></param>
        /// <param name="toParty"></param>
        /// <param name="toTag"></param>
        /// <param name="title"></param>
        /// <param name="description"></param>
        /// <param name="safe"></param>
        /// <returns></returns>
        public static MassResult SendQyVideo(string mediaId, string toUser = null, string toParty = null, string toTag = null, string title = null, string description = null, int safe = 0)
        {
            var result = MassApi.SendVideo(QyGetAccessToken(), s_AgentId, mediaId, toUser, toParty, toTag, title, description, safe);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:发送视频消息\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 企业微信:发送文件消息
        /// </summary>
        /// <param name="mediaId"></param>
        /// <param name="toUser"></param>
        /// <param name="toParty"></param>
        /// <param name="toTag"></param>
        /// <param name="title"></param>
        /// <param name="description"></param>
        /// <param name="safe"></param>
        /// <returns></returns>
        public static MassResult SendQyFile(string mediaId, string toUser = null, string toParty = null, string toTag = null, int safe = 0)
        {
            var result = MassApi.SendFile(QyGetAccessToken(), s_AgentId, mediaId, toUser, toParty, toTag, safe);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:发送文件消息\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 企业微信:发送图文消息
        /// </summary>
        /// <param name="articles"></param>
        /// <param name="toUser"></param>
        /// <param name="toParty"></param>
        /// <param name="toTag"></param>
        /// <param name="safe"></param>
        /// <returns></returns>
        public static MassResult SendQyNews(List<Article> articles, string toUser = null, string toParty = null, string toTag = null, int safe = 0)
        {
            var result = MassApi.SendNews(QyGetAccessToken(), s_AgentId, articles, toUser, toParty, toTag, safe);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:发送图文消息\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 企业微信:发送mpnews消息
        /// </summary>
        /// <param name="articles"></param>
        /// <param name="toUser"></param>
        /// <param name="toParty"></param>
        /// <param name="toTag"></param>
        /// <param name="safe"></param>
        /// <returns></returns>
        public static MassResult SendQyMpNews(List<MpNewsArticle> articles, string toUser = null, string toParty = null, string toTag = null, int safe = 0)
        {
            var result = MassApi.SendMpNews(QyGetAccessToken(), s_AgentId, articles, toUser, toParty, toTag, safe);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:发送mpnews消息\r\n{@result}", result);
            }
            return result;
        }

        /// <summary>
        /// 企业微信: 发送textcard消息
        /// </summary>
        /// <param name="articles"></param>
        /// <param name="toUser"></param>
        /// <param name="toParty"></param>
        /// <param name="toTag"></param>
        /// <param name="safe"></param>
        /// <returns></returns>
        public static MassResult SendTextCard(string title, string description, string url, string btntxt = null, string toUser = null, string toParty = null, string toTag = null)
        {
            var result = MassApi.SendTextCard(QyGetAccessToken(), s_AgentId, title, description, url, btntxt, toUser, toParty, toTag);
            if ((int)result.errcode != 0)
            {
                SerilogHelper.Error("企业微信:发送textcard消息\r\n{@result}", result);
            }
            return result;
        }

        #endregion

        #region  企业微信:Web授权
        /// <summary>
        /// 企业微信:企业获取code
        /// </summary>
        /// <param name="corpId"></param>
        /// <param name="redirectUrl"></param>
        /// <param name="state"></param>
        /// <param name="agentId"></param>
        /// <param name="responseType"></param>
        /// <param name="scope"></param>
        /// <returns></returns>
        public static string GetQyCode(string redirectUrl, string state, string agentId, string responseType = "code", string scope = "snsapi_base")
        {
            return OAuth2Api.GetCode(s_CorpId, redirectUrl, state, agentId, responseType, scope);
        }

        /// <summary>
        /// 企业微信:获取成员信息
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public static GetUserInfoResult GetQyUserId(string code)
        {
            return OAuth2Api.GetUserId(QyGetAccessToken(), code);
        }

        /// <summary>
        /// 企业微信:使用user_ticket获取成员详情
        /// </summary>
        /// <param name="userTicket"></param>
        /// <returns></returns>
        public static GetUserDetailResult GetQyUserDetail(string userTicket)
        {
            return OAuth2Api.GetUserDetail(QyGetAccessToken(), userTicket);
        }
        #endregion

        #region  企业微信:单点登录接口
        //...待完善
        #endregion

        #region  企业微信:多媒体文件接口
        //...待完善
        #endregion


        #region 小程序
        //...待完善
        #endregion


    }
}
