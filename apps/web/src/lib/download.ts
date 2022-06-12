export function download(file: File) {
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(file);
  link.download = file.name;
  link.click();
}
