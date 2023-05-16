import { getShoppingCart } from "../utilities/fakedb";

const CartProductsLoader = async () => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    const productsData = await fetch('http://localhost:5000/productsByIds', {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await productsData.json();

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