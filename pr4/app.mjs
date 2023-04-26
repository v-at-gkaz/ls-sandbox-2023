import { env, argv, exit, stdin } from 'node:process';
import * as path from 'node:path';

const isStdinMode = argv.includes('--use-stdin');

// console.log('stdin mode?', isStdinMode);

console.log(`   >>>>>>>>>>>>         Separator in my OS === ${path.sep}`);


const login = env.MYAPP_USER;
const password = env.MYAPP_PASSWORD;

let inputPassword = '';

if(isStdinMode){
    stdin.on('data', chunk => {
        inputPassword=chunk.toString().trim();
        // console.log('inputPassword?', inputPassword);
        program();
    });
} else {
    inputPassword = argv[3] || '';
    program();
}

function program() {
    const inputLogin = argv[2] || '';
    // console.log('inputLogin?', inputLogin);
 
    if(!inputPassword.length || !inputLogin.length) {
        console.log(`Help: \ntry "${path.basename(argv[0])} ${path.basename(argv[1])} {username} [password]" \nor  "${path.basename(argv[0])} ${path.basename(argv[1])} {username} --use-stdin <<< {password}"`);
        exit(2);
    }
 
    if(login === inputLogin && password === inputPassword){
        console.log('Success');
        exit(0);
    } else {
        console.error('Fail');
        exit(1);
    }
}