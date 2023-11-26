import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../api/auth";
import BlogRow from "./BlogRow";

const ManageContentHome = () => {
  const { data: blogs, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => await getAllBlogs(),
  });
  return (
    <div>
      <div className="text-right">
        <Link
          to="add-blog"
          className="btn w-fit px-5 bg-secondary hover:bg-secondary text-white font-semibold text-lg"
        >
          Add a Blog
        </Link>
      </div>
      <table className="mt-10 drop-shadow-[0_0_7px_rgba(0,0,0,0.2)] rounded-xl">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
            >
              Status
            </th>

            <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className=" rounded-xl">
          {blogs?.length &&
            blogs.map((blog, index) => (
              <BlogRow refetch={refetch} key={index} blog={blog} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageContentHome;
