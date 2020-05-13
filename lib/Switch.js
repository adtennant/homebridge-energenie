const spawn = require('child_process').spawn;

const Switch = function(registry, op, device, callback) {
    if(device == null) callback("no device name provided");

    let err = "";
    console.log(__dirname);
    console.log(registry.dir() );
    const cmd = spawn("python", [__dirname + "/switch.py", op, device ], { cwd: registry.dir() });

    cmd.stdout.pipe(process.stdout);

    cmd.stderr.on("data", function(data) {
        err += data;
    });

    cmd.on("close", function(code) {
        if(callback != null) {
            if(err.length > 0) callback(err);
            else callback(null);
        }
    });
};

module.exports = Switch;
