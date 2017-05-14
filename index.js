const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
var db;

app.use(express.static('public'));

MongoClient.connect('mongodb://127.0.0.1:27017/slotfaker', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
});
// create
app.post('/slot', (req, res) => {
    db.collection('slot').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database')
        res.redirect('/');
    })
});
// update
app.put('/slot', (req, res) => {

})
// delete
app.delete('/slot', (req, res) => {

})
// index
app.get('/slot', (req, res) => {

})
// query slot
app.post('/', (req, res) => {

})
