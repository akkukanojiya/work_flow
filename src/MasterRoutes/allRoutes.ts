// MasterAdmin 

import MasterDashboard from "MasterAdmin/Dashboard";
import MasterCompany from "MasterAdmin/Company/ListView";
import Countrys from "MasterAdmin/Country";
import States from "MasterAdmin/States/ListView";
import Citys from "MasterAdmin/City";
 import Services from "MasterAdmin/Services/ListView1";
import SubServices from "MasterAdmin/Services/ListView";
import FinancialYear from "MasterAdmin/FinancialYear";

import ChooseCompany from "MasterAdmin/Company/ChooseCompany";

 
import MasterLogin from "MasterAdmin/Authentication/Login";
import MasterLogout from "MasterAdmin/Authentication/LogOut";
import MasterRegister from "MasterAdmin/Authentication/Register";
// import MasterProfile from "pages/Pages/Settings";
import MasterProfile from "MasterAdmin/Setting/Settings";



interface RouteObject {
  path: string;
  component: React.ComponentType<any>; // Use React.ComponentType to specify the type of the component
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/", component: MasterDashboard },
  { path: "/master-dashboard", component: MasterDashboard },
  { path: "/master-admin-company", component: MasterCompany },
  { path: "/master-admin-country", component: Countrys },
  { path: "/master-admin-state", component: States },
  { path: "/master-admin-city", component: Citys },
  { path: "/master-admin-subservices", component: SubServices},
  { path: "/master-admin-services", component: Services},
  { path: "/master-financial-year", component: FinancialYear},
  { path: "/master-choose-company", component: ChooseCompany},
  { path: "/master-profile", component: MasterProfile },

   
];

const publicRoutes = [
  

  

  // // authentication
  { path: "/master-login", component: MasterLogin },
  { path: "/master-logout", component: MasterLogout },
  { path: "/master-register", component: MasterRegister },

]

export { authProtectedRoutes, publicRoutes };
