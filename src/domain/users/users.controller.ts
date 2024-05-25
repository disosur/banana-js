// users.controller.ts
import { Get, JsonController, Res } from "routing-controllers"; // Import Res decorator
import { Response } from "express";
import { Service } from "typedi";

@Service()
@JsonController("/users")
export default class UsersController {
  @Get("/")
  async getAllUsers(@Res() res: Response) {
    // Use Res decorator to inject Response object
    return res.status(200).send("it worked ba talaga?"); // Return the response directly
  }
}
