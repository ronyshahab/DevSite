import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getData from '../../commonFunction/getDataFromAxios';
import { setCurrentUser } from '../../redux/slices/CurrentUser.slice';

const LoggedInUser = ({ children }) => {
    const profileData = useSelector((s) => s.currentUser);
    const dispatch = useDispatch()

    const fetchData = async () => {
        try {
          const data = await getData("get", "/profile/me");
          dispatch(setCurrentUser(data.data))
        } catch (error) {
          console.error(error);
        }
      };  
      useEffect(() => {
        if(Object.keys(profileData).length <= 0){
          fetchData();
        }
    
      }, [profileData]);

  return <div>{children}</div>;
};

export default LoggedInUser;
