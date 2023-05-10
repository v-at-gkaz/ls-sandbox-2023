import * as http from 'node:http';
import Database from './database.mjs';

const db = new Database('./db.json');

const server = http.createServer(async (req, res) => {
    console.log('url', req.url);

    if(!['/api/v1/todo'].includes(req.url)) {
        sayAboutTeapot(res, "wrong api");
        return;
    }

    if(!['POST', 'GET'].includes(req.method)) {
        sayAboutTeapot(res, "wrong methods");
        return;
    }

    switch (req.method) {
        case 'GET':
            getAllTodos(res);
            break;
        case 'POST':
            await createNewTodo(req, res);
            break;
    }

});

const response = (res, result) => {
    res.setHeader('content-type', 'application/json');
    res.end(result);
}

const getAllTodos = (res) => {
    response(res, JSON.stringify(db.read()));
}

const createNewTodo = async (req, res) => {
    
    // 1. get body
    let newTodo = null;

    try {
        newTodo = await getTodoFromReq(req);
        newTodo.id = (new Date()).getTime();
        newTodo.created = (new Date()).toISOString();
    } catch(err) {
        sayAboutTeapot(res);
    }

    // 2. create row in db
    try {
        // throw new Error({error: 'error text'});
        db.write(newTodo);
        res.statusCode = 201;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({status: "success", message: "created"}));
        
    } catch(err) {
        res.statusCode = 500;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({status: "error", message: JSON.stringify(err)}));
    }
    
}

const getTodoFromReq = (req) => {
    return new Promise((resolve, reject) => {
        const bodyChunks = [];
        req.on('data', (chunk) => {
            bodyChunks.push(chunk);
        });

        req.on('end', () => {
            const body = Buffer.concat(bodyChunks);
            try {
                resolve(JSON.parse(body.toString()));
            } catch (err) {
                reject(err);
            }   
        });

        req.on('error', error => {
            reject(error);
        });
    });
}

const sayAboutTeapot = (res, msg="Something went wrong") => {
    res.statusCode = 418;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({status: "error", message: msg}));
}

const port = process.env.PORT || 3000;
server.listen(port, () => {
   console.log(`Server started on port ${port}`); 
});