import React from 'react';
import '../style/ReviewSummary.css';

const ReviewSummary = ({
  averageRating = 0,
  reviewCount = 0,
  ratingDistribution = {},
  reviews = [],
}) => {
  // 막대 그래프 렌더링 함수
  const renderRatingBar = (score) => {
    const total = reviewCount || 1; // 0으로 나누는 오류 방지
    const widthPercentage = ratingDistribution[score]
      ? (ratingDistribution[score] / total) * 100
      : 0; // 값이 없으면 0%

    return (
      <div className="rating-bar-container" key={score}>
        <span>{score}점</span>
        <div className="rating-bar-background">
          <div
            className="rating-bar-filled"
            style={{ width: `${widthPercentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="review-summary-container">
      <h2 className="review-title">회사 리뷰</h2>

      {/* 총 평점 & 리뷰 개수 & 평점 비율 */}
      <div className="review-summary-box">
        {/* 사용자 총 평점 */}
        <div className="summary-section">
          <h3>사용자 총 평점</h3>
          <div className="star-container">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={
                  i <= Math.round(averageRating) ? 'star filled' : 'star empty'
                }
              >
                {i <= Math.round(averageRating) ? '★' : '☆'}
              </span>
            ))}
          </div>

          <p className="score">{averageRating.toFixed(2)}/5</p>
        </div>

        {/* 전체 리뷰 수 */}
        <div className="summary-section">
          <h3>전체 리뷰수</h3>
          <p className="review-count">{reviewCount} 개</p>
        </div>

        {/* 평점 비율 */}
        <div className="summary-section rating-distribution">
          <h3>평점 비율</h3>
          <div className="rating-bars">
            {[5, 4, 3, 2, 1].map((score) => renderRatingBar(score))}
          </div>
        </div>
      </div>

      {/* 리뷰 리스트 */}
      <div className="review-list">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div className="review-item" key={index}>
              <div className="review-user">
                <div className="avatar"></div>
                <div className="user-info">
                  <span className="username">{review.user}</span>
                  <span className="user-role"> {review.role}</span>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              {index !== reviews.length - 1 && (
                <hr className="review-divider" />
              )}
            </div>
          ))
        ) : (
          <div className="no-reviews-message">아직 리뷰가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default ReviewSummary;
