export type Language = 'en' | 'te' | 'hi';

export interface TranslationDict {
  customerLounge: string;
  adminDashboard: string;
  deliveryKitchen: string;
  since2024: string;
  liveKitchenLink: string;
  tagline: string;
  cart: string;
  specialCounterBoard: string;
  scanConnect: string;
  scanConnectSub: string;
  upiPayments: string;
  upiPaymentsSub: string;
  instagramFeed: string;
  instagramFeedSub: string;
  googleReviews: string;
  googleReviewsSub: string;
  addToCart: string;
  added: string;
  price: string;
  customizeYourBrew: string;
  sweetness: string;
  temperature: string;
  chooseSideSnack: string;
  addSnack: string;
  noSnack: string;
  sweetnessNormal: string;
  sweetnessLess: string;
  sweetnessDouble: string;
  sweetnessNone: string;
  sweetnessBellam: string;
  tempHot: string;
  tempIced: string;
  yourCart: string;
  cartEmpty: string;
  checkoutDetails: string;
  customerName: string;
  phoneNumber: string;
  orderDeliveryType: string;
  counterPickup: string;
  localDelivery: string;
  deliveryAddress: string;
  specialInstructions: string;
  payScanConfirm: string;
  paymentSuccess: string;
  tokenAssigned: string;
  successSub: string;
  doneClose: string;
  totalAmount: string;
  loyaltyTitle: string;
  loyaltySub: string;
  loyaltyPointsCount: string;
  freeDrinkEarned: string;
  claimFreeDrink: string;
  freeDrinkInstruction: string;
  buyMoreDrinks: string;
  recentOrders: string;
  reorderAll: string;
  noRecentOrders: string;
  orderedOn: string;
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  en: {
    customerLounge: 'Customer Lounge',
    adminDashboard: 'Admin Dashboard',
    deliveryKitchen: 'Cafe Delivery & Kitchen',
    since2024: 'Since 2024',
    liveKitchenLink: 'Live Kitchen Link',
    tagline: 'Step into the garden of brewing aromas',
    cart: 'Cart',
    specialCounterBoard: 'Counter Board',
    scanConnect: 'Scan & Connect At The Counter',
    scanConnectSub: 'Scan our premium vintage board at the counter for instant UPI, Instagram feed access, and Google reviews!',
    upiPayments: '⚡ UPI Payments',
    upiPaymentsSub: 'Fast and secure directly to Ch. Pawan Kumar via 9848529320@ybl',
    instagramFeed: '📸 Instagram Feed',
    instagramFeedSub: 'Stay updated on daily deals and weekend specials by following @py_aromaa',
    googleReviews: '⭐ Google Reviews',
    googleReviewsSub: 'Support our family tea-house! Rate us 5-stars to spread the aromaa.',
    addToCart: 'Add to Cart',
    added: 'Added ✓',
    price: 'Price',
    customizeYourBrew: 'Customize Your Brew',
    sweetness: 'Sweetness Level',
    temperature: 'Temperature',
    chooseSideSnack: '🥖 Choose a Side Snack',
    addSnack: 'Add Snack Option',
    noSnack: 'No Side Snack',
    sweetnessNormal: 'Normal Sweet',
    sweetnessLess: 'Less Sweet',
    sweetnessDouble: 'Double Sweet',
    sweetnessNone: 'No Sugar / Bitter',
    sweetnessBellam: 'Bellam (Jaggery)',
    tempHot: 'Hot Brew',
    tempIced: 'Iced Cool',
    yourCart: 'Your Cart',
    cartEmpty: 'Your cart is looking empty. Go add some aromatic beverages!',
    checkoutDetails: '📝 Delivery & Customer Details',
    customerName: 'Your Name',
    phoneNumber: 'Phone Number',
    orderDeliveryType: 'How do you want your order?',
    counterPickup: '☕ Counter Pickup',
    localDelivery: '🛵 Local Delivery',
    deliveryAddress: 'Delivery Address (Within Cafe Area)',
    specialInstructions: 'Special Instructions / Custom Requests',
    payScanConfirm: 'Verify Payment & Place Order',
    paymentSuccess: '🎉 Order Successfully Placed!',
    tokenAssigned: 'YOUR TOKEN NUMBER',
    successSub: 'Our kitchen crew is already brewing your order. Show this token at the counter or keep an eye out for our delivery driver!',
    doneClose: 'Great, Thank You!',
    totalAmount: 'Total Amount',
    loyaltyTitle: 'Aromaa Loyalty Rewards',
    loyaltySub: 'Order 6 beverages and get 1 free premium brew of your choice! 🌟',
    loyaltyPointsCount: '{count} of 6 cups brewed',
    freeDrinkEarned: '🎉 Congratulations! You have unlocked a Free Drink!',
    claimFreeDrink: 'Claim Free Drink at Counter',
    freeDrinkInstruction: 'Show this unlocked status to the barista to redeem your complimentary ginger tea, Kashmiri Kahwa, or coffee!',
    buyMoreDrinks: 'Order {remaining} more aromatic drink(s) to unlock your free reward!',
    recentOrders: 'Recent Orders 🕒',
    reorderAll: 'Reorder All to Cart 🔄',
    noRecentOrders: 'No recent orders yet. Place an order to see it here!',
    orderedOn: 'Ordered'
  },
  te: {
    customerLounge: 'కస్టమర్ లాంజ్',
    adminDashboard: 'అడ్మిన్ డాష్‌బోర్డ్',
    deliveryKitchen: 'డెలివరీ & కిచెన్',
    since2024: '2024 నుండి',
    liveKitchenLink: 'లైవ్ కిచెన్ లింక్',
    tagline: 'గుబాళించే అరోమా టీ తోటలోకి స్వాగతం',
    cart: 'కార్ట్',
    specialCounterBoard: 'కౌంటర్ బోర్డు',
    scanConnect: 'కౌంటర్ వద్ద స్కాన్ చేసి కనెక్ట్ అవ్వండి',
    scanConnectSub: 'తక్షణ UPI పేమెంట్లు, ఇన్‌స్టాగ్రామ్ ఫీడ్ మరియు గూగుల్ రివ్యూల కోసం కౌంటర్ వద్ద ఉన్న బోర్డుని స్కాన్ చేయండి!',
    upiPayments: '⚡ UPI పేమెంట్లు',
    upiPaymentsSub: 'చల్లా పవన్ కుమార్ గారికి నేరుగా 9848529320@ybl ద్వారా సురక్షితంగా చెల్లించండి',
    instagramFeed: '📸 ఇన్‌స్టాగ్రామ్ ఫీడ్',
    instagramFeedSub: 'రోజువారీ ఆఫర్లు మరియు స్పెషల్స్ కోసం @py_aromaa ఫాలో అవ్వండి',
    googleReviews: '⭐ గూగుల్ రివ్యూలు',
    googleReviewsSub: 'మా కుటుంబ టీ-హౌస్‌కు మద్దతు ఇవ్వండి! 5-స్టార్ రేటింగ్ ఇవ్వండి.',
    addToCart: 'కార్ట్‌లో చేర్చు',
    added: 'చేర్చబడింది ✓',
    price: 'ధర',
    customizeYourBrew: 'మీ పానీయాన్ని అనుకూలీకరించండి',
    sweetness: 'తీపి స్థాయి',
    temperature: 'ఉష్ణోగ్రత',
    chooseSideSnack: '🥖 సైడ్ స్నాక్ ఎంచుకోండి',
    addSnack: 'స్నాక్ జోడించండి',
    noSnack: 'స్నాక్ వద్దు',
    sweetnessNormal: 'సాధారణ తీపి',
    sweetnessLess: 'తక్కువ తీపి',
    sweetnessDouble: 'ఎక్కువ తీపి',
    sweetnessNone: 'చక్కెర లేదు / చేదు',
    sweetnessBellam: 'బెల్లం తీపి',
    tempHot: 'వేడి వేడిగా',
    tempIced: 'చల్ల చల్లగా',
    yourCart: 'మీ కార్ట్',
    cartEmpty: 'మీ కార్ట్ ఖాళీగా ఉంది. కొన్ని రుచికరమైన పానీయాలను చేర్చండి!',
    checkoutDetails: '📝 డెలివరీ & కస్టమర్ వివరాలు',
    customerName: 'మీ పేరు',
    phoneNumber: 'ఫోన్ నంబర్',
    orderDeliveryType: 'మీ ఆర్డర్ ఎలా కావాలి?',
    counterPickup: '☕ కౌంటర్ పికప్',
    localDelivery: '🛵 లోకల్ డెలివరీ',
    deliveryAddress: 'డెలివరీ చిరునామా (కెఫే పరిధిలో)',
    specialInstructions: 'ప్రత్యేక సూచనలు / కోరికలు',
    payScanConfirm: 'పేమెంట్ వెరిఫై చేసి ఆర్డర్ చేయండి',
    paymentSuccess: '🎉 ఆర్డర్ విజయవంతంగా పూర్తయింది!',
    tokenAssigned: 'మీ టోకెన్ నంబర్',
    successSub: 'మా వంటగది సిబ్బంది మీ ఆర్డర్ సిద్ధం చేస్తున్నారు. ఈ టోకెన్‌ను కౌంటర్‌లో చూపించండి లేదా మా డెలివరీ డ్రైవర్ కోసం వేచి ఉండండి!',
    doneClose: 'ధన్యవాదాలు!',
    totalAmount: 'మొత్తం ధర',
    loyaltyTitle: 'అరోమా లాయల్టీ రివార్డులు',
    loyaltySub: '6 పానీయాలు ఆర్డర్ చేయండి, 1 ఉచిత ప్రీమియం టీ లేదా కాఫీ పొందండి! 🌟',
    loyaltyPointsCount: '6 కప్పులలో {count} సిద్ధమయ్యాయి',
    freeDrinkEarned: '🎉 అభినందనలు! మీకు ఒక ఉచిత పానీయం లభించింది!',
    claimFreeDrink: 'కౌంటర్ వద్ద ఉచిత డ్రింక్ తీసుకోండి',
    freeDrinkInstruction: 'మీ ఉచిత అల్లం టీ, కాశ్మీరీ కహ్వా లేదా కాఫీని పొందడానికి కౌంటర్‌లో ఈ స్క్రీన్‌ని చూపించండి!',
    buyMoreDrinks: 'మీ ఉచిత రివార్డును పొందడానికి మరొక {remaining} పానీయం(లు) ఆర్డర్ చేయండి!',
    recentOrders: 'ఇటీవలి ఆర్డర్లు 🕒',
    reorderAll: 'మళ్లీ కార్ట్‌లో చేర్చండి 🔄',
    noRecentOrders: 'ఇటీవలి ఆర్డర్లు ఏవీ లేవు. వాటిని ఇక్కడ చూడటానికి ఆర్డర్ చేయండి!',
    orderedOn: 'ఆర్డర్ సమయం'
  },
  hi: {
    customerLounge: 'कस्टमर लाउंज',
    adminDashboard: 'एडमिन डैशबोर्ड',
    deliveryKitchen: 'डिलिवरी और किचन',
    since2024: '2024 से',
    liveKitchenLink: 'लाइव किचन लिंक',
    tagline: 'महकती हुई चाय और कॉफी के बगीचे में आपका स्वागत है',
    cart: 'कार्ट',
    specialCounterBoard: 'काउंटर बोर्ड',
    scanConnect: 'काउंटर पर स्कैन और कनेक्ट करें',
    scanConnectSub: 'तुरंत UPI भुगतान, इंस्टाग्राम फीड और गूगल रिव्यू के लिए काउंटर पर हमारे विंटेज बोर्ड को स्कैन करें!',
    upiPayments: '⚡ UPI भुगतान',
    upiPaymentsSub: 'सीधे चौ. पवन कुमार को 9848529320@ybl के माध्यम से सुरक्षित भुगतान करें',
    instagramFeed: '📸 इंस्टाग्राम फीड',
    instagramFeedSub: 'दैनिक डील्स और वीकेंड स्पेशल के लिए @py_aromaa को फॉलो करें',
    googleReviews: '⭐ गूगल रिव्यू',
    googleReviewsSub: 'हमारे पारिवारिक टी-हाउस का समर्थन करें! हमें 5-स्टार रेटिंग दें।',
    addToCart: 'कार्ट में जोड़ें',
    added: 'जोड़ दिया गया ✓',
    price: 'कीमत',
    customizeYourBrew: 'अपने पेय को कस्टमाइज़ करें',
    sweetness: 'मीठा स्तर',
    temperature: 'तापमान',
    chooseSideSnack: '🥖 साइड स्नैक चुनें',
    addSnack: 'स्नैक जोड़ें',
    noSnack: 'कोई स्नैक नहीं',
    sweetnessNormal: 'सामान्य मीठा',
    sweetnessLess: 'कम मीठा',
    sweetnessDouble: 'दुगना मीठा',
    sweetnessNone: 'बिना चीनी / कड़क',
    sweetnessBellam: 'गुड़ (जैकरी) मीठा',
    tempHot: 'गर्मा-गर्म',
    tempIced: 'ठंडा-ठंडा',
    yourCart: 'आपकी कार्ट',
    cartEmpty: 'आपकी कार्ट खाली है। कुछ बेहतरीन पेय जोड़ें!',
    checkoutDetails: '📝 डिलिवरी और ग्राहक विवरण',
    customerName: 'आपका नाम',
    phoneNumber: 'फ़ोन नंबर',
    orderDeliveryType: 'आपको ऑर्डर कैसे चाहिए?',
    counterPickup: '☕ काउंटर पिकअप',
    localDelivery: '🛵 लोकल डिलिवरी',
    deliveryAddress: 'डिलिवरी का पता (कैफे क्षेत्र में)',
    specialInstructions: 'विशेष निर्देश / कस्टमाइज़ेशन',
    payScanConfirm: 'भुगतान सत्यापित करें और ऑर्डर दें',
    paymentSuccess: '🎉 ऑर्डर सफलतापूर्वक भेज दिया गया!',
    tokenAssigned: 'आपका टोकन नंबर',
    successSub: 'हमारा किचन स्टाफ आपका ऑर्डर तैयार कर रहा है। काउंटर पर यह टोकन दिखाएं या डिलिवरी का इंतजार करें!',
    doneClose: 'धन्यवाद!',
    totalAmount: 'कुल राशि',
    loyaltyTitle: 'अरोमा लॉयल्टी रिवार्ड्स',
    loyaltySub: '6 ड्रिंक्स ऑर्डर करें और अपनी पसंद का 1 मुफ्त प्रीमियम पेय प्राप्त करें! 🌟',
    loyaltyPointsCount: '6 में से {count} कप पूरे हुए',
    freeDrinkEarned: '🎉 बधाई हो! आपने एक मुफ्त ड्रिंक अनलॉक कर ली है!',
    claimFreeDrink: 'काउंटर पर मुफ्त पेय प्राप्त करें',
    freeDrinkInstruction: 'अपनी मुफ्त अदरक चाय, कश्मीरी कहवा या कॉफ़ी का आनंद लेने के लिए काउंटर पर यह स्क्रीन दिखाएं!',
    buyMoreDrinks: 'अपना मुफ्त पुरस्कार पाने के लिए {remaining} और ड्रिंक ऑर्डर करें!',
    recentOrders: 'हाल के ऑर्डर 🕒',
    reorderAll: 'सब कुछ फिर से जोड़ें 🔄',
    noRecentOrders: 'अभी कोई हालिया ऑर्डर नहीं है। उसे यहाँ देखने के लिए ऑर्डर करें!',
    orderedOn: 'ऑर्डर किया गया'
  }
};
