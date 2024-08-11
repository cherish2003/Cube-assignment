import React, { useEffect, useState, useMemo, useCallback } from "react";
import Lottie from "lottie-react";
import ani1 from "../assets/ani1.json";

type Customer = {
  id: number;
  name: string;
  title: string;
  address: string;
};

type CustomerDetailsProps = {
  customer?: Customer | null;
};

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomQuery = useMemo(() => {
    const queries = ["people", "nature", "technology", "abstract", "animals"];
    return queries[Math.floor(Math.random() * queries.length)];
  }, []);

  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const query = getRandomQuery;
      const page = Math.floor(Math.random() * 100) + 1;

      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=9&page=${page}`,
        {
          headers: {
            Authorization:
              "ULpxDKIIGz6rSxaWqBaBzOMIicqRNKLjLwXFcEI42O89gho6xyzf8eea",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const photoUrls = data.photos.map((photo: any) => photo.src.medium);
        setPhotos(photoUrls);
      } else {
        setError("Failed to fetch photos.");
        console.error("Failed to fetch photos:", response.statusText);
      }
    } catch (error) {
      setError("Error fetching photos.");
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  }, [getRandomQuery]);

  useEffect(() => {
    if (customer) {
      fetchPhotos();
      const intervalId = setInterval(fetchPhotos, 10000);
      return () => clearInterval(intervalId);
    }
  }, [customer, fetchPhotos]);

  if (!customer) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-2">No Customer Selected</h2>
        <p className="text-gray-700">
          Please select a customer to view their details.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow-lg flex flex-col justify-center items-center h-full bg-customGray w-full p-3">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
        {customer.name}
      </h2>
      <p className="text-gray-600 mb-2">{customer.title}</p>
      <p className="text-gray-500 mb-6">{customer.address}</p>

      <div className="h-full w-full md:w-4/5 lg:w-1/2 sm:h-3/4">
        {loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <Lottie
              animationData={ani1}
              loop={true}
              style={{ width: 150, height: 150 }}
            />
          </div>
        ) : error ? (
          <div className="text-red-500 flex justify-center items-center">
            Failed to load images. Please try again.
          </div>
        ) : (
          <div className="grid grid-cols-2 place-items-center	gap-1 sm:grid-cols-3 md:gap-2 lg:gap-3 w-full">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 shadow-lg"
              >
                <img
                  src={photo}
                  alt={`Customer photo ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg blur-sm"
                  onLoad={(e) => e.currentTarget.classList.remove("blur-sm")}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
