import React, { useEffect } from 'react';
import BreadCrumb from 'MasterAdmin/MasterCommon/BreadCrumb';
// import WelcomeWidget from './WelcomeWidget';
import Widgets from './Widgets';
import SalesRevenue from './SalesRevenue';
import SalesMonth from './SalesMonth';
import UpcomingScheduled from './UpcomingScheduled';
import DefaultCalendar from './UpcomingScheduled';
import OrderStatistics from './OrderStatistics';
import TrafficResources from './TrafficResources';
import ProductsOrders from './ProductsOrders';
import CustomerService from './CustomerService';
import TopSellingProducts from './TopSellingProducts';
import { useNavigate } from 'react-router-dom';
import Audience from './Audience';
import { TotalProjectsChart } from 'pages/ClientDashboard/HR/Charts';



const MasterDashboard = () => {

    const navigate = useNavigate();
    useEffect(() => navigate("/master-dashboard"), [navigate]);

    return (
        <React.Fragment>
            <BreadCrumb title='Master Dashboard' pageTitle='Dashboards' />
            <div className="grid grid-cols-12 gap-x-5 ">
                <Widgets />
                {/* <SalesRevenue /> */}
                {/* <SalesMonth/> */}
                <UpcomingScheduled  />
                 
             {/* <TotalProjectsChart/> */}
                {/* <OrderStatistics /> */}
                {/* <TrafficResources /> */}
                {/* <ProductsOrders /> */}
                {/* <CustomerService /> */}
                {/* <TopSellingProducts /> */}
                {/* <Audience /> */}
            </div>
        </React.Fragment>
    );
};

export default MasterDashboard;

{/* <WelcomeWidget /> */}