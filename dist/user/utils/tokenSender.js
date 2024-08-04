"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSender = void 0;
class TokenSender {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
    }
    sendToken(user) {
        const accessToken = this.jwtService.sign({ id: user.id }, {
            secret: this.configService.get('ACCESS_TOKEN_SECRET'),
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign({ id: user.id }, {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
            expiresIn: '7d',
        });
        return { user, accessToken, refreshToken };
    }
}
exports.TokenSender = TokenSender;
//# sourceMappingURL=tokenSender.js.map