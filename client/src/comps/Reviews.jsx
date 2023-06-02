import React, {useState} from 'react'
// import { addReview } from "../utils/apiRoutes"
import { getStar, currentTime } from '../utils/helperFunctions'
import goldStar from'../assets/ic-actions-star.svg'
import blankStar from'../assets/ic-actions-star-blank.svg'
const Review = ({setShowCommentInput, id}) => {  
    const [rating, setRating] = useState(0);
    const [final, setFinal] = useState(0)
    const [newComment, setNewComment] = useState({
        header: '',
        body: ''
      });
      const handleCommentInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment(prevComment => ({
          ...prevComment,
          [name]: value
        }));
      };
      const user = 1
      const reviews =[{user: {name: 'joe'}, rating: 1, header: "dssaddsdadad", comment: "       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere soluta omnis ab aperiam temporibus consectetur obcaecati quo aliquid provident blanditiis. Repellat ratione veritatis sint dolor quam accusamus eaque voluptate corporis.Quisquam, natus. Officiis consequatur minima aliquid facere illum magni sed doloribus odit quo esse harum, sint, beatae fugit nemo ipsa aut, eligendi iste voluptate. Magnam repellendus eius facere est nam."}]
    //   const handleAddComment = async () => {
    //     // add your code to post new comment here
    //     try {
    //         const response = await addReview(id, newComment.body, final + 1, newComment.header);
    //         const data = await response.json()
    //         console.log(data)
    //         if (!response.ok) {
    //            throw new Error('something went wrong!');
    //          }
             
    //        } catch (err) {
    //          console.error(err);
    //        }
    //     setShowCommentInput(false)
    //     setNewComment({ header: '',
    //     body: ''}); // clear the input field
    //   };
    

      const handleStarClick = (event, index) => {
        event.preventDefault();
        setRating(index + 1);
        setFinal(index)
      };
    
      const getStarReview = () => {
        const res = [];
        for (let i = 0; i < 5; i++) {
          if (i < rating || final > 0 && i <= final ) {
            res.push(
              <img
                key={i}
                src={goldStar}
                onMouseEnter={() => setRating(i + 1)}
                onMouseLeave={() => setRating(0)}
                onClick={(event) => handleStarClick(event, i)}
                style={{ cursor: 'pointer' }}
              />
            );
          } else {
            res.push(
              <img
                key={i}
                src={blankStar}
                onMouseEnter={() => setRating(i + 1)}
                onMouseLeave={() => setRating(0)}
                onClick={(event) => handleStarClick(event, i)}
                style={{ cursor: 'pointer' }}
              />
            );
          }
        }
        return res;
      };
  return (

    <div className='d-flex shorflex gap2 bg-grey pd2 br1 gap-3'>
       <div className=' text-start review-add-comment'>
        <h3 className='bb-grey'>Add a Comment</h3>
        <p className='text-medium-bold m-0'>Add a Header:</p>
                  <input
                  className='input-small'
                  name='header'
                  placeholder='Enter Your Header'
                  value={newComment.header}
                  onChange={handleCommentInputChange}
                  />
              <p className='text-medium-bold m-0'>How Many Stars Would You Give This Item?</p>
              <div className='flex gap1'>
                  {getStarReview()}
              </div>
                  <textarea
                  className='input-large'
                  name='body'
                  placeholder='Add a comment...'
                  value={newComment.body}
                  onChange={handleCommentInputChange}
                  />
              {/* <button className='review-submit-btn' onClick={handleAddComment}>Submit</button> */}
       </div>
       <div className='shorflex'>
       {reviews.length <= 0 ? (
                    <h3>No Reviews Yet, Be The first</h3>
                ) : (
                    <>
                        {reviews.map((review) => {
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
                                          <span className='profile-icon'>
                                              {review.user.name.charAt(0)}
                                          </span>
                                      </div>
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex justify-content-between review-comment-main-upper'>
                                        <div className='text-start'>
                                            <h3>{review.user.name}</h3>
                                            <p className='text-grey'>Verified Buyer</p>
                                        </div>
                                        <div className='review-comment-information'>
                                            <p>{currentTime(review.createdAt)}</p>
                                            <div>{getStar(review.rating)}</div>
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
                    </>
                )}
       </div>
    </div>
  )
}

export default Review