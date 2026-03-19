import React from "react";

import { Form, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/SearchForm";

const SearchForm = ({ searchTerm }) => {
  const navigation = useNavigation();
  const isSearching =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <Wrapper>
      <Form className="form" method="get" role="search">
        <input
          type="search"
          name="search"
          className="form-input"
          placeholder="search cocktails"
          defaultValue={searchTerm}
        />
        <button type="submit" className="btn" disabled={isSearching}>
          {isSearching ? "searching..." : "search"}
        </button>
      </Form>
    </Wrapper>
  );
};

export default SearchForm;
