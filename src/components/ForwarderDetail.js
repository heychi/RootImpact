import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Button } from '../Forwarder/ForwarderCard';
import { Star } from 'lucide-react';
import ReviewList from './ReviewList';
import Navbar from './Navbar';
import '../styles/ForwarderDetail.css';

import companyImage from '../assets/company_KMTC.jpg';
import procedures from '../assets/company_KMTC_3.jpg';

import ForwarderTable from './ForwarderTable';
import '../styles/ForwarderTable.css';
import ReviewSummary from './ReviewSummary';

const ForwarderDetailPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const reviewSummaryRef = useRef(null);
  const [averageRating, setAverageRating] = useState(0);

  const forwarderData = {
    name: 'KTMC',
    estimatedCost: '385,000',
    duration: '2주(2025.02.03 - 02.16)',
    maxWeight: '200kg',
    maxVolume: '6000 cbm',
    reviews: [
      { user: 'impact', rating: 4, comment: '컨트롤을 잘 해줘서 좋았습니다.' },
      {
        user: 'foward',
        rating: 3,
        comment: '매번 사고 없이 진행돼서 좋습니다.',
      },
      {
        user: 'likelion',
        rating: 5,
        comment: '원하는 요구사항을 최대한 들어주셔서 감사해요',
      },
      { user: 'root', rating: 5, comment: '콜드체인이 잘 되는 것 같아요.' },
      {
        user: 'ddalgicci',
        rating: 5,
        comment: '제가 생각했던 것보다 컨트롤 잘해주셔서 좋았습니다.',
      },
    ],
  };

  useEffect(() => {
    const totalRating = forwarderData.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const avgRating = totalRating / forwarderData.reviews.length;
    setAverageRating(avgRating);
  }, [forwarderData.reviews]);

  const handleReviewClick = () => {
    if (reviewSummaryRef.current) {
      reviewSummaryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChatClick = () => {
    navigate('/chat');
  };

  const RatingStars = ({ rating }) => (
    <div className="rating-stars">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={i < rating ? 'star-filled' : 'star-empty'} />
      ))}
    </div>
  );

  return (
    <div className="page-container">
      <div className="content-container">
        <Card className="forwarder-card">
          <div className="forwarder-header">
            <img
              src={companyImage}
              alt="Forwarder"
              className="forwarder-logo"
            />
            <CardContent className="forwarder-details enlarged">
              <div className="info-row">
                <span className="label">업체명</span>
                <span className="value bold">{forwarderData.name}</span>
              </div>
              <div className="info-row">
                <span className="label">운임 비용</span>
                <span className="value bold">
                  {forwarderData.estimatedCost}원
                </span>
              </div>
              <div className="info-row">
                <span className="label">예상 운송일자</span>
                <span className="value bold">{forwarderData.duration}</span>
              </div>
              <div className="info-row">
                <span className="label">최대 무게(kg)</span>
                <span className="value bold">{forwarderData.maxWeight}</span>
              </div>
              <div className="info-row">
                <span className="label">최대 부피(cbm)</span>
                <span className="value bold">{forwarderData.maxVolume}</span>
              </div>
              <div className="button-group">
                <Button className="action-button" onClick={handleChatClick}>
                  실시간 채팅
                </Button>
                <Button className="action-button primary">계약 요청</Button>
              </div>
            </CardContent>
          </div>
        </Card>

        <div className="tabs-container">
          <Button
            className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            상세정보
          </Button>
          <Button
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={handleReviewClick}
          >
            리뷰 ({forwarderData.reviews.length})
          </Button>
        </div>

        <div className="details-section">
          <img
            src={companyImage}
            alt="Detail"
            className="detail-image aligned"
          />
        </div>

        <div>
          <img src={procedures} alt="Procedures" className="procedures-image" />
        </div>

        <div>
          <ForwarderTable />
        </div>

        <div ref={reviewSummaryRef}>
          <ReviewSummary
            averageRating={averageRating}
            reviewCount={forwarderData.reviews.length}
            ratingDistribution={forwarderData.reviews.reduce(
              (acc, { rating }) => {
                acc[rating] = (acc[rating] || 0) + 1;
                return acc;
              },
              {}
            )}
            reviews={forwarderData.reviews}
          />
        </div>
      </div>
    </div>
  );
};

export default ForwarderDetailPage;
