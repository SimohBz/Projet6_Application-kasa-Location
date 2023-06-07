
import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import "../style/Details.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

import NotFound from "./NotFound";

const Details = () => {
    let userId = useParams();
    const [location, setLocation] = useState([0]);

    const getData = async () => {
        const response = await fetch("../data.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const cards = await response.json();
        const location = cards.find((card) => card.id === userId.id);
        setLocation(location);
    };

    useEffect(() => {
        getData();
    },[]);

    if (!location) {
        return <NotFound />;
    }

    return (
        <>
            <Header />
            <Footer />
        </>
    );
};

export default Details