const potentialNames: Record<string, string[]> = {
  Vince: ["Mellow Corn"],
  Anna: ["Millie's Mom", "Dr. Sleepy", "Geminni"],
  Grant: ["Boatboy", "Cloud Plumber"],
  Jake: ["ABBA #1 Fan"],
  Sunny: ["The Fairy Goth"],
  Roy: ["Huckleberry Sizzlah"],
  Tina: ["Pickles", "Single Female Lawyer"]
};

const targetNumber: number = 0.022;

export default (targetName: string) => {
  if (Math.random() <= targetNumber)
  {
    const match = Object.keys(potentialNames).find(k =>
      k.toLowerCase().startsWith(targetName.toLowerCase())
    );

    if (match) {
        const aliases: string[] = potentialNames[match];
        const alias = aliases[Math.floor(Math.random() * aliases.length)];
        return alias;
    }
  }
  return targetName;
}