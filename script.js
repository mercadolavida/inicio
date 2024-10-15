const data = [
    { name: 'Oxxo Plaza La Vida', category: 'Abarrotes', description: 'Tienda de conveniencia que vende productos de consumo diario, como comida preparada, botanas y bebidas.', location: 'GGW8+5W Corregidora, Querétaro', phone: 'ND' },
    { name: 'Oxxo Luna Gas', category: 'Abarrotes', description: 'Tienda de conveniencia que vende productos de consumo diario, como comida preparada, botanas y bebidas.', location: 'GGW9+5J El Pueblito, Querétaro', phone: 'ND' },
    { name: 'Oxxo Av. De La Vida', category: 'Abarrotes', description: 'Tienda de conveniencia que vende productos de consumo diario, como comida preparada, botanas y bebidas.', location: 'GGR8+R9 Corregidora, Querétaro', phone: 'ND' },
    { name: 'Bodega Aurrerá Express', category: 'Abarrotes', description: 'Tienda de autoservicio que vende una amplia variedad de productos.', location: 'GGW9+64 Los Ángeles, Querétaro', phone: '442 260 7621' },
    { name: 'Farmacia Guadalajara', category: 'Salud', description: 'Venta de productos de medicina, perfumería, fotografía, hogar, alimentos, limpieza, panadería y otros.', location: '20.54517485482843, -100.4830150884849', phone: 'ND' },
    { name: 'Bara', category: 'Abarrotes', description: 'Se dedica a abastecer la despensa de los hogares en las colonias donde opera', location: 'GGW8+2W Corregidora, Querétaro', phone: 'ND' },
    { name: 'San Juan Salchichonerías', category: 'Abarrotes', description: 'Venta de embutidos, lácteos, abarrotes y congelados', location: 'GGW8+2C Los Ángeles, Querétaro', phone: '442 223 3332' },
    { name: 'El Buen Taco', category: 'Restaurante', description: 'Tacos, parrilla y más...', location: 'GGW8+29 Los Ángeles, Querétaro', phone: 'ND' },
    { name: 'Asturiano', category: 'Abarrotes', description: 'Amplio catálogo de productos, como cerveza, vinos y licores, tabaco, botanas, refrescos y bebidas, entre otros.', location: 'GGW8+29 Corregidora, Querétaro', phone: 'ND' },
    { name: 'Katori Martial Arts', category: 'Deportes', description: 'Academia de Artes Marciales.', location: 'GGW8+6X Corregidora, Querétaro', phone: '442 476 6449' },
];

const options = {
    keys: ['name', 'category', 'description'],
    threshold: 0.3
};
const fuse = new Fuse(data, options);

function loadAllBusinesses() {
    let html = '';
    data.forEach((item, index) => {
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`;
        const phoneLink = `tel:${item.phone}`;

        html += `<div class="result-item">
                    <h3>${item.name}</h3>
                    <p><strong>Categoría:</strong> ${item.category}</p>
                    <p>${item.description}</p>
                    <p><strong>Ubicación:</strong> <a href="${mapLink}" target="_blank">${item.location}</a></p>
                    <p><strong>Teléfono:</strong> <a href="${phoneLink}">${item.phone}</a></p>
                 </div>`;
    });

    document.getElementById('results').innerHTML = html;
}

function performSearch() {
    const query = document.getElementById('searchBox').value;
    const results = fuse.search(query);

    let html = '';

    if (query.trim() === '') {
        loadAllBusinesses();
        return;
    }

    results.forEach((item, index) => {
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.item.location)}`;
        const phoneLink = `tel:${item.item.phone}`;

        html += `<div class="result-item">
                    <h3>${item.item.name}</h3>
                    <p><strong>Categoría:</strong> ${item.item.category}</p>
                    <p>${item.item.description}</p>
                    <p><strong>Ubicación:</strong> <a href="${mapLink}" target="_blank">${item.item.location}</a></p>
                    <p><strong>Teléfono:</strong> <a href="${phoneLink}">${item.item.phone}</a></p>
                 </div>`;
    });

    document.getElementById('results').innerHTML = html;
}

function clearSearch() {
    document.getElementById('searchBox').value = '';
    loadAllBusinesses();
}

document.getElementById('searchBox').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

loadAllBusinesses();
