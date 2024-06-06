import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa6";
import { FaGitlab } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { logout } from "../services/operations/authAPI";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-white mx-auto mt-32 text-6xl w-fit">
        #Protected Page
      </h1>
      <h2 className=" text-white mx-auto mt-20 md:text-4xl text-2xl w-fit">
        {" "}
        Thank You For Giving me this Opportunity to prove my Self.
      </h2>
      <div className=" flex sm:flex-row flex-col w-fit mx-auto sm:gap-x-20 gap-y-10 my-20 text-lg cursor-pointer text-richblack-900 font-semibold">
        <Link
          to="https://github.com/Shashan17J"
          className="flex bg-blue-100 items-center gap-x-1 py-[10px] px-[12px] rounded-xl"
        >
          <FaGithub className="text-lg " />
          Github
        </Link>
        <Link
          to="https://gitlab.com/Shashan17J"
          className="flex bg-blue-100 items-center gap-x-1  py-[10px] px-[12px]  rounded-xl"
        >
          <FaGitlab className="text-lg " />
          GitLab
        </Link>
        <Link
          to="https://www.linkedin.com/in/shashank-jangir/"
          className="flex bg-blue-100 items-center gap-x-1  py-[10px] px-[12px] rounded-xl"
        >
          <FaLinkedin className="text-lg " />
          LinkedIn
        </Link>
        <Link
          to="https://shashank-portfolio-eight.vercel.app/"
          className="flex bg-blue-100 items-center gap-x-1  py-[10px] px-[12px] rounded-xl"
        >
          <AiFillFire className="text-lg " />
          Portfolio
        </Link>
      </div>
      <div
        onClick={() => {
          dispatch(logout(navigate));
        }}
        className="flex w-fit mx-auto bg-yellow-100 items-center gap-x-1 py-[10px] px-[12px] text-lg rounded-xl font-semibold text-richblack-900 cursor-pointer"
      >
        <VscSignOut className="text-lg " />
        Logout
      </div>
    </div>
  );
};

export default Dashboard;
