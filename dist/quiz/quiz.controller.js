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
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("./quiz.service");
const quiz_dto_1 = require("./quiz.dto");
const swagger_1 = require("@nestjs/swagger");
let QuizController = class QuizController {
    constructor(quizService) {
        this.quizService = quizService;
    }
    async create(createQuizDto, response) {
        try {
            const res = await this.quizService.create(createQuizDto);
            return response.status(201).json(res);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(400).json({ message: error.message });
        }
    }
    async findAll(response) {
        try {
            const res = await this.quizService.findAll();
            return response.status(200).json(res);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(400).json({ message: error.message });
        }
    }
    async findOne(id, response) {
        try {
            const res = await this.quizService.findOne(id);
            return response.status(200).json(res);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(400).json({ message: error.message });
        }
    }
    async update(id, updateQuizDto, response) {
        try {
            const res = await this.quizService.update(id, updateQuizDto);
            return response.status(200).json(res);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(400).json({ message: error.message });
        }
    }
    async remove(id, response) {
        try {
            const result = await this.quizService.remove(id);
            return response.status(200).json(result);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(400).json({ message: error.message });
        }
    }
};
exports.QuizController = QuizController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new quiz' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Quiz created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quiz_dto_1.CreateQuizDto, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all quizzes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quizzes retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a quiz by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quiz retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a quiz by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quiz updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, quiz_dto_1.UpdateQuizDto, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a quiz by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quiz deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "remove", null);
exports.QuizController = QuizController = __decorate([
    (0, swagger_1.ApiTags)('quiz'),
    (0, common_1.Controller)('quiz'),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizController);
//# sourceMappingURL=quiz.controller.js.map