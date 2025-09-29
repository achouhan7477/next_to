'use client';
import { useState, useEffect } from 'react';
import '../styles/ditto.css';

export default function DittoDetails() {
  const [ditto, setDitto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDitto = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        const data = await res.json();
        setDitto(data);
        console.log("ditto", data)
      } catch (err) {
        console.error('Error fetching Ditto:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDitto();
  }, []);

  if (loading) return <p>Loading Ditto...</p>;

  return (
    <div className="ditto-container">
      <h2>Ditto Pokémon Details</h2>
      <img
        src={ditto.sprites.front_default}
        alt={ditto.name}
        className="ditto-image"
      />
      <table className="ditto-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>{ditto.id}</td>
          </tr>
          <tr>
            <td>name</td>
            <td>{ditto.name}</td>
          </tr>
          <tr>
            <td>types</td>
            <td>{ditto.types.map(type => type.type.name).join(', ')}</td>
          </tr>
          <tr>
            <td>height</td>
            <td>{ditto.height}</td>
          </tr>
          <tr>
            <td>weight</td>
            <td>{ditto.weight}</td>
          </tr>
            <tr>
            <td>Game Indices</td>
            <td>{ditto.weight}</td>
          </tr>
           <tr>
            <td>Is Default</td>
            <td>{ditto.is_default}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
