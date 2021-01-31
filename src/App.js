import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
import './App.css'

function App() {
  const [githubs, setGithubs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchGithubs = async (since) => {
    setLoading(true)
    const result = await axios.get('http://localhost:8080', { params: { since } })
    const chunk = _.chunk(result.data, 10)
    setLoading(false)
    setGithubs(e => [...e, ...chunk])
  }

  useEffect(() => {
    fetchGithubs(0);
  }, [])

  useEffect(() => {
    if (page === (githubs.length - 2)) {
      fetchGithubs(githubs[githubs.length - 1][9].id)
    }
  }, [page, githubs])

  return (
    <>
      <table className='tableContainer'>
        <thead>
          <tr>
            <th>Full Name</th>
          </tr>
        </thead>
        {githubs.length > 0 ? (
          <tbody>
            {githubs[page].map(e => <tr><td>{e.full_name}</td></tr>)}
          </tbody>
        ) : undefined}
      </table>
      <div>
        {page <= 0 ? undefined : <button onClick={() => setPage((prev) => prev - 1)}>previous</button>}
        <button onClick={() => setPage((prev) => prev + 1)} disabled={loading}>next</button>
      </div>
    </>
  );
}

export default App;
