import React, { useEffect, useState } from 'react'
import ApplicantApplied from './ApplicantApplied'
import axios from 'axios'
import { constants } from '../utils/constant'

export default function ApplicantAppliedToJobList() {

    const [list,setList] = useState()
    const [jobhead,setJobhead] = useState([])




    useEffect(()=>{

        getjobHeader()
    },[])


    let getjobHeader = () => {
      let id = sessionStorage.getItem("recruiterId");
      axios.get(constants.serverUrl + "/recruiter/getjob/" + id).then((res) => {
        setJobhead(res.data.data);
      });
    };


    let getApplicantByJobId = (idd,jobname) => {
      setList(<ApplicantApplied id={idd} list={list} jobName={jobname} />);
    };


  return (
    <>
      <div>
        <div className="btn-outline-info btn-group dropend mx-3">
          <button
            className="btn btn-outline dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
           Your Job List
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            {jobhead.map((j) => {
              return (
                <li >
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      getApplicantByJobId(j.job_id,j.job_type);
                    }}
                  >
                    {j.job_type}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div>
        {/*List here*/}
        {list}
      </div>
    </>
  );
}
