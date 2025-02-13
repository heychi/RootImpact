import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi'; //X 아이콘 추가
import Navbar from './Navbar';
import '../styles/DocumentDashboard.css';

const ContractManagement = () => {
    const navigate = useNavigate();

    //가라 데이터
    const currentContracts = [
        {
            id: '049885',
            date: '2025-02-05 16:11',
            condition: '어쩌구 저쩌구',
            transport: '어쩌구 저쩌구',
            insurance: '어쩌구 저쩌구',
        },
        {
            id: '049886',
            date: '2025-02-06 10:30',
            condition: '계약 조건',
            transport: '운송 조건',
            insurance: '보험 내용',
        },
    ];

    // 가라 데이터
    const pastContracts = [
        { id: '039284', details: '이전 계약 내용', payment: '결제 내역' },
    ];

    return (
        <div>
            <Navbar />
            <div className="contract-management-container">
                {/*X 닫기 버튼*/}
                <button
                    className="close-icon"
                    onClick={() => navigate('/dashboard/status')}
                >
                    <FiX size={30} />
                </button>

                <div className="title-container">
                    <h2 className="title">현재 진행중인 계약정보</h2>
                    <p className="description">계약서류를 한눈에 확인해보세요!</p>
                </div>

                <div className="contract-table">
                    <div className="table-header">
                        <span>계약 체결일</span>
                        <span>계약조건</span>
                        <span>운송조건</span>
                        <span>보험 여부 및 종류</span>
                    </div>
                    {currentContracts.map((contract) => (
                        <div key={contract.id} className="table-row">
                            <span>{contract.date}</span>
                            <span>{contract.condition}</span>
                            <span>{contract.transport}</span>
                            <span>{contract.insurance}</span>
                        </div>
                    ))}
                </div>

                <h3 className="subtitle">이전 계약 문서</h3>
                <div className="past-contracts">
                    <div className="table-header">
                        <span>계약서</span>
                        <span>계약내역</span>
                        <span>결제 내역</span>
                    </div>
                    {pastContracts.map((contract) => (
                        <div key={contract.id} className="table-row">
                            <span>계약번호: {contract.id}</span>
                            <span>{contract.details}</span>
                            <span>{contract.payment}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContractManagement;
