import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ProductList } from "../components/ProductList";

export function InitialPage() {
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [productFilter, setProductFilter] = useState('');
    const [sortProducts, setSortProducts] = useState('asc');

    useEffect(() => {
        async function loadProducts() {
            setIsLoading(true);
            const url = 'https://t3t4-dfe-pb-grl-m1-default-rtdb.firebaseio.com/products.json';
            const request = await fetch(url);
            const productsJson = await request.json();
            setProducts(Object.values(productsJson));
            setIsLoading(false);
        }
        loadProducts();
    }, []);

    function filteredProductList() {
        let productList = [...products];
        const searchTerm = productFilter.toLocaleLowerCase();
        if (productFilter.length > 1) {
          productList = productList.filter(product => {
            return product.nome.toLowerCase().includes(searchTerm) || 
                   product.descricao.toLowerCase().includes(searchTerm);
          });
        }
        if (sortProducts === 'asc') {
            productList.sort((a, b) => a.nome.localeCompare(b.nome));
        } else if (sortProducts === 'desc') {
            productList.sort((a, b) => b.nome.localeCompare(a.nome));
        } else if (sortProducts === 'priceAsc') {
            productList.sort((a, b) => a.preco - b.preco);
        } else if (sortProducts === 'priceDesc') {
            productList.sort((a, b) => b.preco - a.preco);
        }
        return productList;
      }


    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <TextInput 
                    style={styles.filter}
                    placeholder="Buscar produto..."
                    value={productFilter}
                    onChangeText={setProductFilter}
                />
                <Picker 
                    style={styles.picker}
                    selectedValue={sortProducts}
                    onValueChange={setSortProducts}
                >
                    <Picker.Item 
                        value='asc' 
                        label="Ordenar por ordem alfabética"
                    />
                    <Picker.Item 
                        value='desc' 
                        label="Ordenar por ordem alfabética inversa" 
                    />
                    <Picker.Item 
                        value='priceAsc' 
                        label="Ordenar por preço (ordem crescente)"
                    />
                    <Picker.Item 
                        value='priceDesc' 
                        label="Ordenar por preço (ordem decrescente)"
                    />
                </Picker>
            </View>
            {isLoading && <ActivityIndicator size="large" />}
            {products && <ProductList products={filteredProductList()} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    filterContainer: {
        gap: 8,
        marginVertical: 10,
    },
    filter: {
        backgroundColor: '#fff',
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    picker: {
        borderWidth: 1,
        padding: 5,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});