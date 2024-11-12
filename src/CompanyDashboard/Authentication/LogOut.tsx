import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "slices/thunk";
import { logoutUser } from "CompanyDashboard/Companyslices/thunk";
import { Navigate } from "react-router-dom";
// import { RootState } from "slices";
import { RootState } from "CompanyDashboard/Companyslices";
import { createSelector } from 'reselect';

interface selectLogoutState {
    isUserLogout: boolean;
}

const CompanyLogout: React.FC = () => {

    const dispatch = useDispatch<any>();

    const selectLogout = createSelector(
        (state: RootState) => state.Login as selectLogoutState,
        (login) => ({
            isUserLogout: login.isUserLogout
        })
    );

    const { isUserLogout } = useSelector(selectLogout);

    React.useEffect(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    return isUserLogout ? <Navigate to="/company-login" /> : null;
}

export default CompanyLogout;
