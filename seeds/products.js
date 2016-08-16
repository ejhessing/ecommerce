exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('products').insert({id: 301, name: 'Darth Face T Shirt', price: 15, image: "http://g01.a.alicdn.com/kf/HTB1t3W6JFXXXXXFXFXXq6xXFXXXo/New-Fashion-Star-Wars-the-Darth-face-Vader-T-Shirt-Men-T-Shirts-Distinct-Mens-Shirt.jpg", description: " 100% high cotton content, comfortable fabric, high-grade printing" }),
        knex('products').insert({id: 302, name: 'Men\'s Timberland Boots', price: 200, image: "https://images.timberland.com/is/image/timberland/75509242-ALT2?", description: "Timberland Boots; Premium full-grain leather, hand finished, waxed cotton laces" }),
        knex('products').insert({id: 303, name: 'Men\'s Faded Jeans', price: 40, image: "http://i.ebayimg.com/images/g/RioAAOSwVFlT~xlH/s-l400.jpg", description: "100% Cotton Men's crosshatch denim jeans, button fastening on the front, multiple pockets" }),
        knex('products').insert({id: 304, name: 'Smart Bracelet', price: 25, image: "http://en1.data.coolicool.com/images/MHBXMMB2/MHBXMMB2_76ecbbf0dce2c16a408d1fc9b8468e69.images.400x400.jpg", description: "Photoelectric Sensor Smart Bracelet and Heart Rate Monitor, Fitness Tracker, Sleep Tracker" }),
        knex('products').insert({id: 305, name: 'Funny T Shirt', price: 15, image: "http://www.nekkidtees.com/wp-content/uploads/calmdown.jpg", description: "Relaxed fit standard T Shirt, 100% pre-shrunk cotton" }),
        knex('products').insert({id: 306, name: 'MP3 Headphone', price: 30, image: "https://cdn.chv.me/images/thumbnails/MP3_headphone_with_foldable_DtznxJUz.jpg.thumb_400x400.jpg", description: "MP3 headphones with a comfortable and foldable design, 16 GB microSD card port, Battery life of up to 8 hours" }),
        knex('products').insert({id: 307, name: 'Women\'s Watch', price: 20, image: "http://en1.data.coolicool.com/images/JW245065/JW245065_d023d8aa503bb6404d03a20f34c125f0.images.400x400.jpg", description: "Women's Watch - analog display with round dial, checkered watchband" }),
        knex('products').insert({id: 308, name: 'Men\'s Shaving Set', price: 100, image: "http://oneman.co.nz/wp-content/uploads/2014/07/eshave-shaving-set-t-3blade-400x400.jpg", description: " Razor, Brush and T Stand Shaving Set; Hand made 3 blade razor, Fine Badger brush made from 100% badger hair, Nickel finish shave stand for razor and brush" }),
        knex('products').insert({id: 309, name: 'Makeup Palette', price: 60, image: "http://thumbs1.picclick.com/d/l400/pict/122025669104_/Miss-Rose-Makeup-Palette-Eyeshadow-Palette-maquillage-For.jpg", description: "Eyeshadow Makeup Palette for Dresser; waterproof and shimmer" })
      ]);
    });
};
