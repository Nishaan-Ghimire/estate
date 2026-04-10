const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, 'db.json'));
const db = low(adapter);

// Default schema
db.defaults({
  users: [],
  favourites: [],
  properties: [
    {
      id: 'prop_001',
      title: 'Sunset Heights Penthouse',
      address: '14 Ridgeline Ave, Kathmandu',
      price: 85000000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      type: 'Penthouse',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    },
    {
      id: 'prop_002',
      title: 'Garden Villa Lalitpur',
      address: '7 Flower Street, Lalitpur',
      price: 45000000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1900,
      type: 'Villa',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    },
    {
      id: 'prop_003',
      title: 'City View Studio',
      address: '22 Tower Road, Thamel',
      price: 12000000,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      type: 'Studio',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    },
    {
      id: 'prop_004',
      title: 'Heritage Townhouse',
      address: '3 Patan Durbar Sq, Patan',
      price: 62000000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3200,
      type: 'Townhouse',
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80',
    },
    {
      id: 'prop_005',
      title: 'Modern Apartment Bhaktapur',
      address: '9 Newtown Complex, Bhaktapur',
      price: 28000000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    },
    {
      id: 'prop_006',
      title: 'Mountain View Cottage',
      address: '5 Hilltop Lane, Nagarkot',
      price: 35000000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1500,
      type: 'Cottage',
      image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&q=80',
    },
  ],
}).write();

module.exports = db;
