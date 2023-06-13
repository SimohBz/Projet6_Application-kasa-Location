
import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import "../style/Details.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Collapse from "../components/Collapse";
import Carousel from "../components/Carousel";
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
            <section className="carousel">
                <Carousel locationPictures={location?.pictures} />
            </section>
            <Footer />
            <section className="more-infos">
                <div className="collapse-info">
                    <Collapse
                        content={{
                            title: "Description",
                            reply: location?.description,
                        }}
                    />
                </div>
                <div className="collapse-info">
                    <Collapse
                        content={{
                            title: "Équipements",
                            equipments: location?.equipments,
                        }}
                    />
                </div>
            </section>
        </>
    );
};

export default Details