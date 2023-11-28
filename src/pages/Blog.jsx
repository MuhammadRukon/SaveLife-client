import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPublishedBlogs } from "../api/auth";
import SingleBlog from "../components/sections/SingleBlog";

const Blog = () => {
  const { data: publishedBlogs, isLoading } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => await getPublishedBlogs(),
  });
  return (
    <>
      <h1 className="text-center text-2xl mt-16 lg:text-6xl font-bold font-primary capitalize">
        blogs
      </h1>
      <div className="my-16 lg:px-0">
        <div className="container mx-auto space-y-20">
          {publishedBlogs?.map((data, index) => (
            <SingleBlog key={data._id} index={index} data={data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
