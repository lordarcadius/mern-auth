import React, { useEffect, useState } from 'react'

function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(localStorage.getItem('userName'));

  }, []);

  return (
    <div><h1>{userName}</h1></div>
  )
}

export default Home