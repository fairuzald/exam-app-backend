export declare class CreateQuizDto {
    title: string;
    description: string;
    duration?: number;
    isPublished?: boolean;
    difficulty?: string;
    instruction?: string;
    isRandomized?: boolean;
    createdById: string;
}
declare const UpdateQuizDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateQuizDto>>;
export declare class UpdateQuizDto extends UpdateQuizDto_base {
}
export {};
