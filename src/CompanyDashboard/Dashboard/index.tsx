import React, { useEffect } from 'react';
import BreadCrumb from 'CompanyDashboard/CompanyCommon/BreadCrumb';
import Widgets from './Widgets';
import WelcomeWidget from './WelcomeWidget';
import OrderStatistics from './OrderStatistics';
import SalesRevenue from './SalesRevenue';
import TrafficResources from './TrafficResources';
import ProductsOrders from './ProductsOrders';
// import CustomerService from './CustomerService';
import SalesMonth from './SalesMonth';
import TopSellingProducts from './TopSellingProducts';
import Audience from './Audience';
import { useNavigate } from 'react-router-dom';
import UpcomingScheduled from '../../MasterAdmin/Dashboard/UpcomingScheduled';
import { StackedColumns } from './StackedColumns';

const CompanyDashboard = () => {

    const navigate = useNavigate();
    useEffect(() => navigate("/company-dashboard"), [navigate]);

    return (
        <React.Fragment>
            <BreadCrumb title='Company Dashboard' pageTitle='Dashboards' />
            <div className="grid grid-cols-12 gap-x-5">
                <Widgets />
                {/* <UpcomingScheduled/> */}
                {/* <SalesMonth /> */}
                {/* <OrderStatistics /> */}
                {/* <WelcomeWidget /> */}
                {/* <SalesRevenue /> */}
                {/* <TrafficResources /> */}
                {/* <ProductsOrders /> */}
                {/* <CustomerService /> */}
                {/* <TopSellingProducts /> */}
                {/* <Audience /> */}
                {/* <StackedColumns/> */}
            </div>
        </React.Fragment>
    );
};

export default CompanyDashboard;
