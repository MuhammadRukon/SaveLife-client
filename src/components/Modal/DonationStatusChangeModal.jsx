import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { updateBlogStatus } from "../../api/auth";
import toast from "react-hot-toast";

const ConfirmModal = ({ isOpen, modalHandler, id, refetch, dynamicStatus }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={modalHandler}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <div className="flex justify-around mt-4">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium text-center leading-6 text-gray-900"
                    >
                      Do you want to {dynamicStatus} the blog?
                    </Dialog.Title>
                  </div>
                </div>

                <div className="flex mt-8 mb-4 justify-center gap-5">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 "
                    onClick={async () => {
                      // update blog status
                      const status = {
                        status: `${dynamicStatus}ed`,
                      };
                      const response = await updateBlogStatus(id, status);
                      if (response.modifiedCount > 0) {
                        toast.success(`successfully ${dynamicStatus}ed`);
                        refetch();
                      } else toast.error(`could not ${dynamicStatus}`);
                      modalHandler();
                    }}
                  >
                    {dynamicStatus}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200  "
                    onClick={modalHandler}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmModal;
