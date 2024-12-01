"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const documents_1 = require("../controllers/documents");
const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
        // Join document room
        socket.on("join", (docId) => {
            socket.join(docId);
            console.log(`User joined document room: ${docId}`);
        });
        // Handle real-time updates
        socket.on("edit-document", (data) => {
            const { doc_id, last_updated_by, content, title } = data;
            console.log('content', data);
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const document = yield (0, documents_1.updateCurrentDocument)({ content, doc_id: doc_id, last_updated_by, title });
                socket.to(doc_id).emit("document-updated", document);
            }))();
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
        });
    });
};
exports.default = setupSocket;
