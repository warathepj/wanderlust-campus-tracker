import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import React, { useEffect, useState, useCallback } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8081");

    websocket.onopen = () => {
      console.log("WebSocket connected");
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      setReceivedMessages((prev) => [...prev, event.data]);
    };

    websocket.onclose = () => {
      console.log("WebSocket disconnected");
      setWs(null);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const sendStudentDataToWebSocket = useCallback((studentsData: any[]) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const dataToSend = JSON.stringify(studentsData);
      ws.send(dataToSend);
      console.log("Sent student data:", dataToSend);
    } else {
      console.warn("WebSocket not connected, cannot send student data.");
    }
  }, [ws]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index sendStudentData={sendStudentDataToWebSocket} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <div style={{ padding: "20px", borderTop: "1px solid #eee", marginTop: "20px" }}>
          <h3>WebSocket Real-time Data</h3>
          <h4>Received Messages:</h4>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {receivedMessages.map((msg, index) => (
              <li key={index} style={{ background: "#f0f0f0", padding: "5px", marginBottom: "5px" }}>
                {msg}
              </li>
            ))}
          </ul>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
