import './App.css';
import Modal from './components/Modal';
import React, { useState } from 'react';
import TaskManager from "./TaskManager";

function App() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="App">
      <h1>☺ Task Manager ☺</h1>

      <TaskManager />

      {showModal && (
        <Modal handleClose={() => setShowModal(false)}>
          <h2>Terms and Conditions</h2>
          <p>
            By using this application, you agree to comply with all applicable laws and regulations. The app is provided "as is" without any warranties, and we are not liable for any data loss or misuse. Users are responsible for their own content and must not engage in any harmful activities. We reserve the right to modify or discontinue services at any time. Continued use of the app constitutes acceptance of these terms.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default App;
