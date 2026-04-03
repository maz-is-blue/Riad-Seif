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

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const isSharedMediaKey = (key: string) =>
  /(image|photo|cover|logo|portrait|hero_image|background|bg)/i.test(key);

const syncSharedMediaNodes = (arNode: any, enNode: any): [any, any] => {
  if (Array.isArray(arNode) || Array.isArray(enNode)) {
    const arArr = Array.isArray(arNode) ? arNode : [];
    const enArr = Array.isArray(enNode) ? enNode : [];
    const length = Math.max(arArr.length, enArr.length);
    const nextAr = new Array(length);
    const nextEn = new Array(length);
    for (let i = 0; i < length; i += 1) {
      const [syncedAr, syncedEn] = syncSharedMediaNodes(arArr[i], enArr[i]);
      nextAr[i] = syncedAr;
      nextEn[i] = syncedEn;
    }
    return [nextAr, nextEn];
  }

  if (isPlainObject(arNode) || isPlainObject(enNode)) {
    const arObj = isPlainObject(arNode) ? arNode : {};
    const enObj = isPlainObject(enNode) ? enNode : {};
    const keys = new Set([...Object.keys(arObj), ...Object.keys(enObj)]);
    const nextAr: Record<string, unknown> = {};
    const nextEn: Record<string, unknown> = {};

    keys.forEach((key) => {
      const arValue = arObj[key];
      const enValue = enObj[key];

      if (isSharedMediaKey(key) && (typeof arValue === "string" || typeof enValue === "string")) {
        const sharedValue = String(arValue || enValue || "");
        nextAr[key] = sharedValue;
        nextEn[key] = sharedValue;
        return;
      }

      const [syncedAr, syncedEn] = syncSharedMediaNodes(arValue, enValue);
      nextAr[key] = syncedAr;
      nextEn[key] = syncedEn;
    });

    return [nextAr, nextEn];
  }

  return [arNode, enNode];
};

const syncSharedMediaContent = (raw: SiteContent): SiteContent => {
  if (!raw || !isPlainObject(raw) || !raw.ar || !raw.en) {
    return raw;
  }
  const [ar, en] = syncSharedMediaNodes(raw.ar, raw.en);
  return { ...raw, ar, en } as SiteContent;
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar'); // Default to Arabic
  const [siteContent, setSiteContent] = useState<SiteContent>(content);

  const handleContentUpdate = (nextContent: SiteContent) => {
    setSiteContent(syncSharedMediaContent(nextContent));
  };

  useEffect(() => {
    let active = true;
    fetchSiteContent()
      .then((response) => {
        const payload = response?.content;
        if (payload && Object.keys(payload).length > 0 && active) {
          setSiteContent(syncSharedMediaContent(payload as SiteContent));
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
          <Route path="/admin" component={() => <Admin {...props} onContentUpdate={handleContentUpdate} />} />
          <Route path="/admin/account" component={() => <AdminAccount lang={lang} />} />
          
          {/* Fallback to Home */}
          <Route component={() => <Home {...props} />} />
        </Switch>
      </Layout>
    </Router>
  );
}
