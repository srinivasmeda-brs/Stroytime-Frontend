import AuthorsList from "../components/authors/AuthorsList";
import { useGetCategoriesQuery } from '../store/category/categoryApiSlice';
import { useGetLanguagesQuery } from '../store/language/languageApiSlice';
import { useEffect, useState } from "react";
import { useGetAuthorsStoriesQuery } from "../store/spotify/spotifyApiSlice";
import LoadingSpinner from '../components/LoadingSpinner';

const AuthorsPage = () => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [languageNames, setLanguageNames] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);

  // API Query
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: languagesData } = useGetLanguagesQuery();

  // Construct the query only when we have valid data
  const query = categoryNames.length > 0 && languageNames.length > 0
    ? `${categoryNames.join(",")} languages:${languageNames.join(",")}`
    : null;

  const { data: authorsData, isLoading: authorsIsLoading } = useGetAuthorsStoriesQuery({
    q: query,
    type: "show",
    include_external: "audio",
    market: "IN",
    limit: 25,
  });

  // Filter the explicit stories based on explicit property (this property will be present in response data)
  useEffect(() => {
    if (authorsData) {
      const nonExplicitAuthorsStories = authorsData.shows.items.filter(
        (story) => !story.explicit
      );
      setAuthorsList(nonExplicitAuthorsStories);
    }
  }, [authorsData]);

  // Format the category and language names (store them as arrays)
  useEffect(() => {
    if (categoriesData) {
      const formattedCategoryNames = categoriesData.map((category) => category.category);
      setCategoryNames(formattedCategoryNames);
    }

    if (languagesData) {
      const formattedLanguageNames = languagesData.map((language) => language.name);
      setLanguageNames(formattedLanguageNames);
    }
  }, [languagesData, categoriesData]);

  return (
    <div className="container mx-auto mt-5 px-5">
      {authorsIsLoading ? (
        <LoadingSpinner />
      ) : authorsList?.length > 0 ? (
        <AuthorsList authors={authorsList} />
      ) : (
        <p className="text-center my-16">No Stories to load, please try later</p>
      )}
    </div>
  );
};

export default AuthorsPage;
