// Project content — ported from the PDF portfolio. Figures are numbered automatically on the page.
import type { StaticImageData } from 'next/image';
import img_bsten_pa_cover from '@/assets/projects/bsten-pa/cover.jpg';
import img_bsten_pa_01_exploded_villa from '@/assets/projects/bsten-pa/01-exploded-villa.jpg';
import img_bsten_pa_02_villas_curve from '@/assets/projects/bsten-pa/02-villas-curve.jpg';
import img_bsten_pa_03_cottages from '@/assets/projects/bsten-pa/03-cottages.jpg';
import img_bsten_pa_04_suites_pool from '@/assets/projects/bsten-pa/04-suites-pool.jpg';
import img_bsten_pa_05_site_isometric from '@/assets/projects/bsten-pa/05-site-isometric.jpg';
import img_bsten_pa_06_exploded_axonometric from '@/assets/projects/bsten-pa/06-exploded-axonometric.jpg';
import img_bsten_pa_07_site_plan from '@/assets/projects/bsten-pa/07-site-plan.jpg';
import img_bsten_pa_08_site_section from '@/assets/projects/bsten-pa/08-site-section.jpg';
import img_bsten_pa_09_site_elevation from '@/assets/projects/bsten-pa/09-site-elevation.jpg';
import img_bsten_pa_10_longitudinal_section from '@/assets/projects/bsten-pa/10-longitudinal-section.jpg';
import img_bsten_pa_11_render_aerial from '@/assets/projects/bsten-pa/11-render-aerial.jpg';
import img_bsten_pa_12_render_restaurant from '@/assets/projects/bsten-pa/12-render-restaurant.jpg';
import img_bsten_pa_13_render_suite from '@/assets/projects/bsten-pa/13-render-suite.jpg';
import img_la_khung_cover from '@/assets/projects/la-khung/cover.jpg';
import img_la_khung_01_terrace_levels from '@/assets/projects/la-khung/01-terrace-levels.jpg';
import img_la_khung_02_sit_out from '@/assets/projects/la-khung/02-sit-out.jpg';
import img_la_khung_03_stepped_sequence from '@/assets/projects/la-khung/03-stepped-sequence.jpg';
import img_la_khung_04_corner_cores from '@/assets/projects/la-khung/04-corner-cores.jpg';
import img_la_khung_05_site_isometric from '@/assets/projects/la-khung/05-site-isometric.jpg';
import img_la_khung_06_floor_plans from '@/assets/projects/la-khung/06-floor-plans.jpg';
import img_la_khung_07_site_plan from '@/assets/projects/la-khung/07-site-plan.jpg';
import img_la_khung_08_front_elevation from '@/assets/projects/la-khung/08-front-elevation.jpg';
import img_la_khung_09_site_section from '@/assets/projects/la-khung/09-site-section.jpg';
import img_la_khung_10_longitudinal_section from '@/assets/projects/la-khung/10-longitudinal-section.jpg';
import img_la_khung_11_render_terraces from '@/assets/projects/la-khung/11-render-terraces.jpg';
import img_la_khung_12_render_pergola from '@/assets/projects/la-khung/12-render-pergola.jpg';
import img_la_khung_13_render_entrance from '@/assets/projects/la-khung/13-render-entrance.jpg';
import img_sdod_khang_cover from '@/assets/projects/sdod-khang/cover.jpg';
import img_sdod_khang_01_terrace_levels from '@/assets/projects/sdod-khang/01-terrace-levels.jpg';
import img_sdod_khang_02_commercial_block from '@/assets/projects/sdod-khang/02-commercial-block.jpg';
import img_sdod_khang_03_typical_floor from '@/assets/projects/sdod-khang/03-typical-floor.jpg';
import img_sdod_khang_04_retaining_walls from '@/assets/projects/sdod-khang/04-retaining-walls.jpg';
import img_sdod_khang_05_site_isometric from '@/assets/projects/sdod-khang/05-site-isometric.jpg';
import img_sdod_khang_08_site_plan from '@/assets/projects/sdod-khang/08-site-plan.jpg';
import img_sdod_khang_06_unit_plans from '@/assets/projects/sdod-khang/06-unit-plans.jpg';
import img_sdod_khang_07_site_section from '@/assets/projects/sdod-khang/07-site-section.jpg';
import img_sdod_khang_09_longitudinal_section from '@/assets/projects/sdod-khang/09-longitudinal-section.jpg';
import img_sdod_khang_10_render_courtyard from '@/assets/projects/sdod-khang/10-render-courtyard.jpg';
import img_working_drawing_cover from '@/assets/projects/working-drawing/cover.jpg';
import img_working_drawing_05_roof_plan from '@/assets/projects/working-drawing/05-roof-plan.jpg';
import img_working_drawing_01_column_footing from '@/assets/projects/working-drawing/01-column-footing.jpg';
import img_working_drawing_02_ground_floor from '@/assets/projects/working-drawing/02-ground-floor.jpg';
import img_working_drawing_03_first_floor from '@/assets/projects/working-drawing/03-first-floor.jpg';
import img_working_drawing_04_electrical from '@/assets/projects/working-drawing/04-electrical.jpg';
import img_working_drawing_06_elevations from '@/assets/projects/working-drawing/06-elevations.jpg';
import img_working_drawing_07_sections from '@/assets/projects/working-drawing/07-sections.jpg';
import img_miscellaneous_cover from '@/assets/projects/miscellaneous/cover.jpg';
import img_miscellaneous_01_dogtooth from '@/assets/projects/miscellaneous/01-dogtooth.jpg';
import img_miscellaneous_02_original_characters from '@/assets/projects/miscellaneous/02-original-characters.jpg';
import img_miscellaneous_05_schizophrenia from '@/assets/projects/miscellaneous/05-schizophrenia.jpg';
import img_miscellaneous_03_carl_eldritch from '@/assets/projects/miscellaneous/03-carl-eldritch.jpg';
import img_miscellaneous_04_oshi_no_ko from '@/assets/projects/miscellaneous/04-oshi-no-ko.jpg';
import img_miscellaneous_06_oblique_house from '@/assets/projects/miscellaneous/06-oblique-house.jpg';
import img_miscellaneous_07_faces_of_the_past from '@/assets/projects/miscellaneous/07-faces-of-the-past.jpg';
import img_miscellaneous_08_rimuru from '@/assets/projects/miscellaneous/08-rimuru.jpg';

export type Figure = { src: StaticImageData; caption: string; size?: 'full' | 'wide' | 'tall' };
export type Chapter = { heading: string; body?: string; layout: 'stack' | 'pair' | 'trio' | 'panorama'; figures: Figure[] };
export type Project = {
  slug: string;
  order: number;
  title: string;
  tibetan?: string;
  wylie?: string;
  meaning?: string;
  typology: string;
  location?: string;
  year: string;
  deck: string;
  intro: string[];
  cover: StaticImageData;
  hero: Figure;
  layout?: 'liner' | 'sheets' | 'gallery';
  chapters: Chapter[];
};

export const projects: Project[] = [
  {
    order: 1,
    title: "Resort Design",
    tibetan: "བསྟེན་པ",
    wylie: "bsten-pa",
    meaning: "to stay, to take refuge in",
    typology: "Resort Design",
    location: "Coimbatore, Tamil Nadu",
    year: "2025",
    deck: "A village of low pitched-roof pavilions gathered around a pool.",
    intro: ["Set in Coimbatore, this resort is conceived as a village of low pitched-roof pavilions gathered around a central pool courtyard. Rather than one large block, the program is broken into small buildings, so the stay feels intimate, unhurried and close to the landscape."],
    cover: img_bsten_pa_cover,
    hero: {
      src: img_bsten_pa_01_exploded_villa,
      caption: "Exploded view of a villa featured in the project",
      size: "tall",
    },
    chapters: [
      {
        heading: "The pool is the heart; privacy grows in gradual steps.",
        body: "The pool and its sun-lit deck form the heart of the site. Suite-type rooms sit closest to it, in a staggered row that opens toward the water. Villas follow a curved sequence along the edge, and two-storey cottages, each with a standard room on every floor, line the perimeter. Guests move from the most social zone to the most private one in gradual steps.",
        layout: "trio",
        figures: [
          {
            src: img_bsten_pa_02_villas_curve,
            caption: "Villas laid in a curve sequence",
          },
          {
            src: img_bsten_pa_03_cottages,
            caption: "Cottages with a standard room on each floor",
          },
          {
            src: img_bsten_pa_04_suites_pool,
            caption: "Suite-type rooms in proximity to the pool",
          },
        ],
      },
      {
        heading: "Read as one composition from above.",
        body: "The sloped roofs unify the scheme. They recall the clay-tile roofing of South Indian architecture and give the resort a warm, recognisable identity that reads as one composition from above.",
        layout: "stack",
        figures: [
          {
            src: img_bsten_pa_05_site_isometric,
            caption: "Site plan isometric",
            size: "wide",
          },
        ],
      },
      {
        heading: "Detached volumes let the breeze pass through.",
        body: "The layout responds to Coimbatore’s warm, moderate climate. Detached volumes leave room for breezes from the Palghat Gap to pass between buildings, and generous roof overhangs give shade and monsoon cover. Mature trees are kept within the plan, so paths and units are screened and cooled by the existing canopy.",
        layout: "pair",
        figures: [
          {
            src: img_bsten_pa_06_exploded_axonometric,
            caption: "Exploded axonometric — ground, first floor and roof levels",
          },
          {
            src: img_bsten_pa_07_site_plan,
            caption: "Site plan 1:500",
          },
        ],
      },
      {
        heading: "A low skyline under the existing canopy.",
        layout: "stack",
        figures: [
          {
            src: img_bsten_pa_08_site_section,
            caption: "Site section",
            size: "wide",
          },
          {
            src: img_bsten_pa_09_site_elevation,
            caption: "Site elevation",
            size: "wide",
          },
        ],
      },
      {
        heading: "From the road to the water, in one cut.",
        layout: "panorama",
        figures: [
          {
            src: img_bsten_pa_10_longitudinal_section,
            caption: "Longitudinal sectional view",
          },
        ],
      },
      {
        heading: "Rendered views.",
        layout: "stack",
        figures: [
          {
            src: img_bsten_pa_11_render_aerial,
            caption: "A shot from an elevated point showing the full perspective of the site",
            size: "full",
          },
          {
            src: img_bsten_pa_12_render_restaurant,
            caption: "Interior view of the restaurant",
          },
          {
            src: img_bsten_pa_13_render_suite,
            caption: "Interior view of a suite room",
          },
        ],
      },
    ],
    slug: "bsten-pa",
  },
  {
    order: 2,
    title: "Office Design",
    tibetan: "ལས་ཁུངས",
    wylie: "la-khung",
    meaning: "office",
    typology: "Office Design — mixed use, ground floor commercial",
    location: "Mangalore, Dakshina Kannada, Karnataka",
    year: "2025",
    deck: "A layered, terraced composition along a single central axis.",
    intro: ["Set in Mangalore, this project is a layered, terraced composition organized along a single central axis. It responds to a coastal, hot-humid climate, where heavy monsoon rain, strong sun and sea breezes shape how a building should sit and breathe."],
    cover: img_la_khung_cover,
    hero: {
      src: img_la_khung_01_terrace_levels,
      caption: "A view showcasing the different levels of terrace",
      size: "tall",
    },
    chapters: [
      {
        heading: "The building unfolds in horizontal bands.",
        body: "From a low, open public front to larger, more enclosed volumes at the rear, stepped levels and deep overhangs shade the lower floors and shelter movement from rain. Pergola-covered courtyards act as open, ventilated in-between spaces that draw in the coastal breeze and give people a place to gather and pause.",
        layout: "trio",
        figures: [
          {
            src: img_la_khung_02_sit_out,
            caption: "Sit-out area outside the food court",
          },
          {
            src: img_la_khung_03_stepped_sequence,
            caption: "Stepped sequence backing a terrace at different levels",
          },
          {
            src: img_la_khung_04_corner_cores,
            caption: "Each corner holds elevators and staircases",
          },
        ],
      },
      {
        heading: "Arrival is deliberate.",
        body: "A curved, edged boundary wall screens the site from the road and guides visitors toward a recessed central entrance, while parking stays at the periphery so the forecourt remains pedestrian. Mature trees and soft landscape pockets buffer the building from heat and street noise and root it in its setting.",
        layout: "stack",
        figures: [
          {
            src: img_la_khung_05_site_isometric,
            caption: "Site isometric",
            size: "wide",
          },
        ],
      },
      {
        heading: "Plans, stacked on one axis.",
        layout: "pair",
        figures: [
          {
            src: img_la_khung_06_floor_plans,
            caption: "Ground, first and fourth floor plans",
          },
          {
            src: img_la_khung_07_site_plan,
            caption: "Site plan 1:500",
          },
        ],
      },
      {
        heading: "Two roof masses anchor the symmetrical plan.",
        body: "They recall Mangalore’s clay-tile roofing tradition, and together with the beige, earthy palette they give the project a contemporary identity that still feels of its place.",
        layout: "stack",
        figures: [
          {
            src: img_la_khung_08_front_elevation,
            caption: "Site front elevation 1:500",
            size: "wide",
          },
          {
            src: img_la_khung_09_site_section,
            caption: "Site section 1:500",
            size: "wide",
          },
        ],
      },
      {
        heading: "Terraces stepping down to the street.",
        layout: "panorama",
        figures: [
          {
            src: img_la_khung_10_longitudinal_section,
            caption: "Longitudinal sectional view",
          },
        ],
      },
      {
        heading: "Rendered views.",
        layout: "stack",
        figures: [
          {
            src: img_la_khung_11_render_terraces,
            caption: "The north-facing stepped form counters harsh sun, planted with creepers and timber pergolas over a shaded glass façade",
            size: "full",
          },
          {
            src: img_la_khung_12_render_pergola,
            caption: "Outside view 01",
          },
          {
            src: img_la_khung_13_render_entrance,
            caption: "Outside view 02",
          },
        ],
      },
    ],
    slug: "la-khung",
  },
  {
    order: 3,
    title: "Multi-Family Housing",
    tibetan: "སྡོད་ཁང་།",
    wylie: "sdod-khang",
    meaning: "dwelling, residence",
    typology: "Multi-Family Housing Design",
    location: "Manipal, Karnataka",
    year: "2026",
    deck: "A vertical neighbourhood that shares light, air and open space.",
    intro: ["Set in Manipal, this multi-family housing project is conceived as a vertical neighbourhood, where many households share light, air and open space without losing a sense of privacy and belonging."],
    cover: img_sdod_khang_cover,
    hero: {
      src: img_sdod_khang_01_terrace_levels,
      caption: "A view showcasing the different levels of terrace",
      size: "tall",
    },
    chapters: [
      {
        heading: "Every block terraces back as it rises.",
        body: "The scheme is organized as repeating, stepped residential blocks arranged around shared open cores, so every home gets daylight, cross-ventilation and a view out, and no unit is left closed-in.",
        layout: "trio",
        figures: [
          {
            src: img_sdod_khang_02_commercial_block,
            caption: "Commercial block laid at the entrance",
          },
          {
            src: img_sdod_khang_03_typical_floor,
            caption: "Typical floor plan showing repetition in coinciding floors",
          },
          {
            src: img_sdod_khang_04_retaining_walls,
            caption: "Retaining walls differentiating each level",
          },
        ],
      },
      {
        heading: "A rounded volume at the centre is where neighbours meet.",
        body: "The residential wings turn toward the community heart, so everyday routes naturally converge there.",
        layout: "pair",
        figures: [
          {
            src: img_sdod_khang_05_site_isometric,
            caption: "Site isometric",
          },
          {
            src: img_sdod_khang_08_site_plan,
            caption: "Site plan 1:800",
          },
        ],
      },
      {
        heading: "Homes measured room by room.",
        body: "The design responds to Manipal’s hot-humid, high-rainfall climate. Stepped profiles and deep overhangs shade the façades and shelter movement during the monsoon, while open courts let air move through the blocks.",
        layout: "stack",
        figures: [
          {
            src: img_sdod_khang_06_unit_plans,
            caption: "Unit plans — 2 BHK variants, 3 BHK and 4 BHK",
            size: "wide",
          },
          {
            src: img_sdod_khang_07_site_section,
            caption: "Site section with close-ups of commercial zone, sports, basement parking and a 3 BHK",
            size: "wide",
          },
        ],
      },
      {
        heading: "Large-scale housing that stays human.",
        body: "Landscaped and paved pockets between the blocks give residents room to gather, play and pause, so the spaces between homes matter as much as the homes themselves.",
        layout: "panorama",
        figures: [
          {
            src: img_sdod_khang_09_longitudinal_section,
            caption: "Longitudinal sectional view",
          },
        ],
      },
      {
        heading: "Rendered views.",
        layout: "stack",
        figures: [
          {
            src: img_sdod_khang_10_render_courtyard,
            caption: "Exterior view from a lower level showing the terraces, native vegetation and adjacent walkways",
            size: "full",
          },
        ],
      },
    ],
    slug: "sdod-khang",
  },
  {
    order: 4,
    title: "Working Drawing",
    typology: "Sem 2 Residence Design",
    year: "2024",
    deck: "One house, drawn to be built — from footing to roof.",
    intro: ["A set of construction drawings for a two-storey residence on a corner plot along a 6 m road, developed from the second-semester residence design. The sheets move from column and footing layout through floor plans, electrical layout and roof plan to elevations, sections and staircase details."],
    cover: img_working_drawing_cover,
    layout: "sheets",
    hero: {
      src: img_working_drawing_05_roof_plan,
      caption: "Roof plan with compound wall, recharging pit and gate details",
      size: "wide",
    },
    chapters: [
      {
        heading: "Plans.",
        layout: "pair",
        figures: [
          {
            src: img_working_drawing_01_column_footing,
            caption: "Column and footing plan",
          },
          {
            src: img_working_drawing_02_ground_floor,
            caption: "Ground floor plan",
          },
          {
            src: img_working_drawing_03_first_floor,
            caption: "First floor plan",
          },
          {
            src: img_working_drawing_04_electrical,
            caption: "Electrical layout",
          },
        ],
      },
      {
        heading: "Elevations & sections.",
        layout: "stack",
        figures: [
          {
            src: img_working_drawing_06_elevations,
            caption: "Front and south-east facing elevations",
            size: "wide",
          },
          {
            src: img_working_drawing_07_sections,
            caption: "Sections AA′ and BB′ with staircase details",
            size: "wide",
          },
        ],
      },
    ],
    slug: "working-drawing",
  },
  {
    order: 5,
    title: "Miscellaneous",
    typology: "Drawings & Illustrations",
    year: "2018 — 2026",
    deck: "Sketches and illustrations done over the years.",
    intro: ["Outside the studio, the sketchbook. Characters, fan art, pencil case studies and pixel experiments — the drawing habit that feeds everything else."],
    cover: img_miscellaneous_cover,
    layout: "gallery",
    hero: {
      src: img_miscellaneous_01_dogtooth,
      caption: "“Tyler, the Creator — Dogtooth”",
      size: "wide",
    },
    chapters: [
      {
        heading: "Sketchbook.",
        layout: "pair",
        figures: [
          {
            src: img_miscellaneous_02_original_characters,
            caption: "Original renditions of fictional characters",
          },
          {
            src: img_miscellaneous_05_schizophrenia,
            caption: "“Schizophrenia”",
          },
          {
            src: img_miscellaneous_03_carl_eldritch,
            caption: "“Carl the Alien” and “Eldritch Touch”",
          },
          {
            src: img_miscellaneous_04_oshi_no_ko,
            caption: "“Oshi no Ko”",
          },
          {
            src: img_miscellaneous_06_oblique_house,
            caption: "Oblique House, Coimbatore — case study sketch",
          },
          {
            src: img_miscellaneous_07_faces_of_the_past,
            caption: "“Faces of the Past”",
          },
          {
            src: img_miscellaneous_08_rimuru,
            caption: "“Rimuru”",
          },
        ],
      },
    ],
    slug: "miscellaneous",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const pad = (n: number) => String(n).padStart(2, '0');
const tibDigits = '༠༡༢༣༤༥༦༧༨༩';
export const tibNum = (n: number) => pad(n).replace(/\d/g, (d) => tibDigits[+d]);
export const shortType = (p: Project) => p.typology.split(' — ')[0];
