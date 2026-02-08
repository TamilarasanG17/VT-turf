const mongoose = require('mongoose');
const Turf = require('./models/turf.js');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

const turfData =[
    {
        "name": "Chepauk Super Turf",
        "city": "Chennai",
        "location": "Chepauk",
        "pricePerHour": 500,
        "amenities": ["Parking", "Restroom", "Floodlights", "Drinking Water"],
        "image": "images/turf1.jpeg",
        "ratings":4.5,
        },
    {
        "name": "Thiruvanmiyur Play Zone",
        "city": "Chennai",
        "location": "Thiruvanmiyur",
        "pricePerHour": 450,
        "amenities": ["Changing Rooms", "Restroom", "Cafeteria", "Parking"],
        "image":"images/turf2.jpeg",
        "ratings":4
    },
    {
        "name": "Marina Sports Arena",
        "city": "Chennai",
        "location": "Marina Beach",
        "pricePerHour": 600,
        "amenities": ["Floodlights", "Restroom", "Seating Area"],
        "image": "images/turf3.jpeg",
        "ratings":3.5
    },
    {
        "name": "Avinashi Turf Ground",
        "city": "Coimbatore",
        "location": "Avinashi Road",
        "pricePerHour": 400,
        "amenities": ["Restroom", "Cafeteria", "Floodlights"],
        "image": "images/turf4.jpeg",
        "ratings":4.5
    },
    {
        "name": "RS Puram Play Arena",
        "city": "Coimbatore",
        "location": "RS Puram",
        "pricePerHour": 550,
        "amenities": ["Changing Rooms", "Parking", "Seating Area"],
        "image": "images/turf5.jpeg",
        "ratings":3.4
    },
    {
        "name": "Gandhipuram Sports Turf",
        "city": "Coimbatore",
        "location": "Gandhipuram",
        "pricePerHour": 420,
        "amenities": ["Restroom", "Drinking Water", "Seating Area"],
        "image": "images/turf6.jpeg"
    },
    {
        "name": "Annamalai Nagar Turf",
        "city": "Chidambaram",
        "location": "Annamalai Nagar",
        "pricePerHour": 380,
        "amenities": ["Parking", "Floodlights"],
        "image": "images/turf7.jpeg"
    },
    {
        "name": "Velachery Kickstart Arena",
        "city": "Chennai",
        "location": "Velachery",
        "pricePerHour": 550,
        "amenities": ["Changing Rooms", "Floodlights", "Parking"],
        "image": "images/turf8.jpeg"
    },
    {
        "name": "Race Course Turf",
        "city": "Madurai",
        "location": "Race Course Road",
        "pricePerHour": 400,
        "amenities": ["Floodlights", "Cafeteria", "Restroom"],
        "image": "images/turf9.jpeg"
    },
    {
        "name": "Madurai City Play Zone",
        "city": "Madurai",
        "location": "City Center",
        "pricePerHour": 420,
        "amenities": ["Restroom", "Seating Area"],
        "image": "images/turf10.jpeg"
    },
    {
        "name": "Singanallur Turf",
        "city": "Coimbatore",
        "location": "Singanallur",
        "pricePerHour": 390,
        "amenities": ["Floodlights", "Drinking Water", "Restroom"],
        "image": "images/turf11.jpeg"
    },
    {
        "name": "Kodambakkam Turf Hub",
        "city": "Chennai",
        "location": "Kodambakkam",
        "pricePerHour": 450,
        "amenities": ["Parking", "Changing Rooms", "Floodlights"],
        "image": "images/turf12.jpeg"
    },
    {
        "name": "Tambaram Sports Field",
        "city": "Chennai",
        "location": "Tambaram",
        "pricePerHour": 500,
        "amenities": ["Floodlights", "Parking", "Restroom"],
        "image": "images/turf13.jpeg"
    },
    {
        "name": "Alagapuram Turf",
        "city": "Salem",
        "location": "Alagapuram",
        "pricePerHour": 460,
        "amenities": ["Restroom", "Seating Area", "Floodlights"],
        "image": "images/turf14.jpeg"
    },
    {
        "name": "Perur Turf Court",
        "city": "Coimbatore",
        "location": "Perur",
        "pricePerHour": 410,
        "amenities": ["Changing Rooms", "Floodlights", "Parking"],
        "image": "images/turf15.jpeg"
    },
    {
        "name": "KK Nagar Turf",
        "city": "Madurai",
        "location": "KK Nagar",
        "pricePerHour": 400,
        "amenities": ["Restroom", "Changing Rooms"],
        "image": "images/turf1.jpeg"
    },
    {
        "name": "Peelamedu Sports Zone",
        "city": "Coimbatore",
        "location": "Peelamedu",
        "pricePerHour": 410,
        "amenities": ["Seating Area", "Floodlights"],
        "image": "images/turf2.jpeg"
    },
    {
        "name": "Anna Nagar Sports Arena",
        "city": "Chennai",
        "location": "Anna Nagar",
        "pricePerHour": 500,
        "amenities": ["Restroom", "Changing Rooms", "Parking"],
        "image": "images/turf3.jpeg"
    },
    {
        "name": "Saidapet Play Arena",
        "city": "Chennai",
        "location": "Saidapet",
        "pricePerHour": 475,
        "amenities": ["Floodlights", "Seating Area"],
        "image": "images/turf4.jpeg"
    },
    {
        "name": "West Mambalam Turf",
        "city": "Chennai",
        "location": "West Mambalam",
        "pricePerHour": 430,
        "amenities": ["Drinking Water", "Parking"],
        "image": "images/turf5.jpeg"
    },
    {
        "name": "Trichy Central Play Ground",
        "city": "Tiruchirappalli",
        "location": "Central",
        "pricePerHour": 480,
        "amenities": ["Parking", "Restroom", "Floodlights"],
        "image": "images/turf6.jpeg"
    },
    {
        "name": "Srirangam Turf Arena",
        "city": "Tiruchirappalli",
        "location": "Srirangam",
        "pricePerHour": 470,
        "amenities": ["Floodlights", "Seating Area", "Restroom"],
        "image": "images/turf7.jpeg"
    },
    {
        "name": "Golden Rock Sports Turf",
        "city": "Tiruchirappalli",
        "location": "Golden Rock",
        "pricePerHour": 490,
        "amenities": ["Changing Rooms", "Restroom"],
        "image": "images/turf8.jpeg"
    },
    {
        "name": "Vellore City Turf",
        "city": "Vellore",
        "location": "City Center",
        "pricePerHour": 430,
        "amenities": ["Floodlights", "Drinking Water"],
        "image": "images/turf9.jpeg"
    },
    {
        "name": "Fort Area Play Zone",
        "city": "Vellore",
        "location": "Fort Area",
        "pricePerHour": 450,
        "amenities": ["Parking", "Seating Area"],
        "image": "images/turf10.jpeg"
    },
    {
        "name": "Katpadi Sports Turf",
        "city": "Vellore",
        "location": "Katpadi",
        "pricePerHour": 420,
        "amenities": ["Restroom", "Changing Rooms"],
        "image": "images/turf11.jpeg.jpeg"
    },
    {
        "name": "Nagercoil Town Turf",
        "city": "Nagercoil",
        "location": "Town Center",
        "pricePerHour": 380,
        "amenities": ["Floodlights", "Restroom"],
        "image": "images/turf12.jpeg"
    },
    {
        "name": "Palayamkottai Play Arena",
        "city": "Tirunelveli",
        "location": "Palayamkottai",
        "pricePerHour": 400,
        "amenities": ["Restroom", "Parking"],
        "image": "images/turf13.jpeg"
    },
    {
        "name": "Gangaikonda Turf Zone",
        "city": "Thanjavur",
        "location": "Gangaikonda",
        "pricePerHour": 430,
        "amenities": ["Floodlights", "Seating Area"],
        "image": "images/turf14.jpeg"
    },
    
        {
            "name": "Thanjavur Fort Play Arena",
            "city": "Thanjavur",
            "location": "Fort Area",
            "pricePerHour": 450,
            "amenities": ["Restroom", "Changing Rooms", "Floodlights"],
            "image": "images/turf15.jpeg"
        },
        {
            "name": "Thillai Nagar Sports Zone",
            "city": "Tiruchirappalli",
            "location": "Thillai Nagar",
            "pricePerHour": 460,
            "amenities": ["Seating Area", "Floodlights", "Parking"],
            "image": "images/turf1.jpeg"
        },
        {
            "name": "Adyar Turf Field",
            "city": "Chennai",
            "location": "Adyar",
            "pricePerHour": 520,
            "amenities": ["Restroom", "Changing Rooms", "Cafeteria"],
            "image": "images/turf2.jpeg"
        },
        {
            "name": "Ramanathapuram Play Ground",
            "city": "Ramanathapuram",
            "location": "Central",
            "pricePerHour": 380,
            "amenities": ["Floodlights", "Drinking Water"],
            "image": "images/turf3.jpeg"
        },
        {
            "name": "Mambalam Sports Arena",
            "city": "Chennai",
            "location": "West Mambalam",
            "pricePerHour": 510,
            "amenities": ["Changing Rooms", "Seating Area", "Parking"],
            "image": "images/turf4.jpeg"
        },
        {
            "name": "Pallavaram Sports Turf",
            "city": "Chennai",
            "location": "Pallavaram",
            "pricePerHour": 490,
            "amenities": ["Floodlights", "Restroom", "Parking"],
            "image": "images/turf5.jpeg"
        },
        {
            "name": "Cuddalore City Turf",
            "city": "Cuddalore",
            "location": "Town Center",
            "pricePerHour": 400,
            "amenities": ["Changing Rooms", "Restroom"],
            "image": "images/turf6.jpeg"
        },
        {
            "name": "Chidambaram Central Arena",
            "city": "Chidambaram",
            "location": "Central",
            "pricePerHour": 420,
            "amenities": ["Parking", "Floodlights", "Seating Area"],
            "image": "images/turf7.jpeg"
        },
        {
            "name": "Mount Road Play Arena",
            "city": "Chennai",
            "location": "Mount Road",
            "pricePerHour": 540,
            "amenities": ["Parking", "Restroom", "Floodlights"],
            "image": "images/turf8.jpeg"
        },
        {
            "name": "Mahabalipuram Turf",
            "city": "Chennai",
            "location": "Mahabalipuram",
            "pricePerHour": 460,
            "amenities": ["Restroom", "Floodlights", "Cafeteria"],
            "image": "images/turf9.jpeg"
        },
        {
            "name": "Kumbakonam Play Zone",
            "city": "Kumbakonam",
            "location": "City Center",
            "pricePerHour": 410,
            "amenities": ["Restroom", "Seating Area"],
            "image": "images/turf10.jpeg"
        },
        {
            "name": "Nagercoil Sports Field",
            "city": "Nagercoil",
            "location": "City Center",
            "pricePerHour": 390,
            "amenities": ["Changing Rooms", "Floodlights"],
            "image": "images/turf11.jpeg"
        },
        {
            "name": "Virudhunagar Turf Arena",
            "city": "Virudhunagar",
            "location": "Main Road",
            "pricePerHour": 400,
            "amenities": ["Restroom", "Seating Area", "Parking"],
            "image": "images/turf12.jpeg"
        },
        {
            "name": "Ukkadam Sports Arena",
            "city": "Coimbatore",
            "location": "Ukkadam",
            "pricePerHour": 430,
            "amenities": ["Changing Rooms", "Floodlights", "Drinking Water"],
            "image": "images/turf13.jpeg"
        },
        {
            "name": "Pollachi Turf Ground",
            "city": "Coimbatore",
            "location": "Pollachi",
            "pricePerHour": 410,
            "amenities": ["Restroom", "Parking"],
            "image": "images/turf14.jpeg"
        },
        {
            "name": "Tiruppur Play Field",
            "city": "Tiruppur",
            "location": "Central",
            "pricePerHour": 450,
            "amenities": ["Floodlights", "Parking", "Drinking Water"],
            "image": "images/turf15.jpeg"
        },
        {
            "name": "Alwarthirunagar Sports Hub",
            "city": "Chennai",
            "location": "Alwarthirunagar",
            "pricePerHour": 480,
            "amenities": ["Restroom", "Seating Area", "Cafeteria"],
            "image": "images/turf1.jpeg"
        },
        {
            "name": "Nagapattinam Central Turf",
            "city": "Nagapattinam",
            "location": "Central",
            "pricePerHour": 420,
            "amenities": ["Parking", "Changing Rooms"],
            "image": "images/turf2.jpeg"
        },
        {
            "name": "Erode Turf Arena",
            "city": "Erode",
            "location": "Perundurai Road",
            "pricePerHour": 470,
            "amenities": ["Restroom", "Floodlights", "Parking"],
            "image": "images/turf3.jpeg"
        },
        {
            "name": "Perambur Sports Zone",
            "city": "Chennai",
            "location": "Perambur",
            "pricePerHour": 490,
            "amenities": ["Seating Area", "Parking", "Changing Rooms"],
            "image": "images/turf4.jpeg"
        },
        {
            "name": "Porur Play Field",
            "city": "Chennai",
            "location": "Porur",
            "pricePerHour": 450,
            "amenities": ["Parking", "Floodlights"],
            "image": "images/turf5.jpeg"
        },
        {
            "name": "Valasaravakkam Turf",
            "city": "Chennai",
            "location": "Valasaravakkam",
            "pricePerHour": 440,
            "amenities": ["Seating Area", "Parking", "Floodlights"],
            "image": "images/turf6.jpeg"
        },
        {
            "name": "Villivakkam Sports Field",
            "city": "Chennai",
            "location": "Villivakkam",
            "pricePerHour": 430,
            "amenities": ["Restroom", "Changing Rooms"],
            "image": "images/turf7.jpeg"
        },
        {
            "name": "Avadi Play Arena",
            "city": "Chennai",
            "location": "Avadi",
            "pricePerHour": 470,
            "amenities": ["Floodlights", "Seating Area"],
            "image": "images/turf8.jpeg"
        },
        {
            "name": "Guduvanchery Turf Ground",
            "city": "Chennai",
            "location": "Guduvanchery",
            "pricePerHour": 420,
            "amenities": ["Parking", "Floodlights"],
            "image": "images/turf9.jpeg"
        },
        {
            "name": "Chromepet Sports Arena",
            "city": "Chennai",
            "location": "Chromepet",
            "pricePerHour": 450,
            "amenities": ["Restroom", "Changing Rooms"],
            "image": "images/turf10.jpeg"
        },
        {
            "name": "Arakkonam Turf Arena",
            "city": "Arakkonam",
            "location": "City Center",
            "pricePerHour": 430,
            "amenities": ["Restroom", "Floodlights", "Seating Area"],
            "image": "images/turf11.jpeg"
        },
        {
            "name": "Puducherry Sports Turf",
            "city": "Puducherry",
            "location": "White Town",
            "pricePerHour": 460,
            "amenities": ["Changing Rooms", "Parking"],
            "image": "images/turf12.jpeg"
        },
        {
            "name": "Theni Central Play Ground",
            "city": "Theni",
            "location": "City Center",
            "pricePerHour": 440,
            "amenities": ["Seating Area", "Floodlights"],
            "image": "images/turf13.jpeg"
        },
        
            {
                "name": "Kovilpatti Sports Turf",
                "city": "Kovilpatti",
                "location": "Old Bus Stand",
                "pricePerHour": 420,
                "amenities": ["Restroom", "Changing Rooms", "Parking"],
                "image": "images/turf14.jpeg"
            },
            {
                "name": "Sivakasi Play Arena",
                "city": "Sivakasi",
                "location": "Main Road",
                "pricePerHour": 430,
                "amenities": ["Floodlights", "Restroom", "Seating Area"],
                "image": "images/turf15.jpeg"
            },
            {
                "name": "Rajapalayam Turf Zone",
                "city": "Rajapalayam",
                "location": "Central Town",
                "pricePerHour": 410,
                "amenities": ["Seating Area", "Floodlights"],
                "image": "images/turf1.jpeg"
            },
            {
                "name": "Tambaram Turf Field",
                "city": "Chennai",
                "location": "Tambaram",
                "pricePerHour": 480,
                "amenities": ["Changing Rooms", "Parking", "Floodlights"],
                "image": "images/turf2.jpeg"
            },
            {
                "name": "Thiruvallur Sports Ground",
                "city": "Thiruvallur",
                "location": "Near Railway Station",
                "pricePerHour": 400,
                "amenities": ["Restroom", "Seating Area"],
                "image": "images/turf3.jpeg"
            },
            {
                "name": "Periyakulam Turf Arena",
                "city": "Periyakulam",
                "location": "Market Street",
                "pricePerHour": 390,
                "amenities": ["Floodlights", "Drinking Water"],
                "image": "images/turf4.jpeg"
            },
            {
                "name": "Manapparai Play Zone",
                "city": "Manapparai",
                "location": "Main Bazaar",
                "pricePerHour": 410,
                "amenities": ["Parking", "Restroom"],
                "image": "images/turf5.jpeg"
            },
            {
                "name": "Chettinad Sports Turf",
                "city": "Karaikudi",
                "location": "Chettinad Road",
                "pricePerHour": 450,
                "amenities": ["Changing Rooms", "Seating Area", "Floodlights"],
                "image": "images/turf6.jpeg"
            },
            {
                "name": "Viluppuram Play Field",
                "city": "Viluppuram",
                "location": "Near Bus Stand",
                "pricePerHour": 400,
                "amenities": ["Parking", "Restroom"],
                "image": "images/turf7.jpeg"
            },
            {
                "name": "Theni Turf Center",
                "city": "Theni",
                "location": "Old Bazaar",
                "pricePerHour": 440,
                "amenities": ["Seating Area", "Floodlights", "Drinking Water"],
                "image": "images/turf8.jpeg"
            },
            
                {
                    "name": "Madurai Turf Arena",
                    "city": "Madurai",
                    "location": "Anna Nagar",
                    "pricePerHour": 450,
                    "amenities": ["Parking", "Changing Rooms", "Floodlights"],
                    "image": "images/turf9.jpeg"
                },
                {
                    "name": "Salem Sports Ground",
                    "city": "Salem",
                    "location": "Gandhi Road",
                    "pricePerHour": 400,
                    "amenities": ["Seating Area", "Floodlights"],
                    "image": "images/turf10.jpeg"
                },
                {
                    "name": "Tirunelveli Play Zone",
                    "city": "Tirunelveli",
                    "location": "Near Bus Stand",
                    "pricePerHour": 420,
                    "amenities": ["Restroom", "Changing Rooms", "Seating Area"],
                    "image": "images/turf11.jpeg"
                },
                {
                    "name": "Thanjavur Turf Spot",
                    "city": "Thanjavur",
                    "location": "Big Bazaar Street",
                    "pricePerHour": 390,
                    "amenities": ["Drinking Water", "Floodlights"],
                    "image": "images/turf12.jpeg"
                },
                {
                    "name": "Tiruppur Play Arena",
                    "city": "Tiruppur",
                    "location": "Kumaran Road",
                    "pricePerHour": 460,
                    "amenities": ["Changing Rooms", "Parking"],
                    "image": "images/turf13.jpeg"
                },
                {
                    "name": "Erode Turf Zone",
                    "city": "Erode",
                    "location": "Perundurai Road",
                    "pricePerHour": 440,
                    "amenities": ["Floodlights", "Seating Area", "Parking"],
                    "image": "images/turf14.jpeg"
                },
                {
                    "name": "Theni Central Play Ground",
                    "city": "Theni",
                    "location": "Central Theni",
                    "pricePerHour": 400,
                    "amenities": ["Parking", "Restroom"],
                    "image": "images/turf15.jpeg"
                },
                {
                    "name": "Dindigul Turf Spot",
                    "city": "Dindigul",
                    "location": "Station Road",
                    "pricePerHour": 380,
                    "amenities": ["Floodlights", "Changing Rooms"],
                    "image": "images/turf1.jpeg"
                },
                {
                    "name": "Kumbakonam Sports Arena",
                    "city": "Kumbakonam",
                    "location": "Market Street",
                    "pricePerHour": 410,
                    "amenities": ["Restroom", "Seating Area"],
                    "image": "images/turf2.jpeg"
                },
                {
                    "name": "Nagapattinam Play Zone",
                    "city": "Nagapattinam",
                    "location": "Harbor Road",
                    "pricePerHour": 430,
                    "amenities": ["Parking", "Drinking Water"],
                    "image": "images/turf3.jpeg"
                },
                {
                    "name": "Sivakasi Sports Turf",
                    "city": "Sivakasi",
                    "location": "Main Road",
                    "pricePerHour": 460,
                    "amenities": ["Floodlights", "Restroom", "Seating Area"],
                    "image": "images/turf4.jpeg"
                },
                {
                    "name": "Kovilpatti Turf Field",
                    "city": "Kovilpatti",
                    "location": "Old Bus Stand",
                    "pricePerHour": 430,
                    "amenities": ["Restroom", "Parking"],
                    "image": "images/turf5.jpeg"
                },
                {
                    "name": "Thiruvallur Play Zone",
                    "city": "Thiruvallur",
                    "location": "Near Railway Station",
                    "pricePerHour": 400,
                    "amenities": ["Seating Area", "Drinking Water"],
                    "image": "images/turf6.jpeg"
                },
                {
                    "name": "Ramanathapuram Turf Arena",
                    "city": "Ramanathapuram",
                    "location": "East Street",
                    "pricePerHour": 380,
                    "amenities": ["Parking", "Floodlights"],
                    "image": "images/turf7.jpeg"
                },
                {
                    "name": "Vellore Sports Hub",
                    "city": "Vellore",
                    "location": "Fort Road",
                    "pricePerHour": 410,
                    "amenities": ["Floodlights", "Changing Rooms", "Seating Area"],
                    "image": "images/turf8.jpeg"
                }
            
            
        ]
        
        
        const seedDatabase = async () => {
            try {
                for (const turf of turfData) {
                    await Turf.updateOne(
                        { name: turf.name },  
                        { $setOnInsert: turf },
                        { upsert: true }  
                    );
                }
                console.log("Turf data added or updated successfully!");
            } catch (error) {
                console.error("Error adding/updating turf data:", error);
            } finally {
                mongoose.connection.close();
            }
        };

seedDatabase();
    
        
