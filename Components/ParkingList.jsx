import React, { useState, useEffect } from "react";
import { Pagination } from 'react-bootstrap';

function ParkingList({ navigateTo }) {
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredItems = Object.keys(parkingData).filter(id => parkingData[id].name.toLowerCase().includes(search.toLowerCase()));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  useEffect(() => {
      const apiKey = "AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs"; // Replace with your actual Firebase API key
      const databaseURL = "https://smart-parking-4c79f-default-rtdb.firebaseio.com/"; // Replace with your Firebase project URL
  
      // Construct the URL to fetch "Users" data from Firebase Realtime Database
      const apiUrl = `${'https://smart-parking-4c79f-default-rtdb.firebaseio.com/'}/ParkingAreas.json?auth=${'AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs'}`;
  
      // Fetch "Users" data from Firebase
      fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setParkingData(data || []);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });
     setCurrentPage(1);
}, [search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Object.keys(parkingData).slice(indexOfFirstItem, indexOfLastItem);

  // Generate the Pagination component
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Object.keys(parkingData).length / itemsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
        {i}
      </Pagination.Item>,
    );
  }

return (
  <div style={{ textAlign: "center" }}>
    <h1>Available Parking Lists For Booking</h1>
      <input className="search-bar-style" type="text" placeholder="Search by PLACE NAME" onChange={e => setSearch(e.target.value)} />
      <table className="table table-striped">
      <thead className="thead-dark">
          <tr>
          <th className="bg-black text-white">Id</th>
          <th className="bg-black text-white">Place Name</th>
            <th className="bg-black text-white">Length</th>
            <th className="bg-black text-white">Lat</th>
            <th className="bg-black text-white">Long</th>
            <th className="bg-black text-white">Occupied Slots</th>
            <th className="bg-black text-white">Available Slots</th>
            <th className="bg-black text-white">Images-1</th>
            <th className="bg-black text-white">Images-2</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {currentItems
            .filter(id => parkingData[id].name.toLowerCase().includes(search.toLowerCase()))
            .map((id) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{parkingData[id].name}</td>
              <td>{parkingData[id].length}</td>
              <td>{parkingData[id].latitude}</td>
              <td>{parkingData[id].longitude}</td>
              <td>{parkingData[id].occupiedSlots}</td>
              <td>{parkingData[id].availableSlots}</td>
              <td><img src={parkingData[id].imageUrl1} alt="" style={{ width: "100px", height: "100px" }} /></td>
              <td><img src={parkingData[id].imageUrl2} alt="" style={{ width: "100px", height: "100px" }} /></td>
            </tr>
  ))}
</tbody>
      </table>
      <div className="d-flex justify-content-end">
        <Pagination className="custom-pagination">{pageNumbers}</Pagination>
      </div>
  </div>
)
}

export default ParkingList