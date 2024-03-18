"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogDocs_1 = __importDefault(require("./blogDocs"));
const userDocs_1 = __importDefault(require("./userDocs"));
const messageDocs_1 = __importDefault(require("./messageDocs"));
const swaggerdocs = {
    openapi: "3.0.1",
    info: {
        title: "Mag's brand documentation",
        version: "1.0.0",
        description: "This is an API for my blog application",
        contact: {
            name: "Munezero Ange Gabriel",
            url: "https://munezero2000.github.io/mag-s-brand/",
            email: "munezero05200@gmail.com"
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "apiKey",
                name: "x-auth-token",
                in: "header",
                description: "Bearer token authorization",
            }
        }
    },
    tags: [
        {
            name: "Blog",
            description: "Blog Endpoints"
        },
        {
            name: "User",
            description: "Users Endpoints"
        }
    ],
    paths: Object.assign(Object.assign(Object.assign({}, userDocs_1.default), blogDocs_1.default), messageDocs_1.default)
};
exports.default = swaggerdocs;
//# sourceMappingURL=swaggerdocs.js.map