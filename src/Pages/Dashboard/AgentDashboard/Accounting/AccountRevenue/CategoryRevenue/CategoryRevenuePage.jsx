import React, { useEffect, useState } from "react";
import { useGet } from "../../../../../../Hooks/useGet";
import { usePost } from "../../../../../../Hooks/usePostJson";
import { MenuItem, TextField } from "@mui/material";
import { useDelete } from "../../../../../../Hooks/useDelete";
import { useAuth } from "../../../../../../Context/Auth";
import { FaEdit, FaFileExcel, FaSearch, FaFilter } from "react-icons/fa";
import StaticLoader from "../../../../../../Components/StaticLoader";

const CategoryRevenuePage = () => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState("");

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [parentID, setParentId] = useState("");
  const [newName, setNewName] = useState("");
  const [newId, setNewId] = useState("");
  const [searchText, setSearchText] = useState("");

  const { deleteData, loadingDelete, responseDelete } = useDelete();

  const {
    refetch: refetchCategory,
    loading: loadingCategory,
    data: DataCategory,
  } = useGet({
    url: `https://travelta.online/agent/accounting/revenue/category`,
  });
  const {
    postData: postCategory,
    loadingPost,
    response,
  } = usePost({
    url: `https://travelta.online/agent/accounting/revenue/category/add`,
  });
  const [category, setCategory] = useState([]);
  const [parent, setParent] = useState([]);
  //Pagination State
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

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

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("category_id", parentID);
    postCategory(formData, "data added successful").then(() => {
      // Close the popup
      setIsAddPopupOpen(false);

      // Reset the form data
      setCategoryName("");
      setParentId("");
      refetchCategory();
    });
  };
  const filteredCategory = categories.filter((category) => {
    const matchesSearch =
      category?.name?.toLowerCase().includes(searchText) ||
      category.parent_category?.name?.toLowerCase().includes(searchText);

    // Directly compare each category with selected filters
    const categoryMatch = selectedCategory
      ? category.name === selectedCategory
      : true;

    const categoryParentMatch = selectedParentCategory
      ? category.parent_category?.name === selectedParentCategory
      : true;

    return matchesSearch && categoryMatch && categoryParentMatch;
  });
  // Export filtered data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      categories.map((category, index) => ({
        SL: index + 1,
        Category_Name: category.name || "-",
        Category_Parent: category.parent_category?.name || "-",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses Categories");
    XLSX.writeFile(workbook, "Expenses Categories.xlsx");
  };

  // Handle input changes
  const handleSearch = (e) => setSearchText(e.target.value.toLowerCase());
  const handleFilterCategory = (e) => setSelectedCategory(e.target.value);
  const handleFilterParentCategory = (e) =>
    setSelectedParentCategory(e.target.value);
  // Get unique lists
  const uniqueCategory = [
    ...new Set(categories.map((category) => category.name).filter(Boolean)),
  ];
  const uniqueParentCategory = [
    ...new Set(
      categories
        .map((category) => category.parent_category?.name)
        .filter(Boolean)
    ),
  ];

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
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user?.token || ""}`,
          },
          body: JSON.stringify(updatedCategory),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCategory((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === selectedCategory.id
              ? { ...cat, ...updatedCategory }
              : cat
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

  if (loadingCategory) {
    return <StaticLoader />;
  }
    // Pagination Logic
    const totalPages = Math.ceil(filteredCategory.length / rowsPerPage);
    const paginatedData = filteredCategory.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  
    const handleNextPage = () =>
      setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    const handlePrevPage = () =>
      setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    const handleRowsChange = (e) => {
      setRowsPerPage(Number(e.target.value));
      setCurrentPage(1); // Reset to first page when rows per page changes
    };

  return (
    <>
      <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
        {loadingCategory || loadingDelete ? (
          <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
          </div>
        ) : (
          <div className="w-full sm:min-w-0">
            {/* Search & Filter Section */}
            <div className="flex flex-wrap items-center gap-4 bg-white p-6 shadow-lg rounded-xl mb-6 border border-gray-200">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg w-full md:w-[280px] border border-gray-300">
                <FaSearch className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by category name or parent category..."
                  value={searchText}
                  onChange={handleSearch}
                  className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                />
              </div>

              <div className="relative w-full md:w-[240px]">
                <select
                  onChange={handleFilterCategory}
                  value={selectedCategory}
                  className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Filter by Category</option>
                  {uniqueCategory.map((Category, index) => (
                    <option key={index} value={Category}>
                      {Category}
                    </option>
                  ))}
                </select>
                <FaFilter className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
              </div>

              <div className="relative w-full md:w-[240px]">
                <select
                  onChange={handleFilterParentCategory}
                  value={selectedParentCategory}
                  className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Filter by Parent Category</option>
                  {uniqueParentCategory.map((Category, index) => (
                    <option key={index} value={Category}>
                      {Category}
                    </option>
                  ))}
                </select>
                <FaFilter className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
              </div>

              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
              >
                <FaFileExcel className="w-5 h-5" />
                Export to Excel
              </button>
            </div>

            {/* Rows per Page */}
            <div className="flex items-center space-x-2 mb-5">
              <label className="text-gray-700 font-medium">
                Rows per page:
              </label>
              <div className="w-full md:w-[120px]">
                <select
                  onChange={handleRowsChange}
                  value={rowsPerPage}
                  className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer"
                >
                  <option value="5">5 rows</option>
                  <option value="10">10 rows</option>
                  <option value="20">20 rows</option>
                  <option value="30">30 rows</option>
                  <option value="50">50 rows</option>
                </select>
              </div>
            </div>

            {/**table */}
            <div className="w-full sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-200 text-gray-700">
                  <tr className="border-t-2 border-b-2">
                    <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">
                      ID
                    </th>
                    <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">
                      Category
                    </th>
                    <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">
                      Parent
                    </th>
                    <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((category, index) => (
                    <tr key={category.id}>
                      <td
                        colSpan="4"
                        className="text-center text-xl text-gray-500 py-4"
                      >
                        {index + 1}
                      </td>
                      <td
                        colSpan="4"
                        className="text-center text-xl text-gray-500 py-4"
                      >
                        {category.name}
                      </td>
                      <td
                        colSpan="4"
                        className="text-center text-xl text-gray-500 py-4"
                      >
                        {category.parent_category?.name || "-"}
                      </td>
                      <td
                        colSpan="4"
                        className="text-center text-xl text-gray-500 py-4"
                      >
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedCategory(category);
                              setNewName(category.name);
                              setNewId(category.parent_category?.id || "");
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
                    <button
                      onClick={() => setIsAddPopupOpen(false)}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={AddCategory}
                      className="px-4 py-2 bg-mainColor text-white rounded"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isEditPopupOpen && selectedCategory && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-semibold mb-4">
                    Update Category
                  </h2>
                  <TextField
                    label="Category Name"
                    fullWidth
                    margin="normal"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)} // Fixed the change event handler
                  />
                  <TextField
                    select
                    fullWidth
                    label="Select Parent Category"
                    value={newId}
                    margin="normal"
                    onChange={(e) => setNewId(e.target.value)} // Fixed the change event handler
                  >
                    {parent.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsEditPopupOpen(false)}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateCategory}
                      className="px-4 py-2 bg-mainColor text-white rounded"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}


                      {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300"
                  : "bg-mainColor text-white hover:bg-blue-600"
              } transition-all`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-mainColor text-white hover:bg-blue-600"
              } transition-all`}
            >
              Next
            </button>
          </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryRevenuePage;
