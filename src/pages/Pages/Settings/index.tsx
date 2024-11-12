import React from "react";
import BreadCrumb from "Common/BreadCrumb";
import AccountInfo from "../Account/AccountInfo";
import { Nav } from "Common/Components/Tab/Nav";
import Tab from "Common/Components/Tab/Tab";
import PersonalTabs from "./PersonalTabs";
import IntegrationTabs from "./IntegrationTabs";
import ChangePasswordTabs from "./ChangePasswordTabs";
import PrivacyPolicyTabs from "./PrivacyPolicyTabs";
import IndividualTab from "./Individual";
import ProprietorTab from "./Proprietor";
import PartnershipTab from "./Partnership";
import TrustAopTab from "./TrustAop";
import SocietyTab from "./Society";
const ClientProfile = () => {
    return (
        <React.Fragment>
            <BreadCrumb title='Personal Info' pageTitle='Info' />
            <Tab.Container defaultActiveKey="personalTabs">
                <div className="card">
                <AccountInfo className="card-body" />
                    <div className="card-body !py-0">
                        <Nav className="flex flex-wrap w-full text-sm font-medium text-center nav-tabs">
                            <Nav.Item eventKey="personalTabs" className="group">
                                <a href="#" data-tab-toggle data-target="personalTabs" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]">Company</a>
                            </Nav.Item>
                            <Nav.Item eventKey="IndividualTab" className="group">
                                <a href="#!" data-tab-toggle data-target="IndividualTab" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]">Individual</a>
                            </Nav.Item>
                            <Nav.Item eventKey="ProprietorTab" className="group">
                                <a href="#!" data-tab-toggle data-target="ProprietorTab " className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]">Proprietor</a>
                            </Nav.Item>
                            <Nav.Item eventKey="PartnershipTab" className="group">
                                <a href="#!!!" data-tab-toggle data-target="PartnershipTab" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]">Partnership</a>
                            </Nav.Item>
                            <Nav.Item eventKey="TrustAopTab" className="group">
                                <a href="#!!!!" data-tab-toggle data-target="TrustAopTab" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]">Trust/AOP</a>
                            </Nav.Item>
                            <Nav.Item eventKey="SocietyTab" className="group">
                                <a href="#!!!!!" data-tab-toggle data-target="SocietyTab" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]">Society</a>
                            </Nav.Item>
                            <Nav.Item eventKey="changePasswordTabs" className="group">
                                <a href="#!" data-tab-toggle data-target="changePasswordTabs" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]">Change Password</a>
                            </Nav.Item>
                            {/* <Nav.Item eventKey="privacyPolicyTabs" className="group">
                                <a href="#!" data-tab-toggle data-target="privacyPolicyTabs" className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]">Privacy Policy</a>
                            </Nav.Item> */}
                        </Nav>
                    </div>
                </div>
                
                <Tab.Content>
                    <Tab.Pane eventKey="personalTabs" >
                        <PersonalTabs />
                    </Tab.Pane>
                    <Tab.Pane eventKey="IndividualTab" >
                        <IndividualTab />
                    </Tab.Pane>
                    <Tab.Pane eventKey="ProprietorTab" >
                        <ProprietorTab/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="PartnershipTab" >
                        <PartnershipTab/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="TrustAopTab" >
                        <TrustAopTab/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="SocietyTab" >
                    <SocietyTab/>
                    </Tab.Pane>
                     
                    <Tab.Pane eventKey="changePasswordTabs" >
                        <ChangePasswordTabs />
                    </Tab.Pane>
                </Tab.Content>

            </Tab.Container>
        </React.Fragment>
    );
}

export default ClientProfile;