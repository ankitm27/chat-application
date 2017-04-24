var express=require('express');
var app=express();
var server=require('http').Server(app);
var io=require('socket.io')(server);
var users=[];
var connections=[];

app.get('/',function(req,res){
	res.sendfile("index.html");
});
app.use('/css',express.static(__dirname+'/css'));
app.use('/js',express.static(__dirname+'/js'));
app.use('/node_modules',express.static(__dirname+'/node_modules'));
io.on('connection',function(sockets){
	//console.log(sockets);
	console.log("a person is connected");
	connections.push(sockets);
	console.log("sockets %s connected",connections.length);

	sockets.on('disconnect',function(data){
		connections.splice(connections.indexOf(sockets),1);
		console.log("Disconnected %s socket connections",connections.length);
	});
	
	sockets.on('send',function(data){
		console.log(data);
		io.emit('new',{msg:data});
	})

});
//console.log("sockets %s connected",connections.length);
server.listen(process.env.PORT || 3000,function(){
	console.log("this works...");
});


