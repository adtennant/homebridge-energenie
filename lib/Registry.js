const fs = require('fs');

const Registry = function Registry(file) {
    this._file = file;
};

Registry.prototype.reset = function reset() {
    if(fs.existsSync(this._file)) {
        fs.truncateSync(this._file, 0);
    } else {
        fs.closeSync(fs.openSync(this._file, 'w'));
    }
};

Registry.prototype.add = function(accessory) {
    var stream = fs.createWriteStream(this._file, {
        flags: 'a'
    });

    stream.write(`ADD ${accessory.registry_name}\n`);
    stream.write(`type=${accessory.type}\n`);

    if(Array.isArray(accessory.device_id)) {
        stream.write(`device_id=[${accessory.device_id[0]}, ${accessory.device_id[1]}]\n`);
    } else {
        stream.write(`device_id=${accessory.device_id}\n`);
    }

    stream.write(`\n`);
    stream.end();
};

module.exports = Registry;