import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewimg = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const showTost = useShowToast();

  // creating an base 64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showTost("invalid", "please select an image file", "error");
      setImageUrl(null);
    }
  };
  return {
    imageUrl,
    handleImageChange,
    setImageUrl
  };
};

export default usePreviewimg;
