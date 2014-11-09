var express = require('express');
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');

var app = express(), server = require('http').createServer(app);

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// HELPER FUNCTIONS ---------------------------------------

// Exectue unix command 
function execute(command, callback) {
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

// Format string
String.prototype.format = function() {
  	var args = arguments;
   	return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
};

// ---------------------------------------------------------

app.get('/', function(req, res){
    res.render('index');
});

app.get('/search', function(req, res){
    // --- setup
    var i = parseInt(req.query.i);
    var file = req.query.files[i-1];
    var sig = req.query.sigs[i-1];
    var lib = (req.query.lib == "pma" ? "phpmyadmin" : "moodle");
    var levels = file.split("/").length + 4;
    // --- search
    cmd = 'find . -path "./data/libs/{0}/?_*_*/{1}" -maxdepth {2}'
    .format(lib,file,levels);
    
    execute(cmd, function(out) {
        if (!out.length) 
            res.send({ cmd: cmd, error: "File Not Found" });
        else {
            var fname = 'f'+i+'.txt', pname = 'p'+i+'.txt'; 
            fs.writeFile('./found/'+fname, out);
            fs.writeFile('./pattern/'+pname, sig);
            cmd = 'xargs grep -f ./pattern/{0} -l < ./found/{1}'
            .format(pname,fname);

            execute(cmd, function(out) {
                error = (!out.length) ? "Signature Not Found" : null;
                res.send({cmd: cmd, out: out, error: error});
            });
        }
    })           
});

var port = Number(process.env.PORT || 3000);
app.listen(port);