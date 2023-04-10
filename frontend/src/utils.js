export function getImageUrl(image) {
    const base64 = window.btoa(
      new Uint8Array(image.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:${image.type};base64,${base64}`;
  }