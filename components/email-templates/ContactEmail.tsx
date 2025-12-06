import * as React from 'react';

interface ContactEmailProps {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

export const ContactEmail: React.FC<ContactEmailProps> = ({
    name,
    email,
    phone,
    service,
    message,
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', color: '#333' }}>
        <h2 style={{ color: '#0F172A', borderBottom: '2px solid #EAB308', paddingBottom: '10px' }}>
            New Contact Inquiry
        </h2>

        <p style={{ fontSize: '16px', marginTop: '20px' }}>
            <strong>Service Interested:</strong> <span style={{ color: '#0F172A' }}>{service}</span>
        </p>

        <div style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '8px', marginTop: '20px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#0F172A' }}>User Details</h3>
            <p style={{ margin: '8px 0' }}><strong>Name:</strong> {name}</p>
            <p style={{ margin: '8px 0' }}><strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: '#EAB308' }}>{email}</a></p>
            <p style={{ margin: '8px 0' }}><strong>Phone:</strong> <a href={`tel:${phone}`} style={{ color: '#EAB308' }}>{phone}</a></p>
        </div>

        <div style={{ marginTop: '25px' }}>
            <h3 style={{ fontSize: '18px', color: '#0F172A' }}>Message:</h3>
            <div style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', border: '1px solid #E2E8F0', marginTop: '10px', whiteSpace: 'pre-wrap', color: '#475569' }}>
                {message}
            </div>
        </div>

        <div style={{ marginTop: '30px', borderTop: '1px solid #E2E8F0', paddingTop: '20px', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
            <p>© {new Date().getFullYear()} Prime UAE Services. All rights reserved.</p>
        </div>
    </div>
);
