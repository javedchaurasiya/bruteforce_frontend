import React from "react";
import PostSkeleton from "./PostSkeleton";
import ViewMoreComponent from "./ViewMoreComponent";
import "./postPage.css";

function PostPageComponent() {
  return (
    <div className="main-post-page">
      <PostSkeleton
        postDetails={{
          id: "326584",
          heading:
            "Maximum Length of a Concatenated String with Unique Characters - C++ || Very Easy Backtracking Sol || 4ms runtime",
          timeline: "1 week ago",
          likes: "69",
          views: "3k",
        }}
      />
      <PostSkeleton
        postDetails={{
          id: "326584",
          heading: "Meta Interview Experience",
          timeline: "1 week ago",
          likes: "1k",
          views: "95k",
        }}
      />
      <PostSkeleton
        postDetails={{
          id: "326584",
          heading: "Two Sum Solution || C++",
          timeline: "1 months ago",
          likes: "100",
          views: "15k",
        }}
      />
      <PostSkeleton
        postDetails={{
          id: "326584",
          heading: "Google Internship Interview Experience",
          timeline: "1 months ago",
          likes: "10k",
          views: "1M",
        }}
      />
      <PostSkeleton
        postDetails={{
          id: "326584",
          heading: "Kuch Din to guzariye Gujarat Me",
          timeline: "69 years ago",
          likes: "69k",
          views: "69M",
        }}
      />
      <div className="view-more-submissions-btn">
        <ViewMoreComponent link={"myPosts"} />
      </div>
    </div>
  );
}

export default PostPageComponent;
