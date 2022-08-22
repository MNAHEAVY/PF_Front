/* eslint-disable array-callback-return */

export default function getOrder(products, order) {

    if (products && products.length === 0) return products
    if(!order || order.length === 0 ) return products
    //  T ó F, 1 o -1, T ó F, 1 o -1     
    var { names, nameAsc, prices, priceAsc } = order

    if (!names && !prices) return products
    
    if (names) {
        try {
            if(nameAsc === 1) {
                return products.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();
                if (nameA > nameB) return 1;
                if (nameA < nameB) return -1;
                return 0;
                // byprices(a, b)
            })} else {
                return products.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();
                if (nameA > nameB) return -1;
                if (nameA < nameB) return 1;
                return 0;
                // byprices(a, b)
            })}
        } catch (error) {
            console.log(error.message);
        }
    }

    // if (prices) return products.sort((a, b) => byprices(a, b))

    // function byprices(a, b) {
    //     if (a.price > b.price) return priceAsc;
    //     if (a.price < b.price) return -priceAsc;
    //     return 0;
    // }
}
