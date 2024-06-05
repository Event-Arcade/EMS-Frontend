import { useState } from "react";
import "./locationForm.css";
import "../../components/ButtonStyle.css";
import SelectBox from "../../components/SelectBox/SelectBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "../../store/hooks";
import {
  updateOrderDate,
  updateDescription,
  incrementStep,
} from "../../features/package/PackageSlice";
import { toast } from "react-toastify";

function LocationForm() {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedFunctionType, setSelectedFunctionType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const functiontype = [
    { label: "Wedding", value: "wedding" },
    { label: "Birthday", value: "birthday" },
    { label: "Corporate", value: "corporate" },
    { label: "Social", value: "social" },
    { label: "Others", value: "others" },
  ];

  const location = [
    { label: "Kegalle", value: "kegalle" },
    { label: "Colombo", value: "colombo" },
    { label: "Kandy", value: "kandy" },
    { label: "Galle", value: "galle" },
    { label: "Others", value: "others" },
  ];

  const handleSubmit = () => {
    try {
      // check if the user has selected the function type and location
      if (!selectedFunctionType || !selectedLocation) {
        toast.error("Please select the function type and location");
        return;
      }

      // start Date should be greater than the current date
      if (startDate < new Date()) {
        toast.error("Please select a valid date");
        return;
      }

      // update the package details
      dispatch(
        updateDescription(
          `Function Type: ${selectedFunctionType}, Location: ${selectedLocation}`
        )
      );
      dispatch(updateOrderDate(startDate));

      // increment the step
      dispatch(incrementStep());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="select-box">
          <SelectBox
            options={functiontype}
            defaultLabel="Function Type"
            value={selectedFunctionType}
            onChange={(value) => setSelectedFunctionType(value)}
            style={{ width: "200px", margin: "40px 50px 10px 100px" }}
          />
          <SelectBox
            options={location}
            defaultLabel="Location"
            value={selectedLocation}
            onChange={(value) => setSelectedLocation(value)}
            style={{ width: "200px", margin: "40px 50px 10px 0px" }}
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date ?? new Date())}
            className="custom-datepicker"
            popperPlacement="bottom"
          />
        </div>
      </form>
      <div className="selection-form">
        <h3>Your Order Details :</h3>
        <h5>Function Type: {selectedFunctionType}</h5>
        <h5>Location: {selectedLocation}</h5>
        <h5>Date: {startDate.toDateString()}</h5>
        <button className="edit-selection-btn mt-5" onClick={handleSubmit}>
          Confirm Your Details
        </button>
      </div>
    </div>
  );
}

export default LocationForm;
