import React from "react";
import { Link } from 'react-router'
import { createContainer, query, BodyRenderer } from "@phenomic/preset-react-app/lib/client";


const BlogPost = ({ isLoading, page }) => (
    <div>
      {isLoading && "Loading..."}
      {!isLoading &&
      page.node && (
        <article>
          <h1>{page.node.title}</h1>
          <BodyRenderer>{page.node.body}</BodyRenderer>
        </article>
      )}
      <footer>
        <Link to="/">Go to hell</Link>
      </footer>
    </div>
  );

export default createContainer(BlogPost, props => ({
    page: query({ path: "posts", id: props.params.splat })
}));