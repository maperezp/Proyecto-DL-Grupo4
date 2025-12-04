import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { UploadPage } from "./components/UploadPage";
import { ResultPage } from "./components/ResultPage";

type Page = "landing" | "upload" | "result";
type Data = {
  imageUrl: string;
  result: any;
  processingTime: string;
  modelResult: string[];
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [analyzedImageUrl, setAnalyzedImageUrl] = useState<string>("");
  const [processingTime, setProcessingTime] = useState("");
  const [modelResult, setModelResult] = useState([]);

  const navigateToLanding = () => setCurrentPage("landing");
  const navigateToUpload = () => setCurrentPage("upload");
  const navigateToResult = (data: Data) => {
    setAnalyzedImageUrl(data.imageUrl);
    setCurrentPage("result");
    setProcessingTime(data.processingTime);
    setModelResult(data.modelResult)
  };


  return (
    <>
      {currentPage === "landing" && (
        <LandingPage onNavigateToUpload={navigateToUpload} />
      )}
      {currentPage === "upload" && (
        <UploadPage
          onNavigateToLanding={navigateToLanding}
          onNavigateToResult={navigateToResult}
          // setProcessingTime={processingTime}
        />
      )}
      {currentPage === "result" && (
        <ResultPage
          imageUrl={analyzedImageUrl}
          onNavigateToUpload={navigateToUpload}
          onNavigateToLanding={navigateToLanding}
          processingTime={processingTime}
          modelResult={modelResult}
        />
      )}
    </>
  );
}
