const express = require('express');
const app = express();
const port = 3000 || 8080;

app.all('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<html><head><title>YamineHz07</title> <link href="https://fonts.googleapis.com/css?famiy=Roboto Condensed" rel="stylesheet"> <style>body{font-family: "Roboto Condensed"; font-size: 21px; color: white; background-image: url('https://k31.kn3.net/taringa/0/5/C/C/E/B/midun030/8B2.jpg');
        background-repeat: no-repeat;
        background-position: fill;
        height: 200px;
        weight: 500px;

}</style></head><body> 
<font color="white"><h1><b>Multipropuse bot</b></h1> </p></a>Add the repl.co link to <a href="https://uptimerobot.com/">uptimerobot.com</a> to make Bot 24/7 Online!</p> <h1>YamineHz07</h1> <b><a href=https://discord.com/invite/8xVr5RYzbw>Discord Server</a>  |  <a href="https://www.youtube.com/yassinehzz">Youtube Channel</a></b><br/><br/ ahref="https://discord.com/invite/8xVr5RYzbw"> <img src="https://media.discordapp.net/attachments/892827553507729528/959123648780861450/unknown.png"> </a><br/><br/>Help us with a subscribe & don't forget to leave a like <3</a></font></body></html>`);
  res.end();
});

function k() {
  app.listen(port, () => {
    console.log("O Servidor KeepAlive 24/7 está online!".bgGreen.white)
  });
}
module.exports = k;