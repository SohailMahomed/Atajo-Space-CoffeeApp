var baseURL = '/credits';
var path = require('path');

var handlerWebRequest = require(path.join(__dirname, '..', 'provider', 'lib', 'handlerWebRequest'));


var doubleQuotesRegex = /"/g;


require(path.join(__dirname,'..','provider','lib','atajo.fork')).init({

    req: function(obj, cb, dbi, api) {
    
        obj.method = obj.method ? obj.method : '';
        
        switch (obj.method) {
            
            case 'performTransfer':
                console.log("->Uri : "+baseURL +"/"+obj.params);
                
                var heads = {
                    //authorization: "Bearer "+obj.headers.replace(doubleQuotesRegex,'')
                    authorization: "Bearer "+obj.headers
                    //'content-type': 'application/json'
                };
                
                console.log("------------------------- ");
                console.log("Receiver : "+baseURL+"/"+obj.params);
                console.log("Body :"+JSON.stringify(obj.data));
                console.log("transfer.js token "+JSON.stringify(heads));            
                
                handlerWebRequest.post(baseURL +"/"+obj.params, obj.data, null, heads).then(function(data) {
                    obj.RESPONSE = data;
                    cb(obj);
                });
                break;
            case 'performPayment':
                console.log("->Uri : "+baseURL +"/"+obj.params);
                
                var heads = {
                    //authorization: "Bearer "+obj.headers.replace(doubleQuotesRegex,'')
                    authorization: "Bearer "+obj.headers
                    //'content-type': 'application/json'
                };
                
                console.log("------------------------- ");
                console.log("Receiver _fistbump: "+baseURL+"/"+obj.params);
                console.log("Body :"+JSON.stringify(obj.data));
                console.log("transfer.js token "+JSON.stringify(heads));            
                
                handlerWebRequest.post(baseURL +"/"+obj.params, obj.data, null, heads).then(function(data) {
                    obj.RESPONSE = data;
                    cb(obj);
                });
                break;
            case 'getBeanBalance':
                
                var heads = {
                    authorization: "Bearer "+obj.headers.replace(doubleQuotesRegex,'')
                };
                var filter = "?sender="+obj.params;
                console.log("------------------------- ");
                console.log("BeanBalance Uri : "+baseURL+"/"+filter);  
                
                handlerWebRequest.get(baseURL+"/"+obj.params, null, heads).then(function(data) {
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