/* eslint-disable no-restricted-globals */
/* eslint-env worker */
/* Worker: compress images using OffscreenCanvas and createImageBitmap.
  Falls back to returning original file when APIs are unavailable. */
addEventListener('message', async (event) => {
  const file = event.data;
  try {
    const bitmap = await createImageBitmap(file);

    const maxWidth = 800;
    const maxHeight = 800;
    let width = bitmap.width;
    let height = bitmap.height;

    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }

    if (typeof OffscreenCanvas !== 'undefined') {
      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(bitmap, 0, 0, width, height);
      const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.7 });
      postMessage(blob);
    } else {
      // OffscreenCanvas not supported in this environment — return original file
      postMessage(file);
    }
  } catch (err) {
    // On any error, return original file as fallback
    postMessage(file);
  }
});
