import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useMenu } from "../context/MenuContext";
import { Course } from "../types";

const MENU_ITEMS = [
  // Breakfast
  { name: "Pink Morning Toast", description: "Toasted brioche with strawberry cream", course: "Breakfast" as Course, price: "95" },
  { name: "Berry Pancakes", description: "Soft pancakes topped with berry syrup", course: "Breakfast" as Course, price: "110" },
  { name: "Vanilla Smoothie Bowl", description: "Yogurt, granola & sliced fruits", course: "Breakfast" as Course, price: "100" },
  { name: "Rose Latte", description: "Coffee with rose essence & almond milk", course: "Breakfast" as Course, price: "80" },

  // Mains
  { name: "Grilled Chicken Deluxe", description: "Served with creamy mushroom sauce", course: "Mains" as Course, price: "250" },
  { name: "Salmon Love", description: "Grilled salmon with lemon glaze", course: "Mains" as Course, price: "280" },
  { name: "Pink Pasta", description: "Creamy beetroot pasta with parmesan", course: "Mains" as Course, price: "230" },
  { name: "Vegan Plate", description: "Tofu, veggies & quinoa bowl", course: "Mains" as Course, price: "190" },

  // Desserts
  { name: "Strawberry Dream", description: "Soft cake with strawberry frosting", course: "Desserts" as Course, price: "95" },
  { name: "Rose Cheesecake", description: "Light cheesecake with rose syrup", course: "Desserts" as Course, price: "100" },
  { name: "Chocolate Kiss", description: "Dark chocolate mousse with pink cream", course: "Desserts" as Course, price: "120" },
  { name: "Vanilla Tart", description: "Crispy base with vanilla cream", course: "Desserts" as Course, price: "90" },
];

export default function HomeScreen() {
  const { addItem, getTotalItems } = useMenu();
  const [activeTab, setActiveTab] = useState<"All" | "Breakfast" | "Mains" | "Desserts">("All");

  const filteredItems =
    activeTab === "All" ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.course === activeTab);

  return (
    <View style={styles.container}>
      {/* HEADER with your image */}
      <ImageBackground
        source={require("../assets/images/chef.webp")}
        style={styles.header}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <Text style={styles.headerTitle}>🍓 Pink & White Cuisine</Text>

        <View style={styles.counterCircle}>
          <Text style={styles.counterLabel}>Dishes</Text>
          <Text style={styles.counterNumber}>{getTotalItems()}</Text>
        </View>
      </ImageBackground>

      {/* TABS */}
      <View style={styles.tabs}>
        {["All", "Breakfast", "Mains", "Desserts"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab as any)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MENU */}
      <ScrollView style={styles.menu}>
        {filteredItems.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardPrice}>{item.price} R</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => addItem(item)}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  header: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginBottom: 10,
  },
  counterCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,192,203,0.8)",
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  counterLabel: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  counterNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 2,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F8E8EC",
    paddingVertical: 10,
    borderRadius: 15,
    margin: 10,
  },
  tab: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  activeTab: {
    color: "#E75480",
    fontWeight: "700",
    textDecorationLine: "underline",
  },

  menu: { padding: 10 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F5B7B1",
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#111" },
  cardDesc: { fontSize: 14, color: "#666", marginVertical: 5 },
  cardPrice: { fontSize: 16, fontWeight: "700", color: "#E75480" },

  addButton: {
    backgroundColor: "#E75480",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
