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
exports.UpdateQuizDto = exports.CreateQuizDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateQuizDto {
}
exports.CreateQuizDto = CreateQuizDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the quiz',
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)({ message: 'Title must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Title is required' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Title is too long' }),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the quiz',
    }),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Description is required' }),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Duration of the quiz in minutes',
        minimum: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuizDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the quiz is published or not',
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateQuizDto.prototype, "isPublished", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Difficulty level of the quiz',
        enum: ['easy', 'medium', 'hard'],
    }),
    (0, class_validator_1.IsEnum)(['easy', 'medium', 'hard']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Instructions for the quiz',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "instruction", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the questions are randomized or not',
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateQuizDto.prototype, "isRandomized", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who created the quiz',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'User ID is required' }),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "createdById", void 0);
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateQuizDto extends (0, mapped_types_1.PartialType)(CreateQuizDto) {
}
exports.UpdateQuizDto = UpdateQuizDto;
//# sourceMappingURL=quiz.dto.js.map