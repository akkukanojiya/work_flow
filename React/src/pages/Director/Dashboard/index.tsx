import React, { useEffect } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
// import WelcomeWidget from './WelcomeWidget';
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
import ApplicationReceived from './ApplicationReceived';

import UpcomingScheduled from './UpcomingScheduled';

const Ecommerce = () => {

    const navigate = useNavigate();
    useEffect(() => navigate("/dashboard"), [navigate]);

    return (
        <React.Fragment>
            <BreadCrumb title=' Director Dashboard' pageTitle='Dashboards' />
            <div className="grid grid-cols-12 gap-x-3">
                {/* <WelcomeWidget /> */}
                <Widgets />
                <ApplicationReceived/>
                <div className='col-span-6 row-span-3  max-w-50'>
                <UpcomingScheduled/>

                </div>
                <div className='col-start-0 col-span-2 w-screen'>

                <TrafficResources />
                </div>
                {/* <OrderStatistics /> */}
                {/* <SalesRevenue /> */}
                {/* <ProductsOrders /> */}
                {/* <CustomerService /> */}
                {/* <SalesMonth /> */}
                {/* <TopSellingProducts /> */}
                {/* <Audience /> */}
            </div>
        </React.Fragment>
    );
};

export default Ecommerce;
