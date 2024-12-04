import { useSelector, useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../store/category/categoryApiSlice";
import { useGetLanguagesQuery } from "../store/language/languageApiSlice";
import { useUpdateLanguageAPIMutation } from "../store/user/userApiSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { toggleLanguageSelection } from "../store/user/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

const CategoriesPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
   const [languageNames, setLanguageNames] = useState([])
  const [updateLanguageAPI, { isLoading: languageUpdateLoading }] =
    useUpdateLanguageAPIMutation();
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error,
  } = useGetCategoriesQuery();
  const {
    data: languages,
    isLoading: isLanguagesLoading,
    error: errorLanguages,
  } = useGetLanguagesQuery();

  const isLanguageSelected = (languageId) =>
    userData.languages && userData.languages.includes(languageId);

  const handleLanguageClick = async (languageId) => {
    try {
      const updatedLanguages = [...userData.languages];
      const isSelected = updatedLanguages.includes(languageId);

      if (isSelected) {
        const index = updatedLanguages.indexOf(languageId);
        updatedLanguages.splice(index, 1); // Remove the language
      } else {
        updatedLanguages.push(languageId); // Add the language
      }


      const response = await updateLanguageAPI({
        language: updatedLanguages, // Correct key for the backend
      }).unwrap();

      if (response.message) {
        dispatch(toggleLanguageSelection(languageId));
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error?.data?.message || error.error || "Server error");
    }
  };

  const categoryHandler = (categoryName) => { 
    navigate('/stories', {state:{categoryName,languageNames}}) 
  }

  useEffect(() => {
    if (languages && userData?.languages) { // Ensure data is available
      const filterData = languages
        .filter(language => userData.languages.includes(language._id)) // Filter matching languages
        .map(language => language.name); // Map to extract names
  
      setLanguageNames(filterData); 
    }
  }, [languages, userData]);
  

  return (
    <div style={{ backgroundColor: "#443280" }}>
      <div className="container mx-auto px-6">
        <section>
          <div className="py-6 rounded-xl mt-5">
            <header className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold tracking-tight text-white hover:underline">
                Languages
              </h3>
            </header>

            <div className="flex mb-10">
              {isLanguagesLoading ? (
                <LoadingSpinner />
              ) : errorLanguages ? (
                <p>Unable to load languages. Please try again later</p>
              ) : (
                languages.map((language) => (
                  <div key={language._id}>
                    <button
                      className={`flex px-3 py-1 rounded-full mr-3 ${
                        isLanguageSelected(language._id)
                          ? "bg-white text-black"
                          : "text-white"
                      }`}
                      onClick={() => handleLanguageClick(language._id)}
                    >
                      {language.name}
                      {isLanguageSelected(language._id) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 ml-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>

            <header className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold tracking-tight text-white hover:underline">
                Categories
              </h3>
            </header>

            <div className="grid grid-cols-4 gap-x-4 gap-y-4">
              {isLoadingCategories ? (
                <LoadingSpinner />
              ) : error ? (
                <p>Unable to load categories. Please try again later</p>
              ) : (
                categoriesData.map((category, index) => (
                  <div
                    key={category._id}
                    className={`p-6 rounded-xl hover:bg-active group active h-64 text-3xl flex items-end siraledge category-${
                      index + 1
                    }`} onClick = {() => categoryHandler(category.category)}
                  >
                    <button className="text-left">{category.category}</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoriesPage;
