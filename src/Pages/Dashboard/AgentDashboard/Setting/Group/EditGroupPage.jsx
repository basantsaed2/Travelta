import React, { useState, useEffect } from "react";
import { TextField,MenuItem,Button,Checkbox,ListItemText,Autocomplete} from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useNavigate, useParams } from 'react-router-dom';

const EditGroupPage = ({ update, setUpdate }) => {
  const { groupId } = useParams();
  const { refetch: refetchGroupList, loading: loadingGroupList, data: groupList } = useGet({ url:`https://travelta.online/agent/settings/group/item/${groupId}` });
    const { refetch: refetchGroup, loading: loadingGroup, data: Group } = useGet({
      url: `https://travelta.online/agent/settings/group`,
    });
    const { postData, loadingPost, response } = usePost({
      url: `https://travelta.online/agent/settings/group/update/${groupId}`,
    });
  const [name, setName] = useState("");
  const [nationalities, setNationalities] = useState([]); // Stores all nationalities
  const [nationalitiesIds, setNationalitiesIds] = useState([]); // Stores selected nationality IDs
  const navigate = useNavigate();

  useEffect(() => {
    refetchGroup();
    refetchGroupList();
  }, [refetchGroup,update]);

    useEffect(() => {
        if (Group && Group.nationalities) {
              setNationalities(Group.nationalities);
          }
    }, [Group]);

    useEffect(() => {
      if (groupList && groupList.group) {
        const group = groupList.group;
        setName(group.name || '')
        const selectedNationality = group.nationalities.map(nat => nat.id); 
        setNationalitiesIds(selectedNationality);     
      }
      console.log('groupList', groupList)
    }, [groupList]); // Only run this effect when `data` changes
    
    const handleReset = () => {
      setName('');
      setNationalitiesIds([]);
    };
    useEffect(() => {
      if (!loadingPost) {
        if (response) {
          navigate(-1); // Navigate back only when the response is successful
        } else {
          console.error("Response does not indicate success:", response);
        }
      }
    }, [response]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert('Please Enter Name');
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('nationalities', JSON.stringify(nationalitiesIds));

        postData(formData, 'Group Nationality Updated Success');
    };

    return (
        <>
        {(loadingPost || loadingGroup ||loadingGroupList)? (
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
                label="Group Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
              />
          </div>
           <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
              <Autocomplete
                multiple
                className="w-full shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
    
                options={nationalities}
                getOptionLabel={(option) => option.name}
                value={nationalities.filter((nat) => nationalitiesIds.includes(nat.id))}
                onChange={(event, newValue) => setNationalitiesIds(newValue.map((nat) => nat.id))}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox checked={selected} />
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Services"
                    variant="outlined"
                    />
                )}
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
              fullWidth
              variant="contained"
              className="bg-mainColor hover:bg-blue-600 text-white"
              color="primary"
              onClick={handleSubmit}
              disabled={loadingPost || !name || nationalitiesIds.length === 0}
            >
              {loadingPost ? "Submitting..." : "Submit"}
            </Button>
            </div>
          </div>
        </form>
       </>
        )}
       </>
    );
};

export default EditGroupPage;
