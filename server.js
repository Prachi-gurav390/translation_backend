
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const { text, source, target } = req.query;
        const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${source}|${target}`;
        const response = await fetch(url);
        const json = await response.json();
        const match = await json.matches;
        const answer = match[match.length - 1].translation || 'No translation found';
        res.send(answer);
    } catch (error) {
        console.log(error);     
        res.send('Error!');
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
