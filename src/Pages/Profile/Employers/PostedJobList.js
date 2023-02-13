import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const PostedJobList = () => {
    // const [users, setUsers] = useState([]);

    const { data: jobs = [], refetch } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const respone = await fetch('http://localhost:5000/jobs');
            const data = respone.json();
            return data;
        }
    })


    const handleDelete = (job) => {
        fetch(`http://localhost:5000/jobs/${job._id}`, {
            method: 'DELETE'
        })
            .then(respnse => respnse.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast('Job Deleted Successfully.')
                }
            });
        // console.log(user._id);
    }

    const handleJobsUpdate = (job) => {
        console.log("Selected to Update Job : ", job._id)
    }


    return (
        <div>
            <h2 className=' text-center font-bold my-3  '>Posted Job List</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className=''>
                            <th>SL</th>
                            <th>Title</th>
                            <th>Organization</th>
                            <th>Job Type</th>
                            <th>Posted</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map((job, index) =>
                                <tr key={job._id} className="">
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link className=' text-decoration-none text-primary ' to={`/jobs/${job._id}`}>
                                            {/* <Link className='text-decoration-none fw-bolder' to={`/services/${service._id}`}>            Show Details</Link> */}
                                            {job.jobTitle}
                                        </Link>
                                    </td>
                                    <td>{job.organization}</td>
                                    <td>{job.jobLevel}</td>
                                    <td>{job.postDate}</td>
                                    <td>{job.deadLine}</td>
                                    <td>
                                        <Link to={`/dashboardAdmin/jobUpdate/${job._id}`}>
                                            <button className=' fw-bold btn-sm btn btn-primary mx-1'
                                                onClick={() => handleJobsUpdate(job._id)}
                                            >Update</button>
                                        </Link>

                                        <button className=' btn btn-sm  btn-outline-danger'
                                            onClick={() => handleDelete(job)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default PostedJobList;