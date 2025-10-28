import Spinner from "@/components/ui/Spinner/Spinner";
import "./loadingpage.css";
const LoadingPage = () => {
  return (
    <div className="loading-page">
      <Spinner size="med" variant="secondary" ariaLabel="Loading page content" />
    </div>
  );
};

export default LoadingPage;
