import React from 'react';
import { ClipboardPenLineIcon,  ListChecksIcon,  LayoutListIcon, StickyNoteIcon,ActivityIcon } from 'lucide-react';
import CountUp from 'react-countup';

const Widgets = () => {
    return (
        <React.Fragment>
            <div className="col-span-12 card md:col-span-6 lg:col-span-3 2xl:col-span-2">
                <div className="text-center card-body">
                    <div className="flex items-center justify-center mx-auto rounded-full size-14 bg-custom-100 text-custom-500 dark:bg-custom-500/20">
                        <StickyNoteIcon />
                    </div>
                    <h5 className="mt-4 mb-2">
                        <CountUp end={23618}  className="counter-value" />
                        </h5>
                    <p className="text-slate-500 dark:text-zink-200"> Today's Not Allocated Task  </p>
                </div>
            </div>
            <div className="col-span-12 card md:col-span-6 lg:col-span-3 2xl:col-span-2">
                <div className="text-center card-body">
                    <div className="flex items-center justify-center mx-auto text-purple-500 bg-purple-100 rounded-full size-14 dark:bg-purple-500/20">
                        <ClipboardPenLineIcon />
                    </div>
                    <h5 className="mt-4 mb-2"><CountUp end={13461} className="counter-value" /></h5>
                    <p className="text-slate-500 dark:text-zink-200">Today's Given Task</p>
                </div>
            </div>
            <div className="col-span-12 card md:col-span-6 lg:col-span-3 2xl:col-span-2">
                <div className="text-center card-body">
                    <div className="flex items-center justify-center mx-auto text-red-500 bg-red-100 rounded-full size-14 dark:bg-green-500/20">
                        <LayoutListIcon />
                    </div>
                    <h5 className="mt-4 mb-2"><CountUp end={17150} className="counter-value" /></h5>
                    <p className="text-slate-500 dark:text-zink-200">Today's Pending Task</p>
                </div>
            </div>
            <div className="col-span-12 card md:col-span-6 lg:col-span-3 2xl:col-span-2">
                <div className="text-center card-body">
                    <div className="flex items-center justify-center mx-auto  text-green-500 bg-green-100 rounded-full size-14 dark:bg-red-500/20">
                        <ListChecksIcon />
                    </div>
                    <h5 className="mt-4 mb-2"><CountUp end={3519} className="counter-value" /></h5>
                    <p className="text-slate-500 dark:text-zink-200">Today's Completed Task</p>
                </div>
            </div>
            <div className="col-span-12 card md:col-span-6 lg:col-span-3 2xl:col-span-2">
                <div className="text-center card-body">
                    <div className="flex items-center justify-center mx-auto  text-yellow-500 bg-yellow-100 rounded-full size-14 dark:bg-red-500/20">
                        <ActivityIcon />
                    </div>
                    <h5 className="mt-4 mb-2"><CountUp end={3519} className="counter-value" /></h5>
                    <p className="text-slate-500 dark:text-zink-200">Employee Present Count</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Widgets;
