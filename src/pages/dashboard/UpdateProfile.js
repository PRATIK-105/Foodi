import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/Authprovider";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const { currentUser, updateUserProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentUser?.displayName || "",
      photoURL: currentUser?.photoURL || "",
    },
  });

  const onSubmit = async (data) => {
    const { name, photoURL } = data;
    try {
      await updateUserProfile(name, photoURL);
      toast.success('Profile Updated!');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.warning('Error occured..');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="font-bold text-xl mb-8 text-gray-800">
          Update Your Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="photoURL" className="block text-gray-700 mb-2">
              Upload Photo
            </label>
            <input
              type="text"
              id="photoURL"
              name="photoURL"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              {...register("photoURL", { required: true })}
            />
            {errors.photoURL && <p className="text-red-500 text-sm mt-1">Photo URL is required</p>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
