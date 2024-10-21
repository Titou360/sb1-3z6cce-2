import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Plugin {
  id: string;
  name: string;
  description: string;
  price: number | 'FREE';
}

interface PluginState {
  availablePlugins: Plugin[];
  selectedPlugins: string[];
  cart: string[];
}

const initialState: PluginState = {
  availablePlugins: [
    { id: '1', name: 'Team Management', description: 'Manage your team efficiently', price: 'FREE' },
    { id: '2', name: 'Planning', description: 'Organize schedules and tasks', price: 'FREE' },
    { id: '3', name: 'Instruction Booklet', description: 'Create and manage instruction manuals', price: 'FREE' },
    { id: '4', name: 'Mailbox', description: 'Internal communication system', price: 'FREE' },
    { id: '5', name: 'Housekeeping Manager', description: 'Manage cleaning schedules and tasks', price: 29.99 },
    { id: '6', name: 'Maintenance Tracker', description: 'Track and manage maintenance requests', price: 24.99 },
    { id: '7', name: 'Guest Communication', description: 'Streamline guest communication', price: 19.99 },
    { id: '8', name: 'Inventory Management', description: 'Manage hotel inventory efficiently', price: 34.99 },
  ],
  selectedPlugins: [],
  cart: [],
};

const pluginSlice = createSlice({
  name: 'plugins',
  initialState,
  reducers: {
    togglePlugin: (state, action: PayloadAction<string>) => {
      const pluginId = action.payload;
      if (state.selectedPlugins.includes(pluginId)) {
        state.selectedPlugins = state.selectedPlugins.filter(id => id !== pluginId);
      } else {
        state.selectedPlugins.push(pluginId);
      }
    },
    setSelectedPlugins: (state, action: PayloadAction<string[]>) => {
      state.selectedPlugins = action.payload;
    },
    updatePluginName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;
      const plugin = state.availablePlugins.find(p => p.id === id);
      if (plugin) {
        plugin.name = name;
      }
    },
    addToCart: (state, action: PayloadAction<string>) => {
      if (!state.cart.includes(action.payload)) {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(id => id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { togglePlugin, setSelectedPlugins, updatePluginName, addToCart, removeFromCart, clearCart } = pluginSlice.actions;
export default pluginSlice.reducer;