import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../api/auth";
import BlogRow from "./BlogRow";
import useAuth from "../../hooks/useAuth";

const ManageContentHome = () => {
  const { user } = useAuth();
  const { data: blogs, refetch } = useQuery({
    enabled: !!user,
    queryKey: ["blogs"],
    queryFn: async () => await getAllBlogs(),
  });
  return (
    <div className="px-5 2xl:px-0">
      <div className="text-right mt-14">
        <Link
          to="add-blog"
          className="btn w-fit px-5 bg-secondary hover:bg-secondary text-white font-semibold text-lg"
        >
          Add a Blog
        </Link>
      </div>
      {blogs?.length > 0 ? (
        <table className="mt-10 drop-shadow-[0_0_7px_rgba(0,0,0,0.2)] rounded-xl">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
              >
                Blogs
              </th>
              <th
                scope="col"
                className="px-5 py-3  bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
              >
                Status
              </th>

              <th
                scope="col"
                className="px-5 lg:text-center py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
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
      ) : (
        <h2 className="text-4xl mt-10 font-semibold">No Blogs created yet!</h2>
      )}
    </div>
  );
};

export default ManageContentHome;
