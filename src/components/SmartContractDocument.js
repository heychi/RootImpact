// src/components/SmartContractDocument.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import Navbar from "./Navbar";
import "../styles/SmartContractDocument.css";

// public 폴더에 복사한 pdf.worker.min.js 파일을 참조합니다.
pdfjs.GlobalWorkerOptions.workerSrc = process.env.PUBLIC_URL + "/pdf.worker.min.js";

const SmartContractDocument = () => {
    const navigate = useNavigate();
    const [showViewer, setShowViewer] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [loadError, setLoadError] = useState(null);

    const openViewer = () => {
        setShowViewer(true);
        setLoadError(null);
    };

    const closeViewer = () => {
        setShowViewer(false);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setLoadError(null);
    };

    const onDocumentLoadError = (error) => {
        console.error("문서를 불러오는 중 에러 발생:", error);
        setLoadError(error);
    };

    // PDF 다운로드 핸들러: 다운로드용 <a> 태그를 생성해 클릭합니다.
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/assets/standardcontractdoc.pdf";
        link.download = "contract.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <Navbar />
            <div className="smart-contract-document-container">
                {/* 페이지 제목 */}
                <h1 className="page-title">스마트계약(전자문서)</h1>
                <hr className="divider" />

                {/* 문서 조회 영역 */}
                <div className="document-section">
                    <span className="document-label">물류서비스계약서</span>
                    <button className="view-button" onClick={openViewer}>
                        문서보기
                    </button>
                </div>

                {/* PDF 문서 뷰어 영역 */}
                {showViewer && (
                    <div className="document-viewer">
                        {/* 다운로드 버튼: 닫기 버튼 왼쪽에 배치 */}
                        <button className="download-button" onClick={handleDownload}>
                            다운로드
                        </button>
                        <button className="close-viewer-button" onClick={closeViewer}>
                            닫기
                        </button>
                        {loadError ? (
                            <div className="error-message">
                                문서를 불러오는 중 오류가 발생했습니다: {loadError.message}
                            </div>
                        ) : (
                            <Document
                                file="/assets/contract.pdf"
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={onDocumentLoadError}
                                loading={<div>문서를 불러오는 중입니다...</div>}
                                error={<div>문서를 불러오지 못했습니다.</div>}
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        className="pdf-page"
                                    />
                                ))}
                            </Document>
                        )}
                    </div>
                )}

                {/* 하단 버튼 영역 */}
                <div className="button-group">
                    <button
                        className="prev-button"
                        onClick={() => navigate("/contract/info")}
                    >
                        이전
                    </button>
                    <button
                        className="next-button"
                        onClick={() => navigate("/contract/payment")}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmartContractDocument;
