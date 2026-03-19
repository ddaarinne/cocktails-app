import React from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const fetchCocktails = async (searchTerm) => {
  const term = (searchTerm?.trim() || "a").toLowerCase();
  const response = await axios.get(
    `${cocktailSearchUrl}${encodeURIComponent(term)}`,
  );
  const drinks = response.data?.drinks;
  return Array.isArray(drinks) ? drinks : [];
};

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") || "";
  return { searchTerm };
};

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks = [] } = useQuery({
    queryKey: ["search", searchTerm || "a"],
    queryFn: () => fetchCocktails(searchTerm),
    keepPreviousData: true,
  });

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
