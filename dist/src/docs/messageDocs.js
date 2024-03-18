"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageDocs = {
    "/api/messages": {
        get: {
            summary: "Get all messages",
            description: "Return a list of all messages in the database.",
            tags: ["Messages"],
            responses: {
                200: {
                    description: "Successful operation",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    count: { type: "integer" },
                                    messages: { type: "array", items: { $ref: "#/components/schemas/Message" } }
                                },
                                example: {
                                    count: 0,
                                    messages: []
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            summary: "Send a new message",
            description: "Create and send a new message.",
            tags: ["Messages"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Message"
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "Message sent successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Message"
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/messages/{id}": {
        get: {
            summary: "Get a single message by ID",
            description: "Return a message with a given ID.",
            tags: ["Messages"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the message to retrieve",
                    required: true,
                    schema: {
                        type: "string",
                        example: "1234567890abcdef"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Successful operation",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Message"
                            }
                        }
                    }
                },
                "404": {
                    description: "Message not found"
                }
            }
        },
        put: {
            summary: "Update a message",
            description: "Update an existing message by its ID.",
            tags: ["Messages"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the message to update",
                    required: true,
                    schema: {
                        type: "string",
                        example: "1234567890abcdef"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Message"
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Message updated successfully"
                },
                "404": {
                    description: "Message not found"
                }
            }
        },
        delete: {
            summary: "Delete a message",
            description: "Delete a message by its ID.",
            tags: ["Messages"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the message to delete",
                    required: true,
                    schema: {
                        type: "string",
                        example: "1234567890abcdef"
                    }
                }
            ],
            responses: {
                "204": {
                    description: "Message deleted successfully"
                },
                "404": {
                    description: "Message not found"
                }
            }
        }
    }
};
exports.default = MessageDocs;
//# sourceMappingURL=messageDocs.js.map