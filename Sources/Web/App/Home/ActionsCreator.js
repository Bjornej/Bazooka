var ApplicationDispatcher = require('../Base/Dispatcher');
var ActionTypes = require('./Constants').ActionTypes;
var reqwest = require("reqwest");

module.exports = {
  
	getVersions: function(enviromentId) {
		var promise = reqwest({
			url: "/api/deploy/search?enviromentId=" + enviromentId,
			type: 'json',
			contentType: 'application/json',
			method: "get"
		});
		return promise;
	},

	startDeploy: function(enviromentId, version) {
		var promise = reqwest({
			url: "/api/deploy/deploy?enviromentId=" + enviromentId + "&version=" +
				version,
			type: 'json',
			contentType: 'application/json',
			method: "get"
		});
		return promise;
	},
  
  updateEnviroments : function(){
    reqwest({
      url:"/api/status/",
      type:'json',
      contentType: 'application/json',
      method:"get"
    }).then((x => {
      ApplicationDispatcher.handleServerAction({
        type: ActionTypes.UPDATE_STATUS,
        apps: x
      });
    }))
  }
};
