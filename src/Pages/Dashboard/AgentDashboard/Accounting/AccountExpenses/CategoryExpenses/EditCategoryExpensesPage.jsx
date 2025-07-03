import React, { useState, useEffect ,useRef } from "react";
import { TextField,Button, Autocomplete ,CircularProgress  } from "@mui/material";
import { usePost } from '../../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../../Hooks/useGet';
import StaticLoader from '../../../../../../Components/StaticLoader';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const EditCategoryExpensesPage = ({ update, setUpdate }) => {
    const { state } = useLocation();
    const { category } = state || {};
    const { refetch: refetchCategory,loading:loadingCategory, data: DataCategory } = useGet({url: `https://travelta.online/agent/accounting/expenses/category`,});
    const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/accounting/expenses/category/update/${category?.id}` });
    const [parent, setParent] = useState([]);

    const [name, setName] = useState("");
    const [selectedParentCategory, setSelectedParentCategory] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        refetchCategory();
    }, [refetchCategory]);
    
    useEffect(() => {
        if (DataCategory && DataCategory.parent_categories) {
          setParent(DataCategory.parent_categories);
        }
    }, [DataCategory]);

    useEffect(() => {
        if (category) {
          setName(category.name);
          setSelectedParentCategory(category.parent_category?.id)
        }
    }, [category]);
     
    const handleReset = () => {
        setName('');
        setSelectedParentCategory('')
    };

     useEffect(() => {
        if (!loadingPost) {
            if (response) {
            navigate(-1);
            }
        }
        }, [loadingPost, response, navigate]);

        const handleSubmit = async (e) => {
            e.preventDefault();
        
            const formData= new FormData()
            formData.append("name",name);
            formData.append("category_id",selectedParentCategory)
            postData(formData, "Category Updated successful")
        };
    
    return (
        <>
        {(loadingPost || loadingCategory )? (
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
              label="Category Name"
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
                options={
                Array.isArray(parent) && parent.length > 0
                    ? parent
                    : [{ id: "", name: "No Parent Categories", disabled: true }]
                }
                getOptionDisabled={(option) => option.name === "No Parent Categories"} // Disable only this option
                getOptionLabel={(option) => option.name} // Display category name in dropdown
                value={parent.find((category) => category.id === selectedParentCategory) || null}
                onChange={(event, newValue) => setSelectedParentCategory(newValue ? newValue.id : "")}
                loading={loadingCategory} // Show loader if fetching data
                className="w-full shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Parent Category"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <>
                        {loadingCategory ? <CircularProgress className="text-gray-500" size={20} /> : null}
                        {params.InputProps.endAdornment}
                        </>
                    ),
                    }}
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
            disabled={loadingPost || !name } // Ensure button is disabled if no currency is selected
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

export default EditCategoryExpensesPage;
