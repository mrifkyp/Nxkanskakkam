const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/bypass', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, error: 'URL is required' });
    }

    try {
        const response = await axios.get(`https://ethos.kys.gay/api/free/bypass?url=${encodeURIComponent(url)}`);

        // Mengambil data dari respons API yang dipanggil
        const { result, time_elapsed } = response.data;

        // Menyesuaikan struktur respons sesuai permintaan
        res.json({
            success: true,
            result: result || "No result available",
            time_elapsed: time_elapsed || "Unknown time"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error occurred while bypassing the URL' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
