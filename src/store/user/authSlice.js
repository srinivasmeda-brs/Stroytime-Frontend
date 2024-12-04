import { createSlice } from "@reduxjs/toolkit";

// Safely retrieve and parse data from localStorage
let userData = null;
try {
  const storedUserData = localStorage.getItem("userdata");
  userData = storedUserData ? JSON.parse(storedUserData) : null;
} catch (error) {
  console.error("Error parsing user data from localStorage:", error);
}

const token = localStorage.getItem("token") || null;
const spotifyToken = localStorage.getItem("spotifytoken") || null;

const initialState = {
  token,
  spotifyToken,
  isLoggedIn: !!token,
  userData,
  isSidebarOpen: false,
  storyInfo: { name: null, id: null },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token); // Save the token as a string
      state.spotifyToken = action.payload.spotifyToken.access_token;
      localStorage.setItem("spotifytoken", action.payload.spotifyToken.access_token);
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.spotifyToken = null;
      localStorage.removeItem("spotifytoken");
      state.userData = null;
      localStorage.removeItem("userdata");
      state.isLoggedIn = false;
    },
    setUserProfile: (state, action) => {
      state.userData = action.payload.profileData;
      localStorage.setItem("userdata", JSON.stringify(action.payload.profileData));
    },
    updateUserProfile: (state, action) => {
      state.userData = { ...userData, ...action.payload };
      localStorage.setItem("userdata", JSON.stringify(state.userData));
    },
    toggleLanguageSelection: (state, action) => {
      const languageId = action.payload;

      // Avoid mutating state directly; create a copy of `languages`
      const updatedLanguages = [...state.userData.languages];
      const index = updatedLanguages.indexOf(languageId);

      if (index === -1) {
        // Add language if not present
        updatedLanguages.push(languageId);
      } else {
        // Remove language if present
        updatedLanguages.splice(index, 1);
      }

      // Update userData with the modified languages array
      const updatedUserData = {
        ...state.userData,
        languages: updatedLanguages,
      };

      // Save the updated userData back to state and localStorage
      state.userData = updatedUserData;
      localStorage.setItem("userdata", JSON.stringify(updatedUserData));
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setStoryInfo: (state, action) => {
      state.storyInfo.id = action.payload.s_id;
      state.storyInfo.name = action.payload.s_name;
    },
    updateSpotifyToken: (state, action) => {
      state.spotifyToken = action.payload.spotifyToken.access_token;
      localStorage.setItem(
        "spotifytoken",
        JSON.stringify(action.payload.spotifyToken.access_token)
      );
    },
  },
});

export const {
  login,
  logout,
  setUserProfile,
  updateUserProfile,
  toggleLanguageSelection,
  toggleSidebar,
  setStoryInfo,
  updateSpotifyToken,
} = authSlice.actions;

export default authSlice.reducer;
