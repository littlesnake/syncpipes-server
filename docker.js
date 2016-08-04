var child_process = require('child_process');

function start(file) {
    var proc = child_process.spawn('node', [file]);
    proc.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    proc.stderr.on('data', function (data) {
        console.error(data.toString());
    });

    proc.on('exit', function (code) {
        console.log('Child process exited with code ' + code);
        setTimeout(() => {
            start(file);
        }, 5000);
    });
}

start('./dist/server.js');
start('./dist/worker.js');
