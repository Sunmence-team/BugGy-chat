import  express  from "express";
import dotenv from 'dotenv'

import { loginController, registerController, testController } from "../controller/authController.js";
import { isAdmin, signInController } from "../middleWare/signinController.js";
import userModels from "../models/userModels.js";
const router = express.Router()


dotenv.config()


//json & urlencoded
router.use(express.json())
router.use(express.urlencoded({extended: false}))

//routes
//sign up route
router.post('/register', registerController)

//login route
router.post("/login", loginController)

router.get('/fetchData', async (req, res) => {
    try {
      // Fetch all documents from the collection
      const allData = await userModels.find();
  
      // If you want to fetch documents based on specific criteria, you can use queries like this:
      // const filteredData = await YourModel.find({ name: 'John' });
  
      // If you want to fetch a single document based on a unique property, you can use findOne():
      // const singleData = await YourModel.findOne({ email: 'john@example.com' });
  
      res.json(allData);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  });

// router.post()
router.post('/test', signInController,isAdmin, testController)

export default router