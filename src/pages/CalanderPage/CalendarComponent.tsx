import { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
//import '@fullcalendar/react/dist/vdom';
import { EventClickArg } from "@fullcalendar/common";
import "./calender.css";
import { useAppSelector } from "../../store/hooks";
import { get } from "http";

type EventDetail = {
  date: Date;
  shop: string;
  service: string;
  category: string;
  price: number;
  status: number;
};

export default function CalendarComponent() {
  const { subPackages, packages } = useAppSelector((state) => state.package);
  const { shopServices } = useAppSelector((state) => state.service);
  const { categories } = useAppSelector((state) => state.category);
  const { shops } = useAppSelector((state) => state.shop);
  const { user } = useAppSelector((state) => state.account);

  const [showPopup, setShowPopup] = useState(false);
  const [eventDetail, setEventDetail] = useState<EventDetail>();

  const events = useMemo(() => {
    if (user?.role === "client") {
      let events = [];
      for (let pkg of packages) {
        for (let subPackage of pkg.subPackages) {
          events.push({
            title: shopServices.find(
              (service) => service.id === subPackage.serviceId
            )?.name,
            date: subPackage.orderTime,
            id: subPackage.id?.toString(),
            groupId: pkg.id?.toString(),
          });
        }
      }
      return events;
    } else if (user?.role === "vendor") {
      let events = [];
      for (let subPackage of subPackages) {
        events.push({
          title: shopServices.find(
            (service) => service.id === subPackage.serviceId
          )?.name,
          date: subPackage.orderTime,
          id: subPackage.id?.toString(),
        });
      }
      return events;
    }
  }, [subPackages, packages, shopServices, user]);

  // Event click handler
  const handleEventClick = (arg: EventClickArg) => {
    const selectedEvent = events?.find(
      (event) => event.id == arg.event._def.publicId
    );
    if (selectedEvent) {
      if (user?.role === "client") {
        const selectedSubPackage = packages
          // @ts-ignore
          .find((pkg) => pkg.id == selectedEvent.groupId)
          ?.subPackages.find((subPackage) => subPackage.id == selectedEvent.id);
        setEventDetail({
          date: selectedSubPackage?.orderTime ?? new Date(),
          shop:
            shops.find(
              (shop) =>
                shop.id ===
                shopServices.find((s) => s.id === selectedSubPackage?.serviceId)
                  ?.shopId
            )?.name ?? "",
          service:
            shopServices.find(
              (service) => service.id === selectedSubPackage?.serviceId
            )?.name ?? "",
          category:
            categories.find(
              (category) =>
                category.id ===
                shopServices.find(
                  (service) => service.id === selectedSubPackage?.serviceId
                )?.categoryId
            )?.name ?? "",
          price:
            shopServices.find((s) => s.id === selectedSubPackage?.serviceId)
              ?.price ?? 0,
          status: parseInt(selectedSubPackage?.status ?? "") ?? 0,
        });
      } else if (user?.role === "vendor") {
        const selectedSubPackage = subPackages.find(
          (subPackage) => subPackage.id == selectedEvent.id
        );
        setEventDetail(
          selectedSubPackage
            ? {
                date: selectedSubPackage.orderTime,
                shop:
                  shops.find(
                    (shop) =>
                      shop.id ===
                      shopServices.find(
                        (s) => s.id === selectedSubPackage.serviceId
                      )?.shopId
                  )?.name ?? "",
                service:
                  shopServices.find(
                    (service) => service.id === selectedSubPackage.serviceId
                  )?.name ?? "",
                category:
                  categories.find(
                    (category) =>
                      category.id ===
                      shopServices.find(
                        (service) => service.id === selectedSubPackage.serviceId
                      )?.categoryId
                  )?.name ?? "",
                price:
                  shopServices.find(
                    (s) => s.id === selectedSubPackage.serviceId
                  )?.price ?? 0,
                status: parseInt(selectedSubPackage.status ?? "0"),
              }
            : undefined
        );
      }
    }
    setShowPopup(true);
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // get coloured icon based on status
  const getStatusIcon = (status: number) => {
    if (status === 0) {
      return "⚪";
    } else if (status === 2) {
      return "🟢";
    } else if (status === 1) {
      return "🟡";
    } else if (status === 3) {
      return "🔴";
    } else if (status === 4) {
      return "🔵";
    }
  };

  return (
    <div className="calendar-container">
      {/* FullCalendar component */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick as any}
      />

      {/* Popup window */}
      {showPopup && user?.role == "client" ? (
        <div className="popup">
          <div className="popup-content">
            <h3>Events on {eventDetail?.date.toString()}</h3>
            <ul>
              <li>
                <b>Service:</b> {eventDetail?.service}
              </li>
              <li>
                <b>Category:</b> {eventDetail?.category}
              </li>
              <li>
                <b>Shop:</b> {eventDetail?.shop}
              </li>
              <li>
                <b>Price:</b> ${eventDetail?.price}
              </li>
              <li>
                <b>Status:</b> {getStatusIcon(eventDetail?.status ?? 0)}
              </li>
            </ul>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
