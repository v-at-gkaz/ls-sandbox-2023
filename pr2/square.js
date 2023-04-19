module.exports = class Square { // common js
    constructor(w) {
        this.width = w;
    }

    area() {
        return Math.pow(this.width, 2);
    }


    someMethod() {
        return new Promise(resolve=>{
            setTimeout(()=>{
                resolve('ok');
            }, 2000);
        });
    }

}