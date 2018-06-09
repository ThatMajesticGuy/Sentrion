const Discord = require("discord.js");

exports.run = async(bot, message, args) => {

    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

				 const user = message.mentions.users.first();

				 // If no @user
				 var embed2 = new Discord.RichEmbed()
				 .setAuthor(`Avatar Command`)
				 .addField("Username:", `${message.author.tag}`, true)
         .setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
				 .addField("Your Avatar:", message.author.avatarURL)
				 .setColor(0x00AE86)
				 .setThumbnail(`${message.author.displayAvatarURL}`)
				 .setTimestamp()
				 if(!user) message.channel.send({ embed: embed2 });
				 // if @user
				 else {
				 	var embed = new Discord.RichEmbed()
				.setAuthor("Avatar Command")
        .setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
				.addField("Username:", user.tag, true)
				.addField("Avatar URL:", user.displayAvatarURL, true)
				.setColor(0x00AE86)
				.setThumbnail(`${user.displayAvatarURL}`)
				.setTimestamp()
				message.channel.send({embed: embed})
			 }
}

exports.help = {
    name: "avatar",
    description: "Gives either your avatar or the person you mentioned avatar",
    usage: "s.avatar [user]"
}

exports.aliases = []
