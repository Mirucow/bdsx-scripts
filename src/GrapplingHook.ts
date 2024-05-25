import { Actor } from "bdsx/bds/actor";
import { int32_t } from "bdsx/nativetype";
import { procHacker } from "bdsx/prochacker";





const Power = 0.5;
const Height = {
  Initial: 0.5,
  Max: 3.5,
  Multiplier: 0.17
}



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

      const r = owner.distanceTo(this.getPosition()) * Power;

      const x = r * Math.cos(angle);
      const y = Height.Initial + (hPos.y - oPos.y) * Height.Multiplier;
      const z = r * Math.sin(angle);

      owner.knockback(owner, 0, x, z, r, y, Height.Max);
    }
  }

  return res;
}
