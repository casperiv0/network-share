import * as React from "react";
import { upload } from "lib/upload";

export const Dropzone = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const handler = (e: Event) => e.preventDefault();

    ref.current.addEventListener("drop", handler);
    ref.current.addEventListener("dragover", handler);

    return () => {
      ref.current?.removeEventListener("drop", handler);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current?.removeEventListener("dragover", handler);
    };
  }, []);

  async function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const files = event.dataTransfer.files ?? [];

    if (files === null) return;

    upload([...files]);
  }

  return (
    <div ref={ref} style={{ height: "50vh" }}>
      <div
        className="text-white w-full h-full flex items-center justify-center"
        onDrop={handleDrop}
      >
        <p className="text-center">
          Drop your files here!
          <br />
          You will see your files upload in realtime below!
        </p>
      </div>
    </div>
  );
};
