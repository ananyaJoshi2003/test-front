// import React, { useEffect, useState } from "react";
// import { getClient } from "../../services/clientService";
// import "./Clients.css";

// const ClientsSection = () => {
//   const [client, setClient] = useState([]);
//   const [isDataFetched, setIsDataFetched] = useState(false);

//   useEffect(() => {
//     if (!isDataFetched) {
//       fetchClient();
//     }
//   }, [isDataFetched]);

//   const fetchClient = async () => {
//     try {
//       const clientData = await getClient();
//       setClient(clientData.data);
//       setIsDataFetched(true);
//       console.log(clientData.data, "clients");
//     } catch (error) {
//       console.error("Error fetching client:", error);
//     }
//   };

//   return (
//     <section id="Clients" className="clients-section container">
//       <h2>Our Clients</h2>
//       <p>Genius minds with endless tweaks, keeping us on our toes for weeks.</p>
//       <div className="clients-grid">
//         {client.map((clientItem, index) => (
//           <div key ={clientItem._id} className="client-card">
//             <img src={clientItem.clientName} alt={clientItem.clientName} /> {/* Ensure alt text is meaningful */}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ClientsSection;


















import React, { useEffect, useState, useRef } from "react";
import { getClient } from "../../services/clientService";
import "./Clients.css";

const ClientsSection = () => {
  const [client, setClient] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isMarqueeReady, setIsMarqueeReady] = useState(false);
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (!isDataFetched) {
      fetchClient();
    }
  }, [isDataFetched]);

  // Effect to handle marquee visibility
  useEffect(() => {
    if (client.length > 0 && marqueeRef.current) {
      setIsMarqueeReady(true);
    }
  }, [client]);

  const fetchClient = async () => {
    try {
      const clientData = await getClient();
      // Filter out any clients with invalid data
      const validClients = clientData.data.filter(item => 
        item && item.clientName && typeof item.clientName === 'string'
      );
      setClient(validClients);
      setIsDataFetched(true);
      console.log(validClients, "clients");
    } catch (error) {
      console.error("Error fetching client:", error);
    }
  };

  // Make sure we have enough duplicates for smaller screens
  const renderMarqueeItems = () => {
    // We'll repeat the items 3 times instead of just twice to ensure
    // there are enough items for the infinite scroll effect on all screen sizes
    return [
      ...client.map((clientItem) => (
        <div key={`first-${clientItem._id}`} className="client-card">
          <img 
            src={clientItem.clientName} 
            alt={clientItem.clientName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'fallback-image-url.png'; // Add a fallback image URL
            }}
          />
        </div>
      )),
      ...client.map((clientItem) => (
        <div key={`second-${clientItem._id}`} className="client-card">
          <img 
            src={clientItem.clientName} 
            alt={clientItem.clientName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'fallback-image-url.png'; // Add a fallback image URL
            }}
          />
        </div>
      )),
      ...client.map((clientItem) => (
        <div key={`third-${clientItem._id}`} className="client-card">
          <img 
            src={clientItem.clientName} 
            alt={clientItem.clientName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'fallback-image-url.png'; // Add a fallback image URL
            }}
          />
        </div>
      ))
    ];
  };

  return (
    <section id="Clients" className="clients-section container">
      <h2>Our Clients</h2>
      <p>Genius minds with endless tweaks, keeping us on our toes for weeks.</p>
      
      <div className="client-marquee-container">
        {client.length > 0 && (
          <div 
            ref={marqueeRef}
            className="client-marquee"
            style={{ opacity: isMarqueeReady ? 1 : 0, transition: 'opacity 0.5s ease' }}
          >
            {renderMarqueeItems()}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;