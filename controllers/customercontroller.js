const Customer = require("../models/Customer");
const Item = require("../models/Item");
const Cart = require("../models/Cart")

const insertcustomer = async (request, response) => {
    try {
        const input = request.body;
        const customer = new Customer(input);
        await customer.save();
        response.send('Registered Successfully');
    } catch (e) {
        response.status(500).send(e.message);
    }
};

const checkcustomerlogin = async (request, response) => {
    try {
        const input = request.body;
        const customer = await Customer.findOne(input);
       response.json(customer)
    } catch (error) {
        response.status(500).send(error.message);
    }
};
const viewmenubycustomer = async (request, response) => {
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
  const addtocart = async (request, response) => {
    try 
    {
      const input = request.body;
      
      
      const alreadyapplied = await Cart.findOne(input)
            
      if(!alreadyapplied)
        {
          const cartdata = new Cart(input);
          await cartdata.save();
          response.status(200).send('Added to Cart Successfully');
        }
        else
        {
          response.status(200).send('This item is already in cart');
        }
      }
      
     
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const viewcart = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const carts = await Cart.find({"customeremail":email});
      if(carts.length==0)
      {
        response.status(404).send("Empty Cart");
      }
      else
      {
        response.json(carts);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const updatequantity = async (request,response) =>
  {
    try{
      const { email, quantity, itemid } = request.params;
  
      // Convert quantity from string to number
      const parsedQuantity = parseInt(quantity);
      const carts = await Cart.find({"customeremail":email,"itemid":itemid})
      if(carts==null)
      {
        response.status(200).send("Empty Cart");

      }
      else
      {
        if(parsedQuantity>1)
        {
          const done = await Cart.updateOne({"customeremail":email,"itemid":itemid},{$set:{"itemnumber":quantity}})
          
        }
        else if(parsedQuantity<=0)
        {
          const done = await Cart.deleteOne({"customeremail":email,"itemid":itemid})
        }
        else
        {
          const done = await Cart.updateOne({"customeremail":email,"itemid":itemid},{$set:{"itemnumber":1}})
        }
      }
      
    }
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  const stripe = require("stripe")("sk_test_51P9uJISDSdxPQtHGrvmezhIzJSHuyxG0TKYFPiCzy03KxsXx6Swxn9sDOIletSWNX3C1F6rF0yM55O0zX9Efmo8x007l4cizdc");

const checkout = async (req, res) => {
  try {
    const { products } = req.body;
   
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.itemname,
          images: [product.pic],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.itemnumber,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/failure",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
const forgotpassword = async (request, response) => 
{
  try 
  {
    const input = request.body;
    const email = input.email; 
    const customer = await Customer.findOne({ email });
    if (!customer) 
    {
      response.status(200).send('Customer not found with the provided email id');
    }
    for (const key in input) 
    {
      if (key !== 'email' && input[key]) {
        customer[key] = input[key];
      }
    }
    await customer.save();
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
     const customer = await Customer.findOne({email})
     if(customer)
     {
       response.json(customer)
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
 const updateprofile = async (request, response) => 
  {
    try 
    {
      const input = request.body;
      const email = input.email; 
      const customer = await Customer.findOne({ email });
      if (!customer) 
      {
        response.status(200).send('Job seeker not found with the provided email id');
      }
      for (const key in input) 
      {
        if (key !== 'email' && input[key]) {
          customer[key] = input[key];
        }
      }
      await customer.save();
      response.status(200).send('Job Seeker Profile Updated Successfully');
    } 
    catch (e) 
    {
      response.status(500).send(e.message);
    }
  };


module.exports = { insertcustomer, checkcustomerlogin , viewmenubycustomer , addtocart , viewcart , updatequantity , checkout , profile , forgotpassword , updateprofile};
