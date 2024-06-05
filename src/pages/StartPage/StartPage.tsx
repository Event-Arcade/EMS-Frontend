import "./startPage.css";
import Stepper from "../../components/Stepper/Stepper";
import LocationForm from "./LocationForm";
import { useAppSelector } from "../../store/hooks";
import ServicesList from "./ServicesList";

function StartPage() {
  const { categories } = useAppSelector((state) => state.category);
  const { currentStep } = useAppSelector((state) => state.package);

  function showStep(step: number) {
    if (step === 0) {
      return <LocationForm />;
    } else if (step > 0 && step <= categories.length) {
      // @ts-ignore
      return <ServicesList categoryId={categories[step - 1].id!} />;
    }
  }

  return (
    <div className="main-container" id="main-container">
      <Stepper />
      {showStep(currentStep)}
    </div>
  );
}

export default StartPage;
