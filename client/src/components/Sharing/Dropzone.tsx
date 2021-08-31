import { FileDrop } from "react-file-drop";
import * as React from "react";
import { socket } from "lib/socket";
import { Events } from "types/Events";

export const Dropzone = () => {
  async function handleDrop(files: FileList | null) {
    if (files === null) return;

    const data = await Promise.all(
      [...files].map(async (v) => ({
        name: v.name,
        type: v.type,
        buffer: new Uint8Array(await v.arrayBuffer()),
      })),
    );

    // TODO: don't send buffers via socket.io, setup express server?
    socket.emit(Events.FILE_UPLOAD, { files: data });
  }

  return (
    <div style={{ height: "50vh" }}>
      <FileDrop className="w-full h-full flex items-center justify-center" onDrop={handleDrop}>
        Drop your files here!
      </FileDrop>
    </div>
  );
};
