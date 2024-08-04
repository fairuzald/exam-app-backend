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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const email_service_1 = require("./email/email.service");
const config_1 = require("@nestjs/config");
const tokenSender_1 = require("./utils/tokenSender");
let UserService = class UserService {
    constructor(userRepository, jwtService, emailService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.configService = configService;
    }
    async createActivationToken(user) {
        const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
        const token = this.jwtService.sign({ user, activationCode }, {
            secret: this.configService.get('ACTIVATION_SECRET'),
            expiresIn: '5m',
        });
        return { token, activationCode };
    }
    async generateForgotPassLink(user) {
        const forgotPassToken = this.jwtService.sign({ user }, {
            secret: this.configService.get('FORGOT_PASS_SECRET'),
            expiresIn: '5m',
        });
        return forgotPassToken;
    }
    async register(registerDto) {
        const { name, email, password, username, role } = registerDto;
        const isEmailExist = await this.userRepository.findOne({
            where: { email },
        });
        if (isEmailExist) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const isUsernameExist = await this.userRepository.findOne({
            where: { username },
        });
        if (isUsernameExist) {
            throw new common_1.BadRequestException('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            email,
            password: hashedPassword,
            username,
            role,
        };
        const activationToken = await this.createActivationToken(user);
        const activationCode = activationToken.activationCode;
        await this.emailService.sendMail({
            email,
            subject: 'Activate ',
            template: './activation-mail',
            name,
            activationCode,
        });
        return {
            data: { activation_token: activationToken.token },
            message: 'User registered successfully',
        };
    }
    async activateUser(activationDto) {
        const { activationToken, activationCode } = activationDto;
        const newUser = this.jwtService.verify(activationToken, {
            secret: this.configService.get('ACTIVATION_SECRET'),
        });
        if (newUser.activationCode !== activationCode) {
            throw new common_1.BadRequestException('Invalid activation code');
        }
        const { name, password, email, username, role } = newUser.user;
        const existUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const user = await this.userRepository.create({
            name,
            email,
            password,
            username,
            role,
        });
        await this.userRepository.save(user);
        const { password: pass, ...userNoPass } = user;
        return {
            data: userNoPass,
            message: 'User activated successfully',
        };
    }
    async login(LoginDto) {
        const { email, password } = LoginDto;
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.BadRequestException('No user found');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const tokenSender = new tokenSender_1.TokenSender(this.configService, this.jwtService);
        const data = tokenSender.sendToken(user);
        const noPassUser = {
            name: data.user.id,
            email: data.user.email,
            username: data.user.username,
            role: data.user.role,
        };
        return { data: { ...data, user: noPassUser }, message: 'Login success' };
    }
    async getLoggedInUser(req) {
        const user = req.user;
        const { password, ...noPassUser } = user;
        return {
            data: noPassUser,
            message: 'User fetched successfully',
        };
    }
    async forgotPassword(forgotPassDto) {
        const { email } = forgotPassDto;
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.BadRequestException('No user found');
        }
        const forgotPasswordToken = await this.generateForgotPassLink(user);
        const resetPassUrl = this.configService.get('RESET_PASS_URL') +
            '/reset-password?verify=' +
            forgotPasswordToken;
        await this.emailService.sendMail({
            email,
            subject: 'Reset Password',
            template: './forgot-password',
            name: user.name,
            activationCode: resetPassUrl,
        });
        return {
            message: 'Your forgot password req successfull!                                        ',
        };
    }
    async logout(req) {
        req.user = null;
        req.accesstoken = null;
        req.refreshtoken = null;
        return { message: 'Logged out successfully' };
    }
    async findAllUsers() {
        const data = await this.userRepository.find();
        const dataWithoutPass = data.map((user) => {
            const { password, ...rest } = user;
            return rest;
        });
        return { data: dataWithoutPass, message: 'All users fetched successfully' };
    }
    async resetPassword(resetPasswordDto) {
        const { password, activationToken } = resetPasswordDto;
        const decoded = this.jwtService.verify(activationToken, {
            secret: this.configService.get('FORGOT_PASS_SECRET'),
        });
        if (!decoded) {
            throw new common_1.BadRequestException('Invalid token');
        }
        if (decoded?.exp * 1000 < Date.now()) {
            throw new common_1.BadRequestException('Token expired');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepository.findOne({
            where: { id: decoded.user.id },
        });
        if (!user) {
            throw new common_1.BadRequestException('No user found');
        }
        const updated = await this.userRepository.save({
            ...user,
            password: hashedPassword,
        });
        return { data: updated, message: 'Password reset successfully' };
    }
    async updateUser(updateDto, req) {
        const user = req.user;
        const { id } = user;
        const userToUpdate = await this.userRepository.findOne({
            where: { id },
        });
        if (!userToUpdate) {
            throw new common_1.BadRequestException('No user found');
        }
        const updated = await this.userRepository.save({
            ...userToUpdate,
            ...updateDto,
        });
        return {
            data: { updated },
            message: 'User updated successfully',
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        email_service_1.EmailService,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map