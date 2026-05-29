const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let clothes = [
{
id:1,
imageUrl:"https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
name:"White T-Shirt",
category:"Top",
color:"White",
style:"Casual"
},
{
id:2,
imageUrl:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
name:"Blue Jeans",
category:"Bottom",
color:"Blue",
style:"Casual"
}
];

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/closet',(req,res)=>{

res.render('closet',{
clothes
});

});

app.get('/add',(req,res)=>{

res.render('add');

});

app.post('/add',(req,res)=>{

const newItem = {

id: Date.now(),

imageUrl:req.body.imageUrl,

name:req.body.name,

category:req.body.category,

color:req.body.color,

style:req.body.style

};

clothes.push(newItem);

res.render('submit',{
item:newItem
});

});

app.listen(port, () => {
    console.log(`StyledByMe running at http://localhost:${port}`);
});