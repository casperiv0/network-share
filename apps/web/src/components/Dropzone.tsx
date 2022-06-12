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

  async function handleDrop(
    event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
  ) {
    event.preventDefault();

    const files = ("dataTransfer" in event ? event.dataTransfer.files : event.target.files) ?? [];
    upload([...files]);
  }

  return (
    <div ref={ref} style={{ height: "50vh" }}>
      <div>
        <label
          htmlFor="select_files"
          className="bg-darker-gray text-white z-10 rounded-lg absolute top-5 right-4 py-2 px-5 cursor-pointer transition-colors border-[1.5px] border-transparent hover:border-gray-300"
        >
          Or select files
        </label>
        <input
          id="select_files"
          type="file"
          multiple
          className="hidden"
          placeholder="or select files"
          onChange={handleDrop}
        />
      </div>
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
