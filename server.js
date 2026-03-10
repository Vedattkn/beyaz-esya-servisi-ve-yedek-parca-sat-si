const express = require("express");
const app = express();
const path = require("path");

// public klasörünü aktif eder
app.use(express.static(path.join(__dirname, "public")));

// Ürün bilgileri (dinamik)
const products = {
    termostat: {
        name: "Buzdolabı Termostatı",
        description: "Orijinal buzdolabı termostatı. Çoğu marka ile uyumludur.",
        price: "450 TL",
        features: [
            "Uzunluk: 12 cm",
            "Genişlik: 5 cm",
            "Ağırlık: 150 gr",
            "Malzeme: Paslanmaz metal",
            "Uyumluluk: Arçelik, Beko, Bosch"
        ],
        image: "https://via.placeholder.com/300"
    },
    pompa: {
        name: "Çamaşır Makinesi Pompası",
        description: "Yüksek performanslı su tahliye pompası.",
        price: "350 TL",
        features: [
            "Uzunluk: 10 cm",
            "Genişlik: 6 cm",
            "Ağırlık: 200 gr",
            "Güç: 40W",
            "Uyumluluk: Arçelik, Vestel, Siemens"
        ],
        image: "https://via.placeholder.com/300"
    },
    kumanda: {
        name: "Klima Kumandası",
        description: "Tüm klima modelleri ile uyumlu akıllı kumanda.",
        price: "250 TL",
        features: [
            "Uzunluk: 15 cm",
            "Genişlik: 4 cm",
            "Ağırlık: 100 gr",
            "Pil Türü: AAA x2",
            "Uyumluluk: LG, Samsung, Daikin"
        ],
        image: "https://via.placeholder.com/300"
    }
};

// sayfalar
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/hizmetler", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "hizmetler.html"));
});

app.get("/urunler", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "urunler.html"));
});

app.get("/iletisim", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "iletisim.html"));
});

app.get("/servis-talep", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "servis-talep.html"));
});

// Dinamik ürün detay sayfası
app.get("/urun/:id", (req, res) => {
    const productId = req.params.id;
    const product = products[productId];
    if (!product) return res.status(404).send("Ürün bulunamadı");
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${product.name}</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <section class="product-detail">
                <div class="product-img">
                    <img src="${product.image}">
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <p>${product.description}</p>
                    <p class="product-price">${product.price}</p>
                    <h3>Ürün Özellikleri</h3>
                    <ul class="product-features">
                        ${product.features.map(f => `<li>${f}</li>`).join("")}
                    </ul>
                    <button class="cart-btn" onclick="alert('Sepete eklendi: ${product.name}')">Sepete Ekle</button>
                </div>
            </section>
        </body>
        </html>
    `);
});

// server başlat
app.listen(3000, () => {
    console.log("Server çalışıyor: http://localhost:3000");
});