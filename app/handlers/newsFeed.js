var baseURL = '/newsFeed';
var path = require('path');

var handlerWebRequest = require(path.join(__dirname, '..', 'provider', 'lib', 'handlerWebRequest'));


//var doubleQuotesRegex = /"/g;
var spaceRegex = /\s/g;

require(path.join(__dirname,'..','provider','lib','atajo.fork')).init({

    req: function(obj, cb, dbi, api) {
    
        obj.method = obj.method ? obj.method : '';
        
        switch (obj.method) {
            
            case 'getNewsfeed':
                console.log("->Uri : "+baseURL + "/"+obj.params);
                
                var heads = {
                    authorization: "Bearer "+obj.headers.replace(spaceRegex,'')
                };
                var filter = "?countLimit="+obj.params;
                console.log("------------------------- ");
                console.log("baseURL newsFeed : "+baseURL+"/?countLimit="+filter);
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