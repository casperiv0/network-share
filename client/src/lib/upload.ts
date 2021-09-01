import { API_URL } from "./constants";

export async function upload(files: File[]) {
  try {
    const fd = new FormData();

    for (const file of files) {
      fd.append(file.name, file);
    }

    await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: fd,
    });
  } catch (e) {
    console.error(e);
  }
}
