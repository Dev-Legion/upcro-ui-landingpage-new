import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Articles from '../pages/Articles';
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';




const AppRoutes = () => {
  return (
    <>
      {/* <DAppProvider config={{}}> */}
      <Routes>
        {/* {window.location.host.split('.')[0] === 'app' ? (
          <Route path='/' element={<AppPage />} />
        ) : (
          <Route path='/' element={<HomePage />} />
        )} */}
        <Route path='/' element={<HomePage />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/dashboard' element={<Dashboard />} />
        

       
      </Routes>
     
    </>
  );
};

export default AppRoutes;
