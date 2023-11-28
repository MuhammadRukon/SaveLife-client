import { FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaMapLocationDot } from "react-icons/fa6";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };
  return (
    <div>
      <h2 className="text-center font-bold font-primary my-20 text-5xl">
        Contact Us
      </h2>
      <div className="flex items-center pb-10">
        <div className=" p-10 w-1/2 rounded-lg">
          <form onSubmit={handleSubmit} className="card-body p-0 mt-7">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="form-control  flex-1">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="first name"
                  className="input rounded-r-none rounded-b-none input-bordered focus:outline-none"
                  required
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="last name"
                  className="input rounded-l-none rounded-b-none  input-bordered focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered rounded-none focus:outline-none"
                required
              />
            </div>
            <span className="label-text">Message</span>
            <textarea
              className="textarea h-[200px] rounded-none rounded-b-lg textarea-bordered resize-none focus:outline-none"
              placeholder="Write here..."
            ></textarea>
            <div className="form-control mt-6">
              <button className="btn text-lg  bg-primary hover:bg-primary text-white">
                Mail
              </button>
            </div>
          </form>
        </div>
        <div className="divider  my-auto  lg:divider-horizontal">OR</div>
        <div className="ml-20 space-y-14">
          <div className="flex items-center gap-3">
            <div className="animate-bounce">
              <SiGmail size={24} />
            </div>
            <p className=" text-2xl ">muhammad.rukon242@gmail.com</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="animate-bounce">
              <FaPhoneAlt size={24} />
            </div>{" "}
            <p className=" text-2xl ">+8801815780053</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="animate-bounce">
              <FaLinkedin size={24} />
            </div>
            <a
              className=" text-2xl underline italic"
              href="https://www.linkedin.com/in/muhammadrukon/"
            >
              Linkedin
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="animate-bounce">
              <FaMapLocationDot size={24} />
            </div>
            <p className=" text-2xl ">Hazaribagh, Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
