import { events } from "bdsx/event";
import { Player } from "bdsx/bds/player";
import { MinecraftPacketIds } from "bdsx/bds/packetids";





const cpsMap = new Map<string, number>();


export function getCps(pl: Player): number {
  return cpsMap.get(pl.getXuid()) ?? 0;
}

export function setCps(pl: Player, cps: number): void {
  cpsMap.set(pl.getXuid(), cps);
}



events.packetSend(MinecraftPacketIds.LevelSoundEvent).on((pk, ni) => {
  if (pk.sound === 42) {
    const pl = ni.getActor();
    if (!pl) return;

    addAndSendCps(pl);
  }
});

events.packetBefore(MinecraftPacketIds.InventoryTransaction).on((pk, ni) => {
  if (pk.transaction?.isItemUseOnEntityTransaction()) {
    const pl = ni.getActor();
    if (!pl) return;

    addAndSendCps(pl);
  }
});


function addAndSendCps(pl: Player) {
  const xuid = pl.getXuid();
  let cps = getCps(pl);
  cps++;

  cpsMap.set(xuid, cps);

  setTimeout(() => {
    pl.sendActionbar(`CPS: ${cps}`);
  }, 1);

  setTimeout(() => {
    cpsMap.set(xuid, cpsMap.get(xuid)! - 1);
  }, 1000);
}
