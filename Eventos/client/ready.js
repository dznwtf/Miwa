const client = require("../../index");
const mongo = require("mongoose")
client.on("ready", () =>{

  process.on('multipleResolves', (type, reason, promise) => {
    console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)
});
process.on('unhandRejection', (reason, promise) => {
    console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});

let status = [
      `miwa.club | /help`,
      `/help | /invite`,
      `/perfil | /help`,
      `dzn#0001 meu criador`
    ],
    i = 0
  setInterval(() =>{
client.user.setActivity(`${status[i++ % status.length]}`, { 
    type: `WATCHING` 
})
  }, 1000 * 10); 

client.user.setStatus('online')
     
  mongo.connection.on('connected', () =>{
  console.log('🍃 MongoDB on')
})
  client.MongoConnect()

  console.log(`🤖 Bot on em ${client.user.tag} `)

})