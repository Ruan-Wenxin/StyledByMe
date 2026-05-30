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

style:"Casual",

brand:"Uniqlo",

season:"Summer",

favorite:false
},
{
id:2,

imageUrl:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246",

name:"Blue Jeans",

category:"Bottom",

color:"Blue",

style:"Casual",

brand:"Levi's",

season:"All Season",

favorite:false
}
];

app.get('/', (req, res) => {

res.render('index',{
clothes
});

});

app.get('/closet',(req,res)=>{

res.render('closet',{
clothes
});

});

app.get('/add',(req,res)=>{

res.render('add');

});
app.get('/details/:id',(req,res)=>{

const item =
clothes.find(
x => x.id == req.params.id
);

res.render('details',{
item
});

});

app.post('/add',(req,res)=>{

const newItem = {

id: Date.now(),

imageUrl:req.body.imageUrl,

name:req.body.name,

category:req.body.category,

color:req.body.color,

style:req.body.style,

brand:req.body.brand,

season:req.body.season,

};

clothes.push(newItem);

res.render('submit',{
item:newItem
});

});

app.get('/edit/:id',(req,res)=>{

const item =
clothes.find(
x => x.id == req.params.id
);

res.render('edit',{
item
});

});

app.post('/edit/:id',(req,res)=>{

const item =
clothes.find(
x => x.id == req.params.id
);

item.imageUrl = req.body.imageUrl;
item.name = req.body.name;
item.category = req.body.category;
item.color = req.body.color;
item.style = req.body.style;
item.brand = req.body.brand;
item.season = req.body.season;

res.redirect('/closet');

});

app.get('/delete/:id',(req,res)=>{

clothes =
clothes.filter(
x => x.id != req.params.id
);

res.redirect('/closet');

});

app.get('/favorite/:id',(req,res)=>{

const item =
clothes.find(
x => x.id == req.params.id
);

item.favorite = !item.favorite;

res.redirect('/closet');

});

app.get('/outfits',(req,res)=>{

const favorites =
clothes.filter(
x => x.favorite
);

let outfitSuggestions = clothes;

if(req.query.category){

outfitSuggestions =
outfitSuggestions.filter(
x => x.category === req.query.category
);

}

if(req.query.style){

outfitSuggestions =
outfitSuggestions.filter(
x => x.style === req.query.style
);

}

if(req.query.color){

outfitSuggestions =
outfitSuggestions.filter(
x => x.color === req.query.color
);

}

if(req.query.season){

outfitSuggestions =
outfitSuggestions.filter(
x => x.season === req.query.season
);

}

if(req.query.occasion){

outfitSuggestions =
outfitSuggestions.filter(
x => x.occasion === req.query.occasion
);

}

res.render('outfits',{
favorites,
outfitSuggestions
});

});

app.get('/search',(req,res)=>{

let results = [];

if(req.query.keyword){

results = clothes.filter(item =>

item.name
.toLowerCase()
.includes(
req.query.keyword.toLowerCase()
)

);

}

res.render('search',{
results
});

});

app.listen(port, () => {
    console.log(`StyledByMe running at http://localhost:${port}`);
});