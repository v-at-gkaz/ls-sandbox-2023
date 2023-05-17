import mongoose from 'mongoose';
import process from 'node:process';
import * as readLine from 'readline';

const dbURI = 'mongodb://root:example@localhost:27017/admin';

mongoose.connect(dbURI);

import './todoSchema.mjs';



mongoose.connection.on('connected', async () => {
    console.log(`Mongoose connected to ${dbURI}`);

    const todoSchema = mongoose.model('todo');

    try {
        const createdObj = await todoSchema.create({
            name: 'test',
            descr: 'desct'
        });
        console.log('created todo: ', createdObj);
    } catch (err){
        console.warn(err);
    }

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