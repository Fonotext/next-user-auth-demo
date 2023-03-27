// See https://github.com/instantcommerce/next-api-decorators
import { createHandler, Post, Body, ValidationPipe, HttpCode } from "next-api-decorators";
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class UserRegistrationClass {
  @IsEmail()
  email: string;

  @MinLength(10, {
    message: 'userName is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(50, {
    message: 'userName is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  userName: string;

  // We could also configure class-validator.@IsStrongPassword({minLength: 8, ....})
  @MinLength(10, {
    message: 'password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  password: string;

  // We could also configure class-validator.@IsStrongPassword({minLength: 8, ....})
  @MinLength(10, {
    message: 'confirmPassword is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  confirmPassword: string;
}

class UserRegistrationHandler {
  @Post()
  @HttpCode(201)
  create(@Body(ValidationPipe) body: UserRegistrationClass) {
    // FIXME - Implement database layer
    throw new Error("User creation not yet implemented");
    return body;
  }
}

export default createHandler(UserRegistrationHandler);
