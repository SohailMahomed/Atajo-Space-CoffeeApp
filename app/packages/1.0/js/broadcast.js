module.factory('ReceiverConstants', function() {
    var prefix = 'SAB_4CS_GLOBAL_EVENT_';
    return {
    	ON_LOGIN: prefix + 'SUCCESSFUL_LOGIN',
    	POST_LOGIN: prefix + 'POST_LOGIN_INITIALISATION',
    	ON_ASSESSOR_ACTIVITIES: prefix + 'UPDATED_NUMBER_OF_PENDING_ACTIVITIES',
    };
});;;