import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Notsignin from '/src/components/Notsignin.jsx';  // Change this line to use default import

const Contributor = () => {
  const { id } = useParams();
  const [contributor, setContributor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributor = async () => {
      try {
        const response = await axios.get(`/api/contributors/${id}`);
        setContributor(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributor();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {contributor ? (
        <div>
          <h1>{contributor.name}</h1>
          <p>{contributor.bio}</p>
        </div>
      ) : (
        <Notsignin />
      )}
    </div>
  );
};

export default Contributor;