/*
MapleCSS Compiler
written by  Sandeep Vattapparambil
sandeepv68@gmail.com
*/

//Import npm packages here
var fs = require("fs");//FileSysytem & I/O
var path = require('path')//Get filename extention
var colors = require('colors/safe');//Colors for painting command-line
var moment = require('moment');//Date & Time applications
var log_flag = 0;//logger flag
if (process.argv.length <= 2){
  var data = fs.readFileSync('ascii_art.txt');//Console start ASCII art file
  console.log(colors.green.bold(data));//Console start ASCII art
  console.log(colors.green.bold("\n MapleCSS Compiler v1.0"));
  //Console start state with options list.
  console.log(colors.red.bold("\n No data/file is passed in for compilation!"));
  console.log(colors.cyan("\n Usage: $node maple file_name.mss --options"));
  console.log(colors.cyan("\n      [option]       [description]"));
  console.log(colors.cyan("\n       -h --help      help and documentation"));
  console.log(colors.cyan("\n       -v --version   version information"));
  console.log(colors.cyan("\n       -o --output    set target file name (default is same as source)"));
  console.log(colors.cyan("\n       -m --minify    minification of target code (_file_name.min.css)"));
  console.log(colors.cyan("\n       -j --jsonify   get intermediate representation of code in JSON"));
  console.log(colors.cyan("\n       -l --log       log the compiler"));
  console.log(colors.cyan("\n       -w --watch     watch and recompile mss file when changed"));
  process.exit(-1);
}
else{
  process.argv.forEach(function (val, index, array){
    //console.log(index + ': ' + val);
    if(index == 2){
      if(val == '-h' || val == '--help'){
          //console.log(index);
          console.log(colors.cyan.bold("\n MapleCSS Compiler v1.0 Manual"));
          process.exit(-1);
      }
      else if(val == '-v' || val == '--version'){
        console.log(colors.cyan.bold("\n MapleCSS Compiler v1.0"));
        process.exit(-1);
      }
  }
  else if(index == 3){
    if(val == '-l' || val == '--log'){
      log_flag = 1;
      console.log(colors.cyan("\n Starting Maple Logger...."));
      message = "Starting Maple Logger....";
      logger(message);
    }
  }
  });
  var file = process.argv[2];
  console.log(colors.cyan('\n Reading file --> ' + file));
  if(log_flag == 1){
    message = 'Reading file --> ' + file;
    logger(message);
  }
  var source_file = process.argv[2];
  var extention = path.extname(source_file);
  var getFile = fs.readFile(source_file, function(err){
    if(err){
      console.log(colors.red.bold('\n No file or directory is found !'));
      console.log(colors.yellow('\n MapleCSS Compiler is exiting.....'));
      if(log_flag == 1){
        message = 'No file or directory is found ! --> MapleCSS Compiler is exiting.....';
        logger(message);
      }
    }
    else if(extention == ".mss"){
        console.log(colors.green('\n OK '+ source_file + ' is a valid mss file\n'));
        if(log_flag == 1){
          message = 'OK '+ source_file + ' is a valid mss file';
          logger(message);
        }
        fs.readFile(source_file, 'utf8', function(err, data){
          if (err) throw err;
          console.log(data);
          if(log_flag == 1){
            message = 'data stream displayed.';
            logger(message);
            message = 'Compiler halted!';
            logger(message);
          }
        });
      }
      else{
          console.log(colors.red.bold('\n '+source_file + ' is not a valid mss file'));
          console.log(colors.yellow('\n MapleCSS Compiler is exiting.....'));
          if(log_flag == 1){
            message = '\n '+source_file + ' is not a valid mss file --> MapleCSS Compiler is exiting.....';
            logger(message);
          }
      }
  });
}
function logger(i){
  var timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
  var file_name = process.argv[2]
  var message = i;
  var string =  "\nMaple log ["+timestamp+"] [file --> "+file_name+"] [message --> "+message+"]";
  var putfile = fs.appendFile('log.txt', string, function (err) {
    if (err){
        return console.log("\n Error logging the compiler!");
    }
  });
  return;
  //return string;
}
