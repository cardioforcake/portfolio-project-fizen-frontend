import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import {ExitToApp} from '@material-ui/icons';

export default function LogoutButton({ logout }) {
  const history = useHistory();

  return (
    <IconButton
      variant="contained"
      color="primary"
      component="span"
      onClick={() => {
        history.push('/');
        logout();
      }}
    >
      <ExitToApp fontSize="large"/>
    </IconButton>
  );
}
