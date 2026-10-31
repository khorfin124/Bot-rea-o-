const { Client, GatewayIntentBits, Partials, Events } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message, 
        Partials.Channel, 
        Partials.Reaction
    ],
});

// CONFIGURAÇÕES PRINCIPAIS
const CHANNEL_ID = 'SEU_CANAL_ID_AQUI'; // Canal onde está a mensagem de reação
const MESSAGE_ID = 'SUA_MENSAGEM_ID_AQUI'; // ID da mensagem onde os usuários vão reagir

// Relacione o emoji ao ID do cargo correspondente
const rolesMap = {
    '🎮': 'ID_DO_CARGO_GAMER',
    '🎨': 'ID_DO_CARGO_DESIGNER',
    '💻': 'ID_DO_CARGO_PROGRAMADOR',
};

client.once(Events.ClientReady, () => {
    console.log(`Bot online como ${client.user.tag}!`);
});

// Evento disparado quando o usuário ADICIONA uma reação
client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (user.bot) return;

    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    if (reaction.message.channel.id !== CHANNEL_ID || reaction.message.id !== MESSAGE_ID) return;

    const roleId = rolesMap[reaction.emoji.name];
    if (!roleId) return;

    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id).catch(() => null);

    if (member) {
        await member.roles.add(roleId).catch(err => console.error('Erro ao dar cargo:', err));
    }
});

// Evento disparado quando o usuário REMOVE uma reação
client.on(Events.MessageReactionRemove, async (reaction, user) => {
    if (user.bot) return;

    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    if (reaction.message.channel.id !== CHANNEL_ID || reaction.message.id !== MESSAGE_ID) return;

    const roleId = rolesMap[reaction.emoji.name];
    if (!roleId) return;

    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id).catch(() => null);

    if (member) {
        await member.roles.remove(roleId).catch(err => console.error('Erro ao remover cargo:', err));
    }
});

// Token do bot inserido diretamente no código
client.login('MTU2NTk0NDYyMTQzNDE0Njk2Nw.GbrXwf.dnjpdRXIw-DfvryLIwUUYwqgOdzQO-NS5VCBW0');
