import userModel from '../models/userModel.js'
import { comparePassword, hashPassword} from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;

        //validations
        if(!name){
            return res.send({error: "Name is required"})
        }
        if(!email){
            return res.send({error: "Email is required"})
        }
        if(!password){
            return res.send({error: "Password is required"})
        }
        if(!phone){
            return res.send({error: "Phone Number is required"})
        }
        if(!address){
            return res.send({error: "Address is required"})
        }
        //Check User
        const exisitingUser = await userModel.findOne({email})
        //Existing User
        if(exisitingUser){
            return res.status(200).send({
                success:true,
                message:"Already Resister Please Login",
            })
        }

        //Register User
        const hashedPassword = await hashPassword(password);

        //Save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
        }).save();

        res.status(201).send({
            success:true,
            message:'User Register Successfully',
            user,

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registeration',
            error
        })
    }
};

//POST LOGIN
export const loginController = async(req,res) =>{
    try {
        const {email,password} = req.body
        //Validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid Email or Password"
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }

        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        //Token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn:'7d'
        });

        res.status(200).send({
            success:true,
            message:'Login Successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: ' Error in Login',
            error
        })
    }
};

//Test Controller 
export const testController = (req,res) => {
    res.send('Protected Route')
}