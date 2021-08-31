import * as React from "react";
import { FileDrop } from "react-file-drop";
import { upload } from "lib/upload";

export const Dropzone = () => {
  async function handleDrop(files: FileList | null) {
    if (files === null) return;

    upload([...files]);
  }

  return (
    <div style={{ height: "50vh" }}>
      <FileDrop className="w-full h-full flex items-center justify-center" onDrop={handleDrop}>
        Drop your files here!
      </FileDrop>
    </div>
  );
};
