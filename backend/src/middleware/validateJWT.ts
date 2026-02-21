import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendRequest } from "../types/ExtendRequest";

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
	// 1. get auth
	const authorizationHeader = req.get("authorization");
	if (!authorizationHeader) {
		res.status(403).send("Authorization header wasn't provided");
		return;
	}
	// 2. get token from auth
	const token = authorizationHeader.split(" ")[1];
	if (!token) {
		res.status(403).send("Barer token not valid!");
		return;
	}

	// 3. make sure that user token is good not expried or hack
	jwt.verify(token, process.env.SECRET_KEY || "", async (err, payload) => {
		// if token is bad
		if (err) {
			res.status(403).send("Invalid Token or Expired!");
			return;
		}

		// if token is good but data[payload] isn't
		if (!payload) {
			res.status(403).send("Invalid Token payload!");
			return;
		}

		// if data is good fetch user from db based on the payload(his data)
		const userPayload = payload as {
			email: string;
			firstName: string;
			lastName: string;
		}; // must do ts datatype..

		// 4. if all good get user from DB
		const user = await userModel.findOne({ email: userPayload.email });
		req.user = user; // return user
		next(); // do what comes next..
	});
};

export default validateJWT;
