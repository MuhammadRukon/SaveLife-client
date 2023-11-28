import { Fragment, useEffect, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import { updateUserRole } from "../../api/auth";
import toast from "react-hot-toast";
const allRoles = ["admin", "volunteer", "donor"];
const allAvailableStatus = ["active", "blocked"];
const UpdateRoleStatusModal = ({ isOpen, modalHandler, user, refetch }) => {
  const [roles, setRoles] = useState(allRoles);
  const [allStatus, setAllStatus] = useState(allAvailableStatus);
  const [selected, setSelected] = useState(user.role);
  const [selectedStatus, setSelectedStatus] = useState(user.status);
  useEffect(() => {
    if (user.role === "volunteer") {
      setRoles(["donor", "admin"]);
    }
    if (user.role === "donor") {
      setRoles(["volunteer", "admin"]);
    }
    if (user.role === "admin") {
      setRoles(["volunteer", "donor"]);
    }
    if (user.status === "active") {
      setAllStatus(["block"]);
      setSelectedStatus("active");
    }
    if (user.status === "blocked") {
      setSelectedStatus("blocked");
      setAllStatus(["unblock"]);
    }
    // setAllStatus(user.status === "active" ? ["block"] : ["unblock"]);
  }, [user.status, user.role, modalHandler]);
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
                <div className="flex justify-around">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium text-center leading-6 text-gray-900"
                    >
                      Update User Role
                    </Dialog.Title>
                    <div className="w-full mt-4">
                      <Listbox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left drop-shadow-[0_2px_7px_rgba(0,0,0,0.10)] focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">{selected}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <AiOutlineDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                              {roles.map((role, roleIdx) => (
                                <Listbox.Option
                                  key={roleIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={role}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {role}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <BsCheckLg
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                  <div className="h-20 w-[1px] bg-slate-300"></div>
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium text-center leading-6 text-gray-900"
                    >
                      Update User Status
                    </Dialog.Title>
                    <div className="mt-4 w-full">
                      <Listbox
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                      >
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left drop-shadow-[0_2px_7px_rgba(0,0,0,0.10)] focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">
                              {selectedStatus}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <AiOutlineDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                              {allStatus.map((status, roleIdx) => (
                                <Listbox.Option
                                  key={roleIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={status}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {status}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <BsCheckLg
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                </div>
                <hr className="mt-16" />

                <div className="flex mt-2 justify-center gap-5">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={async () => {
                      // role and status info
                      const userInfo = {
                        role: selected,
                        status:
                          selectedStatus === "block" ? "blocked" : "active",
                      };
                      // post to user
                      try {
                        const dbResponse = await updateUserRole(
                          userInfo,
                          user.email
                        );
                        if (dbResponse.modifiedCount > 0) {
                          toast.success("updated successfully");

                          refetch();
                          setAllStatus(allAvailableStatus);

                          setRoles(roles);
                          modalHandler();
                        } else {
                          toast("could not update");
                        }
                      } catch (error) {
                        console.log(error.message);
                        toast.error("error occurred");
                      }
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
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

export default UpdateRoleStatusModal;
