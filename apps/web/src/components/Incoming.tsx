import * as React from "react";
import { socket } from "lib/socket";
import { type FileData, Events } from "@network-share/types";
import { download } from "lib/download";

export const Incoming = () => {
  const [files, setFiles] = React.useState<(File & { preview: string })[]>([]);

  function handleDownload(e: React.MouseEvent<HTMLButtonElement>, file: File) {
    e.preventDefault();

    const target = e.target as HTMLVideoElement;

    if (["video"].includes(target.nodeName.toLowerCase())) {
      return;
    }
    download(file);
  }

  React.useEffect(() => {
    const handler = async () => {
      const data = (await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files`)).json()) as {
        files: [string, FileData][];
      };

      const entries = data.files;
      const newFiles = entries.map(([, _file]) => {
        const file = new File([Buffer.from(_file.data)], _file.name, { type: _file.mimetype });

        (file as any).preview = URL.createObjectURL(file);

        return file as File & { preview: string };
      });

      setFiles(newFiles);
    };

    socket.on(Events.FileUpload, handler);

    return () => {
      socket.off(Events.FileUpload, handler);
    };
  }, []);

  return (
    <div
      className={[
        "border-t-2 pt-4 border-gray-300 overflow-auto h-[50vh]",
        files.length <= 0 ? "flex flex-col justify-center" : "",
      ].join(" ")}
    >
      {files.length <= 0 ? (
        <p className="text-white text-center">
          Files will show here when there are any. Click any of them to download it!
        </p>
      ) : (
        <div className="flex flex-wrap">
          {files.map((file) => (
            <button
              key={file.size * Math.random() * 20}
              className="h-full overflow-hidden rounded-md m-1 text-white bg-darker-gray max-w-md px-4 py-2 hover:bg-darker-gray/60 transition-colors"
              onClick={(e) => handleDownload(e, file)}
              title="Click to download"
            >
              {file.type.startsWith("video") ? (
                <video controls className="rounded-sm my-2" src={file.preview} />
              ) : file.type.startsWith("image") ? (
                <img className="rounded-sm my-2" loading="lazy" src={file.preview} />
              ) : null}

              <p>{file.name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
