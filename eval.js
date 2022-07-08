const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs')
const ayarlar = require("../ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const db = require("quick.db");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const http = require("http");
const express = require("express");
const csu = require("useful-tools");
const paginationEmbed = require('discord.js-pagination');
const bot = new Discord.Client();
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const { stripIndents } = require('common-tags');

exports.run = async(client, message, args, msg) => {

    	var authors = ["348300663320739840","397024803866935297"];
    if(!authors.includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed()
    .setImage("https://i.hizliresim.com/kxbxuoq.png")
    .setFooter(`Komutu kullanan: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))).then(message.react('<:olumsuz:929755880302473286>')).then(message => message.delete({timeout: 5000}));

          try {


    var code = args.join(" ");
    var evaled = eval(code);
    let tip = typeof(evaled)

    evaled = require("util").inspect(evaled);

    if(evaled.length>1000){
      let Embed = new Discord.MessageEmbed()
    .addField("**Giriş:**","```js\n" + code + "```")
    .setDescription("**Sonuç:**\n```js\n" +evaled.slice(0,1000) + "...```")
    .addField('Tür', `\`${tip}\``, true)
    .addField('Uzunluk', `\`${evaled.length}\``, true)
    .addField('Zaman', ` \`0.0${client.ws.ping} ms\` `, true)

    message.channel.send(Embed).then(async function(mesajzz) {
      const filter = (reaction, user) => user.id === message.author.id;
      await mesajzz.react("<:evalClear:938629275374981201>").catch(function() {})
      await mesajzz.react("<:evalHide:938629427846340628>").catch(function() {})
      await mesajzz.react("<:evalBack:938629478538674296>").catch(function() {})
      var reactions = mesajzz.createReactionCollector(filter);

      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "evalClear") {
          mesajzz.delete()
    message.delete()
    }
      });
      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "evalHide") {
          mesajzz.edit(new Discord.MessageEmbed()
    .addField("**Giriş:**","<:olumsuz:929755880302473286>```diff\n- Bu eval "+message.member.displayName+" tarafından gizlendi.```")

  .setDescription("**Sonuç:**\n<:olumsuz:929755880302473286>```diff\n- Bu eval "+message.member.displayName+" tarafından gizlendi.```")
    .addField('Tür', `\`Gizlendi\``, true)
    .addField('Uzunluk', `\`Gizlendi\``, true)
    .addField('Zaman', ` \`Gizlendi\` `, true))

        }
      });
      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "evalBack") {
          mesajzz.edit(Embed)

        }
      });
    });

    }else{

    let Embed = new Discord.MessageEmbed()
    .addField("**Giriş:**","```js\n" + code + "```")

    .setDescription("**Sonuç:**\n```js\n" + clean(evaled) + "```")
    .addField('Tür', `\`${tip}\``, true)
    .addField('Uzunluk', `\`${evaled.length}\``, true)
    .addField('Zaman', ` \`0.0${client.ws.ping} ms\` `, true)

    message.channel.send(Embed).then(async function(mesajzz) {
      const filter = (reaction, user) => user.id === message.author.id;
      await mesajzz.react("<:evalClear:938629275374981201>").catch(function() {})
      await mesajzz.react("<:evalHide:938629427846340628>").catch(function() {})
      await mesajzz.react("<:evalBack:938629478538674296>").catch(function() {})
      var reactions = mesajzz.createReactionCollector(filter);

      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "evalClear") {
          mesajzz.delete()
    message.delete()
  }
      });
      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "evalHide") {
          mesajzz.edit(new Discord.MessageEmbed()
    .addField("**Giriş:**","<:olumsuz:929755880302473286>```diff\n- Bu eval "+message.member.displayName+" tarafından gizlendi.```")

    .setDescription("**Sonuç:**\n<:olumsuz:929755880302473286>```diff\n- Bu eval "+message.member.displayName+" tarafından gizlendi.```")
    .addField('Tür', `\`Gizlendi\``, true)
    .addField('Uzunluk', `\`Gizlendi\``, true)
    .addField('Zaman', ` \`Gizlendi\` `, true))

  }
      });
      reactions.on("collect", async function(reaction) {
        if (reaction.emoji.name === "evalBack") {
          mesajzz.edit(Embed)

        }
      });
    });


    }

  }

catch (err) {
    message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }



function clean(text) {
if (typeof(text) === "string")
  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
  return text;
}

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: 2
};
exports.help = {
    name: "eval",
    category: 'geliştirici',
    description: "Geliştirici özel komut.",
    usage: "m!eval <kod>",
}
