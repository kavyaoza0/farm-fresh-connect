// Multi-language translations for the application
export type Language = 'en' | 'hi' | 'gu' | 'mr' | 'kn' | 'te' | 'ta' | 'bn' | 'pa';

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

export type TranslationKeys = {
  // Common
  appName: string;
  loading: string;
  error: string;
  save: string;
  cancel: string;
  back: string;
  confirm: string;
  signIn: string;
  signUp: string;
  signOut: string;
  email: string;
  password: string;
  name: string;
  phone: string;

  // Navigation
  home: string;
  explore: string;
  orders: string;
  profile: string;
  menu: string;

  // Landing/Customer
  freshFromFarm: string;
  buyFreshVegetables: string;
  nearbyShops: string;
  products: string;
  setYourLocation: string;
  findShopsNearYou: string;
  setLocation: string;
  changeLocation: string;
  shopsNearYou: string;
  allShops: string;
  noShopsAvailable: string;
  noShopsFound: string;
  searchShops: string;
  all: string;
  vegetables: string;
  fruits: string;
  leafyGreens: string;

  // Location
  selectCity: string;
  enterPincode: string;
  selectOnMap: string;
  useCurrentLocation: string;
  confirmLocation: string;
  city: string;
  pincode: string;
  map: string;

  // Auth
  welcomeBack: string;
  createAccount: string;
  selectRole: string;
  customer: string;
  shopkeeper: string;
  farmer: string;
  admin: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  continueAs: string;

  // Dashboards
  adminDashboard: string;
  shopkeeperDashboard: string;
  farmerDashboard: string;
  platformManagement: string;
  manageShop: string;
  manageProduce: string;
  pendingApprovals: string;
  activeRequests: string;

  // Admin
  userManagement: string;
  verifyAccounts: string;
  shopApprovals: string;
  reviewShops: string;
  farmerVerification: string;
  verifyFarmers: string;
  requestsDisputes: string;
  handleRequests: string;
  analytics: string;
  viewStatistics: string;
  allUsers: string;
  allCustomers: string;
  allShopkeepers: string;
  allFarmers: string;
  systemOverview: string;
  totalOrders: string;
  totalProducts: string;
  totalProduce: string;

  // Shopkeeper
  overview: string;
  myProducts: string;
  addProduct: string;
  createShop: string;
  shopName: string;
  shopDescription: string;
  address: string;
  state: string;
  openingTime: string;
  closingTime: string;
  shopLocation: string;

  // Farmer
  myProduce: string;
  addProduce: string;
  bulkOrders: string;
  pricePerKg: string;
  quantity: string;
  harvestDate: string;
  organic: string;

  // Orders
  pending: string;
  confirmed: string;
  preparing: string;
  ready: string;
  pickedUp: string;
  cancelled: string;
  orderDetails: string;
  noOrders: string;

  // Language
  selectLanguage: string;
  choosePreferredLanguage: string;

  // About
  aboutPlatform: string;
  helpContact: string;

  // Profile
  myProfile: string;
  editProfile: string;
  myOrders: string;
  settings: string;
  language: string;
  notifications: string;
  darkMode: string;

  // Explore
  searchProducts: string;
  categories: string;
  featuredShops: string;
  nearbyFarmers: string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    appName: 'Mandi Fresh',
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    back: 'Back',
    confirm: 'Confirm',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    phone: 'Phone',

    home: 'Home',
    explore: 'Explore',
    orders: 'Orders',
    profile: 'Profile',
    menu: 'Menu',

    freshFromFarm: 'Fresh from Farm 🌱',
    buyFreshVegetables: 'Buy fresh vegetables & fruits from verified local shops',
    nearbyShops: 'Nearby Shops',
    products: 'Products',
    setYourLocation: 'Set your location',
    findShopsNearYou: 'Find shops near you',
    setLocation: 'Set Location',
    changeLocation: 'Change Location',
    shopsNearYou: 'Shops Near You',
    allShops: 'All Shops',
    noShopsAvailable: 'No shops available yet. Check back soon!',
    noShopsFound: 'No shops found matching your search',
    searchShops: 'Search shops...',
    all: 'All',
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    leafyGreens: 'Leafy Greens',

    selectCity: 'Select City',
    enterPincode: 'Enter Pincode',
    selectOnMap: 'Select on Map',
    useCurrentLocation: 'Use Current Location',
    confirmLocation: 'Confirm Location',
    city: 'City',
    pincode: 'Pincode',
    map: 'Map',

    welcomeBack: 'Welcome Back',
    createAccount: 'Create Account',
    selectRole: 'Select Your Role',
    customer: 'Customer',
    shopkeeper: 'Shopkeeper',
    farmer: 'Farmer',
    admin: 'Admin',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    continueAs: 'Continue as',

    adminDashboard: 'Admin Dashboard',
    shopkeeperDashboard: 'Shopkeeper Dashboard',
    farmerDashboard: 'Farmer Dashboard',
    platformManagement: 'Platform management & moderation',
    manageShop: 'Manage your shop & inventory',
    manageProduce: 'Manage produce & pricing',
    pendingApprovals: 'Pending Approvals',
    activeRequests: 'Active Requests',

    userManagement: 'User Management',
    verifyAccounts: 'Verify accounts, manage roles',
    shopApprovals: 'Shop Approvals',
    reviewShops: 'Review and approve shops',
    farmerVerification: 'Farmer Verification',
    verifyFarmers: 'Verify farmer accounts',
    requestsDisputes: 'Requests & Disputes',
    handleRequests: 'Handle user requests',
    analytics: 'Analytics',
    viewStatistics: 'View platform statistics',
    allUsers: 'All Users',
    allCustomers: 'All Customers',
    allShopkeepers: 'All Shopkeepers',
    allFarmers: 'All Farmers',
    systemOverview: 'System Overview',
    totalOrders: 'Total Orders',
    totalProducts: 'Total Products',
    totalProduce: 'Total Produce',

    overview: 'Overview',
    myProducts: 'My Products',
    addProduct: 'Add Product',
    createShop: 'Create Shop',
    shopName: 'Shop Name',
    shopDescription: 'Shop Description',
    address: 'Address',
    state: 'State',
    openingTime: 'Opening Time',
    closingTime: 'Closing Time',
    shopLocation: 'Shop Location',

    myProduce: 'My Produce',
    addProduce: 'Add Produce',
    bulkOrders: 'Bulk Orders',
    pricePerKg: 'Price per Kg',
    quantity: 'Quantity',
    harvestDate: 'Harvest Date',
    organic: 'Organic',

    pending: 'Pending',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    ready: 'Ready',
    pickedUp: 'Picked Up',
    cancelled: 'Cancelled',
    orderDetails: 'Order Details',
    noOrders: 'No orders yet',

    selectLanguage: 'Select Language',
    choosePreferredLanguage: 'Choose your preferred language',

    aboutPlatform: 'About Platform',
    helpContact: 'Help / Contact Admin',

    myProfile: 'My Profile',
    editProfile: 'Edit Profile',
    myOrders: 'My Orders',
    settings: 'Settings',
    language: 'Language',
    notifications: 'Notifications',
    darkMode: 'Dark Mode',

    searchProducts: 'Search products...',
    categories: 'Categories',
    featuredShops: 'Featured Shops',
    nearbyFarmers: 'Nearby Farmers',
  },

  hi: {
    appName: 'मंडी फ्रेश',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    back: 'वापस',
    confirm: 'पुष्टि करें',
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
    signOut: 'साइन आउट',
    email: 'ईमेल',
    password: 'पासवर्ड',
    name: 'नाम',
    phone: 'फ़ोन',

    home: 'होम',
    explore: 'खोजें',
    orders: 'ऑर्डर',
    profile: 'प्रोफ़ाइल',
    menu: 'मेनू',

    freshFromFarm: 'खेत से ताज़ा 🌱',
    buyFreshVegetables: 'सत्यापित स्थानीय दुकानों से ताज़ी सब्जियां और फल खरीदें',
    nearbyShops: 'पास की दुकानें',
    products: 'उत्पाद',
    setYourLocation: 'अपना स्थान सेट करें',
    findShopsNearYou: 'अपने पास की दुकानें खोजें',
    setLocation: 'स्थान सेट करें',
    changeLocation: 'स्थान बदलें',
    shopsNearYou: 'आपके पास की दुकानें',
    allShops: 'सभी दुकानें',
    noShopsAvailable: 'अभी कोई दुकान उपलब्ध नहीं है। जल्द ही देखें!',
    noShopsFound: 'आपकी खोज से मेल खाने वाली कोई दुकान नहीं मिली',
    searchShops: 'दुकानें खोजें...',
    all: 'सभी',
    vegetables: 'सब्जियां',
    fruits: 'फल',
    leafyGreens: 'पत्तेदार सब्जियां',

    selectCity: 'शहर चुनें',
    enterPincode: 'पिनकोड दर्ज करें',
    selectOnMap: 'मानचित्र पर चुनें',
    useCurrentLocation: 'वर्तमान स्थान का उपयोग करें',
    confirmLocation: 'स्थान की पुष्टि करें',
    city: 'शहर',
    pincode: 'पिनकोड',
    map: 'नक्शा',

    welcomeBack: 'वापसी पर स्वागत है',
    createAccount: 'खाता बनाएं',
    selectRole: 'अपनी भूमिका चुनें',
    customer: 'ग्राहक',
    shopkeeper: 'दुकानदार',
    farmer: 'किसान',
    admin: 'एडमिन',
    alreadyHaveAccount: 'पहले से खाता है?',
    dontHaveAccount: 'खाता नहीं है?',
    continueAs: 'के रूप में जारी रखें',

    adminDashboard: 'एडमिन डैशबोर्ड',
    shopkeeperDashboard: 'दुकानदार डैशबोर्ड',
    farmerDashboard: 'किसान डैशबोर्ड',
    platformManagement: 'प्लेटफ़ॉर्म प्रबंधन और मॉडरेशन',
    manageShop: 'अपनी दुकान और इन्वेंट्री प्रबंधित करें',
    manageProduce: 'उत्पाद और मूल्य प्रबंधित करें',
    pendingApprovals: 'लंबित अनुमोदन',
    activeRequests: 'सक्रिय अनुरोध',

    userManagement: 'उपयोगकर्ता प्रबंधन',
    verifyAccounts: 'खातों को सत्यापित करें, भूमिकाएं प्रबंधित करें',
    shopApprovals: 'दुकान अनुमोदन',
    reviewShops: 'दुकानों की समीक्षा करें और अनुमोदित करें',
    farmerVerification: 'किसान सत्यापन',
    verifyFarmers: 'किसान खातों को सत्यापित करें',
    requestsDisputes: 'अनुरोध और विवाद',
    handleRequests: 'उपयोगकर्ता अनुरोधों को संभालें',
    analytics: 'विश्लेषण',
    viewStatistics: 'प्लेटफ़ॉर्म आंकड़े देखें',
    allUsers: 'सभी उपयोगकर्ता',
    allCustomers: 'सभी ग्राहक',
    allShopkeepers: 'सभी दुकानदार',
    allFarmers: 'सभी किसान',
    systemOverview: 'सिस्टम अवलोकन',
    totalOrders: 'कुल ऑर्डर',
    totalProducts: 'कुल उत्पाद',
    totalProduce: 'कुल उपज',

    overview: 'अवलोकन',
    myProducts: 'मेरे उत्पाद',
    addProduct: 'उत्पाद जोड़ें',
    createShop: 'दुकान बनाएं',
    shopName: 'दुकान का नाम',
    shopDescription: 'दुकान का विवरण',
    address: 'पता',
    state: 'राज्य',
    openingTime: 'खुलने का समय',
    closingTime: 'बंद होने का समय',
    shopLocation: 'दुकान का स्थान',

    myProduce: 'मेरी उपज',
    addProduce: 'उपज जोड़ें',
    bulkOrders: 'थोक ऑर्डर',
    pricePerKg: 'प्रति किलो मूल्य',
    quantity: 'मात्रा',
    harvestDate: 'कटाई की तारीख',
    organic: 'जैविक',

    pending: 'लंबित',
    confirmed: 'पुष्टि हुई',
    preparing: 'तैयारी हो रही है',
    ready: 'तैयार',
    pickedUp: 'उठाया गया',
    cancelled: 'रद्द',
    orderDetails: 'ऑर्डर विवरण',
    noOrders: 'अभी कोई ऑर्डर नहीं',

    selectLanguage: 'भाषा चुनें',
    choosePreferredLanguage: 'अपनी पसंदीदा भाषा चुनें',

    aboutPlatform: 'प्लेटफ़ॉर्म के बारे में',
    helpContact: 'सहायता / एडमिन से संपर्क करें',

    myProfile: 'मेरी प्रोफ़ाइल',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    myOrders: 'मेरे ऑर्डर',
    settings: 'सेटिंग्स',
    language: 'भाषा',
    notifications: 'सूचनाएं',
    darkMode: 'डार्क मोड',

    searchProducts: 'उत्पाद खोजें...',
    categories: 'श्रेणियां',
    featuredShops: 'विशेष दुकानें',
    nearbyFarmers: 'पास के किसान',
  },

  gu: {
    appName: 'મંડી ફ્રેશ',
    loading: 'લોડ થઈ રહ્યું છે...',
    error: 'ભૂલ',
    save: 'સેવ કરો',
    cancel: 'રદ કરો',
    back: 'પાછા',
    confirm: 'પુષ્ટિ કરો',
    signIn: 'સાઇન ઇન',
    signUp: 'સાઇન અપ',
    signOut: 'સાઇન આઉટ',
    email: 'ઈમેલ',
    password: 'પાસવર્ડ',
    name: 'નામ',
    phone: 'ફોન',

    home: 'હોમ',
    explore: 'શોધો',
    orders: 'ઓર્ડર',
    profile: 'પ્રોફાઇલ',
    menu: 'મેનુ',

    freshFromFarm: 'ખેતરમાંથી તાજું 🌱',
    buyFreshVegetables: 'ચકાસાયેલ સ્થાનિક દુકાનોમાંથી તાજા શાકભાજી અને ફળો ખરીદો',
    nearbyShops: 'નજીકની દુકાનો',
    products: 'ઉત્પાદનો',
    setYourLocation: 'તમારું સ્થાન સેટ કરો',
    findShopsNearYou: 'તમારી નજીકની દુકાનો શોધો',
    setLocation: 'સ્થાન સેટ કરો',
    changeLocation: 'સ્થાન બદલો',
    shopsNearYou: 'તમારી નજીકની દુકાનો',
    allShops: 'બધી દુકાનો',
    noShopsAvailable: 'હજી સુધી કોઈ દુકાન ઉપલબ્ધ નથી. જલ્દી જોતા રહો!',
    noShopsFound: 'તમારી શોધ સાથે મેળ ખાતી કોઈ દુકાન મળી નથી',
    searchShops: 'દુકાનો શોધો...',
    all: 'બધા',
    vegetables: 'શાકભાજી',
    fruits: 'ફળો',
    leafyGreens: 'પાંદડાવાળા શાકભાજી',

    selectCity: 'શહેર પસંદ કરો',
    enterPincode: 'પિનકોડ દાખલ કરો',
    selectOnMap: 'નકશા પર પસંદ કરો',
    useCurrentLocation: 'વર્તમાન સ્થાન વાપરો',
    confirmLocation: 'સ્થાન પુષ્ટિ કરો',
    city: 'શહેર',
    pincode: 'પિનકોડ',
    map: 'નકશો',

    welcomeBack: 'પાછા આવ્યા સ્વાગત છે',
    createAccount: 'એકાઉન્ટ બનાવો',
    selectRole: 'તમારી ભૂમિકા પસંદ કરો',
    customer: 'ગ્રાહક',
    shopkeeper: 'દુકાનદાર',
    farmer: 'ખેડૂત',
    admin: 'એડમિન',
    alreadyHaveAccount: 'પહેલેથી એકાઉન્ટ છે?',
    dontHaveAccount: 'એકાઉન્ટ નથી?',
    continueAs: 'તરીકે ચાલુ રાખો',

    adminDashboard: 'એડમિન ડેશબોર્ડ',
    shopkeeperDashboard: 'દુકાનદાર ડેશબોર્ડ',
    farmerDashboard: 'ખેડૂત ડેશબોર્ડ',
    platformManagement: 'પ્લેટફોર્મ મેનેજમેન્ટ અને મોડરેશન',
    manageShop: 'તમારી દુકાન અને ઇન્વેન્ટરી મેનેજ કરો',
    manageProduce: 'ઉત્પાદન અને કિંમત મેનેજ કરો',
    pendingApprovals: 'બાકી મંજૂરીઓ',
    activeRequests: 'સક્રિય વિનંતીઓ',

    userManagement: 'વપરાશકર્તા મેનેજમેન્ટ',
    verifyAccounts: 'એકાઉન્ટ્સ ચકાસો, ભૂમિકાઓ મેનેજ કરો',
    shopApprovals: 'દુકાન મંજૂરીઓ',
    reviewShops: 'દુકાનોની સમીક્ષા કરો અને મંજૂર કરો',
    farmerVerification: 'ખેડૂત ચકાસણી',
    verifyFarmers: 'ખેડૂત એકાઉન્ટ્સ ચકાસો',
    requestsDisputes: 'વિનંતીઓ અને વિવાદો',
    handleRequests: 'વપરાશકર્તા વિનંતીઓ સંભાળો',
    analytics: 'એનાલિટિક્સ',
    viewStatistics: 'પ્લેટફોર્મ આંકડા જુઓ',
    allUsers: 'બધા વપરાશકર્તાઓ',
    allCustomers: 'બધા ગ્રાહકો',
    allShopkeepers: 'બધા દુકાનદારો',
    allFarmers: 'બધા ખેડૂતો',
    systemOverview: 'સિસ્ટમ ઓવરવ્યુ',
    totalOrders: 'કુલ ઓર્ડર',
    totalProducts: 'કુલ ઉત્પાદનો',
    totalProduce: 'કુલ ઉપજ',

    overview: 'ઓવરવ્યુ',
    myProducts: 'મારા ઉત્પાદનો',
    addProduct: 'ઉત્પાદન ઉમેરો',
    createShop: 'દુકાન બનાવો',
    shopName: 'દુકાનનું નામ',
    shopDescription: 'દુકાનનું વર્ણન',
    address: 'સરનામું',
    state: 'રાજ્ય',
    openingTime: 'ખોલવાનો સમય',
    closingTime: 'બંધ થવાનો સમય',
    shopLocation: 'દુકાનનું સ્થાન',

    myProduce: 'મારી ઉપજ',
    addProduce: 'ઉપજ ઉમેરો',
    bulkOrders: 'બલ્ક ઓર્ડર',
    pricePerKg: 'પ્રતિ કિલો કિંમત',
    quantity: 'જથ્થો',
    harvestDate: 'લણણીની તારીખ',
    organic: 'ઓર્ગેનિક',

    pending: 'બાકી',
    confirmed: 'પુષ્ટિ થયેલ',
    preparing: 'તૈયાર થઈ રહ્યું છે',
    ready: 'તૈયાર',
    pickedUp: 'ઉપાડેલ',
    cancelled: 'રદ',
    orderDetails: 'ઓર્ડર વિગતો',
    noOrders: 'હજી સુધી કોઈ ઓર્ડર નથી',

    selectLanguage: 'ભાષા પસંદ કરો',
    choosePreferredLanguage: 'તમારી પસંદગીની ભાષા પસંદ કરો',

    aboutPlatform: 'પ્લેટફોર્મ વિશે',
    helpContact: 'મદદ / એડમિનનો સંપર્ક કરો',

    myProfile: 'મારી પ્રોફાઇલ',
    editProfile: 'પ્રોફાઇલ સંપાદિત કરો',
    myOrders: 'મારા ઓર્ડર',
    settings: 'સેટિંગ્સ',
    language: 'ભાષા',
    notifications: 'સૂચનાઓ',
    darkMode: 'ડાર્ક મોડ',

    searchProducts: 'ઉત્પાદનો શોધો...',
    categories: 'શ્રેણીઓ',
    featuredShops: 'ફીચર્ડ દુકાનો',
    nearbyFarmers: 'નજીકના ખેડૂતો',
  },

  mr: {
    appName: 'मंडी फ्रेश',
    loading: 'लोड होत आहे...',
    error: 'त्रुटी',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    back: 'मागे',
    confirm: 'पुष्टी करा',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    signOut: 'साइन आउट',
    email: 'ईमेल',
    password: 'पासवर्ड',
    name: 'नाव',
    phone: 'फोन',

    home: 'होम',
    explore: 'शोधा',
    orders: 'ऑर्डर',
    profile: 'प्रोफाईल',
    menu: 'मेनू',

    freshFromFarm: 'शेतातून ताजे 🌱',
    buyFreshVegetables: 'सत्यापित स्थानिक दुकानांमधून ताज्या भाज्या आणि फळे खरेदी करा',
    nearbyShops: 'जवळच्या दुकाने',
    products: 'उत्पादने',
    setYourLocation: 'तुमचे स्थान सेट करा',
    findShopsNearYou: 'तुमच्या जवळच्या दुकाने शोधा',
    setLocation: 'स्थान सेट करा',
    changeLocation: 'स्थान बदला',
    shopsNearYou: 'तुमच्या जवळच्या दुकाने',
    allShops: 'सर्व दुकाने',
    noShopsAvailable: 'अजून कोणतीही दुकान उपलब्ध नाही. लवकरच पहा!',
    noShopsFound: 'तुमच्या शोधाशी जुळणारी कोणतीही दुकान मिळाली नाही',
    searchShops: 'दुकाने शोधा...',
    all: 'सर्व',
    vegetables: 'भाज्या',
    fruits: 'फळे',
    leafyGreens: 'पालेभाज्या',

    selectCity: 'शहर निवडा',
    enterPincode: 'पिनकोड टाका',
    selectOnMap: 'नकाशावर निवडा',
    useCurrentLocation: 'सध्याचे स्थान वापरा',
    confirmLocation: 'स्थान पुष्टी करा',
    city: 'शहर',
    pincode: 'पिनकोड',
    map: 'नकाशा',

    welcomeBack: 'परत आपले स्वागत आहे',
    createAccount: 'खाते तयार करा',
    selectRole: 'तुमची भूमिका निवडा',
    customer: 'ग्राहक',
    shopkeeper: 'दुकानदार',
    farmer: 'शेतकरी',
    admin: 'अॅडमिन',
    alreadyHaveAccount: 'आधीच खाते आहे?',
    dontHaveAccount: 'खाते नाही?',
    continueAs: 'म्हणून सुरू ठेवा',

    adminDashboard: 'अॅडमिन डॅशबोर्ड',
    shopkeeperDashboard: 'दुकानदार डॅशबोर्ड',
    farmerDashboard: 'शेतकरी डॅशबोर्ड',
    platformManagement: 'प्लॅटफॉर्म व्यवस्थापन आणि मॉडरेशन',
    manageShop: 'तुमची दुकान आणि इन्व्हेंटरी व्यवस्थापित करा',
    manageProduce: 'उत्पादन आणि किंमत व्यवस्थापित करा',
    pendingApprovals: 'प्रलंबित मान्यता',
    activeRequests: 'सक्रिय विनंत्या',

    userManagement: 'वापरकर्ता व्यवस्थापन',
    verifyAccounts: 'खाती सत्यापित करा, भूमिका व्यवस्थापित करा',
    shopApprovals: 'दुकान मान्यता',
    reviewShops: 'दुकानांचे पुनरावलोकन आणि मान्यता',
    farmerVerification: 'शेतकरी सत्यापन',
    verifyFarmers: 'शेतकरी खाती सत्यापित करा',
    requestsDisputes: 'विनंत्या आणि वाद',
    handleRequests: 'वापरकर्ता विनंत्या हाताळा',
    analytics: 'विश्लेषण',
    viewStatistics: 'प्लॅटफॉर्म आकडेवारी पहा',
    allUsers: 'सर्व वापरकर्ते',
    allCustomers: 'सर्व ग्राहक',
    allShopkeepers: 'सर्व दुकानदार',
    allFarmers: 'सर्व शेतकरी',
    systemOverview: 'सिस्टम ओव्हरव्ह्यू',
    totalOrders: 'एकूण ऑर्डर',
    totalProducts: 'एकूण उत्पादने',
    totalProduce: 'एकूण उत्पन्न',

    overview: 'ओव्हरव्ह्यू',
    myProducts: 'माझी उत्पादने',
    addProduct: 'उत्पादन जोडा',
    createShop: 'दुकान तयार करा',
    shopName: 'दुकानाचे नाव',
    shopDescription: 'दुकानाचे वर्णन',
    address: 'पत्ता',
    state: 'राज्य',
    openingTime: 'उघडण्याची वेळ',
    closingTime: 'बंद होण्याची वेळ',
    shopLocation: 'दुकानाचे स्थान',

    myProduce: 'माझे उत्पन्न',
    addProduce: 'उत्पन्न जोडा',
    bulkOrders: 'बल्क ऑर्डर',
    pricePerKg: 'प्रति किलो किंमत',
    quantity: 'प्रमाण',
    harvestDate: 'कापणीची तारीख',
    organic: 'सेंद्रिय',

    pending: 'प्रलंबित',
    confirmed: 'पुष्टी झाली',
    preparing: 'तयार होत आहे',
    ready: 'तयार',
    pickedUp: 'उचलले',
    cancelled: 'रद्द',
    orderDetails: 'ऑर्डर तपशील',
    noOrders: 'अजून कोणतेही ऑर्डर नाहीत',

    selectLanguage: 'भाषा निवडा',
    choosePreferredLanguage: 'तुमची पसंतीची भाषा निवडा',

    aboutPlatform: 'प्लॅटफॉर्मबद्दल',
    helpContact: 'मदत / अॅडमिनशी संपर्क साधा',

    myProfile: 'माझी प्रोफाईल',
    editProfile: 'प्रोफाईल संपादित करा',
    myOrders: 'माझे ऑर्डर',
    settings: 'सेटिंग्ज',
    language: 'भाषा',
    notifications: 'सूचना',
    darkMode: 'डार्क मोड',

    searchProducts: 'उत्पादने शोधा...',
    categories: 'श्रेणी',
    featuredShops: 'वैशिष्ट्यीकृत दुकाने',
    nearbyFarmers: 'जवळचे शेतकरी',
  },

  kn: {
    appName: 'ಮಂಡಿ ಫ್ರೆಶ್',
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    error: 'ದೋಷ',
    save: 'ಉಳಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    back: 'ಹಿಂದೆ',
    confirm: 'ದೃಢಪಡಿಸಿ',
    signIn: 'ಸೈನ್ ಇನ್',
    signUp: 'ಸೈನ್ ಅಪ್',
    signOut: 'ಸೈನ್ ಔಟ್',
    email: 'ಇಮೇಲ್',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    name: 'ಹೆಸರು',
    phone: 'ಫೋನ್',

    home: 'ಹೋಮ್',
    explore: 'ಹುಡುಕಿ',
    orders: 'ಆರ್ಡರ್',
    profile: 'ಪ್ರೊಫೈಲ್',
    menu: 'ಮೆನು',

    freshFromFarm: 'ಹೊಲದಿಂದ ತಾಜಾ 🌱',
    buyFreshVegetables: 'ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳೀಯ ಅಂಗಡಿಗಳಿಂದ ತಾಜಾ ತರಕಾರಿಗಳು ಮತ್ತು ಹಣ್ಣುಗಳನ್ನು ಖರೀದಿಸಿ',
    nearbyShops: 'ಹತ್ತಿರದ ಅಂಗಡಿಗಳು',
    products: 'ಉತ್ಪನ್ನಗಳು',
    setYourLocation: 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹೊಂದಿಸಿ',
    findShopsNearYou: 'ನಿಮ್ಮ ಹತ್ತಿರದ ಅಂಗಡಿಗಳನ್ನು ಹುಡುಕಿ',
    setLocation: 'ಸ್ಥಳ ಹೊಂದಿಸಿ',
    changeLocation: 'ಸ್ಥಳ ಬದಲಿಸಿ',
    shopsNearYou: 'ನಿಮ್ಮ ಹತ್ತಿರದ ಅಂಗಡಿಗಳು',
    allShops: 'ಎಲ್ಲಾ ಅಂಗಡಿಗಳು',
    noShopsAvailable: 'ಇನ್ನೂ ಯಾವುದೇ ಅಂಗಡಿಗಳು ಲಭ್ಯವಿಲ್ಲ. ಶೀಘ್ರದಲ್ಲೇ ನೋಡಿ!',
    noShopsFound: 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಅಂಗಡಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
    searchShops: 'ಅಂಗಡಿಗಳನ್ನು ಹುಡುಕಿ...',
    all: 'ಎಲ್ಲಾ',
    vegetables: 'ತರಕಾರಿಗಳು',
    fruits: 'ಹಣ್ಣುಗಳು',
    leafyGreens: 'ಎಲೆ ತರಕಾರಿಗಳು',

    selectCity: 'ನಗರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    enterPincode: 'ಪಿನ್‌ಕೋಡ್ ನಮೂದಿಸಿ',
    selectOnMap: 'ನಕ್ಷೆಯಲ್ಲಿ ಆಯ್ಕೆಮಾಡಿ',
    useCurrentLocation: 'ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಬಳಸಿ',
    confirmLocation: 'ಸ್ಥಳವನ್ನು ದೃಢಪಡಿಸಿ',
    city: 'ನಗರ',
    pincode: 'ಪಿನ್‌ಕೋಡ್',
    map: 'ನಕ್ಷೆ',

    welcomeBack: 'ಮರಳಿ ಸ್ವಾಗತ',
    createAccount: 'ಖಾತೆ ರಚಿಸಿ',
    selectRole: 'ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    customer: 'ಗ್ರಾಹಕ',
    shopkeeper: 'ಅಂಗಡಿಕಾರ',
    farmer: 'ರೈತ',
    admin: 'ಅಡ್ಮಿನ್',
    alreadyHaveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
    dontHaveAccount: 'ಖಾತೆ ಇಲ್ಲವೇ?',
    continueAs: 'ಆಗಿ ಮುಂದುವರಿಸಿ',

    adminDashboard: 'ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    shopkeeperDashboard: 'ಅಂಗಡಿಕಾರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    farmerDashboard: 'ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    platformManagement: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ನಿರ್ವಹಣೆ ಮತ್ತು ಮಾಡರೇಶನ್',
    manageShop: 'ನಿಮ್ಮ ಅಂಗಡಿ ಮತ್ತು ಇನ್ವೆಂಟರಿ ನಿರ್ವಹಿಸಿ',
    manageProduce: 'ಉತ್ಪನ್ನ ಮತ್ತು ಬೆಲೆ ನಿರ್ವಹಿಸಿ',
    pendingApprovals: 'ಬಾಕಿ ಅನುಮೋದನೆಗಳು',
    activeRequests: 'ಸಕ್ರಿಯ ವಿನಂತಿಗಳು',

    userManagement: 'ಬಳಕೆದಾರ ನಿರ್ವಹಣೆ',
    verifyAccounts: 'ಖಾತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ಪಾತ್ರಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
    shopApprovals: 'ಅಂಗಡಿ ಅನುಮೋದನೆಗಳು',
    reviewShops: 'ಅಂಗಡಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅನುಮೋದಿಸಿ',
    farmerVerification: 'ರೈತ ಪರಿಶೀಲನೆ',
    verifyFarmers: 'ರೈತ ಖಾತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
    requestsDisputes: 'ವಿನಂತಿಗಳು ಮತ್ತು ವಿವಾದಗಳು',
    handleRequests: 'ಬಳಕೆದಾರ ವಿನಂತಿಗಳನ್ನು ನಿಭಾಯಿಸಿ',
    analytics: 'ವಿಶ್ಲೇಷಣೆ',
    viewStatistics: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅಂಕಿಅಂಶಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    allUsers: 'ಎಲ್ಲಾ ಬಳಕೆದಾರರು',
    allCustomers: 'ಎಲ್ಲಾ ಗ್ರಾಹಕರು',
    allShopkeepers: 'ಎಲ್ಲಾ ಅಂಗಡಿಕಾರರು',
    allFarmers: 'ಎಲ್ಲಾ ರೈತರು',
    systemOverview: 'ಸಿಸ್ಟಮ್ ಅವಲೋಕನ',
    totalOrders: 'ಒಟ್ಟು ಆರ್ಡರ್‌ಗಳು',
    totalProducts: 'ಒಟ್ಟು ಉತ್ಪನ್ನಗಳು',
    totalProduce: 'ಒಟ್ಟು ಉತ್ಪಾದನೆ',

    overview: 'ಅವಲೋಕನ',
    myProducts: 'ನನ್ನ ಉತ್ಪನ್ನಗಳು',
    addProduct: 'ಉತ್ಪನ್ನ ಸೇರಿಸಿ',
    createShop: 'ಅಂಗಡಿ ರಚಿಸಿ',
    shopName: 'ಅಂಗಡಿ ಹೆಸರು',
    shopDescription: 'ಅಂಗಡಿ ವಿವರಣೆ',
    address: 'ವಿಳಾಸ',
    state: 'ರಾಜ್ಯ',
    openingTime: 'ತೆರೆಯುವ ಸಮಯ',
    closingTime: 'ಮುಚ್ಚುವ ಸಮಯ',
    shopLocation: 'ಅಂಗಡಿ ಸ್ಥಳ',

    myProduce: 'ನನ್ನ ಉತ್ಪಾದನೆ',
    addProduce: 'ಉತ್ಪಾದನೆ ಸೇರಿಸಿ',
    bulkOrders: 'ಬಲ್ಕ್ ಆರ್ಡರ್‌ಗಳು',
    pricePerKg: 'ಪ್ರತಿ ಕೆಜಿ ಬೆಲೆ',
    quantity: 'ಪ್ರಮಾಣ',
    harvestDate: 'ಕೊಯ್ಲು ದಿನಾಂಕ',
    organic: 'ಸಾವಯವ',

    pending: 'ಬಾಕಿ',
    confirmed: 'ದೃಢಪಡಿಸಲಾಗಿದೆ',
    preparing: 'ತಯಾರಾಗುತ್ತಿದೆ',
    ready: 'ಸಿದ್ಧ',
    pickedUp: 'ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ',
    cancelled: 'ರದ್ದುಮಾಡಲಾಗಿದೆ',
    orderDetails: 'ಆರ್ಡರ್ ವಿವರಗಳು',
    noOrders: 'ಇನ್ನೂ ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ',

    selectLanguage: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    choosePreferredLanguage: 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',

    aboutPlatform: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಬಗ್ಗೆ',
    helpContact: 'ಸಹಾಯ / ಅಡ್ಮಿನ್ ಅನ್ನು ಸಂಪರ್ಕಿಸಿ',

    myProfile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    editProfile: 'ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ',
    myOrders: 'ನನ್ನ ಆರ್ಡರ್‌ಗಳು',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    language: 'ಭಾಷೆ',
    notifications: 'ಅಧಿಸೂಚನೆಗಳು',
    darkMode: 'ಡಾರ್ಕ್ ಮೋಡ್',

    searchProducts: 'ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ...',
    categories: 'ವಿಭಾಗಗಳು',
    featuredShops: 'ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಅಂಗಡಿಗಳು',
    nearbyFarmers: 'ಹತ್ತಿರದ ರೈತರು',
  },

  te: {
    appName: 'మండి ఫ్రెష్',
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం',
    save: 'సేవ్ చేయండి',
    cancel: 'రద్దు చేయండి',
    back: 'వెనక్కి',
    confirm: 'నిర్ధారించండి',
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    signOut: 'సైన్ ఔట్',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    name: 'పేరు',
    phone: 'ఫోన్',

    home: 'హోమ్',
    explore: 'అన్వేషించండి',
    orders: 'ఆర్డర్లు',
    profile: 'ప్రొఫైల్',
    menu: 'మెను',

    freshFromFarm: 'వ్యవసాయం నుండి తాజా 🌱',
    buyFreshVegetables: 'ధృవీకరించిన స్థానిక దుకాణాల నుండి తాజా కూరగాయలు మరియు పండ్లు కొనండి',
    nearbyShops: 'సమీపంలోని దుకాణాలు',
    products: 'ఉత్పత్తులు',
    setYourLocation: 'మీ స్థానాన్ని సెట్ చేయండి',
    findShopsNearYou: 'మీ సమీపంలోని దుకాణాలను కనుగొనండి',
    setLocation: 'స్థానం సెట్ చేయండి',
    changeLocation: 'స్థానం మార్చండి',
    shopsNearYou: 'మీ సమీపంలోని దుకాణాలు',
    allShops: 'అన్ని దుకాణాలు',
    noShopsAvailable: 'ఇంకా ఏ దుకాణాలు అందుబాటులో లేవు. త్వరలో చూడండి!',
    noShopsFound: 'మీ అన్వేషణతో సరిపోలే దుకాణాలు కనుగొనబడలేదు',
    searchShops: 'దుకాణాలను వెతకండి...',
    all: 'అన్నీ',
    vegetables: 'కూరగాయలు',
    fruits: 'పండ్లు',
    leafyGreens: 'ఆకు కూరలు',

    selectCity: 'నగరాన్ని ఎంచుకోండి',
    enterPincode: 'పిన్‌కోడ్ నమోదు చేయండి',
    selectOnMap: 'మ్యాప్‌లో ఎంచుకోండి',
    useCurrentLocation: 'ప్రస్తుత స్థానాన్ని ఉపయోగించండి',
    confirmLocation: 'స్థానాన్ని నిర్ధారించండి',
    city: 'నగరం',
    pincode: 'పిన్‌కోడ్',
    map: 'మ్యాప్',

    welcomeBack: 'తిరిగి స్వాగతం',
    createAccount: 'ఖాతా సృష్టించండి',
    selectRole: 'మీ పాత్రను ఎంచుకోండి',
    customer: 'కస్టమర్',
    shopkeeper: 'దుకాణదారుడు',
    farmer: 'రైతు',
    admin: 'అడ్మిన్',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    dontHaveAccount: 'ఖాతా లేదా?',
    continueAs: 'గా కొనసాగించండి',

    adminDashboard: 'అడ్మిన్ డాష్‌బోర్డ్',
    shopkeeperDashboard: 'దుకాణదారు డాష్‌బోర్డ్',
    farmerDashboard: 'రైతు డాష్‌బోర్డ్',
    platformManagement: 'ప్లాట్‌ఫారం నిర్వహణ మరియు మోడరేషన్',
    manageShop: 'మీ దుకాణం మరియు ఇన్వెంటరీని నిర్వహించండి',
    manageProduce: 'ఉత్పత్తి మరియు ధరను నిర్వహించండి',
    pendingApprovals: 'పెండింగ్ ఆమోదాలు',
    activeRequests: 'యాక్టివ్ అభ్యర్థనలు',

    userManagement: 'వినియోగదారు నిర్వహణ',
    verifyAccounts: 'ఖాతాలను ధృవీకరించండి, పాత్రలను నిర్వహించండి',
    shopApprovals: 'దుకాణ ఆమోదాలు',
    reviewShops: 'దుకాణాలను సమీక్షించి ఆమోదించండి',
    farmerVerification: 'రైతు ధృవీకరణ',
    verifyFarmers: 'రైతు ఖాతాలను ధృవీకరించండి',
    requestsDisputes: 'అభ్యర్థనలు మరియు వివాదాలు',
    handleRequests: 'వినియోగదారు అభ్యర్థనలను నిర్వహించండి',
    analytics: 'విశ్లేషణలు',
    viewStatistics: 'ప్లాట్‌ఫారం గణాంకాలను వీక్షించండి',
    allUsers: 'అన్ని వినియోగదారులు',
    allCustomers: 'అన్ని కస్టమర్లు',
    allShopkeepers: 'అన్ని దుకాణదారులు',
    allFarmers: 'అన్ని రైతులు',
    systemOverview: 'సిస్టం ఓవర్‌వ్యూ',
    totalOrders: 'మొత్తం ఆర్డర్లు',
    totalProducts: 'మొత్తం ఉత్పత్తులు',
    totalProduce: 'మొత్తం ఉత్పత్తి',

    overview: 'ఓవర్‌వ్యూ',
    myProducts: 'నా ఉత్పత్తులు',
    addProduct: 'ఉత్పత్తిని జోడించండి',
    createShop: 'దుకాణం సృష్టించండి',
    shopName: 'దుకాణం పేరు',
    shopDescription: 'దుకాణం వివరణ',
    address: 'చిరునామా',
    state: 'రాష్ట్రం',
    openingTime: 'తెరిచే సమయం',
    closingTime: 'మూసివేసే సమయం',
    shopLocation: 'దుకాణం స్థానం',

    myProduce: 'నా ఉత్పత్తి',
    addProduce: 'ఉత్పత్తిని జోడించండి',
    bulkOrders: 'బల్క్ ఆర్డర్లు',
    pricePerKg: 'ప్రతి కిలో ధర',
    quantity: 'పరిమాణం',
    harvestDate: 'పంట తేదీ',
    organic: 'సేంద్రీయ',

    pending: 'పెండింగ్',
    confirmed: 'నిర్ధారించబడింది',
    preparing: 'తయారు చేస్తోంది',
    ready: 'సిద్ధంగా ఉంది',
    pickedUp: 'తీసుకున్నారు',
    cancelled: 'రద్దు చేయబడింది',
    orderDetails: 'ఆర్డర్ వివరాలు',
    noOrders: 'ఇంకా ఆర్డర్లు లేవు',

    selectLanguage: 'భాషను ఎంచుకోండి',
    choosePreferredLanguage: 'మీ ఇష్టమైన భాషను ఎంచుకోండి',

    aboutPlatform: 'ప్లాట్‌ఫారం గురించి',
    helpContact: 'సహాయం / అడ్మిన్‌ని సంప్రదించండి',

    myProfile: 'నా ప్రొఫైల్',
    editProfile: 'ప్రొఫైల్‌ను సవరించండి',
    myOrders: 'నా ఆర్డర్లు',
    settings: 'సెట్టింగ్‌లు',
    language: 'భాష',
    notifications: 'నోటిఫికేషన్లు',
    darkMode: 'డార్క్ మోడ్',

    searchProducts: 'ఉత్పత్తులను వెతకండి...',
    categories: 'వర్గాలు',
    featuredShops: 'ఫీచర్డ్ దుకాణాలు',
    nearbyFarmers: 'సమీపంలోని రైతులు',
  },

  ta: {
    appName: 'மண்டி ஃப்ரெஷ்',
    loading: 'ஏற்றுகிறது...',
    error: 'பிழை',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    back: 'பின்',
    confirm: 'உறுதிப்படுத்து',
    signIn: 'உள்நுழை',
    signUp: 'பதிவு செய்',
    signOut: 'வெளியேறு',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    name: 'பெயர்',
    phone: 'தொலைபேசி',

    home: 'முகப்பு',
    explore: 'ஆராயுங்கள்',
    orders: 'ஆர்டர்கள்',
    profile: 'சுயவிவரம்',
    menu: 'மெனு',

    freshFromFarm: 'பண்ணையில் இருந்து புதியது 🌱',
    buyFreshVegetables: 'சரிபார்க்கப்பட்ட உள்ளூர் கடைகளில் இருந்து புதிய காய்கறிகள் மற்றும் பழங்களை வாங்குங்கள்',
    nearbyShops: 'அருகிலுள்ள கடைகள்',
    products: 'தயாரிப்புகள்',
    setYourLocation: 'உங்கள் இடத்தை அமைக்கவும்',
    findShopsNearYou: 'உங்கள் அருகிலுள்ள கடைகளைக் கண்டறியுங்கள்',
    setLocation: 'இடம் அமை',
    changeLocation: 'இடம் மாற்று',
    shopsNearYou: 'உங்கள் அருகிலுள்ள கடைகள்',
    allShops: 'அனைத்து கடைகளும்',
    noShopsAvailable: 'இன்னும் கடைகள் கிடைக்கவில்லை. விரைவில் பாருங்கள்!',
    noShopsFound: 'உங்கள் தேடலுக்கு பொருந்தும் கடைகள் இல்லை',
    searchShops: 'கடைகளைத் தேடுங்கள்...',
    all: 'அனைத்தும்',
    vegetables: 'காய்கறிகள்',
    fruits: 'பழங்கள்',
    leafyGreens: 'கீரைகள்',

    selectCity: 'நகரத்தைத் தேர்ந்தெடுக்கவும்',
    enterPincode: 'பின்கோடை உள்ளிடவும்',
    selectOnMap: 'வரைபடத்தில் தேர்ந்தெடுக்கவும்',
    useCurrentLocation: 'தற்போதைய இடத்தைப் பயன்படுத்தவும்',
    confirmLocation: 'இடத்தை உறுதிப்படுத்தவும்',
    city: 'நகரம்',
    pincode: 'பின்கோட்',
    map: 'வரைபடம்',

    welcomeBack: 'மீண்டும் வருக',
    createAccount: 'கணக்கை உருவாக்கு',
    selectRole: 'உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்',
    customer: 'வாடிக்கையாளர்',
    shopkeeper: 'கடைக்காரர்',
    farmer: 'விவசாயி',
    admin: 'நிர்வாகி',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    dontHaveAccount: 'கணக்கு இல்லையா?',
    continueAs: 'ஆகத் தொடரவும்',

    adminDashboard: 'நிர்வாகி டாஷ்போர்டு',
    shopkeeperDashboard: 'கடைக்காரர் டாஷ்போர்டு',
    farmerDashboard: 'விவசாயி டாஷ்போர்டு',
    platformManagement: 'தளம் நிர்வாகம் மற்றும் மதிப்பீடு',
    manageShop: 'உங்கள் கடை மற்றும் சரக்குகளை நிர்வகிக்கவும்',
    manageProduce: 'உற்பத்தி மற்றும் விலையை நிர்வகிக்கவும்',
    pendingApprovals: 'நிலுவையில் உள்ள ஒப்புதல்கள்',
    activeRequests: 'செயலில் உள்ள கோரிக்கைகள்',

    userManagement: 'பயனர் நிர்வாகம்',
    verifyAccounts: 'கணக்குகளை சரிபார்க்கவும், பங்குகளை நிர்வகிக்கவும்',
    shopApprovals: 'கடை ஒப்புதல்கள்',
    reviewShops: 'கடைகளை மதிப்பாய்வு செய்து ஒப்புதல் அளிக்கவும்',
    farmerVerification: 'விவசாயி சரிபார்ப்பு',
    verifyFarmers: 'விவசாயி கணக்குகளை சரிபார்க்கவும்',
    requestsDisputes: 'கோரிக்கைகள் மற்றும் சர்ச்சைகள்',
    handleRequests: 'பயனர் கோரிக்கைகளை கையாளுங்கள்',
    analytics: 'பகுப்பாய்வு',
    viewStatistics: 'தள புள்ளிவிவரங்களைக் காணவும்',
    allUsers: 'அனைத்து பயனர்களும்',
    allCustomers: 'அனைத்து வாடிக்கையாளர்களும்',
    allShopkeepers: 'அனைத்து கடைக்காரர்கள்',
    allFarmers: 'அனைத்து விவசாயிகள்',
    systemOverview: 'அமைப்பு கண்ணோட்டம்',
    totalOrders: 'மொத்த ஆர்டர்கள்',
    totalProducts: 'மொத்த தயாரிப்புகள்',
    totalProduce: 'மொத்த உற்பத்தி',

    overview: 'கண்ணோட்டம்',
    myProducts: 'என் தயாரிப்புகள்',
    addProduct: 'தயாரிப்பைச் சேர்',
    createShop: 'கடை உருவாக்கு',
    shopName: 'கடை பெயர்',
    shopDescription: 'கடை விளக்கம்',
    address: 'முகவரி',
    state: 'மாநிலம்',
    openingTime: 'திறக்கும் நேரம்',
    closingTime: 'மூடும் நேரம்',
    shopLocation: 'கடை இடம்',

    myProduce: 'என் உற்பத்தி',
    addProduce: 'உற்பத்தியைச் சேர்',
    bulkOrders: 'மொத்த ஆர்டர்கள்',
    pricePerKg: 'கிலோவுக்கு விலை',
    quantity: 'அளவு',
    harvestDate: 'அறுவடை தேதி',
    organic: 'இயற்கை',

    pending: 'நிலுவையில்',
    confirmed: 'உறுதிப்படுத்தப்பட்டது',
    preparing: 'தயாராகிறது',
    ready: 'தயார்',
    pickedUp: 'எடுக்கப்பட்டது',
    cancelled: 'ரத்து செய்யப்பட்டது',
    orderDetails: 'ஆர்டர் விவரங்கள்',
    noOrders: 'இன்னும் ஆர்டர்கள் இல்லை',

    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    choosePreferredLanguage: 'உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',

    aboutPlatform: 'தளம் பற்றி',
    helpContact: 'உதவி / நிர்வாகியை தொடர்பு கொள்ளுங்கள்',

    myProfile: 'என் சுயவிவரம்',
    editProfile: 'சுயவிவரத்தைத் திருத்து',
    myOrders: 'என் ஆர்டர்கள்',
    settings: 'அமைப்புகள்',
    language: 'மொழி',
    notifications: 'நோட்டிபிகేషன்கள்',
    darkMode: 'இருண்ட பயன்முறை',

    searchProducts: 'தயாரிப்புகளைத் தேடுங்கள்...',
    categories: 'வகைகள்',
    featuredShops: 'சிறப்பு கடைகள்',
    nearbyFarmers: 'அருகிலுள்ள விவசாயிகள்',
  },

  bn: {
    appName: 'মান্ডি ফ্রেশ',
    loading: 'লোড হচ্ছে...',
    error: 'ত্রুটি',
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল করুন',
    back: 'পিছনে',
    confirm: 'নিশ্চিত করুন',
    signIn: 'সাইন ইন',
    signUp: 'সাইন আপ',
    signOut: 'সাইন আউট',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    name: 'নাম',
    phone: 'ফোন',

    home: 'হোম',
    explore: 'অন্বেষণ করুন',
    orders: 'অর্ডার',
    profile: 'প্রোফাইল',
    menu: 'মেনু',

    freshFromFarm: 'খামার থেকে তাজা 🌱',
    buyFreshVegetables: 'যাচাইকৃত স্থানীয় দোকান থেকে তাজা শাকসবজি ও ফল কিনুন',
    nearbyShops: 'কাছের দোকান',
    products: 'পণ্য',
    setYourLocation: 'আপনার অবস্থান সেট করুন',
    findShopsNearYou: 'আপনার কাছের দোকান খুঁজুন',
    setLocation: 'অবস্থান সেট করুন',
    changeLocation: 'অবস্থান পরিবর্তন করুন',
    shopsNearYou: 'আপনার কাছের দোকান',
    allShops: 'সব দোকান',
    noShopsAvailable: 'এখনও কোনো দোকান পাওয়া যায়নি। শীঘ্রই দেখুন!',
    noShopsFound: 'আপনার অনুসন্ধানের সাথে মেলে এমন কোনো দোকান পাওয়া যায়নি',
    searchShops: 'দোকান খুঁজুন...',
    all: 'সব',
    vegetables: 'শাকসবজি',
    fruits: 'ফল',
    leafyGreens: 'শাক',

    selectCity: 'শহর নির্বাচন করুন',
    enterPincode: 'পিনকোড দিন',
    selectOnMap: 'মানচিত্রে নির্বাচন করুন',
    useCurrentLocation: 'বর্তমান অবস্থান ব্যবহার করুন',
    confirmLocation: 'অবস্থান নিশ্চিত করুন',
    city: 'শহর',
    pincode: 'পিনকোড',
    map: 'মানচিত্র',

    welcomeBack: 'ফিরে আসায় স্বাগতম',
    createAccount: 'অ্যাকাউন্ট তৈরি করুন',
    selectRole: 'আপনার ভূমিকা নির্বাচন করুন',
    customer: 'গ্রাহক',
    shopkeeper: 'দোকানদার',
    farmer: 'কৃষক',
    admin: 'অ্যাডমিন',
    alreadyHaveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    dontHaveAccount: 'অ্যাকাউন্ট নেই?',
    continueAs: 'হিসাবে চালিয়ে যান',

    adminDashboard: 'অ্যাডমিন ড্যাশবোর্ড',
    shopkeeperDashboard: 'দোকানদার ড্যাশবোর্ড',
    farmerDashboard: 'কৃষক ড্যাশবোর্ড',
    platformManagement: 'প্ল্যাটফর্ম ব্যবস্থাপনা ও মডারেশন',
    manageShop: 'আপনার দোকান ও ইনভেন্টরি পরিচালনা করুন',
    manageProduce: 'উৎপাদন ও মূল্য পরিচালনা করুন',
    pendingApprovals: 'অপেক্ষমাণ অনুমোদন',
    activeRequests: 'সক্রিয় অনুরোধ',

    userManagement: 'ব্যবহারকারী ব্যবস্থাপনা',
    verifyAccounts: 'অ্যাকাউন্ট যাচাই করুন, ভূমিকা পরিচালনা করুন',
    shopApprovals: 'দোকান অনুমোদন',
    reviewShops: 'দোকান পর্যালোচনা ও অনুমোদন করুন',
    farmerVerification: 'কৃষক যাচাই',
    verifyFarmers: 'কৃষক অ্যাকাউন্ট যাচাই করুন',
    requestsDisputes: 'অনুরোধ ও বিরোধ',
    handleRequests: 'ব্যবহারকারী অনুরোধ পরিচালনা করুন',
    analytics: 'বিশ্লেষণ',
    viewStatistics: 'প্ল্যাটফর্ম পরিসংখ্যান দেখুন',
    allUsers: 'সব ব্যবহারকারী',
    allCustomers: 'সব গ্রাহক',
    allShopkeepers: 'সব দোকানদার',
    allFarmers: 'সব কৃষক',
    systemOverview: 'সিস্টেম ওভারভিউ',
    totalOrders: 'মোট অর্ডার',
    totalProducts: 'মোট পণ্য',
    totalProduce: 'মোট উৎপাদন',

    overview: 'ওভারভিউ',
    myProducts: 'আমার পণ্য',
    addProduct: 'পণ্য যোগ করুন',
    createShop: 'দোকান তৈরি করুন',
    shopName: 'দোকানের নাম',
    shopDescription: 'দোকানের বর্ণনা',
    address: 'ঠিকানা',
    state: 'রাজ্য',
    openingTime: 'খোলার সময়',
    closingTime: 'বন্ধের সময়',
    shopLocation: 'দোকানের অবস্থান',

    myProduce: 'আমার উৎপাদন',
    addProduce: 'উৎপাদন যোগ করুন',
    bulkOrders: 'বাল্ক অর্ডার',
    pricePerKg: 'প্রতি কেজি মূল্য',
    quantity: 'পরিমাণ',
    harvestDate: 'ফসল কাটার তারিখ',
    organic: 'জৈব',

    pending: 'অপেক্ষমাণ',
    confirmed: 'নিশ্চিত',
    preparing: 'প্রস্তুত হচ্ছে',
    ready: 'প্রস্তুত',
    pickedUp: 'নেওয়া হয়েছে',
    cancelled: 'বাতিল',
    orderDetails: 'অর্ডার বিবরণ',
    noOrders: 'এখনও কোনো অর্ডার নেই',

    selectLanguage: 'ভাষা নির্বাচন করুন',
    choosePreferredLanguage: 'আপনার পছন্দের ভাষা বেছে নিন',

    aboutPlatform: 'প্ল্যাটফর্ম সম্পর্কে',
    helpContact: 'সাহায্য / অ্যাডমিনের সাথে যোগাযোগ করুন',

    myProfile: 'আমার প্রোফাইল',
    editProfile: 'প্রোফাইল সম্পাদনা করুন',
    myOrders: 'আমার অর্ডার',
    settings: 'সেটিংস',
    language: 'ভাষা',
    notifications: 'বিজ্ঞপ্তি',
    darkMode: 'ডার্ক মোড',

    searchProducts: 'পণ্য খুঁজুন...',
    categories: 'বিভাগ',
    featuredShops: 'বৈশিষ্ট্যযুক্ত দোকান',
    nearbyFarmers: 'কাছের কৃষক',
  },

  pa: {
    appName: 'ਮੰਡੀ ਫ੍ਰੈਸ਼',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    error: 'ਗਲਤੀ',
    save: 'ਸੇਵ ਕਰੋ',
    cancel: 'ਰੱਦ ਕਰੋ',
    back: 'ਪਿੱਛੇ',
    confirm: 'ਪੁਸ਼ਟੀ ਕਰੋ',
    signIn: 'ਸਾਈਨ ਇਨ',
    signUp: 'ਸਾਈਨ ਅੱਪ',
    signOut: 'ਸਾਈਨ ਆਊਟ',
    email: 'ਈਮੇਲ',
    password: 'ਪਾਸਵਰਡ',
    name: 'ਨਾਮ',
    phone: 'ਫ਼ੋਨ',

    home: 'ਹੋਮ',
    explore: 'ਖੋਜੋ',
    orders: 'ਆਰਡਰ',
    profile: 'ਪ੍ਰੋਫਾਈਲ',
    menu: 'ਮੀਨੂ',

    freshFromFarm: 'ਖੇਤ ਤੋਂ ਤਾਜ਼ਾ 🌱',
    buyFreshVegetables: 'ਤਸਦੀਕ ਕੀਤੀਆਂ ਸਥਾਨਕ ਦੁਕਾਨਾਂ ਤੋਂ ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ ਅਤੇ ਫਲ ਖਰੀਦੋ',
    nearbyShops: 'ਨੇੜੇ ਦੀਆਂ ਦੁਕਾਨਾਂ',
    products: 'ਉਤਪਾਦ',
    setYourLocation: 'ਆਪਣੀ ਥਾਂ ਸੈੱਟ ਕਰੋ',
    findShopsNearYou: 'ਆਪਣੇ ਨੇੜੇ ਦੀਆਂ ਦੁਕਾਨਾਂ ਲੱਭੋ',
    setLocation: 'ਥਾਂ ਸੈੱਟ ਕਰੋ',
    changeLocation: 'ਥਾਂ ਬਦਲੋ',
    shopsNearYou: 'ਤੁਹਾਡੇ ਨੇੜੇ ਦੀਆਂ ਦੁਕਾਨਾਂ',
    allShops: 'ਸਾਰੀਆਂ ਦੁਕਾਨਾਂ',
    noShopsAvailable: 'ਅਜੇ ਕੋਈ ਦੁਕਾਨ ਉਪਲਬਧ ਨਹੀਂ। ਜਲਦੀ ਦੇਖੋ!',
    noShopsFound: 'ਤੁਹਾਡੀ ਖੋਜ ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਕੋਈ ਦੁਕਾਨ ਨਹੀਂ ਮਿਲੀ',
    searchShops: 'ਦੁਕਾਨਾਂ ਖੋਜੋ...',
    all: 'ਸਾਰੇ',
    vegetables: 'ਸਬਜ਼ੀਆਂ',
    fruits: 'ਫਲ',
    leafyGreens: 'ਪੱਤੇਦਾਰ ਸਬਜ਼ੀਆਂ',

    selectCity: 'ਸ਼ਹਿਰ ਚੁਣੋ',
    enterPincode: 'ਪਿੰਨਕੋਡ ਦਿਓ',
    selectOnMap: 'ਨਕਸ਼ੇ ਤੇ ਚੁਣੋ',
    useCurrentLocation: 'ਮੌਜੂਦਾ ਥਾਂ ਵਰਤੋ',
    confirmLocation: 'ਥਾਂ ਪੁਸ਼ਟੀ ਕਰੋ',
    city: 'ਸ਼ਹਿਰ',
    pincode: 'ਪਿੰਨਕੋਡ',
    map: 'ਨਕਸ਼ਾ',

    welcomeBack: 'ਵਾਪਸੀ ਤੇ ਸਵਾਗਤ ਹੈ',
    createAccount: 'ਖਾਤਾ ਬਣਾਓ',
    selectRole: 'ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ',
    customer: 'ਗਾਹਕ',
    shopkeeper: 'ਦੁਕਾਨਦਾਰ',
    farmer: 'ਕਿਸਾਨ',
    admin: 'ਐਡਮਿਨ',
    alreadyHaveAccount: 'ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?',
    dontHaveAccount: 'ਖਾਤਾ ਨਹੀਂ ਹੈ?',
    continueAs: 'ਵਜੋਂ ਜਾਰੀ ਰੱਖੋ',

    adminDashboard: 'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ',
    shopkeeperDashboard: 'ਦੁਕਾਨਦਾਰ ਡੈਸ਼ਬੋਰਡ',
    farmerDashboard: 'ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ',
    platformManagement: 'ਪਲੇਟਫਾਰਮ ਪ੍ਰਬੰਧਨ ਅਤੇ ਮੋਡਰੇਸ਼ਨ',
    manageShop: 'ਆਪਣੀ ਦੁਕਾਨ ਅਤੇ ਇਨਵੈਂਟਰੀ ਪ੍ਰਬੰਧਿਤ ਕਰੋ',
    manageProduce: 'ਉਪਜ ਅਤੇ ਕੀਮਤ ਪ੍ਰਬੰਧਿਤ ਕਰੋ',
    pendingApprovals: 'ਬਕਾਇਆ ਮਨਜ਼ੂਰੀਆਂ',
    activeRequests: 'ਸਰਗਰਮ ਬੇਨਤੀਆਂ',

    userManagement: 'ਉਪਭੋਗਤਾ ਪ੍ਰਬੰਧਨ',
    verifyAccounts: 'ਖਾਤਿਆਂ ਦੀ ਤਸਦੀਕ ਕਰੋ, ਭੂਮਿਕਾਵਾਂ ਪ੍ਰਬੰਧਿਤ ਕਰੋ',
    shopApprovals: 'ਦੁਕਾਨ ਮਨਜ਼ੂਰੀਆਂ',
    reviewShops: 'ਦੁਕਾਨਾਂ ਦੀ ਸਮੀਖਿਆ ਅਤੇ ਮਨਜ਼ੂਰੀ ਕਰੋ',
    farmerVerification: 'ਕਿਸਾਨ ਤਸਦੀਕ',
    verifyFarmers: 'ਕਿਸਾਨ ਖਾਤਿਆਂ ਦੀ ਤਸਦੀਕ ਕਰੋ',
    requestsDisputes: 'ਬੇਨਤੀਆਂ ਅਤੇ ਵਿਵਾਦ',
    handleRequests: 'ਉਪਭੋਗਤਾ ਬੇਨਤੀਆਂ ਨੂੰ ਸੰਭਾਲੋ',
    analytics: 'ਵਿਸ਼ਲੇਸ਼ਣ',
    viewStatistics: 'ਪਲੇਟਫਾਰਮ ਅੰਕੜੇ ਦੇਖੋ',
    allUsers: 'ਸਾਰੇ ਉਪਭੋਗਤਾ',
    allCustomers: 'ਸਾਰੇ ਗਾਹਕ',
    allShopkeepers: 'ਸਾਰੇ ਦੁਕਾਨਦਾਰ',
    allFarmers: 'ਸਾਰੇ ਕਿਸਾਨ',
    systemOverview: 'ਸਿਸਟਮ ਓਵਰਵਿਊ',
    totalOrders: 'ਕੁੱਲ ਆਰਡਰ',
    totalProducts: 'ਕੁੱਲ ਉਤਪਾਦ',
    totalProduce: 'ਕੁੱਲ ਉਪਜ',

    overview: 'ਓਵਰਵਿਊ',
    myProducts: 'ਮੇਰੇ ਉਤਪਾਦ',
    addProduct: 'ਉਤਪਾਦ ਸ਼ਾਮਲ ਕਰੋ',
    createShop: 'ਦੁਕਾਨ ਬਣਾਓ',
    shopName: 'ਦੁਕਾਨ ਦਾ ਨਾਮ',
    shopDescription: 'ਦੁਕਾਨ ਦਾ ਵੇਰਵਾ',
    address: 'ਪਤਾ',
    state: 'ਸੂਬਾ',
    openingTime: 'ਖੋਲ੍ਹਣ ਦਾ ਸਮਾਂ',
    closingTime: 'ਬੰਦ ਹੋਣ ਦਾ ਸਮਾਂ',
    shopLocation: 'ਦੁਕਾਨ ਦੀ ਥਾਂ',

    myProduce: 'ਮੇਰੀ ਉਪਜ',
    addProduce: 'ਉਪਜ ਸ਼ਾਮਲ ਕਰੋ',
    bulkOrders: 'ਬਲਕ ਆਰਡਰ',
    pricePerKg: 'ਪ੍ਰਤੀ ਕਿਲੋ ਕੀਮਤ',
    quantity: 'ਮਾਤਰਾ',
    harvestDate: 'ਵਾਢੀ ਦੀ ਤਾਰੀਖ',
    organic: 'ਜੈਵਿਕ',

    pending: 'ਬਕਾਇਆ',
    confirmed: 'ਪੁਸ਼ਟੀ ਹੋਈ',
    preparing: 'ਤਿਆਰ ਹੋ ਰਿਹਾ ਹੈ',
    ready: 'ਤਿਆਰ',
    pickedUp: 'ਚੁੱਕਿਆ ਗਿਆ',
    cancelled: 'ਰੱਦ',
    orderDetails: 'ਆਰਡਰ ਵੇਰਵੇ',
    noOrders: 'ਅਜੇ ਕੋਈ ਆਰਡਰ ਨਹੀਂ',

    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    choosePreferredLanguage: 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ',

    aboutPlatform: 'ਪਲੇਟਫਾਰਮ ਬਾਰੇ',
    helpContact: 'ਮਦਦ / ਐਡਮਿਨ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',

    myProfile: 'ਮੇਰੀ ਪ੍ਰੋਫਾਈਲ',
    editProfile: 'ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ',
    myOrders: 'ਮੇਰੇ ਆਰਡਰ',
    settings: 'ਸੈਟਿੰਗਾਂ',
    language: 'ਭਾਸ਼ਾ',
    notifications: 'ਸੂਚਨਾਵਾਂ',
    darkMode: 'ਡਾਰਕ ਮੋਡ',

    searchProducts: 'ਉਤਪਾਦ ਖੋਜੋ...',
    categories: 'ਸ਼੍ਰੇਣੀਆਂ',
    featuredShops: 'ਵਿਸ਼ੇਸ਼ ਦੁਕਾਨਾਂ',
    nearbyFarmers: 'ਨੇੜੇ ਦੇ ਕਿਸਾਨ',
  },
};
