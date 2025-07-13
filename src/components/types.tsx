export type ChatMessageType = {
  hideInChat?: boolean;
  role: "user" | "model";
  text: string;
  isError?: boolean;
};
