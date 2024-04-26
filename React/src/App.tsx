
import './assets/scss/themes.scss';
import RouteIndex from 'Routes/Index';
 import MasterRouteIndex from 'MasterRoutes/Index';

import fakeBackend from "./helpers/AuthType/fakeBackend";
 import MasterfakeBackend from 'MasterAdmin/Masterhelpers/AuthType/fakeBackend';
import CompanyRouteIndex from 'CompanyRoutes/Index';
import CompanyfakeBackend from 'CompanyDashboard/Companyhelpers/AuthType/fakeBackend';
import EmployeeRouteIndex from 'EmployeeRoutes/Index';
import EmployeefakeBackend from 'EmployeeDashboard/Employeehelpers/AuthType/fakeBackend';
// Activating fake backend
fakeBackend();
MasterfakeBackend();
CompanyfakeBackend();
EmployeefakeBackend();
// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

function App() {
  return (
    <>
    <RouteIndex />
    <MasterRouteIndex/>
    <CompanyRouteIndex/>
    <EmployeeRouteIndex/>
  
    </>
  );
}

export default App;
