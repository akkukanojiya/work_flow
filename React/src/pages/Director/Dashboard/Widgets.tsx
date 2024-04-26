import React from 'react';
import { BookOpenCheck, ListChecksIcon, ListPlus, Loader, MessageCircleOff, ShieldAlert, } from 'lucide-react';
import CountUp from 'react-countup';

const Widgets = () => {
    return (
        <React.Fragment>
            <div className="col-span-12 card md:col-span-6 lg:col-span-3 2xl:col-span-2">
                <div className="text-center card-body">
                    <div className="flex items-center justify-center mx-auto rounded-full size-14 bg-custom-100 text-custom-500 dark:bg-custom-500/20">
                        <ListChecksIcon/>
                    </div>
                    <h5 className="mt-4 mb-2">$
                        <CountUp end={236.18} decimals={2} className="counter-value" />
                        k</h5>
                    <p className="text-slate-500 dark:text-zink-200">Total Tasks</p>
                </div>
            </div>
            <div className="col-span-12 card md:col-span-6 lg:col-span-3 2xl:col-span-2">
                <div className="text-center card-body">
                    <div className="flex items-center justify-center mx-auto text-purple-500 bg-purple-100 rounded-full size-14 dark:bg-purple-500/20">
                        <BookOpenCheck/>
                    </div>
                    <h5 className="mt-4 mb-2"><CountUp end={13461} className="counter-value" /></h5>
                    <p className="text-slate-500 dark:text-zink-200"> Assigned  Tasks</p>
                </div>
            </div>
            <div className="col-span-12 card md:col-span-6 lg:col-span-3 2xl:col-span-2">
                <div className="text-center card-body">
                    <div className="flex items-center justify-center mx-auto text-green-500 bg-green-100 rounded-full size-14 dark:bg-green-500/20">
                        <ListPlus/>
                    </div>
                    <h5 className="mt-4 mb-2"><CountUp end={17150} className="counter-value" /></h5>
                    <p className="text-slate-500 dark:text-zink-200">New Tasks</p>
                </div>
            </div>
            <div className="col-span-12 card md:col-span-6 lg:col-span-3 2xl:col-span-2">
                <div className="text-center card-body">
                    <div className="flex items-center justify-center mx-auto text-red-500 bg-red-100 rounded-full size-14 dark:bg-red-500/20">
                        <MessageCircleOff/>
                    </div>
                    <h5 className="mt-4 mb-2"><CountUp end={3519} className="counter-value" /></h5>
                    <p className="text-slate-500 dark:text-zink-200">Close Tasks</p>
                </div>
            </div>
            <div className="col-span-12 card md:col-span-6 lg:col-span-3 2xl:col-span-2">
                <div className="text-center card-body">
                    <div className="flex items-center justify-center mx-auto text-yellow-500 bg-yellow-100 rounded-full size-14 dark:bg-red-500/20">
                    <ShieldAlert/>
                    </div>
                    <h5 className="mt-4 mb-2"><CountUp end={3519} className="counter-value" /></h5>
                    <p className="text-slate-500 dark:text-zink-200">Due Tasks</p>
                </div>
            </div>
            <div className="col-span-12 card md:col-span-6 lg:col-span-3 2xl:col-span-2">
                <div className="text-center card-body">
                    <div className="flex items-center justify-center mx-auto text-red-500 bg-red-100 rounded-full size-14 dark:bg-red-500/20">
                        <Loader/>
                    </div>
                    <h5 className="mt-4 mb-2"><CountUp end={3519} className="counter-value" /></h5>
                    <p className="text-slate-500 dark:text-zink-200">Panding Tasks</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Widgets;
