import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AddComment from "./AddComments";
import { Col } from "react-bootstrap";

export default function Comments({
  docId,
  comments: allComments,

  commentInput,
}) {
  const [comments, setComments] = useState(allComments);

  return (
    <>
      <div className="border-bottom w-100">
        <Col className=" col-12">
          {comments.length >= 6 && (
            <p role="button" className="sm-text font-weight-light mb-1">
              View all comments
            </p>
          )}
          {comments.map((item) => (
            <p key={`${item.comment}-${item.displayName}`} className="mb-1">
              <Link to={`/p/${item.displayName}`}>
                <span className="mr-1 font-weight-bold text-dark">
                  {item.displayName}
                </span>
              </Link>
              <span>{item.comment}</span>
            </p>
          ))}
        </Col>
      </div>

      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  commentInput: PropTypes.object.isRequired,
};
