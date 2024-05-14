import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Carousel from 'react-bootstrap/Carousel';
import vendor1 from '../../assets/vendor/vendor1.png';
import vendor2 from '../../assets/vendor/vendor2.jpg';
import vendor3 from '../../assets/vendor/vendor3.jpg';
import Header from '../Dashboard/Header';
import './ShopPage.css';

interface StateType {
    businessName: string;
    description: string;
    price: string;
    location: string;
    eventType: string;
    service: string;
}

function ShopPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as StateType | undefined;


    const [service, setService] = useState(state?.service || '');
    const [venueType, setVenueType] = useState('');
    const [headCount, setHeadCount] = useState('');
    const [businessName, setBusinessName] = useState(state?.businessName || '');
    const [description, setDescription] = useState(state?.description || '');
    const [price, setPrice] = useState(state?.price || '');
    const [locationState, setLocationState] = useState(state?.location || '');
    const [eventType, setEventType] = useState(state?.eventType || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/vendorServices', {
            state: { businessName, description, price, location: locationState, eventType, service },
        });
    };

    const SlidingPanel: React.FC = () => (
        <Carousel data-bs-theme="dark" style={{ height: '500px', overflow: 'hidden', marginTop: '60px' }}>
            <Carousel.Item>
                <img
                    style={{ height: '500px', objectFit: 'cover' }}
                    className="d-block w-100"
                    src={vendor1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{ height: '500px', objectFit: 'cover' }}
                    className="d-block w-100"
                    src={vendor2}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{ height: '500px', objectFit: 'cover' }}
                    className="d-block w-100"
                    src={vendor3}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );

    return (
        <>
            <Header toggleSideBar={function (): void {
                throw new Error('Function not implemented.');
            }} />
            <SlidingPanel />
            <div className="google-form-container">
                <h1 className="google-form-title">Create Your First Service</h1>
                <form className="google-form" onSubmit={handleSubmit}>
                    <label className="google-form-label" htmlFor="service">
                        Select Your Service:
                    </label>
                    <select
                        className="google-form-input"
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                    >
                        <option value="">Choose...</option>
                        <option value="Venue">Venue</option>
                        <option value="Catering">Catering</option>
                        <option value="Decorations">Decorations</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                    {service === 'Venue' && (
                        <>
                            <label className="google-form-label" htmlFor="headCount">
                                Head Count:
                            </label>
                            <select
                                className="google-form-input"
                                id="headCount"
                                value={headCount}
                                onChange={(e) => setHeadCount(e.target.value)}
                            >
                                <option value="">Choose...</option>
                                <option value="<50">&lt;50</option>
                                <option value="<100">&lt;100</option>
                                <option value=">100">&gt;100</option>
                            </select>
                            <label className="google-form-label" htmlFor="venueType">
                                Venue Type:
                            </label>
                            <select
                                className="google-form-input"
                                id="venueType"
                                value={venueType}
                                onChange={(e) => setVenueType(e.target.value)}
                            >
                                <option value="">Choose...</option>
                                <option value="Indoor">Indoor</option>
                                <option value="Outdoor">Outdoor</option>
                            </select>
                        </>
                    )}
                    <label className="google-form-label" htmlFor="businessName">
                        Name of Your Business:
                    </label>
                    <input
                        className="google-form-input"
                        type="text"
                        id="businessName"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                    />
                    <label className="google-form-label" htmlFor="description">
                        Description:
                    </label>
                    <input
                        className="google-form-input"
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label className="google-form-label" htmlFor="price">
                        Price:
                    </label>
                    <input
                        className="google-form-input"
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label className="google-form-label" htmlFor="location">
                        Location:
                    </label>
                    <input
                        className="google-form-input"
                        type="text"
                        id="location"
                        value={locationState}
                        onChange={(e) => setLocationState(e.target.value)}
                    />
                    <label className="google-form-label" htmlFor="eventType">
                        Event Type:
                    </label>
                    <select
                        className="google-form-input"
                        id="eventType"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                    >
                        <option value="">Choose...</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Conference">Conference</option>
                        <option value="Others">Others</option>
                    </select>
                    <button
                        className="google-form-submit"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default ShopPage;
