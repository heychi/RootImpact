import React from 'react';

// Card 컴포넌트
export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md p-4 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

// CardContent 컴포넌트
export const CardContent = ({ children }) => {
  return <div className="p-2">{children}</div>;
};

// Button 컴포넌트
export const Button = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const baseStyle =
    variant === 'outline' ? 'border border-gray-300' : 'bg-blue-500 text-white';
  return (
    <button className={`${baseStyle} p-2 rounded ${className}`} {...props}>
      {children}
    </button>
  );
};

// ForwarderCard 컴포넌트 (기존 내용 유지)
const ForwarderCard = ({ data }) => {
  return (
    <Card className="mb-4">
      <CardContent>
        <h2 className="text-xl font-bold">{data.name}</h2>
        <p>예상 운임 비용: {data.estimatedCost} 원</p>
        <p>소요 기간: {data.duration}</p>
      </CardContent>
    </Card>
  );
};

export default ForwarderCard;
