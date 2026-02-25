const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Presentation",
    "type": "object",
    "required": ["slides", "title"],
    "properties": {
        "slides": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/Slide"
            },
            "minItems": 1
        },
        "title": {
            "type": "string"
        }
    },
    "definitions": {
        "Slide": {
            "type": "object",
            "required": ["id", "header", "objects", "background"],
            "properties": {
                "id": {
                    "type": "string"
                },
                "header": {
                    "type": "string"
                },
                "objects": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/SlideObject"
                    },
                    "default": []
                },
                "background": {
                    "$ref": "#/definitions/Background"
                }
            }
        },

        "Position": {
            "type": "object",
            "required": ["x", "y"],
            "properties": {
                "x": {
                    "type": "number"
                },
                "y": {
                    "type": "number"
                }
            }
        },

        "Size": {
            "type": "object",
            "required": ["width", "height"],
            "properties": {
                "width": {
                    "type": "number",
                    "minimum": 0
                },
                "height": {
                    "type": "number",
                    "minimum": 0
                }
            }
        },

        "BaseObject": {
            "type": "object",
            "required": ["id", "position", "size"],
            "properties": {
                "id": {
                    "type": "string"
                },
                "position": {
                    "$ref": "#/definitions/Position"
                },
                "size": {
                    "$ref": "#/definitions/Size"
                }
            }
        },

        "Font": {
            "type": "object",
            "required": ["fontFamily", "fontSize"],
            "properties": {
                "fontFamily": {
                    "type": "string"
                },
                "fontSize": {
                    "type": "number",
                    "minimum": 1
                }
            }
        },

        "Text": {
            "type": "object",
            "allOf": [
                {
                    "$ref": "#/definitions/BaseObject"
                }
            ],
            "required": ["type", "font", "color", "content"],
            "properties": {
                "type": {
                    "type": "string",
                    "const": "text"
                },
                "font": {
                    "$ref": "#/definitions/Font"
                },
                "color": {
                    "type": "string"
                },
                "content": {
                    "type": "string"
                }
            }
        },

        "ImageObject": {
            "type": "object",
            "allOf": [
                {
                    "$ref": "#/definitions/BaseObject"
                }
            ],
            "required": ["type", "src"],
            "properties": {
                "type": {
                    "type": "string",
                    "const": "image"
                },
                "src": {
                    "type": "string"
                }
            }
        },

        "SlideObject": {
            "oneOf": [
                {
                    "$ref": "#/definitions/Text"
                },
                {
                    "$ref": "#/definitions/ImageObject"
                }
            ]
        },

        "Background": {
            "oneOf": [
                {
                    "type": "object",
                    "required": ["type", "code"],
                    "properties": {
                        "type": {
                            "type": "string"
                        },
                        "code": {
                            "type": "string"
                        }
                    }
                },
                {
                    "type": "object",
                    "required": ["type", "src"],
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "image"
                        },
                        "src": {
                            "type": "string"
                        }
                    }
                }
            ]
        }
    }
}

export {
    schema
}