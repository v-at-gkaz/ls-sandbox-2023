import * as http from 'node:http';
import Logic from './logic.mjs';

const server = http.createServer((req, res) => {

    // console.log('method', req.method);
    // console.log('host', req.headers.host);

    console.log('url', req.url);

    const params = req.url.replace('/?', '').split('&');

    // check 1
    if(!(params[0][0] === 'a' && params[1][0] === 'b' && params[2][0] === 'c')){
        res.statusCode = 500;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({status: "error", message: "wrong params: a,b,c"}));
        return;
    }

    // check 2 // FIXME:

    // check ... n // FIXME:

    // FIXME:
    const a=1, b=2, c=3;
    const l = new Logic(a,b,c);
    response(res, l.getResult());
});

const response = (res, result) => {
    res.setHeader('content-type', 'application/json');
    res.end(result);
}

const port = process.env.PORT || 3000;
server.listen(port, () => {
   console.log(`Server started on port ${port}`); 
});