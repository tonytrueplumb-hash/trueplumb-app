import "server-only";

// Works out whether an invite link can be used right now.
export function inviteStatus(link) {
  if (!link || !link.active) return "off";
  if (link.expires_at && Date.parse(link.expires_at) <= Date.now()) return "expired";
  if (link.used >= link.max_uses) return "full";
  return "open";
}

// Short, unguessable, easy-to-read code (no 0/O/1/I/L).
export function newInviteCode() {
  const abc = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  return Array.from(bytes, b => abc[b % abc.length]).join("");
}
