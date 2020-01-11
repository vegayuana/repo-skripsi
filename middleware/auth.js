var jwt = require('json-web-token');
var utils = require('../utils/templates')
var secret = "repository.secret"

const auth = {
	admin (req, res, next){
		jwt.decode(secret, req.headers.authorization, function (err, decodedPayload, decodedHeader) {
      if (err) {
       	utils.template_response(res, 401, "failed to authorize token", null)
				return
      }
			if (decodedPayload.request.role != 'admin'){
      	utils.template_response(res, 401, "role not allowed", null)
				return
			}
			next()
    });
	},

	users (req, res, next){
		jwt.decode(secret, req.headers.authorization, function (err, decodedPayload, decodedHeader) {
      if (err) {
       	utils.template_response(res, 401, "failed to authorize token", null)
				return
      }
			if (decodedPayload.request.role != 'user'){
      	utils.template_response(res, 401, "role not allowed", null)
				return
			}
			next()
    });
	}
}
module.exports = auth;