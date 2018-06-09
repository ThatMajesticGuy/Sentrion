const Discord = require('discord.js');
const db = require('quick.db');
const dateformat = require('dateformat')

exports.run = (bot, message, args) => {
  function countProperties (obj) {
    var count = 0;

    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }

    return count;
}

  if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You do not have permission to run this command!")
  const member = message.mentions.members.first();
  if (!member) return message.channel.send("Who are you trying to warn?")
  const warn = message.content.split(" ").slice(2).join(" ")
  if (!warn) return message.channel.send(`Why is **${member.user.username}** being warned?`)
  db.fetch(`${member.user.id}_${message.guild.id}_warns`).then(i => {
    var warnings = countProperties(i);
    let number;
    if (warnings.length < 0) {
      db.set(`${member.user.id}_${message.guild.id}_warns`, [])
    }
    if (i === null) number = 1
     else number = i.length + 1
    db.push(`${member.user.id}_${message.guild.id}_warns`, `${number}. **${warn}** at **${dateformat(Date.now(), "mmmm dS, yyyy, On a dddd, h:MM:ss TT, Z")}**`)
    message.channel.send(`**${member.user.username}** has been warned for **${warn}**!`)
  })
  db.fetch(`${member.user.id}_${message.guild.id}_warns`).then(o => {
    const banrole = message.guild.roles.find("name", "TO BE BANNED")
    if (o.length >= 10) member.addRole(banrole.id)
  })
}

exports.help = {
  name: "warn",
  description: "Warns a user",
  usage: "s.warn [reason]     MODERATOR ONLY"
}

exports.aliases = []
