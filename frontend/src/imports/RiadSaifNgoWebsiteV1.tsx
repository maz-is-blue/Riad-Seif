import svgPaths from "./svg-atnlem57gk";
import imgImageRiadSeifFoundation from "figma:asset/462f3900dc7745a950696b40f35112b146c08fcb.png";

function ImageRiadSeifFoundation() {
  return (
    <div className="absolute h-[64px] left-0 top-0 w-[63.825px]" data-name="Image (Riad Seif Foundation)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageRiadSeifFoundation} />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[120px] left-0 top-[88px] w-[554.4px]" data-name="Heading 1">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[60px] left-0 not-italic text-[60px] text-white top-px tracking-[0.16px] w-[516px]">Building a Just and Democratic Syria</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[84px] left-0 top-[232px] w-[554.4px]" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[20px] text-gray-200 top-[-0.6px] tracking-[0.16px] w-[537px]">The Riad Seif Foundation for Human Rights empowers civil society, fosters dialogue, and promotes accountability through training, research, and inclusive engagement.</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[116.68px] size-[20px] top-[15.6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #1C3944)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #1C3944)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute bg-[#f7c20e] h-[51.2px] left-0 rounded-[8px] top-0 w-[160.675px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[24px] not-italic text-[#1c3944] text-[16px] text-nowrap top-[13.8px] tracking-[0.16px] whitespace-pre">Learn More</p>
      <Icon />
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute border-[1.6px] border-solid border-white h-[51.2px] left-[176.68px] rounded-[8px] top-0 w-[143.55px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[24px] not-italic text-[16px] text-nowrap text-white top-[12.2px] tracking-[0.16px] whitespace-pre">Get Involved</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[51.2px] left-0 top-[348px] w-[554.4px]" data-name="Container">
      <Link />
      <Link1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[399.2px] left-0 top-0 w-[554.4px]" data-name="Container">
      <ImageRiadSeifFoundation />
      <Heading />
      <Paragraph />
      <Container />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[31.988px] left-[32px] top-[32px] w-[490.4px]" data-name="Heading 2">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#f7c20e] text-[24px] text-nowrap top-[-0.4px] tracking-[0.16px] whitespace-pre">Our Vision</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[72px] left-[32px] top-[79.99px] w-[490.4px]" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-gray-200 top-[0.2px] tracking-[0.16px] w-[488px]">A just and democratic Syria where all individuals, especially women and marginalized communities, can shape public life and lead sustainable peace, development, and inclusive empowerment.</p>
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[31.988px] left-[32px] top-[175.99px] w-[490.4px]" data-name="Heading 2">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#f7c20e] text-[24px] text-nowrap top-[-0.4px] tracking-[0.16px] whitespace-pre">Our Mission</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[120px] left-[32px] top-[223.98px] w-[490.4px]" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-gray-200 top-[0.2px] tracking-[0.16px] w-[481px]">To advance justice, human rights, and inclusive democratic reform in Syria by empowering local civil society actors and human rights defenders, primarily women, while fostering public dialogue and building a civic and legal culture rooted in Syrian realities and values.</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] h-[375.975px] left-[602.4px] rounded-[10px] top-[11.61px] w-[554.4px]" data-name="Container">
      <Heading1 />
      <Paragraph1 />
      <Heading3 />
      <Paragraph2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[399.2px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#1c3944] h-[655.2px] items-start left-0 pb-0 pt-[128px] px-[32px] to-[#2c1d5f] top-0 w-[1220.8px]" data-name="Section">
      <Container3 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[40px] left-[578.48px] not-italic text-[#1c3944] text-[36px] text-center text-nowrap top-[0.2px] tracking-[0.16px] translate-x-[-50%] whitespace-pre">Explore Our Work</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-[578.71px] not-italic text-[#4a5565] text-[20px] text-center text-nowrap top-[-0.6px] tracking-[0.16px] translate-x-[-50%] whitespace-pre">{`Discover how we're building a just and democratic future for Syria`}</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Paragraph3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M16 4V28" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p21592a80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p34971400} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.pbffdae0} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M9.33333 28H22.6667" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Home() {
  return (
    <div className="absolute bg-[#2c1d5f] content-stretch flex items-center justify-center left-[24px] rounded-[10px] size-[64px] top-[24px]" data-name="Home">
      <Icon1 />
    </div>
  );
}

function Home1() {
  return (
    <div className="absolute h-[28px] left-[24px] top-[104px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#1c3944] text-[20px] text-nowrap top-[-0.6px] tracking-[0.16px] whitespace-pre">About the Foundation</p>
    </div>
  );
}

function Home2() {
  return (
    <div className="absolute h-[96px] left-[24px] top-[144px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[0.2px] tracking-[0.16px] w-[220px]">Learn about our mission to advance justice, human rights, and inclusive democratic reform in Syria.</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[91.94px] size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #F7C20E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #F7C20E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Home3() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[256px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#f7c20e] text-[16px] text-nowrap top-[0.2px] tracking-[0.16px] whitespace-pre">Learn more</p>
      <Icon2 />
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute bg-white h-[332px] left-0 rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-0 w-[271.2px]" data-name="Link">
      <Home />
      <Home1 />
      <Home2 />
      <Home3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p27a3200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2db021c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p18f42980} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2ee517c0} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Home4() {
  return (
    <div className="absolute bg-[#2872b8] content-stretch flex items-center justify-center left-[24px] rounded-[10px] size-[64px] top-[24px]" data-name="Home">
      <Icon3 />
    </div>
  );
}

function Home5() {
  return (
    <div className="absolute h-[56px] left-[24px] top-[104px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#1c3944] text-[20px] top-[-0.6px] tracking-[0.16px] w-[175px]">Forum for National Dialogue</p>
    </div>
  );
}

function Home6() {
  return (
    <div className="absolute h-[96px] left-[24px] top-[172px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[0.2px] tracking-[0.16px] w-[221px]">{`A civic space for diverse voices to discuss Syria's transition, justice, democracy, and inclusion.`}</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[91.94px] size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #F7C20E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #F7C20E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Home7() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[284px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#f7c20e] text-[16px] text-nowrap top-[0.2px] tracking-[0.16px] whitespace-pre">Learn more</p>
      <Icon4 />
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute bg-white h-[332px] left-[295.2px] rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-0 w-[271.2px]" data-name="Link">
      <Home4 />
      <Home5 />
      <Home6 />
      <Home7 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M16 9.33333V28" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p308d0700} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Home8() {
  return (
    <div className="absolute bg-[#7d3d99] content-stretch flex items-center justify-center left-[24px] rounded-[10px] size-[64px] top-[24px]" data-name="Home">
      <Icon5 />
    </div>
  );
}

function Home9() {
  return (
    <div className="absolute h-[28px] left-[24px] top-[104px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#1c3944] text-[20px] text-nowrap top-[-0.6px] tracking-[0.16px] whitespace-pre">Human Rights Center</p>
    </div>
  );
}

function Home10() {
  return (
    <div className="absolute h-[96px] left-[24px] top-[144px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[0.2px] tracking-[0.16px] w-[223px]">{`Empowering lawyers and defenders with training, mentoring, and networking for Syria's democratic future.`}</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[91.94px] size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #F7C20E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #F7C20E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Home11() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[256px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#f7c20e] text-[16px] text-nowrap top-[0.2px] tracking-[0.16px] whitespace-pre">Learn more</p>
      <Icon6 />
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute bg-white h-[332px] left-[590.4px] rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-0 w-[271.2px]" data-name="Link">
      <Home8 />
      <Home9 />
      <Home10 />
      <Home11 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p34cd2e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2a4f62c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M13.3333 12H10.6667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M21.3333 17.3333H10.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M21.3333 22.6667H10.6667" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Home12() {
  return (
    <div className="absolute bg-[#1c3944] content-stretch flex items-center justify-center left-[24px] rounded-[10px] size-[64px] top-[24px]" data-name="Home">
      <Icon7 />
    </div>
  );
}

function Home13() {
  return (
    <div className="absolute h-[28px] left-[24px] top-[104px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#1c3944] text-[20px] text-nowrap top-[-0.6px] tracking-[0.16px] whitespace-pre">Publications</p>
    </div>
  );
}

function Home14() {
  return (
    <div className="absolute h-[96px] left-[24px] top-[144px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[0.2px] tracking-[0.16px] w-[206px]">Research, policy papers, and legal resources supporting transitional justice and democratic reform.</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[91.94px] size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #F7C20E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #F7C20E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Home15() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[256px] w-[223.2px]" data-name="Home">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#f7c20e] text-[16px] text-nowrap top-[0.2px] tracking-[0.16px] whitespace-pre">Learn more</p>
      <Icon8 />
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute bg-white h-[332px] left-[885.6px] rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-0 w-[271.2px]" data-name="Link">
      <Home12 />
      <Home13 />
      <Home14 />
      <Home15 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[332px] relative shrink-0 w-full" data-name="Container">
      <Link2 />
      <Link3 />
      <Link4 />
      <Link5 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute bg-gray-50 content-stretch flex flex-col gap-[48px] h-[464px] items-start left-0 px-[32px] py-0 top-[719.2px] w-[1220.8px]" data-name="Section">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[554.4px]" data-name="Heading 2">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[40px] left-0 not-italic text-[#1c3944] text-[36px] text-nowrap top-[0.2px] tracking-[0.16px] whitespace-pre">About Riad Seif</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[112px] left-0 top-[64px] w-[554.4px]" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#364153] text-[18px] top-[0.2px] tracking-[0.16px] w-[554px]">{`Riad Seif (b. 1946) is remembered as one of Syria's most courageous voices for freedom, democracy, and justice. A successful entrepreneur turned parliamentarian, he dared to expose corruption and call for reform in the 1990s.`}</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[112px] left-0 top-[192px] w-[554.4px]" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#364153] text-[18px] top-[0.2px] tracking-[0.16px] w-[537px]">During the Damascus Spring, he founded the Forum for National Dialogue, opening his own home to thinkers and citizens seeking a more democratic Syria. For this courage, he lost his business, his freedom, and spent more than eight years in prison.</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[84px] left-0 top-[320px] w-[554.4px]" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#364153] text-[18px] top-[0.2px] tracking-[0.16px] w-[521px]">The Riad Seif Foundation for Human Rights carries forward this legacy, transforming his values into a living project for justice, inclusion, and democratic renewal in Syria.</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[149.9px] size-[20px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #2872B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #2872B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute h-[24px] left-0 top-[428px] w-[169.9px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2872b8] text-[16px] text-nowrap top-[0.2px] tracking-[0.16px] whitespace-pre">Read full biography</p>
      <Icon9 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[452px] left-[32px] top-[64px] w-[554.4px]" data-name="Container">
      <Heading5 />
      <Paragraph4 />
      <Paragraph5 />
      <Paragraph6 />
      <Link6 />
    </div>
  );
}

function Quote() {
  return (
    <div className="absolute h-[84px] left-[32px] top-[32px] w-[490.4px]" data-name="Quote">
      <p className="absolute font-['Tinos:Italic',sans-serif] italic leading-[28px] left-0 text-[20px] text-white top-[-0.6px] tracking-[0.16px] w-[456px]">{`"Democracy and human rights are not luxuries – they are necessities for the dignity and freedom of every Syrian."`}</p>
    </div>
  );
}

function Cite() {
  return (
    <div className="absolute content-stretch flex h-[17.6px] items-start left-[32px] top-[135.2px] w-[84.088px]" data-name="Cite">
      <p className="basis-0 font-['Tinos:Italic',sans-serif] grow italic leading-[24px] min-h-px min-w-px relative shrink-0 text-[#f7c20e] text-[16px] tracking-[0.16px]">— Riad Seif</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-[-0.6px] tracking-[0.16px] whitespace-pre">Legacy Highlights</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[0.2px] tracking-[0.16px] w-[470px]">• Founded Forum for National Dialogue during Damascus Spring</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[0.2px] tracking-[0.16px] w-[340px]">• Over 8 years imprisoned for political activism</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[0.2px] tracking-[0.16px] w-[296px]">• Key figure in shaping Syrian opposition</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[0.2px] tracking-[0.16px] w-[419px]">{`• Proposed the "Riad Seif Plan" to unify opposition groups`}</p>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[196.8px] items-start left-[32px] pb-0 pt-[32.8px] px-0 top-[188px] w-[490.4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#4a5565] border-[0.8px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Heading2 />
      <List />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[#1c3944] h-[416.8px] left-[634.4px] rounded-[10px] top-[81.6px] w-[554.4px]" data-name="Container">
      <Quote />
      <Cite />
      <Container7 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute bg-white h-[580px] left-0 top-[1247.2px] w-[1220.8px]" data-name="Section">
      <Container6 />
      <Container8 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[40px] left-[578.1px] not-italic text-[#1c3944] text-[36px] text-center text-nowrap top-[0.2px] tracking-[0.16px] translate-x-[-50%] whitespace-pre">Latest Updates</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-[578.58px] not-italic text-[#4a5565] text-[20px] text-center text-nowrap top-[-0.6px] tracking-[0.16px] translate-x-[-50%] whitespace-pre">Stay informed about our ongoing work and initiatives</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Paragraph7 />
    </div>
  );
}

function Container10() {
  return <div className="bg-[#2872b8] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function Container11() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[24px] w-[316.263px]" data-name="Container">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] text-nowrap top-[-0.4px] tracking-[0.16px] whitespace-pre">December 2024</p>
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute h-[56px] left-[24px] top-[52px] w-[316.263px]" data-name="Heading 3">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#1c3944] text-[20px] top-[-0.6px] tracking-[0.16px] w-[260px]">Forum for National Dialogue Relaunched</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[96px] left-[24px] top-[120px] w-[316.263px]" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#364153] text-[16px] top-[0.2px] tracking-[0.16px] w-[311px]">{`Following Syria's transition, we have relaunched the historic Forum for National Dialogue to provide a space for civic engagement and democratic discussion.`}</p>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[91.94px] size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #2872B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #2872B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[232px] w-[107.938px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2872b8] text-[16px] text-nowrap top-[0.2px] tracking-[0.16px] whitespace-pre">Learn more</p>
      <Icon10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[280px] relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Heading7 />
      <Paragraph8 />
      <Link7 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[288px] items-start left-0 overflow-clip rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-0 w-[364.263px]" data-name="Container">
      <Container10 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return <div className="bg-[#7d3d99] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function Container15() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[24px] w-[316.263px]" data-name="Container">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] text-nowrap top-[-0.4px] tracking-[0.16px] whitespace-pre">Ongoing</p>
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[28px] left-[24px] top-[52px] w-[316.263px]" data-name="Heading 3">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#1c3944] text-[20px] text-nowrap top-[-0.6px] tracking-[0.16px] whitespace-pre">Human Rights Training Programs</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[96px] left-[24px] top-[92px] w-[316.263px]" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#364153] text-[16px] top-[0.2px] tracking-[0.16px] w-[313px]">Our comprehensive training curriculum for Syrian lawyers and human rights defenders is now underway, focusing on transitional justice and advocacy.</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[91.94px] size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #2872B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #2872B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Link8() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[204px] w-[107.938px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2872b8] text-[16px] text-nowrap top-[0.2px] tracking-[0.16px] whitespace-pre">Learn more</p>
      <Icon11 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[252px] relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Heading8 />
      <Paragraph9 />
      <Link8 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[288px] items-start left-[396.26px] overflow-clip rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-0 w-[364.263px]" data-name="Container">
      <Container14 />
      <Container16 />
    </div>
  );
}

function Container18() {
  return <div className="bg-[#f7c20e] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function Container19() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[24px] w-[316.275px]" data-name="Container">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] text-nowrap top-[-0.4px] tracking-[0.16px] whitespace-pre">New</p>
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute h-[28px] left-[24px] top-[52px] w-[316.275px]" data-name="Heading 3">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#1c3944] text-[20px] text-nowrap top-[-0.6px] tracking-[0.16px] whitespace-pre">Publications Repository</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[72px] left-[24px] top-[92px] w-[316.275px]" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#364153] text-[16px] top-[0.2px] tracking-[0.16px] w-[315px]">Access our growing collection of research papers, policy briefs, and legal resources on transitional justice and democratic reform.</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[154.09px] size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #2872B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #2872B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Link9() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[180px] w-[170.088px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2872b8] text-[16px] text-nowrap top-[0.2px] tracking-[0.16px] whitespace-pre">Browse publications</p>
      <Icon12 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[228px] relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Heading9 />
      <Paragraph10 />
      <Link9 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[288px] items-start left-[792.53px] overflow-clip rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-0 w-[364.275px]" data-name="Container">
      <Container18 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[288px] relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container17 />
      <Container21 />
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute bg-gray-50 content-stretch flex flex-col gap-[48px] h-[420px] items-start left-0 px-[32px] py-0 top-[1891.2px] w-[1220.8px]" data-name="Section">
      <Container9 />
      <Container22 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[40px] left-[416.02px] not-italic text-[36px] text-center text-nowrap text-white top-[0.2px] tracking-[0.16px] translate-x-[-50%] whitespace-pre">{`Join Us in Building Syria's Democratic Future`}</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[28px] left-[416.29px] not-italic text-[20px] text-center text-gray-200 top-[-0.6px] tracking-[0.16px] translate-x-[-50%] w-[832px]">{`Whether you're a civil society activist, human rights defender, or concerned citizen, there are many ways to engage with our work.`}</p>
    </div>
  );
}

function Link10() {
  return (
    <div className="absolute bg-[#f7c20e] h-[51.2px] left-[140.99px] rounded-[8px] top-0 w-[181.4px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[91px] not-italic text-[#1c3944] text-[16px] text-center text-nowrap top-[12.2px] tracking-[0.16px] translate-x-[-50%] whitespace-pre">Apply for Training</p>
    </div>
  );
}

function Link11() {
  return (
    <div className="absolute border-[1.6px] border-solid border-white h-[51.2px] left-[338.39px] rounded-[8px] top-0 w-[206.213px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[102.5px] not-italic text-[16px] text-center text-nowrap text-white top-[12.2px] tracking-[0.16px] translate-x-[-50%] whitespace-pre">Attend Forum Events</p>
    </div>
  );
}

function Link12() {
  return (
    <div className="absolute border-[1.6px] border-solid border-white h-[51.2px] left-[560.6px] rounded-[8px] top-0 w-[130.413px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[64px] not-italic text-[16px] text-center text-nowrap text-white top-[12.2px] tracking-[0.16px] translate-x-[-50%] whitespace-pre">Contact Us</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[51.2px] relative shrink-0 w-full" data-name="Container">
      <Link10 />
      <Link11 />
      <Link12 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[203.2px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] h-[203.2px] items-start px-[32px] py-0 relative w-full">
          <Heading10 />
          <Paragraph11 />
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#2c1d5f] h-[331.2px] items-start left-0 pb-0 pt-[64px] px-[162.4px] to-[#2872b8] top-[2375.2px] w-[1220.8px]" data-name="Section">
      <Container24 />
    </div>
  );
}

function Home16() {
  return (
    <div className="h-[2706.4px] relative shrink-0 w-[1220.8px]" data-name="Home">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[2706.4px] relative w-[1220.8px]">
        <Section />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </div>
    </div>
  );
}

function ImageRiadSeifFoundation1() {
  return (
    <div className="absolute h-[48px] left-0 top-0 w-[47.862px]" data-name="Image (Riad Seif Foundation)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageRiadSeifFoundation} />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[45.5px] left-0 top-[64px] w-[265.2px]" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[22.75px] left-0 not-italic text-[#d1d5dc] text-[14px] top-[0.2px] tracking-[0.16px] w-[236px]">Advancing justice, human rights, and inclusive democratic reform in Syria.</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute h-[144px] left-0 top-0 w-[265.2px]" data-name="Container">
      <ImageRiadSeifFoundation1 />
      <Paragraph12 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#f7c20e] text-[16px] text-nowrap top-[0.2px] tracking-[0.4px] whitespace-pre">Quick Links</p>
    </div>
  );
}

function Link13() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[1.6px] w-[139.475px]" data-name="Link">
      <p className="basis-0 font-['Tinos:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[14px] tracking-[0.16px]">About the Foundation</p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link13 />
    </div>
  );
}

function Link14() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[1.6px] w-[138.375px]" data-name="Link">
      <p className="basis-0 font-['Tinos:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[14px] tracking-[0.16px]">Human Rights Center</p>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link14 />
    </div>
  );
}

function Link15() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[1.6px] w-[183.1px]" data-name="Link">
      <p className="basis-0 font-['Tinos:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[14px] tracking-[0.16px]">Forum for National Dialogue</p>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link15 />
    </div>
  );
}

function Link16() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[1.6px] w-[78.675px]" data-name="Link">
      <p className="basis-0 font-['Tinos:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[14px] tracking-[0.16px]">Publications</p>
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link16 />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
      <ListItem7 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[144px] items-start left-[297.2px] top-0 w-[265.2px]" data-name="Container">
      <Heading11 />
      <List1 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#f7c20e] text-[16px] text-nowrap top-[0.2px] tracking-[0.4px] whitespace-pre">Contact</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-0 size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[20px] left-[24px] top-0 w-[104.625px]" data-name="Text">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] text-nowrap top-[-0.4px] tracking-[0.16px] whitespace-pre">Damascus, Syria</p>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Icon13 />
      <Text />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2f8e7e80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17070980} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Link17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[180.663px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[20px] relative w-[180.663px]">
        <p className="absolute font-['Tinos:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] text-nowrap top-[-0.4px] tracking-[0.16px] whitespace-pre">info@riadseiffoundation.org</p>
      </div>
    </div>
  );
}

function ListItem9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="List Item">
      <Icon14 />
      <Link17 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_5_351)" id="Icon">
          <path d={svgPaths.p26187580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_5_351">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[134.788px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[20px] relative w-[134.788px]">
        <p className="absolute font-['Tinos:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] text-nowrap top-[-0.4px] tracking-[0.16px] whitespace-pre">+963 XXX XXX XXX</p>
      </div>
    </div>
  );
}

function ListItem10() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="List Item">
      <Icon15 />
      <Text1 />
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[84px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem8 />
      <ListItem9 />
      <ListItem10 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[144px] items-start left-[594.4px] top-0 w-[265.2px]" data-name="Container">
      <Heading12 />
      <List2 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#f7c20e] text-[16px] text-nowrap top-[0.2px] tracking-[0.4px] whitespace-pre">Follow Us</p>
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[8.33%] left-[29.17%] right-1/4 top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%_-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 19">
            <path d={svgPaths.p1f29de80} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Link18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-[20px]">
        <Icon16 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[16.63%_8.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5%_-5.91%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 16">
            <path d={svgPaths.p3693ea00} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Link19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-[20px]">
        <Icon17 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[33.33%_8.33%_12.5%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-7.69%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
            <path d={svgPaths.p21836480} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-[8.33%] right-3/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 12">
            <path d={svgPaths.p1a426680} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[8.33%] right-3/4 top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p29efb800} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Link20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-[20px]">
        <Icon18 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[16px] h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <Link18 />
      <Link19 />
      <Link20 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[144px] items-start left-[891.6px] top-0 w-[265.2px]" data-name="Container">
      <Heading13 />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[144px] relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container26 />
      <Container27 />
      <Container29 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[20px] left-[578.71px] not-italic text-[#99a1af] text-[14px] text-center text-nowrap top-[-0.4px] tracking-[0.16px] translate-x-[-50%] whitespace-pre">© 2025 Riad Seif Foundation for Human Rights. All rights reserved.</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col h-[52.8px] items-start pb-0 pt-[32.8px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#364153] border-[0.8px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Paragraph13 />
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[324.8px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[32px] h-[324.8px] items-start pb-0 pt-[48px] px-[32px] relative w-full">
          <Container30 />
          <Container31 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#1c3944] h-[328.8px] relative shrink-0 w-[1220.8px]" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#f7c20e] border-[4px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-[328.8px] items-start pb-0 pt-[4px] px-0 relative w-[1220.8px]">
        <Container32 />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[64px] h-[3180px] items-start left-0 pb-0 pt-[80.8px] px-0 top-0 w-[1220.8px]" data-name="App">
      <Home16 />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="h-[40px] relative shrink-0 w-[39.888px]" data-name="Header">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageRiadSeifFoundation} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[40px] w-[39.888px]" />
    </div>
  );
}

function Header1() {
  return (
    <div className="h-[48px] relative shrink-0 w-[185.875px]" data-name="Header">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[48px] relative w-[185.875px]">
        <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-white top-[0.2px] tracking-[0.4px] w-[180px]">Riad Seif Human Rights Foundation</p>
      </div>
    </div>
  );
}

function Link21() {
  return (
    <div className="h-[48px] relative shrink-0 w-[237.762px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] h-[48px] items-center relative w-[237.762px]">
        <Header />
        <Header1 />
      </div>
    </div>
  );
}

function Link22() {
  return (
    <div className="absolute bg-[#f7c20e] h-[40px] left-0 rounded-[8px] top-[24px] w-[68.138px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[12px] not-italic text-[#1c3944] text-[16px] text-nowrap top-[8.2px] tracking-[0.16px] whitespace-pre">Home</p>
    </div>
  );
}

function Link23() {
  return (
    <div className="absolute h-[64px] left-[72.14px] rounded-[8px] top-[12px] w-[111.213px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[12px] not-italic text-[16px] text-white top-[8.2px] tracking-[0.16px] w-[85px]">About the Foundation</p>
    </div>
  );
}

function Link24() {
  return (
    <div className="absolute h-[64px] left-[187.35px] rounded-[8px] top-[12px] w-[133.413px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[12px] not-italic text-[16px] text-white top-[8.2px] tracking-[0.16px] w-[99px]">{`About Riad & Joumana Seif`}</p>
    </div>
  );
}

function Link25() {
  return (
    <div className="absolute h-[88px] left-[324.76px] rounded-[8px] top-0 w-[110.525px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[12px] not-italic text-[16px] text-white top-[8.2px] tracking-[0.16px] w-[55px]">Human Rights Center</p>
    </div>
  );
}

function Link26() {
  return (
    <div className="absolute h-[88px] left-[439.29px] rounded-[8px] top-0 w-[138.475px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[12px] not-italic text-[16px] text-white top-[8.2px] tracking-[0.16px] w-[74px]">Forum for National Dialogue</p>
    </div>
  );
}

function Link27() {
  return (
    <div className="absolute h-[40px] left-[581.76px] rounded-[8px] top-[24px] w-[113.65px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[12px] not-italic text-[16px] text-nowrap text-white top-[8.2px] tracking-[0.16px] whitespace-pre">Publications</p>
    </div>
  );
}

function Link28() {
  return (
    <div className="absolute h-[40px] left-[699.41px] rounded-[8px] top-[24px] w-[79.85px]" data-name="Link">
      <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[12px] not-italic text-[16px] text-nowrap text-white top-[8.2px] tracking-[0.16px] whitespace-pre">Contact</p>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_5_297)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #F7C20E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p14d10c00} id="Vector_2" stroke="var(--stroke-0, #F7C20E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 8H14.6667" id="Vector_3" stroke="var(--stroke-0, #F7C20E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_5_297">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f7c20e] h-[32px] relative rounded-[8px] shrink-0 w-[47.05px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[32px] relative w-[47.05px]">
        <p className="absolute font-['Tinos:Regular',sans-serif] leading-[24px] left-[24px] not-italic text-[#1c3944] text-[16px] text-center text-nowrap top-[4.2px] tracking-[0.16px] translate-x-[-50%] whitespace-pre">EN</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[32.713px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[32px] relative w-[32.713px]">
        <p className="absolute font-['Tinos:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[24px] left-[16.5px] text-[16px] text-center text-nowrap text-white top-[4.2px] tracking-[0.16px] translate-x-[-50%] whitespace-pre" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
          ع
        </p>
      </div>
    </div>
  );
}

function LanguageSwitcher() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[16px] h-[40px] items-center left-[783.26px] pl-[12px] pr-0 py-0 rounded-[10px] top-[24px] w-[135.762px]" data-name="LanguageSwitcher">
      <Icon19 />
      <Button />
      <Button1 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="h-[88px] relative shrink-0 w-[919.038px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[88px] relative w-[919.038px]">
        <Link22 />
        <Link23 />
        <Link24 />
        <Link25 />
        <Link26 />
        <Link27 />
        <Link28 />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex h-[80px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Link21 />
      <Navigation />
    </div>
  );
}

function Header2() {
  return (
    <div className="absolute bg-[#1c3944] content-stretch flex flex-col h-[80.8px] items-start left-0 pb-[0.8px] pt-0 px-[32px] top-0 w-[1220.8px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-[rgba(247,194,14,0.2)] border-solid inset-0 pointer-events-none shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Container33 />
    </div>
  );
}

export default function RiadSaifNgoWebsiteV() {
  return (
    <div className="bg-white relative size-full" data-name="Riad Saif NGO Website V1">
      <App />
      <Header2 />
    </div>
  );
}