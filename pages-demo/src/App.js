import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminMidTerm from './AdminMidTerm';
import AdminShortTerm from './AdminShortTerm';
import ClientOne from './ClientOne';
import ClientTwo from './ClientTwo';
import CustomMediumTerm from './components/CustomMediumTerm';
import CustomShortTerm from './components/CustomShortTerm';
import MediumTermInvestment from './components/MediumTermInvestment';
import ShortTermInvestment from './components/ShortTermInvestment';
import Home from './Home';
import STI from './STI';


function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>

          <Route exact path="/client/1" element={<ClientOne />} />
          <Route exact path="/client/2" element={<ClientTwo />} />
          <Route exact path="/dynmedium" element={<CustomMediumTerm />} />
          <Route exact path="/dynshort" element={<CustomShortTerm />} />

          {/* CLIENTS */}
          <Route exact path="/client/1/shortterm" element={<ShortTermInvestment />} />
          <Route exact path="/client/1/midterm" element={<MediumTermInvestment />} />

          {/* ADMIN */}
          <Route exact path="/admin/client/1/shortterm" element={<AdminShortTerm />} />
          <Route exact path="/admin/client/1/midterm" element={<AdminMidTerm />} />



          <Route exact path="/" element={<Home />} />

          <Route exact path="/shortterm" element={<STI />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
//dynmedium