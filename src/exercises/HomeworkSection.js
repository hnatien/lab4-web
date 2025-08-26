import React from 'react';

const HomeworkSection = () => {
  return (
    <div style={{ 
      marginBottom: '40px',
      padding: '20px',
      backgroundColor: '#e8f5e8',
      borderRadius: '8px',
      border: '2px solid #27ae60'
    }}>
      <h2 style={{ 
        color: '#27ae60', 
        borderBottom: '3px solid #27ae60', 
        paddingBottom: '10px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Lab 5: Homework Projects
      </h2>

      {/* Homework 1: E-commerce Product Listing */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '6px' }}>
        <h3 style={{ color: '#27ae60', marginBottom: '15px' }}>
          Homework 1: Simple E-commerce Product Listing (Capstone Project)
        </h3>
        <p style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '16px' }}>
          <strong>Objective:</strong> Build a comprehensive application that integrates multiple React concepts learned throughout the course.
        </p>
        <p style={{ color: '#7f8c8d', fontSize: '14px', marginBottom: '15px' }}>
          This capstone project integrates components, props, state, hooks, routing, forms, and context management, 
          providing a comprehensive practical application of React concepts.
        </p>
        <div style={{ marginTop: '20px' }}>
          <a 
            href="/homework" 
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#27ae60',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}
          >
            View E-commerce Project →
          </a>
        </div>
      </div>

      {/* Homework 3: User Authentication Frontend */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '6px' }}>
        <h3 style={{ color: '#27ae60', marginBottom: '15px' }}>
          Homework 3: User Authentication Frontend
        </h3>
        <p style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '16px' }}>
          <strong>Objective:</strong> Implement user authentication in the React frontend with protected routes and persistent login state.
        </p>
        
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#34495e', marginBottom: '10px' }}>Instructions:</h4>
          <ol style={{ color: '#7f8c8d', fontSize: '14px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Create authentication components:</strong>
              <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                <li>Login form</li>
                <li>Registration form</li>
                <li>User profile display</li>
              </ul>
            </li>
            <li style={{ marginBottom: '8px' }}>Implement authentication context using React Context API.</li>
            <li style={{ marginBottom: '8px' }}>Create protected routes that require authentication.</li>
            <li style={{ marginBottom: '8px' }}>Store JWT tokens securely and implement automatic logout on token expiration.</li>
            <li style={{ marginBottom: '8px' }}>Add navigation that changes based on authentication status.</li>
            <li style={{ marginBottom: '8px' }}>Implement form validation for registration and login.</li>
          </ol>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#34495e', marginBottom: '10px' }}>Expected Output:</h4>
          <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
            A complete authentication system where users can register, login, and access protected content.
          </p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#34495e', marginBottom: '10px' }}>Hints:</h4>
          <ul style={{ color: '#7f8c8d', fontSize: '14px', paddingLeft: '20px' }}>
            <li>Use React Router for navigation and protected routes.</li>
            <li>Store tokens in localStorage but validate them on app startup.</li>
            <li>Implement automatic token refresh if your backend supports it.</li>
          </ul>
        </div>
      </div>

      {/* Homework 4: Real-time Chat with Socket.io */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '6px' }}>
        <h3 style={{ color: '#27ae60', marginBottom: '15px' }}>
          Homework 4: Real-time Chat with Socket.io
        </h3>
        <p style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '16px' }}>
          <strong>Objective:</strong> Add real-time functionality to a MERN application using Socket.io for instant messaging.
        </p>
        
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#34495e', marginBottom: '10px' }}>Instructions:</h4>
          
          <div style={{ marginBottom: '15px' }}>
            <h5 style={{ color: '#34495e', marginBottom: '8px' }}>1. Backend Setup:</h5>
            <ul style={{ color: '#7f8c8d', fontSize: '14px', paddingLeft: '20px' }}>
              <li>Install and configure Socket.io with Express.js.</li>
              <li>Create a Message schema with fields: content, sender (user reference), room, timestamp.</li>
              <li>Implement socket event handlers for joining rooms, sending messages, and user presence.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h5 style={{ color: '#34495e', marginBottom: '8px' }}>2. Real-time Features:</h5>
            <ul style={{ color: '#7f8c8d', fontSize: '14px', paddingLeft: '20px' }}>
              <li>Implement user authentication for socket connections.</li>
              <li>Create chat rooms or direct messaging functionality.</li>
              <li>Add typing indicators and online user status.</li>
              <li>Store message history in MongoDB.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h5 style={{ color: '#34495e', marginBottom: '8px' }}>3. Frontend Implementation:</h5>
            <ul style={{ color: '#7f8c8d', fontSize: '14px', paddingLeft: '20px' }}>
              <li>Install Socket.io client and create connection management.</li>
              <li>Build chat interface with message display and input.</li>
              <li>Implement real-time message updates and notifications.</li>
              <li>Add emoji support and message formatting.</li>
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#34495e', marginBottom: '10px' }}>Expected Output:</h4>
          <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
            A real-time chat application integrated into the MERN stack with persistent message storage.
          </p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#34495e', marginBottom: '10px' }}>Hints:</h4>
          <ul style={{ color: '#7f8c8d', fontSize: '14px', paddingLeft: '20px' }}>
            <li>Authenticate socket connections using JWT tokens.</li>
            <li>Implement rate limiting to prevent spam.</li>
            <li>Consider implementing message encryption for security.</li>
          </ul>
        </div>
      </div>

      {/* Homework 5: MERN E-commerce Platform */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '6px' }}>
        <h3 style={{ color: '#27ae60', marginBottom: '15px' }}>
          Homework 5: MERN E-commerce Platform
        </h3>
        <p style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '16px' }}>
          <strong>Objective:</strong> Build a comprehensive e-commerce platform with product management, shopping cart, and order processing.
        </p>
        
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#34495e', marginBottom: '10px' }}>Instructions:</h4>
          
          <div style={{ marginBottom: '15px' }}>
            <h5 style={{ color: '#34495e', marginBottom: '8px' }}>1. Database Design:</h5>
            <ul style={{ color: '#7f8c8d', fontSize: '14px', paddingLeft: '20px' }}>
              <li>Create schemas for Product, Category, Cart, Order, and OrderItem.</li>
              <li>Implement product variants (size, color) and inventory management.</li>
              <li>Design user address and payment information storage.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h5 style={{ color: '#34495e', marginBottom: '8px' }}>2. Backend API:</h5>
            <ul style={{ color: '#7f8c8d', fontSize: '14px', paddingLeft: '20px' }}>
              <li>Implement product catalog with search, filtering, and pagination.</li>
              <li>Create shopping cart functionality with session management.</li>
              <li>Build order processing workflow with status tracking.</li>
              <li>Add admin endpoints for product and order management.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h5 style={{ color: '#34495e', marginBottom: '8px' }}>3. Frontend Development:</h5>
            <ul style={{ color: '#7f8c8d', fontSize: '14px', paddingLeft: '20px' }}>
              <li>Create product listing and detail pages with image galleries.</li>
              <li>Implement shopping cart with quantity management.</li>
              <li>Build checkout process with form validation.</li>
              <li>Create user dashboard for order history and profile management.</li>
              <li>Develop admin panel for product and order management.</li>
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#34495e', marginBottom: '10px' }}>Expected Output:</h4>
          <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
            A fully functional e-commerce platform with complete shopping and administrative functionality.
          </p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#34495e', marginBottom: '10px' }}>Hints:</h4>
          <ul style={{ color: '#7f8c8d', fontSize: '14px', paddingLeft: '20px' }}>
            <li>Implement proper inventory management to prevent overselling.</li>
            <li>Use transactions for order processing to ensure data consistency.</li>
            <li>Consider implementing payment gateway integration (Stripe, PayPal)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeworkSection;
