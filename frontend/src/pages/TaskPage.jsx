import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Task from "../components/Task"
import { useSsessionStorage } from '../hooks/sessionstorage';




const Taskpage = () => {

    const loggedIn = useSsessionStorage("auth-token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            return navigate("/login")
        }

    }, [loggedIn]);

    return (
        <div>
            <Task />
        </div>
    );
}

export default Taskpage;
