// db.js
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = 'giftDB';
let dbInstance = null;
let client = null;

const initialGifts = [
    { id: '1', name: 'Coffee table', category: 'Furniture', condition: 'Good', age_years: 4, description: 'Medium-sized coffee table with storage.', location: 'Dallas' },
    { id: '2', name: 'Lampshade', category: 'Home Decor', condition: 'Like new', age_years: 2, description: 'Warm-toned lamp shade for living room.', location: 'Austin' },
    { id: '3', name: 'Desk chair', category: 'Furniture', condition: 'Fair', age_years: 6, description: 'Ergonomic office chair with minor wear.', location: 'Houston' },
    { id: '4', name: 'Bicycle', category: 'Outdoor', condition: 'Good', age_years: 3, description: 'Kids bike with training wheels.', location: 'Phoenix' },
    { id: '5', name: 'Bookshelf', category: 'Furniture', condition: 'Excellent', age_years: 1, description: 'Wooden bookshelf with five shelves.', location: 'Seattle' },
    { id: '6', name: 'Dining set', category: 'Furniture', condition: 'Good', age_years: 5, description: 'Four chairs and matching table.', location: 'Boston' },
    { id: '7', name: 'Kids toys', category: 'Toys', condition: 'Like new', age_years: 1, description: 'Various toy bins and puzzles.', location: 'Denver' },
    { id: '8', name: 'Cookware set', category: 'Kitchen', condition: 'Good', age_years: 4, description: 'Complete pan set and utensils.', location: 'Miami' },
    { id: '9', name: 'Garden tools', category: 'Garden', condition: 'Good', age_years: 2, description: 'Shovel, rake, gloves, and hose.', location: 'Portland' },
    { id: '10', name: 'Winter jacket', category: 'Clothing', condition: 'Excellent', age_years: 1, description: 'Warm adult jacket in navy.', location: 'Chicago' },
    { id: '11', name: 'Laptop stand', category: 'Electronics', condition: 'Like new', age_years: 2, description: 'Adjustable stand for work-from-home setups.', location: 'Atlanta' },
    { id: '12', name: 'Baby crib', category: 'Baby', condition: 'Good', age_years: 3, description: 'Convertible crib in white finish.', location: 'San Diego' },
    { id: '13', name: 'Treadmill', category: 'Fitness', condition: 'Fair', age_years: 7, description: 'Used folding treadmill, working condition.', location: 'Dallas' },
    { id: '14', name: 'Camping tent', category: 'Outdoor', condition: 'Excellent', age_years: 1, description: 'Family tent for weekend trips.', location: 'Nashville' },
    { id: '15', name: 'Board games', category: 'Entertainment', condition: 'Like new', age_years: 2, description: 'Collection of strategy and family games.', location: 'Los Angeles' },
    { id: '16', name: 'Office monitor', category: 'Electronics', condition: 'Good', age_years: 5, description: '27-inch monitor with HDMI cable.', location: 'San Jose' }
];

const inMemoryDb = {
    gifts: [...initialGifts],
    users: []
};

function createMemoryCollection(name) {
    const items = inMemoryDb[name] || [];

    return {
        findOne: async (query = {}) => {
            if (!query || Object.keys(query).length === 0) return items[0] || null;
            return items.find((item) => {
                return Object.entries(query).every(([key, value]) => {
                    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                        if (value.$regex) {
                            return new RegExp(value.$regex, value.$options || 'i').test(String(item[key] ?? ''));
                        }
                        if (value.$lte !== undefined) {
                            return Number(item[key] ?? 0) <= Number(value.$lte);
                        }
                        if (value.$eq !== undefined) {
                            return item[key] === value.$eq;
                        }
                    }
                    return item[key] === value;
                });
            }) || null;
        },
        find: (query = {}) => ({
            toArray: async () => {
                return items.filter((item) => {
                    return Object.entries(query).every(([key, value]) => {
                        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                            if (value.$regex) {
                                return new RegExp(value.$regex, value.$options || 'i').test(String(item[key] ?? ''));
                            }
                            if (value.$lte !== undefined) {
                                return Number(item[key] ?? 0) <= Number(value.$lte);
                            }
                        }
                        return item[key] === value;
                    });
                });
            }
        }),
        insertOne: async (doc) => {
            items.push(doc);
            return { insertedId: doc.id || `${Date.now()}-${items.length}` };
        },
        updateOne: async (filter, update) => {
            const index = items.findIndex((item) => Object.entries(filter).every(([key, value]) => item[key] === value));
            if (index === -1) return { matchedCount: 0, modifiedCount: 0 };
            items[index] = { ...items[index], ...update.$set };
            return { matchedCount: 1, modifiedCount: 1 };
        }
    };
}

async function connectToDatabase() {
    if (dbInstance) return dbInstance;

    try {
        client = new MongoClient(url);
        await client.connect();
        console.log('Connected successfully to MongoDB server');
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (error) {
        console.warn('MongoDB unavailable, falling back to in-memory data store:', error.message);
        dbInstance = {
            collection: createMemoryCollection
        };
        return dbInstance;
    }
}

module.exports = connectToDatabase;