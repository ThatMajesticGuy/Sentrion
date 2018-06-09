const Discord = require('discord.js');

exports.run = (bot, message, args) => {
  message.channel.send('Pinging... sec').then(msg => {
    var embed = new Discord.RichEmbed()
    .setTitle("Pong! :ping_pong:")
    .setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
    .setAuthor("Ping Command")
    .setColor("BLUE")
    .setTimestamp()
    .setThumbnail(message.author.displayAvatarURL)
    .addField("Latency Ping", `${msg.createdTimestamp - message.createdTimestamp} ms`)
    .addField("API Ping", `${Math.round(bot.ping)} ms`)
    msg.edit({ embed: embed })
  })
}

exports.help = {
  name: "ping",
  description: "Gets your ping",
  usage: "s.ping"
}

exports.aliases = []
