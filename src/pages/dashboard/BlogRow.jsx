import React, { useState } from "react";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import DeleteModal from "../../components/Modal/DeleteModal";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useRole from "../../hooks/useRole";

const BlogRow = ({ blog, refetch }) => {
  const [role, isLoading] = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dynamicStatus, setDynamicStatus] = useState("publish");
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  function closeDeleteModal() {
    setModalDeleteOpen(false);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  const content = blog.content;
  const shortContent = content.slice(0, 80);
  return (
    <tr>
      <td className="px-2 lg:px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-start lg:gap-2">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={blog.photoURL}
                className="mx-auto object-cover rounded w-16 h-10 xl:h-24 xl:w-32 "
              />
            </div>
          </div>
          <div className="ml-3 max-w-xl">
            <p className="text-gray-900 whitespace-no-wrap font-bold text-base lg:text-lg">
              {blog.title}
            </p>
            <p className="text-gray-900 pt-2 text-sm lg:text-base whitespace-no-wrap">
              {isOpen ? (
                <span
                  className="text-gray-900 pt-2 text-sm lg:text-base whitespace-no-wrap"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <span
                  className="text-gray-900 pt-2 text-sm lg:text-base whitespace-no-wrap"
                  dangerouslySetInnerHTML={{ __html: shortContent }}
                />
              )}
              <span
                className="text-blue-600 italic text-xs lg:text-sm cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {" "}
                {isOpen ? "...view less." : "view more..."}
              </span>
            </p>
          </div>
        </div>
      </td>
      <td className="px-1 lg:py-5 border-b space-x-3 border-gray-200 bg-white text-sm">
        <span
          className={`relative inline-block px-3 py-1 font-semibold ${
            blog?.status === "draft" || blog?.status === "unpublished"
              ? "text-yellow-600"
              : "text-green-600"
          } leading-tight`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-0 ${
              blog?.status === "draft" || blog?.status === "unpublished"
                ? "bg-yellow-100"
                : "bg-green-100 "
            }  rounded-full`}
          ></span>
          <span className="relative">{blog.status}</span>
        </span>
      </td>
      {!isLoading && (
        <td className="px-2 lg:px-5 border-b space-x-3 border-gray-200 bg-white text-sm">
          <div className="flex flex-col gap-2 text-center">
            {/* publish */}
            {(blog?.status === "unpublished" || blog?.status === "draft") &&
              role !== "volunteer" && (
                <>
                  <span
                    onClick={() => {
                      setDynamicStatus("publish");
                      setModalIsOpen(!modalIsOpen);
                    }}
                    className="relative cursor-pointer inline-block px-3 py-1 font-semibold hover:scale-110 transition text-green-900 leading-tight"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-green-500  rounded-md"
                    ></span>
                    <span className="relative ">publish</span>
                  </span>
                </>
              )}
            {/* unpublish button */}
            {blog?.status === "published" && (
              <>
                <span
                  onClick={() => {
                    setDynamicStatus("unpublish");
                    setModalIsOpen(!modalIsOpen);
                  }}
                  className="relative cursor-pointer inline-block px-3 py-1 font-semibold hover:scale-110 transition text-yellow-700 leading-tight"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-yellow-400  rounded-md"
                  ></span>
                  <span className="relative">unpublish</span>
                </span>
              </>
            )}
            <ConfirmModal
              isOpen={modalIsOpen}
              modalHandler={closeModal}
              id={blog?._id}
              refetch={refetch}
              dynamicStatus={dynamicStatus}
            />
            {/* edit button */}
            <span
              onClick={() => {
                console.log("edit");
              }}
              className="relative cursor-pointer inline-block px-3 py-1 font-semibold hover:scale-110 transition text-secondary leading-tight"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-blue-400  rounded-md"
              ></span>
              <span className="relative flex items-center justify-center gap-2">
                edit
                <FaEdit color="black" size={12} />
              </span>
            </span>
            {/* delete button */}
            {role === "admin" && (
              <span
                onClick={() => {
                  setModalDeleteOpen(!modalDeleteOpen);
                }}
                className="relative cursor-pointer inline-block px-3 py-1 font-semibold hover:scale-110 transition text-red-950d-900 leading-tight"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-red-400  rounded-md"
                ></span>
                <span className="relative flex gap-1 items-center justify-center">
                  Delete
                  <MdDeleteForever color="black" size={18} />
                </span>
                <DeleteModal
                  isOpen={modalDeleteOpen}
                  modalHandler={closeDeleteModal}
                  id={blog?._id}
                  refetch={refetch}
                />
              </span>
            )}
          </div>
        </td>
      )}
    </tr>
  );
};

export default BlogRow;
