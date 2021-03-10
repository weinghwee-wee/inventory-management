import storage from "./index";

export const uploadFile = async (file) => {
  try {
    const ref = storage.ref().child(file.name);

    await ref.put(file);

    const url = await ref.getDownloadURL();

    return url;
  } catch (e) {
    return e;
  }
};

export const deleteFile = async (filename) => {
  try {
    const ref = storage.ref().child(filename);

    await ref.delete();

    return null;
  } catch (e) {
    return e;
  }
};
