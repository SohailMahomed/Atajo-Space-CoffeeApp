var baseURL = '/credits/_fistbump';
var path = require('path');

var handlerWebRequest = require(path.join(__dirname, '..', 'provider', 'lib', 'handlerWebRequest'));


//var doubleQuotesRegex = /"/g;
var spaceRegex = /\s/g;

require(path.join(__dirname,'..','provider','lib','atajo.fork')).init({

    req: function(obj, cb, dbi, api) {
    
        obj.method = obj.method ? obj.method : '';
        
        switch (obj.method) {
            
            case 'performFistbump':
                console.log("->Uri : "+baseURL + "/"+obj.params);
                var heads = {
                    //authorization: "Bearer "+obj.headers.replace(spaceRegex,'')
                    authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNvaGFpbC5tYWhvbWVkQGJyaXRlaG91c2UuY28uemEifQ.5U9ZLYFYfgN1lPzqDEuOU4LT0LqLmHCK9mKyXrDHhBk"
                    //'content-type': 'application/json'
                };
                
                console.log("------------------------- ");
                console.log("Receiver : "+baseURL+"/"+obj.params);
                console.log("Body :"+JSON.stringify(obj.data));
                console.log("Something please "+JSON.stringify(heads));
                
                
                handlerWebRequest.post(baseURL+"/"+obj.params, obj.data, null, heads).then(function(data) {
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