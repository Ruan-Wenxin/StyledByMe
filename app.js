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

app.listen(port, () => {
    console.log(`StyledByMe running at http://localhost:${port}`);
});