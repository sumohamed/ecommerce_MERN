import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT secret key
const SECRET_KEY =
	"38a0028a360286c8f9897efeabb66b7024826b775133fa22982d7dec73ec0231";
const generateJWT = (data: any) => {
	return jwt.sign(data, SECRET_KEY);
};

// Register Service
interface RegisterParams {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const register = async ({
	firstName,
	lastName,
	email,
	password,
}: RegisterParams) => {
	try {
		// 1. find user
		const findUser = await userModel.findOne({ email });

		// 2. if found
		if (findUser) {
			return { data: "User already exists", statusCode: 400 };
		}

		// 3. if Not found --> create then save & return user..
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new userModel({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});
		await newUser.save();

		return {
			data: generateJWT({ firstName, lastName, email }),
			statusCode: 201,
		};
	} catch {
		return { data: "Something went wrong!", statusCode: 500 };
	}
};

// Login Service
interface LoginParams {
	email: string;
	password: string;
}

export const login = async ({ email, password }: LoginParams) => {
	try {
		// 1. findUser
		const findUser = await userModel.findOne({ email });
		// 2. if user not found
		if (!findUser) {
			return { data: "Incorrect email or password", statusCode: 400 };
		}
		// 3. if does -> check mathing password
		const passwordMatch = await bcrypt.compare(password, findUser.password);
		// if match
		if (passwordMatch) {
			return {
				data: generateJWT({
					email,
					firstName: findUser.firstName,
					lastName: findUser.lastName,
				}),
				statusCode: 200,
			};
		}
		// if No match
		return { data: "Incorrect email or password", statusCode: 400 };
	} catch {
		return { data: "Something went wrong!", statusCode: 500 };
	}
};
