var baseURL = '/transactionHistory';
var path = require('path');

var handlerWebRequest = require(path.join(__dirname, '..', 'provider', 'lib', 'handlerWebRequest'));


var doubleQuotesRegex = /"/g;


require(path.join(__dirname,'..','provider','lib','atajo.fork')).init({

    req: function(obj, cb, dbi, api) {
    
        obj.method = obj.method ? obj.method : '';
        
        switch (obj.method) {
            
            case 'getSentHistory':
                
                var heads = {
                    authorization: "Bearer "+obj.headers.replace(doubleQuotesRegex,'')
                };
                var filter = "?sender="+obj.params;
                console.log("------------------------- ");
                console.log("Sender Uri : "+baseURL+"/"+filter);
                console.log("Header newsFeed : "+JSON.stringify(heads));  
                
                handlerWebRequest.get(baseURL+"/"+filter, null, heads).then(function(data) {
                    obj.RESPONSE = data;
                    cb(obj);
                });
                break;
            case 'getReceivedHistory':
                
                var heads = {
                    authorization: "Bearer "+obj.headers.replace(doubleQuotesRegex,'')
                };
                var filter = "?recipient="+obj.params;
                console.log("------------------------- ");
                console.log("Received Uri : "+baseURL+"/"+filter);
                console.log("Header newsFeed : "+JSON.stringify(heads));  
                
                handlerWebRequest.get(baseURL+"/"+filter, null, heads).then(function(data) {
                    obj.RESPONSE = data;
                    cb(obj);
                });
                break;    
            default:
                _log.e("unknown handler method " + obj.method);
                obj.RESPONSE = { error: true, message: 'no such method' };
                cb(obj);
                break;
        }

    }
});