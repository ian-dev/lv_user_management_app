import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faUserXmark, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ModalWindow from './ModalWindow';
import TableButton from './TableButton';
import NewUserButton from './NewUserButton';


function UserTable({ users }) {
  const [usersList, setUsersList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  
  const createIcon = <FontAwesomeIcon icon={faUserPlus} />
  const editIcon = <FontAwesomeIcon icon={faUserPen} />
  const deleteIcon = <FontAwesomeIcon icon={faUserXmark} />

  useEffect(() => {
    setUsersList([...users])
  }, [users]);

  // create user button handler
  const createClickHandler = () => {
    setOpenModal(true);
    setCurrentIndex(null);
  }

  // edit user button handler
  const editClickHandler = (e) => {
    setOpenModal(true);
    const element = e.currentTarget.parentNode.parentNode;
    const elementIndex = element.attributes.getNamedItem('data-rowindex').value;
    setCurrentIndex(elementIndex);
  }

  // delete user button handler
  const deleteClickHandler = (e) => {
    const data = [...usersList]; 
    const element = e.currentTarget.parentNode.parentNode;
    const idx = element.attributes.getNamedItem('data-rowindex').value;
    data.splice(idx, 1);
    console.log(data);
    setUsersList(data);
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 50 },
    { field: 'name', headerName: 'NAME', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'EMAIL', flex: 1, minWidth: 150 },
    { field: 'gender', headerName: 'GENDER', flex: 1, minWidth: 50 },
    { field: 'status', headerName: 'STATUS', flex: 1, minWidth: 50 },
    { field: 'edit', headerName: 'ACTIONS', flex: 1, minWidth: 70, renderCell: (params) => 
      (<>
        <TableButton icon={editIcon} color={'primary'} clickHandler={editClickHandler}/>
        <TableButton icon={deleteIcon} color={'secondary'} clickHandler={deleteClickHandler}/>     
      </>)
    }
  ];

  return (
    <div className='user__table'>
      <NewUserButton icon={createIcon} clickHandler={createClickHandler}/>
      <ModalWindow 
        isOpen={openModal} 
        setOpen={setOpenModal} 
        userIndex={currentIndex}
        usersList={usersList}
        setUsersList={setUsersList} 
      />
      <DataGrid 
        autoHeight {...usersList}
        rows={usersList}
        columns={columns}
        pageSize={5}/>
    </div>
  )
}

export default UserTable;