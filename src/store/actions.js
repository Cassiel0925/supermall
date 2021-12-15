export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // payload新添加的商品
            let oldProduct = null;
            for (let item of context.state.cartList) {
                if (item.iid === payload.iid) {
                    oldProduct = item;
                }
            }
            // 判断oldProduct
            if (oldProduct) {
                context.commit('addCounter', oldProduct)
                resolve('商品数量+1');
                // oldProduct.count += 1
            } else {
                payload.count = 1
                    // context.state.cartList.push(payload)
                context.commit('addToCart', payload)
                resolve('添加了新的商品');
            }
        })
    }
}