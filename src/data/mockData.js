// ============================================================
// PAYPERLESS — Central Mock Data Store
// All data is hardcoded. No backend, no APIs.
// ============================================================

// --- Merchant definitions grouped by category ---
export const merchantCategories = {
  grocery: {
    label: 'Grocery',
    icon: '🛒',
    color: '#4CAF50',
    stores: ['Lidl', 'Billa', 'Hofer', 'Penny', 'Spar'],
  },
  coffee: {
    label: 'Coffee',
    icon: '☕',
    color: '#795548',
    stores: ['Starbucks', 'Cafe Costa'],
  },
  restaurant: {
    label: 'Restaurant',
    icon: '🍔',
    color: '#FF5722',
    stores: ['McDonalds', 'Burger King', 'Vapiano', 'Subway', 'KFC'],
  },
  clothing: {
    label: 'Clothing',
    icon: '👟',
    color: '#2196F3',
    stores: ['Nike', 'Adidas', 'Puma', 'JD'],
  },
  health: {
    label: 'Health',
    icon: '💊',
    color: '#E91E63',
    stores: ['DM', 'Douglas', 'Local Pharmacy'],
  },
};

// Flat lookup: store name → category key
export const storeToCategoryMap = {};
Object.entries(merchantCategories).forEach(([catKey, cat]) => {
  cat.stores.forEach((store) => {
    storeToCategoryMap[store] = catKey;
  });
});

// --- Brand colors per store (for card & badge styling) ---
export const storeBrandColors = {
  Lidl: { bg: '#0050AA', text: '#FFD500' },
  Billa: { bg: '#E30613', text: '#FFFFFF' },
  Hofer: { bg: '#00529B', text: '#FFFFFF' },
  Penny: { bg: '#CD1719', text: '#FFFFFF' },
  Spar: { bg: '#00843D', text: '#FFFFFF' },
  Starbucks: { bg: '#00704A', text: '#FFFFFF' },
  'Cafe Costa': { bg: '#6F2C3E', text: '#FFFFFF' },
  McDonalds: { bg: '#FFC72C', text: '#27251F' },
  'Burger King': { bg: '#FF8732', text: '#502314' },
  Vapiano: { bg: '#6B8E23', text: '#FFFFFF' },
  Subway: { bg: '#008C15', text: '#FFC600' },
  KFC: { bg: '#E4002B', text: '#FFFFFF' },
  Nike: { bg: '#111111', text: '#FFFFFF' },
  Adidas: { bg: '#000000', text: '#FFFFFF' },
  Puma: { bg: '#E11B22', text: '#FFFFFF' },
  JD: { bg: '#000000', text: '#FFFFFF' },
  DM: { bg: '#009EE0', text: '#FFFFFF' },
  Douglas: { bg: '#1A1A1A', text: '#C5A258' },
  'Local Pharmacy': { bg: '#2E7D32', text: '#FFFFFF' },
};

// --- Payment cards (Credit/Debit) ---
export const paymentCards = [
  {
    id: 'card-1',
    type: 'visa',
    label: 'Visa',
    last4: '4829',
    holder: 'ALEX MÜLLER',
    expiry: '09/28',
    gradient: 'linear-gradient(135deg, #0B7A75, #2EC4B6)',
    balance: '€2,458.30',
  },
  {
    id: 'card-2',
    type: 'mastercard',
    label: 'Mastercard',
    last4: '7153',
    holder: 'ALEX MÜLLER',
    expiry: '03/27',
    gradient: 'linear-gradient(135deg, #1A1A2E, #4A4A6A)',
    balance: '€1,120.75',
  },
  {
    id: 'card-3',
    type: 'maestro',
    label: 'Maestro',
    last4: '3391',
    holder: 'ALEX MÜLLER',
    expiry: '11/29',
    gradient: 'linear-gradient(135deg, #0D1B2A, #1B4965)',
    balance: '€890.00',
  },
];

// --- Initial loyalty cards ---
export const initialLoyaltyCards = [
  { id: 'lc-1', store: 'Lidl', cardNumber: '2901 4837 5521', category: 'grocery' },
  { id: 'lc-2', store: 'Starbucks', cardNumber: '6012 8834 9901', category: 'coffee' },
  { id: 'lc-3', store: 'Nike', cardNumber: '7744 2210 3385', category: 'clothing' },
  { id: 'lc-4', store: 'DM', cardNumber: '3309 1127 6650', category: 'health' },
  { id: 'lc-5', store: 'Spar', cardNumber: '8815 4402 7739', category: 'grocery' },
  { id: 'lc-6', store: 'McDonalds', cardNumber: '1123 5578 2244', category: 'restaurant' },
];

// --- Typical receipt line items per category ---
const receiptItemsByCategory = {
  grocery: [
    { name: 'Whole Milk 1L', price: 1.29 },
    { name: 'Sourdough Bread', price: 2.49 },
    { name: 'Free-Range Eggs (6)', price: 2.99 },
    { name: 'Organic Butter 250g', price: 3.19 },
    { name: 'Fuji Apples (1kg)', price: 2.79 },
    { name: 'Greek Yogurt 500g', price: 1.89 },
    { name: 'Sparkling Water 1.5L', price: 0.89 },
    { name: 'Pasta Fusilli 500g', price: 1.49 },
  ],
  coffee: [
    { name: 'Caffè Latte (Grande)', price: 4.50 },
    { name: 'Blueberry Muffin', price: 2.90 },
    { name: 'Espresso (Doppio)', price: 3.20 },
    { name: 'Almond Croissant', price: 3.10 },
    { name: 'Iced Americano', price: 3.80 },
  ],
  restaurant: [
    { name: 'Classic Cheeseburger', price: 5.90 },
    { name: 'Large Fries', price: 3.20 },
    { name: 'Cola Medium', price: 2.80 },
    { name: 'Chicken Nuggets (9pc)', price: 4.99 },
    { name: 'Apple Pie', price: 2.30 },
    { name: 'McFlurry Oreo', price: 3.50 },
  ],
  clothing: [
    { name: 'Air Max 90 Sneakers', price: 139.99 },
    { name: 'Tech Fleece Hoodie', price: 89.99 },
    { name: 'Dri-FIT T-Shirt', price: 34.99 },
    { name: 'Athletic Crew Socks (3pk)', price: 14.99 },
  ],
  health: [
    { name: 'Multivitamin Complex', price: 8.95 },
    { name: 'Face Moisturizer 50ml', price: 6.49 },
    { name: 'Whitening Toothpaste', price: 3.29 },
    { name: 'Argan Shampoo 250ml', price: 4.99 },
    { name: 'SPF 50 Sunscreen', price: 9.99 },
  ],
};

// Helper: pick N random items from a category
function pickItems(category, count) {
  const pool = receiptItemsByCategory[category] || [];
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, pool.length)).map((item) => ({
    ...item,
    quantity: 1,
    total: item.price,
  }));
}

// Helper: calculate paper length saved (5cm header + 3cm per line item)
export function calculatePaperSaved(itemCount) {
  const baseCm = 5;
  const perItemCm = 3;
  return baseCm + itemCount * perItemCm;
}

// --- Receipts (auto-generated on payment) ---
export const receipts = [
  {
    id: 'r-1',
    store: 'Lidl',
    category: 'grocery',
    date: '2026-06-20',
    time: '14:23',
    receiptNumber: 'LDL-2026-048291',
    items: pickItems('grocery', 5),
  },
  {
    id: 'r-2',
    store: 'Starbucks',
    category: 'coffee',
    date: '2026-06-19',
    time: '09:15',
    receiptNumber: 'SBX-2026-019834',
    items: pickItems('coffee', 3),
  },
  {
    id: 'r-3',
    store: 'McDonalds',
    category: 'restaurant',
    date: '2026-06-18',
    time: '12:45',
    receiptNumber: 'MCD-2026-077412',
    items: pickItems('restaurant', 4),
  },
  {
    id: 'r-4',
    store: 'Nike',
    category: 'clothing',
    date: '2026-06-17',
    time: '16:30',
    receiptNumber: 'NKE-2026-033198',
    items: pickItems('clothing', 3),
  },
  {
    id: 'r-5',
    store: 'DM',
    category: 'health',
    date: '2026-06-16',
    time: '11:10',
    receiptNumber: 'DM-2026-055623',
    items: pickItems('health', 4),
  },
  {
    id: 'r-6',
    store: 'Billa',
    category: 'grocery',
    date: '2026-06-15',
    time: '18:05',
    receiptNumber: 'BLA-2026-091847',
    items: pickItems('grocery', 6),
  },
  {
    id: 'r-7',
    store: 'Burger King',
    category: 'restaurant',
    date: '2026-06-14',
    time: '13:20',
    receiptNumber: 'BK-2026-062553',
    items: pickItems('restaurant', 3),
  },
  {
    id: 'r-8',
    store: 'Douglas',
    category: 'health',
    date: '2026-06-13',
    time: '15:40',
    receiptNumber: 'DGL-2026-044782',
    items: pickItems('health', 3),
  },
  {
    id: 'r-9',
    store: 'Spar',
    category: 'grocery',
    date: '2026-06-12',
    time: '10:30',
    receiptNumber: 'SPR-2026-081234',
    items: pickItems('grocery', 4),
  },
  {
    id: 'r-10',
    store: 'Cafe Costa',
    category: 'coffee',
    date: '2026-06-11',
    time: '08:50',
    receiptNumber: 'CC-2026-027891',
    items: pickItems('coffee', 2),
  },
];

// Compute subtotal, tax (20% VAT), and total for each receipt
receipts.forEach((receipt) => {
  receipt.subtotal = receipt.items.reduce((sum, item) => sum + item.total, 0);
  receipt.tax = +(receipt.subtotal * 0.2).toFixed(2);
  receipt.total = +(receipt.subtotal + receipt.tax).toFixed(2);
  receipt.subtotal = +receipt.subtotal.toFixed(2);
  receipt.paperSavedCm = calculatePaperSaved(receipt.items.length);
});

// --- Discounts / Promotional offers ---
export const discounts = [
  { id: 'd-1', store: 'Lidl', category: 'grocery', type: 'percentage', value: 20, description: 'All organic products', validUntil: '2026-06-30' },
  { id: 'd-2', store: 'Starbucks', category: 'coffee', type: 'bogo', value: null, description: 'Buy 1 Get 1 Free on all cold drinks', validUntil: '2026-07-05' },
  { id: 'd-3', store: 'Nike', category: 'clothing', type: 'percentage', value: 30, description: 'Summer Sale — selected sneakers', validUntil: '2026-07-15' },
  { id: 'd-4', store: 'McDonalds', category: 'restaurant', type: 'fixed', value: 2, description: '€2 off any meal combo', validUntil: '2026-06-28' },
  { id: 'd-5', store: 'DM', category: 'health', type: 'percentage', value: 15, description: 'Skincare essentials range', validUntil: '2026-07-10' },
  { id: 'd-6', store: 'Billa', category: 'grocery', type: 'percentage', value: 10, description: 'Fresh bakery items before noon', validUntil: '2026-06-25' },
  { id: 'd-7', store: 'Adidas', category: 'clothing', type: 'percentage', value: 25, description: 'Originals collection — online exclusive', validUntil: '2026-07-20' },
  { id: 'd-8', store: 'Subway', category: 'restaurant', type: 'fixed', value: 1.5, description: '€1.50 off any footlong', validUntil: '2026-06-30' },
  { id: 'd-9', store: 'Douglas', category: 'health', type: 'percentage', value: 20, description: 'All fragrances — loyalty members', validUntil: '2026-07-01' },
  { id: 'd-10', store: 'Cafe Costa', category: 'coffee', type: 'coupon', value: null, description: 'Free cookie with any hot beverage', validUntil: '2026-06-27' },
  { id: 'd-11', store: 'Hofer', category: 'grocery', type: 'percentage', value: 15, description: 'Weekly fresh produce deal', validUntil: '2026-06-22' },
  { id: 'd-12', store: 'Puma', category: 'clothing', type: 'percentage', value: 40, description: 'End of season clearance', validUntil: '2026-07-31' },
  { id: 'd-13', store: 'KFC', category: 'restaurant', type: 'bogo', value: null, description: 'Buy 1 bucket, get wings free', validUntil: '2026-07-05' },
  { id: 'd-14', store: 'Spar', category: 'grocery', type: 'coupon', value: null, description: 'Digital coupon — 3x bonus points', validUntil: '2026-06-29' },
  { id: 'd-15', store: 'Penny', category: 'grocery', type: 'percentage', value: 25, description: 'All frozen meals this week', validUntil: '2026-06-24' },
];

// --- Home screen promotions / ad banners ---
export const promotions = [
  {
    id: 'promo-1',
    title: 'Summer Fresh Deals',
    subtitle: 'Up to 30% off organic groceries at Lidl',
    store: 'Lidl',
    gradient: 'linear-gradient(135deg, #0050AA, #00A1E4)',
  },
  {
    id: 'promo-2',
    title: 'Rewards Doubled ☕',
    subtitle: 'Earn 2x stars on every Starbucks purchase this week',
    store: 'Starbucks',
    gradient: 'linear-gradient(135deg, #00704A, #1DB954)',
  },
  {
    id: 'promo-3',
    title: 'Nike Summer Sale',
    subtitle: 'Up to 40% off selected sneakers & apparel',
    store: 'Nike',
    gradient: 'linear-gradient(135deg, #111111, #444444)',
  },
  {
    id: 'promo-4',
    title: 'Beauty Week at Douglas',
    subtitle: 'Exclusive discounts on premium fragrances',
    store: 'Douglas',
    gradient: 'linear-gradient(135deg, #1A1A1A, #C5A258)',
  },
];

// --- Spending analytics data ---
export const spendingData = {
  byCategory: {
    Grocery: 187.40,
    Coffee: 43.20,
    Restaurant: 62.80,
    Clothing: 279.97,
    Health: 33.72,
  },
  weeklySpending: [
    { label: 'Mon', amount: 12.50 },
    { label: 'Tue', amount: 45.30 },
    { label: 'Wed', amount: 8.90 },
    { label: 'Thu', amount: 23.40 },
    { label: 'Fri', amount: 67.20 },
    { label: 'Sat', amount: 34.10 },
    { label: 'Sun', amount: 15.80 },
  ],
  monthlySpending: [
    { label: 'Week 1', amount: 156.30 },
    { label: 'Week 2', amount: 203.80 },
    { label: 'Week 3', amount: 178.50 },
    { label: 'Week 4', amount: 142.20 },
  ],
};

// --- Dashboard data (merchant-facing analytics) ---
export const dashboardData = {
  ageGroups: {
    labels: ['18–24', '25–34', '35–44', '45–54', '55+'],
    values: [2840, 5120, 3960, 2200, 1480],
  },
  genderSplit: {
    labels: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
    values: [42, 38, 12, 8],
  },
  // 30 days of daily receipt counts
  dailyReceipts: {
    labels: Array.from({ length: 30 }, (_, i) => {
      const d = new Date(2026, 4, 22 + i); // May 22 → Jun 20
      return `${d.getDate()}/${d.getMonth() + 1}`;
    }),
    values: [
      312, 287, 345, 401, 378, 356, 290,
      320, 398, 412, 445, 423, 389, 310,
      335, 402, 456, 478, 501, 467, 430,
      389, 420, 488, 512, 534, 498, 465,
      502, 548,
    ],
  },
};
