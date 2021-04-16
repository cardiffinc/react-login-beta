import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useUser = props => {
  const currentUser = JSON.parse(localStorage.getItem('currentDarthUser'));
  
  const history = useHistory();
  useEffect(() => {
    if (currentUser) {
       history.push('/')
    }
  }, [currentUser]);

  if(currentUser === null) return {};
  else return currentUser;
};

export default useUser; 