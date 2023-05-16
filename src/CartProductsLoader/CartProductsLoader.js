import { getShoppingCart } from "../utilities/fakedb";

const CartProductsLoader = async () => {
    const productsData = await fetch('http://localhost:5000/products');
    const products = await productsData.json();

    const storedCart = getShoppingCart()
    let savedCart = [];
    for (const id in storedCart) {
        const addedProducts = products.find(product => product._id === id);
        const quantity = storedCart[id];
        addedProducts.quantity = quantity;
        savedCart.push(addedProducts)

    }
    return savedCart;
}

export default CartProductsLoader;