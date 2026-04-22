// Utility script to add sample delivery partners
// Run this in the browser console or create a page to execute it

const sampleDeliveryPartners = [
  {
    name: "Alex Johnson",
    phone: "+1 555-0101",
    email: "alex@delivery.com",
    company: "QuickDeliver Inc.",
    address: "123 Delivery St",
    city: "Metropolis",
    username: "alex_delivery",
    password: "password123"
  },
  {
    name: "Sarah Wilson",
    phone: "+1 555-0102",
    email: "sarah@fastdelivery.com",
    company: "FastTrack Logistics",
    address: "456 Speed Ave",
    city: "Cityville",
    username: "sarah_fast",
    password: "password123"
  },
  {
    name: "Mike Chen",
    phone: "+1 555-0103",
    email: "mike@express.com",
    company: "Express Couriers",
    address: "789 Express Blvd",
    city: "Townsville",
    username: "mike_express",
    password: "password123"
  }
];

// Add sample data to localStorage
if (typeof window !== 'undefined') {
  localStorage.setItem("deliveryPartners", JSON.stringify(sampleDeliveryPartners));
}

export default sampleDeliveryPartners;