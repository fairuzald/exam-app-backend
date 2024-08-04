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
exports.UpdateQuestionOptionDto = exports.CreateQuestionOptionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateQuestionOptionDto {
}
exports.CreateQuestionOptionDto = CreateQuestionOptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Alphabet representing the option',
        example: 'A',
    }),
    (0, class_validator_1.IsString)({ message: 'Alphabet must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Alphabet is required' }),
    (0, class_validator_1.IsAlpha)(),
    __metadata("design:type", String)
], CreateQuestionOptionDto.prototype, "alphabet", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Text of the option',
        maxLength: 500,
    }),
    (0, class_validator_1.IsString)({ message: 'Option text must be a string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500, { message: 'Option text is too long' }),
    __metadata("design:type", String)
], CreateQuestionOptionDto.prototype, "optionText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Points assigned to the option',
        example: 10,
    }),
    (0, class_validator_1.IsInt)({ message: 'Points must be an integer' }),
    (0, class_validator_1.Min)(0, { message: 'Points must be greater than or equal to 0' }),
    __metadata("design:type", Number)
], CreateQuestionOptionDto.prototype, "points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the question that this option belongs to',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Question ID is required' }),
    __metadata("design:type", String)
], CreateQuestionOptionDto.prototype, "questionId", void 0);
class UpdateQuestionOptionDto extends (0, mapped_types_1.PartialType)(CreateQuestionOptionDto) {
}
exports.UpdateQuestionOptionDto = UpdateQuestionOptionDto;
//# sourceMappingURL=question-option.dto.js.map