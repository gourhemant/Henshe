/**
 * HENSHE EV Mobility Platform - Data Models & Configuration
 * Delhi NCR Initial Operations | Hub Contact: +91 9625592488
 */

const HENSHE_DATA = {
  company: {
    name: "HENSHE",
    tagline: "RIDE. EARN. GROW.",
    positioning: "Powering India's Last-Mile Delivery with Smart Electric Mobility.",
    phone: "+91 9625592488",
    phoneRaw: "9625592488",
    whatsapp: "https://wa.me/919625592488?text=Hello%20HENSHE%20Team%2C%20I%20am%20interested%20in%20your%20EV%20mobility%20platform.",
    email: "contact@henshe.in",
    investorEmail: "invest@henshe.in",
    corporateEmail: "business@henshe.in",
    headOffice: "HENSHE Mobility Central Hub, Plot 42, Okhla Industrial Area Phase-III, New Delhi, 110020",
    operatingCities: ["Delhi", "Noida", "Gurugram", "Ghaziabad", "Faridabad"],
    expansionCities: ["Bengaluru", "Hyderabad", "Pune", "Mumbai", "Jaipur"]
  },

  rentalPlans: [
    {
      id: "daily",
      name: "Daily Rental",
      badge: "Flexible Starter",
      price: 180,
      period: "per day",
      deposit: 500,
      scooterModel: "HENSHE Thunder EV Pro (High-Speed)",
      battery: "60V / 30Ah Lithium-ion (Swappable)",
      range: "85-100 km / swap",
      speed: "55 km/h Top Speed",
      charging: "Free unlimited battery swaps at all HENSHE hubs",
      maintenance: "100% Free maintenance & tyre puncture support",
      duration: "1 to 6 days rolling",
      popular: false,
      features: [
        "Zero fuel cost — Instant battery swap",
        "Includes certified ISI helmet & mobile holder",
        "Comprehensive 3rd party & asset insurance",
        "24/7 on-road breakdown support in Delhi NCR",
        "Same-day pickup with minimal KYC"
      ]
    },
    {
      id: "weekly",
      name: "Weekly Rental",
      badge: "Most Popular for Riders",
      price: 1150,
      period: "per week (~₹164/day)",
      deposit: 1500,
      scooterModel: "HENSHE Thunder EV Pro (Commercial Edition)",
      battery: "Dual Swappable Battery Pack Slot",
      range: "Up to 150 km combined range",
      speed: "60 km/h Top Speed",
      charging: "Priority express battery swap access",
      maintenance: "Complete preventive maintenance & parts cover",
      duration: "7 days renewable",
      popular: true,
      features: [
        "Save ~₹1,800/week compared to petrol scooters",
        "Heavy-duty delivery rack for bags/crates",
        "Priority battery swap lane at 12+ Delhi NCR hubs",
        "Free vehicle swap if service exceeds 30 mins",
        "Flexible renewal via WhatsApp / phone"
      ]
    },
    {
      id: "monthly",
      name: "Monthly Rental",
      badge: "Best Value & Highest Savings",
      price: 4400,
      period: "per month (~₹146/day)",
      deposit: 2500,
      scooterModel: "HENSHE Thunder EV Max (Heavy Duty Delivery)",
      battery: "Long-cycle LifePO4 Smart BMS Battery Pack",
      range: "Up to 110 km per single swap",
      speed: "60 km/h Top Speed",
      charging: "Unlimited swaps + portable home charger provided",
      maintenance: "VIP maintenance lane & zero consumable charges",
      duration: "30 days rolling",
      popular: false,
      features: [
        "Maximum savings: ₹4,500 - ₹6,000+ monthly vs petrol",
        "Option to take portable charger home for overnight charging",
        "Exclusive monthly rider incentive bonus pool",
        "Dedicated fleet coordinator assistance",
        "Lowest security deposit ratio"
      ]
    }
  ],

  investmentModels: {
    modelA: {
      title: "Model A: Investor-Owned Vehicles",
      tagline: "Direct Physical Asset Ownership with Managed Operations",
      summary: "The investor purchases and legally owns the commercial electric scooter(s). HENSHE acts as the operating partner managing rider onboarding, daily deployment, telemetry, battery logistics, maintenance, and rental collections under a commercial management agreement.",
      ownership: "Investor holds vehicle invoice, RC, and commercial legal title",
      revenueDistribution: "Contractual percentage of net distributable rental income",
      taxBenefit: "Investor claims 40% accelerated depreciation on EV asset (as per Indian IT Act)",
      riskProfile: "Asset-backed physical collateral; earnings vary by utilization & agreed terms",
      maintenance: "HENSHE manages all field maintenance from the operating pool",
      idealFor: "HNIs, individual retail investors, and tax-conscious professionals seeking asset ownership"
    },
    modelB: {
      title: "Model B: HENSHE-Owned Fleet Financing",
      tagline: "Capital Participation in Company-Owned Fleet Expansion",
      summary: "HENSHE owns and maintains the vehicle assets directly on its balance sheet. The investor provides capital under a structured commercial financing agreement, receiving a pre-agreed contractual financial entitlement without the administrative burden of vehicle registration.",
      ownership: "HENSHE maintains legal vehicle title & corporate fleet compliance",
      revenueDistribution: "Contractual fixed or hybrid financing coupon distribution",
      taxBenefit: "Treated as corporate commercial agreement income / contractual yields",
      riskProfile: "Corporate covenant & platform operational performance backed",
      maintenance: "100% internal HENSHE operational balance sheet responsibility",
      idealFor: "Corporate partners, family offices, and passive investors wanting zero vehicle admin"
    }
  },

  investmentPlans: [
    {
      id: "starter",
      name: "Starter EV Partner",
      badge: "Accessible Retail Entry",
      vehicles: "1 – 5 Electric Scooters",
      estCostPerEV: 85000,
      minInvestment: "₹85,000 (1 EV)",
      agreementDuration: "36 to 48 Months",
      targetGrossRentalPerEV: "₹4,680 – ₹5,400 / month",
      mgmtFee: "15% Fleet Management & Telematics",
      investorShare: "75% of Distributable Operating Surplus",
      ownershipModel: "Choice of Model A (Own RC) or Model B (Financing)",
      maintenanceCover: "Full HENSHE maintenance reserve pool",
      highlights: [
        "100% asset-backed by physical electric two-wheelers",
        "Real-time GPS telematics dashboard access",
        "Monthly direct bank distribution statement",
        "Dedicated investor support hotline: 9625592488"
      ]
    },
    {
      id: "growth",
      name: "Growth EV Partner",
      badge: "High Cash Flow Portfolio",
      vehicles: "6 – 20 Electric Scooters",
      estCostPerEV: 82500,
      minInvestment: "₹4,95,000 (6 EVs)",
      agreementDuration: "36 to 48 Months",
      targetGrossRentalPerEV: "₹4,680 – ₹5,400 / month",
      mgmtFee: "12.5% Preferential Portfolio Rate",
      investorShare: "78% of Distributable Operating Surplus",
      ownershipModel: "Model A or Structured SPV / Model B",
      maintenanceCover: "Priority spare parts & preventive health monitoring",
      highlights: [
        "Portfolio diversification across multiple delivery hubs",
        "Quarterly fleet audit & physical inspection report",
        "Direct relationship manager & tax documentation pack",
        "Higher distributable share with volume discount"
      ]
    },
    {
      id: "fleet",
      name: "Fleet Business Partner",
      badge: "Enterprise & Institutional",
      vehicles: "21 – 100+ Electric Scooters",
      estCostPerEV: 79500,
      minInvestment: "₹16,69,500 (21+ EVs)",
      agreementDuration: "48 Months (Customizable)",
      targetGrossRentalPerEV: "Negotiated Bulk Enterprise Lease Rates",
      mgmtFee: "10% Institutional Management Rate",
      investorShare: "Custom Commercial Agreement (80%+)",
      ownershipModel: "Dedicated Corporate Fleet Agreement / LLP / SPV",
      maintenanceCover: "Dedicated depot maintenance bay & on-site technicians",
      highlights: [
        "Customized corporate deployment with leading logistics clients",
        "Board-level performance reporting & telematics API feed",
        "Structured buyback or residual salvage value clauses",
        "Bespoke legal, insurance and escrow arrangements"
      ]
    }
  ],

  hubs: [
    {
      id: "okhla",
      name: "Okhla Central Mobility Hub",
      address: "Plot 42, Phase-III, Okhla Industrial Area, New Delhi - 110020",
      phone: "+91 9625592488",
      hours: "24/7 Operations",
      batteriesAvailable: 42,
      scootersAvailable: 14,
      services: ["Battery Swap", "Vehicle Servicing", "Rider Onboarding", "Investor Tours"]
    },
    {
      id: "noida",
      name: "Noida Sector 62 Delivery Hub",
      address: "Near Electronic City Metro Station, Sector 62, Noida - 201309",
      phone: "+91 9625592488",
      hours: "06:00 AM – 11:30 PM",
      batteriesAvailable: 28,
      scootersAvailable: 8,
      services: ["Battery Swap", "Quick Servicing", "Rider Assistance"]
    },
    {
      id: "gurugram",
      name: "Gurugram Cybercity Hub",
      address: "DLF Cyber Hub Peripheral Lane, Phase-II, Gurugram - 122002",
      phone: "+91 9625592488",
      hours: "06:00 AM – 11:30 PM",
      batteriesAvailable: 35,
      scootersAvailable: 11,
      services: ["Battery Swap", "Fleet Maintenance", "Rider KYC"]
    },
    {
      id: "karolbagh",
      name: "Central Delhi Hub (Karol Bagh)",
      address: "Pusa Road Junction, Karol Bagh, New Delhi - 110005",
      phone: "+91 9625592488",
      hours: "06:30 AM – 11:00 PM",
      batteriesAvailable: 24,
      scootersAvailable: 6,
      services: ["Battery Swap", "Rider Support"]
    },
    {
      id: "ghaziabad",
      name: "Ghaziabad Hub (Indirapuram)",
      address: "Kala Patthar Road, Indirapuram, Ghaziabad - 201014",
      phone: "+91 9625592488",
      hours: "06:30 AM – 10:30 PM",
      batteriesAvailable: 20,
      scootersAvailable: 5,
      services: ["Battery Swap", "Emergency Assist"]
    }
  ],

  demoFleetVehicles: [
    { id: "HEN-EV-101", model: "Thunder EV Pro", status: "Active On Trip", rider: "Rajesh Kumar (Zomato)", soc: "84%", range: "76 km", location: "South Delhi - Saket", speed: "38 km/h" },
    { id: "HEN-EV-102", model: "Thunder EV Pro", status: "Active On Trip", rider: "Amit Sharma (Blinkit)", soc: "62%", range: "56 km", location: "Noida Sector 18", speed: "42 km/h" },
    { id: "HEN-EV-103", model: "Thunder EV Max", status: "Available", rider: "Unassigned", soc: "98%", range: "108 km", location: "Okhla Central Hub", speed: "0 km/h" },
    { id: "HEN-EV-104", model: "Thunder EV Pro", status: "Active On Trip", rider: "Deepak Yadav (Swiggy)", soc: "41%", range: "36 km", location: "Gurugram Cybercity", speed: "32 km/h" },
    { id: "HEN-EV-105", model: "Thunder EV Max", status: "Battery Swap Queue", rider: "Manish Verma (Zepto)", soc: "14%", range: "12 km", location: "Noida Sec 62 Hub", speed: "5 km/h" },
    { id: "HEN-EV-106", model: "Thunder EV Pro", status: "Scheduled Service", rider: "Depot Technicians", soc: "88%", range: "80 km", location: "Okhla Workshop", speed: "0 km/h" },
    { id: "HEN-EV-107", model: "Thunder EV Pro", status: "Active On Trip", rider: "Vikas Singh (Flipkart)", soc: "79%", range: "71 km", location: "Janakpuri West", speed: "36 km/h" }
  ],

  testimonials: [
    {
      name: "Sunil Rawat",
      role: "Delivery Professional (Swiggy & Blinkit, South Delhi)",
      quote: "Earlier I was spending ₹7,000 every month on petrol and ₹1,500 on scooter engine oils and repairs. With HENSHE, I just swap the battery at Okhla in 2 minutes. My monthly savings went up by ₹4,800. Best decision for my family.",
      rating: 5,
      badge: "Verified Delivery Rider (Demo)"
    },
    {
      name: "Rohit & Megha Agarwal",
      role: "Growth EV Investors (Owns 8 EVs via Model A)",
      quote: "We were looking for real physical asset investments offering better recurring cash yields than bank FDs. HENSHE manages rider allocation, IoT tracking, and maintenance smoothly. We receive regular monthly statements and payouts directly.",
      rating: 5,
      badge: "Growth Partner (Demo)"
    },
    {
      name: "Vikram Malhotra",
      role: "VP Operations, Urban Quick Logistics",
      quote: "HENSHE supplied 45 commercial electric scooters with dedicated battery swap support for our grocery delivery dark stores in Noida and Gurugram. 99% fleet uptime and measurable ESG compliance for our corporate audits.",
      rating: 5,
      badge: "Corporate Client (Demo)"
    }
  ]
};
