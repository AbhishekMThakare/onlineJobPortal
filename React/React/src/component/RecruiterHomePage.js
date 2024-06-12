import React, { useEffect, useState } from 'react'
import loc from '../images/room_black_24dp.svg'
import work from '../images/work_white_24dp.svg'
import check from '../images/checklist_rtl_black_24dp.svg'
import pos from '../images/people_black_24dp.svg'
import edit from '../images/edit.svg'
import del from '../images/delete.svg'
import toggle from '../images/toggleoff.svg'
import axios from 'axios'

import { useHistory } from 'react-router-dom'
import { constants } from '../utils/constant'
import { toast } from 'react-toastify'


export default function RecruiterHomePage() {

    const [jobPost,setJobPost] = useState([])
    const [state,setState] = useState("")
    var [searchText, setSearchText] = useState("");
    const history = useHistory();

    useEffect(()=>{

        getJobPosted();


    },[])


    let trimDate = (date) => {
      let d = date.substr(0, 10).split("-").reverse().join("-");
      return d;
    };

    let search = (args) => {
      setSearchText(args.target.value);
    };

    let editJob = (input) => {
      history.push({
        pathname: "/editjob",
        state: input,
      });
    };

    let getJobPosted = () => {
      let id = sessionStorage.getItem("recruiterId");
      axios.get(constants.serverUrl + "/recruiter/getjob/" + id).then((res) => {
        setJobPost(res.data.data);
        setState("");
      });
    };

    let delJob = (id) => {
      axios
        .delete(constants.serverUrl + "/recruiter/dltjob/" + id)
        .then((res) => {
          if (res.data.status === "success") {
            toast.success("Deleted SuccessFully");
            getJobPosted();
          }
        });
    };

    let makeInactive = (bool, id) => {
      const obj = {
        status: false,
      };
      if (bool === false) {
        axios
          .put(constants.serverUrl + "/recruiter/active/" + id, obj)
          .then((res) => {
            if (res.data.status === "success") {
              getJobPosted();
              toast.info("JOB IS NOW INACTIVE")
            }
          });
      }
    };



  return (
    <>
  

      <div className="shadow p-3 mb-5 bg-body rounded container">
        <center className="row">
          <div className="d-flex col">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search By Job Type Or Location"
              aria-label="Search"
              value={searchText}
              onChange={search}
            />
    
          </div>

          <button
            type="button"
            className="btn btn-outline-info col"
            style={{ maxWidth: 150 }}
            onClick={() => {
              history.push("/addjob");
            }}
          >
            ADD JOB
          </button>
        </center>
      </div>

      {jobPost.map((job) => {

            if(searchText === ""){
        return (
          <center>
            <div
              className="shadow-lg p-3 mb-5 bg-body rounded"
              style={{
                maxWidth: 1000,
                height: "inherit",
                display: "flex",
                borderRadius: 100,
              }}
            >
              <div style={{ marginLeft: 0, position: "relative" }}>
                <div style={{ display: "flex", marginLeft: 30 }}>
                  <h5 style={{ marginLeft: 0 }}>{job.job_type}</h5>
                </div>

                <ul>
                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={work} style={{ fill: "black" }} alt="img"></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.company_name}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={loc} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.job_location}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={check} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.skill_set_required}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={pos} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.position}</p>
                  </li>
                </ul>

                <div style={{ marginLeft: 30, float: "left",maxWidth : '100%',display : 'flex',flexDirection : 'column' }}>
                  <h6 style={{ float: "left" ,display : 'flex'}}>JOB DESCRIPTION</h6>
                  
                  <p style={{ float: "left", textAlign: "initial",overflow : "auto" ,maxWidth: 700,overflowWrap : 'anywhere',height : 200}}>
                    {job.job_description}
                  </p>
                  <div
                  style={{ display : 'flex',justifyContent : 'flex-end' }}
                >
                  <label> {trimDate(job.created_date)}</label>
                </div>
                  
                </div>
            
              </div>
              <div>
              <button
                type="button"
                className="btn btn-outline-warning"
                style={{ height: "max-content" }}
                onClick={() => {
                  editJob({
                    job_type: job.job_type,
                    skill_set_required: job.skill_set_required,
                    position: job.position,
                    job_location: job.job_location,
                    job_description: job.job_description,
                    job_id: job.job_id,
                  });
                }}
              >
                <img src={edit} alt='click'/>
              </button>
              <button
                type="button"
                className="btn btn-outline-danger mx-3 my-3"
                style={{ height: "max-content",width: 50 }}
                onClick={() => {
                  delJob(job.job_id);
                }}
              >
               <img src={del}  alt='click'style={{ height: "max-content" }}/>
              </button>
              <button className="btn btn-outline-info" type="button"  style={{height : 'max-content'}} onClick={(e)=>{
                makeInactive(false,job.job_id)
              }}><img src={toggle} alt='click' /> </button> 
              </div>
            </div>
          </center>
        );
            }else if(job.job_type.toLowerCase().includes(searchText.toLowerCase()) ||job.job_location.toLowerCase().includes(searchText.toLowerCase()) ){

                return (
                  <center>
            <div
              className="shadow-lg p-3 mb-5 bg-body rounded"
              style={{
                maxWidth: 1000,
                height: "inherit",
                display: "flex",
                borderRadius: 100,
              }}
            >
              <div style={{ marginLeft: 0, position: "relative" }}>
                <div style={{ display: "flex", marginLeft: 30 }}>
                  <h5 style={{ marginLeft: 0 }}>{job.job_type}</h5>
                </div>

                <ul>
                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={work} style={{ fill: "black" }} alt="img"></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.company_name}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={loc} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.job_location}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={check} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.skill_set_required}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={pos} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.position}</p>
                  </li>
                </ul>

                <div style={{ marginLeft: 30, float: "left",maxWidth : '100%',display : 'flex',flexDirection : 'column' }}>
                  <h6 style={{ float: "left" ,display : 'flex'}}>JOB DESCRIPTION</h6>
                  
                  <p style={{ float: "left", textAlign: "initial",overflow : "auto" ,maxWidth: 700,overflowWrap : 'anywhere',height : 200}}>
                    {job.job_description}
                  </p>
                  <div
                  style={{ display : 'flex',justifyContent : 'flex-end' }}
                >
                  <label> {trimDate(job.created_date)}</label>
                </div>
                  
                </div>
            
              </div>
              <div>
              <button
                type="button"
                className="btn btn-outline-warning"
                style={{ height: "max-content" }}
                onClick={() => {
                  editJob({
                    job_type: job.job_type,
                    skill_set_required: job.skill_set_required,
                    position: job.position,
                    job_location: job.job_location,
                    job_description: job.job_description,
                    job_id: job.job_id,
                  });
                }}
              >
                <img src={edit} alt='click'/>
              </button>
              <button
                type="button"
                className="btn btn-outline-danger mx-3 my-3"
                style={{ height: "max-content",width: 50 }}
                onClick={() => {
                  delJob(job.job_id);
                }}
              >
               <img src={del} alt='click' style={{ height: "max-content" }}/>
              </button>
              <button className="btn btn-outline-info" type="button"  style={{height : 'max-content'}} onClick={(e)=>{
                makeInactive(false,job.job_id)
              }}><img src={toggle} alt='click'/> </button> 
              </div>
            </div>
          </center>
                  );   


            }else{return(<></>)}

      })}
    </>
  );
}
