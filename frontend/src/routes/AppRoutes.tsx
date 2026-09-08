import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Projects from "../pages/Projects/Projects";
import Services from "../pages/Services/Services";
import Tools from "../pages/Tools/Tools";
import CaseStudies from "../pages/CaseStudies/CaseStudies";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="services" element={<Services />} />
        <Route path="tools" element={<Tools />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
