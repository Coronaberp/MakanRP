import './App.css';
import logo from './logo.png';
import { Routes, Route, NavLink } from 'react-router-dom';
import Docs from './pages/Docs';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import pfp_j from './pfp_j.png';
import pfp_r from './pfp_r.png';
import pfp_l from './pfp_l.png';
import pfp_h from './pfp_h.png';

function HomeContent() {
    return (
        <>
            <main className="content">
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">Your AI-Powered Campus Dining Assistant</h1>
                        <p className="hero-subtitle">
                            Find the perfect meal at Republic Polytechnic in seconds. Smart recommendations based on your location, budget, and preferences.
                        </p>
                        <div className="hero-buttons">
                            <NavLink to="/chat" className="cta-button primary">Get Started</NavLink>
                            <NavLink to="/docs" className="cta-button secondary">Learn More</NavLink>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="image-placeholder">
                            <span className="placeholder-icon">🍜</span>
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <h2 className="section-title">Why use Snackii to aid your dining decisions in RP?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3 className="feature-title">Fast Decisions</h3>
                            <p className="feature-description">Get instant meal suggestions even during tight breaks between classes. No more wasting time deciding what to eat.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3 className="feature-title">Smart Recommendations</h3>
                            <p className="feature-description">AI-powered suggestions based on your location, budget, dietary needs, and stall availability.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📍</div>
                            <h3 className="feature-title">Location-Aware</h3>
                            <p className="feature-description">Find nearby food options close to your current class location to maximize your break time.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💰</div>
                            <h3 className="feature-title">Budget-Friendly</h3>
                            <p className="feature-description">Filter options by price range and discover affordable meals that fit your student budget.</p>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <div className="about-content">
                        <h2 className="section-title">About Makan@RP</h2>
                        <p className="about-text">Makan@RP is an AI-powered campus dining assistant designed to help Republic Polytechnic students and staff decide what and where to eat quickly, even during short breaks between back-to-back lessons.</p>
                        <p className="about-text">By combining campus-specific food information with intelligent recommendations, it reduces the time spent on indecision and helps users discover suitable options based on location, budget, and dietary needs.</p>
                        <p className="about-text">The project focuses on the real challenges faced on campus: tight timetables, crowded canteens, and an overwhelming variety of food choices. Makan@RP aims to ease this daily pain point by offering personalised suggestions that consider proximity to classes, available stalls, and user preferences.</p>
                    </div>
                    <div className="about-image">
                        <div className="image-placeholder">
                            <span className="placeholder-icon">👥</span>
                        </div>
                    </div>
                </section>

                <section className="team-section">
                    <h2 className="section-title">Meet the Team</h2>
                    <p className="team-intro">Behind Makan@RP is a diverse student team from Republic Polytechnic's school of Infocomm, with each member taking on a clear role in solution design, communication, media, and quality assurance.</p>
                    <div className="team-values">
                        <div className="profile-card">
                            <div className="profile-avatar">
                                <img src={pfp_j} alt="JM" className="profile-image" />
                            </div>
                            <div className="profile-info">
                                <h4 className="profile-name">Jason</h4>
                                <div className="profile-role">Solutions Lead</div>
                                <div className="profile-subrole">Project Captain/Steward</div>
                                <p className="profile-bio">Orchestrate the vision and strategy, to align stakeholder needs with technical execution and team coordination.</p>
                            </div>
                        </div>

                        <div className="profile-card">
                            <div className="profile-avatar">
                                <img src={pfp_r} alt="R" className="profile-image" />
                            </div>
                            <div className="profile-info">
                                <h4 className="profile-name">Rhithikka</h4>
                                <div className="profile-role">Comms Lead</div>
                                <div className="profile-subrole">Project Timekeeper</div>
                                <p className="profile-bio">Drive internal and external communications, ensuring project milestones stay on track.</p>
                            </div>
                        </div>

                        <div className="profile-card">
                            <div className="profile-avatar">
                                 <img src={pfp_l} alt="LJ" className="profile-image" />
                            </div>
                            <div className="profile-info">
                                <h4 className="profile-name">Long Jian</h4>
                                <div className="profile-role">QA Lead</div>
                                <div className="profile-subrole">Project Member</div>
                                <p className="profile-bio">Validate system performance and maintains quality standards across the platform.</p>
                            </div>
                        </div>

                        <div className="profile-card">
                            <div className="profile-avatar">
                                 <img src={pfp_h} alt="H" className="profile-image" />
                            </div>
                            <div className="profile-info">
                                <h4 className="profile-name">Hakim</h4>
                                <div className="profile-role">Media Lead</div>
                                <div className="profile-subrole">Project Member</div>
                                <p className="profile-bio">Create compelling visual and multimedia content that enhances user engagement and brand storytelling.</p>     
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default function MakanRP() {
    return (
        <div className="App">
            <header className="header">
                <div className="logo-container">
                    <div className="logo">
                        <img src={logo} alt="Snackii Logo" />
                    </div>
                    <div className="brand">
                        <span className="brand-name">Snackii</span>
                        <span className="brand-subtext">A project by Makan@RP</span>
                    </div>
                </div>
                <nav className="nav-left">
                            <NavLink to="/" className={({isActive}) => isActive ? 'nav-button active' : 'nav-button'}>About us</NavLink>
                            <NavLink to="/docs" className={({isActive}) => isActive ? 'nav-button active' : 'nav-button'}>Docs</NavLink>
                            <NavLink to="/chat" className={({isActive}) => isActive ? 'nav-button active' : 'nav-button'}>Chat</NavLink>
                            <NavLink to="/contact" className={({isActive}) => isActive ? 'nav-button active' : 'nav-button'}>Contact</NavLink>
                        </nav>
                        <div className="nav-right" />
            </header>

            <Routes>
                <Route path="/docs" element={<Docs />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/contact" element={<Contact />} />
                
                <Route path="/" element={<HomeContent />} />
            </Routes>

            <footer className="footer">
                <p>© 2026 Makan@RP - Republic Polytechnic | School of Infocomm</p>
            </footer>
        </div>
    );
}
