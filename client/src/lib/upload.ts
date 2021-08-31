export async function upload(files: File[]) {
  try {
    const fd = new FormData();

    for (const file of files) {
      fd.append(file.name, file);
    }

    await fetch("http://localhost:3030/upload", {
      method: "POST",
      body: fd,
    });
  } catch (e) {
    console.log(e);
  }
}
