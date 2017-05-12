var baseURL = '/menu';
var path = require('path');

var handlerWebRequest = require(path.join(__dirname, '..', 'provider', 'lib', 'handlerWebRequest'));

//var doubleQuotesRegex = /"/g;
var spaceRegex = /\s/g;

require(path.join(__dirname,'..','provider','lib','atajo.fork')).init({

    req: function(obj, cb, dbi, api) {
        console.log("object for getMenu: "+obj.method);
        obj.method = obj.method ? obj.method : '';
        switch (obj.method) {
            
            case 'getMenu':
                console.log("->URI get menu : "+baseURL);
                var heads = {
                    //authorization: "Bearer "+obj.headers.replace(doubleQuotesRegex,'')
                    authorization: "Bearer " +obj.headers.replace(spaceRegex,'')
                };
                console.log("menu token header: "+JSON.stringify(heads));

                handlerWebRequest.get(baseURL, null, heads).then(function(data) {
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