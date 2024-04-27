const RestaurantOwner = require("../models/RestaurantOwner");
const Item = require("../models/Item")
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './media/'); // Destination folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // File naming convention
    }
  });
  
  const upload = multer({ storage: storage }).single('file');

  const insertrestaurantOwner = async (req, res) =>
  {
    try 
    {
      upload(req, res, async function (err) 
      {
        if (err) 
        {
          console.error(err);
          return res.status(500).send(err.message);
        }
        
        const { fullname,restaurantname,gender,dateofbirth,email,password,location,contact,file } = req.body;
        const fileName = req.file ? req.file.filename : undefined; // Extracting file name
  
        const newrestaurant = new RestaurantOwner({
          fullname,
          restaurantname,
          gender,
          dateofbirth,
      email,
      password,
          location,
      contact,
          file: fileName // Save only the file name
        });
  
        await newrestaurant.save();
        res.status(200).send('Registered Successfully');
      });
    } 
    catch (error) 
    {
      console.error(error);
      res.status(500).send(error.message);
    }
  };

const additem = async (request,response) => {
    try{
        const input = request.body;
        const item = new Item(input);
        await item.save();
        response.send('Dish Added Successfully');
    }
    catch(e)
    {
        response.status()
    }
}

const checkrestaurantOwnerlogin = async (request, response) => {
    try {
        const input = request.body;
        const restaurantOwner = await RestaurantOwner.findOne(input);
       response.json(restaurantOwner)
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const viewrestaurants = async (req, res) => 
{
  try 
  {
    const restaurants = await RestaurantOwner.find();
    res.status(200).json(restaurants);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};
const restaurantimage = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream(binary data)

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
}

const viewmenu = async (request, response) => 
 {
  try {
    const runame = request.params.runame;
     
    const items = await Item.find({ Restaurantname: runame });

    if (items.length === 0) {
      // No items found for the given restaurant name
      return response.status(404).json({ message: 'No menu items found for this restaurant' });
    }

    // Respond with the list of items
    response.json(items);
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error fetching menu items:', error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
};

const forgotpassword = async (request, response) => 
{
  try 
  {
    const input = request.body;
    const email = input.email; 
    const restaurant = await RestaurantOwner.findOne({ email });
    if (!restaurant) 
    {
      response.status(200).send('Restaurant Owner not found with the provided email id');
    }
    for (const key in input) 
    {
      if (key !== 'email' && input[key]) {
        restaurant[key] = input[key];
      }
    }
    await restaurant.save();
    response.status(200).send('Password Updated Successfully');
  } 
  catch (e) 
  {
    response.status(500).send(e.message);
  }
};
const profile = async (request, response) => 
{
   try 
   {
     const email = request.params.email
     const restaurant = await RestaurantOwner.findOne({email})
     if(restaurant)
     {
       response.json(restaurant)
     }
     else
     {
       return response.status(200).send('Job seeker not found with the provided email id');
     }
     
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };

module.exports = { insertrestaurantOwner, checkrestaurantOwnerlogin , additem , viewrestaurants , restaurantimage , viewmenu  , profile , forgotpassword};
