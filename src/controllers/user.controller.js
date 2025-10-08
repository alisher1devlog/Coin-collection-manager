// CRUD logic uchun
import user from "../models/user.js";

const userController = {

    async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400), send({ message: `Barcha maydonlarni to'ldirilihi shart!` });
            }

            const existingUser = await user.findByEmail(email);
            if (existingUser) {
                return res.status(409).send({ message: `Bunday email bilan foydalanuvchi mavjud!` });
            }

            const newUser = await user.createUser({
                name,
                email,
                password: password
            });

            delete newUser.password;

            res.status(201).send({ message: `Foydalanuvchi muvaffaqiyatli ro'yhatdan o'tdi!` });
        } catch (err) {
            console.error(`Ro'yhatdan o'tishda xatolik!`);
            res.status(500).send({ message: `Serverda xatolik!` });
        }
    },
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send({ message: `Email va parol kiritilishi kerak!` });
            }

            const user = await user.findByEmail(email);
            if (!user) {
                return res.status(401).send({ message: `Email yoki parol xato` });
            }

            if (password !== user.password) {
                return res.status(401).send({ message: `Email yoki parol xato!` });
            }

            delete user.password;

            res.status(200).send({
                message: `Tizmga kirildi!`,
                user: user
            });
        } catch (err) {
            console.log(`Tizmimga kirishda xatolik!`);
            res.status(500).send({ message: `Serverda xatolik!` });
        }
    },
    async getAllUsers(req, res) {
        try {
            const users = await user.getAll();
            res.status(200).send(users)
        } catch (err) {
            res.status(500).send({message:`Serverda xatolik yuz berdi!`});
        }
    },
    async getById(req,res){
        try {
            const {id} = req.params;
            const user = await user.findById(id);
            if (user) {
                res.status(200).send(user);
            }else{
                res.status(404).send({message: `User not found`});
            }
        } catch (err) {
            res.status(500).send({message:`Serverda xatolik!`})
        }
    }
}

export default userController;