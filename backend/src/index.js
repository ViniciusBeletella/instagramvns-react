const express = require ('express');
const mongoose = require ('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
//websocket permite a comunicacao em tempo real 
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://semana:semana@cluster0-svubo.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});


app.use((req, res, next) => {
req.io = io;

    next();
});

//sem isso o react nao acessa a aplicacao
app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);
