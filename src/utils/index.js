import FileSaver from "file-saver";

export function downloadImage(photo, _id) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
