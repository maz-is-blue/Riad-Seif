import { useState } from 'react';
import { Route, Switch, Router } from "wouter";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Founder from "./components/pages/Founder";
import Center from "./components/pages/Center";
import Forum from "./components/pages/Forum";
import Publications from "./components/pages/Publications";
import Contact from "./components/pages/Contact";
import { content } from "./utils/content";

// Get base path from import.meta.env or default to /Riad-Seif/
const base = import.meta.env.BASE_URL || '/Riad-Seif/';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar'); // Default to Arabic

  // Page props
  const props = { lang, content };

  return (
    <Router base={base}>
      <Layout lang={lang} setLang={setLang} content={content}>
        <Switch>
          <Route path="/" component={() => <Home {...props} />} />
          <Route path="/about" component={() => <About {...props} />} />
          <Route path="/founder" component={() => <Founder {...props} />} />
          <Route path="/center" component={() => <Center {...props} />} />
          <Route path="/forum" component={() => <Forum {...props} />} />
          <Route path="/publications" component={() => <Publications {...props} />} />
          <Route path="/contact" component={() => <Contact {...props} />} />
          
          {/* Fallback to Home */}
          <Route component={() => <Home {...props} />} />
        </Switch>
      </Layout>
    </Router>
  );
}
