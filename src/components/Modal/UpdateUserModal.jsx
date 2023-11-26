import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { updateUser } from "../../api/auth";
import GetLocation from "../shared/GetLocation";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";

export default function UpdateUserModal({ closeModal, isOpen, email }) {
  const { updateUserProfile } = useAuth();
  const [location, setLocation] = useState({});
  const [anotherEffect, setAnotherEffect] = useState(false);
  const handleUpdate = async (e) => {
    e.preventDefault();
    setAnotherEffect(!anotherEffect);
    const displayName = e.target.name.value;
    const image = e.target.image.files[0];
    const district = location?.district;
    const upazila = location?.upazila;
    const bloodGroup = location?.bloodGroup;

    try {
      // upload image
      const imageData = await imageUpload(image);
      console.log(imageData);
      // update user
      await updateUserProfile(displayName, imageData?.data?.display_url);
      // save user to database
      const user = {
        displayName,
        photoURL: imageData?.data?.display_url,
        district,
        upazila,
        bloodGroup,
      };
      const updateUserDB = await updateUser(user, email);
      console.log(updateUserDB);
      closeModal();
      if (updateUserDB.modifiedCount > 0) {
        toast.success("updated successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("could not update");
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 mb-2 text-gray-900"
                  >
                    Update User Info
                  </Dialog.Title>
                  <form
                    onSubmit={handleUpdate}
                    noValidate=""
                    action=""
                    className="space-y-6 ng-untouched ng-pristine ng-valid"
                  >
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter Your Name Here"
                          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                          data-temp-mail-org="0"
                        />
                      </div>
                      <div>
                        <label htmlFor="image" className="block mb-2 text-sm">
                          Select Image:
                        </label>
                        <input
                          required
                          type="file"
                          id="image"
                          className="border-2 w-full p-3 rounded-lg "
                          name="image"
                          accept="image/*"
                        />
                      </div>
                      <GetLocation
                        anotherEffect={anotherEffect}
                        location={location}
                        setLocation={setLocation}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="bg-red-600 w-full rounded-md py-3 text-white"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
