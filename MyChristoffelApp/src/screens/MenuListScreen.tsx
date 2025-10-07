import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useMenu } from "../context/MenuContext";
import { Course } from "../types";

export default function MenuListScreen({ navigation }: any) {
  const { getTotalItems, getItemsByCourse } = useMenu();
  const COURSES: Course[] = ["Breakfast", "Mains", "Desserts"];

  const renderCourseSection = (course: Course) => {
    const courseItems = getItemsByCourse(course);
    if (courseItems.length === 0) return null;

    return (
      <View key={course} style={styles.courseSection}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle}>{course}</Text>
          <Text style={styles.courseCount}>{courseItems.length} items</Text>
        </View>

        {courseItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => navigation.navigate("ItemDetails", { item })}
          >
            <View style={styles.itemContent}>
              <View style={styles.itemMain}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <Text style={styles.itemPrice}>R {item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Selected Dishes 🍓</Text>
        <Text style={styles.count}>{getTotalItems()} total</Text>
      </View>

      {/* Content */}
      {getTotalItems() === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No dishes yet</Text>
          <Text style={styles.emptyText}>
            Start by adding some dishes from the home screen 💖
          </Text>
        </View>
      ) : (
        <FlatList
          data={COURSES}
          renderItem={({ item }) => renderCourseSection(item)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF", // fond blanc doux
  },
  header: {
    backgroundColor: "#E75480", // rose
    paddingVertical: 25,
    paddingHorizontal: 20,
    margin: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFF",
    marginBottom: 5,
  },
  count: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
    opacity: 0.9,
  },

  listContent: {
    padding: 15,
  },
  courseSection: {
    marginBottom: 30,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },
  courseCount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
    backgroundColor: "#E75480",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },

  menuItem: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F8C8DC", // rose clair
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemMain: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E75480", // titre rose
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: "#555",
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111", // prix noir
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});
