import { Link, useNavigate } from "react-router-dom";
import GetLocation from "../components/shared/GetLocation";
import { useState } from "react";
import { saveUser } from "../api/auth";
import useAuth from "../hooks/useAuth";
import { imageUpload } from "../api/utils";

const SignUp = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    upazila: "Select Upazila",
    district: "Select District",
  });
  const [errormsg, setErrorMsg] = useState("");
  let password;
  const { createUser, updateUserProfile } = useAuth();
  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const displayName = e.target.name.value;
    const image = e.target.image.files[0];
    const district = location?.district;
    const upazila = location?.upazila;
    const email = e.target.email.value;
    const bloodGroup = location?.bloodGroup;
    const firstpassword = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (firstpassword === confirmPassword) {
      password = firstpassword || confirmPassword;
    } else {
      setErrorMsg("password doesn't match");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password needs to be at least six characters");
      return;
    }

    if (!/.*[A-Z].*/.test(password)) {
      setErrorMsg("Password needs at least one capital letter");
      return;
    }
    if (!/.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?].*/.test(password)) {
      setErrorMsg("Password needs at least one special character");
      return;
    }

    try {
      const imageData = await imageUpload(image);

      // create user
      const result = await createUser(email, password);
      console.log(result);
      // update user
      await updateUserProfile(displayName, imageData?.data?.display_url);
      // save user to database
      const user = {
        email,
        displayName,
        photoURL: imageData?.data?.display_url,
        district,
        upazila,
        bloodGroup,
      };
      const saveUserDb = await saveUser(user);
      console.log(saveUserDb);
    } catch (error) {
      setErrorMsg(error.message);
    }
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col 2xl:w-1/4 p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to SaveLife</p>
        </div>
        <form
          onSubmit={handleSignUp}
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
            <GetLocation location={location} setLocation={setLocation} />
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="confirmPassword" className="text-sm mb-2">
                  Confirm password
                </label>
              </div>
              <input
                type="password"
                name="confirmPassword"
                required
                id="confirmPassword"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <p className="-pt-2 h-3 text-red-700 italic text-sm">{errormsg}</p>
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
        <div className="flex items-center pt-4 space-x-1"></div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
