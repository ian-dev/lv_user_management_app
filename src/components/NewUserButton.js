import { Button } from '@material-ui/core';

function NewUserButton({ icon, clickHandler }) {
  return (
      <Button size='large' color='secondary' variant='contained' onClick={clickHandler}>{icon}</Button>
  );
}

export default NewUserButton;