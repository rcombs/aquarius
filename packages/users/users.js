import { GuildMember } from 'discord.js';

/**
 * @typedef {import('discord.js').User} User
 * @typedef {import('discord.js').Guild} Guild
 * @typedef {import('discord.js').Presence} Presence
 * @typedef {import('discord.js').Activity} Activity
 */

/**
 * Gets a User's nickname or username for a Guild
 * @param {Guild} guild - The Guild to get a User's nickname in
 * @param {User} user - The User to get the nickname for
 * @returns {string} The User's Nickname or Username if not set
 */
export function getNickname(guild, user) {
  if (!guild) {
    return user.username;
  }

  let member = user;

  if (!(member instanceof GuildMember)) {
    member = guild.member(user);
  }

  return member?.nickname ?? member.user.username;
}

/**
 * Checks to see if a user is a bot.
 * @param {User} user - user to check
 * @returns {boolean} whether the user is a bot in non-test environments
 */
export function isBot(user) {
  if (process.env.BOT_IGNORE) {
    return false;
  }

  return user.bot;
}

/**
 * Checks to see if a user is streaming or not
 * @param {Presence} presence - presence of the user to check
 * @returns {boolean} whether the user is streaming or not
 */
export function isStreaming(presence) {
  return (
    presence?.activities?.some((activity) => activity.type === 'STREAMING') ??
    false
  );
}

/**
 * Finds the  Game Activity of a User Presence
 * @param {Presence} presence - presence of the user to check
 * @returns {?Activity} The game Activity
 */
export function getGame(presence) {
  return presence?.activities?.find((activity) => activity.type === 'PLAYING');
}

/**
 * Finds the Streaming Activity of a User Presence
 * @param {Presence} presence - presence of the user to check
 * @returns {?Activity} The streaming Activity
 */
export function getStream(presence) {
  return presence?.activities?.find(
    (activity) => activity.type === 'STREAMING'
  );
}
