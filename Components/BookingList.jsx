import React, { useState, useEffect } from "react";
import { Pagination } from 'react-bootstrap';

function BookingList({ navigateTo }) {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [search, setSearch] = useState("");

  const filteredItems = Object.keys(bookedSlots).filter(id => bookedSlots[id].userID.toLowerCase().includes(search.toLowerCase()));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const apiKey = "AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs"; // Replace with your actual Firebase API key
        const databaseURL = "https://smart-parking-4c79f-default-rtdb.firebaseio.com/"; // Replace with your Firebase project URL
    
        // Construct the URL to fetch "Users" data from Firebase Realtime Database
        const apiUrl = `${'https://smart-parking-4c79f-default-rtdb.firebaseio.com/'}/BookedSlots.json?auth=${'AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs'}`;
    // Fetch "BookedSlots" data from Firebase
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBookedSlots(data || []);
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
  const currentItems = Object.keys(bookedSlots).slice(indexOfFirstItem, indexOfLastItem);

  // Generate the Pagination component
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Object.keys(bookedSlots).length / itemsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
        {i}
      </Pagination.Item>,
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Parking Booked List</h1>
      <input className="search-bar-style" type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)} />
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th className="bg-black text-white">ID</th>
            <th className="bg-black text-white">User ID</th>
            <th className="bg-black text-white">Place ID</th>
            <th className="bg-black text-white">Wheeler Type</th>
            <th className="bg-black text-white">Amount Checked In</th>
            <th className="bg-black text-white">Amount Checked Out</th>
            <th className="bg-black text-white">Payment Status</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
        {currentItems
            .filter(id => bookedSlots[id].userID.toLowerCase().includes(search.toLowerCase()))
            .map((id) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{bookedSlots[id].userID}</td>
              <td>{bookedSlots[id].placeID}</td>
              <td>{bookedSlots[id].wheelerType}</td>
              <td>{bookedSlots[id].amount}</td>
              <td>{bookedSlots[id].formattedAmount}</td>
              <td>{bookedSlots[id].hasPaid}</td>
              {/* Add more table cells for other booked slot data */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <Pagination className="custom-pagination">{pageNumbers}</Pagination>
      </div>
    </div>
  );
}

export default BookingList;