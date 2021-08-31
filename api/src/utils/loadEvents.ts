import { resolve } from "node:path";
import { globby } from "globby";
import { Event } from "structures/Event";
import { SocketService } from "services/Socket";

export async function loadEvents(service: SocketService) {
  const paths = await globby("./src/events/**/*.ts");

  const map = new Map<string, Event>();

  for (const path of paths) {
    delete require.cache[path];

    const resolved = resolve(path);

    const File = await (await import(resolved)).default;
    const event = new File(service) as Event;

    map.set(event.name, event);
  }

  return map;
}
