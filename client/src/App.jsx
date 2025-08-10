import { useState } from 'react'
import './App.css'
import CreateEvent from './pages/CreateEvent'
import EventList from './pages/EventList'
import EventDetails from './pages/EventDetails'
import { Route, Routes } from 'react-router-dom'
import Message from './pages/Message'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/addEvent" element={<CreateEvent />} />
        <Route path="/viewEvent/:id" element={<EventDetails />} />
        <Route path="/message/:id" element={<Message />} />
      </Routes>
    </>
  )
}

export default App
