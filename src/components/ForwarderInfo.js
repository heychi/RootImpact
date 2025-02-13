import React from 'react';
import { Card, CardContent, Button } from './ForwarderCard';
import { Star } from 'lucide-react';

const ForwarderInfo = ({ forwarderData }) => {
  return (
    <Card className="forwarder-card">
      <img
        src={forwarderData.detailImage}
        alt="Forwarder"
        className="forwarder-logo"
      />
      <CardContent>
        <h2>{forwarderData.name}</h2>
        <p>예상 운임 비용: {forwarderData.estimatedCost} 원</p>
        <p>소요 기간: {forwarderData.duration}</p>
        <div className="rating-stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={
                i < forwarderData.rating ? 'star-filled' : 'star-empty'
              }
            />
          ))}
        </div>
        <div className="button-group">
          <Button>실시간 채팅</Button>
          <Button>계약요청</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForwarderInfo;
