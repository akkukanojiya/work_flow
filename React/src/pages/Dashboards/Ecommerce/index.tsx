import React from 'react';
import BreadCrumb from 'Common/BreadCrumb';
// import WelcomeWidget from './WelcomeWidget';
// import OrderStatistics from './OrderStatistics';
import Widgets from './Widgets';
import UpcomingScheduled from './UpcomingScheduled';
import ApplicationReceived from './ApplicationReceived';
// import SalesRevenue from './SalesRevenue';
import TrafficResources from './TrafficResources';
// import ProductsOrders from './ProductsOrders';
// import CustomerService from './CustomerService';
// import SalesMonth from './SalesMonth';
// import TopSellingProducts from './TopSellingProducts';
// import Audience from './Audience';
// import { useNavigate } from 'react-router-dom';

const Ecommerce = () => {

    // const navigate = useNavigate();
    // useEffect(() => navigate("/dashboard"), [navigate]);

    return (
        <React.Fragment>
            <BreadCrumb title='Dashboard' pageTitle='Dashboards'  />
            <div className="grid grid-cols-12  gap-x-5 ">
                <Widgets />
                <ApplicationReceived/>
                <UpcomingScheduled/>
                <TrafficResources />
                {/* <WelcomeWidget /> */}
                {/* <ProductsOrders /> */}
                {/* <OrderStatistics /> */}
                {/* <SalesRevenue /> */}
                {/* <TopSellingProducts /> */}
                {/* <Audience /> */}
                {/* <SalesMonth /> */}
                {/* <CustomerService /> */}
            </div>
        </React.Fragment>
    );
};

export default Ecommerce;
