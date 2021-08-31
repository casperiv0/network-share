import * as React from "react";
import { socket } from "lib/socket";
import { Events } from "types/Events";

function download(name: string, file: File) {
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(file);
  link.download = name;
  link.click();
}

interface FilesData {
  files: {
    name: string;
    buffer: ArrayBuffer;
    type: string;
  }[];
}

export const Incoming = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  React.useEffect(() => {
    const handler = ({ files }: { files: FilesData }) => {
      console.log(files.files);

      const d = files.files.map((file) => new File([file.buffer], file.name, { type: file.type }));
      setFiles((p) => [...p, ...d]);
    };

    socket.on(Events.FILE_UPLOAD, handler);

    return () => {
      socket.off(Events.FILE_UPLOAD, handler);
    };
  }, []);

  return (
    <div className={files.length > 0 ? "flex flex-wrap" : undefined} style={{ height: "50vh" }}>
      {files.length <= 0 ? (
        <p className="text-center">There aren't any files yet!</p>
      ) : (
        files.map((file) => {
          return (
            <button
              key={file.size * Math.random() * 20}
              className="py-2 px-10 rounded-md m-1 text-white bg-gray-500 max-w-md max-h-12"
              onClick={() => download(file.name, file)}
              title="Click to download"
            >
              {file.name}
            </button>
          );
        })
      )}
    </div>
  );
};
