// Companydashboard
 
import CompanyDashboard from "CompanyDashboard/Dashboard";
// import CompanyDirector from "CompanyDashboard/Director/ListView";
// import EmployeeListView from "CompanyDashboard/Employees/ListView";
import CompanyDirector from "CompanyDashboard/Director/ListView";
import EmployeeListView from "CompanyDashboard/Employees/ListView";
import AddNew from "CompanyDashboard/Director/AddNew";
import Overview from "CompanyDashboard/Director/Overview";
// import Client from "CompanyDashboard/Client";
import CompanyIndividualClient from "CompanyDashboard/CompanyClient/ClientCompany/ListView";
import CompanyClient from "CompanyDashboard/CompanyClient/ListView";
import CompanyFormIndividual from "CompanyDashboard/CompanyClient/ClientCompany/AddNew";
import AddLeaveCompany from "CompanyDashboard/CompanyManagment/Leaves Manage/AddLeaveEmployee";
import CompanyAttendance from "CompanyDashboard/CompanyManagment/Attendance/AttendanceHR";
// import Basic from "pages/AuthenticationInner/Login/Basic";
// import LoginCover from "pages/AuthenticationInner/Login/LoginCover";
// import LoginBoxed from "pages/AuthenticationInner/Login/LoginBoxed";
// import LoginModern from "pages/AuthenticationInner/Login/LoginModern";

// //Register
// import BasicRegister from "pages/AuthenticationInner/Register/Basic";
// import RegisterCover from "pages/AuthenticationInner/Register/RegisterCover";
// import RegisterBoxed from "pages/AuthenticationInner/Register/RegisterBoxed";
// import RegisterModern from "pages/AuthenticationInner/Register/RegisterModern";

// // Logout
// import BasicLogout from "pages/AuthenticationInner/Logout/Basic";
// import LogoutCover from "pages/AuthenticationInner/Logout/LogoutCover";
// import LogoutBoxed from "pages/AuthenticationInner/Logout/LogoutBoxed";
// import LogoutModern from "pages/AuthenticationInner/Logout/LogoutModern";


 
import Login from "CompanyDashboard/Authentication/Login";
import Logout from "CompanyDashboard/Authentication/Login";
import Register from "CompanyDashboard/Authentication/Login";



interface RouteObject {
  path: string;
  component: React.ComponentType<any>; // Use React.ComponentType to specify the type of the component
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/company-dashboard", component: CompanyDashboard },
  { path: "/company-director", component: CompanyDirector },
  { path: "/company-director-form", component: AddNew },
  { path: "/company-director-overview", component: Overview },
  
  { path: "/company-employee", component: EmployeeListView },
  { path: "/company-client-individual", component: CompanyIndividualClient },
  { path: "/company-formindividual-client", component: CompanyFormIndividual },
  { path: "/company-client-client", component: CompanyClient },

  { path: "/company-leave", component: AddLeaveCompany },
  { path: "/company-attendance", component: CompanyAttendance },


];

const publicRoutes = [
  

  // auth
  // { path: "/auth-login-basic", component: Basic },
  // { path: "/auth-login-cover", component: LoginCover },
  // { path: "/auth-login-boxed", component: LoginBoxed },
  // { path: "/auth-login-modern", component: LoginModern },

  // // Register
  // { path: "/auth-register-basic", component: BasicRegister },
  // { path: "/auth-register-cover", component: RegisterCover },
  // { path: "/auth-register-boxed", component: RegisterBoxed },
  // { path: "/auth-register-modern", component: RegisterModern },

  // // Verify Email
  // { path: "/auth-verify-email-basic", component: BasicEmailVerify },
  // { path: "/auth-verify-email-cover", component: EmailCover },
  // { path: "/auth-verify-email-modern", component: EmailModern },

  // // two steps
  // { path: "/auth-two-steps-basic", component: BasicTwoSteps },
  // { path: "/auth-two-steps-cover", component: TwoStepsCover },
  // { path: "/auth-two-steps-boxed", component: TwoStepsBoxed },
  // { path: "/auth-two-steps-modern", component: TwoStepsModern },

  // // logout
  // { path: "/auth-logout-basic", component: BasicLogout },
  // { path: "/auth-logout-cover", component: LogoutCover },
  // { path: "/auth-logout-boxed", component: LogoutBoxed },
  // { path: "/auth-logout-modern", component: LogoutModern },

  // //Reset Password
  // { path: "/auth-reset-password-basic", component: BasicResetPassword },
  // { path: "/auth-reset-password-cover", component: ResetPasswordCover },
  // { path: "/auth-reset-password-boxed", component: ResetPasswordBoxed },
  // { path: "/auth-reset-password-modern", component: ResetPasswordModern },

  // //Create Password
  // { path: "/auth-create-password-basic", component: BasicCreatePassword },
  // { path: "/auth-create-password-cover", component: CreatePasswordCover },
  // { path: "/auth-create-password-boxed", component: CreatePasswordBoxed },
  // { path: "/auth-create-password-modern", component: CreatePasswordModern },

  // // coming soon
  // { path: "/pages-coming-soon", component: ComingSoon },

  // // Error
  // { path: "/pages-offline", component: Offline },
  // { path: "/pages-404", component: Pages404 },

  // // Maintenance
  // { path: "/pages-maintenance", component: Maintenance },


  // // authentication
  { path: "/company-login", component: Login },
  { path: "/company-logout", component: Logout },
  { path: "/company-register", component: Register },

]

export { authProtectedRoutes, publicRoutes };
