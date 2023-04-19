console.log('Hello, NPM!');

const art = require('ascii-art');

art.font("Hello,  NodeJS  APP!", 'Doom', (err, result) => {
    if(!err){
        console.log(result);
    }
});