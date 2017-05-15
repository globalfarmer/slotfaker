const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');
var db;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/js', express.static('./public/js'));
app.set("view engine", "ejs");
app.set("views", "./views");

MongoClient.connect('mongodb://127.0.0.1:27017/slotfaker', (err, database) => {
    if (err) return console.log(err)
    db = database
    db.collection('slot').remove({_id: '59193ae2451d64fc1c8d791d'});
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
});
// update
app.put('/slot', (req, res) => {
    var slot = {
        student: {
            code: req.body.std_code,
            fullname: req.body.std_fullname,
            birthday: req.body.std_birthday,
            klass: req.body.std_klass
        },
        course: {
            code: req.body.c_code,
            name: req.body.c_name,
            tc: req.body.c_tc,
            term: req.body.c_term,
            group: req.body.c_group
        },
        note: req.body.note
    }
    db.collection('slot').update(
        {
            _id: ObjectID(req.body._id)
        },
        {
            $set: slot
        },
        {
            upsert: true
        },
        (err, result) => {
            if (err) return res.send(err)
            res.json(result);
        }
    );
})
// delete
app.delete('/slot', (req, res) => {
    console.log(req.body);
    db.collection('slot').findOneAndDelete(
        {
            _id: ObjectID(req.body._id)
        },
        (err, result) => {
            if (err) return res.send(err)
            res.json(result);
        }
    );
})
// index
app.get('/slot', (req, res) => {
    db.collection('slot').find().toArray((err, results) => {
        if( err ) return console.log(err);
        res.render('index', {slots: results});
    })
})
// query slot
app.get('/', (req, res) => {
    res.render('qldt');
})
//@param SinhvienLmh[term_id]
//@param SinhvienLmh_page
//@param pageSize
app.get('/', (req, res) => {
    const { term_id, page, pagaSize } = {
        term_id: res.body['SinhvienLmh[term_id]'],
        page: res.body['SinhvienLmh'],
        pageSize: res.body['pageSize']
    };
    db.collection('slot').find({termID: term_id}).skip(pageSize * (page-1)).limit(pageSize).toArray((err, results)=>
    {
        if( err ) return console.log(err);
        db.collection('slot').count((err, count) => {
            res.json({count: count, slots: results});
        })
    });
})
