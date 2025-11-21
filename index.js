const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');
const accounts = require('./tokens.json');

accounts.forEach((acc, i) => {
  const client = new Client();

  client.on('ready', () => {
    console.log(`[${i + 1}] Logged in as ${client.user.username}`);

    setInterval(async () => {
      client.channels.fetch(acc.channel)
        .then(channel => {
          joinVoiceChannel({
            channelId: channel.id,
            guildId: acc.guild,
            selfMute: true,
            selfDeaf: true,
            adapterCreator: channel.guild.voiceAdapterCreator
          });
        })
        .catch(() => {});
    }, 2000);
  });

  client.login(acc.token);
});
