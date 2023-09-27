import React, { useState, useEffect } from "react";

function ParkingBookingUpi() {
  const [currentPage, setCurrentPage] = useState("parking");

  const handleNavigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{currentPage === "parking" ? "Parking List" : currentPage === "bookedSlots" ? "Booked Slots List" : "UPI Payment List"}</h1>
      {currentPage === "parking" ? (
        <ParkingList navigateTo={handleNavigateTo} />
      ) : currentPage === "bookedSlots" ? (
        <BookedSlots navigateTo={handleNavigateTo} />
      ) : (
        <PaymentList navigateTo={handleNavigateTo} />
      )}
    </div>
  );
}

// ParkingList component
function ParkingList({ navigateTo }) {
    const [parkingData, setParkingData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const apiKey = "AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs"; // Replace with your actual Firebase API key
        const databaseURL = "https://smart-parking-4c79f-default-rtdb.firebaseio.com/"; // Replace with your Firebase project URL
    
        // Construct the URL to fetch "Users" data from Firebase Realtime Database
        const apiUrl = `${'https://smart-parking-4c79f-default-rtdb.firebaseio.com/'}/Users.json?auth=${'AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs'}`;
    
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
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
        <table className="table table-striped">
        <thead className="thead-dark">
            <tr>
            <th className="bg-black text-white">Name</th>
              <th className="bg-black text-white">Place</th>
              <th className="bg-black text-white">Length</th>
              <th className="bg-black text-white">Lat,Long</th>
              <th className="bg-black text-white">Occupied Slots</th>
              <th className="bg-black text-white">Available Slots</th>
              <th className="bg-black text-white">Images</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {Object.keys(parkingData).map((id) => (
              <tr key={id}>
              <td>{parkingData[id].name}</td>
              <td>{parkingData[id].place}</td>
              <td>{parkingData[id].length}</td>
              <td>{parkingData[id].latandlong}</td>
              <td>{parkingData[id].occupiedslots}</td>
              <td>{parkingData[id].availableslots}</td>
              <td>{parkingData[id].imageurl}</td>
                {/* Add more table cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
        <button  type="button" className="btn btn-success margin-success-button-left" onClick={() => navigateTo("bookedSlots")}>Go to Booked Slots</button>
      <button type="button" className="btn btn-success" onClick={() => navigateTo("upiPayments")}>Go to UPI Payments</button>
    </div>
  )
}

// BookedSlots component (similar structure as ParkingList)
function BookedSlots({ navigateTo }) {
    const [bookedSlots, setBookedSlots] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const apiKey = "AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs"; // Replace with your actual Firebase API key
          const databaseURL = "https://smart-parking-4c79f-default-rtdb.firebaseio.com/"; // Replace with your Firebase project URL
      
          // Construct the URL to fetch "Users" data from Firebase Realtime Database
          const apiUrl = `${'https://smart-parking-4c79f-default-rtdb.firebaseio.com/'}/Users.json?auth=${'AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs'}`;
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
    }, []);
  
    return (
      <div style={{ textAlign: "center" }}>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th className="bg-black text-white">Slot ID</th>
              <th className="bg-black text-white">User ID</th>
              <th className="bg-black text-white">Amount Checked In</th>
              <th className="bg-black text-white">Amount Checked Out</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {Object.keys(bookedSlots).map((slotId) => (
              <tr key={slotId}>
                <td>{slotId}</td>
                <td>{bookedSlots[slotId].parkingId}</td>
                <td>{bookedSlots[slotId].userId}</td>
                <td>{bookedSlots[slotId].checkedIn}</td>
                <td>{bookedSlots[slotId].checkedOut}</td>
                {/* Add more table cells for other booked slot data */}
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-success" onClick={() => navigateTo("parking")} >Go to Parking List</button>
      </div>
    );
}

// PaymentList component (similar structure as ParkingList)
function PaymentList({ navigateTo }) {
    const [upiPayments, setUpiPayments] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const apiKey = "YOUR_FIREBASE_API_KEY"; // Replace with your Firebase API key
      const databaseURL = "YOUR_FIREBASE_PROJECT_URL"; // Replace with your Firebase project URL
  
      // Construct the URL to fetch "UPIPayments" data from Firebase Realtime Database
      const apiUrl = `${databaseURL}/UPIPayments.json?auth=${apiKey}`;
  
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
    }, []);
  
    return (
      <div style={{ textAlign: "center" }}>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th className="bg-black text-white">Transaction ID</th>
              <th className="bg-black text-white">User ID</th>
              <th className="bg-black text-white">Amount</th>
              <th className="bg-black text-white">Timestamp</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {Object.keys(upiPayments).map((transactionId) => (
              <tr key={transactionId}>
                <td>{transactionId}</td>
                <td>{upiPayments[transactionId].upid}</td>
                <td>{upiPayments[transactionId].amount}</td>
                <td>{upiPayments[transactionId].timestamp}</td>
                {/* Add more table cells for other UPI payment data */}
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-success" onClick={() => navigateTo("parking")}>Go to Parking List</button>
      </div>
    );
}

export default ParkingBookingUpi;
