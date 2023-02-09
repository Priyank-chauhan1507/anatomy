import createMultipleWorker from "./worker-utils";
import { Canvg } from "canvg";
import { saveAs } from "file-saver";

// const isExportWorkerUsable = typeof OffscreenCanvas !== "undefined";
const isExportWorkerUsable = false;
const postMessageToWorker = isExportWorkerUsable
  ? createMultipleWorker(
      "./export-worker.js",
      {
        type: "module",
      },
      4
    )
  : null;
const getLoadedImage = (src, width, height) => {
  return new Promise((resolve, reject) => {
    const img = new Image(width, height);
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      console.log("Error in image loading", e);
      reject(e.message);
    };
    img.src = src;
  });
};
const converSVGToPngUsingMainThread = async (svg, width, height) => {
  try {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    const ctx = canvas.getContext("2d");
    const imgElement = await getLoadedImage(svg, width, height);
    ctx.drawImage(imgElement, 0, 0, width, height);
    const du = canvas.toDataURL("image/png");
    imgElement.remove();
    // const v = await Canvg.from(ctx, svg)
    // await v.render()
    // const du = canvas.toDataURL()
    canvas.remove();
    return du;
  } catch (e) {
    console.log("Error", e);
    throw e;
  }
};
export const convertSVGToPNG = (svg, width, height) => {
  return new Promise((res, rej) => {
    isExportWorkerUsable
      ? postMessageToWorker({ svg, width, height }, (e) => {
          const { pngBlob, error } = e.data;
          if (error) {
            rej(error);
          } else {
            const file = new FileReader();
            file.onload = function (e) {
              if (e.target.error) {
                rej(e.target.error);
              } else {
                res(e.target.result);
              }
            };
            file.readAsDataURL(pngBlob);
          }
        })
      : converSVGToPngUsingMainThread(svg, width, height)
          .then((d) => res(d))
          .catch((e) => rej(e));
  });
};
