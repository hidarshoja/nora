  // ! change image to link
  export const handleImageChange = async (images) => {
    if (images?.length === 0) {
      handleToast("error", "لطفا حداقل یک عکس وارد کنید");
      return [];
    }
  
    const resultImagePromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        if (!image.type.startsWith("image/")) {
          handleToast("error", "لطفا یک تصویر انتخاب کنید.");
          reject("Invalid file type");
        }
  
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject("Error reading file");
        reader.readAsDataURL(image);
      });
    });
  
    try {
      const resultImages = await Promise.all(resultImagePromises);
      return resultImages; // This will return all base64-encoded images
    } catch (error) {
      console.error("Error converting images to base64:", error);
      return [];
    }
  };