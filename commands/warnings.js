const Discord = require('discord.js');
const db = require('quick.db');

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
  if (!member) return message.channel.send("Who are you trying to list the warns of?")
  db.fetch(`${member.user.id}_${message.guild.id}_warns`).then(i => {
    let list;
    console.log(i)
    var warnings = countProperties(i);
    if (warnings.length < 0) list = "This member has no warns!";
    else if (i === null) list = "This member has no warns!"
    else list = i.join("\n")
    message.channel.send(`Warning List: \n${list}`)
})};

exports.help = {
  name: "warnings",
  description: "Gets the list of warnings from a specified users",
  usage: "s.warnings [user]     MODERATOR ONLY"
}

exports.aliases = []
