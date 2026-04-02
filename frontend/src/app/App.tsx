import { useEffect, useState } from 'react';
import { Route, Switch, Router } from "wouter";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Founder from "./components/pages/Founder";
import JumanaSeif from "./components/pages/JumanaSeif";
import Center from "./components/pages/Center";
import Forum from "./components/pages/Forum";
import Publications from "./components/pages/Publications";
import Contact from "./components/pages/Contact";
import Terms from "./components/pages/Terms";
import JoinUs from "./components/pages/JoinUs";
import { content } from "./utils/content";
import { fetchSiteContent } from "./utils/api";
import { type SiteContent } from "./utils/contentStore";
import Admin from "./components/pages/Admin";
import AdminAccount from "./components/pages/AdminAccount";

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar'); // Default to Arabic
  const [siteContent, setSiteContent] = useState<SiteContent>(content);

  useEffect(() => {
    let active = true;
    fetchSiteContent()
      .then((response) => {
        const payload = response?.content;
        if (payload && Object.keys(payload).length > 0 && active) {
          setSiteContent(payload as SiteContent);
        }
      })
      .catch(() => {
        // Fallback to bundled content
      });
    return () => {
      active = false;
    };
  }, []);

  // Page props
  const props = { lang, content: siteContent };

  return (
    <Router>
      <Layout lang={lang} setLang={setLang} content={siteContent}>
        <Switch>
          <Route path="/" component={() => <Home {...props} />} />
          <Route path="/about" component={() => <About {...props} />} />
          <Route path="/founder" component={() => <Founder {...props} />} />
          <Route path="/jumana-seif" component={() => <JumanaSeif {...props} />} />
          <Route path="/center" component={() => <Center {...props} />} />
          <Route path="/forum" component={() => <Forum {...props} />} />
          <Route path="/publications" component={() => <Publications {...props} />} />
          <Route path="/contact" component={() => <Contact {...props} />} />
          <Route path="/join-us" component={() => <JoinUs {...props} />} />
          <Route path="/terms" component={() => <Terms {...props} />} />
          <Route path="/admin" component={() => <Admin {...props} onContentUpdate={setSiteContent} />} />
          <Route path="/admin/account" component={() => <AdminAccount lang={lang} />} />
          
          {/* Fallback to Home */}
          <Route component={() => <Home {...props} />} />
        </Switch>
      </Layout>
    </Router>
  );
}
