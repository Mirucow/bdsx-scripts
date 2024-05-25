import { events } from "bdsx/event";





const PlayerCount = 10000;
const MaxPlayerCount = 12345;

events.queryRegenerate.on(ev => {
  ev.currentPlayers = PlayerCount;
  ev.maxPlayers = MaxPlayerCount;
});