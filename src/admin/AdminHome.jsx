import React from "react";
import { Link } from 'react-router-dom';

function AdminHome () {
    return (
        <>
            <h1>Admin Home</h1>
            <br></br>
            <Link to="/admin/settings">Settings</Link>
        </>
    )
};
export default AdminHome