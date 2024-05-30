import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { authProtectedRoutes, publicRoutes } from './allRoutes';
// import Layout from 'Layout';
import Layout from 'MasterAdmin/MasterLayout';
// import NonAuthLayout from "Layout/NonLayout"
import NonAuthLayout from 'MasterAdmin/MasterLayout/NonLayout';


import AuthProtected from './AuthProtected';

const MasterRouteIndex = () => {
  return (
    <React.Fragment>
      <Routes>
        {authProtectedRoutes.map((route: any, idx: number) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <AuthProtected>
                <Layout>
                  <route.component />
                </Layout>
              </AuthProtected>
            }
          />
        ))}
        {publicRoutes.map((route: any, idx: number) => (
          <Route
            path={route.path}
            key={idx}
            element={
              <NonAuthLayout>
                <route.component />
              </NonAuthLayout>
            } />
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default MasterRouteIndex;
