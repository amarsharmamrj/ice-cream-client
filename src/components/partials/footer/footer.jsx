 import React from 'react';

 const Footer = () => { 
    const footerStyle = {
        // position: 'fixed',
        // bottom: 0,
        // right: 0,
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#ebebeb'
    }
    
     return (
         <footer style={footerStyle}>
             <h4 style={{margin: '10px 0'}}>Shimla Ice-Cream: Copyright@2022</h4>
         </footer>
     )
 }

 export default Footer;