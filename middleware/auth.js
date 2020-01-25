var jwt = require('json-web-token');
var utils = require('../utils/templates')
var secret = "repository.secret"

const auth = {
	admin (req, res, next){
    let bearer = req.headers.authorization
    let token = bearer.split(' ')[1]
		jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
      if (err) {
        return utils.template_response(res, 401, "failed to authorize token", null)
      }
			if (decodedPayload.request.role != 'admin'){
      	return utils.template_response(res, 401, "role not allowed", null)
			}
			next()
    })
	},

	users (req, res, next){
    let bearer = req.headers.authorization
    let token = bearer.split(' ')[1]
		jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
      if (err) {
        return utils.template_response(res, 401, "failed to authorize token", null)
      }
			if (decodedPayload.request.role != 'user'){
      	return utils.template_response(res, 401, "role not allowed", null)
			}
			next()
    })
  },
  
  gen(req, res, next){
    let bearer = req.headers.authorization
    let token = bearer.split(' ')[1]
    jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
      if (err) {
        return utils.template_response(res, 401, "failed to authorize token", null)
      }
			next()
    })
  }
}
module.exports = auth;