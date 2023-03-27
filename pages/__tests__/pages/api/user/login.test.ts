/**
 * @jest-environment node
 */
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import userLoginHandler, {
  UserLoginClass,
} from "../../../../api/user/login";
import * as CT from "class-transformer";

describe("/api/user/login API Endpoint", () => {

  const VALID_USERNAME = "1234567890abc";
  const INVALID_USERNAME = "12345";

  const VALID_PASSWORD = "SOMEVALIDPASSWORD";
  const INVALID_PASSWORD = "12345";

  // Reuseable
  function mockRequestResponse(httpMethod: RequestMethod = "POST") {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
      createMocks({ method: httpMethod, url: "/api/user/login" });
    req.headers = {
      "Content-Type": "application/json",
    };
    return { req, res };
  }

  it("Should login user with valid userName, and password", async () => {
    const { req, res } = mockRequestResponse();

    //Submit the users details
    const userRegBody = new UserLoginClass();
    userRegBody.userName = VALID_USERNAME;
    userRegBody.password = VALID_PASSWORD;
    req.body = CT.instanceToPlain(userRegBody);

    console.log(req.body);

    await userLoginHandler(req, res);

    expect(res.statusCode).toBe(201);
  });
});
