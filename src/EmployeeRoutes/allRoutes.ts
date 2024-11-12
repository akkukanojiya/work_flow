// MasterAdmin 
//  import MasterDashboard from "../Dashboard";
// import MasterDashboard from "MasterAdmin/Dashboard";
// import MasterCompany from "../Company/ListView";
// import MasterCompany from "MasterAdmin/Company/ListView";
import EmployeeDashboard from "EmployeeDashboard/Dashboard";
import ShowTasks from "EmployeeDashboard/ShowTask";
import TaskForm from "EmployeeDashboard/ShowTask/TaskForm";
import TaskTable from "EmployeeDashboard/ShowTask/TaskTable";
import Chat from "EmployeeDashboard/Discussion";
import Report from "EmployeeDashboard/Report";
// import Leave from "EmployeeDashboard/Leave/ListView";
import Leave from "EmployeeDashboard/Leave/AddLeaveEmployee";
import LeaveManageEmployee from "EmployeeDashboard/Leave/LeaveManageEmployee";




//   import Basic from "pages/AuthenticationInner/Login/Basic";
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


 
import EmployeeLogin from "EmployeeDashboard/Authentication/Login"
import EmployeeLogout from "EmployeeDashboard/Authentication/LogOut";
import EmployeeRegister from "EmployeeDashboard/Authentication/Register";
import EmployeeProfile from "EmployeeDashboard/Setting/Settings";


interface RouteObject {
  path: string;
  component: React.ComponentType<any>; // Use React.ComponentType to specify the type of the component
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/employee-dashboard", component: EmployeeDashboard },
  { path: "/employee-show-tasks", component: ShowTasks },
  // { path: "/employee-show-tasks", component: TaskForm },
  // { path: "/employee-show-tasks", component: TaskTable },
  { path: "/employee-chat", component: Chat },
  { path: "/employee-report", component: Report },
  { path: "/employee-leave", component: Leave },
  { path: "/employee-add-leave", component: LeaveManageEmployee },
  { path: "/employee-profile", component: EmployeeProfile },

   
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
  { path: "/employee-login", component: EmployeeLogin },
  { path: "/employee-logout", component: EmployeeLogout },
  { path: "/employee-register", component: EmployeeRegister },

]

export { authProtectedRoutes, publicRoutes };
