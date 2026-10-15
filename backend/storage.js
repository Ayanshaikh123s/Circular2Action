const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Circular = require("./models/Circular");
const ActionItem = require("./models/ActionItem");
const Notification = require("./models/Notification");
const Category = require("./models/Category");
const seedData = require("./data/seedData");

const DB_FILE = path.join(__dirname, "data", "db.json");

let isMongoConnected = false;

function setMongoConnected(status) {
  isMongoConnected = status;
}

function getMongoConnected() {
  return isMongoConnected;
}

// Ensure db.json exists with seed data if file storage is used
function initFileStorage() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: seedData.initialStudents.map((s, idx) => ({
        _id: `student_${idx + 1}`,
        id: idx + 1,
        ...s,
        password: bcrypt.hashSync("student123", 10),
        createdAt: new Date().toISOString(),
      })),
      circulars: seedData.initialCirculars.map((c, idx) => ({
        _id: `circ_${idx + 1}`,
        id: idx + 1,
        ...c,
        createdAt: new Date().toISOString(),
      })),
      actions: seedData.initialActions.map((a, idx) => ({
        _id: `act_${idx + 1}`,
        id: idx + 1,
        ...a,
        createdAt: new Date().toISOString(),
      })),
      notifications: seedData.initialNotifications.map((n, idx) => ({
        _id: `notif_${idx + 1}`,
        id: idx + 1,
        ...n,
        createdAt: new Date().toISOString(),
      })),
      categories: seedData.initialCategories.map((cat, idx) => ({
        _id: `cat_${idx + 1}`,
        id: idx + 1,
        ...cat,
        createdAt: new Date().toISOString(),
      })),
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
}

function readDb() {
  try {
    initFileStorage();
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading db.json:", err);
    return { users: [], circulars: [], actions: [], notifications: [], categories: [] };
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing db.json:", err);
  }
}

// ----------------- USERS -----------------
async function getUsers() {
  if (isMongoConnected) {
    return await User.find().sort({ createdAt: -1 }).lean();
  }
  const db = readDb();
  return db.users;
}

async function findUserByEmail(email) {
  if (!email) return null;
  const cleanEmail = email.trim().toLowerCase();
  if (isMongoConnected) {
    return await User.findOne({ email: cleanEmail }).lean();
  }
  const db = readDb();
  return db.users.find((u) => u.email.toLowerCase() === cleanEmail) || null;
}

async function findUserById(id) {
  if (isMongoConnected) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await User.findById(id).lean();
    }
    return null;
  }
  const db = readDb();
  return db.users.find((u) => String(u._id) === String(id) || String(u.id) === String(id)) || null;
}

async function createUser(userData) {
  if (isMongoConnected) {
    const newUser = new User(userData);
    return await newUser.save();
  }
  const db = readDb();
  const newUser = {
    _id: `user_${Date.now()}`,
    id: Date.now(),
    status: "Active",
    course: userData.course || "BCA",
    department: userData.department || "Computer Applications",
    createdAt: new Date().toISOString(),
    ...userData,
  };
  db.users.push(newUser);
  writeDb(db);
  return newUser;
}

async function updateUser(id, updateData) {
  if (isMongoConnected) {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }
  const db = readDb();
  const index = db.users.findIndex(
    (u) => String(u._id) === String(id) || String(u.id) === String(id)
  );
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...updateData };
    writeDb(db);
    return db.users[index];
  }
  return null;
}

async function deleteUser(id) {
  if (isMongoConnected) {
    return await User.findByIdAndDelete(id);
  }
  const db = readDb();
  db.users = db.users.filter(
    (u) => String(u._id) !== String(id) && String(u.id) !== String(id)
  );
  writeDb(db);
  return true;
}

// ----------------- CIRCULARS -----------------
async function getCirculars(filter = {}) {
  if (isMongoConnected) {
    return await Circular.find(filter).sort({ createdAt: -1 }).lean();
  }
  const db = readDb();
  return [...db.circulars].reverse();
}

async function createCircular(circularData) {
  if (isMongoConnected) {
    const circular = new Circular(circularData);
    return await circular.save();
  }
  const db = readDb();
  const count = db.circulars.length + 1;
  const newCircular = {
    _id: `circ_${Date.now()}`,
    id: Date.now(),
    circularNumber: circularData.circularNumber || `C2A/2026/${String(count).padStart(3, "0")}`,
    status: circularData.status || "Published",
    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    deadline: circularData.deadline || "—",
    createdAt: new Date().toISOString(),
    ...circularData,
  };
  db.circulars.push(newCircular);
  writeDb(db);
  return newCircular;
}

async function updateCircular(id, updateData) {
  if (isMongoConnected) {
    return await Circular.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }
  const db = readDb();
  const index = db.circulars.findIndex(
    (c) => String(c._id) === String(id) || String(c.id) === String(id)
  );
  if (index !== -1) {
    const oldCirc = db.circulars[index];
    db.circulars[index] = { ...oldCirc, ...updateData };

    // Also update any matching action item
    if (db.actions && Array.isArray(db.actions)) {
      db.actions.forEach((a) => {
        if (String(a.circularId) === String(id) || a.circular === oldCirc.title) {
          if (updateData.title) a.circular = updateData.title;
          if (updateData.actionRequired) a.title = updateData.actionRequired;
          if (updateData.deadline) a.deadline = updateData.deadline;
          if (updateData.priority) a.priority = updateData.priority;
          if (updateData.category) a.category = updateData.category;
          if (updateData.audience) a.audience = updateData.audience;
        }
      });
    }

    writeDb(db);
    return db.circulars[index];
  }
  return null;
}

async function deleteCircular(id) {
  if (isMongoConnected) {
    return await Circular.findByIdAndDelete(id);
  }
  const db = readDb();
  const circ = db.circulars.find(
    (c) => String(c._id) === String(id) || String(c.id) === String(id)
  );

  db.circulars = db.circulars.filter(
    (c) => String(c._id) !== String(id) && String(c.id) !== String(id)
  );

  // Also remove associated action items
  if (circ && db.actions && Array.isArray(db.actions)) {
    db.actions = db.actions.filter(
      (a) => String(a.circularId) !== String(id) && a.circular !== circ.title
    );
  }

  writeDb(db);
  return true;
}

// ----------------- ACTIONS -----------------
async function getActions() {
  if (isMongoConnected) {
    return await ActionItem.find().sort({ createdAt: -1 }).lean();
  }
  const db = readDb();
  return [...db.actions].reverse();
}

async function createAction(actionData) {
  if (isMongoConnected) {
    const action = new ActionItem(actionData);
    return await action.save();
  }
  const db = readDb();
  const newAction = {
    _id: `act_${Date.now()}`,
    id: Date.now(),
    assignedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    status: actionData.status || "Pending",
    priority: actionData.priority || "Normal",
    completedDate: "",
    createdAt: new Date().toISOString(),
    ...actionData,
  };
  db.actions.push(newAction);
  writeDb(db);
  return newAction;
}

async function updateAction(id, updateData) {
  if (isMongoConnected) {
    return await ActionItem.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }
  const db = readDb();
  const index = db.actions.findIndex(
    (a) => String(a._id) === String(id) || String(a.id) === String(id)
  );
  if (index !== -1) {
    db.actions[index] = { ...db.actions[index], ...updateData };
    writeDb(db);
    return db.actions[index];
  }
  return null;
}

async function deleteAction(id) {
  if (isMongoConnected) {
    return await ActionItem.findByIdAndDelete(id);
  }
  const db = readDb();
  db.actions = db.actions.filter(
    (a) => String(a._id) !== String(id) && String(a.id) !== String(id)
  );
  writeDb(db);
  return true;
}

// ----------------- NOTIFICATIONS -----------------
async function getNotifications() {
  if (isMongoConnected) {
    return await Notification.find().sort({ createdAt: -1 }).lean();
  }
  const db = readDb();
  return [...db.notifications].reverse();
}

async function createNotification(notifData) {
  if (isMongoConnected) {
    const notif = new Notification(notifData);
    return await notif.save();
  }
  const db = readDb();
  const newNotif = {
    _id: `notif_${Date.now()}`,
    id: Date.now(),
    sentDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    time: "Just now",
    status: notifData.status || "Delivered",
    unread: true,
    channel: notifData.channel || "In-App",
    createdAt: new Date().toISOString(),
    ...notifData,
  };
  db.notifications.push(newNotif);
  writeDb(db);
  return newNotif;
}

async function updateNotification(id, updateData) {
  if (isMongoConnected) {
    return await Notification.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }
  const db = readDb();
  const index = db.notifications.findIndex(
    (n) => String(n._id) === String(id) || String(n.id) === String(id)
  );
  if (index !== -1) {
    db.notifications[index] = { ...db.notifications[index], ...updateData };
    writeDb(db);
    return db.notifications[index];
  }
  return null;
}

async function markAllNotificationsRead() {
  if (isMongoConnected) {
    await Notification.updateMany({}, { unread: false, status: "Read" });
    return true;
  }
  const db = readDb();
  db.notifications.forEach((n) => {
    n.unread = false;
    n.status = "Read";
  });
  writeDb(db);
  return true;
}

// ----------------- CATEGORIES -----------------
async function getCategories() {
  if (isMongoConnected) {
    return await Category.find().lean();
  }
  const db = readDb();
  return db.categories;
}

async function createCategory(catData) {
  if (isMongoConnected) {
    const cat = new Category(catData);
    return await cat.save();
  }
  const db = readDb();
  const newCat = {
    _id: `cat_${Date.now()}`,
    id: Date.now(),
    count: 0,
    color: catData.color || "purple",
    status: "Active",
    createdAt: new Date().toISOString(),
    ...catData,
  };
  db.categories.push(newCat);
  writeDb(db);
  return newCat;
}

async function updateCategory(id, updateData) {
  if (isMongoConnected) {
    return await Category.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }
  const db = readDb();
  const index = db.categories.findIndex(
    (c) => String(c._id) === String(id) || String(c.id) === String(id)
  );
  if (index !== -1) {
    db.categories[index] = { ...db.categories[index], ...updateData };
    writeDb(db);
    return db.categories[index];
  }
  return null;
}

async function deleteCategory(id) {
  if (isMongoConnected) {
    return await Category.findByIdAndDelete(id);
  }
  const db = readDb();
  db.categories = db.categories.filter(
    (c) => String(c._id) !== String(id) && String(c.id) !== String(id)
  );
  writeDb(db);
  return true;
}

module.exports = {
  setMongoConnected,
  getMongoConnected,
  initFileStorage,
  getUsers,
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  getCirculars,
  createCircular,
  updateCircular,
  deleteCircular,
  getActions,
  createAction,
  updateAction,
  deleteAction,
  getNotifications,
  createNotification,
  updateNotification,
  markAllNotificationsRead,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
