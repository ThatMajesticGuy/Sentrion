const Discord = require('discord.js');
const key = process.env.YOUTUBE_API_KEY
const fs = require("fs");;
const yt = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(key);
const opus = require("node-opus");
const gyp = require("node-gyp");

exports.run = async (bot, message, args, queue) => {

  const searchString = args.slice(1).join(' ');
  const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);

  const voiceChannel = message.member.voiceChannel;
  if(!voiceChannel) return message.channel.send("I cannot seem to be able to join your voice channel, make sure I have proper permissions to do so!");
  const permissions = voiceChannel.permissionsFor(bot.user);
  if (!permissions.has('CONNECT')) {
			return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
		  const playlist = await youtube.getPlaylist(url);
		  const videos = await playlist.getVideos();
		  for (const video of Object.values(videos)) {
		    const video2 = await youtube.getVideoByID(video.id);
		    await handleVideo(video2, message, voiceChannel, true);
		  }
		  return message.channel.send(`:white_check_mark: Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
		  try {
		    var video = await youtube.getVideo(url);
		  } catch (error) {
		    try {
		      var videos = await youtube.searchVideos(searchString, 10);
		      let index = 0;

		      const Embed2 = new Discord.RichEmbed()
          .setTitle(":musical_note: Song Selection :musical_note:")
          .setDescription(videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n'))
          .setColor("#503d82")
          .setFooter("Please provide a value to select one of the search results ranging from 1-10.")


          let msgtoDelete = await message.channel.send({embed: Embed2});

          try {
            var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
              maxMatches: 1,
              time: 10000,
              errors: ['time']
            });
            msgtoDelete.delete();
          } catch (err) {
            console.error(err);
            const noPick = new Discord.RichEmbed()
            .setDescription("No or invalid value entered, cancelling video selection.")
            .setColor("#503d82")
            message.channel.send({embed: noPick});
            msgtoDelete.delete()
            return;
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex -1].id);
		    } catch (err) {
		      console.error(err);
		      return message.channel.send(":sos: I could not obtain any search results.");
		    }
		  }
		  return handleVideo(video, message, voiceChannel);
		}


		async function handleVideo(video, message, voiceChannel, playlist = false) {
		  const serverQueue = queue.get(message.guild.id);
		  console.log(video);
		  const song = {
		    id: video.id,
		    title: video.title,
		    url: `https://www.youtube.com/watch?v=${video.id}`
		  };
		  if (!serverQueue) {
		    const queueConstruct = {
		      textChannel: message.channel,
		      voiceChannel: voiceChannel,
		      connection: null,
		      songs: [],
		      volume: 5,
		      playing: true
		    };
		    queue.set(message.guild.id, queueConstruct);

		    queueConstruct.songs.push(song);

		    try {
		      var connection = await voiceChannel.join();
		      queueConstruct.connection = connection;
		      play(message.guild, queueConstruct.songs[0]);
		    } catch (error) {
		      console.error(`I could not join the voice channel: ${error}`);
		      queue.delete(message.guild.id);
		      return message.channel.send(`I could not join the voice channel: ${error}`)
		    }
		  } else {
		    serverQueue.songs.push(song);
		    console.log(serverQueue.songs);
		    if (playlist) return undefined;
		    else return message.channel.send(`:white_check_mark: **${song.title}** has been added to the queue!`);
		  }
		  return undefined;
		}

		function play(guild, song) {
		  const serverQueue = queue.get(guild.id);

		  if (!song) {
		    serverQueue.voiceChannel.leave();
		    queue.delete(guild.id);
		    return;
		  }
		  console.log(serverQueue.songs);

		  const dispatcher = serverQueue.connection.playStream(yt(song.url))
		          .on('end', reason => {
		            if (reason === "Stream is not generating quickly enough.") console.log('Song ended.');
		            else console.log(reason);
		            serverQueue.songs.shift();
		            play(guild, serverQueue.songs[0]);
		          })
		          .on('error', error => console.error(error));
		  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

		  serverQueue.textChannel.send(`:notes: Now playing: **${song.title}**`)
		}


}


exports.help = {
    name: "play",
    description: "Plays music to you",
    usage: "s.play [song-name] || s.play [url] || s.play [playlist-url]"
}

exports.aliases = []
