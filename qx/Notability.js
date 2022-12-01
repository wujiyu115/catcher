/******************************
脚本功能：Notability +解锁订阅

*******************************
[rewrite_local]
^https?:\/\/notability\.com\/subscriptions url script-response-body https://raw.githubusercontent.com/wujiyu115/catcher/main/qx/Notability.js
[mitm]
hostname = notability.com
*******************************/
var obj = JSON.parse($response.body);
var modifiedStatus = "HTTP/1.1 200 OK";
obj = {
    'data': {
        'processAppleReceipt': {
            '__typename': "SubscriptionResult",
            'error': 0,
            'subscription': {
                '__typename': "AppStoreSubscription",
                'status': "active",
                'originalPurchaseDate': "2020-09-28T09:09:09.000Z",
                'originalTransactionId': "100109876543210",
                'expirationDate': "2999-09-28T09:09:09.000Z",
                'productId': "com.yqc.premium_subscription",
                'tier': "premium",
                'refundedDate': null,
                'refundedReason': null,
                'user': null
            }
        }
    }
};
$done({
    'status': modifiedStatus,
    'body': JSON.stringify(obj)
})