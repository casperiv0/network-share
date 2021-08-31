import * as React from "react";
import { socket } from "lib/socket";
import { Events } from "types/Events";
import { FileData } from "types/FileData";
import { download } from "lib/download";

interface FilesData {
  files: Record<string, FileData>;
}

export const Incoming = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  React.useEffect(() => {
    const handler = ({ files }: { files: FilesData }) => {
      console.log(JSON.stringify(files, null, 2));

      const entries = Object.entries(files) as [string, FileData][];

      const v = entries.map(([, file]) => {
        return new File([file.data], file.name, { type: file.mimetype });
      });

      setFiles((p) => [...p, ...v]);
    };

    socket.on(Events.FILE_UPLOAD, handler);

    return () => {
      socket.off(Events.FILE_UPLOAD, handler);
    };
  }, []);

  return (
    <div className={files.length > 0 ? "flex flex-wrap" : undefined} style={{ height: "50vh" }}>
      {files.length <= 0 ? (
        <p className="text-center">There aren&apos;t any files yet!</p>
      ) : (
        files.map((file) => {
          return (
            <button
              key={file.size * Math.random() * 20}
              className="py-2 px-10 rounded-md m-1 text-white bg-gray-500 max-w-md max-h-12"
              onClick={() => download(file)}
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
