import React, { useEffect } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Widgets from './Widgets';
import LocationBased from './LocationBased';
import Interaction from './Interaction';
import UserDevice from './UserDevice';
import Satisfaction from './Satisfaction';
import DailyVisit from './DailyVisit';
import Reports from './Reports';
import MonthlyCampaign from './MonthlyCampaign';
import Subscription from './Subscription';
import TrafficSource from './TrafficSource';
import ProductsStatistics from './ProductsStatistics';
  import { useNavigate } from 'react-router-dom';
import DefaultCalendar from 'pages/Calendar/Default';

const Analytics = () => {
  const navigate = useNavigate();
  useEffect(() => navigate("/dashboard"), [navigate]);
  return (
    <React.Fragment>
      <BreadCrumb title='Analytics' pageTitle='Dashboards' />
      <div className="grid grid-cols-12 gap-x-5">
        <Widgets />
        <LocationBased />
        <Interaction />
        <UserDevice />
        <Satisfaction />
        <DailyVisit />
        <ProductsStatistics />
        <Reports />
        <MonthlyCampaign />
        <Subscription />
        <TrafficSource />
        <DefaultCalendar/>
      </div>
    </React.Fragment>
  );
};

export default Analytics;
