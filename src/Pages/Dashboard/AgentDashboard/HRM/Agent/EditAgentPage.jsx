import React, { useState, useEffect ,useRef } from "react";
import { TextField, MenuItem, Button, InputAdornment, IconButton} from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { IoCloudUpload } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';

const EditAgentPage = ({ update, setUpdate }) => {
    const { agencyId } = useParams();

    const { refetch: refetchAgent, loading: loadingAgent, data: dataAgent } = useGet({ url:`https://travelta.online/agent/hrm/agent/item/${agencyId}` });
    const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/hrm/agent/update/${agencyId}` });


    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    
    useEffect(() => {
        refetchAgent();
    }, [refetchAgent,update]);

    useEffect(() => {
        if (dataAgent && dataAgent.agent) {
            const agent = dataAgent.agent;
            setName(agent.user_name || '')
            setPassword(agent.password || '')
            }
        console.log('dataAgent', dataAgent)
    }, [dataAgent]); // Only run this effect when `data` changes

    const handleReset = () => {
        setName('');
        setPassword('');
    };
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };

    useEffect(() => {
            if (!loadingPost) {
                handleReset();
                setUpdate(!update);
            }
        }, [response]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert('Please Enter Name');
            return;
        }
       
        const formData = new FormData();
        formData.append('user_name', name);
        {password !==null && password !=='' &&
            formData.append('password', password)
        }

        postData(formData, 'Agency Updated Success');
    };

    return (
        <>
        {(loadingPost || loadingAgent )? (
               <div className="w-full h-56 flex justify-center items-center">
                      <StaticLoader />
               </div>
        ) : (
        <>
        <form
          className="w-full flex flex-col gap-5 p-6"
          onSubmit={handleSubmit}
          >
          <div
            className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-5"
          >
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            />
          </div>
 
          </div>
          <div className="w-full flex items-center gap-x-4">
            <div className="">
                <Button text={'Reset'} onClick={handleReset} className="bg-mainColor hover:bg-blue-600 hover:text-white">Reset</Button>
            </div>
            <div className="">
                <Button
                type="submit"
                variant="contained"
                fullWidth
                className="bg-mainColor hover:bg-blue-600 text-white"
            >
                Submit
            </Button>
            </div>
          </div>
        </form>
       </>
        )}
       </>
    );
};

export default EditAgentPage;
