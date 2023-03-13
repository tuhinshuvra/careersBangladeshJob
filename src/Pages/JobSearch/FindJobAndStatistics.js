import React, { useContext, useEffect, useRef, useState } from "react";
import { FaSearchDollar, FaChartLine, FaRegBuilding } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { AuthContext } from "../Authentication/AuthProvider";
import "./FindJobHome.css";

const FindJobAndStatistics = () => {
  const [totalJobs, setTotalJobs] = useState("1");
  const [totalCompanies, setTotalCompanies] = useState("1");
  const [totalEmployers, setTotalEmployers] = useState("1");

  const { setSearchData } = useContext(AuthContext);

  // const searchRef = useRef();

  useEffect(() => {
    fetch("https://careers-bangladesh-server-tuhinshuvra.vercel.app/jobs")
      .then((response) => response.json())
      .then((data) => setTotalJobs(data));
  }, []);

  useEffect(() => {
    fetch("https://careers-bangladesh-server-tuhinshuvra.vercel.app/employers")
      .then((response) => response.json())
      .then((data) => setTotalEmployers(data));
  }, []);

  const totalJobNo = totalJobs.length + 10000;
  const totalCompanyNo = totalEmployers.length + 1000;
  const totalEmployersNo = totalEmployers.length + 2000;
  console.log("totalJobs : ", totalJobNo);

  // useEffect(() => {
  //     fetch(`https://careers-bangladesh-server-tuhinshuvra.vercel.app/jobSearch?search=${search}`)
  //         .then(response => response.json())
  //         .then(data => {
  //             console.log("Find Job Home Search Result :", data)
  //         })
  // }, [search]);

  const getSearchKeyword = (event) => {
    const jobTitle = event.target.value;
    setSearchData(jobTitle);
  };

  const getSearchOrganization = (event) => {
    const orgaName = event.target.value;
    setSearchData(orgaName);
  };

  const getSearchPlace = (event) => {
    const placeName = event.target.value;
    setSearchData(placeName);
  };

  return (
    <div className="findAndStat">
      <div className="col-lg-10 mx-auto ">
        <h2 className="careers_title_one">
          <FaSearchDollar className="mx-1"></FaSearchDollar>LETS FIND YOUR JOB
        </h2>
        <div className="d-md-flex  justify-content-center mt-4 mx-md-2">
          <input
            onBlur={getSearchKeyword}
            name="jobTitle"
            type="text"
            id="jobTitle"
            placeholder="Search with keyword"
            className=" form-control w-75  w-md-25  mx-auto"
          />

          <select
            onBlur={getSearchOrganization}
            name="orgaType"
            className="form-select w-75  w-md-25 ms-md-1 me-md-1 mx-auto marginSM "
          >
            <option>Select Company Type</option>
            <option value="Government">Government</option>
            <option value="Semi Government">Semi Government</option>
            <option value="NGO">NGO</option>
            <option value="Private Firm">Private Firm</option>
            <option value="International Agencies">
              International Agencies
            </option>
            <option value="Others">Others</option>
          </select>

          <input
            onBlur={getSearchPlace}
            name="location"
            type="text"
            id="location"
            placeholder="Location"
            className="form-control  w-75 w-md-25 mx-auto "
          />

          <Link
            to={`/searchHomeResult`}
            className=" text-decoration-none custom_btn"
          >
            {" "}
            Search
          </Link>
        </div>

        <div className=" my-5">
          <div className="row justify-content-center">
            <div className=" col-md-3  home_stat ">
              <div className="counter-box glowOnHover">
                <FaChartLine className="  text-secondary fs-1 mt-1"></FaChartLine>
                <span className="counter">
                  <CountUp start={1} end={totalJobNo} duration={5} />
                </span>

                <p>Live Jobs</p>
              </div>
            </div>

            <div className=" col-md-3 ">
              <div className="counter-box  glowOnHover">
                <FaRegBuilding className="  text-secondary fs-1 mt-1"></FaRegBuilding>
                <span className="counter">
                  <CountUp start={1} end={totalCompanyNo} duration={5} />
                </span>
                <p className="">Companies</p>
              </div>
            </div>

            <div className=" col-md-3 ">
              <div className="counter-box glowOnHover">
                <BsPeopleFill className="  text-secondary fs-1 mt-1"></BsPeopleFill>
                <span className="counter">
                  <CountUp start={1} end={totalEmployersNo} duration={5} />
                </span>
                <p>Employers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobAndStatistics;
