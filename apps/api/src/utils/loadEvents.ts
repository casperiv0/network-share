import process from "node:process";
import { resolve } from "node:path";
import { globby } from "globby";
import type { Event } from "../structures/Event.js";
import type { SocketService } from "../services/Socket.js";

export async function loadEvents(service: SocketService) {
  const isProd = process.env.NODE_ENV === "production";
  const path = isProd ? "./dist/events/**/*.js" : "./src/events/**/*.ts";

  const paths = await globby(path);
  const map = new Map<string, Event>();

  for (const path of paths) {
    const resolved = resolve(path);

    const File = await (await import(resolved)).default;
    const event = new File(service) as Event;

    map.set(event.name, event);
  }

  return map;
}
