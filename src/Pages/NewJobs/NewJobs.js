import React, { useEffect, useState } from 'react';
import { FaSun } from 'react-icons/fa';
import './NewJobs.css';
import { useQuery } from '@tanstack/react-query';
import NewJobsDisplay from './NewJobsDisplay';

const HotJobs = () => {

    const [showAll, setShowAll] = useState(false);

    const handleShowAll = () => {
        setShowAll(true);
    }


    const { data: jobs = [], refetch } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const respone = await fetch('http://localhost:5000/jobs');
            const data = respone.json();
            return data;
        }
    })

    let sliceJobs = jobs.slice(0, 6)

    return (
        <div className=' common-margin '>
            <h2 className='my-5 careers_title_one'><FaSun className='mx-1'></FaSun>New JOBS</h2>
            <div className='hot_job_category'>

                {!showAll &&
                    sliceJobs.map(job => <NewJobsDisplay
                        key={job._id}
                        job={job}
                    ></NewJobsDisplay>)
                }

                {showAll &&
                    jobs.map(job => <NewJobsDisplay
                        key={job._id}
                        job={job}
                    ></NewJobsDisplay>)
                }


            </div>
            <div className=' text-center my-3'>
                {
                    !showAll &&
                    <button onClick={() => handleShowAll()} className=' custom_btn '>View More</button>
                }
            </div>
        </div>
    );
};
export default HotJobs;