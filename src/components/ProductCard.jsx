import { Image, StyleSheet, Text, View } from "react-native";

export function ProductCard({ product }) {
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: product.imagens[0] }} 
                style={styles.img}
            />
            <Text>{product.nome}</Text>
            <Text>R${product.preco}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 5,
        padding: 5,
        gap: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    img: {
        width: 300,
        height: 300,
    },
});