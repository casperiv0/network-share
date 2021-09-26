import * as React from "react";
import { socket } from "lib/socket";
import { Events } from "types/Events";
import { FileData } from "types/FileData";
import { download } from "lib/download";

interface FilesData {
  files: Record<string, FileData>;
}

export const Incoming = () => {
  const [files, setFiles] = React.useState<(File & { preview: string })[]>([]);

  function handleDownload(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, file: File) {
    e.preventDefault();

    const target = e.target as HTMLVideoElement;

    if (["video"].includes(target.nodeName.toLowerCase())) {
      return;
    }
    download(file);
  }

  React.useEffect(() => {
    const handler = ({ files }: { files: FilesData }) => {
      const entries = Object.entries(files) as [string, FileData][];

      const v = entries.map(([, file]) => {
        const f = new File([file.data], file.name, { type: file.mimetype });

        (f as any).preview = URL.createObjectURL(f);

        return f as File & { preview: string };
      });

      setFiles((p) => [...v, ...p]);
    };

    socket.on(Events.FILE_UPLOAD, handler);

    return () => {
      socket.off(Events.FILE_UPLOAD, handler);
    };
  }, []);

  return (
    <div className="border-t-2 pt-4 border-gray-300 overflow-auto h-[50vh]">
      {files.length <= 0 ? (
        <p className="text-white text-center">
          Files will show here when there are any. Click any of them to download it!
        </p>
      ) : (
        <div className="flex flex-wrap">
          {files.map((file) => {
            return (
              <button
                key={file.size * Math.random() * 20}
                className="overflow-hidden h-full rounded-md m-1 text-white bg-darker-gray max-w-md"
                onClick={(e) => handleDownload(e, file)}
                title="Click to download"
              >
                {file.type.startsWith("video") ? (
                  <video controls src={file.preview} />
                ) : file.type.startsWith("image") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img loading="lazy" src={file.preview} />
                ) : null}

                <p className="p-3">{file.name}</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
