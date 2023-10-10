import React, { useState, useEffect } from "react";
import { Pagination } from 'react-bootstrap';

function UpiList({ navigateTo }) {
  const [upiPayments, setUpiPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [search, setSearch] = useState("");

  const filteredItems = Object.keys(upiPayments).filter(id => upiPayments[id].upiName.toLowerCase().includes(search.toLowerCase()));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const apiKey = "AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs"; // Replace with your actual Firebase API key
        const databaseURL = "https://smart-parking-4c79f-default-rtdb.firebaseio.com/"; // Replace with your Firebase project URL
    
        // Construct the URL to fetch "Users" data from Firebase Realtime Database
        const apiUrl = `${'https://smart-parking-4c79f-default-rtdb.firebaseio.com/'}/UpiInfo.json?auth=${'AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs'}`;

    // Fetch "UPIPayments" data from Firebase
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUpiPayments(data || []);
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
  const currentItems = Object.keys(upiPayments).slice(indexOfFirstItem, indexOfLastItem);

  // Generate the Pagination component
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Object.keys(upiPayments).length / itemsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
        {i}
      </Pagination.Item>,
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Upi Id List</h1>
      <input className="search-bar-style" type="text" placeholder="Search by UPI Name" onChange={e => setSearch(e.target.value)} />
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th className="bg-black text-white">ID</th>
            <th className="bg-black text-white">Upi ID</th>
            <th className="bg-black text-white">Upi Name</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {currentItems
          .filter(id => upiPayments[id].upiName.toLowerCase().includes(search.toLowerCase()))
          .map((id) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{upiPayments[id].upiId}</td>
              <td>{upiPayments[id].upiName}</td>
              {/* Add more table cells for other UPI payment data */}
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

export default UpiList;
