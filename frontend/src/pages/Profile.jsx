import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          className="w-25 h-25 rounded-full self-center object-cover cursor-pointer"
          src={currentUser.profilePicture}
          alt="profile image"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              "Error uploading image (File sise must be 2 mb)"
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-red-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image upload successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button
          className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80"
          type="button"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between items-center mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
