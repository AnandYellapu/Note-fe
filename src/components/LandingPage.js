// // LandingPage.js

// import React from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   return (
//     <div className="landing-page-container">
//       <header className="landing-page-header">
//         <h1 className="landing-page-title">Welcome to Note Maker</h1>
//       </header>

//       <section className="landing-page-content">
//         <p className="landing-page-paragraph">
//           Note Maker is your go-to platform for creating and managing notes effortlessly. Whether you're organizing your thoughts, jotting down ideas, or keeping track of tasks, Note Maker has got you covered.
//         </p>

//         <p className="landing-page-paragraph">
//           Create, edit, and organize your notes seamlessly. Stay productive and never miss a detail with our intuitive note-taking interface.
//         </p>

//         <p className="landing-page-paragraph">
//           Ready to get started? Click the button below to begin making your notes.
//         </p>

//         <Link to="/tasklist" className="get-started-button">
//           Get Started
//         </Link>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;






// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BiSolidNotepad } from 'react-icons/bi';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <header className="landing-page-header">
        <BiSolidNotepad className="landing--logo" />
        <h1 className="landing--title">Note Maker</h1>
      </header>

      <section className="landing-page-content">
        <p className="landing-page-paragraph">
          Note Maker is your go-to platform for creating and managing notes effortlessly. Whether you're organizing your thoughts, jotting down ideas, or keeping track of tasks, Note Maker has got you covered.
        </p>
        <p className="landing-page-paragraph">
          Create, edit, and organize your notes seamlessly. Stay productive and never miss a detail with our intuitive note-taking interface.
        </p>
        <p className="landing-page-paragraph">
          Ready to get started? Click the button below to begin making your notes.
        </p>
        <Link to="/tasklist" className="get-started-button">
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
