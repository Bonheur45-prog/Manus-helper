require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
const GALLERY_CATEGORIES = [
  "architecture",
  "interior-design",
  "construction",
  "before-after",
  "team",
  "branding",
];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "sagec-hub";
let companyCollection = null;

const initMongo = async () => {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI not provided. Company profile will remain in-memory only.");
    return;
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB);
    companyCollection = db.collection("company_profile");

    const existing = await companyCollection.findOne({ key: "companyProfile" });
    if (existing && existing.data) {
      SAGEC_DATA.company = existing.data;
      console.log("Loaded company profile from MongoDB.");
    } else {
      await companyCollection.updateOne(
        { key: "companyProfile" },
        { $set: { key: "companyProfile", data: SAGEC_DATA.company, updatedAt: new Date() } },
        { upsert: true }
      );
      console.log("Initialized company profile in MongoDB.");
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error && error.message ? error.message : error);
    companyCollection = null;
  }
};

const persistCompanyProfile = async () => {
  if (!companyCollection) return;
  try {
    await companyCollection.updateOne(
      { key: "companyProfile" },
      { $set: { data: SAGEC_DATA.company, updatedAt: new Date() } },
      { upsert: true }
    );
  } catch (error) {
    console.error("Failed to persist company profile to MongoDB:", error && error.message ? error.message : error);
  }
};

const isValidGalleryCategory = (category) => GALLERY_CATEGORIES.includes(category);

// ── Static data (edit this file to update Manus context) ──────────────────────
// Fetch gallery contents directly from Cloudinary (persisted source of truth)
const fetchGalleryFromCloud = async () => {
  const gallery = {};
  for (const cat of GALLERY_CATEGORIES) {
    const folder = `sagec-hub/gallery/${cat}`;
    try {
      const res = await cloudinary.search
        .expression(`folder:${folder} AND resource_type:image`)
        .sort_by('uploaded_at', 'desc')
        .max_results(500)
        .execute();

      gallery[cat] = (res.resources || []).map((r) => ({
        id: r.public_id,
        public_id: r.public_id,
        url: r.secure_url,
        width: r.width,
        height: r.height,
        uploadedAt: r.created_at || r.uploaded_at,
      }));
    } catch (err) {
      console.error('Cloudinary list failed for', folder, err && err.message ? err.message : err);
      gallery[cat] = [];
    }
  }
  return gallery;
};
const SAGEC_DATA = {
  company: {
    name: "SAGEC Ltd",
    tagline: "Architectural and Engineering Solutions",
    phone: "+250 788 470 243",
    email: "sagecltd@gmail.com",
    website: "https://sagecltd.com",
    address: "Crystal Plaza, Plot No 4KN, Justice AV, Kigali, Rwanda",
    brandColors: {
      primary: "#F15A22",
      secondary: "#1B3A6B",
      accent: "#8A9BA8",
      dark: "#000000",
      light: "#FFFFFF",
    },
    social: {
      instagram: "https://instagram.com/sagecltd",
      linkedin: "https://linkedin.com/company/sagecltd",
      twitter: "https://x.com/sagecltd",
    },
    logo: {
      main: "REPLACE_WITH_CLOUDINARY_LOGO_URL",
      transparent: "REPLACE_WITH_CLOUDINARY_TRANSPARENT_LOGO_URL",
      white: "REPLACE_WITH_CLOUDINARY_WHITE_LOGO_URL",
    },
  },

  services: [
    {
      id: "architectural-design",
      title: "Architectural Design",
      description:
        "Modern structural conceptualization and blueprint layout for residential, commercial, and industrial projects.",
      keywords: ["architecture", "blueprint", "design", "modern", "structural"],
      cta: "Design your dream space",
      images: ["REPLACE_WITH_CLOUDINARY_URL", "REPLACE_WITH_CLOUDINARY_URL"],
    },
    {
      id: "civil-engineering",
      title: "Civil Engineering",
      description:
        "Structural analysis and infrastructure development for lasting, safe, and efficient builds.",
      keywords: ["civil", "engineering", "infrastructure", "structural analysis"],
      cta: "Build on solid foundations",
      images: ["REPLACE_WITH_CLOUDINARY_URL"],
    },
    {
      id: "real-estate-development",
      title: "Real Estate Development",
      description:
        "Residential, commercial, and industrial property design and building tailored to client vision.",
      keywords: ["real estate", "property", "residential", "commercial", "industrial"],
      cta: "Invest in the future",
      images: ["REPLACE_WITH_CLOUDINARY_URL"],
    },
    {
      id: "construction",
      title: "Construction",
      description:
        "Full-scale construction services delivering quality builds from foundation to finishing.",
      keywords: ["construction", "building", "contractor", "quality"],
      cta: "Let's build it right",
      images: ["REPLACE_WITH_CLOUDINARY_URL"],
    },
    {
      id: "interior-design",
      title: "Interior Design",
      description:
        "Premium interior design solutions blending aesthetics, function, and lifestyle for every space.",
      keywords: ["interior", "design", "luxury", "decor", "space", "modern"],
      cta: "Transform your interiors",
      images: ["REPLACE_WITH_CLOUDINARY_URL"],
    },
    {
      id: "construction-supervision",
      title: "Construction Supervision",
      description:
        "Professional site oversight, quality control, and execution management from start to handover.",
      keywords: ["supervision", "quality control", "site management", "oversight"],
      cta: "Your project, our supervision",
      images: ["REPLACE_WITH_CLOUDINARY_URL"],
    },
    {
      id: "project-management",
      title: "Project Management",
      description:
        "Turnkey engineering consultancy managing every phase from initial concept to final completion.",
      keywords: ["project management", "consultancy", "turnkey", "planning"],
      cta: "From concept to completion",
      images: ["REPLACE_WITH_CLOUDINARY_URL"],
    },
    {
      id: "renovation-works",
      title: "Renovation Works",
      description:
        "Structural updating and modernizing of existing properties with minimal disruption and maximum impact.",
      keywords: ["renovation", "remodeling", "upgrade", "modernize", "restore"],
      cta: "Renew your space",
      images: ["REPLACE_WITH_CLOUDINARY_URL"],
    },
  ],

  brand: {
    fonts: {
      display: "Bebas Neue",
      body: "Inter",
    },
    tone: "Professional, modern, premium, trustworthy",
    style: "Clean architectural lines, bold typography, orange accents on dark backgrounds",
    designGuidelines: [
      "Use bold orange (#F15A22) as the dominant accent",
      "Dark navy (#1B3A6B) for secondary elements",
      "White space is important — never overcrowd the flyer",
      "Photographs should show real construction/architecture work",
      "Always include the SAGEC logo and contact info on every flyer",
      "Use strong geometric shapes inspired by architectural blueprints",
    ],
  },

  captions: [
    {
      service: "interior-design",
      caption:
        "Your space should tell your story. ✨ At SAGEC Ltd, we craft interiors that blend luxury with function. Let's design your perfect space.",
      hashtags:
        "#InteriorDesign #LuxuryInteriors #SAGEC #KigaliDesign #HomeDesign #Rwanda",
    },
    {
      service: "architectural-design",
      caption:
        "Great buildings start with great ideas. 🏛️ Our architects turn your vision into reality — from concept to blueprint.",
      hashtags:
        "#Architecture #ArchitecturalDesign #SAGEC #KigaliArchitecture #UrbanDesign #Rwanda",
    },
    {
      service: "construction",
      caption:
        "Built to last. Built to impress. 🏗️ SAGEC Ltd delivers construction excellence across Rwanda and beyond.",
      hashtags:
        "#Construction #BuildingKigali #SAGEC #RealEstate #QualityBuild #Rwanda",
    },
    {
      service: "renovation-works",
      caption:
        "Old spaces deserve new life. 🔨 Renovation experts at SAGEC Ltd bring modern energy to every structure.",
      hashtags:
        "#Renovation #RenovationRwanda #SAGEC #HomeUpgrade #Remodeling #Kigali",
    },
    {
      service: "project-management",
      caption:
        "From concept to completion — seamlessly. 📐 SAGEC Ltd manages every phase of your engineering project with precision.",
      hashtags:
        "#ProjectManagement #Engineering #SAGEC #Consultancy #Kigali #Rwanda",
    },
  ],

  weeklyFocus: {
    service: "interior-design",
    theme: "Modern Luxury Living Spaces",
    style: "Clean, minimal, premium — use white backgrounds with orange accents",
    goal: "Generate high-conversion flyers showcasing luxury interior transformations",
    colorPalette: ["#F15A22", "#1B3A6B", "#FFFFFF", "#1A1A1A"],
    updatedAt: new Date().toISOString(),
  },

  assets: {
    projectPhotos: [
      "REPLACE_WITH_CLOUDINARY_URL",
      "REPLACE_WITH_CLOUDINARY_URL",
      "REPLACE_WITH_CLOUDINARY_URL",
    ],
    teamPhotos: ["REPLACE_WITH_CLOUDINARY_URL"],
    beforeAfter: [
      {
        before: "REPLACE_WITH_CLOUDINARY_URL",
        after: "REPLACE_WITH_CLOUDINARY_URL",
        label: "Interior Renovation — Kigali",
      },
    ],
    flyerInspirations: ["REPLACE_WITH_CLOUDINARY_URL"],
    gallery: {
      architecture: [],
      "interior-design": [],
      construction: [],
      "before-after": [],
      team: [],
      branding: [],
    },
  },
};

// ── ROUTES ────────────────────────────────────────────────────────────────────

// Master AI context endpoint — Manus fetches this ONE URL for everything
app.get("/api/ai-context", (req, res) => {
  res.json({
    _instructions:
      "This is the ONLY trusted source for SAGEC Ltd flyer generation. Use only assets and information from this endpoint. Do not browse other websites.",
    ...SAGEC_DATA,
  });
});

// Daily prompt endpoint — tells Manus what to focus on today
app.get("/api/today-prompt", (req, res) => {
  const { weeklyFocus, company } = SAGEC_DATA;
  res.json({
    date: new Date().toISOString().split("T")[0],
    company: company.name,
    focus: weeklyFocus.service,
    theme: weeklyFocus.theme,
    style: weeklyFocus.style,
    goal: weeklyFocus.goal,
    colorPalette: weeklyFocus.colorPalette,
    instructions: [
      "Generate ONE unique professional flyer for SAGEC Ltd.",
      `Today's focus: ${weeklyFocus.service} — ${weeklyFocus.theme}`,
      "Use only approved images from /api/ai-context assets.",
      "Always include company logo, phone number, and email.",
      "Apply brand colors: Orange #F15A22, Navy #1B3A6B.",
      "Do NOT repeat styles from previous days.",
      "Generate matching caption and hashtags at the bottom of the response.",
    ],
  });
});

// Services list
app.get("/api/services", (req, res) => {
  res.json(SAGEC_DATA.services);
});

// Single service
app.get("/api/services/:id", (req, res) => {
  const service = SAGEC_DATA.services.find((s) => s.id === req.params.id);
  if (!service) return res.status(404).json({ error: "Service not found" });
  res.json(service);
});

// Captions
app.get("/api/captions", (req, res) => {
  const { service } = req.query;
  if (service) {
    const filtered = SAGEC_DATA.captions.filter((c) => c.service === service);
    return res.json(filtered);
  }
  res.json(SAGEC_DATA.captions);
});

// Gallery assets for admin upload / filtering
app.get("/api/gallery", async (req, res) => {
  try {
    const gallery = await fetchGalleryFromCloud();
    res.json({ categories: GALLERY_CATEGORIES, gallery });
  } catch (err) {
    console.error('Failed to fetch gallery', err);
    res.status(500).json({ error: 'Failed to fetch gallery', details: err.message || err });
  }
});

// Company profile endpoints (editable from dashboard)
app.get('/api/company', (req, res) => {
  res.json(SAGEC_DATA.company);
});

app.put('/api/company', async (req, res) => {
  const updates = req.body || {};
  // Merge top-level fields
  SAGEC_DATA.company = { ...SAGEC_DATA.company, ...updates };
  // Merge nested social and logo objects if present
  if (updates.social && typeof updates.social === 'object') {
    SAGEC_DATA.company.social = { ...SAGEC_DATA.company.social, ...updates.social };
  }
  if (updates.logo && typeof updates.logo === 'object') {
    SAGEC_DATA.company.logo = { ...SAGEC_DATA.company.logo, ...updates.logo };
  }

  await persistCompanyProfile();
  res.json({ success: true, company: SAGEC_DATA.company });
});

app.post("/api/gallery/upload", upload.single("image"), async (req, res) => {
  const category = req.body.category;
  if (!req.file || !category || !isValidGalleryCategory(category)) {
    return res.status(400).json({ error: "Missing image file or invalid gallery category." });
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return res.status(500).json({ error: "Cloudinary is not configured. Fill in the environment variables." });
  }

  try {
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `sagec-hub/gallery/${category}`,
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    const result = await streamUpload(req.file.buffer);
    const imageItem = {
      id: result.public_id,
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      uploadedAt: new Date().toISOString(),
    };
    // Return fresh gallery from Cloudinary (source of truth)
    const gallery = await fetchGalleryFromCloud();
    res.json({ success: true, image: imageItem, gallery });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    res.status(500).json({ error: "Image upload failed", details: error.message || error });
  }
});

app.delete("/api/gallery", async (req, res) => {
  const { category, publicId } = req.body;
  if (!category || !publicId || !isValidGalleryCategory(category)) {
    return res.status(400).json({ error: "Missing category or publicId, or invalid category." });
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return res.status(500).json({ error: "Cloudinary is not configured. Fill in the environment variables." });
  }

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    // Return fresh gallery after deletion
    const gallery = await fetchGalleryFromCloud();
    res.json({ success: true, gallery });
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
    res.status(500).json({ error: "Image delete failed", details: error.message || error });
  }
});

// Brand guidelines
app.get("/api/brand", (req, res) => {
  res.json({ ...SAGEC_DATA.brand, colors: SAGEC_DATA.company.brandColors });
});

// Update weekly focus (called from dashboard)
app.put("/api/weekly-focus", (req, res) => {
  const { service, theme, style, goal, colorPalette } = req.body;
  if (!service || !theme || !style || !goal) {
    return res.status(400).json({ error: "Missing required fields: service, theme, style, goal" });
  }
  SAGEC_DATA.weeklyFocus = {
    service,
    theme,
    style,
    goal,
    colorPalette: colorPalette || SAGEC_DATA.weeklyFocus.colorPalette,
    updatedAt: new Date().toISOString(),
  };
  res.json({ success: true, weeklyFocus: SAGEC_DATA.weeklyFocus });
});

// Get current weekly focus
app.get("/api/weekly-focus", (req, res) => {
  res.json(SAGEC_DATA.weeklyFocus);
});

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "SAGEC AI Asset Hub is running ✅",
    endpoints: [
      "GET  /api/ai-context — Master AI context (use this in Manus)",
      "GET  /api/today-prompt — Daily flyer generation prompt",
      "GET  /api/services — All services",
      "GET  /api/services/:id — Single service",
      "GET  /api/captions?service=id — Captions & hashtags",
      "GET  /api/brand — Brand guidelines",
      "GET  /api/gallery — Gallery categories and image URLs",
      "POST /api/gallery/upload — Upload a new gallery image",
      "DELETE /api/gallery — Delete an existing gallery image",
      "GET  /api/weekly-focus — Current weekly focus",
      "PUT  /api/weekly-focus — Update weekly focus from dashboard",
    ],
  });
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await initMongo();
  app.listen(PORT, () => {
    console.log(`✅ SAGEC Asset Hub API running on port ${PORT}`);
  });
};

startServer();
