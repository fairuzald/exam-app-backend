"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = exports.ResetPasswordDto = exports.ForgotPasswordDto = exports.LoginDto = exports.ActivationDto = exports.RegisterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const user_entity_1 = require("./user.entity");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Name of the user' }),
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'johndoe', description: 'Username of the user' }),
    (0, class_validator_1.IsString)({ message: 'Username must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Username is required' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john.doe@egmail',
        description: 'Email of the user',
    }),
    (0, class_validator_1.IsString)({ message: 'Email must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', description: 'Password of the user' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin',
        description: 'Role of the user',
        required: false,
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);
class ActivationDto {
}
exports.ActivationDto = ActivationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'activation-token', description: 'Activation token' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Activation token is required' }),
    __metadata("design:type", String)
], ActivationDto.prototype, "activationToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', description: 'Activation code' }),
    (0, class_validator_1.IsString)({ message: 'Activation code must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Activation code is required' }),
    __metadata("design:type", String)
], ActivationDto.prototype, "activationCode", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john.doe@egmail',
        description: 'Email of the user',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', description: 'Password of the user' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class ForgotPasswordDto {
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john.doe@egmail',
        description: 'Email of the user',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email' }),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
class ResetPasswordDto {
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'reset-token', description: 'Reset token' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Reset token is required' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "activationToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'newpassword123', description: 'New password' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
class UpdateUserDto extends (0, mapped_types_1.PartialType)(RegisterDto) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=user.dto.js.map