import vastuHome from "../assets/content/vastu1.jpg";
import vastuBusiness from "../assets/content/vastu2.jpg";
import vastuSports from "../assets/content/vastu3.jpg";
import vastuCareer from "../assets/content/vastu4.jpg";
import vastuHealth from "../assets/content/vastu5.jpg";
import vastuRelationship from "../assets/content/vastu6.jpg";
import garnetImage from "../assets/content/stone_1.png";
import amethystImage from "../assets/content/stone_2.png";
import aquamarineImage from "../assets/content/stone_3.png";
import diamondImage from "../assets/content/stone_4.png";
import emeraldImage from "../assets/content/stone_5.png";
import alexandriteImage from "../assets/content/stone_6.png";
import rubyImage from "../assets/content/stone_7.png";
import peridotImage from "../assets/content/stone_8.png";
import sapphireImage from "../assets/content/stone_9.png";
import roseZirconImage from "../assets/content/stone_10.png";
import topazImage from "../assets/content/stone_11.png";
import blueZirconImage from "../assets/content/stone_12.png";

export const SERVICE_PAGES = {
  horoscope: {
    title: "Horoscope",
    category: "Vedic Astrology",
    symbol: "☼",
    heading: "There shall be signs in the Sun, the Moon, and the Stars",
    intro: "In Indian Vedic astrology, the Sun, Moon, planets and stars are traditionally interpreted through their positions and configurations. A horoscope, or Janam-Patri, is a birth chart based on the time and place of birth.",
    sections: [
      {
        title: "Know about Horoscope",
        text: "The configurations of planets and stars at the moment of birth are traditionally read as a way to explore inclinations, characteristics, strengths and challenges. A consultation looks at the basic placement of planets in your natal chart and discusses the questions most important to you.",
      },
      {
        title: "Know about Rune-Casting",
        text: "Rune-casting is a traditional divination practice that uses selected symbols as prompts for a question. Runes may be carved or painted on small pieces and cast, with the symbols that appear used to guide reflection. It is a symbolic practice rather than a guarantee of future events.",
      },
    ],
    signs: true,
  },
  tarot: {
    title: "Tarot Card",
    category: "Tarot Reading",
    symbol: "✧",
    heading: "Explore a question through the cards",
    intro: "A tarot session uses the imagery and traditional meanings of the cards to explore a question from different perspectives. The reading is a reflective conversation, not a promise of a fixed outcome.",
    sections: [
      { title: "Choose a focus", text: "Bring a question about a relationship, work, or a personal decision. We can help you frame it so the reading stays focused on the situation you want to understand." },
      { title: "Read the spread", text: "The cards and their positions offer symbolic themes to discuss. Together, we consider what feels relevant, which choices are available, and what you may want to look at more closely." },
      { title: "Take away perspective", text: "The session gives you space to reflect and identify possible next steps. Your decisions remain your own; tarot is not a substitute for professional advice." },
    ],
  },
  palmistry: {
    title: "Palmistry",
    category: "Palm Reading",
    symbol: "✋",
    heading: "Explore the traditions of Palmistry",
    intro: "Palmistry, also known as palm reading, chiromancy, or cheirology, is a traditional practice of interpreting lines and markings on the hand. Its interpretations are cultural beliefs, not scientifically established predictions.",
    sections: [
      {
        title: "What Is Palmistry",
        text: "Palmistry is the traditional practice of interpreting a person's character or possible life themes by analyzing lines and markings on the hand. It is also called palm reading, chiromancy, or cheirology. Scientific literature classifies palmistry as pseudoscience: there is no reliable evidence that palm features reveal psychological traits or predict a person's future.",
      },
      {
        title: "Origins and Traditions",
        text: "Some accounts trace palmistry to ancient India and describe it spreading to other regions, though its history is debated. It declined in popularity in parts of Europe during the Middle Ages and was revived in the 19th century as interest in occult traditions grew. Interpretations vary by culture and practitioner.",
      },
      {
        title: "Hands and the Lifeline",
        text: "Some traditions associate one hand with inborn qualities and the other with life experiences; which hand is assigned to each can vary. The lifeline is traditionally linked with vitality or major life changes, but it cannot assess health or lifespan. Palmistry is not medical advice; consult a qualified health professional about health concerns.",
      },
    ],
  },
  vastu: {
    title: "Vastu Shastra",
    category: "Space and Layout Guidance",
    symbol: "⌂",
    heading: "Vastu Tips and Solutions for Successful Spaces",
    intro: "Explore traditional Vastu perspectives on home, work and everyday spaces, with practical choices that respect your needs and the way you live.",
    sections: [
      {
        title: "What Is Vastu Shastra",
        text: "Vastu Shastra is a traditional Indian system of architecture. Texts describe principles of design, layout, measurements, ground preparation, space arrangement and spatial geometry. The tradition incorporates Hindu and Buddhist beliefs and seeks to relate buildings to nature through ideas such as yantra, symmetry and directional alignment.",
      },
      { title: "Review your space", text: "Describe the home or workplace and the areas you want to focus on. A simple floor plan, compass direction and a few photos can help explain the layout." },
      { title: "Choose changes that suit you", text: "Prioritize small, practical adjustments rather than making disruptive changes all at once. Vastu suggestions do not guarantee a particular outcome." },
    ],
    featureSection: {
      eyebrow: "Traditional ideas for everyday spaces",
      title: "Vastu Tips for Home, Work and More",
      intro: "These examples reflect common Vastu interpretations. Advice can vary across texts and practitioners, so use what suits your space and circumstances.",
      note: "Vastu is a cultural and spiritual tradition, not a guarantee of success, health or relationship outcomes. Keep building safety, accessibility, comfort and local codes first; consult qualified professionals for structural or health concerns.",
      cards: [
        {
          title: "Vastu for Home",
          image: vastuHome,
          alt: "A spacious home with a balanced, open layout",
          text: "Some Vastu traditions favor east- or north-facing entrances and recommend keeping the center and northeast areas open. Room placement suggestions differ, so adapt them to your home's layout and practical needs.",
        },
        {
          title: "Vastu for Business",
          image: vastuBusiness,
          alt: "A chessboard representing business planning",
          text: "Traditional guidance may emphasize clear circulation and an uncluttered central area. For offices and production spaces, prioritize safe routes, accessibility and an efficient workflow.",
        },
        {
          title: "Sports and Practice Spaces",
          image: vastuSports,
          alt: "A chess piece on a board representing strategy and practice",
          text: "The original sports advice about the sixth house and Mars is an astrology interpretation, not a Vastu rule. For a practice area, plan safe movement paths, adequate lighting and suitable ventilation.",
        },
        {
          title: "Vastu for Career",
          image: vastuCareer,
          alt: "A person planning a career at a desk",
          text: "Some traditions suggest facing north or east while working or studying. Treat this as a customary preference, not a predictor of career results; choose a comfortable, well-lit desk position.",
        },
        {
          title: "Vastu for Wellbeing",
          image: vastuHealth,
          alt: "A calm bedroom arranged for rest",
          text: "Traditional bedroom advice often favors a quiet, uncluttered room and a comfortable bed position. These ideas do not prevent or treat illness; prioritize sleep, accessibility and medical guidance.",
        },
        {
          title: "Vastu for Relationships",
          image: vastuRelationship,
          alt: "Two people discussing a home layout",
          text: "Some Vastu traditions associate the southwest with the primary bedroom and recommend a stable bed placement. These are cultural suggestions, not guarantees about relationships; comfort and communication matter.",
        },
      ],
    },
  },
  gemstones: {
    title: "Gemstones",
    category: "Traditional Gemstone Guidance",
    symbol: "◇",
    heading: "Know Your Lucky Gemstone",
    intro: "Gems and gemstones are materials cut and polished for jewelry and other ornamental uses. Many are minerals; some astrological traditions also assign stones symbolic meanings and planetary associations.",
    sections: [
      {
        title: "Know About Gemstones",
        text: "Gemstones are cut and polished for jewelry or ornament. Many are minerals: naturally occurring crystalline solids with characteristic chemical compositions. Their colors, hardness and inclusions vary, and treatments can affect their appearance.",
      },
      { title: "Traditional Planetary Associations", text: "Some Indian astrological traditions associate particular gemstones with planets. Meanings and recommendations vary; these associations are cultural beliefs rather than scientifically established effects." },
      { title: "Keep expectations realistic", text: "Gemstone guidance describes traditional beliefs and is not medical or financial advice. Never delay professional care or make a major decision solely because of a gemstone recommendation." },
    ],
    featureSection: {
      eyebrow: "Gemstones and their traditions",
      title: "Explore Twelve Gemstones",
      intro: "Learn about each stone's material characteristics alongside symbolic meanings found in gemstone and astrological traditions.",
      note: "Folklore and astrological associations are not evidence that a gemstone can heal, protect, or guarantee prosperity or success. If purchasing a stone, ask about its identity, treatments, quality and return policy. A purchase is optional.",
      cards: [
        { title: "Garnet", image: garnetImage, alt: "Red garnet gemstone", text: "January's traditional birthstone, garnet includes several related minerals and occurs in many colors. Folklore often connects it with friendship, commitment and protection." },
        { title: "Amethyst", image: amethystImage, alt: "Purple amethyst gemstone", text: "Amethyst is purple quartz, ranging from pale lilac to deep violet, and is the traditional birthstone for February. It is often associated symbolically with calm and clarity." },
        { title: "Aquamarine", image: aquamarineImage, alt: "Blue aquamarine gemstone", text: "A blue to blue-green variety of beryl and the traditional March birthstone. Its name and folklore have long linked it with the sea, hope and safe travel." },
        { title: "Diamond", image: diamondImage, alt: "Faceted diamond gemstone", text: "Diamond is crystalline carbon and the traditional April birthstone. It is commonly used in jewelry and symbolically associated with commitment and constancy." },
        { title: "Emerald", image: emeraldImage, alt: "Green emerald gemstone", text: "Emerald is the green variety of beryl. Its vivid color and natural inclusions are part of its character; tradition often associates it with renewal and loyalty." },
        { title: "Alexandrite", image: alexandriteImage, alt: "Color-changing alexandrite gemstone", text: "A variety of chrysoberyl prized for appearing greenish in daylight and reddish or purplish under warmer light. Folklore connects its color change with balance and transformation." },
        { title: "Ruby", image: rubyImage, alt: "Red ruby gemstone", text: "Ruby is red corundum, known as Manik in some Indian traditions and associated with the Sun in Vedic astrology. These symbolic links do not establish effects on confidence or career." },
        { title: "Peridot", image: peridotImage, alt: "Olive green peridot gemstone", text: "Peridot is a green variety of olivine and is notable for its characteristic color. Some folklore links it with abundance and good fortune." },
        { title: "Sapphire", image: sapphireImage, alt: "Blue sapphire gemstone", text: "Sapphire is corundum in colors other than red; trace elements create its range of hues. Blue sapphire is often associated in folklore with loyalty, serenity and wisdom." },
        { title: "Rose Zircon", image: roseZirconImage, alt: "Rose-colored zircon gemstone", text: "Zircon is a natural mineral that can occur in pink and other colors. Some stones are heat-treated to change or enhance their color; ask sellers to disclose treatments." },
        { title: "Topaz", image: topazImage, alt: "Golden topaz gemstone", text: "Topaz is a durable mineral found in a range of colors. It is the traditional November birthstone and is symbolically associated with good fortune and warmth." },
        { title: "Blue Zircon", image: blueZirconImage, alt: "Blue zircon gemstone", text: "Blue zircon is a natural gemstone, distinct from cubic zirconia. It is often linked in folklore with wisdom and protection; verify the stone's identity when buying." },
      ],
    },
  },
  numerology: {
    title: "Numerology",
    category: "Name and Birth-Date Numbers",
    symbol: "№",
    heading: "Explore the Secrets Numbers Hold",
    intro: "Numerology is a belief system about symbolic or mystical relationships between numbers and events. It may study numbers derived from a name or birth date; a life path number is one interpretation used in some systems.",
    sections: [
      { title: "What Is a Life Path Number", text: "In numerology, a life path number is commonly calculated from a person's birth date and given a traditional interpretation. Numerology also assigns numerical values to letters in names and ideas. These are spiritual beliefs, not scientific assessments." },
      { title: "Connect themes to your questions", text: "Discuss the interpretations that feel relevant to your goals, habits or decisions. Numerology is a spiritual tradition, not a scientific assessment or certain forecast." },
      { title: "Use it as a reflection tool", text: "Take away ideas to consider, not rules you must follow. Your choices and circumstances remain central to any decision." },
    ],
    featureSection: {
      eyebrow: "Traditional number meanings",
      title: "Explore Numbers One to Nine",
      intro: "Different numerology systems interpret numbers in different ways. These short descriptions summarize common themes as prompts for reflection, not fixed personality labels.",
      note: "Numerology is not a validated way to assess personality or predict events. Number and planetary correspondences vary by tradition; use these ideas for reflection rather than as rules for decisions.",
      cards: [
        { number: "1", tradition: "Often linked with the Sun", text: "Traditionally associated with initiative, independence and leadership. Some interpretations also caution against becoming overly self-focused or rigid." },
        { number: "2", tradition: "Often linked with the Moon", text: "Commonly connected with cooperation, patience and sensitivity. Traditional readings may encourage balancing consideration for others with clear boundaries." },
        { number: "3", tradition: "Often linked with Jupiter", text: "Often described through creativity, communication and optimism. Some readings emphasize using new ideas thoughtfully and consistently." },
        { number: "4", tradition: "Often linked with Rahu", text: "Traditionally associated with persistence, practical effort and structure. Readings may also encourage flexibility when plans change." },
        { number: "5", tradition: "Often linked with Mercury", text: "Common themes include curiosity, adaptability and communication. Traditional interpretations may suggest pausing before acting on impulse." },
        { number: "6", tradition: "Often linked with Venus", text: "Frequently associated with care, family and harmony. A reflective reading can also consider the importance of not taking on every responsibility." },
        { number: "7", tradition: "Often linked with Ketu", text: "Often connected with introspection, study and spiritual curiosity. These are symbolic themes, not indicators of mental health or ability." },
        { number: "8", tradition: "Planetary links vary", text: "Traditional readings often focus on discipline, ambition and balancing material and spiritual priorities. They do not predict financial outcomes." },
        { number: "9", tradition: "Often linked with Mars", text: "Common themes include compassion, service and completion. Interpretations should not be used to label someone as fortunate, aggressive or destined for a particular path." },
      ],
    },
  },
  "rune-casting": {
    title: "Rune-Casting",
    category: "Symbolic Reflection",
    symbol: "ᚱ",
    heading: "Explore meaning through traditional rune symbols",
    intro: "Rune-casting is a traditional divination practice that uses rune symbols as a focus for reflection. The symbols can help frame a question and prompt a conversation about possible perspectives.",
    sections: [
      { title: "Focus on a question", text: "Bring a topic you would like to consider. The session begins by clarifying what you want to reflect on, rather than treating a reading as a fixed prediction." },
      { title: "Explore the symbols", text: "A selected spread is discussed through the traditional meanings associated with its runes and positions. Interpretations are subjective and intended as prompts for thought." },
      { title: "Consider your next step", text: "Use the conversation to identify options and questions you may want to explore further. The reading does not replace professional guidance or your own judgment." },
    ],
  },
  pooja: {
    title: "Pooja",
    category: "Traditional Ritual Services",
    symbol: "🪔",
    heading: "Discuss a traditional devotional ceremony",
    intro: "Pooja is a devotional ritual in Hindu traditions. We can discuss available ceremonies, their traditional purpose and arrangements for an in-person or requested service.",
    sections: [
      { title: "Discuss the ceremony", text: "Tell us what you have in mind and any date or occasion you are planning for. We can explain the customary steps and which details need to be arranged." },
      { title: "Plan the arrangements", text: "Requirements depend on the ceremony and how it will be performed. Confirm the location, timing, materials and any costs before making a booking." },
      { title: "Respectful expectations", text: "Rituals can be meaningful expressions of faith and culture. No particular result can be guaranteed, and participation is always your choice." },
    ],
  },
};

export const ZODIAC_SIGNS = [
  ["♈", "Aries", "Mesh"],
  ["♉", "Taurus", "Vrushabh"],
  ["♊", "Gemini", "Mithun"],
  ["♋", "Cancer", "Karka"],
  ["♌", "Leo", "Sinh"],
  ["♍", "Virgo", "Kanya"],
  ["♎", "Libra", "Tula"],
  ["♏", "Scorpio", "Vrushchik"],
  ["♐", "Sagittarius", "Dhanu"],
  ["♑", "Capricorn", "Makar"],
  ["♒", "Aquarius", "Kumbha"],
  ["♓", "Pisces", "Meen"],
];
