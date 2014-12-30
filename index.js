require('shelljs/global');

var rimraf = require('rimraf');
var dateFormat = require('dateformat');

module.exports = function (opts) {
    if (!which('git')) {
      throw new Error('You shoule install git first');
      exit(1);
    }  

    var config = {
      silent: true,
      deepSilent: false,
      message: 'commit auto by wd-deploy on ',
      branch: 'master'
    };

    //
    var cwd = process.cwd();

    var dirpath = cwd;
    //关于创建目录的策略
    cd(dirpath);

    //已经拉取了的
    if (exec('git status ' + dirpath, {silent: config.silent}).code !== 0) {
        cd('/..');
        rimraf(dirpath);

        if (exec('git clone ' + config.remote + ' ' + dirpath).code !== 0) {
            throw new Error('Git clone failed');
            exit(1);
        }
    }


    cd(dirpath);

    //没有clone过的就checkout 
    exec('git checkout ' + config.branch, {silent: config.silent});

    exec('git pull', {silent: config.silent});


    //git add 
    exec('git add -A', {silent: config.silent});

    //git status
    exec('git status', {silent: config.deepSilent});

    //git commit 
    //add time or other msg your like
    exec('git commit -m "' + config.message + (new Date().getTime()) + '"', {silent: config.deepSilent});

    //git push
    exec('git push', {silent: config.deepSilent})
};