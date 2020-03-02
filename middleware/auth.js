var jwt = require('jsonwebtoken')
var utils = require('../utils/templates')
var secret = "repository.secret"

const auth = {
	admin (req, res, next){
    let bearer = req.headers.authorization
    let token = bearer.split(' ')[1]
		jwt.verify(token,secret, function (err, decodedPayload) {
      if (err) {
        console("failed to authorize token")
        return utils.template_response(res, 401, "failed to authorize token", null)
      }
			if (decodedPayload.request.role != 'admin'){   
        console("role not allowed")
      	return utils.template_response(res, 401, "role not allowed", null)
			}
			next()
    })
	},

	users (req, res, next){
    let bearer = req.headers.authorization
    let token = bearer.split(' ')[1]
		jwt.verify( token, secret, function (err, decodedPayload) {
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
    jwt.verify( token, secret, function (err) {
      if (err) {
        return utils.template_response(res, 401, "failed to authorize token", null)
      }
			next()
    })
  }
}
module.exports = auth