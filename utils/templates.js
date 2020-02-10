const utils = {
  template_response ( res, statusCode, msg, data ){
    res.statusCode = statusCode
    res.header("Access-Control-Allow-Origin", "*")
    return res.json({status:statusCode, message:msg, data:data})
  }
}
module.exports = utils