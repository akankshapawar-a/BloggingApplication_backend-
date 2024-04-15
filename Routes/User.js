
import  express  from "express";
import bcryptjs from "bcryptjs";
import User from '../Module/Module.js'
import jwt from 'jsonwebtoken';

const JWT_SECRET = "sjasfhuetheofujs";

const userRouter = express.Router();

userRouter.post("/Signup",async (req, res) => {
    const { username ,email, password } = req.body;
    const hashpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username ,email, password: hashpassword });
  
    try {
      await newUser.save();
      res.status(201).json("User Created Successfully");
    } catch (error) {
      res.status(500).json("Something went wrong");
    }
  }
  );




//   userRouter.post("/login",async(req,res)=>{
//     // const JWT_SECRET="nxsknzcssnxm";
//     const {email,password}=req.body;
//     try {
//       const user=await User.findOne({email})
//       if(!user){
//         res.status(400).json("User does not exist");
//       }
   
       
//       console.log("user Exist");
//       const ValidPassword=await bcryptjs.compareSync(password,user.password)
//       if(ValidPassword){
// const accessToken =jwt.sign(user.toJSON(),process.env. JWT_SECRET);
// const refreshToken=jwt.sign(user.toJSON(),process.env.JWT_SECRET);

// const newToken=new Token ({token:refreshToken})
// await newToken.save();

// return response.status(200).json({accessToken:accessToken, refreshToken:refreshToken, name:user.name,username:user.username})

//       }
//       else {
//         return response.status(400).json({ msg: "Password does not match" });
//     }

    

     
//       // const response=res.json({
//       //   message:"Login Successfully",
//       //   success:true,
//       // })
      


//     } catch (error) {
//       res.status(500).json("Something went wrong",error.message);

//     }
//   })
userRouter.post("/login", async (req, res) => {

  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: "User does not exist" });
      }

      console.log("User exists");

      const validPassword = await bcryptjs.compareSync(password, user.password);
      if (validPassword) {
        const accessToken = jwt.sign(user.toJSON(),JWT_SECRET);
        const isAdmin = user.isAdmin ? jwt.sign({ isAdmin: true }, JWT_SECRET) : null;
        return res.status(200).json({
              accessToken: accessToken,
              // refreshToken: refreshToken,
              // name: user.name,
              isAdmin: isAdmin ? isAdmin : '',
              username: user.username
          });
      } else {
          return res.status(400).json({ error: "Password does not match" });
      }
  } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Something went wrong", errorMessage: error.message });
  }
});

// userRouter.get('/isadmin',async(req,res)=>{
//   try {
//     const user= await User.findOne({email:User.email});

//     if(user){
//       res.json({isAdmin:user.isAdmin});
//     }else{
//       res.status(404).json({ error: 'Default user not found' });

//     }
//   } catch (error) {
//     res.status(500).json({msg:error.message});

//   }
 

// })
export default userRouter;