import { useState, useEffect } from "react";

export default function FetchNasaComponent() {

  const [mars, setMars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMars(data.photos);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }  

  if (error) {
    return <div className="container">Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h2>Mars Photos</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Photo ID</th>
            <th>Camera Name</th>
            <th>Rover Name</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {mars.map((photo) => (
            <tr key={photo.id}>
              <td>{photo.id}</td>
              <td>{photo.camera.full_name}</td>
              <td>{photo.rover.name}</td>
              <td>
                <img src={photo.img_src} alt={`Mars Rover ${photo.rover.name}`} width={100} height={50} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
