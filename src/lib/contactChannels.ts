import type { ContactChannel } from "./types";

export function findContactChannel(
  channels: ContactChannel[],
  purpose: ContactChannel["purpose"]
) {
  return channels.find((channel) => channel.purpose === purpose);
}
