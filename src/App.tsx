import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Footer from './client/components/Footer';
import Header from './client/components/Header';
import DetailPage from './client/pages/DetailPage';
import OverviewPage from './client/pages/OverviewPage';

const App: React.FC = () => {
    return (
        <Router>
            <div className='app'>
                <Header />
                <main>
                    <Routes>
                        <Route path='/' element={<OverviewPage />} />
                        <Route path='/detail/:id' element={<DetailPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
