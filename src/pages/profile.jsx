import React from 'react';
import profileImg from '../assets/profileImg.jpg';

export const Profile = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10%', width: '100%', marginLeft:'50%'}}>
            <h1 style={{ textAlign: 'center' }}>Samet Berkay Taşkın</h1>
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                <img src={profileImg} style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} alt="BerakayTaşkın" />
            </div>
            <p style={{ textAlign: 'center' }}>İstanbul Gelişim Üniversitesinde bilgisayar mühendisliği öğrencisi.</p>
        </div>
    );
};
