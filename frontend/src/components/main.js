import React from 'react';
const Memory = require('../utils/memory');

const Main = () => {
  React.useEffect(() =>{
    loadTest();
  },[]);

  const loadTest = async() => {
    const test = await Memory.Get(Memory.Indexes.UserSession);
    console.log(test);
  }

  return (
    <h1>Main</h1>
  );
};

export default Main;