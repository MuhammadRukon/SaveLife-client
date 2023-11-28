import { useState } from "react";
const SingleBlog = ({ data, index }) => {
  console.log();
  const { content, photoURL, title } = data;
  const [isOpen, setIsOpen] = useState(false);
  const shortContent = content.slice(0, 200);
  return (
    <>
      <div className="hero">
        <div className="hero-content items-start gap-10 rounded-2xl max-w-[1180px] p-5 md:p-10 flex-col lg:flex-row shadow-[0_3px_20px_rgba(0,0,0,0.15)]">
          <div className="xl:w-2/5 bg-black rounded-xl overflow-hidden">
            <img src={photoURL} className="opacity-70" alt="" />
          </div>
          <div className="w-3/5">
            <h1 className="text-xl  md:text-2xl font-semibold">
              Blog No: {index + 1}
            </h1>
            <h1 className="text-3xl md:text-4xl font-bold mt-8">{title}</h1>
            <p className="py-6 text-lg leading-8 tracking-wider">
              {isOpen ? (
                <span dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <span dangerouslySetInnerHTML={{ __html: shortContent }} />
              )}
              <span
                onClick={() => setIsOpen(!isOpen)}
                className="text-blue-700 italic font-semibold cursor-pointer"
              >
                {isOpen ? "" : "...read more."}
              </span>
            </p>
            <p
              onClick={() => setIsOpen(!isOpen)}
              className="text-right text-blue-700 italic font-semibold cursor-pointer"
            >
              {isOpen && "show less."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;