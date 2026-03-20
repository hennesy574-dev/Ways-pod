import { useState, useEffect, useRef } from "react";

const CATS_ICONS = {
  "Все": "🏷️",
  "АКБ": "🔋",
  "Баки и стекло": "💨",
  "Бюджетные жидкости": "💧",
  "Жидкости Premium": "✨",
  "Устройства (Поды)": "📱",
};

const BASE_PRODUCTS = [
  {id:"00892",name:"АКБ 3000mah-18650 HG2",brand:"АКБ",cat:"АКБ",price:350,sku:"00892",emoji:"🔋"},
  {id:"929811",name:"АКБ LG 2500mAh-18.650 HE4",brand:"АКБ",cat:"АКБ",price:330,sku:"929811",emoji:"🔋"},
  {id:"929463",name:"АКБ SONY 3000mah 18650VTC6",brand:"АКБ",cat:"АКБ",price:350,sku:"929463",emoji:"🔋"},
  {id:"929838",name:"UFORCE-L TANK (бак + койла)",brand:"Бак/Койла",cat:"Баки и стекло",price:1500,sku:"929838",emoji:"💨"},
  {id:"929862",name:"UFORCE-X TANK PNP 5.5ml",brand:"Бак/Койла",cat:"Баки и стекло",price:1500,sku:"929862",emoji:"💨"},
  {id:"929860",name:"Z FLI TANK 2 (5.5ml)",brand:"Бак/Койла",cat:"Баки и стекло",price:1700,sku:"929860",emoji:"💨"},
  {id:"929861",name:"Z NANO MTL Tank (4ml)",brand:"Бак/Койла",cat:"Баки и стекло",price:1550,sku:"929861",emoji:"💨"},
  {id:"929649",name:"DUFT 5% (10 вкусов)",brand:"DUFT",cat:"Бюджетные жидкости",price:100,sku:"929649",emoji:"🧴"},
  {id:"929598",name:"HUSKY STRONG (копия)",brand:"HUSKY",cat:"Бюджетные жидкости",price:120,sku:"929598",emoji:"🧴"},
  {id:"929851",name:"MALASIAN GOLD 60mg (10 вкусов)",brand:"MALASIAN GOLD",cat:"Бюджетные жидкости",price:110,sku:"929851",emoji:"🧴"},
  {id:"929910",name:"ADVENTURE TIME 70mg (10 вкусов)",brand:"ADVENTURE TIME",cat:"Жидкости Premium",price:240,sku:"929910",emoji:"🌀"},
  {id:"929516",name:"BRYZGI 2/5% (50 вкусов)",brand:"BRYZGI",cat:"Жидкости Premium",price:195,sku:"929516",emoji:"💦"},
  {id:"929901",name:"CATSTRIP MEDIUM 15 вкусов 28%",brand:"CATSTRIP",cat:"Жидкости Premium",price:230,sku:"929901",emoji:"🐱"},
  {id:"929494",name:"CATSWILL EXTRA 20hard",brand:"CATSWILL",cat:"Жидкости Premium",price:250,sku:"929494",emoji:"🐾"},
  {id:"929685",name:"CATSWILL PREMIUM 20mg",brand:"CATSWILL",cat:"Жидкости Premium",price:295,sku:"929685",emoji:"🐾"},
  {id:"929885",name:"CHILLER SALT (9 вкусов)",brand:"CHILLER",cat:"Жидкости Premium",price:170,sku:"929885",emoji:"❄️"},
  {id:"00477",name:"CHROME BASIC 2/5%",brand:"CHROME",cat:"Жидкости Premium",price:260,sku:"00477",emoji:"⚡"},
  {id:"00478",name:"CHROME NORTH 2/5%",brand:"CHROME",cat:"Жидкости Premium",price:260,sku:"00478",emoji:"⚡"},
  {id:"00736",name:"CHROME PINK 2/5%",brand:"CHROME",cat:"Жидкости Premium",price:265,sku:"00736",emoji:"⚡"},
  {id:"929871",name:"DOTA CATS 60mg",brand:"DOTA",cat:"Жидкости Premium",price:250,sku:"929871",emoji:"🎮"},
  {id:"929749",name:"DUALL EXTREME",brand:"DUALL",cat:"Жидкости Premium",price:245,sku:"929749",emoji:"🔥"},
  {id:"929913",name:"DUALL NICBAR 50000 puff",brand:"DUALL",cat:"Жидкости Premium",price:790,sku:"929913",emoji:"🔥"},
  {id:"929688",name:"DUALL SALT 2/5% (38 вкусов)",brand:"DUALL",cat:"Жидкости Premium",price:235,sku:"929688",emoji:"🔥"},
  {id:"929907",name:"FUMO PREMIUM 2/5%",brand:"FUMO",cat:"Жидкости Premium",price:490,sku:"929907",emoji:"🌫️"},
  {id:"929899",name:"GANG X-BOX 20 EXTRA HARD",brand:"GANG",cat:"Жидкости Premium",price:230,sku:"929899",emoji:"💥"},
  {id:"929764",name:"ICE FOX PREMIUM HARD (40 вкусов)",brand:"ICEBERG",cat:"Жидкости Premium",price:430,sku:"929764",emoji:"🦊"},
  {id:"929846",name:"INFLAVE PREMIUM",brand:"INFLAVE",cat:"Жидкости Premium",price:490,sku:"929846",emoji:"🌿"},
  {id:"00318",name:"LIT ENERGY 5% (5 вкусов)",brand:"LIT ENERGY",cat:"Жидкости Premium",price:160,sku:"00318",emoji:"⚡"},
  {id:"00254",name:"MONSTERVAPOR 5%",brand:"MONSTERVAPOR",cat:"Жидкости Premium",price:220,sku:"00254",emoji:"👾"},
  {id:"00576",name:"MONSTERVAPOR 2%",brand:"MONSTERVAPOR",cat:"Жидкости Premium",price:210,sku:"00576",emoji:"👾"},
  {id:"929911",name:"NARCOZ 2% (25 вкусов)",brand:"NARCOZ",cat:"Жидкости Premium",price:250,sku:"929911",emoji:"🌙"},
  {id:"929427",name:"NARCOZ 5%",brand:"NARCOZ",cat:"Жидкости Premium",price:260,sku:"929427",emoji:"🌙"},
  {id:"929898",name:"OGGO PRIME HARD (40 вкусов)",brand:"OGGO",cat:"Жидкости Premium",price:280,sku:"929898",emoji:"🎯"},
  {id:"929920",name:"RELL ULTIMATE",brand:"RELL",cat:"Жидкости Premium",price:335,sku:"929920",emoji:"👑"},
  {id:"929651",name:"SKALA 2% (5 вкусов)",brand:"SKALA",cat:"Жидкости Premium",price:169,sku:"929651",emoji:"🏔️"},
  {id:"929906",name:"SKALA 5% (20 вкусов)",brand:"SKALA",cat:"Жидкости Premium",price:220,sku:"929906",emoji:"🏔️"},
  {id:"00237",name:"SKALA v2 (10 вкусов)",brand:"SKALA",cat:"Жидкости Premium",price:160,sku:"00237",emoji:"🏔️"},
  {id:"929874",name:"TOXIC FRUITS (15 вкусов)",brand:"TOXIC FRUITS",cat:"Жидкости Premium",price:190,sku:"929874",emoji:"🍈"},
  {id:"00588",name:"TOYZ STRONG",brand:"TOYZ",cat:"Жидкости Premium",price:280,sku:"00588",emoji:"🎲"},
  {id:"00394",name:"TRAPA UP 5% (20 вкусов)",brand:"TRAVA",cat:"Жидкости Premium",price:220,sku:"00394",emoji:"🌱"},
  {id:"00586",name:"ИНДИВИDUALL 2/5%",brand:"ИНДИВИDUALL",cat:"Жидкости Premium",price:230,sku:"00586",emoji:"🎭"},
  {id:"929909",name:"LEGEND МИШКА HUSKY 20 strong",brand:"МИШКА HUSKY",cat:"Жидкости Premium",price:235,sku:"929909",emoji:"🐻"},
  {id:"929922",name:"МРАК by Че НАДО? 60mg (10 вкусов)",brand:"МРАК",cat:"Жидкости Premium",price:240,sku:"929922",emoji:"😈"},
  {id:"929863",name:"ПСИХ 6% (10 вкусов)",brand:"ПСИХ",cat:"Жидкости Premium",price:190,sku:"929863",emoji:"🤪"},
  {id:"929924",name:"РИК и МОРТИ ЗАМЕРЗОН MEDIUM (10 вкусов)",brand:"РИК и МОРТИ",cat:"Жидкости Premium",price:230,sku:"929924",emoji:"🛸"},
  {id:"929923",name:"РИК и МОРТИ ЗАМЕРЗОН STRONG (9 вкусов)",brand:"РИК и МОРТИ",cat:"Жидкости Premium",price:240,sku:"929923",emoji:"🛸"},
  {id:"929693",name:"BRUSKO MINICAN",brand:"Brusko",cat:"Устройства (Поды)",price:230,sku:"929693",emoji:"📱"},
  {id:"929667",name:"BRUSKO PAGEE AIR",brand:"Brusko",cat:"Устройства (Поды)",price:190,sku:"929667",emoji:"📱"},
  {id:"929886",name:"Feelin pro2 (злой)",brand:"Feelin",cat:"Устройства (Поды)",price:270,sku:"929886",emoji:"📱"},
  {id:"tmp001",name:"MINIKAN FLICK",brand:"Brusko",cat:"Устройства (Поды)",price:250,sku:"tmp001",emoji:"📱"},
];

const ac = "#00e5ff";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Syne:wght@700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0d0f14;color:#eef0f6;font-family:'Manrope',sans-serif;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#2a2f3f;border-radius:2px}
`;

export default function App() {
  const [products, setProducts] = useState(BASE_PRODUCTS);
  const [activeCat, setActiveCat] = useState("Все");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [screen, setScreen] = useState("catalog"); // catalog | cart | checkout | success
  const [markup, setMarkup] = useState(0);
  const [toast, setToast] = useState(null);
  const [selectedProd, setSelectedProd] = useState(null);
  const [logoClicks, setLogoClicks] = useState(0);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPw, setAdminPw] = useState("");
  const [adminPwErr, setAdminPwErr] = useState(false);
  const [adminTab, setAdminTab] = useState("analytics");
  const [orders, setOrders] = useState([]);
  const [pushHistory, setPushHistory] = useState([]);
  const [pushText, setPushText] = useState("");
  const [pushBanner, setPushBanner] = useState(null);
  const [managerName, setManagerName] = useState("Александр");
  const [managerTag, setManagerTag] = useState("@wayspod_manager");
  const [tgToken, setTgToken] = useState("");
  const [tgChatId, setTgChatId] = useState("");
  const [tgStatus, setTgStatus] = useState("none"); // none | ok | error
  const [tgBotName, setTgBotName] = useState("");
  const [markupVal, setMarkupVal] = useState(0);
  const [siteName, setSiteName] = useState("Ways Pod");
  const [siteDesc, setSiteDesc] = useState("Прямые поставки от производителей. Лучшие цены на жидкости, АКБ, баки и поды.");
  const [accentColor, setAccentColor] = useState("#00e5ff");
  const [logoText, setLogoText] = useState("WP");
  const [editProd, setEditProd] = useState(null);
  const [addProdOpen, setAddProdOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({company:"",name:"",phone:"",tg:"",addr:"",comment:""});
  const logoTimer = useRef(null);
  const logoClicksRef = useRef(0);

  const getPrice = (base) => Math.round(base * (1 + markup / 100));

  const cats = ["Все", ...Array.from(new Set(products.map(p => p.cat)))];

  const filtered = products.filter(p => {
    const matchCat = activeCat === "Все" || p.cat === activeCat;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const cartItems = Object.values(cart).filter(i => i.qty > 0);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const showToast = (msg, type = "ok") => {
    setToast({msg, type});
    setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (id) => {
    const p = products.find(x => x.id === id);
    if (!p) return;
    setCart(prev => {
      const existing = prev[id] || {id, name: p.name, price: getPrice(p.price), emoji: p.emoji, qty: 0};
      return {...prev, [id]: {...existing, price: getPrice(p.price), qty: existing.qty + 1}};
    });
    showToast(`${p.emoji} Добавлено!`, "ok");
  };

  const changeQty = (id, delta) => {
    setCart(prev => {
      const item = prev[id];
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) { const n = {...prev}; delete n[id]; return n; }
      return {...prev, [id]: {...item, qty: newQty}};
    });
  };

  const handleLogoClick = () => {
    logoClicksRef.current += 1;
    clearTimeout(logoTimer.current);
    if (logoClicksRef.current >= 5) {
      logoClicksRef.current = 0;
      setAdminOpen(true);
    } else {
      logoTimer.current = setTimeout(() => { logoClicksRef.current = 0; }, 2000);
    }
  };

  const checkAdminPw = () => {
    if (adminPw === "admin11") {
      setAdminAuth(true);
      setAdminPwErr(false);
      setAdminPw("");
    } else {
      setAdminPwErr(true);
      setTimeout(() => setAdminPwErr(false), 1500);
      setAdminPw("");
    }
  };

  const submitOrder = () => {
    if (!orderForm.company || !orderForm.name || !orderForm.phone) {
      showToast("Заполните все поля", "err"); return;
    }
    const order = {
      id: "WP" + Date.now().toString().slice(-6),
      ...orderForm,
      items: [...cartItems],
      total: cartTotal,
      date: new Date().toLocaleString("ru-RU"),
    };
    setOrders(prev => [order, ...prev]);
    setCart({});
    setOrderForm({company:"",name:"",phone:"",tg:"",addr:"",comment:""});
    sendTg(order);
    setScreen("success");
  };

  const sendTg = async (order) => {
    if (!tgToken || !tgChatId) return;
    const items = order.items.map(i => `• ${i.name} ×${i.qty} = ${i.price * i.qty}₽`).join("\n");
    const text = `🛒 Новый заказ #${order.id}\n\n👤 ${order.company}\n📞 ${order.phone}${order.tg ? "\n💬 " + order.tg : ""}\n📍 ${order.addr || "—"}\n\nТовары:\n${items}\n\n💰 Итого: ${order.total.toLocaleString("ru")} ₽\n🕐 ${order.date}${order.comment ? "\n📝 " + order.comment : ""}`;
    try {
      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({chat_id: tgChatId, text}),
      });
    } catch(e) {}
  };

  const checkTg = async () => {
    if (!tgToken) return;
    try {
      const r = await fetch(`https://api.telegram.org/bot${tgToken}/getMe`);
      const d = await r.json();
      if (d.ok) { setTgStatus("ok"); setTgBotName("@" + d.result.username); }
      else setTgStatus("error");
    } catch { setTgStatus("error"); }
  };

  const sendPush = () => {
    if (!pushText.trim()) return;
    setPushHistory(prev => [{text: pushText, date: new Date().toLocaleString("ru-RU")}, ...prev]);
    setPushBanner(pushText);
    setPushText("");
    setTimeout(() => setPushBanner(null), 5000);
    showToast("Рассылка отправлена", "ok");
  };

  const applyMarkup = () => {
    setMarkup(markupVal);
    showToast(`Наценка ${markupVal}% применена`, "ok");
  };

  const saveAdminProd = (data) => {
    if (data.id) {
      setProducts(prev => prev.map(p => p.id === data.id ? {...p, ...data} : p));
    } else {
      setProducts(prev => [...prev, {...data, id: "new_" + Date.now()}]);
    }
    setAddProdOpen(false);
    setEditProd(null);
    showToast("Товар сохранён", "ok");
  };

  const deleteProd = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast("Удалено", "ok");
  };

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const clients = new Set(orders.map(o => o.phone)).size;
  const avgCheck = orders.length ? Math.round(revenue / orders.length) : 0;

  const accent = accentColor;

  // ---- STYLES ----
  const S = {
    app: {maxWidth:480,margin:"0 auto",minHeight:"100vh",background:"#0d0f14",position:"relative",fontFamily:"'Manrope',sans-serif",overflow:"hidden"},
    header: {position:"sticky",top:0,zIndex:100,background:"rgba(13,15,20,0.94)",backdropFilter:"blur(20px)",borderBottom:"1px solid #2a2f3f",padding:"0 16px"},
    headerInner: {display:"flex",alignItems:"center",justifyContent:"space-between",height:60},
    logo: {display:"flex",alignItems:"center",gap:10,cursor:"pointer",userSelect:"none"},
    logoIcon: {width:36,height:36,background:`linear-gradient(135deg,${accent},#7c3aed)`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,color:"#fff"},
    logoTextWrap: {fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,letterSpacing:-0.5},
    logoAccent: {color:accent},
    cartBtn: {background:"#1e222d",border:"1px solid #2a2f3f",borderRadius:10,padding:"8px 14px",display:"flex",alignItems:"center",gap:7,cursor:"pointer",fontSize:13,fontWeight:600,color:"#eef0f6"},
    badge: {background:accent,color:"#000",borderRadius:20,padding:"1px 8px",fontSize:11,fontWeight:800},
    hero: {padding:"22px 16px 8px"},
    heroBadge: {display:"inline-flex",alignItems:"center",gap:6,background:"rgba(0,229,255,0.07)",border:`1px solid rgba(0,229,255,0.2)`,borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:700,color:accent,letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:14},
    heroDot: {width:6,height:6,background:accent,borderRadius:"50%"},
    h1: {fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,lineHeight:1.15,marginBottom:8},
    h1em: {background:`linear-gradient(90deg,${accent},#7c3aed)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
    heroP: {fontSize:13,color:"#8892a4",lineHeight:1.6,marginBottom:16},
    statsGrid: {display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:4},
    statCard: {background:"#161920",border:"1px solid #2a2f3f",borderRadius:10,padding:"11px 8px",textAlign:"center"},
    statNum: {fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:accent},
    statLabel: {fontSize:9,color:"#4f5a6e",fontWeight:600,marginTop:2,textTransform:"uppercase",letterSpacing:"0.05em"},
    searchWrap: {padding:"10px 16px"},
    searchBox: {position:"relative"},
    searchIcon: {position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"#4f5a6e",fontSize:14,pointerEvents:"none"},
    searchInput: {width:"100%",background:"#161920",border:"1px solid #2a2f3f",borderRadius:12,padding:"12px 16px 12px 40px",fontSize:14,color:"#eef0f6",fontFamily:"'Manrope',sans-serif",outline:"none"},
    catsWrap: {padding:"8px 0 4px"},
    catsLabel: {padding:"0 16px",fontSize:10,fontWeight:700,color:"#4f5a6e",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8},
    catsScroll: {display:"flex",gap:8,padding:"0 16px",overflowX:"auto",scrollbarWidth:"none",paddingBottom:4},
    catChip: (active) => ({flexShrink:0,background: active ? accent : "#161920",border:`1px solid ${active ? accent : "#2a2f3f"}`,borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:700,color: active ? "#000" : "#8892a4",cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s"}),
    prodsWrap: {padding:"14px 16px 90px"},
    secHeader: {display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12},
    secTitle: {fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800},
    secCount: {fontSize:11,color:"#4f5a6e",background:"#1e222d",borderRadius:20,padding:"3px 10px",fontWeight:700},
    grid: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},
    card: {background:"#161920",border:"1px solid #2a2f3f",borderRadius:14,overflow:"hidden",cursor:"pointer",position:"relative",transition:"border-color .2s"},
    cardImg: {width:"100%",aspectRatio:"1",background:"#1e222d",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40},
    cardBody: {padding:10},
    cardBrand: {fontSize:9,fontWeight:800,color:accent,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:3},
    cardName: {fontSize:12,fontWeight:700,lineHeight:1.3,marginBottom:6,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},
    cardMeta: {display:"flex",alignItems:"center",justifyContent:"space-between"},
    cardPrice: {fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:800},
    cardPriceSub: {fontSize:10,color:"#4f5a6e",fontFamily:"'Manrope',sans-serif"},
    cardSku: {fontSize:9,color:"#4f5a6e",marginTop:3},
    addBtn: {width:28,height:28,background:`linear-gradient(135deg,${accent},#7c3aed)`,border:"none",borderRadius:8,color:"#fff",fontSize:17,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,flexShrink:0},
    inCartBadge: {position:"absolute",top:8,right:8,background:accent,color:"#000",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:800},
    bottomNav: {position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(22,25,32,0.97)",backdropFilter:"blur(20px)",borderTop:"1px solid #2a2f3f",zIndex:90,padding:"8px 0 8px"},
    navItems: {display:"flex",justifyContent:"space-around"},
    navItem: (active) => ({display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",padding:"4px 16px"}),
    navIcon: (active) => ({fontSize:20,filter: active ? `drop-shadow(0 0 6px ${accent})` : "none"}),
    navLabel: (active) => ({fontSize:10,fontWeight:700,color: active ? accent : "#4f5a6e"}),
    // modals
    overlay: {position:"fixed",inset:0,background:"rgba(0,0,0,0.72)",zIndex:200,backdropFilter:"blur(4px)"},
    modal: {position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#161920",borderRadius:"24px 24px 0 0",zIndex:201,maxHeight:"90vh",overflowY:"auto"},
    modalHandle: {width:36,height:4,background:"#2a2f3f",borderRadius:2,margin:"12px auto 0"},
    modalHeader: {padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #2a2f3f"},
    modalTitle: {fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800},
    modalClose: {background:"#1e222d",border:"1px solid #2a2f3f",borderRadius:8,width:32,height:32,cursor:"pointer",color:"#8892a4",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"},
    // cart
    cartItem: {display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid #2a2f3f"},
    cartIcon: {width:44,height:44,background:"#1e222d",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0},
    cartInfo: {flex:1,minWidth:0},
    cartName: {fontSize:12,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},
    cartPrice: {fontSize:13,fontWeight:800,color:accent,marginTop:2},
    qtyRow: {display:"flex",alignItems:"center",gap:8,flexShrink:0},
    qtyBtn: {width:28,height:28,background:"#252a38",border:"1px solid #2a2f3f",borderRadius:7,cursor:"pointer",fontSize:14,fontWeight:800,color:"#eef0f6",display:"flex",alignItems:"center",justifyContent:"center"},
    qtyNum: {fontSize:14,fontWeight:800,minWidth:20,textAlign:"center"},
    cartFooter: {padding:"16px 20px 32px",background:"#161920"},
    totalRow: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},
    totalLabel: {fontSize:14,color:"#8892a4"},
    totalVal: {fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800},
    checkoutBtn: {width:"100%",background:`linear-gradient(135deg,${accent},#7c3aed)`,border:"none",borderRadius:14,padding:16,fontSize:15,fontWeight:800,color:"#fff",cursor:"pointer"},
    emptyCart: {textAlign:"center",padding:"40px 20px",color:"#4f5a6e"},
    // form
    formWrap: {padding:"16px 20px 32px"},
    fGroup: {marginBottom:14},
    fLabel: {fontSize:12,fontWeight:700,color:"#8892a4",marginBottom:6,display:"block"},
    fInput: {width:"100%",background:"#0d0f14",border:"1px solid #2a2f3f",borderRadius:10,padding:"12px 14px",fontSize:14,color:"#eef0f6",fontFamily:"'Manrope',sans-serif",outline:"none"},
    fTextarea: {resize:"vertical",minHeight:72},
    submitBtn: {width:"100%",background:"linear-gradient(135deg,#22c55e,#16a34a)",border:"none",borderRadius:14,padding:16,fontSize:15,fontWeight:800,color:"#fff",cursor:"pointer"},
    // success
    successWrap: {padding:"32px 20px",textAlign:"center"},
    successIcon: {fontSize:64,marginBottom:16},
    successH: {fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,marginBottom:8},
    successP: {fontSize:14,color:"#8892a4",lineHeight:1.6,marginBottom:20},
    managerCard: {background:"#1e222d",border:"1px solid #2a2f3f",borderRadius:14,padding:16,marginBottom:20,display:"flex",alignItems:"center",gap:12},
    managerAvatar: {width:44,height:44,background:`linear-gradient(135deg,#7c3aed,${accent})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0},
    managerName: {fontWeight:800,fontSize:14},
    managerTag: {fontSize:12,color:accent},
    okBtn: {background:"#1e222d",border:"1px solid #2a2f3f",borderRadius:14,padding:12,fontSize:14,fontWeight:700,color:"#eef0f6",cursor:"pointer",width:"100%"},
    // prod detail
    pdImg: {width:"100%",aspectRatio:"1.5",background:"#1e222d",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:80,marginBottom:16},
    pdBrand: {fontSize:11,fontWeight:800,color:accent,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6},
    pdName: {fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,marginBottom:8,lineHeight:1.2},
    pdSku: {fontSize:11,color:"#4f5a6e",marginBottom:12},
    pdPrice: {fontFamily:"'Syne',sans-serif",fontSize:30,fontWeight:800,marginBottom:20},
    pdBtn: {width:"100%",background:`linear-gradient(135deg,${accent},#7c3aed)`,border:"none",borderRadius:14,padding:16,fontSize:15,fontWeight:800,color:"#fff",cursor:"pointer"},
    // toast
    toast: (type) => ({position:"fixed",top:74,left:"50%",transform:"translateX(-50%)",background:"#1e222d",border:`1px solid ${type==="err"?"#ef4444":"#22c55e"}`,borderRadius:10,padding:"9px 18px",fontSize:13,fontWeight:700,color: type==="err"?"#ef4444":"#22c55e",zIndex:500,whiteSpace:"nowrap",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",pointerEvents:"none"}),
    // push banner
    pushBanner: {position:"fixed",top:68,left:"50%",transform:"translateX(-50%)",width:"calc(100% - 32px)",maxWidth:448,background:`linear-gradient(135deg,#7c3aed,${accent})`,borderRadius:14,padding:"12px 16px",zIndex:150,boxShadow:"0 8px 32px rgba(0,0,0,0.4)"},
    pushBannerTitle: {fontSize:10,fontWeight:800,color:"rgba(255,255,255,0.65)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4},
    pushBannerText: {fontSize:13,fontWeight:700,color:"#fff"},
    // admin
    adminOverlay: {position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(8px)"},
    adminPanel: {background:"#161920",width:"100%",maxWidth:480,borderRadius:"24px 24px 0 0",maxHeight:"95vh",overflowY:"auto",position:"relative"},
    adminCloseTop: {position:"absolute",top:14,right:14,background:"#1e222d",border:"1px solid #2a2f3f",borderRadius:8,width:32,height:32,cursor:"pointer",color:"#8892a4",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10},
    adminLogin: {padding:"36px 24px 48px",textAlign:"center"},
    adminLoginIcon: {fontSize:48,marginBottom:16},
    adminLoginH: {fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,marginBottom:8},
    adminLoginP: {fontSize:13,color:"#4f5a6e",marginBottom:24},
    adminPwInput: {width:"100%",background:"#0d0f14",border:`1px solid #2a2f3f`,borderRadius:10,padding:14,fontSize:15,color:"#eef0f6",fontFamily:"'Manrope',sans-serif",outline:"none",textAlign:"center",letterSpacing:"0.1em",marginBottom:12},
    adminLoginBtn: {width:"100%",background:`linear-gradient(135deg,${accent},#7c3aed)`,border:"none",borderRadius:14,padding:14,fontSize:15,fontWeight:800,color:"#fff",cursor:"pointer"},
    adminTabs: {display:"flex",borderBottom:"1px solid #2a2f3f",overflowX:"auto",scrollbarWidth:"none"},
    adminTab: (active) => ({flexShrink:0,padding:"11px 14px",fontSize:12,fontWeight:700,color: active ? accent : "#4f5a6e",cursor:"pointer",borderBottom:`2px solid ${active ? accent : "transparent"}`,whiteSpace:"nowrap",transition:"all .2s"}),
    adminSection: {padding:16},
    aGrid: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16},
    aCard: {background:"#0d0f14",border:"1px solid #2a2f3f",borderRadius:14,padding:14},
    aNum: {fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,marginBottom:4},
    aLabel: {fontSize:10,color:"#4f5a6e",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em"},
    aFieldLabel: {fontSize:11,fontWeight:800,color:"#4f5a6e",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,marginTop:14,display:"block"},
    aInput: {width:"100%",background:"#0d0f14",border:"1px solid #2a2f3f",borderRadius:10,padding:"10px 12px",fontSize:13,color:"#eef0f6",fontFamily:"'Manrope',sans-serif",outline:"none",marginBottom:4},
    aBtn: {background:`linear-gradient(135deg,${accent},#7c3aed)`,border:"none",borderRadius:10,padding:"10px 16px",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",marginTop:8},
    aBtnFull: {width:"100%",display:"block"},
    aBtnSecondary: {background:"#1e222d",border:"1px solid #2a2f3f",borderRadius:10,padding:"10px 16px",fontSize:13,fontWeight:700,color:"#eef0f6",cursor:"pointer"},
    tgStatus: (ok) => ({display:"flex",alignItems:"center",gap:8,fontSize:12,fontWeight:700,padding:"8px 12px",background:"#0d0f14",borderRadius:10,marginBottom:10,color: ok === "ok" ? "#22c55e" : ok === "error" ? "#ef4444" : "#8892a4"}),
    tgDot: (ok) => ({width:8,height:8,borderRadius:"50%",background: ok === "ok" ? "#22c55e" : ok === "error" ? "#ef4444" : "#f59e0b",flexShrink:0}),
    prodAdminItem: {display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #2a2f3f"},
    prodAdminIcon: {width:36,height:36,background:"#1e222d",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0},
    prodAdminInfo: {flex:1,minWidth:0},
    prodAdminName: {fontSize:12,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},
    prodAdminPrice: {fontSize:12,color:accent,fontWeight:800},
    prodAdminActions: {display:"flex",gap:6,flexShrink:0},
    iconBtn: {width:28,height:28,borderRadius:7,border:"1px solid #2a2f3f",background:"#1e222d",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",color:"#8892a4"},
    markupDisplay: {fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:800,color:accent,textAlign:"center",padding:"12px 0"},
    rangeInput: {width:"100%",accentColor:accent,cursor:"pointer"},
    pushTextarea: {width:"100%",background:"#0d0f14",border:"1px solid #2a2f3f",borderRadius:10,padding:"10px 12px",fontSize:13,color:"#eef0f6",fontFamily:"'Manrope',sans-serif",outline:"none",resize:"vertical",minHeight:80,marginBottom:8},
    pushItem: {background:"#0d0f14",border:"1px solid #2a2f3f",borderRadius:10,padding:"10px 12px",marginBottom:8},
    pushItemText: {fontSize:12,fontWeight:600,marginBottom:4},
    pushItemMeta: {fontSize:10,color:"#4f5a6e"},
    orderLogItem: {background:"#0d0f14",border:"1px solid #2a2f3f",borderRadius:14,padding:12,marginBottom:10},
    orderLogHeader: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},
    orderLogId: {fontSize:11,fontWeight:800,color:accent},
    orderLogTime: {fontSize:10,color:"#4f5a6e"},
    orderLogCustomer: {fontSize:13,fontWeight:700,marginBottom:4},
    orderLogTotal: {fontSize:13,color:"#22c55e",fontWeight:800},
    sectionDivider: {height:1,background:"#2a2f3f",margin:"16px 0"},
    colorInput: {width:"100%",background:"#0d0f14",border:"1px solid #2a2f3f",borderRadius:10,padding:"6px 12px",height:42,cursor:"pointer",marginBottom:4},
  };

  // ---- ADD/EDIT PRODUCT FORM ----
  const [epData, setEpData] = useState({id:"",name:"",brand:"",cat:"",price:"",unit:"",sku:"",emoji:"📦"});

  const openEditProd = (p) => {
    setEpData({id:p.id,name:p.name,brand:p.brand,cat:p.cat,price:p.price,unit:p.unit||"",sku:p.sku,emoji:p.emoji||"📦"});
    setAddProdOpen(true);
  };
  const openNewProd = () => {
    setEpData({id:"",name:"",brand:"",cat:"",price:"",unit:"",sku:"",emoji:"📦"});
    setAddProdOpen(true);
  };
  const handleSaveProd = () => {
    if (!epData.name || !epData.price) { showToast("Название и цена обязательны","err"); return; }
    const data = {...epData, price: parseFloat(epData.price)||0};
    if (data.id) {
      setProducts(prev => prev.map(p => p.id === data.id ? {...p,...data} : p));
    } else {
      setProducts(prev => [...prev, {...data, id:"new_"+Date.now()}]);
    }
    setAddProdOpen(false);
    showToast("Сохранено","ok");
  };

  const [activeNav, setActiveNav] = useState("catalog");

  // ---- RENDER ----
  return (
    <div style={S.app}>
      <style>{css}</style>

      {/* TOAST */}
      {toast && <div style={S.toast(toast.type)}>{toast.msg}</div>}

      {/* PUSH BANNER */}
      {pushBanner && (
        <div style={S.pushBanner}>
          <div style={S.pushBannerTitle}>📢 {siteName}</div>
          <div style={S.pushBannerText}>{pushBanner}</div>
        </div>
      )}

      {/* HEADER */}
      <div style={S.header}>
        <div style={S.headerInner}>
          <div style={S.logo} onClick={handleLogoClick}>
            <div style={S.logoIcon}>{logoText}</div>
            <div style={S.logoTextWrap}>
              <span style={S.logoAccent}>{siteName.split(" ")[0]}</span>
              {siteName.includes(" ") ? " " + siteName.split(" ").slice(1).join(" ") : ""}
            </div>
          </div>
          <button style={S.cartBtn} onClick={() => setScreen("cart")}>
            🛒 <span style={S.badge}>{cartCount}</span>
          </button>
        </div>
      </div>

      {/* CATALOG */}
      {activeNav === "catalog" && screen === "catalog" && (
        <>
          <div style={S.hero}>
            <div style={S.heroBadge}><div style={S.heroDot}></div>🚀 B2B оптовые поставки</div>
            <h1 style={S.h1}>Оптовый склад<br/><span style={S.h1em}>вейп-продукции</span></h1>
            <p style={S.heroP}>{siteDesc}</p>
            <div style={S.statsGrid}>
              <div style={S.statCard}><div style={S.statNum}>{products.length}</div><div style={S.statLabel}>Товаров</div></div>
              <div style={S.statCard}><div style={S.statNum}>∞</div><div style={S.statLabel}>Наличие</div></div>
              <div style={S.statCard}><div style={S.statNum}>24h</div><div style={S.statLabel}>Доставка</div></div>
            </div>
          </div>

          <div style={S.searchWrap}>
            <div style={S.searchBox}>
              <span style={S.searchIcon}>🔍</span>
              <input
                style={S.searchInput}
                placeholder="Поиск по названию, бренду, артикулу..."
                value={search}
                onChange={e => { setSearch(e.target.value); setActiveCat("Все"); }}
              />
            </div>
          </div>

          <div style={S.catsWrap}>
            <div style={S.catsLabel}>Категории</div>
            <div style={S.catsScroll}>
              {cats.map(c => (
                <div key={c} style={S.catChip(c === activeCat)}
                  onClick={() => { setActiveCat(c); setSearch(""); }}>
                  {CATS_ICONS[c] || "📦"} {c}
                </div>
              ))}
            </div>
          </div>

          <div style={S.prodsWrap}>
            <div style={S.secHeader}>
              <div style={S.secTitle}>{activeCat === "Все" ? "Все товары" : activeCat}</div>
              <div style={S.secCount}>{filtered.length} шт</div>
            </div>
            {filtered.length === 0 ? (
              <div style={{textAlign:"center",padding:"48px 16px",color:"#4f5a6e"}}>
                <div style={{fontSize:48,marginBottom:12}}>🔍</div>
                <div style={{fontSize:14}}>Ничего не найдено</div>
              </div>
            ) : (
              <div style={S.grid}>
                {filtered.map(p => (
                  <div key={p.id} style={S.card} onClick={() => setSelectedProd(p)}>
                    {cart[p.id]?.qty > 0 && <div style={S.inCartBadge}>×{cart[p.id].qty}</div>}
                    <div style={S.cardImg}>{p.emoji}</div>
                    <div style={S.cardBody}>
                      <div style={S.cardBrand}>{p.brand}</div>
                      <div style={S.cardName}>{p.name}</div>
                      <div style={S.cardMeta}>
                        <div>
                          <div style={S.cardPrice}>{getPrice(p.price)} <span style={S.cardPriceSub}>₽{p.unit?"/"+p.unit:""}</span></div>
                          <div style={S.cardSku}>#{p.sku}</div>
                        </div>
                        <button style={S.addBtn} onClick={e => { e.stopPropagation(); addToCart(p.id); }}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ORDERS NAV */}
      {activeNav === "orders" && (
        <div style={{padding:"24px 16px 90px"}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,marginBottom:16}}>📦 Мои заказы</h2>
          {orders.length === 0 ? (
            <div style={{textAlign:"center",padding:"48px 16px",color:"#4f5a6e"}}>
              <div style={{fontSize:48,marginBottom:12}}>📦</div>
              <div>Заказов пока нет</div>
            </div>
          ) : orders.map(o => (
            <div key={o.id} style={S.orderLogItem}>
              <div style={S.orderLogHeader}><span style={S.orderLogId}>#{o.id}</span><span style={S.orderLogTime}>{o.date}</span></div>
              <div style={S.orderLogCustomer}>{o.company} · {o.name}</div>
              <div style={{fontSize:11,color:"#4f5a6e",marginBottom:6}}>{o.items.length} позиций</div>
              <div style={S.orderLogTotal}>{o.total.toLocaleString("ru")} ₽</div>
            </div>
          ))}
        </div>
      )}

      {/* ABOUT NAV */}
      {activeNav === "about" && (
        <div style={{padding:"24px 16px 90px"}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,marginBottom:12}}>ℹ️ О компании</h2>
          <div style={{background:"#161920",border:"1px solid #2a2f3f",borderRadius:14,padding:20,marginBottom:12}}>
            <div style={{fontWeight:800,fontSize:16,marginBottom:8}}>{siteName}</div>
            <div style={{fontSize:14,color:"#8892a4",lineHeight:1.7}}>{siteDesc}</div>
          </div>
          <div style={{background:"#161920",border:"1px solid #2a2f3f",borderRadius:14,padding:20}}>
            <div style={{fontWeight:800,fontSize:14,marginBottom:10}}>Контакты</div>
            <div style={{fontSize:13,color:"#8892a4",lineHeight:2}}>
              📱 Telegram: {managerTag}<br/>
              👤 Менеджер: {managerName}<br/>
              📦 Работаем с ИП и ООО<br/>
              🚚 Доставка по всей России
            </div>
          </div>
        </div>
      )}

      {/* CART SCREEN */}
      {screen === "cart" && (
        <div style={{...S.modal,transform:"none",position:"static",borderRadius:0,background:"transparent",maxHeight:"none"}}>
          <div style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid #2a2f3f"}}>
            <button style={{...S.modalClose,flexShrink:0}} onClick={() => setScreen("catalog")}>←</button>
            <div style={S.modalTitle}>🛒 Корзина</div>
          </div>
          <div style={{padding:"0 20px 120px"}}>
            {cartItems.length === 0 ? (
              <div style={S.emptyCart}>
                <div style={{fontSize:48,marginBottom:12}}>🛒</div>
                <div>Корзина пуста</div>
              </div>
            ) : (
              <>
                {cartItems.map(i => (
                  <div key={i.id} style={S.cartItem}>
                    <div style={S.cartIcon}>{i.emoji}</div>
                    <div style={S.cartInfo}>
                      <div style={S.cartName}>{i.name}</div>
                      <div style={S.cartPrice}>{(i.price * i.qty).toLocaleString("ru")} ₽</div>
                    </div>
                    <div style={S.qtyRow}>
                      <button style={S.qtyBtn} onClick={() => changeQty(i.id,-1)}>−</button>
                      <span style={S.qtyNum}>{i.qty}</span>
                      <button style={S.qtyBtn} onClick={() => changeQty(i.id,1)}>+</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {cartItems.length > 0 && (
            <div style={{...S.cartFooter,position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,zIndex:50}}>
              <div style={S.totalRow}>
                <div style={S.totalLabel}>Итого</div>
                <div style={S.totalVal}>{cartTotal.toLocaleString("ru")} ₽</div>
              </div>
              <button style={S.checkoutBtn} onClick={() => setScreen("checkout")}>Оформить заказ →</button>
            </div>
          )}
        </div>
      )}

      {/* CHECKOUT */}
      {screen === "checkout" && (
        <div style={{padding:"0 0 90px"}}>
          <div style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid #2a2f3f"}}>
            <button style={{...S.modalClose,flexShrink:0}} onClick={() => setScreen("cart")}>←</button>
            <div style={S.modalTitle}>📋 Оформление заказа</div>
          </div>
          <div style={S.formWrap}>
            {[
              {label:"Компания / ИП *",key:"company",ph:"ООО Ромашка"},
              {label:"Контактное лицо *",key:"name",ph:"Иван Иванов"},
              {label:"Телефон *",key:"phone",ph:"+7 999 000 00 00",type:"tel"},
              {label:"Telegram",key:"tg",ph:"@username"},
              {label:"Адрес доставки",key:"addr",ph:"г. Москва, ул. Примерная, 1"},
            ].map(f => (
              <div key={f.key} style={S.fGroup}>
                <label style={S.fLabel}>{f.label}</label>
                <input style={S.fInput} type={f.type||"text"} placeholder={f.ph}
                  value={orderForm[f.key]} onChange={e => setOrderForm(p => ({...p,[f.key]:e.target.value}))} />
              </div>
            ))}
            <div style={S.fGroup}>
              <label style={S.fLabel}>Комментарий</label>
              <textarea style={{...S.fInput,...S.fTextarea}}
                placeholder="Дополнительная информация..."
                value={orderForm.comment} onChange={e => setOrderForm(p => ({...p,comment:e.target.value}))} />
            </div>
            <button style={S.submitBtn} onClick={submitOrder}>✅ Подтвердить заказ</button>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {screen === "success" && (
        <div style={S.successWrap}>
          <div style={S.successIcon}>🎉</div>
          <h3 style={S.successH}>Заказ принят!</h3>
          <p style={S.successP}>Ваш заказ успешно оформлен. Наш менеджер свяжется с вами в ближайшее время.</p>
          <div style={S.managerCard}>
            <div style={S.managerAvatar}>👨‍💼</div>
            <div>
              <div style={S.managerName}>{managerName}</div>
              <div style={S.managerTag}>{managerTag}</div>
            </div>
          </div>
          <button style={S.okBtn} onClick={() => { setScreen("catalog"); setActiveNav("catalog"); }}>
            Вернуться в каталог
          </button>
        </div>
      )}

      {/* PRODUCT DETAIL OVERLAY */}
      {selectedProd && (
        <>
          <div style={S.overlay} onClick={() => setSelectedProd(null)} />
          <div style={S.modal}>
            <div style={S.modalHandle} />
            <div style={S.modalHeader}>
              <div style={S.modalTitle}>Товар</div>
              <button style={S.modalClose} onClick={() => setSelectedProd(null)}>✕</button>
            </div>
            <div style={{padding:"16px 20px 32px"}}>
              <div style={S.pdImg}>{selectedProd.emoji}</div>
              <div style={S.pdBrand}>{selectedProd.brand}</div>
              <div style={S.pdName}>{selectedProd.name}</div>
              <div style={S.pdSku}>Арт: {selectedProd.sku} · {selectedProd.cat}</div>
              <div style={S.pdPrice}>{getPrice(selectedProd.price)} <span style={{fontSize:14,color:"#4f5a6e",fontFamily:"'Manrope',sans-serif"}}>₽{selectedProd.unit?"/"+selectedProd.unit:""}</span></div>
              <button style={S.pdBtn} onClick={() => { addToCart(selectedProd.id); setSelectedProd(null); }}>🛒 В корзину</button>
            </div>
          </div>
        </>
      )}

      {/* BOTTOM NAV */}
      {(screen === "catalog" || activeNav !== "catalog") && screen !== "checkout" && screen !== "success" && screen !== "cart" && (
        <div style={S.bottomNav}>
          <div style={S.navItems}>
            {[
              {key:"catalog",icon:"🏪",label:"Каталог"},
              {key:"orders",icon:"📦",label:"Заказы"},
              {key:"about",icon:"ℹ️",label:"О нас"},
            ].map(n => (
              <div key={n.key} style={S.navItem(n.key===activeNav)} onClick={() => { setActiveNav(n.key); setScreen("catalog"); }}>
                <div style={S.navIcon(n.key===activeNav)}>{n.icon}</div>
                <div style={S.navLabel(n.key===activeNav)}>{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADMIN OVERLAY */}
      {adminOpen && (
        <div style={S.adminOverlay}>
          <div style={S.adminPanel}>
            <button style={S.adminCloseTop} onClick={() => setAdminOpen(false)}>✕</button>

            {!adminAuth ? (
              <div style={S.adminLogin}>
                <div style={S.adminLoginIcon}>🔐</div>
                <h2 style={S.adminLoginH}>Панель администратора</h2>
                <p style={S.adminLoginP}>Ways Pod · Закрытый доступ</p>
                <input style={{...S.adminPwInput,border:`1px solid ${adminPwErr?"#ef4444":"#2a2f3f"}`}}
                  type="password" placeholder="••••••••" value={adminPw}
                  onChange={e => setAdminPw(e.target.value)}
                  onKeyDown={e => e.key==="Enter" && checkAdminPw()} />
                {adminPwErr && <div style={{color:"#ef4444",fontSize:12,marginBottom:8}}>Неверный пароль</div>}
                <button style={S.adminLoginBtn} onClick={checkAdminPw}>Войти</button>
              </div>
            ) : (
              <>
                <div style={{padding:"14px 16px",borderBottom:"1px solid #2a2f3f",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>⚙️ Админ-панель</div>
                  <button style={S.aBtnSecondary} onClick={() => { setAdminAuth(false); setAdminOpen(false); }}>Выйти</button>
                </div>
                <div style={S.adminTabs}>
                  {[["analytics","📊 Аналитика"],["products","📦 Товары"],["orders","🧾 Заказы"],["telegram","✈️ Telegram"],["push","📢 Рассылка"],["markup","💰 Наценка"],["settings","🔧 Настройки"]].map(([k,l]) => (
                    <div key={k} style={S.adminTab(adminTab===k)} onClick={() => setAdminTab(k)}>{l}</div>
                  ))}
                </div>

                {/* ANALYTICS */}
                {adminTab === "analytics" && (
                  <div style={S.adminSection}>
                    <div style={S.aGrid}>
                      <div style={S.aCard}><div style={{...S.aNum,color:accent}}>{orders.length}</div><div style={S.aLabel}>Заказов</div></div>
                      <div style={S.aCard}><div style={{...S.aNum,color:accent}}>{revenue.toLocaleString("ru")}₽</div><div style={S.aLabel}>Выручка</div></div>
                      <div style={S.aCard}><div style={{...S.aNum,color:accent}}>{clients}</div><div style={S.aLabel}>Клиентов</div></div>
                      <div style={S.aCard}><div style={{...S.aNum,color:accent}}>{avgCheck.toLocaleString("ru")}₽</div><div style={S.aLabel}>Ср. чек</div></div>
                    </div>
                    <div style={{fontSize:12,fontWeight:700,color:"#4f5a6e",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.08em"}}>Последние заказы</div>
                    {orders.length === 0 ? <div style={{fontSize:12,color:"#4f5a6e"}}>Заказов пока нет</div> :
                      orders.slice(0,10).map(o => (
                        <div key={o.id} style={S.orderLogItem}>
                          <div style={S.orderLogHeader}><span style={S.orderLogId}>#{o.id}</span><span style={S.orderLogTime}>{o.date}</span></div>
                          <div style={S.orderLogCustomer}>{o.company} · {o.name}</div>
                          <div style={{fontSize:11,color:"#4f5a6e",marginBottom:4}}>{o.phone}</div>
                          <div style={S.orderLogTotal}>{o.total.toLocaleString("ru")} ₽ · {o.items.length} поз.</div>
                        </div>
                      ))
                    }
                  </div>
                )}

                {/* PRODUCTS */}
                {adminTab === "products" && (
                  <div style={S.adminSection}>
                    <button style={{...S.aBtn,...S.aBtnFull,marginBottom:12}} onClick={openNewProd}>+ Добавить товар</button>
                    {products.map(p => (
                      <div key={p.id} style={S.prodAdminItem}>
                        <div style={S.prodAdminIcon}>{p.emoji||"📦"}</div>
                        <div style={S.prodAdminInfo}>
                          <div style={S.prodAdminName}>{p.name}</div>
                          <div style={S.prodAdminPrice}>{getPrice(p.price)} ₽</div>
                        </div>
                        <div style={S.prodAdminActions}>
                          <button style={S.iconBtn} onClick={() => openEditProd(p)}>✏️</button>
                          <button style={{...S.iconBtn,color:"#ef4444"}} onClick={() => deleteProd(p.id)}>🗑</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ORDERS */}
                {adminTab === "orders" && (
                  <div style={S.adminSection}>
                    {orders.length === 0 ? <div style={{fontSize:12,color:"#4f5a6e"}}>Заказов пока нет</div> :
                      orders.map(o => (
                        <div key={o.id} style={S.orderLogItem}>
                          <div style={S.orderLogHeader}><span style={S.orderLogId}>#{o.id}</span><span style={S.orderLogTime}>{o.date}</span></div>
                          <div style={S.orderLogCustomer}>{o.company} · {o.name}</div>
                          <div style={{fontSize:11,color:"#4f5a6e",marginBottom:4}}>{o.phone}{o.tg?" · "+o.tg:""}{o.addr?" · "+o.addr:""}</div>
                          <div style={{fontSize:11,color:"#4f5a6e",marginBottom:6}}>{o.items.map(i => i.name+"×"+i.qty).join(", ")}</div>
                          <div style={S.orderLogTotal}>{o.total.toLocaleString("ru")} ₽</div>
                        </div>
                      ))
                    }
                  </div>
                )}

                {/* TELEGRAM */}
                {adminTab === "telegram" && (
                  <div style={S.adminSection}>
                    <div style={S.tgStatus(tgStatus)}>
                      <div style={S.tgDot(tgStatus)}></div>
                      {tgStatus === "ok" ? `✅ ${tgBotName} подключён` : tgStatus === "error" ? "❌ Ошибка токена" : "⚪ Бот не подключён"}
                    </div>
                    <span style={S.aFieldLabel}>Токен Telegram-бота</span>
                    <input style={S.aInput} placeholder="123456789:AAF..." value={tgToken} onChange={e => setTgToken(e.target.value)} />
                    <span style={S.aFieldLabel}>Chat ID</span>
                    <input style={S.aInput} placeholder="-1001234567890" value={tgChatId} onChange={e => setTgChatId(e.target.value)} />
                    <button style={{...S.aBtn,...S.aBtnFull}} onClick={checkTg}>Проверить и подключить</button>
                    <div style={S.sectionDivider} />
                    <span style={S.aFieldLabel}>Менеджер для клиентов</span>
                    <input style={S.aInput} placeholder="Имя менеджера" value={managerName} onChange={e => setManagerName(e.target.value)} />
                    <input style={S.aInput} placeholder="@telegram_тег" value={managerTag} onChange={e => setManagerTag(e.target.value)} />
                    <button style={{...S.aBtn,...S.aBtnFull}} onClick={() => showToast("Менеджер сохранён","ok")}>Сохранить менеджера</button>
                    <div style={{marginTop:14,background:"#0d0f14",borderRadius:10,padding:12,fontSize:12,color:"#4f5a6e",lineHeight:1.7}}>
                      <b style={{color:"#8892a4"}}>Как настроить:</b><br/>
                      1. Создайте бота через @BotFather<br/>
                      2. Скопируйте токен<br/>
                      3. Получите Chat ID через @userinfobot<br/>
                      4. Введите данные выше
                    </div>
                  </div>
                )}

                {/* PUSH */}
                {adminTab === "push" && (
                  <div style={S.adminSection}>
                    <span style={S.aFieldLabel}>Текст рассылки</span>
                    <textarea style={S.pushTextarea} placeholder="Введите сообщение для пользователей..." value={pushText} onChange={e => setPushText(e.target.value)} />
                    <button style={{...S.aBtn,...S.aBtnFull}} onClick={sendPush}>📢 Отправить рассылку</button>
                    <span style={{...S.aFieldLabel,marginTop:20}}>История рассылок</span>
                    {pushHistory.length === 0 ? <div style={{fontSize:12,color:"#4f5a6e"}}>Рассылок пока нет</div> :
                      pushHistory.map((p,i) => (
                        <div key={i} style={S.pushItem}>
                          <div style={S.pushItemText}>{p.text}</div>
                          <div style={S.pushItemMeta}>{p.date}</div>
                        </div>
                      ))
                    }
                  </div>
                )}

                {/* MARKUP */}
                {adminTab === "markup" && (
                  <div style={S.adminSection}>
                    <div style={{fontSize:13,color:"#8892a4",marginBottom:16,lineHeight:1.6}}>Установите наценку на все товары. Применяется мгновенно к отображаемым ценам.</div>
                    <div style={S.markupDisplay}>{markupVal}%</div>
                    <input type="range" style={S.rangeInput} min={0} max={100} value={Math.min(markupVal,100)}
                      onChange={e => setMarkupVal(parseInt(e.target.value))} />
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#4f5a6e",marginTop:4,marginBottom:12}}>
                      <span>0%</span><span>50%</span><span>100%</span>
                    </div>
                    <span style={S.aFieldLabel}>Вручную (%)</span>
                    <input style={S.aInput} type="number" min={0} max={200} value={markupVal} onChange={e => setMarkupVal(parseInt(e.target.value)||0)} />
                    <div style={{fontSize:12,color:"#8892a4",marginTop:8}}>Текущая наценка: <b style={{color:accent}}>{markup}%</b></div>
                    <button style={{...S.aBtn,...S.aBtnFull}} onClick={applyMarkup}>Применить наценку</button>
                  </div>
                )}

                {/* SETTINGS */}
                {adminTab === "settings" && (
                  <div style={S.adminSection}>
                    <span style={S.aFieldLabel}>Название сайта</span>
                    <input style={S.aInput} value={siteName} onChange={e => setSiteName(e.target.value)} />
                    <span style={S.aFieldLabel}>Описание</span>
                    <input style={S.aInput} value={siteDesc} onChange={e => setSiteDesc(e.target.value)} />
                    <span style={S.aFieldLabel}>Логотип (инициалы)</span>
                    <input style={S.aInput} value={logoText} maxLength={3} onChange={e => setLogoText(e.target.value)} />
                    <span style={S.aFieldLabel}>Цвет акцента</span>
                    <input type="color" style={S.colorInput} value={accentColor} onChange={e => setAccentColor(e.target.value)} />
                    <button style={{...S.aBtn,...S.aBtnFull}} onClick={() => showToast("Настройки применены","ok")}>Сохранить</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ADD/EDIT PRODUCT OVERLAY */}
      {addProdOpen && (
        <div style={{...S.adminOverlay,zIndex:400}}>
          <div style={{...S.adminPanel,maxHeight:"80vh"}}>
            <button style={S.adminCloseTop} onClick={() => setAddProdOpen(false)}>✕</button>
            <div style={{padding:"14px 16px",borderBottom:"1px solid #2a2f3f"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>{epData.id ? "Редактировать" : "Добавить товар"}</div>
            </div>
            <div style={{padding:16,overflowY:"auto",maxHeight:"calc(80vh - 60px)"}}>
              {[
                {label:"Название",key:"name",ph:"DUFT 5%"},
                {label:"Бренд",key:"brand",ph:"DUFT"},
                {label:"Категория",key:"cat",ph:"Жидкости Premium"},
                {label:"Цена (₽)",key:"price",ph:"250",type:"number"},
                {label:"Единица",key:"unit",ph:"шт / мл"},
                {label:"Артикул",key:"sku",ph:"929649"},
                {label:"Иконка (эмодзи)",key:"emoji",ph:"🧴"},
              ].map(f => (
                <div key={f.key} style={{marginBottom:10}}>
                  <span style={S.aFieldLabel}>{f.label}</span>
                  <input style={S.aInput} type={f.type||"text"} placeholder={f.ph}
                    value={epData[f.key]} onChange={e => setEpData(p => ({...p,[f.key]:e.target.value}))} />
                </div>
              ))}
              <button style={{...S.aBtn,...S.aBtnFull,marginTop:8}} onClick={handleSaveProd}>Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
