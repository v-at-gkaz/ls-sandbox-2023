module.exports.sendHttpResponse = (res, status, responseBody) => {
    res.status(status);
    res.send(responseBody);
};