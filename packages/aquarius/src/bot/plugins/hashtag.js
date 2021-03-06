import { checkBotPermissions } from '@aquarius-bot/permissions';
import debug from 'debug';
import { Permissions } from 'discord.js';

const log = debug('Hashtag');

/** @type {import('../../typedefs').CommandInfo} */
export const info = {
  name: 'hashtag',
  description: 'Discourages hashtags through emoji responses.',
  permissions: [Permissions.FLAGS.ADD_REACTIONS],
};

async function decorateMessage(message) {
  await message.react('✋');
  await message.react('#⃣');
  await message.react('🇭');
  await message.react('🇹');
  await message.react('🇦');
  await message.react('🇬');
  await message.react('🇸');
}

/** @type {import('../../typedefs').Command} */
export default async ({ aquarius, analytics }) => {
  aquarius.onMessage(info, (message) => {
    const matches = message.cleanContent.match(/(?<channel>#\w+)/i);

    if (matches) {
      const check = checkBotPermissions(message.guild, ...info.permissions);

      if (!check.valid) {
        log('Invalid permissions');
        return;
      }

      const channels = message?.mentions?.channels?.size ?? 0;

      if (matches.length - 1 > channels) {
        log(
          `Decorating ${matches.groups.channel} by ${message.author.username}`
        );
        decorateMessage(message);
        analytics.trackUsage('decorate', message, { type: 'hash' });
      }
    } else if (message.cleanContent.toLowerCase().includes('hashtag')) {
      log(`Decorating Hashtag word by ${message.author.username}`);
      decorateMessage(message);
      analytics.trackUsage('decorate', message, { type: 'word' });
    }
  });
};
