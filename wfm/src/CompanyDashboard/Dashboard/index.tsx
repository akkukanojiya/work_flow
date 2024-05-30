import React, { useEffect } from 'react';
import BreadCrumb from 'CompanyDashboard/CompanyCommon/BreadCrumb';
import WelcomeWidget from './WelcomeWidget';
import OrderStatistics from './OrderStatistics';
import Widgets from './Widgets';
import SalesRevenue from './SalesRevenue';
import TrafficResources from './TrafficResources';
import ProductsOrders from './ProductsOrders';
import CustomerService from './CustomerService';
import SalesMonth from './SalesMonth';
import TopSellingProducts from './TopSellingProducts';
import Audience from './Audience';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {

    const navigate = useNavigate();
    useEffect(() => navigate("/company-dashboard"), [navigate]);

    return (
        <React.Fragment>
            <BreadCrumb title='Company Dashboard' pageTitle='Dashboards' />
            <div className="grid grid-cols-12 gap-x-5">
                {/* <WelcomeWidget /> */}
                <Widgets />
                <OrderStatistics />
                <SalesRevenue />
                <TrafficResources />
                <ProductsOrders />
                <CustomerService />
                <SalesMonth />
                <TopSellingProducts />
                <Audience />
            </div>
        </React.Fragment>
    );
};

export default CompanyDashboard;
