import { ThemeProvider } from './context/ThemeContext'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'

function App() {
  return (
    <ThemeProvider>
      <div className="relative">
        {/* Fixed top navigation */}
        <Navbar />

        {/* Main content — each section has its own scroll anchor id */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
