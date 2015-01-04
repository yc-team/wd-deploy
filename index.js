require('shelljs/global');

var dateFormat = require('dateformat');
var program = require('commander');



module.exports = function (argv) {

    var config = {
        isCloned: false,
        silent: true,
        deepSilent: false,
        remote: '',     //now i set '' by default instead of undefined
        message: '[command line] commit auto by @wd-deploy on ',
        branch: 'master'
    };

    
    function cloneFn (val) {
        //TODO check if it is a really repo url
        //TODO change repo url to github url
        config.remote = val;
    }
    
    //TDOO version auto from pkg
    program
      .version('0.1.2')
      .option('-m, --message', 'Add Commit message by yourself instead of auto')
      .option('-c, --clone <repo url>', 'Clone the defined github url at first', cloneFn)
      .option('-b, --branch', 'Choose a repo branch,default value is master')
      .parse(argv);

    

    //Override by user
    if (program.message) {
        config.message = program.args[0];
    }

    //check git is installed or not
    if (!which('git')) {
        throw new Error('You should install git first');
        exit(1);
    }

    

    //cwd
    var cwd = process.cwd();


    //关于创建目录的策略
    //TODO 
    var dirpath = cwd;
    cd(dirpath);

    //已经拉取了的
    //{ code: 0, output: '# On branch master\nnothing to commit (working directory clean)\n' }
    if (exec('git status ' + dirpath, {silent: config.silent}).code !== 0) {
        cd('./..');


        //use rimraf.sync
        //rimraf.sync(dirpath);

        //mkdir(dirpath);

        if (exec('git clone ' + config.remote + ' ' + dirpath).code !== 0) {
            //TODO more friendly?
            throw new Error('Git clone failed, use wd -c <repo url> first');
            exit(1);
        } else {
            config.isCloned = true;
        }
    } else {
        config.isCloned = true;
    }


    cd(dirpath);

    //git checkout 
    exec('git checkout ' + config.branch, {silent: config.silent});

    //git pull
    exec('git pull', {silent: config.silent});

    //git add 
    exec('git add -A', {silent: config.silent});

    //git status
    exec('git status', {silent: config.deepSilent});

    //git commit 
    //add time or other msg your like
    exec('git commit -m "' + config.message + dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss') + '"', {silent: config.deepSilent});

    //git push
    exec('git push', {silent: config.deepSilent})

};