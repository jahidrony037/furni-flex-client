import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { SiApple } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import furnilFlex from "../../../public/furniFlex.png";
import Loader from "../../components/shared/Loader/Loader";
import useAuth from "./../../hooks/useAuth/useAuth";

const SignUP = () => {
  const [toggleEye, setToggleEye] = useState(true);
  const [termsAndPolicy, setTermsAndPolicy] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // fetch the necessary methods
  const { createUser, loading, user, logOut } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    navigate("/");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("handle submit form clicked");
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = firstName + " " + lastName;

    if (password.length < 6) {
      return setPasswordError("Password Should be 6 character long");
    }
    setPasswordError("");

    if (termsAndPolicy === false) {
      return setTermsError("Please Select Terms and Condition first");
    }
    if (termsAndPolicy === true) {
      setTermsError("");
    }

    createUser(email, password).then((result) => {
      const user = result.user;
      if (user) {
        updateProfile(user, {
          displayName: name,
        }).then(() => {
          Swal.fire({
            title: "Registration Successful",
            text: "Now you can Login!",
            icon: "success",
          });
          logOut()
            .then(() => {
              event.target.reset();
              navigate("/login");
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      }
    });
    // console.log(res);

    const userSignUPInfo = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log(userSignUPInfo);
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="md:w-1/2 lg:px-[126px]">
          <div className="p-6 bg-[#FAFAFA] md:rounded-[8px] border-[1px] border-solid border-[#F5F5F5] rounded-md h-screen md:h-auto">
            {/* welcome text */}
            <div className="py-[28.5px] gap-y-1">
              <h3 className="text-center font-semibold text-[24px]">
                Welcome To
              </h3>

              <h2 className="text-center">
                <span className="text-primary-color text-[40px] font-semibold">
                  Furni
                </span>

                <span className="text-secondary-color text-[40px] font-semibold">
                  Flex
                </span>
              </h2>
              <p className="text-center text-[#707070] font-medium text-[16px]">
                Signup for purchase your desire products
              </p>
            </div>

            {/* signUP form start */}
            <form action="" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-4">
                  {/* First Name */}
                  <label className="form-control w-full border-[1px] border-solid border-[#DEDEDE] bg-[#FFF] pl-[11px] pt-[8px]">
                    <div className="label p-0">
                      <span className="label-text text-tertiary-color text-[12px] font-normal ">
                        First Name (optional)
                      </span>
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first Name"
                      className="input w-full text-[14px] font-normal  p-0 h-[35px] focus:outline-none focus:border-none"
                    />
                  </label>

                  {/* Last name */}
                  <label className="form-control w-full border-[1px] border-solid border-[#DEDEDE] bg-[#FFF] pl-[11px] pt-[8px]">
                    <div className="label p-0">
                      <span className="label-text text-tertiary-color text-[12px] font-normal ">
                        Last Name (optional)
                      </span>
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last Name"
                      className="input w-full text-[14px] font-normal  p-0 h-[35px] focus:outline-none focus:border-none"
                    />
                  </label>
                </div>
                {/* Email */}
                <label className="form-control w-full border-[1px] border-solid border-[#DEDEDE] bg-[#FFF] pl-[11px] pt-[8px]">
                  <div className="label p-0">
                    <span className="label-text text-tertiary-color text-[12px] font-normal ">
                      Email Address
                    </span>
                  </div>
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="Enter your email"
                    className="input w-full text-[14px] font-normal  p-0 h-[35px] focus:outline-none focus:border-none"
                  />
                </label>

                {/* <div className="relative"> */}
                {/* password */}
                <label className="form-control w-full border-[1px] border-solid border-[#DEDEDE] bg-[#FFF] pl-[11px] pt-[8px] relative">
                  <div className="label p-0">
                    <span className="label-text text-tertiary-color text-[12px] font-normal ">
                      Password
                    </span>
                  </div>
                  <input
                    type={`${toggleEye ? "password" : "text"}`}
                    required
                    name="password"
                    placeholder="Enter your password"
                    className="input w-full text-[14px] font-normal  p-0 h-[35px] focus:outline-none focus:border-none "
                  />
                  {/* eye logo */}
                  {toggleEye ? (
                    <IoEyeOff
                      size={25}
                      className="absolute right-2 bottom-[10px] cursor-pointer"
                      onClick={() => setToggleEye(!toggleEye)}
                    />
                  ) : (
                    <IoEye
                      size={25}
                      className="absolute right-2 bottom-[10px] cursor-pointer"
                      onClick={() => setToggleEye(!toggleEye)}
                    />
                  )}
                </label>

                {passwordError && (
                  <p className="text-xs font-semibold text-red-500">
                    {passwordError}
                  </p>
                )}

                {/* </div> */}
              </div>
              {/* forgot password */}
              <label className="label flex justify-end mt-2">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-[14px] font-medium text-secondary-color text-right"
                >
                  Forgot Password
                </a>
              </label>

              {/* checkbox terms and conditions */}
              <div className="flex items-center gap-2">
                <input
                  onClick={() => setTermsAndPolicy(!termsAndPolicy)}
                  type="checkbox"
                  className="checkbox"
                />
                <p className="text-primary-color font-medium">
                  I agree to the{" "}
                  <span className="underline">Terms & Policy</span>
                </p>
              </div>
              {termsError && (
                <p className="text-xs text-red-500 font-semibold">
                  {termsError}
                </p>
              )}

              <input
                type="submit"
                value="Sign UP"
                className="btn btn-block bg-primary-color text-white rounded-[6px] mt-5"
              />
            </form>
            <div className="divider font-medium">or</div>

            {/* Social Login */}
            <div className="flex md:flex-row flex-col items-center gap-4 justify-between">
              <div className="btn bg-white px-5 border-[1px] border-solid border-[#D9D9D9] rounded-[6px]">
                <FcGoogle size={30} />
                <button>Sign in with Google</button>
              </div>
              <div className="btn bg-white px-5 border-[1px] border-solid border-[#D9D9D9] rounded-[6px]">
                <SiApple size={30} />
                <button>Sign in with Apple</button>
              </div>
            </div>
            <div className="mt-5 mb-7">
              <p className="text-center text-primary-color font-medium">
                Have an account?{" "}
                <Link to="/login" className="text-secondary-color">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 hidden md:block">
          <div>
            <img
              src={furnilFlex}
              alt="image"
              className="max-h-screen w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUP;
