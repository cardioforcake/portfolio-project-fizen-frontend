import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function LogoutButton({ logout }) {
  const history = useHistory();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        history.push('/');
        logout();
      }}
    >
      Logout
    </Button>
  );
}
