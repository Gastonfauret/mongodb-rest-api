async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/product');

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        const dataProducts = await response.json();
        const productsArray = dataProducts.products;
        console.log(productsArray);

        const productsList = document.getElementById('products-list');

        productsArray.forEach(element => { // Crear un contenedor para cada producto
            const productContainer = document.createElement('div');
            productContainer.style.marginBottom = '20px'; // Espaciado entre productos

            // Crear y añadir elementos para cada propiedad del producto
            const nameElement = document.createElement('p');
            nameElement.textContent = `Nombre: ${element.name}`;
            productContainer.appendChild(nameElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = `Descripción: ${element.description}`;
            productContainer.appendChild(descriptionElement);

            const priceElement = document.createElement('p');
            priceElement.textContent = `Precio: ${element.price}`;
            productContainer.appendChild(priceElement);

            // Añadir imagen si la URL está disponible
            if (element.imageURL) {
                const imageElement = document.createElement('img');
                imageElement.src = element.imageURL;
                imageElement.alt = `Imagen de ${element.name}`;
                imageElement.style.width = '100px'; // Ajusta el tamaño de la imagen si es necesario
                imageElement.style.height = 'auto'; // Mantiene la proporción de la imagen
                productContainer.appendChild(imageElement);
            }

            // Añadir el contenedor del producto a la lista
            productsList.appendChild(productContainer);
        });
    } catch (error) {
        console.log('Error:', error)
        
    }
}

fetchProducts();