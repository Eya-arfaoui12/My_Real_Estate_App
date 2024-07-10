import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


export const register = async (req, res)=>{
    const {username, email, password} = req.body;
    
    try{
        //HASH THE PASSWORD with bcrypt library
        const hashedPassword = await bcrypt.hash(password, 10); //10 représente le coût :  Plus le coût est élevé, plus le calcul du hachage sera intensif en ressources, ce qui rendra plus difficile l'attaque par force brute sur les mots de passe.

        console.log(hashedPassword);

        //CREATE A NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        })

        console.log(newUser);

        res.status(201).json({message: "User created successfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to create user!"})
    }
};

export const login = async(req, res) => {
    const { username, password } = req.body;
    
    try {
        // Vérifie si l'utilisateur existe
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }

        // Vérifie si le mot de passe est correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }

        // Génère le token JWT
        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign(
            { 
                id: user.id ,
                isAdmin: false,

            }, process.env.JWT_SECRET_KEY, { expiresIn: age });

        // Retourne les informations de l'utilisateur sans le mot de passe
        const { password: userPassword, ...userInfo } = user;

        // Retourne les informations de l'utilisateur avec le token dans les cookies
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age,
        }).status(200).json(userInfo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to login!" });
    }
};


export const logout = (req, res)=>{
    res.clearCookie("token").status(200).json({message : "Logout Successful"})
};