import React, { useState, useEffect } from 'react';
import AddReview from './AddReview';
const Review = ({ reviews, setShowCommentInput, id }) => {

  const [showMore, setShowMore] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [showAddReview, setShowAddReview] = useState(false);

  const handleToggleAddReview = () => {
    setShowAddReview(!showAddReview);
  };
  useEffect(() => {
    setVisibleReviews(reviews.slice(0, 3)); // Show the first three reviews initially
  }, [reviews]);


  const handleShowMore = () => {
    setVisibleReviews(reviews); // Show all reviews
    setShowMore(true);
  };




  return (
    <div className='d-flex shorflex gap2 bg-grey pd2 br1 gap-3'>
      <div className='text-start review-add-comment'>
        <div className='d-flex gap-3'>
          <h3 className='bb-grey'>Add a Comment</h3>
          <button className='black-button' onClick={handleToggleAddReview}>
          {showAddReview ? 'Hide' : 'Show'}
        </button>
        </div>
        {showAddReview && <AddReview />}
       </div>
      <div className='shorflex'>
        {visibleReviews.length <= 0 ? (
          <h3>No Reviews Yet, Be The first</h3>
        ) : (
          <>
            {visibleReviews.map((review) => {
              return (
                <div key={review.title} className='d-flex flex-column review-comment'>
                  <div className='d-flex justify-between p-2 m-2'>
                    <h3 className='bb-grey shorflex text-start'>{review.header}</h3>
                    {/* {review.user.id === user.id 
                      ? <button onClick={() => handleDelete(review.id)} className='btn-danger'>Delete</button>
                      : null
                    } */}
                  </div>
                  <div className='d-flex gap-4'>
                    <div>
                      <span className='profile-icon'>{review.user_id.username.charAt(0)}</span>
                    </div>
                    <div className='d-flex flex-column'>
                      <div className='d-flex justify-content-between review-comment-main-upper'>
                        <div className='text-start'>
                          <h3>{review.user_id.username}</h3>
                          <p className='text-grey'>Verified Buyer</p>
                        </div>
                        <div className='review-comment-information'>
                          {/* Display review information */}
                        </div>
                      </div>
                      <div className='text-start'>
                        <p className='text-grey'>{review.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Show "Show More" button if there are more than three reviews */}
            {reviews.length > 3 && !showMore && (
              <button className='show-more-button' onClick={handleShowMore}>
                Show More
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Review;
