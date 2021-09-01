import toast from "react-hot-toast";
import { API_URL } from "./constants";

export async function upload(files: File[]) {
  try {
    const fd = new FormData();

    for (const file of files) {
      fd.append(file.name, file);
    }

    await toast.promise(
      fetch(`${API_URL}/upload`, {
        method: "POST",
        body: fd,
      }),
      {
        error: "Could not upload the file. Please try again later.",
        success: "Success!",
        loading: "Uploading...",
      },
    );
  } catch (e) {
    console.error(e);
  }
}
