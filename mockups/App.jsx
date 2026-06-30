import React, { useState, useEffect } from "react";
import FundacionPRO21Home, { Navbar, SiteFooter, WhatsApp } from "./FundacionPRO21_Home_v2";
import ColaboraPage from "./FundacionPRO21_Colabora";
import BlogPostPage from "./FundacionPRO21_BlogPost";
import AdminPage from "./FundacionPRO21_Admin";
import NosotrosPage from "./FundacionPRO21_Nosotros";
import ProgramasPage from "./FundacionPRO21_Programas";
import ImpactoPage from "./FundacionPRO21_Impacto";
import ContactoPage from "./FundacionPRO21_Contacto";
import BlogPage from "./FundacionPRO21_Blog";
import EquipoPage from "./FundacionPRO21_Equipo";
import AulaWawitasPage from "./FundacionPRO21_AulaWawitas";
import EscuelitaDownPage from "./FundacionPRO21_EscuelitaDown";
import PasosFirmesPage from "./FundacionPRO21_PasosFirmes";
import ParaFamiliasPage from "./FundacionPRO21_ParaFamilias";

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Normalize hash route
  const rawPath = currentHash.replace("#", "").toLowerCase().trim();
  const path = rawPath.split("?")[0]; // remove query params if any

  // Scroll to section when switching to Home or on hash change
  useEffect(() => {
    if (path) {
      // Small timeout to allow the DOM to render the new component first
      const timer = setTimeout(() => {
        const element = document.getElementById(rawPath);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentHash, path, rawPath]);

  // Route resolver
  let PageComponent = FundacionPRO21Home;
  let isHome = true;
  let is404 = false;

  switch (path) {
    case "":
    case "/":
    case "inicio":
      PageComponent = FundacionPRO21Home;
      isHome = true;
      break;
    case "colabora":
      PageComponent = ColaboraPage;
      isHome = false;
      break;
    case "blog-post":
    case "post":
      PageComponent = BlogPostPage;
      isHome = true; // BlogPost tiene su propio nav strip
      break;
    case "admin":
    case "cms":
      PageComponent = AdminPage;
      isHome = true; // Admin tiene su propio layout completo
      break;
    case "nosotros":
      PageComponent = NosotrosPage;
      isHome = false;
      break;
    case "programas":
      PageComponent = ProgramasPage;
      isHome = false;
      break;
    case "impacto":
      PageComponent = ImpactoPage;
      isHome = false;
      break;
    case "contacto":
      PageComponent = ContactoPage;
      isHome = false;
      break;
    case "blog":
      PageComponent = BlogPage;
      isHome = false;
      break;
    case "equipo":
      PageComponent = EquipoPage;
      isHome = false;
      break;
    case "aula-wawitas":
    case "wawitas":
      PageComponent = AulaWawitasPage;
      isHome = false;
      break;
    case "escuelita-down":
    case "escuelita":
      PageComponent = EscuelitaDownPage;
      isHome = false;
      break;
    case "pasos-firmes":
    case "pasos":
      PageComponent = PasosFirmesPage;
      isHome = false;
      break;
    case "para-familias":
    case "familias":
      PageComponent = ParaFamiliasPage;
      isHome = false;
      break;
    default:
      // Check if it's a section on the home page (e.g. #contacto)
      const homeSections = ["contacto", "programas", "inicio"];
      if (homeSections.includes(path)) {
        PageComponent = FundacionPRO21Home;
        isHome = true;
      } else {
        is404 = true;
        isHome = false;
      }
      break;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Dynamic font stylesheet and resets */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #ffffff; color: #1a1a2e; overflow-x: hidden; }
      `}</style>

      {/* Navbar incluye la barra de accesibilidad integrada */}
      {!isHome && !is404 && <Navbar />}

      {/* Main page content area */}
      <main style={{ flex: 1, paddingTop: !isHome && !is404 ? "108px" : "0px" }}>
        {is404 ? (
          <NotFoundPage />
        ) : (
          <PageComponent />
        )}
      </main>

      {/* Render shared SiteFooter and WhatsApp only on non-home pages (Home renders them internally) */}
      {!isHome && !is404 && (
        <>
          <SiteFooter />
          <WhatsApp />
        </>
      )}
    </div>
  );
}

/* ═══ BEAUTIFUL fallback 404 PAGE ═══ */
function NotFoundPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      background: "linear-gradient(155deg, #0c2340 0%, #142d4c 50%, #2466a8 100%)",
      color: "#ffffff",
      padding: "24px"
    }}>
      <div style={{ fontSize: "120px", marginBottom: "20px" }}>✏️</div>
      <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px, 6vw, 48px)", marginBottom: "16px" }}>
        Página no encontrada
      </h1>
      <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", maxWidth: "480px", marginBottom: "32px", lineHeight: "1.6" }}>
        El enlace que has seguido podría estar roto o la página ha sido trasladada. ¡Volvamos a trazar el camino!
      </p>
      <a href="#inicio" style={{
        padding: "14px 36px",
        borderRadius: "50px",
        background: "#e8a838",
        color: "#0c2340",
        fontWeight: "700",
        fontSize: "15px",
        textDecoration: "none",
        boxShadow: "0 6px 24px rgba(232,168,56,0.35)",
        transition: "all 0.25s"
      }}
        onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(232,168,56,0.45)"; }}
        onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 6px 24px rgba(232,168,56,0.35)"; }}
      >
        Volver al Inicio
      </a>
    </div>
  );
}
