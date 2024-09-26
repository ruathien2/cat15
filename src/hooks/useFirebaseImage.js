import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useFirebaseImage(
  setValue,
  getValues,
  imageName = null,
  cb
) {
  const [image, setImage] = useState("");
  const [progress, setProrgess] = useState(0);
  if (!setValue || !getValues) return;

  const handleUploadImage = (file) => {
    const storage = getStorage();

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProrgess(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };

  const onSelectImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    await setValue("image_name", file.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      "images/" + (imageName || getValues("image_name"))
    );

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        toast.success("Delete successfully");
        setImage("");
        setProrgess(0);
        cb && cb();
      })
      .catch((error) => {
        console.log("Can not delete image");
        toast.error(error);
      });
  };
  return {
    image,
    setImage,
    progress,
    setProrgess,
    handleDeleteImage,
    handleUploadImage,
    onSelectImage,
  };
}
