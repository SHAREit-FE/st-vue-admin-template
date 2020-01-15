const argv = require('yargs').argv;
const process = require('child_process');
// const path = require('path');
const chalk = require('chalk');
const env = argv._[0];
// const cmdStr = 'aws --region=ap-southeast-1 s3 sync ' + path.join(__dirname,'../../dist/ ') + 's3://shareit.static.ap-southeast-1/apollo/' + env + ' --delete --exclude=".*"';

const cmdStr = 'aws --profile overseas s3 sync ./dist/ s3://shareit.static.ap-southeast-1/answer-system/' + env + ' --delete --exclude=".*"';
console.log('Begin to deploy...');
process.exec(cmdStr, function(err, stdout, stderr) {
  if (err) {
    console.error(chalk.red(err));
  }
  if (stderr) {
    console.log(stderr);
  } else {
    console.log(stdout);
    console.log(chalk.green('Deploy success!! Env: ' + env));
  }
});
