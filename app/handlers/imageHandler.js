var _log = require('../provider/lib/atajo.log');		
		
		
var fs = require('fs');		
var path = require('path');		
		
		
var imagesHandler = {		
    TOKEN: null,		
    OBJ: null,		
		
    req: function(obj, cb, dbi, api) {		
        var _ = this;		
		
        console.log("IMAGES REQUEST  : " + JSON.stringify(obj));		
		
        fs.readFile(path.join(__dirname, '../', 'cache', 'API_PACKAGE_IMG.json'), 'utf8', function(err, data) {		
		
            console.log("DATA IS " + data);		
            try {		
                obj.RESPONSE = JSON.parse(data);		
            } catch (e) {		
                console.log("COULD NOT PARSE API_PACKAGE_IMG : " + e);		
                obj.RESPONSE = false;		
            }		
		
            cb(obj);		
		
        })		
		
		
		
    },		
		
		
		
		
}		
		
		
require('../provider/lib/atajo.fork.js').init(imagesHandler); 