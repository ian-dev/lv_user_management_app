import { Button } from '@material-ui/core';

function TableButton({ icon, color, clickHandler }) {
  return (
    <Button color={color} onClick={clickHandler}>{icon}</Button>
  );
}

export default TableButton;