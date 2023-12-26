// We are creating our own errorHandler which overrides the default node errorHandler
const errorHandler = (err,req,res,next) => {
      const statusCode = res.statusCode ? res.statusCode : 500
  
      res.status(statusCode)
  
      res.json({
          message: err.message,
          stack: process.env.NODE_ENV === 'production' ? null : err.stack // ternary function ==> if production mode then don't show anything else show the error.
      })
  }
  
  module.exports = {
      errorHandler,
  }