import React, { useEffect } from 'react';
import { useNotificationStore } from '../utils/useNotification';
import Loading from "../components/loading"
import { Link } from 'react-router-dom';

const NotificationPanel = ({state}) => {
  const { loading, notifications, getNotificationsById } = useNotificationStore();

  useEffect(() => {
    if(state){
          getNotificationsById();

    }
 
  }, [state]);

  // putting the state of open in dependency array whenever state chnages getNotificationsById  runs

  return (
    <section className={`${state ? " notification absolute top-25 z-50 right-10 block w-[300px] h-[310px] overflow-auto px-5 py-5 bg-primary-color dark:bg-dark-secondary-color rounded-xl transition-all duration-200 ease-in flex flex-col gap-2 " : "hidden"}`}>
      <h4 className = "pb-2">Notifications</h4>
      {loading && <Loading/>}
      {(notifications || []).map((notification) => (
        <Link to ={notification?.link} className = "relative bg-secondary-color dark:bg-dark-outlet-background-over rounded-2xl ">
          <div key={notification._id} className="px-4 py-5 border-b border-gray-300 dark:border-gray-700 flex flex-col gap-1 items-center dark:bg-dark-search-bar-bg rounded-2xl">

            {/* <span className = "font-poppins text-xs px-2 py-1 bg-tertiary-color dark:bg-dark-search-bar-bg w-max rounded-xl">{notification?.type}</span> */}
            <span className = "font-poppins text-xs">{notification?.message}</span>
              <span className = " absolute bottom-0 right-0 font-poppins text-end  text-xs px-3 py-1 ">{notification?.createdAt.slice(0,10)}</span>
           
          </div>
        </Link>
      ))}
      {!loading && (!notifications || notifications.length === 0) && <p className ="text-sm text-center h-full flex justify-center items-center">No notifications to show...</p>}
    </section>
  );
};

export default NotificationPanel;
