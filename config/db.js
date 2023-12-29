// Connect with mongo db

const mongooese = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongooese.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.  //cyan color underlined the host
        underline)
    } catch (error) {
        console.log(error)
        process.exit(1) // exit with failure
    }
}

module.exports = connectDB