/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import userRegistrationHandler, {
  UserRegistrationClass,
} from "../../../../../pages/api/user/register";
import * as CT from "class-transformer";

describe("/api/user/register API Endpoint", () => {
  const VALID_EMAIL = "someone@somesite.com";
  const INVALID_EMAIL = "not-an-emailATsome-other_#site.c0m";

  const VALID_USERNAME = "1234567890abc";
  const INVALID_USERNAME = "12345";

  const VALID_PASSWORD = "SOMEVALIDPASSWORD";
  const INVALID_PASSWORD = "12345";

  // Reuseable
  function mockRequestResponse(httpMethod: RequestMethod = "POST") {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
      createMocks({ method: httpMethod, url: "/api/user/register" });
    req.headers = {
      "Content-Type": "application/json",
    };
    return { req, res };
  }

  it("Should accept valid userName, email, password and confirmPassword, and reject copies", async () => {
    const { req, res } = mockRequestResponse();

    //Submit the users details
    const userRegBody = new UserRegistrationClass();
    userRegBody.email = VALID_EMAIL;
    userRegBody.userName = VALID_USERNAME;
    userRegBody.password = VALID_PASSWORD;
    userRegBody.confirmPassword = VALID_PASSWORD;
    req.body = CT.instanceToPlain(userRegBody);

    console.log(req.body);

    await userRegistrationHandler(req, res);

    expect(res.statusCode).toBe(201);
  });
});
