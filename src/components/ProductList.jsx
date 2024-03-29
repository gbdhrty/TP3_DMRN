import { FlatList, StyleSheet, Text, View } from "react-native";
import { ProductCard } from "./ProductCard";

export function ProductList({ products }) {
    const renderItem = ({ item }) => (
        <ProductCard product={item} />
    );

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item, index) => `product_${index}`}
            style={styles.list}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        width: '100%',
    },
});