import { useCallback, useEffect, useState } from "react";
import "./servicesList.css";
import "./locationForm.css";
import SelectBox from "../../components/SelectBox/SelectBox";
import { useAppSelector } from "../../store/hooks";
import ShopService from "../../interfaces/ShopService";
import ButtonContainer from "./ButtonContainer";
import ShopServiceCard from "./ShopServiceCard/ShopServiceCard";

export default function ServicesList({
  currentStep,
  categoryId,
  onNextClick,
}: {
  currentStep: number;
  categoryId: number;
  onNextClick: () => void;
}) {
  const { shopServices } = useAppSelector((state) => state.service);
  const [selectedItems, setSelectedItems] = useState<ShopService[]>([]);
  const [tempCategoryId, setTempCategoryId] = useState<number | null>(null);
  const items = useCallback(() => {
    setTempCategoryId(categoryId);
    return shopServices.filter((service) => service.categoryId === categoryId);
  }, [shopServices, categoryId]);

  const [selectNoOfGuest, setSelectNoOfGuest] = useState("");
  const [selectedBudget, setselectedBudget] = useState("");
  const [selectedRating, setselectedRating] = useState("");

  useEffect(() => {
    const result = items();
    if (result) {
      setSelectedItems(result);
    }
  }, [items]);

  // filter the services when onOfGuest, budget or rating changes
  useEffect(() => {
    let result = items();
    if (selectNoOfGuest) {
      result = result.filter(
        (item) =>
          item.noOfGuests && item.noOfGuests <= parseInt(selectNoOfGuest)
      );
    }
    if (selectedBudget) {
      result = result.filter((item) => item.price <= parseInt(selectedBudget));
    }
    if (selectedRating) {
      result = result.filter(
        (item) => item.rating && item.rating <= parseInt(selectedRating)
      );
    }
    if (result.length === 0) {
      result = items();
    }
    setSelectedItems(result);
  }, [selectNoOfGuest, selectedBudget, selectedRating, tempCategoryId]);

  const noOfGuest = [
    { label: "Under 50", value: 50 },
    { label: "Under 100", value: 100 },
    { label: "Under 200", value: 200 },
    { label: "Over 200", value: 201 },
  ];

  const budget = [
    { label: "Rs 100,000", value: "100000" },
    { label: "Rs 200,000", value: "200000" },
    { label: "Rs 300,000", value: "300000" },
    { label: "Rs 400,000", value: "400000" },
    { label: "Rs 500,000<", value: "500000" },
  ];
  const rating = [
    { label: "<1", value: "1" },
    { label: "<2", value: "2" },
    { label: "<3", value: "3" },
    { label: "<4", value: "4" },
    { label: "<5", value: "5" },
  ];

  return (
    <div>
      <div className="select-box">
        <SelectBox
          options={noOfGuest.map((item) => ({
            label: item.label,
            value: item.value.toString(),
          }))}
          defaultLabel="No of Guests"
          value={selectNoOfGuest}
          onChange={(value) => setSelectNoOfGuest(value)}
          style={{ width: "200px", margin: "40px 50px 10px 120px" }}
        />
        <SelectBox
          options={budget}
          defaultLabel="Budget"
          value={selectedBudget}
          onChange={(value) => setselectedBudget(value)}
          style={{ width: "200px", margin: "40px 50px 10px 0px" }}
        />
        <SelectBox
          options={rating}
          defaultLabel="Rating"
          value={selectedRating}
          onChange={(value) => setselectedRating(value)}
          style={{ width: "200px", margin: "40px 50px 10px 0px" }}
        />
      </div>
      <ButtonContainer currentStep={currentStep} onNextClick={onNextClick} />
      <div className="Service-form-container">
        <div className="Service-form-list">
          {selectedItems.map((item, index) => (
            // @ts-ignore
            <ShopServiceCard key={index} shopService={item} />
          ))}
        </div>
        <ul className="Service-form-listPage"></ul>
      </div>
    </div>
  );
}