import React from 'react';
import profileImg from '../assets/profileImg.jpg';

export const Profile = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '25%' }}>
            <h1 style={{ textAlign: 'center' }}>Samet Berkay Taşkın</h1>
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                <img src={profileImg} style={{ maxWidth: '100%', height: 'auto' }} alt="Profile" />
            </div>
            <p>İstanbul Gelişim Üniversitesinde bilgisayar mühendisliği öğrencisi.</p>
        </div>
    );
};
