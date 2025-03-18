import React, { useEffect, useState } from "react";
import { FaPlus, FaFilter, FaTrash, FaEdit } from "react-icons/fa";
import { useGet } from "../../../../../../Hooks/useGet";
import { usePost } from "../../../../../../Hooks/usePostJson";
import { MenuItem, TextField } from "@mui/material";
import { useDelete } from "../../../../../../Hooks/useDelete";
import { useAuth } from "../../../../../../Context/Auth";
import { FaTrashCan } from "react-icons/fa6";
import StaticLoader from "../../../../../../Components/StaticLoader";

const CategoryRevenuePage = () => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [parentID, setParentId] = useState('');
  const [newName, setNewName] = useState('');
  const [newId, setNewId] = useState('');
  const { refetch: refetchCategory,loading:loadingCategory, data: DataCategory } = useGet({
    url: `https://travelta.online/agent/accounting/revenue/category`,
  });
  const { postData: postCategory ,loadingPost,response } = usePost({ url: `https://travelta.online/agent/accounting/revenue/category/add` });
  const [category, setCategory] = useState([]);
  const [parent, setParent] = useState([]);
  const { deleteData } = useDelete();

  const auth = useAuth();
    useEffect(() => {
    refetchCategory();
  }, [refetchCategory]);

  useEffect(() => {
    if (DataCategory) {
      setCategory(DataCategory.categories);
      setParent(DataCategory.parent_categories);
    }
  }, [DataCategory]);

  const AddCategory = async (e) => {
    e.preventDefault();

    const formData= new FormData()
    formData.append("name",categoryName);
    formData.append("category_id",parentID)
    postCategory(formData, "data added successful")
    .then(() => {
      // Close the popup
      setIsAddPopupOpen(false);

      // Reset the form data
      setCategoryName('');
      setParentId('');
      refetchCategory();
      
   
    })
  };


  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;

    const updatedCategory = {
      name: newName,
      category_id: newId,
    };

    try {
      const response = await fetch(
        `https://travelta.online/agent/accounting/revenue/category/update/${selectedCategory.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.user?.token || ''}`,
          },
          body: JSON.stringify(updatedCategory),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCategory((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === selectedCategory.id ? { ...cat, ...updatedCategory } : cat
          )
        );
        setIsEditPopupOpen(false); // Close the edit popup
        auth.toastSuccess("Category updated successfully!");
      } else {
        auth.toastError("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      auth.toastError("Error updating category");
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteData(
      `https://travelta.online/agent/accounting/revenue/category/delete/${id}`,
      `Category Deleted Successfully.`
    );
    if (success) {
      setCategory(category.filter((item) => item.id !== id));
    }
  };

  if(loadingCategory){
    return <StaticLoader/>
  }

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaFilter /> Filter
        </button> */}  
        <button
          className="bg-mainColor text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => setIsAddPopupOpen(true)}
        >
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-200 text-mainColor">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Parent</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category, index) => (
              <tr key={category.id} className="border-b">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{category.name}</td>
                <td className="p-3">{category.parent_category?.name || "-"}</td>
                <td className="p-3 relative">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setNewName(category.name);
                        setNewId(category.parent_category?.id || '');
                        setIsEditPopupOpen(true);
                      }}
                      className="text-left p-2 hover:bg-gray-100 text-mainColor flex items-center gap-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-left p-2 hover:bg-red-100 flex items-center gap-2 text-red-500"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Category</h2>
            <TextField
              label="Category Name"
              fullWidth
              value={categoryName}
              margin="normal"
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <TextField
              select
              fullWidth
              label="Select Parent Category"
              value={parentID}
              margin="normal"
              onChange={(e) => setParentId(e.target.value)}
            >
              {parent.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsAddPopupOpen(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={AddCategory} className="px-4 py-2 bg-mainColor text-white rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditPopupOpen && selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Category</h2>
            <TextField
              label="Category Name"
              fullWidth
              margin="normal"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}  // Fixed the change event handler
            />
            <TextField
              select
              fullWidth
              label="Select Parent Category"
              value={newId}
              margin="normal"
              onChange={(e) => setNewId(e.target.value)}  // Fixed the change event handler
            >
              {parent.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditPopupOpen(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={handleUpdateCategory} className="px-4 py-2 bg-mainColor text-white rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryRevenuePage;
