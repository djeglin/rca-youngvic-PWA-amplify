
type DelayProps  = {
  message: string;
  typingSpeed?: number ; // characters per second, adjust this as needed
  baseDelay?: number ; // base delay in milliseconds
  multiplier?: number; // adjust this multiplier as needed
}
const delay = (ms : number) => new Promise (resolve => setTimeout(resolve, ms));

export const simulateDelay = async ({message,  typingSpeed= 6, baseDelay= 100, multiplier= 400} : DelayProps) =>  {
  console.log(message);
  const messageLength = message.length;
  const textLengthFactor = messageLength/ typingSpeed;
  const totalDelay = baseDelay + textLengthFactor * multiplier;
  return new Promise (resolve => setTimeout(resolve, totalDelay))
}
