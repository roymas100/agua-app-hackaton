// import React, { useEffect } from "react";
// import styled from "styled-components";
// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
// // import L, { divIcon } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet.heat";
// import { renderToStaticMarkup } from "react-dom/server";




// export default function Mapa() {
//   return (
//     <MapaContainer>
//       <MapContainer center={[-12.9285057, -38.5085962]} zoom={13} scrollWheelZoom={false}>
//         <LeafletMapa />
//       </MapContainer>
//     </MapaContainer>
//   );
// }

// function LeafletMapa() {
//   const map = useMap();

//   const iconMarkup = renderToStaticMarkup(
//     <i className="fa fa-map-marker-alt fa-3x" />
//   );

//   const customMarkerIcon = divIcon({
//     html: iconMarkup,
//   });

//   useEffect(() => {
//     const addressPoints: L.HeatLatLngTuple[] = denunciaList.map(local => [local.location[0], local.location[1], 25]);
//     const points = addressPoints;

//     L.heatLayer(points, {
//       radius: 10,
//       blur: 24,
//       maxZoom: 13,
//     }).addTo(map);
//   }, [denunciaList, map]);
//   return (
//     <>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//       {denunciaList.map(item => {

//         return (
//           <Marker position={item.location as any} icon={customMarkerIcon}>
//             <Popup>
//               <div>
//                 <p>{item.username}</p>
//                 <p>{item.category}</p>
//                 <p>{item.eventDate}</p>
//               </div>
//             </Popup>
//           </Marker>
//         )
//       })}

//     </>
//   );
// }

// const MapaContainer = styled.div`
//   display: block;
//   position: absolute;
//   height: 100%;
//   width: 100%;

//   .leaflet-container {
//     height: calc(100vh - 100px);
//   }

//   .leaflet-tile {
//     filter: var(--leaflet-tile-filter, none);
//   }

//   .leaflet-container {
//     background: #303030;
//   }
// `;
