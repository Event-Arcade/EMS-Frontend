// import React from "react";

// interface RecentActivityItemProps {
//   item: {
//     _id: number;
//     time: string;
//     color: string;
//     content: string;
//     highlight: string;
//   };
// }

// function RecentActivityItem({ item }: RecentActivityItemProps) {
//   return (
//     <div className="activity-item d-flex">
//       <div className="activity-label">{item.time}</div>
//       <i
//         className={`bi bi-circle-fill activity-badge ${item.color} align-self-start`}
//       ></i>
//       {item.highlight === "" ? (
//         <div className="activity-content">{item.content}</div>
//       ) : (
//         <div className="activity-content">
//           {item.content.substring(0, item.content.indexOf(item.highlight))}
//           <a href="#" className="fw-bold text-dark">
//             {item.highlight}
//           </a>
//           {item.content.slice(
//             item.content.indexOf(item.highlight) + item.highlight.length
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default RecentActivityItem;
