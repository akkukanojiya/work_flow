import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "slices/thunk";
import { logoutUser } from "MasterAdmin/Masterslices/thunk";
import { Navigate } from "react-router-dom";
// import { RootState } from "slices";
import { RootState } from "MasterAdmin/Masterslices";
import { createSelector } from 'reselect';

interface selectLogoutState {
    isUserLogout: boolean;
}

const MasterLogout: React.FC = () => {

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

    return isUserLogout ? <Navigate to="/master-login" /> : null;
}

export default MasterLogout;
