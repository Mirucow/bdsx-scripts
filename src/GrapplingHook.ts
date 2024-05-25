import { Actor } from "bdsx/bds/actor";
import { int32_t } from "bdsx/nativetype";
import { procHacker } from "bdsx/prochacker";





class FishingHook extends Actor {
}

const FishingHook$getOwner = procHacker.js("?getOwner@FishingHook@@QEAAPEAVActor@@XZ", Actor, {this: FishingHook});
const FishingHook$retrieve = procHacker.hooking("?retrieve@FishingHook@@QEAAHXZ", int32_t, {this: FishingHook})(onRetrieve);

function onRetrieve(this: FishingHook): number {
  const res = FishingHook$retrieve.call(this);

  if (res == 2) {
    const owner = FishingHook$getOwner.call(this) as Actor;

    if (owner.isPlayer()) {
      const oPos = owner.getFeetPos();
      const hPos = this.getPosition();

      const angle = Math.atan2(oPos.z - hPos.z, oPos.x - hPos.x);

      const r = owner.distanceTo(this.getPosition()) / 2;

      const x = r * Math.cos(angle);
      const y = 0.5 + (hPos.y - oPos.y) / 6;
      const z = r * Math.sin(angle);

      owner.knockback(owner, 0, x, z, r, y, 3.5);
    }
  }

  return res;
}