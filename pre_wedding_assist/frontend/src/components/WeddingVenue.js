// import React, { useState } from 'react';

// import './WeddingVenue.css'; // Styles for the component




// const WeddingVenue = () => {

//   const [guests, setGuests] = useState([

//     { id: 1, name: 'Guest 1', table: null },

//     { id: 2, name: 'Guest 2', table: null },

//     { id: 3, name: 'Guest 3', table: null },

//     { id: 4, name: 'Guest 4', table: null },

//     // ... Add more guests here

//   ]);




//   const [tables, setTables] = useState([

//     { id: 1, number: 1, guests: [] },

//     { id: 2, number: 2, guests: [] },

//     { id: 3, number: 3, guests: [] },

//     { id: 4, number: 4, guests: [] },

//     // ... Add more tables here

//   ]);




//   const handleGuestDragStart = (event, guest) => {

//     event.dataTransfer.setData('text/plain', guest.id);

//   };




//   const handleTableDrop = (event, tableId) => {

//     event.preventDefault();

//     const guestId = parseInt(event.dataTransfer.getData('text/plain'));

//     const updatedGuests = guests.map((guest) => {

//       if (guest.id === guestId) {

//         return { ...guest, table: tableId };

//       }

//       return guest;

//     });

//     setGuests(updatedGuests);

//     updateTableGuests(tableId, guestId);

//   };




//   const handleTableDragOver = (event) => {

//     event.preventDefault();

//   };




//   const updateTableGuests = (tableId, guestId) => {

//     const updatedTables = tables.map((table) => {

//       if (table.id === tableId) {

//         const updatedGuests = [...table.guests, guestId];

//         return { ...table, guests: updatedGuests };

//       }

//       return table;

//     });

//     setTables(updatedTables);

//   };




//   const getGuestTable = (guestId) => {

//     const guest = guests.find((guest) => guest.id === guestId);

//     return guest ? guest.table : null;

//   };




//   return (

//     <div className="wedding-venue">

//       <div className="venue-area" style={{ width: '75%' }}>

//         {tables.map((table) => (

//           <div

//             key={table.id}

//             className="table"

//             onDrop={(event) => handleTableDrop(event, table.id)}

//             onDragOver={handleTableDragOver}

//           >

//             <span>Table {table.number}</span>

//             <ul>

//               {table.guests.map((guestId) => (

//                 <li key={guestId}>{`Guest ${guestId}`}</li>

//               ))}

//             </ul>

//           </div>

//         ))}

//       </div>

//       <div className="guest-list" style={{ width: '25%' }}>

//         <h3>Guest List</h3>

//         <ul>

//           {guests.map((guest) => (

//             <li

//               key={guest.id}

//               draggable

//               onDragStart={(event) => handleGuestDragStart(event, guest)}

//             >

//               {guest.name} - Table: {getGuestTable(guest.id)}

//             </li>

//           ))}

//         </ul>

//       </div>

//     </div>

//   );

// };




// export default WeddingVenue;