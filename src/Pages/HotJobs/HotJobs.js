import React, { useEffect, useState } from 'react';
import HotJobsDisplay from './HotJobsDisplay';
import { FaHotjar } from 'react-icons/fa';
import './HotJobs.css';
import { useQuery } from '@tanstack/react-query';

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

    let sliceJobs = jobs.slice(0, 9)

    return (
        <div className=' common-margin '>
            <h2 className='my-5 careers_title_one'><FaHotjar className='mx-1'></FaHotjar>HOT JOBS</h2>
            <div className='hot_job_category'>

                {!showAll &&
                    sliceJobs.map(job => <HotJobsDisplay
                        key={job._id}
                        job={job}
                    ></HotJobsDisplay>)
                }

                {showAll &&
                    jobs.map(job => <HotJobsDisplay
                        key={job._id}
                        job={job}
                    ></HotJobsDisplay>)
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