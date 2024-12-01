import { Server } from "socket.io";
import { updateCurrentDocument } from "../controllers/documents";

const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join document room
    socket.on("join", (docId) => {
      socket.join(docId);
      console.log(`User joined document room: ${docId}`);
    });

    // Handle real-time updates
    socket.on("edit-document", (data) => {
      const { doc_id,last_updated_by ,content, title } = data;
      console.log('content', data);
      ( async () => {
      const document = await updateCurrentDocument({content, doc_id: doc_id, last_updated_by, title})
      socket.to(doc_id).emit("document-updated", document);
      }
      )()
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

export default setupSocket;
