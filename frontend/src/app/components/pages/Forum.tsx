import { Calendar, MessageSquare, Users, Video, Globe, Camera, FileText, UserCheck, X } from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import {
  fetchMemoryPhotos,
  fetchArchiveItems,
  fetchForumEvents,
  type MemoryPhoto,
  type ArchiveItem,
  type ForumEvent,
} from '../../utils/api';

export default function Forum({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [apiMemory, setApiMemory] = useState<MemoryPhoto[]>([]);
  const [apiArchive, setApiArchive] = useState<ArchiveItem[]>([]);
  const [apiEvents, setApiEvents] = useState<ForumEvent[]>([]);

  useEffect(() => {
    fetchMemoryPhotos()
      .then((items) => setApiMemory(items ?? []))
      .catch(() => setApiMemory([]));
    fetchArchiveItems()
      .then((items) => setApiArchive(items ?? []))
      .catch(() => setApiArchive([]));
    fetchForumEvents()
      .then((items) => setApiEvents(items ?? []))
      .catch(() => setApiEvents([]));
  }, []);

  const formatDate = (value?: string | null) => {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString(lang === 'ar' ? 'ar' : 'en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const resolveEventType = (event: ForumEvent) => {
    const raw = `${event.event_type ?? ''}`.toLowerCase();
    if (event.is_online || raw.includes('online')) {
      return { label: lang === 'ar' ? 'عبر الإنترنت' : 'Online', icon: Video };
    }
    if (raw.includes('hybrid')) {
      return { label: lang === 'ar' ? 'هجيني' : 'Hybrid', icon: Globe };
    }
    if (raw.includes('person') || raw.includes('in-person') || raw.includes('in person')) {
      return { label: lang === 'ar' ? 'حضوري' : 'In-Person', icon: Users };
    }
    return { label: lang === 'ar' ? 'فعالية' : 'Event', icon: Users };
  };

  const fallbackEvents = [
    {
      date: lang === 'ar' ? 'يناير 2025' : 'January 2025',
      title: lang === 'ar' ? 'الجلسة 45: دور الشباب في الحكم المحلي' : 'Session 45: Youth Role in Local Governance',
      type: lang === 'ar' ? 'عبر الإنترنت' : 'Online',
      icon: Video
    },
    {
      date: lang === 'ar' ? 'فبراير 2025' : 'February 2025',
      title: lang === 'ar' ? 'ورشة عمل: بناء السلام المجتمعي' : 'Workshop: Community Peacebuilding',
      type: lang === 'ar' ? 'حضوري' : 'In-Person',
      icon: Users
    },
    {
      date: lang === 'ar' ? 'مارس 2025' : 'March 2025',
      title: lang === 'ar' ? 'حوار مفتوح: المرأة والإصلاح الدستوري' : 'Open Dialogue: Women and Constitutional Reform',
      type: lang === 'ar' ? 'هجيني' : 'Hybrid',
      icon: Globe
    }
  ];

  const upcomingEvents = apiEvents.length
    ? apiEvents.map((event) => {
        const type = resolveEventType(event);
        return {
          date: formatDate(event.date),
          title: lang === 'ar' ? event.title_ar : event.title_en,
          type: type.label,
          icon: type.icon,
        };
      })
    : fallbackEvents;

  const memoryPhotos = apiMemory.length
    ? apiMemory.map((photo) => ({
        id: photo.id,
        image: photo.image_url,
        date: photo.date,
        title: photo.title_en,
        titleAr: photo.title_ar,
        description: photo.description_en,
        descriptionAr: photo.description_ar,
      }))
    : [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'Ù…Ø§Ø±Ø³ 2024' : 'March 2024',
      title: lang === 'ar' ? 'Ø¬Ù„Ø³Ø© Ø­ÙˆÙ„ Ø§Ù„Ø¹Ø¯Ø§Ù„Ø© Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ÙŠØ©' : 'Session on Transitional Justice',
      titleAr: 'Ø¬Ù„Ø³Ø© Ø­ÙˆÙ„ Ø§Ù„Ø¹Ø¯Ø§Ù„Ø© Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ÙŠØ©',
      description: 'A powerful dialogue session featuring civil society activists, lawyers, and survivors discussing pathways to accountability and reconciliation. Over 50 participants engaged in meaningful conversations about truth, justice, and guarantees of non-recurrence.',
      descriptionAr: 'Ø¬Ù„Ø³Ø© Ø­ÙˆØ§Ø± Ù‚ÙˆÙŠØ© Ø¶Ù…Øª Ù†Ø§Ø´Ø·ÙŠÙ† Ù…Ù† Ø§Ù„Ù…Ø¬ØªÙ…Ø¹ Ø§Ù„Ù…Ø¯Ù†ÙŠ ÙˆÙ…Ø­Ø§Ù…ÙŠÙ† ÙˆÙ†Ø§Ø¬ÙŠÙ† Ù„Ù…Ù†Ø§Ù‚Ø´Ø© Ù…Ø³Ø§Ø±Ø§Øª Ø§Ù„Ù…Ø³Ø§Ø¡Ù„Ø© ÙˆØ§Ù„Ù…ØµØ§Ù„Ø­Ø©. Ø´Ø§Ø±Ùƒ Ø£ÙƒØ«Ø± Ù…Ù† 50 Ù…Ø´Ø§Ø±ÙƒØ§Ù‹ ÙÙŠ Ù…Ø­Ø§Ø¯Ø«Ø§Øª Ù‡Ø§Ø¯ÙØ© Ø­ÙˆÙ„ Ø§Ù„Ø­Ù‚ÙŠÙ‚Ø© ÙˆØ§Ù„Ø¹Ø¯Ø§Ù„Ø© ÙˆØ¶Ù…Ø§Ù†Ø§Øª Ø¹Ø¯Ù… Ø§Ù„ØªÙƒØ±Ø§Ø±.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560523159-4a9692d222ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'ÙŠÙ†Ø§ÙŠØ± 2024' : 'January 2024',
      title: lang === 'ar' ? 'ÙˆØ±Ø´Ø© Ø¹Ù…Ù„: Ø¯ÙˆØ± Ø§Ù„Ù…Ø±Ø£Ø© ÙÙŠ Ø¨Ø§Ø¡ Ø§Ù„Ø³Ù„Ø§Ù…' : 'Workshop: Women\'s Role in Peacebuilding',
      titleAr: 'ÙˆØ±Ø´Ø© Ø¹Ù…Ù„: Ø¯ÙˆØ± Ø§Ù„Ù…Ø±Ø£Ø© ÙÙŠ Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø³Ù„Ø§Ù…',
      description: 'An intensive workshop bringing together women leaders and activists to discuss strategies for inclusive political participation and constitutional reform. The event emphasized the critical role of women in Syria\'s democratic transition.',
      descriptionAr: 'ÙˆØ±Ø´Ø© Ø¹Ù…Ù„ Ù…ÙƒØ«ÙØ© Ø¬Ù…Ø¹Øª Ù‚Ø§Ø¦Ø¯Ø§Øª ÙˆÙ†Ø§Ø´Ø·Ø§Øª Ù„Ù…Ù†Ø§Ù‚Ø´Ø© Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ§Øª Ø§Ù„Ù…Ø´Ø§Ø±ÙƒØ© Ø§Ù„Ø³ÙŠØ§Ø³ÙŠØ© Ø§Ù„Ø´Ø§Ù…Ù„Ø© ÙˆØ§Ù„Ø¥ØµÙ„Ø§Ø­ Ø§Ù„Ø¯Ø³ØªÙˆØ±ÙŠ. Ø£ÙƒØ¯ Ø§Ù„Ø­Ø¯Ø« Ø¹Ù„Ù‰ Ø§Ù„Ø¯ÙˆØ± Ø§Ù„Ø­Ø§Ø³Ù… Ù„Ù„Ù…Ø±Ø£Ø© ÙÙŠ Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠ ÙÙŠ Ø³ÙˆØ±ÙŠØ§.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'Ù†ÙˆÙÙ…Ø¨Ø± 2023' : 'November 2023',
      title: lang === 'ar' ? 'Ù„Ù‚Ø§Ø¡ Ù…Ø¹ Ø®Ø¨Ø±Ø§Ø¡ Ø¯ÙˆÙ„ÙŠÙŠÙ†' : 'Meeting with International Experts',
      titleAr: 'Ù„Ù‚Ø§Ø¡ Ù…Ø¹ Ø®Ø¨Ø±Ø§Ø¡ Ø¯ÙˆÙ„ÙŠÙŠÙ†',
      description: 'Forum members met with international experts on democratic transitions and human rights to exchange experiences and learn from best practices in post-conflict contexts around the world.',
      descriptionAr: 'Ø§Ù„ØªÙ‚Ù‰ Ø£Ø¹Ø¶Ø§Ø¡ Ø§Ù„Ù…Ù†ØªØ¯Ù‰ Ø¨Ø®Ø¨Ø±Ø§Ø¡ Ø¯ÙˆÙ„ÙŠÙŠÙ† ÙÙŠ Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„Ø§Øª Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠØ© ÙˆØ­Ù‚ÙˆÙ‚ Ø§Ù„Ø¥Ù†Ø³Ø§Ù† Ù„ØªØ¨Ø§Ø¯Ù„ Ø§Ù„Ø®Ø¨Ø±Ø§Øª ÙˆØ§Ù„ØªØ¹Ù„Ù… Ù…Ù† Ø£ÙØ¶Ù„ Ø§Ù„Ù…Ù…Ø§Ø±Ø³Ø§Øª ÙÙŠ Ø³ÙŠØ§Ù‚Ø§Øª Ù…Ø§ Ø¨Ø¹Ø¯ Ø§Ù„Ù†Ø²Ø§Ø¹ Ø­ÙˆÙ„ Ø§Ù„Ø¹Ø§Ù„Ù….'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'Ø³Ø¨ØªÙ…Ø¨Ø± 2023' : 'September 2023',
      title: lang === 'ar' ? 'Ø§Ø­ØªÙØ§Ù„ Ø§Ù„Ø°ÙƒØ±Ù‰ Ø§Ù„Ø³Ù†ÙˆÙŠØ© Ø§Ù„Ø£ÙˆÙ„Ù‰' : 'First Anniversary Celebration',
      titleAr: 'Ø§Ø­ØªÙØ§Ù„ Ø§Ù„Ø°ÙƒØ±Ù‰ Ø§Ù„Ø³Ù†ÙˆÙŠØ© Ø§Ù„Ø£ÙˆÙ„Ù‰',
      description: 'The Forum celebrated its first anniversary with a special event honoring Riad Seif\'s legacy and the Damascus Spring. Prominent civil society figures and activists gathered to reflect on achievements and plan future initiatives.',
      descriptionAr: 'Ø§Ø­ØªÙÙ„ Ø§Ù„Ù…Ù†ØªØ¯Ù‰ Ø¨Ø°ÙƒØ±Ø§Ù‡ Ø§Ù„Ø³Ù†ÙˆÙŠØ© Ø§Ù„Ø£ÙˆÙ„Ù‰ Ø¨Ø­Ø¯Ø« Ø®Ø§Øµ Ù„ØªÙƒØ±ÙŠÙ… Ø¥Ø±Ø« Ø±ÙŠØ§Ø¶ Ø³ÙŠÙ ÙˆØ±Ø¨ÙŠØ¹ Ø¯Ù…Ø´Ù‚. Ø§Ø¬ØªÙ…Ø¹ Ø´Ø®ØµÙŠØ§Øª Ø¨Ø§Ø±Ø²Ø© Ù…Ù† Ø§Ù„Ù…Ø¬ØªÙ…Ø¹ Ø§Ù„Ù…Ø¯Ù†ÙŠ ÙˆØ§Ù„Ù†Ø§Ø´Ø·ÙŠÙ† Ù„Ù„ØªÙÙƒÙŠØ± ÙÙŠ Ø§Ù„Ø¥Ù†Ø¬Ø§Ø²Ø§Øª ÙˆØ§Ù„ØªØ®Ø·ÙŠØ· Ù„Ù„Ù…Ø¨Ø§Ø¯Ø±Ø§Øª Ø§Ù„Ù…Ø³ØªÙ‚Ø¨Ù„ÙŠØ©.'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'ÙŠÙˆÙ„ÙŠÙˆ 2023' : 'July 2023',
      title: lang === 'ar' ? 'Ø­Ù„Ù‚Ø© Ù†Ù‚Ø§Ø´: Ø§Ù„Ø­ÙƒÙ… Ø§Ù„Ù…Ø­Ù„ÙŠ ÙˆØ§Ù„Ø¥ØµÙ„Ø§Ø­' : 'Panel: Local Governance and Reform',
      titleAr: 'Ø­Ù„Ù‚Ø© Ù†Ù‚Ø§Ø´: Ø§Ù„Ø­ÙƒÙ… Ø§Ù„Ù…Ø­Ù„ÙŠ ÙˆØ§Ù„Ø¥ØµÙ„Ø§Ø­',
      description: 'A panel discussion exploring models of local governance, decentralization, and civic participation. Experts and community leaders shared insights on building accountable institutions from the ground up.',
      descriptionAr: 'Ø­Ù„Ù‚Ø© Ù†Ù‚Ø§Ø´ Ø§Ø³ØªÙƒØ´ÙØª Ù†Ù…Ø§Ø°Ø¬ Ø§Ù„Ø­ÙƒÙ… Ø§Ù„Ù…Ø­Ù„ÙŠ ÙˆØ§Ù„Ù„Ø§Ù…Ø±ÙƒØ²ÙŠØ© ÙˆØ§Ù„Ù…Ø´Ø§Ø±ÙƒØ© Ø§Ù„Ù…Ø¯Ù†ÙŠØ©. Ø´Ø§Ø±Ùƒ Ø§Ù„Ø®Ø¨Ø±Ø§Ø¡ ÙˆÙ‚Ø§Ø¯Ø© Ø§Ù„Ù…Ø¬ØªÙ…Ø¹ Ø±Ø¤Ø§Ù‡Ù… Ø­ÙˆÙ„ Ø¨Ù†Ø§Ø¡ Ù…Ø¤Ø³Ø³Ø§Øª Ø®Ø§Ø¶Ø¹Ø© Ù„Ù„Ù…Ø³Ø§Ø¡Ù„Ø© Ù…Ù† Ø§Ù„Ù‚Ø§Ø¹Ø¯Ø©.'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'Ù…Ø§ÙŠÙˆ 2023' : 'May 2023',
      title: lang === 'ar' ? 'Ø¬Ù„Ø³Ø© Ø§Ù„Ø´Ø¨Ø§Ø¨: Ø¨Ù†Ø§Ø¡ Ø§Ù„Ù…Ø³ØªÙ‚Ø¨Ù„' : 'Youth Session: Building the Future',
      titleAr: 'Ø¬Ù„Ø³Ø© Ø§Ù„Ø´Ø¨Ø§Ø¨: Ø¨Ù†Ø§Ø¡ Ø§Ù„Ù…Ø³ØªÙ‚Ø¨Ù„',
      description: 'A special session dedicated to young activists and students, focusing on youth leadership, civic education, and intergenerational dialogue. The event emphasized the vital role of young people in shaping Syria\'s democratic future.',
      descriptionAr: 'Ø¬Ù„Ø³Ø© Ø®Ø§ØµØ© Ù…Ø®ØµØµØ© Ù„Ù„Ù†Ø§Ø´Ø·ÙŠÙ† Ø§Ù„Ø´Ø¨Ø§Ø¨ ÙˆØ§Ù„Ø·Ù„Ø§Ø¨ØŒ ØªØ±ÙƒØ² Ø¹Ù„Ù‰ Ù‚ÙŠØ§Ø¯Ø© Ø§Ù„Ø´Ø¨Ø§Ø¨ ÙˆØ§Ù„ØªØ±Ø¨ÙŠØ© Ø§Ù„Ù…Ø¯Ù†ÙŠØ© ÙˆØ§Ù„Ø­ÙˆØ§Ø± Ø¨ÙŠÙ† Ø§Ù„Ø£Ø¬ÙŠØ§Ù„. Ø£ÙƒØ¯ Ø§Ù„Ø­Ø¯Ø« Ø¹Ù„Ù‰ Ø§Ù„Ø¯ÙˆØ± Ø§Ù„Ø­ÙŠÙˆÙŠ Ù„Ù„Ø´Ø¨Ø§Ø¨ ÙÙŠ ØªØ´ÙƒÙŠÙ„ Ù…Ø³ØªÙ‚Ø¨Ù„ Ø³ÙˆØ±ÙŠØ§ Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠ.'
    }
  ];

  const archiveItems = apiArchive.length
    ? apiArchive.map((item) => ({
        id: item.id,
        title: lang === 'ar' ? item.title_ar : item.title_en,
        titleAr: item.title_ar,
        description: lang === 'ar' ? item.description_ar : item.description_en,
        descriptionAr: item.description_ar,
        date: item.date,
        link: item.external_link,
      }))
    : [
    {
      id: 1,
      type: lang === 'ar' ? 'Ù…Ù‚Ø§Ù„' : 'Article',
      title: lang === 'ar' ? 'Ù…Ù†ØªØ¯Ù‰ Ø±ÙŠØ§Ø¶ Ø³ÙŠÙ: Ø¥Ø­ÙŠØ§Ø¡ Ø±ÙˆØ­ Ø±Ø¨ÙŠØ¹ Ø¯Ù…Ø´Ù‚' : 'Riad Seif Forum: Reviving the Spirit of Damascus Spring',
      titleAr: 'Ù…Ù†ØªØ¯Ù‰ Ø±ÙŠØ§Ø¶ Ø³ÙŠÙ: Ø¥Ø­ÙŠØ§Ø¡ Ø±ÙˆØ­ Ø±Ø¨ÙŠØ¹ Ø¯Ù…Ø´Ù‚',
      source: lang === 'ar' ? 'Ø§Ù„Ø´Ø±Ù‚ Ø§Ù„Ø£ÙˆØ³Ø·' : 'Al-Sharq Al-Awsat',
      date: lang === 'ar' ? 'Ø¯ÙŠØ³Ù…Ø¨Ø± 2024' : 'December 2024',
      excerpt: 'An in-depth analysis of how the Forum for National Dialogue continues the legacy of the Damascus Spring movement and its relevance to contemporary Syrian civil society.',
      excerptAr: 'ØªØ­Ù„ÙŠÙ„ Ù…ØªØ¹Ù…Ù‚ Ù„ÙƒÙŠÙÙŠØ© Ø§Ø³ØªÙ…Ø±Ø§Ø± Ù…Ù†ØªØ¯Ù‰ Ø§Ù„Ø­ÙˆØ§Ø± Ø§Ù„ÙˆØ·Ù†ÙŠ ÙÙŠ Ø¥Ø±Ø« Ø­Ø±ÙƒØ© Ø±Ø¨ÙŠØ¹ Ø¯Ù…Ø´Ù‚ ÙˆØ£Ù‡Ù…ÙŠØªÙ‡ Ù„Ù„Ù…Ø¬ØªÙ…Ø¹ Ø§Ù„Ù…Ø¯Ù†ÙŠ Ø§Ù„Ø³ÙˆØ±ÙŠ Ø§Ù„Ù…Ø¹Ø§ØµØ±.'
    },
    {
      id: 2,
      type: lang === 'ar' ? 'Ø¨Ø­Ø«' : 'Research',
      title: lang === 'ar' ? 'Ø¯ÙˆØ± Ù…Ù†ØªØ¯ÙŠØ§Øª Ø§Ù„Ø­ÙˆØ§Ø± ÙÙŠ Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„Ø§Øª Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠØ©' : 'The Role of Dialogue Forums in Democratic Transitions',
      titleAr: 'Ø¯ÙˆØ± Ù…Ù†ØªØ¯ÙŠØ§Øª Ø§Ù„Ø­ÙˆØ§Ø± ÙÙŠ Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„Ø§Øª Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠØ©',
      source: lang === 'ar' ? 'Ù…Ø±ÙƒØ² Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠØ©' : 'Center for Democracy Studies',
      date: lang === 'ar' ? 'Ø£ÙƒØªÙˆØ¨Ø± 2024' : 'October 2024',
      excerpt: 'Academic research examining the impact of civil dialogue forums on democratic transitions, with case studies including the Riad Seif Forum.',
      excerptAr: 'Ø¨Ø­Ø« Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠ ÙŠØ¯Ø±Ø³ ØªØ£Ø«ÙŠØ± Ù…Ù†ØªØ¯ÙŠØ§Øª Ø§Ù„Ø­ÙˆØ§Ø± Ø§Ù„Ù…Ø¯Ù†ÙŠ Ø¹Ù„Ù‰ Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„Ø§Øª Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠØ©ØŒ Ù…Ø¹ Ø¯Ø±Ø§Ø³Ø§Øª Ø­Ø§Ù„Ø© ØªØ´Ù…Ù„ Ù…Ù†ØªØ¯Ù‰ Ø±ÙŠØ§Ø¶ Ø³ÙŠÙ.'
    },
    {
      id: 3,
      type: lang === 'ar' ? 'ÙƒØªØ§Ø¨' : 'Book',
      title: lang === 'ar' ? 'Ø£ØµÙˆØ§Øª Ø§Ù„ØªØºÙŠÙŠØ±: Ø§Ù„Ù…Ø¬ØªÙ…Ø¹ Ø§Ù„Ù…Ø¯Ù†ÙŠ Ø§Ù„Ø³ÙˆØ±ÙŠ' : 'Voices of Change: Syrian Civil Society',
      titleAr: 'Ø£ØµÙˆØ§Øª Ø§Ù„ØªØºÙŠÙŠØ±: Ø§Ù„Ù…Ø¬ØªÙ…Ø¹ Ø§Ù„Ù…Ø¯Ù†ÙŠ Ø§Ù„Ø³ÙˆØ±ÙŠ',
      source: lang === 'ar' ? 'Ø¯Ø§Ø± Ø§Ù„Ù†Ø´Ø± Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ©' : 'Academic Press',
      date: lang === 'ar' ? 'Ø³Ø¨ØªÙ…Ø¨Ø± 2024' : 'September 2024',
      excerpt: 'A comprehensive book featuring chapters on the Forum for National Dialogue and its contributions to civic discourse and democratic reform in Syria.',
      excerptAr: 'ÙƒØªØ§Ø¨ Ø´Ø§Ù… ÙŠØªØ¶Ù…Ù† ÙØµÙˆÙ„Ø§Ù‹ Ø¹Ù† Ù…Ù†ØªØ¯Ù‰ Ø§Ù„Ø­ÙˆØ§Ø± Ø§Ù„ÙˆØ·Ù†ÙŠ ÙˆÙ…Ø³Ø§Ù‡Ù…Ø§ØªÙ‡ ÙÙŠ Ø§Ù„Ø®Ø·Ø§Ø¨ Ø§Ù„Ù…Ø¯Ù†ÙŠ ÙˆØ§Ù„Ø¥ØµÙ„Ø§Ø­ Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠ ÙÙŠ Ø³ÙˆØ±ÙŠØ§.'
    },
    {
      id: 4,
      type: lang === 'ar' ? 'ØªÙ‚Ø±ÙŠØ±' : 'Report',
      title: lang === 'ar' ? 'ØªÙ‚ÙŠÙŠÙ… Ø£Ù†Ø´Ø·Ø© Ø§Ù„Ù…Ù†ØªØ¯Ù‰ 2023-2024' : 'Forum Activities Assessment 2023-2024',
      titleAr: 'ØªÙ‚ÙŠÙŠÙ… Ø£Ù†Ø´Ø·Ø© Ø§Ù„Ù…Ù†ØªØ¯Ù‰ 2023-2024',
      source: lang === 'ar' ? 'Ù…Ø¤Ø³Ø³Ø© Ø±ÙŠØ§Ø¶ Ø³ÙŠÙ Ù„Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ø¥Ù†Ø³Ø§Ù†' : 'Riad Seif Foundation for Human Rights',
      date: lang === 'ar' ? 'ÙŠÙ†Ø§ÙŠØ± 2025' : 'January 2025',
      excerpt: 'Annual report documenting the Forum\'s activities, impact, and key achievements in promoting dialogue and democratic participation.',
      excerptAr: 'ØªÙ‚Ø±ÙŠØ± Ø³Ù†ÙˆÙŠ ÙŠÙˆØ«Ù‚ Ø£Ù†Ø´Ø·Ø© Ø§Ù„Ù…Ù†ØªØ¯Ù‰ ÙˆØªØ£Ø«ÙŠØ±Ù‡ ÙˆØ§Ù„Ø¥Ù†Ø¬Ø§Ø²Ø§Øª Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ© ÙÙŠ ØªØ¹Ø²ÙŠØ² Ø§Ù„Ø­ÙˆØ§Ø± ÙˆØ§Ù„Ù…Ø´Ø§Ø±ÙƒØ© Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠØ©.'
    }
  ];

      const fallbackManagementTeam = [
    {
      id: 1,
      name: 'Dr. Karim Al-Deeb',
      nameAr: 'د. كريم الديب',
      role: 'Forum Coordinator',
      roleAr: 'منسق المنتدى',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      bio: 'Political scientist specializing in democratic transitions and civil society development.',
      bioAr: 'عالم سياسي متخصص في الانتقالات الديمقراطية وتنمية المجتمع المدني.',
      detailedBio: 'Dr. Karim Al-Deeb is a political scientist with over 15 years of experience in democratic transitions and civil society development. He holds a PhD in Political Science from the Sorbonne University and has worked extensively with civil society organizations across the Middle East. As Forum Coordinator, he oversees all dialogue sessions, manages partnerships with local and international organizations, and ensures the Forum remains a safe and inclusive space for democratic discourse. His research focuses on transitional justice, civic participation, and the role of civil forums in post-conflict societies.',
      detailedBioAr: 'الدكتور كريم الديب عالم سياسي يتمتع بخبرة تزيد عن 15 عامًا في الانتقالات الديمقراطية وتنمية المجتمع المدني. حاصل على درجة الدكتوراه في العلوم السياسية من جامعة السوربون وعمل بشكل مكثف مع منظمات المجتمع المدني في جميع أنحاء الشرق الأوسط. بصفته منسق المنتدى، يشرف على جميع جلسات الحوار، ويدير الشراكات مع المنظمات المحلية والدولية، ويضمن بقاء المنتدى مساحة آمنة وشاملة للخطاب الديمقراطي. يركز بحثه على العدالة الانتقالية والمشاركة المدنية ودور المنتديات المدنية في مجتمعات ما بعد النزاع.'
    },
    {
      id: 2,
      name: 'Layla Kassem',
      nameAr: 'ليلى قاسم',
      role: 'Communications Director',
      roleAr: 'مديرة التواصل',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      bio: 'Leads media relations and public engagement for the Forum, ensuring transparent and inclusive communication.',
      bioAr: 'تدير العلاقات الإعلامية والتواصل المجتمعي للمنتدى لضمان خطاب شفاف وشامل.',
      detailedBio: 'Layla Kassem is a communications strategist with extensive experience in civil society storytelling and advocacy campaigns. She has led media initiatives for international NGOs and is passionate about amplifying Syrian voices. At the Forum, she manages public relations, outreach, and the narrative around democratic dialogue and civic participation.',
      detailedBioAr: 'ليلى قاسم خبيرة في استراتيجيات التواصل ولديها خبرة واسعة في سرد قصص المجتمع المدني وحملات المناصرة. قادت مبادرات إعلامية لمنظمات دولية وهي ملتزمة بتعزيز أصوات السوريين. في المنتدى، تدير العلاقات العامة والتواصل وصياغة السرد حول الحوار الديمقراطي والمشاركة المدنية.'
    },
    {
      id: 3,
      name: 'Salma Saeed',
      nameAr: 'سلمى سعيد',
      role: 'Research & Documentation Lead',
      roleAr: 'مسؤولة الأبحاث والتوثيق',
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      bio: 'Oversees research output and documentation of Forum sessions, ensuring knowledge is archived and shared.',
      bioAr: 'تشرف على الأبحاث وتوثيق جلسات المنتدى لضمان حفظ المعرفة ومشاركتها.',
      detailedBio: 'Salma Saeed is a researcher and documentary filmmaker focused on storytelling, transitional justice, and visual documentation of Syrian history. She has worked with international media outlets and rights organizations to document survivor testimonies and collective memory. At the Forum, she leads memory and documentation initiatives, ensuring that Syrian stories are preserved and accessible for future generations. Her research interests include the relationship between narrative, justice, and identity in post-conflict societies.',
      detailedBioAr: 'سلمى سعيد باحثة وصانعة أفلام وثائقية تركز على رواية القصص والعدالة الانتقالية والتوثيق البصري للتاريخ السوري. عملت مع وسائل إعلام دولية ومنظمات حقوقية لتوثيق شهادات الناجين والذاكرة الجماعية. في المنتدى، تقود مبادرات الذاكرة والتوثيق البصري، وتضمن أن تكون قصص السوريين محفوظة ومتاحة للأجيال القادمة. تهتم أبحاثها بالعلاقة بين السرد والعدالة والهوية في المجتمعات الخارجة من النزاع.'
    }
  ];

  const managementTeam =
    Array.isArray(t.forum?.managementTeam) && t.forum.managementTeam.length > 0
      ? t.forum.managementTeam
      : fallbackManagementTeam;

  const getMemberValue = (member: any, key: string) => {
    const arKey = `${key}Ar`;
    const enKey = `${key}En`;
    if (lang === 'ar') {
      return member?.[arKey] ?? member?.[key] ?? member?.[enKey];
    }
    return member?.[key] ?? member?.[enKey] ?? member?.[arKey];
  };
  
  return (
    <div className="bg-white">
       {/* Header */}
       <div className="relative bg-[#1c3944] text-white py-20 lg:py-32 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          >
               <img src="https://images.unsplash.com/photo-1733688767526-df72724ff24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" className="w-full h-full object-cover" alt="" />
          </motion.div>

          {/* Animated Circles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-[#f7c20e] opacity-20"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${30 + i * 5}%`,
                top: `${20 + i * 3}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
             <motion.span
               className="text-[#f7c20e] font-bold uppercase tracking-widest text-sm mb-4 block"
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
             >
               {t.nav.forum}
             </motion.span>
             <motion.h1
               className={`text-4xl lg:text-5xl ${t.serif} mb-6`}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
             >
               {t.nav.forum}
             </motion.h1>
             <motion.p
               className="text-xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed"
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
             >
                 {t.forum.history.text}
             </motion.p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
           
           {/* Tab Navigation */}
           <motion.div
             className="flex flex-wrap justify-center gap-3 mb-16"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
           >
             {[
               { label: lang === 'ar' ? 'Ø§Ù„ØªØ§Ø±ÙŠØ®' : 'History', icon: Calendar },
               { label: lang === 'ar' ? 'Ø§Ù„Ø¬Ù„Ø³Ø§Øª' : 'Sessions', icon: MessageSquare },
               { label: lang === 'ar' ? 'Ø§Ù„ÙØ¹Ø§Ù„ÙŠØ§Øª' : 'Events', icon: Users },
               { label: lang === 'ar' ? 'Ø§Ù„Ø°Ø§ÙƒØ±Ø©' : 'Memory', icon: Camera },
               { label: lang === 'ar' ? 'Ø§Ù„Ø£Ø±Ø´ÙŠÙ' : 'Archive', icon: FileText },
               { label: lang === 'ar' ? 'Ø§Ù„Ø§Ø¯Ø§Ø±Ø©' : 'Management', icon: UserCheck }
             ].map((tab, idx) => (
               <motion.button
                 key={idx}
                 className={`px-5 py-3 rounded-lg font-semibold transition-all ${
                   activeTab === idx
                     ? 'bg-[#1c3944] text-white shadow-lg'
                     : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                 }`}
                 onClick={() => setActiveTab(idx)}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <div className="flex items-center gap-2">
                   <tab.icon size={18} />
                   <span className="text-sm md:text-base">{tab.label}</span>
                 </div>
               </motion.button>
             ))}
           </motion.div>

           {/* Content Based on Active Tab */}
           <motion.div
             key={activeTab}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             transition={{ duration: 0.3 }}
           >
             {activeTab === 0 && (
               <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
                   <motion.div
                     initial={{ opacity: 0, x: -30 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.2 }}
                   >
                       <h2 className={`text-3xl text-[#1c3944] mb-6 ${t.serif}`}>{t.forum.history.title}</h2>
                       <div className="prose prose-lg text-slate-600">
                           <p>{t.forum.history.text}</p>
                       </div>
                   </motion.div>
                   <motion.div
                     className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 border-l-4 border-[#f7c20e] italic text-slate-700 text-lg rounded-xl shadow-lg"
                     initial={{ opacity: 0, x: 30 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3 }}
                     whileHover={{ scale: 1.02 }}
                   >
                       "{lang === 'ar' 
                         ? 'Ù„Ø·Ø§Ù„Ù…Ø§ ÙƒØ§Ù† Ù…Ù†ØªØ¯Ù‰ Ø§Ù„Ø­ÙˆØ§Ø± Ø§Ù„ÙˆØ·Ù†ÙŠ Ø±Ù…Ø²Ø§Ù‹ Ù„Ù„ØªÙˆÙ‚ Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠ ÙÙŠ Ø³ÙˆØ±ÙŠØ§. Ø§Ù„ÙŠÙˆÙ…ØŒ Ù†Ø¹ÙŠØ¯ Ø¥Ø­ÙŠØ§Ø¡Ù‡.' 
                         : 'The Forum for National Dialogue has long been a symbol of democratic aspiration in Syria. Today, we revive it.'}"
                   </motion.div>
               </div>
             )}

             {activeTab === 1 && (
               <div>
                   <h3 className={`text-2xl text-[#1c3944] mb-6 ${t.serif}`}>{t.forum.activities.title}</h3>
                   <p className="text-slate-600 text-lg leading-relaxed mb-6">
                       {t.forum.activities.text}
                   </p>
                   <div className="grid md:grid-cols-3 gap-6">
                       {[1, 2, 3].map((i) => (
                           <motion.div
                             key={i}
                             className="p-6 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-[#f7c20e] transition-all"
                             initial={{ opacity: 0, y: 30 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: i * 0.1 }}
                             whileHover={{ y: -5, scale: 1.02 }}
                           >
                               <MessageSquare className="text-[#2c1d5f] mb-4" size={32} />
                               <h4 className={`text-lg ${t.serif} font-bold text-[#1c3944] mb-2`}>
                                 {lang === 'ar' ? `Ù†Ø´Ø§Ø· ${i}` : `Activity ${i}`}
                               </h4>
                               <p className="text-slate-700">
                                   {lang === 'ar' ? 'Ø¬Ù„Ø³Ø© Ø­ÙˆØ§Ø± Ø´Ù‡Ø±ÙŠØ© Ø­ÙˆÙ„ Ù…ÙˆØ¶ÙˆØ¹Ø§Øª Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„' : 'Monthly dialogue session on transition themes'}
                               </p>
                           </motion.div>
                       ))}
                   </div>
               </div>
             )}

             {activeTab === 2 && (
               <div className="grid md:grid-cols-2 gap-12">
                   <div>
                     <h3 className={`text-2xl text-[#1c3944] mb-6 ${t.serif}`}>{t.forum.events.title}</h3>
                     <p className="text-slate-600 mb-8 font-light">
                         {t.forum.events.text}
                     </p>

                     {/* Event List */}
                     <div className="space-y-4">
                       {upcomingEvents.map((event, idx) => (
                         <motion.div
                           key={idx}
                           className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-[#f7c20e] transition-all cursor-pointer"
                           initial={{ opacity: 0, x: -30 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           whileHover={{ x: 5, scale: 1.02 }}
                         >
                           <div className="flex items-start gap-4">
                             <motion.div
                               className="w-12 h-12 rounded-full bg-[#f7c20e] bg-opacity-20 flex items-center justify-center shrink-0"
                               whileHover={{ rotate: 360 }}
                               transition={{ duration: 0.6 }}
                             >
                               <event.icon className="text-[#1c3944]" size={24} />
                             </motion.div>
                             <div className="flex-1">
                               <div className="text-[#f7c20e] text-sm font-bold uppercase mb-1">
                                 {event.date}
                               </div>
                               <div className="font-bold text-lg mb-2 text-[#1c3944]">
                                 {event.title}
                               </div>
                               <div className="text-sm text-slate-500">
                                 {event.type}
                               </div>
                             </div>
                           </div>
                         </motion.div>
                       ))}
                     </div>
                   </div>

                   {/* CTA Card */}
                   <motion.div
                     className="bg-gradient-to-br from-[#2c1d5f] to-[#1c3944] text-white p-10 rounded-2xl relative overflow-hidden"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.4 }}
                   >
                     <motion.div
                       className="absolute top-0 right-0 w-64 h-64 bg-[#f7c20e] opacity-10 rounded-full blur-3xl"
                       animate={{
                         scale: [1, 1.2, 1],
                         opacity: [0.1, 0.2, 0.1],
                       }}
                       transition={{ duration: 4, repeat: Infinity }}
                     />

                     <div className="relative z-10">
                       <h3 className={`text-3xl mb-6 ${t.serif} flex items-center gap-3`}>
                           <Calendar className="text-[#f7c20e]" /> {t.forum.events.title}
                       </h3>
                       <p className="text-slate-300 mb-8 font-light text-lg leading-relaxed">
                           {lang === 'ar'
                             ? 'ÙƒÙ† Ø¬Ø²Ø¡Ø§Ù‹ Ù…Ù† Ø§Ù„Ø­ÙˆØ§Ø±. Ø´Ø§Ø±Ùƒ ÙÙŠ ÙØ¹Ø§Ù„ÙŠØ§ØªÙ†Ø§ Ø§Ù„Ù‚Ø§Ø¯Ù…Ø© ÙˆØ³Ø§Ù‡Ù… ÙÙŠ Ø¨Ù†Ø§Ø¡ Ù…Ø³ØªÙ‚Ø¨Ù„ Ø³ÙˆØ±ÙŠØ§.'
                             : 'Be part of the dialogue. Join our upcoming events and contribute to building Syria\'s future.'}
                       </p>

                       <Link href="/contact">
                           <motion.span
                             className="block w-full text-center bg-[#f7c20e] text-[#1c3944] py-4 font-bold mt-6 transition-colors cursor-pointer rounded-xl"
                             whileHover={{ backgroundColor: '#ffffff', scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                           >
                               {lang === 'ar' ? 'ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ù„Ù„Ø­Ø¶ÙˆØ±' : 'Contact Us to Attend'}
                           </motion.span>
                       </Link>
                     </div>
                   </motion.div>
               </div>
             )}

             {activeTab === 3 && (
                <div>
                    <div className="text-center mb-12">
                      <h3 className={`text-3xl text-[#1c3944] mb-4 ${t.serif}`}>{t.forum.memory.title}</h3>
                      <p className="text-slate-600 max-w-2xl mx-auto font-light">
                          {t.forum.memory.text}
                      </p>
                    </div>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {memoryPhotos.map((photo, idx) => (
                        <motion.div
                          key={photo.id}
                          className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-slate-100"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ y: -8, scale: 1.02 }}
                          onClick={() => setSelectedPhoto(photo)}
                        >
                          {/* Photo */}
                          <div className="relative h-64 overflow-hidden">
                            <motion.img
                              src={photo.image}
                              alt={lang === 'ar' ? photo.titleAr : photo.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            
                            {/* Golden Accent Bar */}
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-1 bg-[#f7c20e]"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: idx * 0.1 }}
                            />
                          </div>

                          {/* Info Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <div className="text-[#f7c20e] text-xs font-bold uppercase mb-1 flex items-center gap-2">
                              <Camera size={14} />
                              {photo.date}
                            </div>
                            <h4 className="font-bold text-base mb-1 line-clamp-2">
                              {lang === 'ar' ? photo.titleAr : photo.title}
                            </h4>
                            <p className="text-xs text-slate-300 line-clamp-2">
                              {lang === 'ar' ? photo.descriptionAr : photo.description}
                            </p>
                          </div>

                          {/* Hover Icon */}
                          <motion.div
                            className="absolute top-4 right-4 w-10 h-10 bg-[#f7c20e] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.4 }}
                          >
                            <Camera className="text-[#1c3944]" size={20} />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                </div>
              )}

             {activeTab === 4 && (
               <div className="grid md:grid-cols-2 gap-12">
                   <div>
                     <h3 className={`text-2xl text-[#1c3944] mb-6 ${t.serif}`}>{t.forum.archive.title}</h3>
                     <p className="text-slate-600 mb-8 font-light">
                         {t.forum.archive.text}
                     </p>

                     {/* Archive Items */}
                     <div className="space-y-4">
                       {archiveItems.map((item, idx) => (
                         <motion.div
                           key={idx}
                           className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-[#f7c20e] transition-all cursor-pointer"
                           initial={{ opacity: 0, x: -30 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           whileHover={{ x: 5, scale: 1.02 }}
                         >
                           <div className="flex items-start gap-4">
                             <motion.div
                               className="w-12 h-12 rounded-full bg-[#f7c20e] bg-opacity-20 flex items-center justify-center shrink-0"
                               whileHover={{ rotate: 360 }}
                               transition={{ duration: 0.6 }}
                             >
                               <FileText className="text-[#1c3944]" size={24} />
                             </motion.div>
                             <div className="flex-1">
                               <div className="text-[#f7c20e] text-sm font-bold uppercase mb-1">
                                 {item.date}
                               </div>
                               <div className="font-bold text-lg mb-2 text-[#1c3944]">
                                 {item.title}
                               </div>
                               <div className="text-sm text-slate-500">
                                 {item.description}
                               </div>
                             </div>
                           </div>
                         </motion.div>
                       ))}
                     </div>
                   </div>

                   {/* CTA Card */}
                   <motion.div
                     className="bg-gradient-to-br from-[#2c1d5f] to-[#1c3944] text-white p-10 rounded-2xl relative overflow-hidden"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.4 }}
                   >
                     <motion.div
                       className="absolute top-0 right-0 w-64 h-64 bg-[#f7c20e] opacity-10 rounded-full blur-3xl"
                       animate={{
                         scale: [1, 1.2, 1],
                         opacity: [0.1, 0.2, 0.1],
                       }}
                       transition={{ duration: 4, repeat: Infinity }}
                     />

                     <div className="relative z-10">
                       <h3 className={`text-3xl mb-6 ${t.serif} flex items-center gap-3`}>
                           <FileText className="text-[#f7c20e]" /> {t.forum.archive.title}
                       </h3>
                       <p className="text-slate-300 mb-8 font-light text-lg leading-relaxed">
                           {lang === 'ar'
                             ? 'Ø§ÙƒØªØ´Ù Ø£Ø±Ø´ÙŠÙÙ†Ø§. Ù‚Ù… Ø¨ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù‚Ø§Ù„Ø§Øª ÙˆØ§Ù„Ø¨Ø­ÙˆØ« ÙˆØ§Ù„ÙƒØªØ¨ ÙˆØ§Ù„ØªÙ‚Ø§Ø±ÙŠØ± Ø°Ø§Øª Ø§Ù„ØµÙ„Ø© Ø¨Ù…Ù†ØªØ¯Ù‰ Ø§Ù„Ø­ÙˆØ§Ø± Ø§Ù„ÙˆØ·Ù†ÙŠ.'
                             : 'Discover our archive. Download articles, research, books, and reports related to the Forum for National Dialogue.'}
                       </p>

                       <Link href="/contact">
                           <motion.span
                             className="block w-full text-center bg-[#f7c20e] text-[#1c3944] py-4 font-bold mt-6 transition-colors cursor-pointer rounded-xl"
                             whileHover={{ backgroundColor: '#ffffff', scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                           >
                               {lang === 'ar' ? 'ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ Ø§Ù„Ù…Ù„ÙØ§Øª' : 'Contact Us to Get Files'}
                           </motion.span>
                       </Link>
                     </div>
                   </motion.div>
               </div>
             )}

             {activeTab === 5 && (
               <div>
                   <div className="text-center mb-12">
                     <h3 className={`text-3xl text-[#1c3944] mb-4 ${t.serif}`}>{t.forum.management.title}</h3>
                     <p className="text-slate-600 max-w-2xl mx-auto font-light">
                         {t.forum.management.text}
                     </p>
                   </div>

                   {/* Management Team Cards Grid */}
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {managementTeam.map((member, idx) => (
                       <motion.div
                         key={member.id}
                         initial={{ opacity: 0, y: 40 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: idx * 0.1 }}
                         whileHover={{ y: -8, scale: 1.02 }}
                         onClick={() => setSelectedMember(member)}
                         className="bg-white border border-slate-200 hover:border-[#f7c20e] hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                       >
                         <div className="relative overflow-hidden h-64">
                           <motion.img
                             src={member.image}
                             alt={getMemberValue(member, 'name')}
                             className="w-full h-full object-cover"
                             whileHover={{ scale: 1.1 }}
                             transition={{ duration: 0.6 }}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                         </div>
                         <div className="p-6">
                           <h3 className={`text-xl ${t.serif} font-bold text-[#1c3944] mb-2`}>
                             {getMemberValue(member, 'name')}
                           </h3>
                           <p className="text-[#f7c20e] font-medium mb-3">
                             {getMemberValue(member, 'role')}
                           </p>
                           <p className="text-slate-600 text-sm line-clamp-3">
                             {getMemberValue(member, 'bio')}
                           </p>
                           <motion.div
                             className={`mt-4 text-[#1c3944] font-semibold text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                             whileHover={{ x: isRTL ? -5 : 5 }}
                           >
                             <span>{lang === 'ar' ? 'Ø§Ù‚Ø±Ø£ Ø§Ù„Ù…Ø²ÙŠØ¯' : 'Read More'}</span>
                             <span className="text-[#f7c20e]">â†’</span>
                           </motion.div>
                         </div>
                       </motion.div>
                     ))}
                   </div>
               </div>
             )}
           </motion.div>
       </div>

       {/* Photo Detail Modal */}
       <AnimatePresence>
         {selectedPhoto && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={() => setSelectedPhoto(null)}
           >
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative rounded-2xl"
               onClick={(e) => e.stopPropagation()}
             >
               {/* Close Button */}
               <button
                 onClick={() => setSelectedPhoto(null)}
                 className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
               >
                 <X className="text-[#1c3944]" size={20} />
               </button>

               {/* Photo Image */}
               <div className="relative h-96 overflow-hidden rounded-t-2xl">
                 <img
                   src={selectedPhoto.image}
                   alt={lang === 'ar' ? selectedPhoto.titleAr : selectedPhoto.title}
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                 <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} text-white`}>
                   <div className="flex items-center gap-2 text-[#f7c20e] text-sm font-bold uppercase mb-2">
                     <Camera size={16} />
                     {selectedPhoto.date}
                   </div>
                   <h2 className={`text-3xl ${t.serif} font-bold`}>
                     {lang === 'ar' ? selectedPhoto.titleAr : selectedPhoto.title}
                   </h2>
                 </div>
               </div>

               {/* Photo Details */}
               <div className="p-8">
                 <p className="text-slate-700 text-lg leading-relaxed">
                   {lang === 'ar' ? selectedPhoto.descriptionAr : selectedPhoto.description}
                 </p>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>

       {/* Management Member Detail Modal */}
       <AnimatePresence>
         {selectedMember && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={() => setSelectedMember(null)}
           >
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto relative rounded-2xl"
               onClick={(e) => e.stopPropagation()}
             >
               {/* Close Button */}
               <button
                 onClick={() => setSelectedMember(null)}
                 className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
               >
                 <X className="text-[#1c3944]" size={20} />
               </button>

               {/* Member Image */}
               <div className="relative h-80 overflow-hidden rounded-t-2xl">
                 <img
                   src={selectedMember.image}
                   alt={getMemberValue(selectedMember, 'name')}
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                 <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} text-white`}>
                   <h2 className={`text-3xl ${t.serif} font-bold mb-2`}>
                     {getMemberValue(selectedMember, 'name')}
                   </h2>
                   <p className="text-[#f7c20e] text-lg font-medium">
                     {getMemberValue(selectedMember, 'role')}
                   </p>
                 </div>
               </div>

               {/* Member Details */}
               <div className="p-8">
                 <p className="text-slate-700 text-lg leading-relaxed">
                   {getMemberValue(selectedMember, 'detailedBio')}
                 </p>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}






