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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let AuthGuard = class AuthGuard {
    constructor(jwtService, userRepository, config) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.config = config;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const accessToken = req.headers.accesstoken;
        const refreshToken = req.headers.refreshtoken;
        if (!accessToken || !refreshToken) {
            throw new common_1.UnauthorizedException('Please login to access this resource!');
        }
        await this.validateAndSetUser(accessToken, req);
        await this.updateAccessToken(req);
        return true;
    }
    async validateAndSetUser(token, req) {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: this.config.get('ACCESS_TOKEN_SECRET'),
            });
            const expirationTime = decoded.exp * 1000;
            if (expirationTime < Date.now()) {
                throw new common_1.UnauthorizedException('Access token has expired!');
            }
            req.user = await this.userRepository.findOne({
                where: { id: decoded.id },
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async updateAccessToken(req) {
        try {
            const refreshToken = req.headers.refreshtoken;
            const decoded = this.jwtService.verify(refreshToken, {
                secret: this.config.get('REFRESH_TOKEN_SECRET'),
            });
            const expirationTime = decoded.exp * 1000;
            if (expirationTime < Date.now()) {
                throw new common_1.UnauthorizedException('Refresh token has expired!');
            }
            const user = await this.userRepository.findOne({
                where: { id: decoded.id },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Users not found!');
            }
            const newAccessToken = this.jwtService.sign({ id: user.id }, {
                secret: this.config.get('ACCESS_TOKEN_SECRET'),
                expiresIn: '5m',
            });
            const newRefreshToken = this.jwtService.sign({ id: user.id }, {
                secret: this.config.get('REFRESH_TOKEN_SECRET'),
                expiresIn: '7d',
            });
            req.accesstoken = newAccessToken;
            req.refreshtoken = newRefreshToken;
            req.user = user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_1.Repository,
        config_1.ConfigService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map