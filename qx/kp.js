/*

解锁会员课程，直播课程全解锁

添加了远程js 修改内容会失效



[rewrite_local]

#keep解锁
^https:\/\/.+keep.+/gerudo/v2/liveCourse/.+/details.*$ url response-body "userMemberStatus":\w+ response-body "userMemberStatus":true
^http[s]?:\/\/.+keep.+(liveStream/schedule|start|preview|athena/v5/people/my|ad/preload).*$ url script-response-body https://raw.githubusercontent.com/wujiyu115/catcher/main/qx/kp.js


hostname = *keep*


 */
var body = $response.body;
var url = $request.url;
var body_data = JSON.parse(body);
const schedule = "/liveStream/schedule";
const start = "/start";
const preview = "/preview";
const athena = "/athena/v5/people/my";
const ad = "/ad/preload";
if (url.indexOf(schedule) != -1) {
    for (var i = 0; i < body_data.data["living"].length; i++) {
        body_data.data["living"][i].free = !![];
    }
    for (var i = 0; i < body_data.data["playback"].length; i++) {
        body_data.data['playback'][i].free = !![];
    }
    body_data.data['liveUser'].userMemberStatus = !![];
    body = JSON.stringify(body_data);
}
if (url.indexOf(start) != -1) {
    body_data.data["status"] = !![];
    body = JSON.stringify(body_data);
}
if (url.indexOf(preview) != -1) {
    body_data.data['baseInfo'].workoutBaseInfos[0].trainingMode = 'explain';
    body_data.data["extendInfo"].hasPaid = !![];
    body = JSON.stringify(body_data);
}
if (url.indexOf(athena) != -1) {
    body_data.data['user'].memberInfo["memberStatus"] = 3;
    body_data.data['user'].kgData['growthLevelText'] = '点击此处添加作者';
    body_data.data["user"].avatar = "https://gjds.vip/img/logo.png";
    body_data.data['user'].memberInfo['buttonText'] = "2999-09-09到期";
    body_data.data["user"].memberInfo["scrollIntros"] = ["解锁所有课程"];
    body_data.data["user"].username = "ios破解";
    body_data.data["user"].kgData["growthLevel"] = 5;
    body_data.data["user"].kgData['schema'] = 'http://n8t.cn/isRcT';
    body = JSON.stringify(body_data);

}
if (url.indexOf(ad) != -1) {
    delete body_data.data;
    body = JSON.stringify(body_data);
}
$done({
    'body': body
})