// require modules
const fs = require('fs');
const archiver = require('archiver');

var distDir = process.cwd() + '/dist';
var output = fs.createWriteStream(distDir + '/menuzen-widget-old-device.zip');
var archive = archiver('zip');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, 0744);
}

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function () {
  console.log('menuzen zip signage widget.');
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function () {});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on('error', function (err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);

archive.glob('**', {
  ignore: ['config/**', 'themes/**', 'bower_components/**', 'node_modules/**', 'dist/**', 'package.json', 'npm-debug.log', 'CVS/**', 'config.gypi', 'package-lock.json', 'zip.js']
})

archive.finalize();