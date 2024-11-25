import React, { useEffect } from 'react';
import BreadCrumb from 'MasterAdmin/MasterCommon/BreadCrumb';
// import WelcomeWidget from './WelcomeWidget';
import Widgets from './Widgets';
import SalesMonth from './SalesMonth';
import UpcomingScheduled from './UpcomingScheduled';
import SalesRevenue from './SalesRevenue';
import { TotalProjectsChart } from './Charts';
import DefaultCalendar from './UpcomingScheduled';
import OrderStatistics from './OrderStatistics';
import TrafficResources from './TrafficResources';
import ProductsOrders from './ProductsOrders';
import CustomerService from './CustomerService';
import TopSellingProducts from './TopSellingProducts';
import { useNavigate } from 'react-router-dom';
import Audience from './Audience';



const MasterDashboard = () => {

    const navigate = useNavigate();
    useEffect(() => navigate("/master-dashboard"), [navigate]);

    return (
        <React.Fragment>
            <BreadCrumb title='Master Dashboard' pageTitle='Dashboards' />
            <div className="grid grid-cols-12 gap-x-5 ">
             
                <Widgets />
             
                 
                <UpcomingScheduled  />
                {/* <SalesMonth/> */}
                {/* <SalesRevenue /> */}

                 
                

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