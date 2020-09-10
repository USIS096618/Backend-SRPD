module.exports = {
    port: process.env.PORT || 3900,
    db: process.env.MONGODB || 'mongodb://localhost:27017/SRP',
    SECRET_TOKEN: 'miclavedetokens'
}