import * as http from 'node:http';
import * as fs from 'node:fs';

const server = http.createServer((req, res) => {

    // console.log('method', req.method);
    // console.log('host', req.headers.host);
    // console.log('url', req.url);
    // const params = req.url.replace('/?', '').split('&');

    const bodyChunks = [];

    req.on('data', (chunk) => {
        // console.log('data detected', chunk);
        bodyChunks.push(chunk);
    });

    req.on('end', () => {
        const body = Buffer.concat(bodyChunks);

        const contentType = req.headers['content-type'];

        console.log('contentType', contentType);

        if(contentType === 'application/json') {
            console.log('body?', JSON.parse(body.toString()));
        }

        // fs.writeFileSync('./file.zip', body);
        
    });


    response(res, JSON.stringify({status: 'ok'}));

});

const response = (res, result) => {
    res.setHeader('content-type', 'application/json');
    res.end(result);
}

const port = process.env.PORT || 3000;
server.listen(port, () => {
   console.log(`Server started on port ${port}`); 
});