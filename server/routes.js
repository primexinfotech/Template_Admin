
import bcrypt from "bcryptjs";

// Sample data for demo
const sampleUsers = [
  {
    id: 1,
    username: "admin",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi" // password: "admin"
  }
];

const sampleOrders = [
  {
    id: 1,
    orderId: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    productName: "Laptop",
    productWeight: "2.50",
    destinationCity: "New York",
    destinationPostal: "10001",
    destinationAddress: "123 Main St",
    status: "pending",
    amount: "999.99",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: 2,
    orderId: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    productName: "Smartphone",
    productWeight: "0.20",
    destinationCity: "Los Angeles",
    destinationPostal: "90210",
    destinationAddress: "456 Oak Ave",
    status: "shipped",
    amount: "699.99",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-16")
  },
  {
    id: 3,
    orderId: "ORD-003",
    customerName: "Bob Johnson",
    customerEmail: "bob@example.com",
    productName: "Tablet",
    productWeight: "0.50",
    destinationCity: "Chicago",
    destinationPostal: "60601",
    destinationAddress: "789 Pine Rd",
    status: "delivered",
    amount: "399.99",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-17")
  }
];

let orderIdCounter = 4;

export function registerRoutes(app) {
  // Auth middleware
  const requireAuth = (req, res, next) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      // For demo purposes, accept admin/admin
      if (username === "admin" && password === "admin") {
        const user = {
          id: 1,
          userId: "admin",
          name: "Administrator"
        };
        
        req.session.userId = user.id;
        req.session.user = user;
        
        return res.json({ 
          user,
          message: "Login successful" 
        });
      }

      // Check sample users
      const user = sampleUsers.find(u => u.username === username);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      req.session.user = {
        id: user.id,
        userId: user.username,
        name: user.username
      };

      res.json({ 
        user: req.session.user,
        message: "Login successful" 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    res.json({ user: req.session.user });
  });

  // Orders routes
  app.get("/api/orders", requireAuth, async (req, res) => {
    try {
      const { status, search, page = 1, limit = 10 } = req.query;
      const offset = (parseInt(page) - 1) * parseInt(limit);

      let filteredOrders = [...sampleOrders];

      // Filter by status
      if (status && status !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === status);
      }

      // Filter by search
      if (search) {
        const searchLower = search.toLowerCase();
        filteredOrders = filteredOrders.filter(order =>
          order.orderId.toLowerCase().includes(searchLower) ||
          order.customerName.toLowerCase().includes(searchLower) ||
          order.customerEmail.toLowerCase().includes(searchLower) ||
          order.productName.toLowerCase().includes(searchLower)
        );
      }

      // Sort by creation date (newest first)
      filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Pagination
      const total = filteredOrders.length;
      const paginatedOrders = filteredOrders.slice(offset, offset + parseInt(limit));

      res.json({
        orders: paginatedOrders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total,
          pages: Math.ceil(total / parseInt(limit))
        }
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", requireAuth, async (req, res) => {
    try {
      const orderData = req.body;
      
      // Basic validation
      if (!orderData.customerName || !orderData.customerEmail || !orderData.productName) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newOrder = {
        id: orderIdCounter++,
        orderId: `ORD-${String(orderIdCounter - 1).padStart(3, '0')}`,
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        productName: orderData.productName,
        productWeight: orderData.productWeight || "0.00",
        destinationCity: orderData.destinationCity,
        destinationPostal: orderData.destinationPostal,
        destinationAddress: orderData.destinationAddress,
        status: orderData.status || "pending",
        amount: orderData.amount || "0.00",
        createdAt: new Date(),
        updatedAt: new Date()
      };

      sampleOrders.push(newOrder);
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.put("/api/orders/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const orderIndex = sampleOrders.findIndex(order => order.id === parseInt(id));
      
      if (orderIndex === -1) {
        return res.status(404).json({ error: "Order not found" });
      }

      const updatedOrder = {
        ...sampleOrders[orderIndex],
        ...updateData,
        updatedAt: new Date()
      };

      sampleOrders[orderIndex] = updatedOrder;
      res.json(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  app.delete("/api/orders/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      
      const orderIndex = sampleOrders.findIndex(order => order.id === parseInt(id));
      
      if (orderIndex === -1) {
        return res.status(404).json({ error: "Order not found" });
      }

      sampleOrders.splice(orderIndex, 1);
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Failed to delete order" });
    }
  });
}
