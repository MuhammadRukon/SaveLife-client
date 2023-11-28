import toast from "react-hot-toast";
import { postBlog } from "../../api/auth";
import { imageUpload } from "../../api/utils";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import React, { useState, useRef, useMemo, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
const AddBlog = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.files[0];
    try {
      const imageData = await imageUpload(image);
      const photoURL = imageData?.data?.display_url;
      const blog = { title, photoURL, content };
      // post blog
      const response = await postBlog(blog);
      e.target.reset();
      if (response.status) {
        toast.success("blog sucessfully posted");
      } else {
        toast.error("could not post.");
      }
      navigate("/dashboard/content-management");
    } catch (error) {
      console.log(error.message);
      toast.error("error occurred");
    }
    console.log(content);
  };
  // jodit
  const editor = useRef(null);
  return (
    <div className="w-4/5 xl:w-3/5 my-10 p-8 py-10 2xl:p-10 2xl:py-12 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)]">
      <h2 className="text-center font-bold font-primary text-4xl 2xl:text-5xl">
        Post a Blog
      </h2>
      <form onSubmit={(e) => handleSubmit(e)} className="card-body p-0 mt-7 ">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="form-control  flex-1">
            <label className="label mb-[1px]">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="input input-bordered focus:outline-none"
              required
            />
          </div>
          <div className="form-control flex-1">
            <div>
              <label htmlFor="image" className="label">
                <span className="label-text">Thumbnail</span>
              </label>
              <input
                required
                type="file"
                id="image"
                className="border-2 w-full p-2 rounded-lg "
                name="image"
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <span className="label-text mt-6">Content</span>
        {/* <textarea
          name="content"
          className="textarea h-[200px] textarea-bordered resize-none focus:outline-none"
          placeholder="Write here..."
        ></textarea> */}
        <JoditEditor
          ref={editor}
          height={800}
          value={content}
          tabIndex={1} // tabIndex of textarea
          // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />
        <p>{content}</p>
        <div className="form-control mt-6">
          <button className="btn bg-secondary hover:bg-secondary text-lg w-fit px-10 mx-auto text-white">
            Post Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
