const { Schema, model } = require("mongoose");
  
const userset = new Schema({
  userID: { type: String },
  blacklist:{
    esta: { type: Boolean, default: false},
    desde: { type: String },
    motivo: { type: String }
  },
  economia: {
      trabalho: {
          maxmoney: { type: Number },
          trampo: { type: String },
          cooldown: { type: Number },
          banimentos: { type: Number, default: 0 },

      },
      marry:{
        casado: { type: Boolean, default: false },
        com: { type: String },
        des: { type: String, default: 8383930 },
      },
      banco: { type: Number, default: 0 },
      money: { type: Number, default: 0 },
      backgrounds: [],
      background: { type: String, default: "https://i.imgur.com/vFqyhnK.png"},
      sobremim: { type: String, default: "Use /sobremim para alterar este texto."},
      
   
      
  },
  cooldowns: {
    trabalho: { type: String, default: 0 },
    gf: { type: String, default: 0 },
    xcam: { type: String, default: 0 },
    roubar: { type: String, default: 0 },
    work: { type: String, default: 0 },
    daily: { type: String, default: 0 },
    semanal: { type: String, default: 0 },
  },

 

  });

module.exports = model("Usuários", userset);