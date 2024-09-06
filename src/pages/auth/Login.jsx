import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { SiApple } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import furnilFlex from "../../../public/furniFlex.png";
import Loader from "../../components/shared/Loader/Loader";
import useAuth from "../../hooks/useAuth/useAuth";
const Login = () => {
  const [toggleEye, setToggleEye] = useState(true);
  const [termsAndPolicy, setTermsAndPolicy] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { loginUser, loading, user } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    navigate("/");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!termsAndPolicy) {
      return setTermsError("You Should Check the Terms & Conditions First!");
    }

    try {
      setTermsError("");
      const result = await loginUser(email, password);
      if (result?.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center ">
        <div className="md:w-1/2 lg:px-[126px]">
          <div className="p-6 bg-[#FAFAFA] md:rounded-[8px] border-[1px] border-solid border-[#F5F5F5] rounded-md h-screen md:h-auto">
            {/* welcome text */}
            <div className="py-[28.5px] gap-y-1">
              <h2 className="text-primary-color text-[32px] font-medium">
                Welcome Back!
              </h2>
              <p className="text-tertiary-color text-[16px] font-medium">
                Enter your Credentials to access your account
              </p>
            </div>

            {/* login form start */}
            <form action="" onSubmit={handleSubmit}>
              <div className="space-y-4">
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
                value="Sign In"
                className="btn btn-block bg-primary-color text-white rounded-[6px] mt-5"
              />
            </form>
            <div className="divider font-medium">or</div>

            {/* Social Login */}
            <div className="flex items-center gap-4 justify-between">
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
                <Link to="/signUP" className="text-secondary-color">
                  Sign UP
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

export default Login;
