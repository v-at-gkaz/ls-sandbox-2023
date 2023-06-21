const mongoose = require('mongoose');
const readLine = require('readline');

const dbURI = process.env.MONGODB_CONNECTION_STRING;

console.log('dbURI', dbURI);

mongoose.connect(dbURI);

require('./todoSchema.js');
require('./userSchema.js');



mongoose.connection.on('connected', async () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log(`Mongoode connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

if(process.platform === "win32"){
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

const gracefullShutdown = (msg, cb) => {
    mongoose.connection.close();
    console.log(`Mongoose disconnected through ${msg}`);
    cb();
}

process.once('SIGUSR2', () => {
    gracefullShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    gracefullShutdown('app shutdown', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    gracefullShutdown('app killed', () => {
        process.exit(0);
    });
});