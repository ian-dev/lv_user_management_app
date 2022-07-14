import { useState, useEffect } from "react";
import UserTable from "./UserTable";

function UsersMainContainer() {
  const API_URL = 'https://gorest.co.in/public/v2/users';
  const [usersData, setUsersData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json()
      setUsersData(json);
    } catch(e) {
      console.error(e);
    }        
  }
  
  return (
    <main className="user__main__container">
      <header className="main__container__header">
        <h1>LiveVox User Management</h1>
      </header>
      <UserTable users={usersData}/>
    </main>
  )
}

export default UsersMainContainer;