const API_BASE = "http://localhost:5000/api";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...options.headers,
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`API Error on [${options.method || "GET"} ${endpoint}]:`, err.message);
    throw err;
  }
}

// ----------------- AUTH API -----------------
export const authAPI = {
  login: async (email, password) => {
    const res = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("circular2actionUser", JSON.stringify(res.user));
      localStorage.setItem("isLoggedIn", "true");
    }
    return res;
  },

  signup: async (userData) => {
    const res = await request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("circular2actionUser", JSON.stringify(res.user));
    }
    return res;
  },

  getProfile: () => request("/auth/me"),

  updateProfile: (data) => request("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  }),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("circular2actionUser");
    localStorage.removeItem("isLoggedIn");
  },
};

// ----------------- CIRCULARS API -----------------
export const circularAPI = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await request(`/circulars${query ? `?${query}` : ""}`);
    const list = Array.isArray(res) ? res : (res.circulars || []);
    list.circulars = list;
    list.count = list.length;
    return list;
  },

  create: async (data) => {
    const res = await request("/circulars", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.circular || res;
  },

  update: async (id, data) => {
    const res = await request(`/circulars/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.circular || res;
  },

  delete: (id) => request(`/circulars/${id}`, {
    method: "DELETE",
  }),
};

// ----------------- STUDENTS API -----------------
export const studentAPI = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await request(`/students${query ? `?${query}` : ""}`);
    const list = Array.isArray(res) ? res : (res.students || []);
    list.students = list;
    list.count = list.length;
    return list;
  },

  create: async (data) => {
    const res = await request("/students", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.student || res;
  },

  update: async (id, data) => {
    const res = await request(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.student || res;
  },

  delete: (id) => request(`/students/${id}`, {
    method: "DELETE",
  }),
};

// ----------------- ACTIONS API -----------------
export const actionAPI = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await request(`/actions${query ? `?${query}` : ""}`);
    const list = Array.isArray(res) ? res : (res.actions || []);
    list.actions = list;
    list.count = list.length;
    return list;
  },

  create: async (data) => {
    const res = await request("/actions", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.action || res;
  },

  update: async (id, data) => {
    const res = await request(`/actions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.action || res;
  },

  updateStatus: async (id, status) => {
    const res = await request(`/actions/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return res.action || res;
  },

  delete: (id) => request(`/actions/${id}`, {
    method: "DELETE",
  }),
};

// ----------------- NOTIFICATIONS API -----------------
export const notificationAPI = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await request(`/notifications${query ? `?${query}` : ""}`);
    const list = Array.isArray(res) ? res : (res.notifications || []);
    list.notifications = list;
    list.count = list.length;
    return list;
  },

  create: async (data) => {
    const res = await request("/notifications", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.notification || res;
  },

  markRead: (id) => request(`/notifications/${id}/read`, {
    method: "PATCH",
  }),

  markAllRead: () => request("/notifications/mark-all-read", {
    method: "PATCH",
  }),
};

// ----------------- CATEGORIES API -----------------
export const categoryAPI = {
  getAll: async () => {
    const res = await request("/categories");
    const list = Array.isArray(res) ? res : (res.categories || []);
    list.categories = list;
    list.count = list.length;
    return list;
  },

  create: async (data) => {
    const res = await request("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.category || res;
  },

  update: async (id, data) => {
    const res = await request(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.category || res;
  },

  delete: (id) => request(`/categories/${id}`, {
    method: "DELETE",
  }),
};

// ----------------- STATS API -----------------
export const statsAPI = {
  getAdminStats: async () => {
    const res = await request("/stats/admin");
    const s = res.stats || res;
    s.stats = s;
    return s;
  },
  getStudentStats: async (semester) => {
    const res = await request(`/stats/student${semester ? `?semester=${semester}` : ""}`);
    const s = res.stats || res;
    s.stats = s;
    s.circularsCount = s.circularsCount ?? s.myCircularsCount ?? 0;
    return s;
  },
};
