// src/components/CargoStatusPage.js
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import Navbar from "./Navbar";
import "../styles/CargoStatus.css";

const CargoStatusPage = () => {
    const navigate = useNavigate();

    const steps = ["화물 등록", "계약 완료", "운송 중", "도착 완료"];
    const activeStep = 3;

    const monitoringSteps = [
        "선적준비",
        "항해중",
        "입항 및 통관",
        "도착지 운송",
        "운송완료",
    ];
    const activeMonitoringStep = 3;

    const documentSteps = [
        "물류서비스계약서",
        "선하증권 (Bill of Lading, B/L)",
        "수출 신고서 (Export Declaration)",
    ];
    const activeDocumentStep = 1;

    return (
        <div>
            <Navbar />
            <div className="cargo-status-page-container">
                <div className="cargo-status-bar">
                    {steps.map((step, index) => (
                        <div key={index} className="status-step">
                            <span className={activeStep === index + 1 ? "active" : ""}>
                                {step}
                            </span>
                            {index < steps.length - 1 && (
                                <span className="step-separator">{'>'}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="additional-tasks-container">
                    <div className="task-wrapper">
                        <button
                            className="task-title"
                            onClick={() => navigate("/dashboard/status/monitoring")}
                        >
                            실시간 화물 모니터링 <FiChevronRight />
                        </button>
                        <div className="task-box">
                            {monitoringSteps.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="monitoring-item"
                                    style={{ color: activeMonitoringStep === idx + 1 ? "#00B8FF" : "#969696" }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="task-wrapper">
                        <button
                            className="task-title"
                            onClick={() => navigate("/dashboard/status/document")}
                        >
                            계약 내역 및 문서 관리 <FiChevronRight />
                        </button>
                        <div className="task-box">
                            {documentSteps.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="document-item"
                                    style={{ color: activeDocumentStep === idx + 1 ? "#00B8FF" : "#969696" }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="task-wrapper">
                        <button
                            className="task-title"
                            onClick={() => navigate("/dashboard/status/talk")}
                        >
                            운송 지연 및 문제 발생 알림 <FiChevronRight />
                        </button>
                        <div className="task-box">
                            <div className="alert-content">해당 내용이 없음</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CargoStatusPage;
