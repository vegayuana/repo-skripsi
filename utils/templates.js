const utils = {
  template_response ( res, statusCode, msg, data ){
    res.statusCode = statusCode
    return res.json({status:statusCode, message:msg, data:data})
  }
}
module.exports = utils