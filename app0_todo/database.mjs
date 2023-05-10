import * as fs from 'node:fs';

export default class Database {
    content = [];
    constructor(filepath) {
        // fixme
        this.filepath = filepath;
        try {
            if(!fs.existsSync(this.filepath)) {
                this._initDB();
            }
            this.content = JSON.parse(fs.readFileSync(this.filepath));
            console.log('database was init');
        } catch(err) {
            console.log('read database file error', err);
        }
    }

    write(item) {
        if(this._isValidItem(item)){
            this.content.push(item);
            this._updateDB();
        }
    }

    read() {
        return this.content;
    }

    _initDB() {
        this._updateDB();
    }

    _updateDB() {
        fs.writeFileSync(this.filepath, JSON.stringify(this.content));
    }

    _isValidItem(item) {
        return true; // FIXME: !
    }
    
}