import React from 'react'

const About = () => {
  return (
<div className="about-page" style={{ padding: '2rem' }}>
      <h1>About NotesNest</h1>
      <p>
        <strong>NotesNest</strong> is a lightweight, user-friendly note-taking web app designed to help
        you capture and organize your thoughts effortlessly.
      </p>

      <h2>🚀 Features</h2>
      <ul>
        <li>Create notes with a title and content</li>
        <li>Quickly access your notes from the sidebar</li>
        <li>Secure login flow (mock or real auth supported)</li>
        <li>Responsive and fast with React and Vite</li>
      </ul>

      <h2>🔮 Upcoming Features</h2>
      <ul>
        <li>Persistent storage with backend integration</li>
        <li>Search and filter notes</li>
        <li>Dark mode and theming options</li>
        <li>Markdown support</li>
      </ul>

      <p>
        NotesNest is built with 💙 by <strong>Yuvraj Tayal</strong> to learn and demonstrate fullstack web development.
      </p>
    </div>
  )
}

export default About
