import { v4 as uuidv4 } from "uuid";

var files = {};
var images = {};

const storeFile = (file) => {
  const id = uuidv4();

  files[id] = file;

  return id;
};

const storeImage = (img) => {
  const id = uuidv4();
  if (img.type.startsWith("image/")) {
    images[id] = URL.createObjectURL(img);
  } else {
    throw new Error("Not an image");
  }

  return id;
};

const storeCopiedImage = (img) => {
  const id = uuidv4();
  const url = images[img.id];
  if (img.type.startsWith("image/")) {
    images[id] = url;
  } else {
    throw new Error("Not an image");
  }

  return id;
};

const deleteImage = (id) => {
  const img = images[id];
  URL.revokeObjectURL(img);
  delete images[id];
};

const getImage = (id) => {
  return images[id];
};

const deleteFile = (id) => {
  delete files[id];
};

const getFile = (id) => {
  return files[id];
};

export {
  storeFile,
  deleteFile,
  getFile,
  storeImage,
  deleteImage,
  getImage,
  storeCopiedImage,
};
