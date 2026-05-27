export const gold = "#d4a017";
export const goldLight = "#f0c040";

export function getStyles(isDark) {
  const dark = isDark ? "#0d0d0d" : "#f5f5f0";
  const dark2 = isDark ? "#161616" : "#ffffff";
  const dark3 = isDark ? "#1e1e1e" : "#f0ede4";
  const darkCard = isDark ? "#1a1a1a" : "#ffffff";
  const textPrimary = isDark ? "#fff" : "#111";
  const textSecondary = isDark ? "#888" : "#555";
  const textMuted = isDark ? "#666" : "#777";
  const border = isDark ? "#222" : "#ddd";
  const border2 = isDark ? "#2a2a2a" : "#e0ddd4";
  const inputBg = isDark ? "#111" : "#f9f7f2";
  const navBg = isDark ? "rgba(10,10,10,0.92)" : "rgba(255,255,255,0.95)";
  const sidebarBg = isDark ? "#0a0a0a" : "#ffffff";
  const dashBg = isDark ? "#0d0d0d" : "#f5f5f0";
  const tableTh = isDark ? "#111" : "#f0ede4";

  return {
    // NAV
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: navBg, backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${border}`, height: 70,
    },
    navInner: {
      maxWidth: 1200, margin: "0 auto", padding: "0 24px",
      height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
    },
    navBrand: {
      display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
    },
    navLogo: {
      width: 38, height: 38, background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
      borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13, color: "#000",
    },
    navTitle: {
      fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 14,
      color: textPrimary, letterSpacing: 2,
    },
    navLinks: {
      display: "flex", gap: 4, alignItems: "center",
    },
    navBtn: {
      background: "none", border: "none", color: isDark ? "#ccc" : "#444", padding: "8px 14px",
      borderRadius: 8, cursor: "pointer", fontSize: 14, fontFamily: "'Sora', sans-serif",
      fontWeight: 500, transition: "color 0.2s",
    },
    navBtnActive: { color: gold },
    navBtnCta: {
      background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
      border: "none", color: "#000", padding: "8px 16px",
      borderRadius: 8, cursor: "pointer", fontSize: 14, fontFamily: "'Sora', sans-serif",
      fontWeight: 700,
    },
    navBtnLogout: {
      background: "none", border: `1px solid ${isDark ? "#444" : "#ccc"}`, color: isDark ? "#ccc" : "#444", padding: "8px 14px",
      borderRadius: 8, cursor: "pointer", fontSize: 14, fontFamily: "'Sora', sans-serif",
    },
    themeToggleBtn: {
      background: isDark ? "#222" : "#f0ede4",
      border: `1px solid ${border}`,
      color: isDark ? "#fff" : "#333",
      width: 36, height: 36,
      borderRadius: 8, cursor: "pointer", fontSize: 16,
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.2s",
    },
    hamburger: {
      display: "none", background: "none", border: "none", color: textPrimary,
      fontSize: 22, cursor: "pointer",
    },

    // HERO
    hero: {
      minHeight: "100vh", background: `url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80) center/cover`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative", textAlign: "center", padding: "80px 24px 100px",
    },
    heroOverlay: {
      position: "absolute", inset: 0,
      background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.85) 100%)",
    },
    heroContent: {
      position: "relative", zIndex: 2, animation: "fadeUp 0.8s ease",
    },
    heroBadge: {
      display: "inline-block", background: `${gold}20`, border: `1px solid ${gold}`,
      color: gold, padding: "6px 18px", borderRadius: 50, fontSize: 13,
      fontWeight: 600, letterSpacing: 1, marginBottom: 20,
    },
    heroH1: {
      fontSize: "clamp(42px, 8vw, 96px)", fontFamily: "'Space Mono', monospace",
      fontWeight: 700, color: "#fff", lineHeight: 1.05, marginBottom: 20,
    },
    heroSub: {
      fontSize: "clamp(16px, 2.5vw, 20px)", color: "rgba(255,255,255,0.75)",
      maxWidth: 560, margin: "0 auto 36px",
    },
    heroCta: {
      background: `linear-gradient(135deg, ${gold}, ${goldLight})`, border: "none",
      color: "#000", padding: "14px 32px", borderRadius: 10, fontSize: 16,
      fontWeight: 700, cursor: "pointer", fontFamily: "'Sora', sans-serif",
      boxShadow: `0 4px 24px ${gold}50`,
    },
    heroCtaOutline: {
      background: "transparent", border: "2px solid rgba(255,255,255,0.4)",
      color: "#fff", padding: "14px 32px", borderRadius: 10, fontSize: 16,
      fontWeight: 600, cursor: "pointer", fontFamily: "'Sora', sans-serif",
    },
    heroStats: {
      position: "absolute", bottom: 32, display: "flex", gap: 40,
      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)",
      padding: "20px 40px", borderRadius: 14, border: "1px solid #2a2a2a",
    },
    statItem: { textAlign: "center" },
    statNum: { display: "block", fontSize: 28, fontWeight: 800, color: gold, fontFamily: "'Space Mono', monospace" },
    statLabel: { fontSize: 12, color: "#aaa", letterSpacing: 1 },

    // SECTIONS
    section: { padding: "80px 0", background: dark },
    sectionAlt: { padding: "80px 0", background: isDark ? "#0a0a0a" : "#e8e4d8" },
    container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
    sectionTitle: {
      fontSize: 36, fontFamily: "'Space Mono', monospace", fontWeight: 700,
      color: textPrimary, textAlign: "center", marginBottom: 12,
    },
    sectionTitleLight: {
      fontSize: 36, fontFamily: "'Space Mono', monospace", fontWeight: 700,
      color: "#fff", textAlign: "center", marginBottom: 12,
    },
    sectionSub: {
      color: textSecondary, textAlign: "center", fontSize: 16, marginBottom: 48,
      maxWidth: 500, margin: "0 auto 48px",
    },
    sectionSubLight: {
      color: "#aaa", textAlign: "center", fontSize: 16, marginBottom: 48,
      maxWidth: 500, margin: "0 auto 48px",
    },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 },
    grid4: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },

    // SERVICE CARDS
    serviceCard: {
      background: darkCard, borderRadius: 16, overflow: "hidden",
      border: `1px solid ${border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
    },
    serviceImgWrap: { position: "relative", height: 200 },
    serviceImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
    serviceImgOverlay: {
      position: "absolute", inset: 0,
      background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8))",
    },
    serviceBody: { padding: "20px" },
    serviceTitle: { fontSize: 20, fontWeight: 700, color: textPrimary, marginBottom: 8 },
    serviceDesc: { color: textMuted, fontSize: 14, lineHeight: 1.6, marginBottom: 16 },
    serviceFooter: { display: "flex", alignItems: "center", justifyContent: "space-between" },
    serviceRateLabel: { color: isDark ? "#666" : "#999", fontSize: 13 },
    serviceRate: { color: gold, fontSize: 22, fontWeight: 800, fontFamily: "'Space Mono', monospace" },
    smallBtn: {
      background: `linear-gradient(135deg, ${gold}, ${goldLight})`, border: "none",
      color: "#000", padding: "8px 16px", borderRadius: 8, fontSize: 13,
      fontWeight: 700, cursor: "pointer",
    },

    // FLEET
    fleetCard: {
      background: isDark ? "#1a1a1a" : "#ffffff", borderRadius: 14, overflow: "hidden",
      border: `1px solid ${isDark ? "#2a2a2a" : "#ddd"}`,
    },
    fleetImg: { width: "100%", height: 160, objectFit: "cover" },
    fleetBody: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    fleetName: { color: isDark ? "#fff" : "#111", fontSize: 15, fontWeight: 600 },
    fleetBadge: {
      background: `${gold}20`, color: gold, padding: "3px 10px",
      borderRadius: 50, fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
    },

    // WHY CARDS
    whyCard: {
      background: darkCard, borderRadius: 16, padding: 28,
      border: `1px solid ${border}`, textAlign: "center",
    },
    whyIcon: { fontSize: 40, marginBottom: 12 },
    whyTitle: { color: textPrimary, fontSize: 18, fontWeight: 700, marginBottom: 8 },
    whyDesc: { color: isDark ? "#777" : "#666", fontSize: 14, lineHeight: 1.6 },

    // CTA BANNER
    ctaBanner: {
      padding: "80px 24px", position: "relative",
      background: `url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80) center/cover`,
    },
    ctaOverlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" },

    // FOOTER
    footer: { background: isDark ? "#080808" : "#111111", padding: "60px 0 0" },
    footerGrid: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, paddingBottom: 48 },
    footerHead: { color: gold, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" },
    footerText: { color: isDark ? "#666" : "#999", fontSize: 14, marginBottom: 8 },
    footerBottom: {
      borderTop: "1px solid #1a1a1a", padding: "20px 0", textAlign: "center",
      color: "#444", fontSize: 13,
    },

    // AUTH
    authBg: {
      minHeight: "calc(100vh - 70px)", display: "flex", alignItems: "center",
      justifyContent: "center", padding: 24,
      background: isDark
        ? `radial-gradient(ellipse at 50% 0%, ${gold}15 0%, transparent 60%), #0d0d0d`
        : `radial-gradient(ellipse at 50% 0%, ${gold}10 0%, transparent 60%), #f5f5f0`,
    },
    authCard: {
      background: dark2, border: `1px solid ${border2}`, borderRadius: 20,
      padding: "40px 36px", width: "100%", maxWidth: 420,
      boxShadow: `0 24px 80px rgba(0,0,0,0.${isDark ? "5" : "15"}), 0 0 0 1px ${gold}20`,
    },
    authLogo: {
      width: 52, height: 52, background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
      borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 18, color: "#000",
      margin: "0 auto 20px",
    },
    authTitle: {
      color: textPrimary, fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 6,
    },
    authSub: { color: textMuted, fontSize: 14, textAlign: "center", marginBottom: 28 },
    formGroup: { marginBottom: 16 },
    label: { color: isDark ? "#888" : "#666", fontSize: 13, fontWeight: 500, marginBottom: 6, display: "block" },
    labelDark: { color: isDark ? "#aaa" : "#555", fontSize: 13, fontWeight: 500, marginBottom: 6, display: "block" },
    input: {
      width: "100%", background: inputBg, border: `1px solid ${border2}`, borderRadius: 10,
      padding: "11px 14px", color: textPrimary, fontSize: 14, fontFamily: "'Sora', sans-serif",
      outline: "none", transition: "border-color 0.2s",
    },
    submitBtn: {
      width: "100%", background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
      border: "none", color: "#000", padding: "13px 20px", borderRadius: 10,
      fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Sora', sans-serif",
    },
    cancelBtn: {
      background: isDark ? "#222" : "#eee", border: `1px solid ${isDark ? "#333" : "#ccc"}`, color: isDark ? "#ccc" : "#444",
      padding: "12px 20px", borderRadius: 10, fontSize: 14, cursor: "pointer",
      fontFamily: "'Sora', sans-serif", fontWeight: 600,
    },
    authSwitch: { color: textMuted, fontSize: 14, textAlign: "center", marginTop: 20 },
    authLink: { color: gold, cursor: "pointer", fontWeight: 600 },
    adminHint: {
      marginTop: 16, background: inputBg, border: `1px dashed ${border}`,
      borderRadius: 8, padding: "10px 14px", fontSize: 12, color: textMuted, textAlign: "center",
    },

    // BOOK NOW
    bookBg: {
      minHeight: "calc(100vh - 70px)", padding: "40px 24px",
      background: isDark
        ? `linear-gradient(135deg, #0d0d0d 0%, #1a1200 50%, #0d0d0d 100%)`
        : `linear-gradient(135deg, #f5f5f0 0%, #f5e8c0 50%, #f5f5f0 100%)`,
    },
    bookContainer: {
      maxWidth: 860, margin: "0 auto", background: dark2,
      border: `1px solid ${border2}`, borderRadius: 20, padding: 36,
      boxShadow: `0 24px 80px rgba(0,0,0,${isDark ? "0.5" : "0.1"})`,
    },
    backBtn: {
      background: "none", border: "none", color: textMuted, cursor: "pointer",
      fontSize: 14, marginBottom: 24, fontFamily: "'Sora', sans-serif",
      padding: 0, display: "block",
    },
    bookTitle: {
      color: textPrimary, fontSize: 28, fontWeight: 800, marginBottom: 4,
      fontFamily: "'Space Mono', monospace",
    },
    bookSub: { color: textMuted, fontSize: 14, marginBottom: 28 },
    fareCard: {
      background: `${gold}15`, border: `1px solid ${gold}40`, borderRadius: 12,
      padding: "16px 20px", marginBottom: 24, display: "flex",
      alignItems: "center", gap: 16,
    },
    fareLabel: { color: isDark ? "#888" : "#666", fontSize: 13 },
    fareAmount: { color: gold, fontSize: 28, fontWeight: 800, fontFamily: "'Space Mono', monospace", flex: 1 },
    fareNote: { color: textMuted, fontSize: 12 },

    // MY CART
    pageBg: {
      minHeight: "calc(100vh - 70px)", padding: "40px 0",
      background: dark,
    },
    pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 },
    pageTitle: { color: textPrimary, fontSize: 28, fontWeight: 800, fontFamily: "'Space Mono', monospace" },
    tripCard: {
      background: darkCard, borderRadius: 16, padding: 24,
      border: `1px solid ${border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
    },
    tripHeader: { display: "flex", justifyContent: "space-between", marginBottom: 16 },
    tripId: { color: gold, fontWeight: 700, fontSize: 13, fontFamily: "'Space Mono', monospace" },
    tripDate: { color: textMuted, fontSize: 13 },
    tripRoute: { marginBottom: 16 },
    tripLoc: { display: "flex", alignItems: "center", gap: 8, color: isDark ? "#ccc" : "#333", fontSize: 14 },
    dot: { fontSize: 10 },
    tripLine: { width: 2, height: 12, background: isDark ? "#333" : "#ccc", marginLeft: 10, marginTop: 2, marginBottom: 2 },
    tripDetails: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 },
    tripDetail: { display: "flex", flexDirection: "column", gap: 2 },
    detailLabel: { color: isDark ? "#555" : "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 },
    detailVal: { color: isDark ? "#ccc" : "#333", fontSize: 14, fontWeight: 500 },
    tripFare: {
      background: inputBg, borderRadius: 8, padding: "10px 14px",
      color: textSecondary, fontSize: 14, textAlign: "right",
    },
    emptyState: {
      textAlign: "center", padding: "80px 24px", background: darkCard,
      borderRadius: 20, border: `1px solid ${border}`,
    },

    // DASHBOARD
    dashBg: { display: "flex", minHeight: "100vh", background: dashBg },
    sidebar: {
      width: 240, background: sidebarBg, borderRight: `1px solid ${isDark ? "#1a1a1a" : "#ddd"}`,
      display: "flex", flexDirection: "column", padding: 16,
      position: "fixed", height: "100vh", overflowY: "auto",
    },
    sidebarLogo: {
      display: "flex", alignItems: "center", gap: 10, padding: "12px 8px", marginBottom: 20,
    },
    sideBtn: {
      background: "none", border: "none", color: isDark ? "#888" : "#555", padding: "10px 12px",
      borderRadius: 8, cursor: "pointer", fontSize: 14, textAlign: "left",
      fontFamily: "'Sora', sans-serif", width: "100%", marginBottom: 4,
      transition: "all 0.2s",
    },
    sideBtnActive: { background: `${gold}15`, color: gold },
    sideBtnLogout: {
      background: isDark ? "#1a0000" : "#fff0f0", border: "none", color: "#ef4444", padding: "10px 12px",
      borderRadius: 8, cursor: "pointer", fontSize: 14, textAlign: "left",
      fontFamily: "'Sora', sans-serif", width: "100%", marginTop: 4,
    },
    dashContent: { marginLeft: 240, flex: 1, padding: 32 },
    dashTitle: {
      color: textPrimary, fontSize: 24, fontWeight: 800, marginBottom: 24,
      fontFamily: "'Space Mono', monospace",
    },
    dashSubtitle: { color: textPrimary, fontSize: 18, fontWeight: 700, marginBottom: 16 },
    dashHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
    statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 },
    statCard: {
      background: darkCard, border: `1px solid ${border}`, borderRadius: 14,
      padding: "20px 24px", display: "flex", alignItems: "center", gap: 20,
    },
    statCardNum: { color: textPrimary, fontSize: 28, fontWeight: 800, fontFamily: "'Space Mono', monospace" },
    statCardLabel: { color: textMuted, fontSize: 13, marginTop: 2 },
    table: { width: "100%", borderCollapse: "collapse", fontFamily: "'Sora', sans-serif" },
    th: {
      background: tableTh, color: isDark ? "#888" : "#666", padding: "10px 14px", fontSize: 12,
      fontWeight: 600, textAlign: "left", letterSpacing: 0.5, textTransform: "uppercase",
    },
    td: { color: isDark ? "#ccc" : "#333", padding: "12px 14px", fontSize: 14 },
    editBtn: {
      background: `${gold}20`, border: `1px solid ${gold}40`, color: gold,
      padding: "5px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer",
      fontFamily: "'Sora', sans-serif", fontWeight: 600,
    },
    delBtn: {
      background: "#ef444420", border: "1px solid #ef444440", color: "#ef4444",
      padding: "5px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer",
      fontFamily: "'Sora', sans-serif", fontWeight: 600,
    },
    formCard: {
      background: inputBg, border: `1px solid ${border2}`, borderRadius: 14,
      padding: 24, marginBottom: 24,
    },
    loader: {
      minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center",
      color: textMuted, fontSize: 16, fontFamily: "'Sora', sans-serif",
    },

    // Generic
    textPrimary,
    textSecondary,
    textMuted,
    border,
    border2,
    inputBg,
    dark,
    dark2,
    darkCard,
  };
}
