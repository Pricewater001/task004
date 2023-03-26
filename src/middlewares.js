function notFound(req, res, next) {
  res.status(404).json({
    message: "Error : not Found",
  });
}

function logger(req,res,next) {
  const data = {
    ip : req.ip,
    endpoint:req.originalUrl,
    method:req.method,
   
  }
  req.userData = data;
  next();
}

module.exports = {
  notFound,
  logger
};
