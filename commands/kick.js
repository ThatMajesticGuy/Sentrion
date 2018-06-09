const Discord = require('discord.js');


exports.run = (bot, message, args) => {
  if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You do not have permission to run this command!")
  const member = message.mentions.members.first();
  if (!member) return message.channel.send("Who are you trying to kick?")
  const reason = message.content.split(" ").slice(2).join(" ")
  if (!reason) return message.channel.send("What is the reason that they are being kickned for?")
  if (!member.kickable) return message.channel.send("I cannot kick this user! Maybe I dont have permission or this person is a higher role than me!")
  member.kick(reason)
  .catch(err => message.channel.send(`ERROR! Contact ThatMajesticGuy IMMEDIATLY!\n\n${err.stack}`))
  message.channel.send(`**${message.author.username}** has kicked **${member.user.username}** for **${reason}**`)
  var embed = new Discord.RichEmbed()
  .setAuthor("Kick Command")
  .setColor("#ff1919")
  .setThumbnail(member.user.displayAvatarURL)
  .setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
  .addField("Member Kicked", `**${member.user.username}**`)
  .addField("Their ID", `**${member.user.id}**`)
  .addField("Mod who kicked them", `**${message.author.username}**`)
  .addField("Reason", `**${reason}**`)
  bot.channels.get("455054845146169365").send({ embed: embed })
}


exports.help = {
  name: "kick",
  description: "Kicks a user",
  usage: "s.kick [user] [reason]            MODERATORS ONLY!"
}

exports.aliases = []
