import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users, UserRole } from './user.entity';
import {
  RegisterDto,
  ActivationDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UpdateUserDto,
} from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { ConfigService } from '@nestjs/config';
import { TokenSender } from './utils/tokenSender';

interface UserData {
  name: string;
  username: string;
  password: string;
  email: string;
  role: UserRole;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}
  // create activation token
  async createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = this.jwtService.sign(
      { user, activationCode },
      {
        secret: this.configService.get('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );

    return { token, activationCode };
  }

  // generte link forgot pass
  async generateForgotPassLink(user: Users) {
    const forgotPassToken = this.jwtService.sign(
      { user },
      {
        secret: this.configService.get('FORGOT_PASS_SECRET'),
        expiresIn: '5m',
      },
    );
    return forgotPassToken;
  }

  // Register user
  async register(registerDto: RegisterDto) {
    const { name, email, password, username, role } = registerDto;

    const isEmailExist = await this.userRepository.findOne({
      where: { email },
    });

    if (isEmailExist) {
      throw new BadRequestException('Email already exists');
    }

    const isUsernameExist = await this.userRepository.findOne({
      where: { username },
    });

    if (isUsernameExist) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      password: hashedPassword as string,
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

  // Activate user
  async activateUser(activationDto: ActivationDto) {
    const { activationToken, activationCode } = activationDto;
    const newUser: { user: UserData; activationCode: string } =
      this.jwtService.verify(activationToken, {
        secret: this.configService.get('ACTIVATION_SECRET'),
      });

    if (newUser.activationCode !== activationCode) {
      throw new BadRequestException('Invalid activation code');
    }

    const { name, password, email, username, role } = newUser.user;

    const existUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userRepository.create({
      name,
      email,
      password,
      username,
      role,
    });

    // Save the user to the database
    await this.userRepository.save(user);

    // Exclude the password from the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...userNoPass } = user;

    return {
      data: userNoPass,
      message: 'User activated successfully',
    };
  }

  // Login user
  async login(LoginDto: LoginDto) {
    const { email, password } = LoginDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('No user found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    const tokenSender = new TokenSender(this.configService, this.jwtService);

    const data = tokenSender.sendToken(user);

    const noPassUser = {
      name: data.user.id,
      email: data.user.email,
      username: data.user.username,
      role: data.user.role,
    };

    return { data: { ...data, user: noPassUser }, message: 'Login success' };
  }

  // get logged in user
  async getLoggedInUser(req: any) {
    const user = req.user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...noPassUser } = user;
    return {
      data: noPassUser,
      message: 'User fetched successfully',
    };
  }

  // Forgotppasswoed
  async forgotPassword(forgotPassDto: ForgotPasswordDto) {
    const { email } = forgotPassDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('No user found');
    }

    const forgotPasswordToken = await this.generateForgotPassLink(user);
    const resetPassUrl =
      this.configService.get('RESET_PASS_URL') +
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
      message:
        'Your forgot password req successfull!                                        ',
    };
  }

  // logout user
  async logout(req: any) {
    req.user = null;
    req.accesstoken = null;
    req.refreshtoken = null;

    return { message: 'Logged out successfully' };
  }

  // Get all users
  async findAllUsers() {
    const data = await this.userRepository.find();
    const dataWithoutPass = data.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    });
    return { data: dataWithoutPass, message: 'All users fetched successfully' };
  }

  // Reset password
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { password, activationToken } = resetPasswordDto;

    const decoded = this.jwtService.verify(activationToken, {
      secret: this.configService.get('FORGOT_PASS_SECRET'),
    });

    if (!decoded) {
      throw new BadRequestException('Invalid token');
    }

    if (decoded?.exp * 1000 < Date.now()) {
      throw new BadRequestException('Token expired');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.findOne({
      where: { id: decoded.user.id },
    });

    if (!user) {
      throw new BadRequestException('No user found');
    }

    const updated = await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });

    return { data: updated, message: 'Password reset successfully' };
  }

  // Update user
  async updateUser(updateDto: UpdateUserDto, req: any) {
    const user = req.user;
    const { id } = user;
    // find user
    const userToUpdate = await this.userRepository.findOne({
      where: { id },
    });

    if (!userToUpdate) {
      throw new BadRequestException('No user found');
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
}
