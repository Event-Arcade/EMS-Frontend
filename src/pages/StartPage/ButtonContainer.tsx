import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./buttonContainer.css";
import {
  clearState,
  incrementStep,
  packageCreate,
} from "../../features/package/PackageSlice";
import { useNavigate } from "react-router-dom";

function ButtonContainer() {
  const { categories } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const naviage = useNavigate();
  const { tempararyPackage, currentStep } = useAppSelector(
    (state) => state.package
  );

  const handleSubmitPackage = async () => {
    try {
      const data = {
        subPackages: tempararyPackage.subPackages,
      };
      const resposne = await dispatch(packageCreate(data)).unwrap();
      if (resposne) {
        dispatch(clearState());
        naviage("/dashboard");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (currentStep === categories.length) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, categories]);

  return (
    <div className="main-button-container">
      {currentStep === categories.length ? (
        <button className="custom-next-button" onClick={handleSubmitPackage}>
          Submit
        </button>
      ) : (
        <button
          className="custom-next-button"
          onClick={() => {
            dispatch(incrementStep());
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default ButtonContainer;
