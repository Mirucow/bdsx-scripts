import { Player } from "bdsx/bds/player";
import { PlayerListEntry, PlayerListPacket } from "bdsx/bds/packets";
import { void_t } from "bdsx/nativetype";
import { procHacker } from "bdsx/prochacker";
import { Packet } from "bdsx/bds/packet";
import { bedrockServer } from "bdsx/launcher";





const PlayerListPacket$emplace = procHacker.js("?emplace@PlayerListPacket@@QEAAX$$QEAVPlayerListEntry@@@Z", void_t, null, PlayerListPacket, PlayerListEntry);

export function hideFromPlayerList(pl: Player): void {
  const pk = PlayerListPacket.allocate();
  pk.action = 1;
  PlayerListPacket$emplace(pk, PlayerListEntry.constructWith(pl));
  sendToAll(pk);
  pk.dispose();
}

function sendToAll(pk: Packet): void {
  for (const pl of bedrockServer.level.getPlayers()) {
    pl.sendNetworkPacket(pk);
  }
}